'use strict';
(function () {
  // создаем собственное (кастомное) событие готовности DOM
  var loadDataEvent = new Event('loadData', {bubbles: true, cancelable: true});
  function onPageStart() {
    window.ajax({
      url: 'https://js.dump.academy/keksobooking/data',
      type: 'json',
      success: function (data) {
        window.data.set(data);
        // спускаем созданное событие
        document.dispatchEvent(loadDataEvent);
      },
      sendError: function (errorMessage) {
        var main = document.querySelector('main');
        var errorBlock = document.createElement('div');
        errorBlock.classList.add('error-block');
        errorBlock.style.border = '2px solid red';
        errorBlock.style.textAlign = 'center';
        errorBlock.textContent = errorMessage;
        main.insertAdjacentElement('afterbegin', errorBlock);
      }
    });
    // прослушиваем его на документе
    document.addEventListener('loadData', onDataLoad);
  }
  function onDataLoad() {
    window.form.disabledForm();
    window.filter.disabledForm();
    window.pin.init(function () {
      var pinBox = document.querySelector('.map__pins');
      window.map.changeCondition();
      var pins = window.data.get().slice(0, 5);
      window.map.renderElements(pins, pinBox, window.ad.createPin);
    });
  }

  document.addEventListener('DOMContentLoaded', onPageStart);
})();
