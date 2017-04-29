'use strict';

window.manipulatePin = (function () {

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var init = function (users) {
    var dialog = document.querySelector('.dialog');
    var dialogClose = document.querySelector('.dialog__close');
    var pinElements = document.querySelectorAll('.pin-offer');

    var removeActiveClass = function () {
      document.querySelectorAll('.pin-offer').forEach(function (content, item) {
        content.classList.remove('pin--active');
      });
    };

    var onDialogClose = function () {
      removeActiveClass();
      dialog.classList.add('hidden');
    };

    var onPinClick = function (content) {
      removeActiveClass();
      dialog.classList.remove('hidden');
      content.classList.add('pin--active');

      var currentUserIndex = content.dataset.index;
      if (currentUserIndex) {
        window.showCard.populateDialog(users[currentUserIndex]);

        // Когда диалог открыт, то клавиша ESC должна закрывать диалог и деактивировать элемент .pin, который был помечен как активный
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 27) {
            onDialogClose();
          }
        });

        // Если диалог открыт и фокус находится на крестике, то нажатие клавиши ENTER приводит к закрытию диалога и деактивации элемента .pin, который был помечен как активный
        dialogClose.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 27) {
            onDialogClose();
          }
        });
      }
    };

    dialogClose.addEventListener('click', onDialogClose);

    pinElements.forEach(function (content, item) {
      content.addEventListener('click', function () {
        onPinClick(content);
      });
      content.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          onPinClick(content);
        }
      });
    });
    onDialogClose();
  };

  var onload = function (users) {
    window.pins.initializePins(users, init);
    window.pins.getPinDraggable();
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
