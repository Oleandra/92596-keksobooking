'use strict';

window.createData = (function () {

  var offerTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var flat = 'flat';
  var house = 'house';
  var bungalo = 'bungalo';
  var offerType = [flat, house, bungalo];
  var offerCheck = ['12:00', '13:00', '14:00'];
  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var randomMaxandMin = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var infoUser = [];

  for (var i = 0; i < 8; i++) {
    var locationCoordX = randomMaxandMin(300, 900);
    var locationCoordY = randomMaxandMin(100, 500);
    var featuresLength = randomMaxandMin(0, offerFeatures.length);
    var features = [];
  for (var y = 0; y < featuresLength; y++) {
    features[y] = offerFeatures[y];
  }
  var anounce = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: offerTitle[i],
      address: locationCoordX + ',' + locationCoordY,
      price: randomMaxandMin(1000, 1000000),
      type: offerType[randomMaxandMin(0, offerType.length)],
      rooms: randomMaxandMin(1, 5),
      guests: randomMaxandMin(1, 10),
      checkin: offerCheck[randomMaxandMin(0, offerCheck.length)],
      checkout: offerCheck[randomMaxandMin(0, offerCheck.length)],
      features: features,
      description: '',
      photos: [],
    },

    location: {
      x: locationCoordX,
      y: locationCoordY,
    }

  };

  infoUser.push(anounce);

}

  return {
    user: infoUser
  };


})();
