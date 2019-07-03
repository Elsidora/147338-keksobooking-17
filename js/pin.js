'use strict';
(function () {

  var mapBlock = document.querySelector('.map');
  var pinBox = mapBlock.querySelector('.map__pins');
  var mainPin = pinBox.querySelector('.map__pin--main');


  var mainPinSizeDefault = {
    width: 65,
    height: 65
  };

  var ordinate = {
    min: 130,
    max: 630
  };

  function getCoordinates() {
    var pinMoveEvent = new Event('pinMoveEvent', {bubbles: true, cancelable: true});
    pinMoveEvent.coords = {
      x: mainPin.offsetLeft + mainPin.getBoundingClientRect().width / 2,
      y: mainPin.offsetTop + mainPin.getBoundingClientRect().height
    };
    if (mapBlock.classList.contains('map--faded')) {
      pinMoveEvent.coords.y = mainPin.offsetTop + mainPin.getBoundingClientRect().height / 2;
    }
    document.dispatchEvent(pinMoveEvent);
  }

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

      if (pinLeft < pinBox.offsetLeft - mainPinSizeDefault.width / 2 || pinLeft > pinBox.offsetWidth - mainPinSizeDefault.width / 2) {
        return;
      }
      if (pinTop < ordinate.min || pinTop > ordinate.max) {
        return;
      }

      mainPin.style.left = pinLeft + 'px';
      mainPin.style.top = pinTop + 'px';

      getCoordinates();
    }

    // при отпускании мыши перестаем слушать событие движения мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      getCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.pin = {
    init: function (cb) {
      mainPin.addEventListener('mousedown', onMouseDown);
      function onStartApp() {
        mainPin.removeEventListener('mouseup', onStartApp);
        cb();
      }
      mainPin.addEventListener('mouseup', onStartApp);
    }
  };

})();

