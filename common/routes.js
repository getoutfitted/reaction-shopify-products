Router.route('dashboard/shopify-products', {
  controller: ShopAdminController,
  path: '/dashboard/shopify-products',
  template: 'dashboardShopifyProducts',
  waitOn: function () {
    return ReactionCore.Subscriptions.Packages;
  }
});

ProductBundlesAdminController = ShopAdminController.extend({
  onBeforeAction: function () {
    // TODO: Extract bundles into it's own package
    let shopifyProducts = ReactionCore.Collections.Packages.findOne({
      name: 'reaction-shopify-products'
    });
    if (!shopifyProducts.enabled) {
      this.render('notFound');
    } else {
      this.next();
    }
  }
});

Router.route('dashboard/productBundles', {
  controller: ProductBundlesAdminController,
  path: '/dashboard/productBundles',
  template: 'dashboardProductBundles'
});

Router.route('dashboard/productBundles/:id', {
  controller: ProductBundlesAdminController,
  path: '/dashboard/productBundles/:id',
  template: 'dashboardBundleDetail'
});
