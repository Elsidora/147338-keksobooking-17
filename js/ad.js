'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(adObject) {
    var pinElement = pinTemplate.cloneNode(true);
    var image = pinElement.querySelector('img');
    pinElement.style.left = adObject.location.x + 'px';
    pinElement.style.top = adObject.location.y + 'px';
    image.src = adObject.author.avatar;
    image.alt = adObject.offer.title;

    return pinElement;
  }

  window.ad = {
    createPin: createPin
  };
})();
