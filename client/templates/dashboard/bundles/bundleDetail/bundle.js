Template.dashboardBundleDetail.onCreated(function () {
  this.subscribe('ShopifyProducts/Bundle', Router.current().params.id);
});

Template.dashboardBundleDetail.helpers({
  bundle: function () {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    return bundle;
  },
  colors: function () {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    return Object.keys(bundle.colorWays);
  }
});

Template.dashboardBundleSettings.inheritsHelpersFrom('dashboardBundleDetail');

Template.dashboardBundleSettings.onCreated(function () {
  this.subscribe('ProductsOfType', 'Jacket');
  this.subscribe('ProductsOfType', 'Pants');
  this.subscribe('ProductsOfType', 'Goggles');
  this.subscribe('ProductsOfType', 'Gloves');
});

Template.dashboardBundleSettings.helpers({
  jackets: function () {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    let type = 'jacket';
    console.log('jacketId: ', bundle.colorWays[this][type + 'Id']);
    return Products.find({productType: 'Jacket'});
  },
  pants: function () {
    return Products.find({productType: 'Pants'});
  },
  gloves: function () {
    return Products.find({productType: 'Gloves'});
  },
  goggles: function () {
    return Products.find({productType: 'Goggles'});
  }
});

Template.dashboardBundleSettings.events({
  'change .jacket': function (event) {
    let options = {};
    options.bundleColor = this.toString();
    let Bundles = ReactionCore.Collections.Bundles;
    options.bundleId = Bundles.findOne()._id;
    options.productId = event.target.value;
    options.productType = 'jacket';
    Meteor.call('bundleProducts/updateBundleProduct', options);
  }
});

Template.bundleProductOption.helpers({
  isSelectedProduct: function (type, typeId) {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    let productType = type.toLowerCase();
    if (bundle.colorWays[Template.parentData()][productType + 'Id'] === typeId) {
      return 'True';
    }
    return 'False';
  }
});
