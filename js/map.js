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
  similarNotice.dataset.index = j;
  similarNotice.tabindex = 0;
  similarNotice.style.left = notice.location.x + 'px';
  similarNotice.style.top = notice.location.y + 'px';

  var image = document.createElement('img');
  image.src = notice.author.avatar;
  image.className = 'rounded';
  image.width = 40;
  image.height = 40;
  similarNotice.appendChild(image);

  fragment.appendChild(similarNotice);
}

document.querySelector('.tokyo__pin-map').appendChild(fragment);

var similarLodgeTemplate = document.querySelector('#lodge-template').content;

var populateDialog = function (user){
  var lodgeElement = similarLodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = user.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = user.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = user.offer.price + ' ₽/ночь';
  var translatedoffertype = '';
  if (user.offer.type === flat) {
    translatedoffertype = 'Квартира';
  } else if (user.offer.type === house) {
    translatedoffertype = 'Дом';
  } else if (user.offer.type === bungalo) {
    translatedoffertype = 'Бунгало';
  }
  lodgeElement.querySelector('.lodge__type').textContent = translatedoffertype;
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + user.offer.guests + ' гостей в ' + user.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + user.offer.checkin + ',' + ' выезд до' + user.offer.checkout;
  var offerFeaturesElement = lodgeElement.querySelector('.lodge__features');
  user.offer.features.forEach(function (item) {
    var featureElement = document.createElement('span');

    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + item);
    offerFeaturesElement.appendChild(featureElement);
  });
  lodgeElement.querySelector('.lodge__description').textContent = user.offer.description;
  document.querySelector('.dialog__panel').replaceWith(lodgeElement);
  document.querySelector('#offer-dialog .dialog__title img').src = user.author.avatar;

};

populateDialog(infoUser[0]);

// module4-task1
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pinElements = document.querySelectorAll('.pin');

var removeActiveClass = function () {
  document.querySelectorAll('.pin').forEach(function (content, item) {
    content.classList.remove('pin--active');
  });
};

var pinOnClick = function (content) {
  removeActiveClass();
  dialog.classList.remove('hidden');
  this.classList.add('pin--active');

  var currentUserIndex = this.dataset.index;
  if (currentUserIndex) {
    populateDialog(infoUser[currentUserIndex]);

    this.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
         populateDialog(infoUser[currentUserIndex]);
      }
    });
    
    // Когда диалог открыт, то клавиша ESC должна закрывать диалог и деактивировать элемент .pin, который был помечен как активный
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
       closeDialog();
      }
    });

    // Если диалог открыт и фокус находится на крестике, то нажатие клавиши ENTER приводит к закрытию диалога и деактивации элемента .pin, который был помечен как активный
    dialogClose.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 27) {
           closeDialog();
          }
    });

  }
}

var closeDialog = function() {
  removeActiveClass();
  dialog.classList.add('hidden');
};


dialogClose.addEventListener("click", closeDialog);



pinElements.forEach(function(content, item) {
      content.addEventListener("click", pinOnClick);
});



