'use strict';
(() => {
  const PIN_HEIGHT = 87;
  const PIN_MIDDLE_WIDTH = 36;
  const MAX_MAP_WIDTH = 1200;
  const MIN_MAP_WIDTH = 270;
  const MIN_MAP_HEIGHT = 130;
  const MAX_MAP_HEIGHT = 630;
  const RIGHT_BUTTON = 0;

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsSection = map.querySelector(`.map__pins`);
  const mapSpace = map.querySelector(`.map__overlay`);
  const form = document.querySelector(`.ad-form`);
  const activeFields = form.querySelectorAll(`.ad-form input, .ad-form select, .ad-form textarea, .ad-form button`);
  const addressInput = form.querySelector(`#address`);

  let currentCoordinateLeft = 570;
  let currentCoordinateTop = 375;

  const pinsArray = window.data.getAdvertisements();

  const convertFieldsToDisabled = () => {
    activeFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
  };

  const addId = () => {
    for (let i = 0; i < pinsArray.length; i++) {
      const pinsAdv = pinsArray[i];
      pinsAdv.id = i;
    }
  };

  const calculateValueOfCoordinate = (evt) => {
    const type = evt.type;
    if (type === `mousedown`) {
      currentCoordinateLeft = evt.offsetX;
      currentCoordinateTop = evt.offsetY;
    }

    if (evt.offsetY < MIN_MAP_HEIGHT) {
      currentCoordinateTop = MIN_MAP_HEIGHT + PIN_HEIGHT;
    } else if (evt.offsetY > MAX_MAP_HEIGHT) {
      currentCoordinateTop = MAX_MAP_HEIGHT + PIN_HEIGHT;
    }

    if (evt.offsetX < MIN_MAP_WIDTH) {
      currentCoordinateLeft = MIN_MAP_WIDTH;
    } else if (evt.offsetX > MAX_MAP_WIDTH) {
      currentCoordinateLeft = MAX_MAP_WIDTH;
    }
  };

  const convertPageToActive = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    activeFields.forEach((field) => field.removeAttribute(`disabled`));
  };

  const fillDomElementsByPin = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      const newPin = window.pin.create(pinsArray[i]);
      fragment.appendChild(newPin);
    }
    pinsSection.appendChild(fragment);
  };

  const onPinSectionClick = (evt) => {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    const card = document.querySelector(`.map__card.popup`);
    if (pin && !card) {
      window.card.open(pin);
    }
  };

  const addListenerOnPinSection = () => {
    pinsSection.addEventListener(`click`, onPinSectionClick);
  };

  const indicatePinPosition = () => {
    mainPin.style.left = `${currentCoordinateLeft - PIN_MIDDLE_WIDTH}px`;
    mainPin.style.top = `${currentCoordinateTop - PIN_HEIGHT}px`;
  };

  const setAddressValue = (evt) => {
    calculateValueOfCoordinate(evt);
    addressInput.value = `${currentCoordinateLeft + PIN_MIDDLE_WIDTH}, ${currentCoordinateTop + PIN_HEIGHT}`;
  };

  const activatePage = (evt) => {
    convertPageToActive();
    fillDomElementsByPin();
    addListenerOnPinSection();
    setAddressValue(evt);
  };

  const onMapSpaceMouseDown = (evt) => {
    calculateValueOfCoordinate(evt);
    indicatePinPosition();
    setAddressValue(evt);
  };

  const onMainPinMouseDown = (evt) => {
    if (typeof evt === `object`) {
      switch (evt.button) {
        case RIGHT_BUTTON:
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

  const activate = () => {
    convertFieldsToDisabled();
    addId();
    addListenerToActivatePage();
  };

  window.map = {
    activate,
  };
})();
