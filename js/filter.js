'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFieldset = filtersForm.querySelectorAll('fieldset');
  var filtersFormSelect = filtersForm.querySelectorAll('select');

  function disabledForm() {
    window.util.addAttribute(filtersFormSelect, 'disabled');
    window.util.addAttribute(filtersFormFieldset, 'disabled');
  }

  var filterCriteria = {
    housingType: []
  };

  function updateHousingTypeFilter(value) {
    if (filterCriteria.housingType.includes(value)) {
      filterCriteria.housingType.splice(filterCriteria.housingType.indexOf(value), 1);
    } else {
      filterCriteria.housingType.length = 0;
      filterCriteria.housingType.push(value);
    }
  }

  function housingTypeFilter(adObject) {
    return filterCriteria.housingType.includes(adObject.offer.type);
  }

  function onChangeFilter(evt) {
    evt.preventDefault();
    var pins = window.data.get();
    var pinBox = document.querySelector('.map__pins');
    if (evt.target.value === 'any') {
      var pinsSlice = pins.slice(0, 5);
      window.map.clearMap();
      window.map.renderElements(pinsSlice, pinBox, window.ad.createPin);
      return;
    }
    if (evt.target.id === 'housing-type') {
      updateHousingTypeFilter(evt.target.value);

      var filteredPins = pins.filter(function (pin) {
        return housingTypeFilter(pin);
      }).slice(0, 5);

      window.map.clearMap();
      window.map.renderElements(filteredPins, pinBox, window.ad.createPin);
    }

  }

  filtersForm.addEventListener('change', onChangeFilter);

  window.filter = {
    disabledForm: disabledForm
  };
})();
