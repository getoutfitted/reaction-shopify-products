Template.dashboardShopifyProducts.helpers({
  apiConfigured: function () {
    let shopifyProducts = ReactionCore.Collections.Packages.findOne({
      name: 'reaction-shopify-products'
    });
    if (shopifyProducts.settings.shopify.key && shopifyProducts.settings.shopify.password && shopifyProducts.settings.shopify.shopname) {
      return true;
    }
    return false;
  },
  productType: function () {
    return Session.get('importShopifyProducts/productType');
  }
});

Template.dashboardShopifyProducts.events({
  'keyup #productType, change #productType': function (event) {
    Session.set('importShopifyProducts/productType', event.currentTarget.value);
  },
  'submit #fetch-shopify-products-form': function (event) {
    event.preventDefault();
    let update = false;
    if (event.target.updateIfExists.value === 'true') {
      update = true;
    }
    if (Session.get('importShopifyProducts/productType')) {
      Meteor.call('importShopifyProducts/importProducts', update, Session.get('importShopifyProducts/productType'));
    } else {
      Meteor.call('importShopifyProducts/importProducts', update);
    }
  }
});
