ReactionCore.registerPackage({
  label: 'Import Shopify Products',
  name: 'reaction-shopify-products',
  icon: 'fa fa-download',
  autoEnable: false,
  registry: [
    // Dashboard card
    {
      provides: 'dashboard',
      label: 'Shopify Products',
      description: 'Import Products From Shopify',
      route: '/dashboard/shopify-products',
      icon: 'fa fa-download',
      container: 'getoutfitted',
      template: 'dashboardShopifyProducts',
      name: 'dashboardShopifyProducts',
      workflow: 'coreWorkflow'
    },

    // Settings panel
    {
      name: 'shopifyProductSettings',
      label: 'Shopify Products Settings',
      route: '/dashboard/shopify-products',
      provides: 'settings',
      template: 'shopifyProductsSettings'
    },
    {
      route: '/dashboard/product-bundles',
      name: 'product-bundles',
      template: 'dashboardProductBundles',
      workflow: 'coreWorkflow'
    },
    {
      route: '/dashboard/product-bundles/:_id',
      name: 'product-bundle',
      template: 'dashboardBundleDetail',
      workflow: 'coreWorkflow'
    }
  ]
});
