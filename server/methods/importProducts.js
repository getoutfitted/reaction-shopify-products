let letterSizeMap = {
  'extra small': 'XS',
  'small': 'S',
  'medium': 'M',
  'large': 'L',
  'extra large': 'XL',
  'extra extra large': 'XXL'
};

function letterSize(size) {
  let lowerCaseSize = size.toLowerCase();
  if (letterSizeMap[lowerCaseSize]) {
    return letterSizeMap[lowerCaseSize];
  }
  // if we don't find a match - return size as is
  return size;
}

function determineProductType(productType) {
  if (productType === 'Socks'
  || productType === 'Baselayer Top'
  || productType === 'Baselayer Bottom') {
    return 'simple';
  }
  return 'rental';
}

function generateSku(product, color, size) {
  const prodSection = product.vendor.substr(0, 2).toUpperCase() + product.title.substr(0, 2).toUpperCase();
  const colorWords = color.match(/[A-Za-z\d]\w+/g);
  let colorSection = '';
  if (colorWords.length > 1) {
    _.each(colorWords, function (word) {
      colorSection = colorSection + word[0];
    });
  } else {
    colorSection = colorWords[0].substr(0, 2).toUpperCase();
  }

  const sku = prodSection + '-' + colorSection + '-' + letterSize(size);
  return sku;
}

function generateFakeLocation() {
  const rooms = ['BGT', 'MJP', 'WJP', 'GLV', 'GOG', 'BAS'];
  const shelves = [1, 2, 3, 4];
  const levels = [1, 2, 3, 4];
  const sections = [1, 2, 3, 4, 5, 6, 7];
  return _.sample(rooms) + '-S' + _.sample(shelves) + '-L' + _.sample(levels) + '-S' + _.sample(sections);
}

function updateImportStatus(status, product = {}) {
  ReactionCore.Collections.ShopifyProducts.insert({status: status, currentProductId: product.id, currentProductTitle: product.title});
}

function setupProductDocument(product) {
  let prod = {}; // init empty object to hold new product.
  let colors = product.body_html.split(':color:')[1].split(',');
  let features = product.body_html.split(':whatsincluded:')[1].split(','); // - Array of features or empty
  let aboutVendor = product.body_html.split(':about:')[1]; // Paragraph about the vendor of this product
  let pageTitle = product.handle[0].toUpperCase() + product.handle.split('-').join(' ').substr(1);
  let sizes = [];
  if (product.product_type === 'Jacket' || product.product_type === 'Baselayer Top' || product.product_type === 'Midlayer') {
    sizes = product.body_html.split(':jacketsizes:')[1].split(','); // Array of jacket sizes - empty if no jacket.
  } else if (product.product_type === 'Pants' || product.product_type === 'Baselayer Bottom') {
    sizes = product.body_html.split(':pantsizes:')[1].split(','); // Array of pants sizes - empty if no pants
  } else if (product.product_type === 'Gloves') {
    sizes = product.body_html.split(':glovesizes:')[1].split(','); // Array of glove sizes - empty if no gloves
  }

  // Create Product Object;
  prod.shopId = ReactionCore.getShopId();
  prod.shopifyId = product.id.toString();
  prod.title = product.title;
  prod.pageTitle = pageTitle;
  prod.description = product.body_html.split(':description:')[0].replace(/(<([^>]+)>)/ig, '');
  prod.vendor = product.vendor;
  prod.productType = determineProductType(product.product_type);
  prod.handle = product.handle;
  prod.variants = [];
  prod.hashtags = product.tags.split(',');
  prod.metafields = [];
  prod.isVisible = false;

  _.each(features, function (feature) {
    let metafield = {};
    metafield.key = 'feature';
    metafield.value = feature;
    prod.metafields.push(metafield);
  });

  prod.metafields.push({key: 'aboutVendor', value: aboutVendor});

  _.each(colors, function (color) {
    let variant = {};
    variant._id = Random.id();
    variant.type = 'variant';
    variant.title = color.trim();
    variant.optionTitle = 'color';
    variant.price = '1.00';
    variant.pricePerDay = '1.00';
    variant.inventoryQuantity = sizes.length;
    variant.taxable = true;
    variant.weight = 1;
    prod.variants.push(variant);

    _.each(sizes, function (size) {
      let childVariant = {};
      childVariant._id = Random.id();
      childVariant.parentId = variant._id;
      // XXX consider removing generateSku once we have real data;
      childVariant.sku = generateSku(product, color, size);
      // XXX Remove generate fake location once we have real data;
      childVariant.location = generateFakeLocation();
      childVariant.color = color.trim();
      childVariant.size = size.trim();
      childVariant.title = 'size';
      childVariant.optionTitle = size.trim();
      childVariant.inventoryQuantity = 1;
      childVariant.price = '1.00';
      childVariant.pricePerDay = '1.00';
      childVariant.taxable = true;
      childVariant.weight = 1;

      prod.variants.push(childVariant);
    });
  });
  return prod;
}

