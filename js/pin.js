'use strict';
(function () {
  var AD_AMOUNT = 8;
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var pinBox = mapBlock.querySelector('.map__pins');

  var mainPinSizeDefault = {
    width: 65,
    height: 65
  };

  var ordinate = {
    min: 130,
    max: 630
  };

  function getCoordinates (pin, pinWidth, pinHeight) {
    var pinMoveEvent = new Event('pinMoveEvent', {bubbles: true, cancelable: true});
    pinMoveEvent.coords = {
      x: pin.offsetLeft + pinWidth,
      y: pin.offsetTop + pinHeight
    };
    document.dispatchEvent(pinMoveEvent);
  }

  getCoordinates(mainPin, mainPinSizeDefault.width / 2, mainPinSizeDefault.height / 2);

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

      console.log(pinLeft);

      var pinTop = startCoords.y - shift.y - pinBoxTop;

      if (pinLeft < pinBox.offsetLeft - mainPinSizeDefault.width / 2 || pinLeft > pinBox.offsetWidth - mainPinSizeDefault.width / 2) {
        return;
      }
      if (pinTop < ordinate.min || pinTop > ordinate.max) {
        return;
      }

      mainPin.style.left = pinLeft + 'px';
      mainPin.style.top = pinTop + 'px';

      if (mapBlock.classList.contains('.map--faded')) {
        getCoordinates(mainPin, mainPinSizeDefault.width / 2, mainPinSizeDefault.height / 2);
      } else {
        getCoordinates(mainPin, mainPinSizeDefault.width / 2, mainPinSizeDefault.height);
      }
    }

    // при отпускании мыши перестаем слушать событие движения мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onStartApp() {
    mainPin.removeEventListener('mouseup', onStartApp);
    var arrObjects = window.data.getAdsObjects(AD_AMOUNT, pinBox);
    window.map.changeCondition();
    window.map.renderElements(arrObjects, pinBox, window.ad.createPin);
  }

  window.pin = {
    init: function() {
      mainPin.addEventListener('mousedown', onMouseDown);
      mainPin.addEventListener('mouseup', onStartApp);
    }
  };

})();

