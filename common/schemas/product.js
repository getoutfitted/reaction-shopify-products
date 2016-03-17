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
    gender: {
      type: String,
      optional: true
    }
  }
]);

ReactionCore.Schemas.ShopifiedProductVariant = new SimpleSchema([
  ReactionCore.Schemas.ProductVariant, {
    location: {
      type: String,
      optional: true
    },
    color: {
      type: String,
      optional: true
    },
    size: {
      type: String,
      optional: true
    }
  }
]);
