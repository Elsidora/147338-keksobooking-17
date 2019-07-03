'use strict';
(function () {
  var titleLength = {
    min: 30,
    max: 100
  };

  var main = document.querySelector('main');
  var mapBlock = main.querySelector('.map');
  var mainPin = main.querySelector('.map__pin--main');
  var form = main.querySelector('.ad-form');
  var fieldsetForm = form.querySelectorAll('fieldset');

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var roomNumber = form.querySelector('#room_number');
  var guestNumber = form.querySelector('#capacity');

  var typeHousing = form.querySelector('#type');

  var typeHousingMap = {
    'bungalo': {
      min: 0,
      max: 1000000
    },
    'flat': {
      min: 1000,
      max: 1000000
    },
    'house': {
      min: 5000,
      max: 1000000
    },
    'palace': {
      min: 10000,
      max: 1000000
    }
  };

  var roomForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  var mainPinStartCoords = {
    x: parseInt(mainPin.style.left, 10) + mainPin.getBoundingClientRect().width / 2,
    y: parseInt(mainPin.style.top, 10) + mainPin.getBoundingClientRect().height / 2
  };

  form.address.value = mainPinStartCoords.x + ', ' + mainPinStartCoords.y;

  function disabledForm() {
    window.util.addAttribute(fieldsetForm, 'disabled');
  }

  function changeRoomNumberValue(value) {
    Array.from(guestNumber.options).forEach(function (option) {
      option.disabled = !roomForGuestsMap[value].includes(option.value);
    });
    guestNumber.value = value > 3 ? '0' : value;
  }

  changeRoomNumberValue(roomNumber.value);

  function onChangeRooms(evt) {
    changeRoomNumberValue(evt.currentTarget.value);
  }

  roomNumber.addEventListener('change', onChangeRooms);

  var housingTypes = Object.keys(typeHousingMap);

  var valid = true;
  var errorBox = null;
  function renderError(element, errorText) {
    errorBox = document.createElement('div');
    errorBox.className = 'errorbox';
    var errorParagraph = document.createElement('p');
    errorParagraph.className = 'errorbox__paragraph';
    errorParagraph.textContent = errorText;

    errorBox.appendChild(errorParagraph);
    element.insertAdjacentElement('afterEnd', errorBox);

    element.addEventListener('focus', onErrorRemove);

    element.addEventListener('blur', onFocusRemove);
  }

  function onErrorRemove(evt) {
    evt.preventDefault();
    if (errorBox) {
      errorBox.remove();
    }
  }

  function onFocusRemove(evt) {
    onErrorRemove(evt);
    evt.target.style.border = 'none';
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  function onChangeType(evt) {
    form.price.placeholder = typeHousingMap[evt.currentTarget.value].min;
  }
  typeHousing.addEventListener('change', onChangeType);

  function onChangeTimeIn(evt) {
    var timeInCurrentValue = evt.currentTarget.value;
    timeOut.value = timeInCurrentValue;
  }
  timeIn.addEventListener('change', onChangeTimeIn);

  function onChangeTimeOut(evt) {
    var timeOutCurrentValue = evt.currentTarget.value;
    timeIn.value = timeOutCurrentValue;
  }
  timeOut.addEventListener('change', onChangeTimeOut);

  document.addEventListener('pinMoveEvent', function (evt) {
    form.address.value = evt.coords.x + ', ' + evt.coords.y;
  });

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
    inputName.style.outline = 'none';
    inputName.style.border = '2px solid red';

  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (form.title) {
      var strLength = form.title.value.length;
      if (strLength < titleLength.min || strLength > titleLength.max) {
        valid = false;
        changeInputStyle(form.title);
        renderError(form.title, 'Количество символов в заголовке объявления не должно быть меньше 30 и больше 100');
        return;
      } else {
        valid = true;
      }
    }

    if (form.price) {
      for (var i = 0; i < housingTypes.length; i++) {
        if (typeHousing.value === housingTypes[i]) {
          if (form.price.value < typeHousingMap[housingTypes[i]].min || form.price.value > typeHousingMap[housingTypes[i]].max) {
            valid = false;
            changeInputStyle(form.price);
            renderError(form.price, 'Цена не может быть ниже указанного значения или выше 1000000');
            return;
          } else {
            valid = true;
          }
        }
      }
    }

    if (valid) {
      form.submit();
    }
  });

  window.form = {
    disabledForm: disabledForm
  };

})();
