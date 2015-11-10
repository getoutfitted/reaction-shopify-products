Router.route('dashboard/shopify-products', {
  controller: ShopAdminController,
  path: '/dashboard/shopify-products',
  template: 'dashboardShopifyProducts',
  waitOn: function () {
    return ReactionCore.Subscriptions.Packages;
  }
});
