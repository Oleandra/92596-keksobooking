'use strict';

window.pins = (function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var tokyoMapImg = document.querySelector('section.tokyo img');
  var filtersContainer = document.querySelector('.tokyo__filters-container');
  var mainPin = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  var pinOffers = document.getElementsByClassName('pin-offer');
  var housingType = document.querySelector('#housing_type');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingPrice = document.querySelector('#housing_price');
  var featureInputs = document.querySelectorAll('input[name="feature"]');

  var filters = {
    housingType: housingType.value,
    housingRoomNumber: housingRoomNumber.value,
    housingGuestsNumber: housingGuestsNumber.value,
    housingPrice: housingPrice.value,
    features: []
  };

  var initializePins = function (users, afterInitFn) {

    var initializeFilters = function () {
      return window.filters.applyFilters(users, filters);
    };

    var onSingleFilterChange = function (filterKey, value) {
      filters[filterKey] = value;
      filterPins(users, afterInitFn);
    };

    var toggleFeature = function (checkbox) {
      if (checkbox.checked === false) {
        filters.features = filters.features.filter(function (el) {
          return el !== checkbox.value;
        });
      } else {
        filters.features.push(checkbox.value);
      }
    };

    var onFeatureChange = function (evt) {
      toggleFeature(evt.target);
      filterPins(users, afterInitFn);
    };

    housingType.addEventListener('input', function (evt) {
      onSingleFilterChange('housingType', evt.target.value);
    });

    housingRoomNumber.addEventListener('input', function (evt) {
      onSingleFilterChange('housingRoomNumber', evt.target.value);
    });

    housingGuestsNumber.addEventListener('input', function (evt) {
      onSingleFilterChange('housingGuestsNumber', evt.target.value);
    });

    housingPrice.addEventListener('input', function (evt) {
      onSingleFilterChange('housingPrice', evt.target.value);
    });

    featureInputs.forEach(function (feature) {
      feature.addEventListener('change', onFeatureChange);
    });

    var filteredUsers = initializeFilters();
    addPins(filteredUsers);
    afterInitFn(filteredUsers);
  };

  var addPins = function (users) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < users.length; j++) {
      var similarNotice = createPin(users[j], j);
      fragment.appendChild(similarNotice);
    }
    tokyoPinMap.appendChild(fragment);
  };

  var filterPins = function (users, afterInitFn) {
    window.debounce(function () {
      var filteredUsers = window.filters.applyFilters(users, filters);
      removeElements(pinOffers);
      addPins(filteredUsers);
      afterInitFn(filteredUsers);
    });
  };

  var createPin = function (user, index) {
    var similarNotice = document.createElement('div');
    var notice = user;
    similarNotice.className = 'pin pin-offer';
    similarNotice.dataset.index = index;
    similarNotice.tabIndex = 0;
    similarNotice.style.left = notice.location.x + 'px';
    similarNotice.style.top = notice.location.y + 'px';

    var image = document.createElement('img');
    image.src = notice.author.avatar;
    image.className = 'rounded';
    image.width = 40;
    image.height = 40;

    similarNotice.appendChild(image);

    return similarNotice;
  };

  var removeElements = function (elements) {
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  var getAddress = function (x, y) {
    address.value = 'x: ' + (x + 74 / 2) + ', y: ' + (y + 94);
  };

  var getPinDraggable = function () {

    address.readOnly = true;

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startXY = {
        x: evt.clientX,
        y: evt.clientY
      };

      var move = function (moveY, moveX) {
        mainPin.style.top = moveY + 'px';
        mainPin.style.left = moveX + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startXY.x - moveEvt.clientX,
          y: startXY.y - moveEvt.clientY
        };

        startXY = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var bound = {
          x: tokyoMapImg.offsetWidth - mainPin.offsetWidth,
          y: tokyoMapImg.offsetHeight - mainPin.offsetHeight - filtersContainer.offsetHeight
        };

        var moveY = (mainPin.offsetTop - shift.y);
        var moveX = (mainPin.offsetLeft - shift.x);

        if (moveX > 0 && moveX < bound.x && moveY > 0 && moveY < bound.y) {
          move(moveY, moveX);
          getAddress(mainPin.offsetLeft, mainPin.offsetTop);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    getAddress(mainPin.offsetLeft, mainPin.offsetTop);

  };

  return {
    initializePins: initializePins,
    getPinDraggable: getPinDraggable
  };

})();
