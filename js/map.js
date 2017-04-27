'use strict';

window.manipulatePin = (function () {

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var init = function (users) {
    var dialog = document.querySelector('.dialog');
    var dialogClose = document.querySelector('.dialog__close');
    var pinElements = document.querySelectorAll('.pin');
    
    var removeActiveClass = function () {
      document.querySelectorAll('.pin').forEach(function (content, item) {
        content.classList.remove('pin--active');
      });
    };

    var closeDialog = function () {
      removeActiveClass();
      dialog.classList.add('hidden');
    };
    

    if(users.length > 0) {
      window.showCard.populateDialog(users[0]);
    }
    else {
      closeDialog();
    }    

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

    dialogClose.addEventListener('click', closeDialog);

    pinElements.forEach(function (content, item) {
      content.addEventListener('click', function () {
        pinOnClick(content);
      });
    });
  };

  
  // server request

 
  var onload = function (users) {
    window.initilizePins(users, init);
    window.getPinDraggable();
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
