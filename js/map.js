'use strict';
(function () {

  var main = document.querySelector('main');
  var mapBlock = main.querySelector('.map');
  var pinBox = mapBlock.querySelector('.map__pins');
  var adForm = main.querySelector('.ad-form');
  var fieldsetForm = main.querySelectorAll('fieldset');
  var selectForm = main.querySelectorAll('select');

  function changeCondition() {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.util.removeAttribute(fieldsetForm, 'disabled');
    window.util.removeAttribute(selectForm, 'disabled');
  }

  // Функция отрисовки DOM-элементов

  function renderElements(arr, container, createElement) {
    var fragment = document.createDocumentFragment();
    if (Array.isArray(arr)) {
      arr.forEach(function (item) {
        var elemItem = createElement(item);
        fragment.appendChild(elemItem);
      });
      container.appendChild(fragment);
    }
  }

  window.form.disabledForm();
  window.pin.init();

  window.map = {
    changeCondition: changeCondition,
    renderElements: renderElements
  };

})();
