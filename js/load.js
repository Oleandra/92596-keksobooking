'use strict';

window.load = function (url, onLoad, onError) {
    // var statusBox = document.querySelector('.status-box');
    // var statusMessage = statusBlock.querySelector('.status-message');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200)  {
        onLoad(xhr.response);
        // statusBox.style = none;
    } else {
      onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
}
