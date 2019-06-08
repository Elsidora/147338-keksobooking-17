'use strict';
(function () {

  var ordinate = {
    min: 130,
    max: 630
  };

  var typeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var TYPES = Object.keys(typeMap);

  function getAuthor(num) {
    return {
      avatar: 'img/avatars/user0' + (num + 1) + '.png'
    };
  }

  function getOffer() {
    return {
      title: '',
      type: TYPES[window.util.getRandomNumber(0, TYPES.length - 1)]
    };
  }

  function getLocation(pinBox) {
    return {
      x: window.util.getRandomNumber(pinBox.offsetLeft, pinBox.offsetWidth),
      y: window.util.getRandomNumber(ordinate.min, ordinate.max)
    };
  }

  function getAdsObjects(amount, pinBox) {
    var adsObjects = [];
    for (var i = 0; i < amount; i++) {
      var adObject = {
        author: getAuthor(i),
        offer: getOffer(),
        location: getLocation(pinBox)
      };
      adsObjects.push(adObject);
    }
    return adsObjects;
  }

  window.data = {
    getAdsObjects: getAdsObjects
  };

})();
