'use strict';

window.initializeForm = (function () {
  // Проверка правильности введенных данных
  var noticeForm = document.querySelector('.notice__form');
  var formTime = noticeForm.querySelector('#time');
  var formTimeout = noticeForm.querySelector('#timeout');
  var formType = noticeForm.querySelector('#type');
  var formPrice = noticeForm.querySelector('#price');
  var formRoomNumber = noticeForm.querySelector('#room_number');
  var formCapacity = noticeForm.querySelector('#capacity');
  var formTitle = noticeForm.querySelector('#title');
  var formAddress = noticeForm.querySelector('#address');
  // синхронизация полей формы
  window.synchronizeFields = (function (syncDomElem, syncDomElem2, arrValueSync, arrValueSync2, cb) {
    syncDomElem.addEventListener('change', function () {
      var selectedVal = arrValueSync.indexOf(syncDomElem.value);
      cb(arrValueSync2[selectedVal]);
    });
  });

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], function (val) {
    formTimeout.value = val;
  });
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], function (val) {
    formTime.value = val;
  });
  window.synchronizeFields(formType, formPrice, ['1000', '0', '10000'], ['1000', '0', '10000'], function (val) {
    formPrice.min = val;
  });
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], function (val) {
    formCapacity.value = val;
  });
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], function (val) {
    formRoomNumber.value = val;
  });

  formTitle.required = true;
  formTitle.minLength = 50;
  formTitle.maxLength = 100;

  formPrice.required = true;
  formPrice.type = 'number';
  formPrice.min = 1000;
  formPrice.max = 1000000;
  formAddress.required = true;

})();
