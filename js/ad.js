'use strict';
(function () {
  var typeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var pinAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardAdTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapBlock = document.querySelector('.map');

  var adCurrent = null;
  var pinActive = null;


  function createAdPin(adObject) {
    var pinElement = pinAdTemplate.cloneNode(true);
    var image = pinElement.querySelector('img');
    pinElement.style.left = adObject.location.x + 'px';
    pinElement.style.top = adObject.location.y + 'px';
    image.src = adObject.author.avatar;
    image.alt = adObject.offer.title;

    function onPinClick() {
      openAdCurrent();
    }

    function openAdCurrent () {
      if (adCurrent) {
        adCurrent.remove();
      }
      adCurrent = createAdCard(adObject);
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
      pinActive = pinElement;
      pinActive.classList.add('map__pin--active');
      mapBlock.lastElementChild.insertAdjacentElement('beforeBegin', adCurrent);

      var adClose = adCurrent.querySelector('.popup__close');

      function onAdCloseClick(evt) {
        evt.preventDefault();
        closeAdCurrent();
        document.removeEventListener('keydown', onEscPress);
      }

      var onEscPress = window.util.isEscPress(closeAdCurrent);
      var onCloseCardEnterPress = window.util.isEnterPress(closeAdCurrent);

      adClose.addEventListener('click', onAdCloseClick);
      adClose.addEventListener('keydown', onCloseCardEnterPress);
      document.addEventListener('keydown', onEscPress);
    }

    function closeAdCurrent () {
      pinActive.classList.remove('map__pin--active');
      pinActive.blur();
      adCurrent.remove();
    }

    var onOpenCardEnterPress = window.util.isEnterPress(openAdCurrent);

    pinElement.addEventListener('click', onPinClick);
    pinElement.addEventListener('keydown', onOpenCardEnterPress);

    return pinElement;
  }

  function createAdCard(adObject) {
    var cardAdElement = cardAdTemplate.cloneNode(true);
    cardAdElement.querySelector('.popup__title').textContent = adObject.offer.title;
    cardAdElement.querySelector('.popup__text--address').textContent = adObject.offer.address;
    cardAdElement.querySelector('.popup__text--price').innerHTML = adObject.offer.price + '₽' + '<span>/ночь</span>';
    cardAdElement.querySelector('.popup__type').textContent = typeMap[adObject.offer.type];
    cardAdElement.querySelector('.popup__text--capacity').innerHTML = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей.';
    cardAdElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout + '.';
    cardAdElement.querySelector('.popup__description').textContent = adObject.offer.description;

    var features = cardAdElement.querySelector('.popup__features');
    var feature = features.querySelector('.popup__feature');
    features.innerHTML = '';
    adObject.offer.features.forEach(function (item) {
      var featureNew = feature.cloneNode();
      featureNew.className = '';
      featureNew.classList.add('popup__feature', 'popup__feature--' + item);
      features.appendChild(featureNew);
    });

    var photos = cardAdElement.querySelector('.popup__photos');
    var photoImg = photos.querySelector('.popup__photo');
    photos.innerHTML = '';
    adObject.offer.photos.forEach(function (src) {
      var photo = photoImg.cloneNode(true);
      photo.src = src;
      photos.appendChild(photo);
    });

    cardAdElement.querySelector('.popup__avatar').src = adObject.author.avatar;

    return cardAdElement;
  }

  window.ad = {
    createAdPin: createAdPin
  };
})();
