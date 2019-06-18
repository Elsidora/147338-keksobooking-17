'use strict';
(function () {
  var titleLength = {
    min: 30,
    max: 100
  };

  var main = document.querySelector('main');
  var form = main.querySelector('.ad-form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

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
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  typeHousing.addEventListener('change', function (evt) {
    form.price.placeholder = typeHousingMap[evt.currentTarget.value].min;
  });

  timeIn.addEventListener('change', function (evt) {
    var timeInCurrentValue = evt.currentTarget.value;
    timeOut.value = timeInCurrentValue;
  });

  timeOut.addEventListener('change', function (evt) {
    var timeOutCurrentValue = evt.currentTarget.value;
    timeIn.value = timeOutCurrentValue;
  });

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
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
        form.title.style.border = 'none';
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
            form.price.style.border = 'none';
          }
        }
      }
    }


    if (valid) {
      form.submit();
    }
  });

})();
