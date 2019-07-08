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
    housingType: 'any'
  };

  function updateHousingTypeFilter(value) {
    filterCriteria.housingType = value;
    return filterCriteria.housingType;
  }

  function housingTypeFilter(adObject) {
    var result = true;
    if (filterCriteria.housingType !== 'any') {
      result = filterCriteria.housingType === adObject.offer.type;
    }
    return result;
  }

  function onChangeFilter(evt) {
    evt.preventDefault();
    var pins = window.data.get();
    var pinBox = document.querySelector('.map__pins');
    var value = isNaN(evt.target.value) ? evt.target.value : parseInt(evt.target.value, 10);

    if (evt.target.name === 'housing-type') {
      updateHousingTypeFilter(value);
    }

    var filteredPins = pins.filter(function (pin) {
      return housingTypeFilter(pin);
    }).slice(0, 5);

    window.map.clearMap();
    window.map.renderElements(filteredPins, pinBox, window.ad.createAdPin);

  }

  filtersForm.addEventListener('change', onChangeFilter);

  window.filter = {
    disabledForm: disabledForm
  };
})();
