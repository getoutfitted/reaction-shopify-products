/**
 * ShopifyProduct detail publication
 * @return {Object} return ShopifyProduct cursor
 */
let ShopifyProducts = ReactionCore.Collections.ShopifyProducts;
let Bundles = ReactionCore.Collections.Bundles;

Meteor.publish('ShopifyProducts/CurrentImport', function () {
  let shop = ReactionCore.getCurrentShop(this);
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'createProduct'], shop._id)) {
    return false;
  }

  return ShopifyProducts.find({}, {sort: {createdAt: -1}, limit: 1});
});

Meteor.publish('ShopifyProducts/Bundles', function() {
  let shop = ReactionCore.getCurrentShop(this);
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'createProduct'], shop._id)) {
    return false;
  }

  return Bundles.find({}, {sort: {title: -1} });
});


/**
 * product detail publication
 * @param {String} productId - productId
 * @return {Object} return product cursor
 */
Meteor.publish('ShopifyProducts/Bundle', function(bundleId) {
  check(bundleId, String);
  let shop = ReactionCore.getCurrentShop(this);
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'createProduct'], shop._id)) {
    return false;
  }
  let Bundles = ReactionCore.Collections.Bundles;
  let selector = {};

  // TODO review for REGEX / DOS vulnerabilities.
  if (bundleId.match(/^[A-Za-z0-9]{17}$/)) {
    selector._id = productId;
  } else {
    selector.handle = {
      $regex: bundleId,
      $options: "i"
    };
  }
  return Bundles.find(selector);
});
