'use strict';

window.initilizePins = function (users, afterInitFn) {
  var filters  = {
    housingType:"any",
    housingRoomNumber:"any",
    housingGuestsNumber:"any",
    housingPrice:"any",
    features:[]

  };
  
  var onSingleFilterChange = function (filterKey, value){
     filters[filterKey] = value  
     filterPins(users, filters, afterInitFn);
  };

  document.querySelector('#housing_type').addEventListener('input', function(evt) {
    onSingleFilterChange('housingType', evt.target.value);
  });

  document.querySelector('#housing_room-number').addEventListener('input', function(evt) {
    onSingleFilterChange('housingRoomNumber', evt.target.value);
  });

  document.querySelector('#housing_guests-number').addEventListener('input', function(evt) {
       onSingleFilterChange('housingGuestsNumber', evt.target.value);
  });
  document.querySelector('#housing_price').addEventListener('input', function(evt)
  {
      onSingleFilterChange('housingPrice', evt.target.value);
  });
  document.querySelectorAll('input[name="feature"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function(evt){          
          if(evt.target.checked === false){
            filters.features = filters.features.filter(function(el){return el != evt.target.value}) ;
          }else {
            filters.features.push(evt.target.value)
          }          
          filterPins(users, filters, afterInitFn);
    });
  });

  addPins(users);
  afterInitFn(users);
};
 

var addPins = function(users){
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < users.length; j++) {
    var similarNotice = createPin(users[j], j);
    fragment.appendChild(similarNotice);
  }
  document.querySelector('.tokyo__pin-map').appendChild(fragment); 
}

var filterPins = function (users, filters, afterInitFn) {
  window.debounce(function(){
     var filteredUsers = window.filters.applyFilters(users, filters);
      removeElementsByClass("pin-offer");
      addPins(filteredUsers);
      afterInitFn(filteredUsers);
  });
};

var createPin = function(user, index){
  var similarNotice = document.createElement('div');
    var notice = user;
    similarNotice.className = 'pin pin-offer';
    similarNotice.dataset.index = index;
    similarNotice.tabindex = 0;
    similarNotice.style.left = notice.location.x + 'px';
    similarNotice.style.top = notice.location.y + 'px';

    var image = document.createElement('img');
    image.src = notice.author.avatar;
    image.className = 'rounded';
    image.width = 40;
    image.height = 40;
    similarNotice.appendChild(image);

    return similarNotice;
}

var removeElementsByClass = function(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
window.getPinDraggable = function () {

    var mainPin = document.querySelector('.pin__main');
    var address = document.querySelector('#address');

    address.readOnly = true;

    function getAddress(x, y) {
      address.value = 'x: ' + (x + 74 / 2) + ', y: ' + (y + 94);
    }

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startXY = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startXY.x - moveEvt.clientX,
          y: startXY.y - moveEvt.clientY
        };

        startXY = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        getAddress(mainPin.offsetLeft, mainPin.offsetTop);
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    getAddress(mainPin.offsetLeft, mainPin.offsetTop);

  };

