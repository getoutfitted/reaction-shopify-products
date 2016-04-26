function setupColorVariants(variant, ancestors) {
  let prod = {};
  prod.ancestors = ancestors;
  prod.location  = variant.location;
  prod.optionTitle = 'color';
  prod.title = variant.color;
  prod.type = 'variant';
  prod.isVisible = false;
  prod.price = parseInt(variant.retailPrice, 10);
  prod.weight = variant.weight;
  prod.inventoryQuantity = variant.qty;
  prod.sku = variant.sku;
  prod.color = variant.color;
  prod.size = variant.size;
  prod.manufacturerSku = variant.manufacturerSku;
  let reactionProduct = ReactionCore.Collections.Products.findOne({
    title: prod.title,
    ancestors: ancestors
  });
  let reactionProductId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Found product = ' + reactionProductId);
    ReactionCore.Log.warn(variant.vendor + ' ' + variant.title + '-' + variant.size + ' ' + prod.title + ' has already been added');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'variant'}});
    ReactionCore.Log.info(variant.vendor + ' ' + variant.title + '-' + variant.size + ' ' + prod.title + ' was successfully added');
  }
}

function setupSizeVariants(size, sizeVariants, ancestors) {
  let prod = {};
  let inventory = _.reduce(sizeVariants, function (sum, sizeVariant) {
    return sum + parseInt(sizeVariant.qty, 10);
  }, 0);
  prod.ancestors = ancestors;
  prod.isVisible = false;
  prod.type = 'variant';
  prod.optionTitle = 'size';
  prod.title = size.size.trim();
  prod.price = parseInt(size.retailPrice, 10);
  prod.productType = size.productType.trim();
  prod.inventoryQuantity = inventory;
  let reactionProduct = ReactionCore.Collections.Products.findOne({
    title: prod.title,
    ancestors: ancestors
  });
  let reactionProductId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Found product = ' + reactionProductId);
    ReactionCore.Log.warn(size.vendor + ' ' + size.title + '-' + prod.title + ' has already been added.');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'variant'}});
    ReactionCore.Log.info(size.vendor + ' ' + size.title + '-' + prod.title + ' was successfully added to Products.');
  }

  ancestors.push(reactionProductId);
  _.each(sizeVariants, function (variant) {
    setupColorVariants(variant, ancestors);
  });
}

function findOrCreateTag(product) {
  let tags = [];
  tags.push(ReactionCore.Collections.Tags.upsert(product.gender));
  tags.push(ReactionCore.Collections.Tags.upsert(product.vendor));
  return tags;
}

function setupCSVProductDocument(product, skus) {
  // skus is an array of objects
  // each object represents a sku within single product.
  let prod = {}; // init empty object to hold new product.
  // let sizes = {}; // object of sizes by color; Key is color;
  let colors = []; // array of keys
  let sizes = [];
  prod.price = {};
  let maxPricedSku = _.max(skus, function (sku) {
    return parseInt(sku.retailPrice, 10);
  });
  let maxPrice = maxPricedSku.retailPrice;
  let minPricedSku = _.min(skus, function (sku) {
    return parseInt(sku.retailPrice, 10);
  });
  let minPrice = minPricedSku.retailPrice;
  // Build Color Variant Group
  let colorWays = _.groupBy(skus, function (sku) {
    return sku.color;
  });
  // Keeping track of colors for Higher level object
  colors = Object.keys(colorWays);
  let sizeWays = _.groupBy(skus, function (sku) {
    return sku.size;
  });
  // Keeping track of colors for Higher level object
  sizes = Object.keys(sizeWays);
  // Create Product Object;let tags = findOrCreateTag(product);
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
  prod.price.max = maxPrice;
  prod.price.min = minPrice;
  prod.price.range = minPrice + '-' + maxPrice;
  prod.colors = colors;
  prod.sizes = sizes;
  let reactionProduct = ReactionCore.Collections.Products.findOne({
    title: prod.title,
    vendor: prod.vendor,
    gender: prod.gender
  });
  let reactionProductId;
  if (reactionProduct) {
    reactionProductId = reactionProduct._id;
    ReactionCore.Log.warn('Found product = ' + reactionProductId);
    ReactionCore.Log.warn(prod.vendor + ' ' + prod.title + ' has already been added.');
  } else {
    reactionProductId = ReactionCore.Collections.Products.insert(prod, {selector: {type: 'simple'}});
    ReactionCore.Log.info(prod.vendor + ' ' + prod.title + ' was successfully added to Products.');
  }

  _.each(sizeWays, function (sizeVariant) {
    setupSizeVariants(sizeVariant[0], sizeVariant, [reactionProductId]);
  });
  if (!reactionProduct) {
    Meteor.call('products/updateProductTags', reactionProductId, prod.gender, null);
    Meteor.call('products/updateProductTags', reactionProductId, prod.productType, null);
    Meteor.call('products/updateProductTags', reactionProductId, prod.vendor, null);
  }
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
