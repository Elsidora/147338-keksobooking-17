'use strict';
(function () {

  var AD_AMOUNT = 8;
  var mapBlock = document.querySelector('.map');
  mapBlock.classList.remove('map--faded');
  var pinBox = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinSize = {
    width: 50,
    height: 70
  };

  function createPin(adObject) {
    var pinElement = pinTemplate.cloneNode(true);
    var image = pinElement.querySelector('img');
    pinElement.style.left = adObject.location.x + pinSize.width / 2 + 'px';
    pinElement.style.top = adObject.location.y + pinSize.height + 'px';
    image.src = adObject.author.avatar;
    image.alt = adObject.offer.title;
    return pinElement;
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

  var arrObjects = window.data.getAdsObjects(AD_AMOUNT, pinBox);
  renderElements(arrObjects, pinBox, createPin);

})();
