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

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], function (val) {
    formTimeout.value = val;
  });
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], function (val) {
    formTime.value = val;
  });
  window.synchronizeFields(formType, formPrice, ['Квартира', 'Лачуга', 'Дворец'], ['1000', '0', '10000'], function (val) {
    formPrice.value = val;
    formPrice.setAttribute('min', val);
  });
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], function (val) {
    formCapacity.value = val;
  });
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], function (val) {
    formRoomNumber.value = val;
  });

  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;

  formPrice.required = true;
  formPrice.type = 'number';
  formPrice.max = 1000000;

  formAddress.required = true;

})();
