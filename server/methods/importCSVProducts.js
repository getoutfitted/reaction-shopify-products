function setupSizeVariants(variant, ancestors) {
  let prod = {};
  prod.ancestors = ancestors;
  // prod.location  = variant.location;
  prod.optionTitle = 'size';
  prod.title = variant.size;
  prod.type = 'variant';
  prod.isVisible = false;
  prod.price = parseInt(variant.retailPrice, 10);
  prod.weight = variant.weight;
  prod.inventoryQuantity = variant.qty;
  prod.sku = variant.sku;
  prod.manufacturerSku = variant.manufacturerSku;
  let reactionProduct = ReactionCore.Collections.Products.findOne({
    title: prod.title,
    ancestors: [ancestors]
  });
  let reactionId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Product Variant not inserted into' + prod.title + 'already exists in DB');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'variant'}});
  }
}

function setupColorVariants(color, colorVariants, ancestors) {
  let prod = {};
  prod.ancestors = ancestors;
  prod.color =  color.color;
  prod.isVisible = false;
  prod.type = 'variant';
  prod.optionTitle = 'color';
  prod.title = color.title.trim();
  prod.price = parseInt(color.retailPrice, 10);
  prod.productType = color.productType.trim();
  prod.inventoryQuantity = 100;
  let reactionProduct = ReactionCore.Collections.Products.findOne({
    title: prod.title,
    ancestors: [ancestors]
  });
  let reactionProductId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Product Variant not inserted into' + prod.title + 'already exists in DB');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'variant'}});
  }

  ancestors.push(reactionProductId);
  _.each(colorVariants, function (variant) {
    setupSizeVariants(variant, ancestors);
  })


  // console.log('colorV', prod)
}

function setupCSVProductDocument(product, skus) {
  // skus is an array of objects
  // each object represents a sku within single product.
  let prod = {}; // init empty object to hold new product.
  // let sizes = {}; // object of sizes by color; Key is color;
  let colors = []; // array of keys
  prod.price = {};

  // Create Product Object;
  prod.ancestors = [];
  prod.colors = [];
  prod.shopId = ReactionCore.getShopId();
  prod.shopifyId = product.shopifyId ? product.shopifyId.trim() : '';
  prod.vendor = product.vendor ? product.vendor.trim() : '';
  prod.gender = product.gender ? product.gender.trim() : '';
  prod.title = product.title ? product.title.trim() : '';
  prod.pageTitle = prod.title;
  prod.productType = product.productType ? product.productType.trim() : '';
  prod.description = prod.title;
  prod.handle = ImportProducts.handleize(prod.gender + ' ' + prod.title);
  prod.isVisible = false;
  prod.price.max = product.retailPrice;
  prod.price.min = product.retailPrice;
  prod.price.range = prod.price.min + '-' + prod.price.max;

  let reactionProduct = ReactionCore.Collections.Products.findOne({shopifyId: prod.shopifyId});
  let reactionProductId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Product not inserted into' + prod.title + 'already exists in DB');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'simple'}});
  }

  // Build Color Variant Group
  let colorWays = _.groupBy(skus, function (sku) {
    return sku.color;
  });
  // Keeping track of colors for Higher level object
  colors = Object.keys(colorWays);

  _.each(colorWays, function (colorVariant) {
    setupColorVariants(colorVariant[0], colorVariant, [reactionProductId]);
  });
}

Meteor.methods({
  'importCSVProducts/importProducts': function (productSkuList, updateIfExists = false) {
    check(productSkuList, [Match.Any]);
    check(updateIfExists, Match.Optional(Boolean));
    let Products = ReactionCore.Collections.Products;
    let products = _.groupBy(productSkuList, function (sku) {
      return sku.productId;
    });
    let index = 1;
    let numProducts = _.size(products);
    _.each(products, function (product) {
      let reactionProduct = setupCSVProductDocument(product[0], product);
    });
    ReactionCore.Log.info('-------------------------------------------------------------------------');
    ReactionCore.Log.info('-------------------------Done Importing Products-------------------------');
    ReactionCore.Log.info('-------------------------------------------------------------------------');
    ImportProducts.updateImportStatus('Done importing CSV products');
  }
});