function setupBundleDocument(bundle) {
  let doc = {}; // init empty object to hold new product.
  let colors = bundle.body_html.split(':color:')[1].split(',');
  let midlayer = bundle.body_html.split(':midlayer:')[1].toLowerCase();
  doc.shopId = ReactionCore.getShopId();
  doc.shopifyId = bundle.id.toString();
  doc.title = bundle.title;
  doc.description = bundle.body_html.split(':description:')[0].replace(/(<([^>]+)>)/ig, '');
  doc.hasMidlayer = midlayer.substr(0, 2) === 'no' ? false : true;
  doc.colorWays = {};

  // Create bundle Object;
  _.each(colors, function (color) {
    let colorWay = {};
    if (doc.hasMidlayer) {
      colorWay.midlayerId = '';
      colorWay.midlayerColor = '';
    }
    colorWay.jacketId = '';
    colorWay.jacketColor = '';
    colorWay.pantsId = '';
    colorWay.pantsColor = '';
    colorWay.glovesId = '';
    colorWay.glovesColor = '';
    colorWay.gogglesId = '';
    colorWay.gogglesColor = '';
    doc.colorWays[color] = colorWay;
  });

  return doc;
}

Meteor.methods({
  'importShopifyProducts/importProducts': function (updateIfExists = false, productType = 'Jacket', createdAtMin = '2015-09-01') {
    check(updateIfExists, Boolean);
    check(productType, String);
    check(createdAtMin, String);

    if (!ReactionCore.hasPermission('createProduct')) {
      throw new Meteor.Error(403, 'Access Denied');
    }

    const shopifyCredentials = ReactionCore.Collections.Packages.findOne({name: 'reaction-shopify-products'}).settings.shopify;
    const Products = ReactionCore.Collections.Products;
    const apikey = shopifyCredentials.key;
    const password = shopifyCredentials.password;
    const domain = 'https://' + shopifyCredentials.shopname + '.myshopify.com';
    const query = '/admin/products.json';
    const fields = 'id,title,body_html,vendor,product_type,handle,tags';

    updateImportStatus('Fetching products...');

    let res = HTTP.call('GET', domain + query, {
      params: {
        fields: fields,
        product_type: productType,
        created_at_min: createdAtMin
      },
      auth: apikey + ':' + password
    });

    products = res.data.products;
    _.each(products, function (product, index) {
      if (product.product_type === 'Package') {
        let status = 'Skipped product ' + (index + 1) + ' of ' + products.length + ' products because it was type "Package"...';
        updateImportStatus(status, product);
        return false;
      }

      // Check to see if this particular product has been imported before
      let productExists = Products.findOne({shopifyId: product.id.toString()});
      // If product exists and we aren't updating, skip it.
      if (!!productExists && !updateIfExists) {
        let status = 'Skipped product ' + (index + 1) + ' of ' + products.length + ' products...';
        updateImportStatus(status, product);
        return false;
      }

      // Setup Reaction Product
      let doc = setupProductDocument(product);

      ReactionCore.Log.info('Importing shopify product ' + doc.title);
      if (!productExists) {
        let status = 'Imported product ' + (index + 1) + ' of ' + products.length + ' products...';
        Products.insert(doc);
        updateImportStatus(status, product);
      }
      // TODO: Build product updater.
      let status = 'Would have updated product ' + (index + 1) + ' of ' + products.length + ' products...';
      updateImportStatus(status, product);
    });

    updateImportStatus('Imported and/or updated ' + products.length + ' products.');
  },

  'importShopifyProducts/importBundles': function (updateIfExists = false, productType = 'Package', createdAtMin = '2015-09-01') {
    check(updateIfExists, Boolean);
    check(productType, String);
    check(createdAtMin, String);

    if (!ReactionCore.hasPermission('createProduct')) {
      throw new Meteor.Error(403, 'Access Denied');
    }

    const shopifyCredentials = ReactionCore.Collections.Packages.findOne({name: 'reaction-shopify-products'}).settings.shopify;
    const Bundles = ReactionCore.Collections.Bundles;
    const apikey = shopifyCredentials.key;
    const password = shopifyCredentials.password;
    const domain = 'https://' + shopifyCredentials.shopname + '.myshopify.com';
    const query = '/admin/products.json';
    const fields = 'id,title,body_html,product_type';

    updateImportStatus('Fetching bundles...');

    let res = HTTP.call('GET', domain + query, {
      params: {
        fields: fields,
        product_type: productType,
        created_at_min: createdAtMin
      },
      auth: apikey + ':' + password
    });

    bundles = res.data.products;
    _.each(bundles, function (bundle, index) {
      if (bundle.product_type !== 'Package') {
        return false;
      }

      let bundleExists = Bundles.findOne({shopifyId: bundle.id});
      if (!!bundleExists) {
        let status = 'Skipped bundle ' + (index + 1) + ' of ' + bundles.length + ' bundles...';
        updateImportStatus(status, bundle);
        return false;
      }

      let doc = setupBundleDocument(bundle);

      ReactionCore.Log.info('Importing shopify bundle ' + doc.title);
      if (!bundleExists) {
        let status = 'Imported bundle ' + (index + 1) + ' of ' + bundles.length + ' bundles...';
        Bundles.insert(doc);
        updateImportStatus(status, bundle);
      }
    });

    updateImportStatus('Imported ' + bundles.length + ' bundles.');
  }
});
