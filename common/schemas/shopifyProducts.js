ReactionCore.Schemas.ShopifyProducts = new SimpleSchema({
  _id: {
    type: String,
    autoValue: ImportProducts.schemaIdAutoValue,
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
