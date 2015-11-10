Package.describe({
  summary: 'Import products from existing Shopify store into ReactionCommerce',
  name: 'getoutfitted:reaction-shopify-products',
  version: '0.0.1',
  git: 'https://github.com/getoutfitted/reaction-shopify-products'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2');
  api.use('meteor-platform');
  api.use('less');
  api.use('http');
  api.use('underscore');
  api.use('reactioncommerce:core@0.9.4');
  api.use('reactioncommerce:reaction-accounts@1.5.2');
  api.use('iron:router@1.0.12');
  api.use('momentjs:moment@2.10.6');
  api.use('momentjs:twix@0.7.2');
  api.use('dburles:factory@0.3.10');
  api.use('reactioncommerce:reaction-factories');

  api.addFiles('server/register.js', 'server'); // Register as reaction package

  api.addFiles([
    'server/methods/importProducts.js'
  ], 'server');

  api.addFiles([
    'common/routes.js',
    'common/collections.js'
  ], ['client', 'server']);

  api.addFiles([
    'client/templates/settings/settings.html',
    'client/templates/settings/settings.js',
    'client/templates/dashboard/dashboard.html',
    'client/templates/dashboard/dashboard.js'
  ], 'client');
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.20.2');
  api.use('underscore');
  api.use('dburles:factory@0.3.10');
  api.use('velocity:html-reporter@0.9.0');
  api.use('velocity:console-reporter@0.1.3');
  api.use('velocity:helpers');
  api.use('reactioncommerce:reaction-factories');

  api.use('reactioncommerce:core@0.9.4');
  api.use('reactioncommerce:bootstrap-theme');
  api.use('getoutfitted:reaction-shopify-products');

  api.addFiles('tests/jasmine/server/integration/methods.js', 'server');
});
