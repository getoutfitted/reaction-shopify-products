ReactionCore.Schemas.ShopifiedProducts = new SimpleSchema([
  ReactionCore.Schemas.Product, {
    colors: {
      type: [String],
      optional: true
    },
    cleaningBuffer: {
      type: Number,
      defaultValue: 0,
      optional: true
    },
    shopifyId: {
      type: String,
      optional: true
    },
    sizes: {
      type: [String],
      optional: true
    },
    productType: {
      type: String,
      optional: true
    },
    location: {
      type: Number,
      optional: true,
      decimal: true
    }
  }
]);

ReactionCore.Schemas.ShopifiedProductVariant = new SimpleSchema([
  ReactionCore.Schemas.ProductVariant, {
    location: {
      type: String,
      optional: true
    }
  }
]);
