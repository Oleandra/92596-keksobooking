'use strict';

window.initilizePin = (function () {
var fragment = document.createDocumentFragment();

for (var j = 0; j < window.createData.user.length; j++) {
  var similarNotice = document.createElement('div');
  var notice = window.createData.user[j];
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
})();

