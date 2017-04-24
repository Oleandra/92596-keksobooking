'use strict';

window.manipulatePin = (function () {

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var init = function (users) {

    window.showCard.populateDialog(users[0]);

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
        window.showCard.populateDialog(users[currentUserIndex]);

        content.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 13) {
            window.showCard.populateDialog(users[currentUserIndex]);
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
  };

  var getPinDraggable = function () {

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
  // server request

  var onload = function (users) {
    window.initilizePin(users);
    getPinDraggable();
    init(users);

  };
  var onerror = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: blue;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(URL, onload, onerror);

})();
