ReactionCore.Schemas.ShopifyProductsPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    'settings.shopify.shopname': {
      type: String,
      label: 'Shopify Shop Name',
      optional: true
    },
    'settings.shopify.key': {
      type: String,
      label: 'Shopify API KEY',
      optional: true
    },
    'settings.shopify.password': {
      type: String,
      label: 'Shopify API Password',
      optional: true
    },
    'settings.shopify.lastUpdatedTime': {
      type: Date,
      label: 'Last time the product data was updated'
    }
  }
]);


ReactionCore.Schemas.ShopifyProducts = new SimpleSchema({
  _id: {
    type: String,
    autoValue: ReactionCore.schemaIdAutoValue,
    index: 1,
    label: 'Product Import ID'
  },
  status: {
    type: String,
    defaultValue: 'Fetching Products...'
  },
  currentProductId: {
    type: String,
    optional: true
  },
  currentProductTitle: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  }
});

ReactionCore.Collections.ShopifyProducts = ShopifyProducts = this.ShopifyProducts = new Mongo.Collection('ShopifyProducts');
ReactionCore.Collections.ShopifyProducts.attachSchema(ReactionCore.Schemas.ShopifyProducts);
