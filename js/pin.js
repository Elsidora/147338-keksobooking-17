'use strict';
(function () {
  var AD_AMOUNT = 8;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var mapBlock = main.querySelector('.map');
  var pin = mapBlock.querySelector('.map__pin--main');
  var fieldsetForm = main.querySelectorAll('fieldset');
  var selectForm = main.querySelectorAll('select');

  var pinBox = mapBlock.querySelector('.map__pins');

  var address = adForm.querySelector('#address');


  var pinSize = {
    width: 50,
    height: 70
  };

  function createPin(adObject) {
    var pinElement = pinTemplate.cloneNode(true);
    var image = pinElement.querySelector('img');
    pinElement.style.left = adObject.location.x - pinSize.width / 2 + 'px';
    pinElement.style.top = adObject.location.y + pinSize.height + 'px';
    image.src = adObject.author.avatar;
    image.alt = adObject.offer.title;
    return pinElement;
  }

  function getCoordinatesPin() {
    var coordinatesPin = [];
    var coordinates = {
      x: pin.offsetLeft + pinSize.width / 2,
      y: pin.offsetTop + pinSize.height / 2
    };
    coordinatesPin.push(coordinates.x);
    coordinatesPin.push(coordinates.y);

    return coordinatesPin.join(', ');
  }

  address.value = getCoordinatesPin();

  function onPinClick(evt) {
    evt.preventDefault();
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.addAttribute(mapBlock, 'map--faded', fieldsetForm, 'disabled');
    window.util.addAttribute(mapBlock, 'map--faded', selectForm, 'disabled');
    var arrObjects = window.data.getAdsObjects(AD_AMOUNT, pinBox);
    window.util.renderElements(arrObjects, pinBox, createPin);
    pin.removeEventListener('click', onPinClick);
  }

  pin.addEventListener('click', onPinClick);

  window.pin = {
    createPin: createPin
  };
})();
