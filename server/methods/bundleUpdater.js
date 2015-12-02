function findProduct(handle) {
  let product =  Products.findOne({handle: handle}, {field: { _id: 1} });
  if (product) {
    return product._id;
  }
}
function hf(_id) {
  return Products.findOne(_id).handle;
}
function bf(title) {
  return Bundles.findOne({title: title}).colorWays;
}
let bundleTitle = {
  "Junior Boy\'s Burton Outfit": {
    colorWays: {
      trueBlackandBurnerTrueBlack: {
        jacketId: findProduct('boys-fray-amped-jacket'),
        jacketColor: 'True Black/Burner',
        pantsId: findProduct('boys-parkway-pant'),
        pantsColor: 'True Black',
        glovesId: findProduct('junior-gore-glove'),
        glovesColor: 'True Black',
        stdGogglesId: findProduct('junior-daredevil'),
        stdGogglesColor: 'Black',
        otgGogglesId: findProduct('junior-daredevil'),
        otgGogglesColor: 'Black'
      },
      burnerTrueBlack: {
        jacketId: findProduct('boys-fray-amped-jacket'),
        jacketColor: 'Burner',
        pantsId: findProduct('boys-parkway-pant'),
        pantsColor: 'True Black',
        glovesId: findProduct('junior-gore-glove'),
        glovesColor: 'True Black',
        stdGogglesId: findProduct('junior-daredevil'),
        stdGogglesColor: 'Black',
        otgGogglesId: findProduct('junior-daredevil'),
        otgGogglesColor: 'Black'
      },
      safetyBoroTrueBlack: {
        jacketId: findProduct('boys-fray-amped-jacket'),
        jacketColor: 'Safety/Boro',
        pantsId: findProduct('boys-parkway-pant'),
        pantsColor: 'True Black',
        glovesId: findProduct('junior-gore-glove'),
        glovesColor: 'True Black',
        stdGogglesId: findProduct('junior-daredevil'),
        stdGogglesColor: 'Black',
        otgGogglesId: findProduct('junior-daredevil'),
        otgGogglesColor: 'Black'
      }
    }
  },
  'Junior Boy\'s Patagonia Outfit': {
    colorWays: {
      sumacRedAshTan:
       { midlayerId: findProduct('mens-nano-air'),
         midlayerColor: 'French Red',
         jacketId: findProduct('boys-3-in-1'),
         jacketColor: 'Sumac Red',
         pantsId: findProduct('boys-insulated-snowshot'),
         pantsColor: 'Ash Tan',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: '9hFFYsj98caEaFCnc',
         stdGogglesColor: 'Black',
         otgGogglesId: '9hFFYsj98caEaFCnc',
         otgGogglesColor: 'Black' },
      channelBlueAshTan:
       { midlayerId: findProduct('mens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('boys-3-in-1'),
         jacketColor: 'Channel Blue',
         pantsId: findProduct('boys-insulated-snowshot'),
         pantsColor: 'Ash Tan',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('junior-daredevil'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('junior-daredevil'),
         otgGogglesColor: 'Black' }
    }
  },
  'Junior Girl\'s Obermeyer Outfit': {
    colorWays: {
      mediterraneanBlack: {
        jacketId: findProduct('girls-sara-jacket'),
        jacketColor: 'Mediterranean',
        pantsId: findProduct('girls-lea-pant'),
        pantsColor: 'Black',
        glovesId: findProduct('junior-gore-glove'),
        glovesColor: 'True Black',
        stdGogglesId: findProduct('junior-daredevil'),
        stdGogglesColor: 'White',
        otgGogglesId: findProduct('junior-daredevil'),
        otgGogglesColor: 'White' }
    }
  },
  'Men\'s Burton Outfit': {
    colorWays: {
      bogHeatherTrueBlack: {
        jacketId: findProduct('mens-covert-jacket'),
        jacketColor: 'Bog Heather',
        pantsId: findProduct('mens-cargo-pant'),
        pantsColor: 'True Black',
        glovesId: findProduct('mens-profile-glove'),
        glovesColor: 'True Black',
        stdGogglesId: findProduct('mens-vice'),
        stdGogglesColor: 'Black',
        otgGogglesId: findProduct('mens-vice'),
        otgGogglesColor: 'Black' }
    }
  },
  'Men\'s Patagonia Outfit': {
    colorWays: {
      classicRedAshTan:
       { midlayerId: findProduct('mens-nano-air'),
         midlayerColor: 'French Red',
         jacketId: findProduct('mens-snowshot-jacket'),
         jacketColor: 'Classic Red',
         pantsId: findProduct('mens-snowshot-pant'),
         pantsColor: 'Ash Tan',
         glovesId: findProduct('mens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' },
      underwaterBlueBlack:
       { midlayerId: findProduct('mens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('mens-snowshot-jacket'),
         jacketColor: 'Underwater Blue',
         pantsId: findProduct('mens-snowshot-pant'),
         pantsColor: 'Black',
         glovesId: findProduct('mens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' },
      blackBlack:
       { midlayerId: findProduct('mens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('mens-snowshot-jacket'),
         jacketColor: 'Black',
         pantsId: findProduct('mens-snowshot-pant'),
         pantsColor: 'Black',
         glovesId: findProduct('mens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' }
    }
  },
  'Men\'s Sport Outfit': {
    colorWays: {
      electricBlueBlack:
       { jacketId: findProduct('mens-powers---demands'),
         jacketColor: 'Electric Blue',
         pantsId: findProduct('mens-alpinist'),
         pantsColor: 'Black',
         glovesId: findProduct('mens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' },
      blackEbony:
       { jacketId: findProduct('mens-powers---demands'),
         jacketColor: 'Black',
         pantsId: findProduct('mens-alpinist'),
         pantsColor: 'Ebony',
         glovesId: findProduct('mens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' }
    }
  },
  'Women\'s Fera Luxe Outfit': {
    colorWays: {
      blackBlack:
       { jacketId: findProduct('womens-danielle-jacket'),
         jacketColor: 'Black',
         pantsId: findProduct('womens-lucy'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' }
    }
  },
  'Women\'s Patagonia Outfit': {
    colorWays: {
      aquaStoneBlack:
       { midlayerId: findProduct('womens-nano-air'),
         midlayerColor: 'Aqua Stone',
         jacketId: findProduct('womens-insulated-snowbelle'),
         jacketColor: 'Aqua Stone',
         pantsId: findProduct('womens-insulated-snowbelle-pants'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: 'DG6s2GALnmQdY2SC7',
         stdGogglesColor: 'White',
         otgGogglesId: 'DG6s2GALnmQdY2SC7',
         otgGogglesColor: 'White' },
      navyBlueUnderwaterBlue:
       { midlayerId: findProduct('womens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('womens-insulated-snowbelle'),
         jacketColor: 'Navy Blue',
         pantsId: findProduct('womens-insulated-snowbelle-pants'),
         pantsColor: 'Underwater Blue',
         glovesId: findProduct('womens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      blackBlack:
       { midlayerId: findProduct('womens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('womens-insulated-snowbelle'),
         jacketColor: 'Black',
         pantsId: findProduct('womens-insulated-snowbelle-pants'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-profile-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' } }
  },
  'Women\'s Roxy Outfit': {
    colorWays: {
      brightWhiteAnthracite:
       { jacketId: findProduct('womens-jet-ski-jacket'),
         jacketColor: 'Dixie Bright White',
         pantsId: findProduct('womens-creek-pant'),
         pantsColor: 'Anthracite',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' }
    }
  },
  'Youth Girl\'s Sport Outfit': {
    colorWays: {
      azaleaElectricBlue:
       { jacketId: findProduct('girls-youth-mckenzie-lizzie'),
         jacketColor: 'Azailia',
         pantsId: findProduct('youth-marvelous'),
         pantsColor: 'Electric Blue',
         glovesId: findProduct('youth-toddler-adrenaline-mitt'),
         glovesColor: 'Black',
         stdGogglesId: findProduct('youth-sidekick'),
         stdGogglesColor: 'Colbalt',
         otgGogglesId: findProduct('youth-sidekick'),
         otgGogglesColor: 'Violet Fridays' }
    }
  },
  'Youth Boy\'s Sport Outfit': {
    colorWays: {
      electricBlueElectricBlue:
       { jacketId: findProduct('boys-youth-damien'),
         jacketColor: 'Electric Blue',
         pantsId: findProduct('youth-marvelous'),
         pantsColor: 'Electric Blue',
         glovesId: findProduct('youth-toddler-adrenaline-mitt'),
         glovesColor: 'Black',
         stdGogglesId: findProduct('youth-sidekick'),
         stdGogglesColor: 'Violet Fridays',
         otgGogglesId: findProduct('youth-sidekick'),
         otgGogglesColor: 'Colbalt' },
      cloverBlack:
       { jacketId: findProduct('boys-youth-damien'),
         jacketColor: 'Clover',
         pantsId: findProduct('youth-marvelous'),
         pantsColor: 'Black',
         glovesId: findProduct('youth-toddler-adrenaline-mitt'),
         glovesColor: 'Black',
         stdGogglesId: findProduct('youth-sidekick'),
         stdGogglesColor: 'Colbalt',
         otgGogglesId: findProduct('youth-sidekick'),
         otgGogglesColor: 'Colbalt' }
    }
  },
  'Women\'s Sport Outfit': {
    colorWays: {
      whiteBlack:
       { jacketId: findProduct('womens-tuscany'),
         jacketColor: 'White',
         pantsId: findProduct('womens-malta---sugarbush'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      bluebirdBlack:
       { jacketId: findProduct('womens-tuscany'),
         jacketColor: 'Bluebird',
         pantsId: findProduct('womens-malta---sugarbush'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      vivaciousPinkBlack:
       { jacketId: findProduct('womens-tuscany'),
         jacketColor: 'Vivacious Pink',
         pantsId: findProduct('womens-malta---sugarbush'),
         pantsColor: 'Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      blackWhite:
       { jacketId: findProduct('womens-tuscany'),
         jacketColor: 'Black',
         pantsId: findProduct('womens-malta---sugarbush'),
         pantsColor: 'White',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' }
    }
  },
  'Women\'s Burton Outfit': {
    colorWays: {
      tropicTrueBlack:
       { jacketId: findProduct('womens-rubix-jacket'),
         jacketColor: 'Tropic',
         pantsId: findProduct('womens-summit-pant'),
         pantsColor: 'True Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      trueBlackTrueBlack:
       { jacketId: findProduct('womens-charlie-jacket'),
         jacketColor: 'True Black',
         pantsId: findProduct('womens-summit-pant'),
         pantsColor: 'True Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      diamondTrueBlack:
       { jacketId: findProduct('womens-rubix-jacket'),
         jacketColor: 'Diamond',
         pantsId: findProduct('womens-summit-pant'),
         pantsColor: 'True Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' },
      pixelFloralTrueBlack:
       { jacketId: findProduct('womens-radar-jacket'),
         jacketColor: 'Plx Flr / GRPS / Tropic',
         pantsId: findProduct('womens-summit-pant'),
         pantsColor: 'True Black',
         glovesId: findProduct('womens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('womens-transit'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('womens-transit'),
         otgGogglesColor: 'White' }
    }
  },
  'Men\'s DC Outfit': {
    colorWays: {
      camoBlack:
       { jacketId: findProduct('mens-servo-jacket'),
         jacketColor: 'Camo',
         pantsId: findProduct('mens-mission-insulated-pant'),
         pantsColor: 'Anthracite',
         glovesId: findProduct('mens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' },
      syrahBlack:
       { jacketId: findProduct('mens-servo-jacket'),
         jacketColor: 'Syrah',
         pantsId: findProduct('mens-mission-insulated-pant'),
         pantsColor: 'Anthracite',
         glovesId: findProduct('mens-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('mens-vice'),
         stdGogglesColor: 'Black',
         otgGogglesId: findProduct('mens-vice'),
         otgGogglesColor: 'Black' }
    }
  },
  'Junior Girl\'s Patagonia Outfit': {
    colorWays: {
      ultramarineBlack:
       { midlayerId: findProduct('womens-nano-air'),
         midlayerColor: 'Black',
         jacketId: findProduct('girls-3-in-1'),
         jacketColor: 'Ultramarine',
         pantsId: findProduct('girls-insulated-snowbelle'),
         pantsColor: 'Black',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('junior-daredevil'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('junior-daredevil'),
         otgGogglesColor: 'White' },
      lightAcaiBlack:
       { midlayerId: findProduct('womens-nano-air'),
         midlayerColor: 'Aqua Stone',
         jacketId: findProduct('girls-3-in-1'),
         jacketColor: 'Light Acai',
         pantsId: findProduct('girls-insulated-snowbelle'),
         pantsColor: 'Black',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('junior-daredevil'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('junior-daredevil'),
         otgGogglesColor: 'White' }
    }
  },
  'Junior Girl\'s Burton Outfit': {
    colorWays: {
      grapeseedGrapeseed:
       { jacketId: findProduct('girls-hart-jacket'),
         jacketColor: 'Grapeseed Block',
         pantsId: findProduct('girls-sweetart'),
         pantsColor: 'Grapeseed',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('junior-daredevil'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('junior-daredevil'),
         otgGogglesColor: 'White' },
      ultraBlueTrueBlack:
       { jacketId: findProduct('girls-hart-jacket'),
         jacketColor: 'Ultra Blue Block',
         pantsId: findProduct('girls-sweetart'),
         pantsColor: 'True Black',
         glovesId: findProduct('junior-gore-glove'),
         glovesColor: 'True Black',
         stdGogglesId: findProduct('junior-daredevil'),
         stdGogglesColor: 'White',
         otgGogglesId: findProduct('junior-daredevil'),
         otgGogglesColor: 'White' }
    }
  }
};

function bundleUpdater() {
  let bundleTitles = _.map(Bundles.find().fetch(), function (b) {
    return  b.title;
  });
  _.each(bundleTitles, function (title) {
    Bundles.update({title: title }, {
      $set: {
        colorWays: bundleTitle[title].colorWays
      }
    });
  });
}
