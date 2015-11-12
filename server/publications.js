/**
 * ShopifyProduct detail publication
 * @return {Object} return ShopifyProduct cursor
 */
let ShopifyProducts = ReactionCore.Collections.ShopifyProducts;

Meteor.publish('ShopifyProducts/CurrentImport', function () {
  let shop = ReactionCore.getCurrentShop(this);
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'createProduct'], shop._id)) {
    return false;
  }

  return ShopifyProducts.find({}, {sort: {createdAt: -1}, limit: 1});
});

// Security
// Security.permit(['insert', 'update', 'remove']).collections([ShopifyProducts]).ifHasRole({
//   role: 'admin',
//   group: ReactionCore.getShopId()
// }).ifShopIdMatches().exceptProps(['shopId']).apply();
//
ShopifyProducts.permit(['insert', 'update', 'remove']).ifHasRole({
  role: ['admin', 'createProduct'],
  group: ReactionCore.getShopId()
}).ifShopIdMatchesThisId().apply();
