'use strict';

(() => {
  const QUANTITY_OF_ADVERTISEMENTS = 8;
  const MIN_QUANTITY_OF_ROOMS = 1;
  const MAX_QUANTITY_OF_ROOMS = 3;
  const MIN_QUANTITY_OF_VISITORS = 1;
  const MAX_QUANTITY_OF_VISITORS = 3;
  const MONEY_CONVERTER = 100;
  const MIN_X_COORDINATE = 100;
  const MAX_X_COORDINATE = 1100;
  const MIN_Y_COORDINATE = 130;
  const MAX_Y_COORDINATE = 630;
  const PIN_HEIGHT = 87;
  const PIN_MIDDLE_WIDTH = 36;
  const TYPES_OF_APARTMENTS = [`palace`, `flat`, `house`, `bungalow`];
  const NAMES_OF_APARTMENTS = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const map = document.querySelector(`.map`);
  const mapSpace = map.querySelector(`.map__overlay`);
  const pins = map.querySelector(`.map__pins`);
  const filter = map.querySelector(`.map__filters-container`);
  const form = document.querySelector(`.ad-form`);
  const activeFields = form.querySelectorAll(`.ad-form input, .ad-form select, .ad-form textarea, .ad-form button`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const addressInput = form.querySelector(`#address`);

  let currentCoordinateLeft = 570;
  let currentCoordinateTop = 375;

  const calculateCurrentValue = (evt) => {
    const type = evt.type;
    if (type === `mousedown`) {
      currentCoordinateLeft = evt.offsetX;
      currentCoordinateTop = evt.offsetY;
    }
    if (evt.offsetY < 130) {
      currentCoordinateTop = 130 + PIN_HEIGHT;
    } else if (evt.offsetY > 630) {
      currentCoordinateTop = 630 + PIN_HEIGHT;
    }

    if (evt.offsetX < 270) {
      currentCoordinateLeft = 270;
    } else if (evt.offsetX > 1200) {
      currentCoordinateLeft = 1200;
    }
  };

  const setAddressValue = (evt) => {
    calculateCurrentValue(evt);
    addressInput.value = `${currentCoordinateLeft + PIN_MIDDLE_WIDTH}, ${currentCoordinateTop + PIN_HEIGHT}`;
  };

  const convertFieldsToDisabled = () => {
    activeFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
  };

  const convertFormToActive = () => {
    form.classList.remove(`ad-form--disabled`);
    activeFields.forEach((field) => field.removeAttribute(`disabled`));
  };

  const activatePage = (evt) => {
    map.classList.remove(`map--faded`);
    convertFormToActive();
    setAddressValue(evt);
  };

  const onMapSpaceMouseDown = (evt) => {
    calculateCurrentValue(evt);
    mainPin.style.left = `${currentCoordinateLeft - PIN_MIDDLE_WIDTH}px`;
    mainPin.style.top = `${currentCoordinateTop - PIN_HEIGHT}px`;
    setAddressValue(evt);
  };

  const onMainPinMouseDown = (evt) => {
    if (typeof evt === `object`) {
      switch (evt.button) {
        case 0:
          activatePage(evt);
          break;
      }
    }
  };

  const onEnterKeydown = (evt) => {
    const isEnter = evt.key === `Enter`;
    if (isEnter) {
      evt.preventDefault();
      activatePage();
    }
  };

  const addListenerToActivatePage = () => {
    mapSpace.addEventListener(`mousedown`, onMapSpaceMouseDown);
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, onEnterKeydown);
  };

  const getAdvertisements = () => {
    let advertisements = [];
    for (let i = 0; i < QUANTITY_OF_ADVERTISEMENTS; i++) {
      let number = i + 1;
      const advertisement = {
        author: {
          avatar: `img/avatars/user0${number}.png`
        },
        offer: {
          title: `Уютные апартаменты №0${number}`,
          price: number * MONEY_CONVERTER,
          type: NAMES_OF_APARTMENTS[window.util.getRandomNumber(0, TYPES_OF_APARTMENTS.length)],
          rooms: window.util.getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
          guests: window.util.getRandomNumber(MIN_QUANTITY_OF_VISITORS, MAX_QUANTITY_OF_VISITORS),
          checkin: TIMES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, TIMES.length)],
          checkout: TIMES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, TIMES.length)],
          features: FEATURES.slice(window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, FEATURES.length)),
          description: `Классное место для отыха №0${number}`,
          photos: PHOTOS.slice(window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, PHOTOS.length)),
        },
        location: {
          x: window.util.getRandomNumber(MIN_X_COORDINATE, MAX_X_COORDINATE),
          y: window.util.getRandomNumber(MIN_Y_COORDINATE, MAX_Y_COORDINATE),
        }
      };
      advertisement.address = `${advertisement.location.x}, ${advertisement.location.y}`;
      advertisements.push(advertisement);
    }
    return advertisements;
  };

  const fillDomElementsByPin = (arr) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      const newPin = window.pin.create(arr[i]);
      fragment.appendChild(newPin);
    }
    pins.appendChild(fragment);
  };

  const fillDomElementsByCard = (arr) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      const newCard = window.card.create(arr[i]);
      fragment.appendChild(newCard);
    }
    map.insertBefore(fragment, filter);
  };

  const activate = () => {
    const pinsArray = getAdvertisements();
    fillDomElementsByPin(pinsArray);
    convertFieldsToDisabled();
    addListenerToActivatePage();
    fillDomElementsByCard(pinsArray);
  };

  activate();
})();
