'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var main = document.querySelector('main');
  var mapBlock = main.querySelector('.map');

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

  window.ad = {
    createPin: createPin
  };
})();
