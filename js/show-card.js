'use strict';

window.showCard = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var similarLodgeTemplate = document.querySelector('#lodge-template').content;
  var offerDialogAvatar = offerDialog.querySelector('.dialog__title img');

  var translateOfferType = function (offetType) {
    if (offetType === 'flat') {
      return 'Квартира';
    }
    if (offetType === 'house') {
      return 'Дом';
    }
    if (offetType === 'bungalo') {
      return 'Бунгало';
    }
    return '';
  };
  var populateDialog = function (user) {
    var lodgeElement = similarLodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = user.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = user.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = user.offer.price + ' ₽/ночь';

    lodgeElement.querySelector('.lodge__type').textContent = translateOfferType(user.offer.type);
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

    var lodgePhotos = lodgeElement.querySelector('.lodge__photos');

    user.offer.photos.forEach(function (item) {
      var img = document.createElement('img');
      img.src = item;
      img.width = 52;
      img.height = 52;
      lodgePhotos.appendChild(img);
    });

    document.querySelector('.dialog__panel').replaceWith(lodgeElement);

    offerDialogAvatar.src = user.author.avatar;
  };

  return {
    populateDialog: populateDialog
  };
})();
