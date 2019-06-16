'use strict';
(function () {

  // Функция нахождения случайного целого числа

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция добавления атрибута
  function addAttribute(block, blockClass, elements, attrElem) {
    if (block.classList.contains(blockClass)) {
      elements.forEach(function (item) {
        item.setAttribute(attrElem, attrElem);
      });
    } else {
      elements.forEach(function (item) {
        item.removeAttribute(attrElem);
      });
    }
  }

  // Функция отрисовки DOM-элементов
  function renderElements(arr, container, createElement) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      var elemItem = createElement(item);
      fragment.appendChild(elemItem);
    });
    container.appendChild(fragment);
  }

  window.util = {
    getRandomNumber: getRandomNumber,
    addAttribute: addAttribute,
    renderElements: renderElements
  };

})();
