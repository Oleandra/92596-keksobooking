'use strict';

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

var fragment = document.createDocumentFragment();

for (var j = 0; j < infoUser.length; j++) {
  var similarNotice = document.createElement('div');
  var notice = infoUser[j];
  similarNotice.className = 'pin';
  similarNotice.style.left = notice.location.x + 'px';
  similarNotice.style.top = notice.location.y + 'px';

  var image = document.createElement('img');
  image.src = anounce.author.avatar;
  image.className = 'rounded';
  image.width = 40;
  image.height = 40;
  similarNotice.appendChild(image);

  fragment.appendChild(similarNotice);
}

document.querySelector('.tokyo__pin-map').appendChild(fragment);

var similarLodgeTemplate = document.querySelector('#lodge-template').content;

var lodgeElement = similarLodgeTemplate.cloneNode(true);

var firstUser = infoUser[0];

lodgeElement.querySelector('.lodge__title').textContent = firstUser.offer.title;
lodgeElement.querySelector('.lodge__address').textContent = firstUser.offer.address;
lodgeElement.querySelector('.lodge__price').textContent = firstUser.offer.price + ' ₽/ночь';
var translatedoffertype = '';
if (firstUser.offer.type === flat) {
    translatedoffertype = 'Квартира';
  } else if(firstUser.offer.type === house) {
    translatedoffertype = 'Дом';
  } else if(firstUser.offer.type === bungalo) {
    translatedoffertype = 'Бунгало';
};
lodgeElement.querySelector('.lodge__type').textContent = translatedoffertype;
lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + firstUser.offer.guests + ' гостей в ' + firstUser.offer.rooms + ' комнатах';
lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + firstUser.offer.checkin +',' + ' выезд до' + firstUser.offer.checkout;
var offerFeaturesElement = lodgeElement.querySelector('.lodge__features');
firstUser.offer.features.forEach(function (item) {
  var featureElement = document.createElement('span');

  featureElement.classList.add('feature__image');
  featureElement.classList.add('feature__image--' + item);
  offerFeaturesElement.appendChild(featureElement);
});
lodgeElement.querySelector('.lodge__description').textContent = firstUser.offer.description;
  
document.querySelector('.dialog__panel').replaceWith(lodgeElement);
  
document.querySelector('#offer-dialog .dialog__title img').src = firstUser.author.avatar;
