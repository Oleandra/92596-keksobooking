'use strict';

window.manipulatePin = (function () {

  window.showCard.populateDialog(window.createData.user[0]);


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
    content.classList.add('pin--active');

    var currentUserIndex = content.dataset.index;
    if (currentUserIndex) {
      window.showCard.populateDialog(window.createData.user[currentUserIndex]);

      content.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          window.showCard.populateDialog(window.createData.user[currentUserIndex]);
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
  };

  var closeDialog = function () {
    removeActiveClass();
    dialog.classList.add('hidden');
  };


  dialogClose.addEventListener('click', closeDialog);

  pinElements.forEach(function (content, item) {
    content.addEventListener('click', function () {
      pinOnClick(content);
    });
  });

  //draggable elements
    var pinHandle = document.querySelector('.pin__main');
    var address = document.querySelector('#address');


    var getPinCoords = function(pin) {
        var pinWidth = 44;
        var pinHeigth = 40;
        return {
        x: pin.offsetLeft + pinWidth / 2,
        y: pin.offsetTop + pinHeigth - 4
        };
    };

    pinHandle.addEventListener('mousedown', function(evt) {
        evt.preventDefault();
        return getPinCoords;

    });

    var getFormattedCoords = function(pin) {
        return 'x:' + Math.round(getPinCoords(pin).x) + '' + ' y:' + Math.round(getPinCoords(pin).y);
    };

    address.readOnly = true;
    address.value = getFormattedCoords(pinHandle);

    var onMouseEnter = function(enterEvt) {
        enterEvt.preventDefault();
        return getFormattedCoords;
        address.value = getFormattedCoords(pin);
    };

    pinHandle.addEventListener('mouseenter', onMouseEnter);

    var onMouseUp = function(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseup', onMouseUp);
    };

    pinHandle.addEventListener('mouseup', onMouseUp);
})();
