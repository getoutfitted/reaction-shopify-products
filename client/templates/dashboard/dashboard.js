Template.dashboardShopifyProducts.helpers({
  apiConfigured: function () {
    let shopifyProducts = ReactionCore.Collections.Packages.findOne({
      name: 'reaction-shopify-products'
    });
    if (shopifyProducts.settings.shopify.key && shopifyProducts.settings.shopify.password && shopifyProducts.settings.shopify.shopname) {
      return true;
    }
    return false;
  }
});
