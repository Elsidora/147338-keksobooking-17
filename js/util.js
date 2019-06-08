'use strict';
(function() {
  // Функция нахождения случайного целого числа
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  window.util = {
    getRandomNumber: getRandomNumber
  };
})();
