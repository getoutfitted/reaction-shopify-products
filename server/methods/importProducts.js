Meteor.methods({
  importProducts: function (createdAtMin = '2015-09-01', productType = 'Jacket') {
    check(createdAtMin, String);
    check(productType, String);
    const shopifyCredentials = ReactionCore.Collections.Packages.findOne({name: 'reaction-shopify-products'}).settings.shopify;
    const Products = ReactionCore.Collections.Products;
    const apikey = shopifyCredentials.key;
    const password = shopifyCredentials.password;
    const domain = 'https://' + shopifyCredentials.shopname + '.myshopify.com';
    const query = '/admin/products.json';
    const fields = 'id,title,body_html,vendor,product_type,handle,tags';

    let res = HTTP.call('GET', domain + query, {
      params: {
        'fields': fields,
        'product_type': productType,
        'created_at_min': createdAtMin
      },
      auth: apikey + ':' + password
    });

    products = res.data.products;


    let tags = [];
    _.each(products, function (product) {
      let description = product.body_html.split(':description:')[0].replace(/(<([^>]+)>)/ig,"");
      let colors = product.body_html.split(':color:')[1];
      let jacketSizes = product.body_html.split(':jacketsizes:')[1].split(',');
      let pantSizes = product.body_html.split(':pantsizes:')[1].split(',');
      let gloveSizes = product.body_html.split(':glovesizes:')[1].split(',');
      let goggleTypes = product.body_html.split(':goggletypes:')[1].split(',');
      let goggleStyle = product.body_html.split(':goggles:')[1];
      let gloves = product.body_html.split(':gloves:')[1];
      let whatsIncluded = product.body_html.split(':whatsincluded:')[1].split(',');
      let vendor = product.vendor;
      let aboutVendor = product.body_html.split(':about:')[1];
      let productType = product.product_type;
      let handle = product.handle;
      tags = tags.concat(product.tags);
      // Create product object
      // Create product
    });
    // Create tags
  }
});
