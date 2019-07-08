'use strict';
(function () {

  var main = document.querySelector('main');
  var mapBlock = main.querySelector('.map');
  var adForm = main.querySelector('.ad-form');
  var fieldsetForm = main.querySelectorAll('fieldset');
  var selectForm = main.querySelectorAll('select');

  var mapElems = [];

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
        mapElems.push(elemItem);
      });
      container.appendChild(fragment);
    } else {
      container.parentNode.insertBefore(fragment, container.nextElementSibling);
    }
  }

  function clearMap() {
    mapElems.forEach(function (item) {
      item.remove();
    });
    mapElems = [];
  }

  window.map = {
    changeCondition: changeCondition,
    renderElements: renderElements,
    clearMap: clearMap
  };

})();
