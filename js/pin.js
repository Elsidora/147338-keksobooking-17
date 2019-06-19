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

  var pinSize = {
    width: 50,
    height: 70
  };

  var ordinate = {
    min: 130,
    max: 630
  };


  // window.util.addAttribute(mapBlock, 'map--faded', fieldsetForm, 'disabled');
  // window.util.addAttribute(mapBlock, 'map--faded', selectForm, 'disabled');


  fieldsetForm.forEach(function(item) {
    item.setAttribute('disabled', 'disabled');
  })

  selectForm.forEach(function(item) {
    item.setAttribute('disabled', 'disabled');
  })


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
    var pinCoordinates = [];
    var coordinates = {
      x: pin.offsetLeft + pinSize.width / 2,
      y: pin.offsetTop + pinSize.height / 2
    };
    pinCoordinates.push(coordinates.x);
    pinCoordinates.push(coordinates.y);

    return pinCoordinates.join(', ');
  }

  adForm.address.value = getCoordinatesPin();

  function onMouseDown(evt) {
    evt.preventDefault();

    // запоминаем координаты точки, с которой начинаем перемещать пин

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // обновляем смещение относительно первоначальной точки
    function onMouseMove(moveEvt) {
      evt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinBoxLeft = pinBox.getBoundingClientRect().left;
      var pinBoxTop = pinBox.getBoundingClientRect().top;

      var pinLeft = startCoords.x - shift.x - pinBoxLeft;
      var pinTop = startCoords.y - shift.y - pinBoxTop;

      if (pinLeft < pinBox.offsetLeft - pinSize.width / 2 || pinLeft > pinBox.offsetWidth - pinSize.width / 2) {
        return;
      }
      if (pinTop < ordinate.min || pinTop > ordinate.max) {
        return;
      }

      pin.style.left = pinLeft + 'px';
      pin.style.top = pinTop + 'px';

      function getCoordinatesPin() {
        var pinCoordinates = [];
        var coordinates = {
          x: pinLeft + pinSize.width / 2,
          y: pinTop + pinSize.height / 2
        };
        pinCoordinates.push(coordinates.x);
        pinCoordinates.push(coordinates.y);

        return pinCoordinates.join(', ');
      }

      adForm.address.value = getCoordinatesPin();


    }

    // при отпускании мыши перестаем слушать событие движения мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      if (mapBlock.classList.contains('map--faded')) {
        changeCondition();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp)
  }

  pin.addEventListener('mousedown', onMouseDown);

  function changeCondition() {
    // evt.preventDefault();
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetForm.forEach(function(item) {
      item.removeAttribute('disabled');
    });
    selectForm.forEach(function(item) {
      item.removeAttribute('disabled');
    });
    // window.util.addAttribute(mapBlock, 'map--faded', fieldsetForm, 'disabled');
    // window.util.addAttribute(mapBlock, 'map--faded', selectForm, 'disabled');
    var arrObjects = window.data.getAdsObjects(AD_AMOUNT, pinBox);
    window.util.renderElements(arrObjects, pinBox, createPin);

  }

  // pin.addEventListener('click', onPinClick);

  window.pin = {
    createPin: createPin
  };
})();
