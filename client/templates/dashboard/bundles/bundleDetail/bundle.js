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
  productSelected: function (productType) {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    return bundle.colorWays[this][productType + 'Id'];
  },
  jackets: function () {
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
  'change .updateBundleProduct': function (event) {
    let options = {};
    options.bundleColor = this.toString();
    let Bundles = ReactionCore.Collections.Bundles;
    options.bundleId = Bundles.findOne()._id;
    options.productId = event.target.value;
    options.productType = event.currentTarget.name;
    Meteor.call('bundleProducts/updateBundleProduct', options);
  }
});

Template.bundleProductOption.helpers({
  isSelectedProduct: function (type, typeId) {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    let productType = type.toLowerCase();
    if (bundle.colorWays[Template.parentData()][productType + 'Id'] === typeId) {
      return 'selected';
    }
    return '';
  }
});

Template.bundleProductColorSelect.onRendered(function () {
  let instance = this;
  instance.autorun(function () {
    let bundle = ReactionCore.Collections.Bundles.findOne();
    let color = instance.data.color;
    let productType = instance.data.product.toLowerCase();

    instance.data.productType = productType;
    instance.subscribe('Product', bundle.colorWays[color][productType + 'Id']);
    instance.data.productId = bundle.colorWays[color][productType + 'Id'];
  });
});

Template.bundleProductColorSelect.helpers({
  colors: function () {
    let product = ReactionCore.Collections.Products.findOne(this.productId);
    if (product) {
      return product.colors;
    }
  }
});

Template.bundleProductColorSelect.events({
  'change .updateBundleColor': function () {
    let options = {};
    options.bundleColor = this.color.toString();
    options.bundleId = ReactionCore.Collections.Bundles.findOne()._id;
    options.productColor = event.target.value;
    options.productType = this.productType;
    Meteor.call('bundleProducts/updateBundleProduct', options);
  }
});
