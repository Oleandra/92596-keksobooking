'use strict'

window.showCard = (function () {
  
var similarLodgeTemplate = document.querySelector('#lodge-template').content;

var populateDialog = function (user) {
  var lodgeElement = similarLodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = user.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = user.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = user.offer.price + ' ₽/ночь';
  var translatedoffertype = '';
  if (user.offer.type === 'flat') {
    translatedoffertype = 'Квартира';
  } else if (user.offer.type === 'house') {
    translatedoffertype = 'Дом';
  } else if (user.offer.type === 'bungalo') {
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


return{
  populateDialog: populateDialog
}
})();
