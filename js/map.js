'use strict';
(() => {
  const PIN_HEIGHT = 87;
  const PIN_MIDDLE_WIDTH = 34;
  const MAX_MAP_WIDTH = 1200;
  const MIN_MAP_WIDTH = 270;
  const MIN_MAP_HEIGHT = 130;
  const MAX_MAP_HEIGHT = 630;
  const RIGHT_BUTTON = 0;

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsSection = map.querySelector(`.map__pins`);

  const form = document.querySelector(`.ad-form`);
  const activeFields = form.querySelectorAll(`.ad-form input, .ad-form select, .ad-form textarea, .ad-form button`);
  const addressInput = form.querySelector(`#address`);

  let currentCoordinateLeft = 570;
  let currentCoordinateTop = 375;
  let startCoordinates;
  let pinsArray;

  const convertFieldsToDisabled = () => {
    activeFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
  };

  const addId = () => {
    for (let i = 0; i < pinsArray.length; i++) {
      const pinsAdv = pinsArray[i];
      pinsAdv.id = i;
    }
  };

  const convertPageToActive = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    activeFields.forEach((field) => field.removeAttribute(`disabled`));
    mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  };

  const convertPageToDeactivate = () => {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    activeFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
    form.reset();
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
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
      window.card.open(pin, pinsArray);
    } else {
      if (card) {
        if (card.dataset !== pin.dataset) {
          window.card.open(pin, pinsArray);
        }
      }
    }
  };

  const removeOldPins = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((e) => {
        e.remove();
      });
    }
  };

  const addListenerOnPinSection = () => {
    pinsSection.addEventListener(`click`, onPinSectionClick);
  };

  const setAddressValue = () => {
    addressInput.value = `${currentCoordinateLeft + PIN_MIDDLE_WIDTH}, ${currentCoordinateTop + PIN_HEIGHT}`;
  };

  const activatePage = () => {
    convertPageToActive();
    fillDomElementsByPin();
    addListenerOnPinSection();
    setAddressValue();
  };

  const onMainPinMouseDown = (evt) => {
    if (typeof evt === `object`) {
      switch (evt.button) {
        case RIGHT_BUTTON:
          activatePage();
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

  const checkCoordinate = () => {
    currentCoordinateTop = currentCoordinateTop > MAX_MAP_HEIGHT ? MAX_MAP_HEIGHT : currentCoordinateTop;
    currentCoordinateTop = currentCoordinateTop < MIN_MAP_HEIGHT ? MIN_MAP_HEIGHT : currentCoordinateTop;
    currentCoordinateLeft = currentCoordinateLeft > (MAX_MAP_WIDTH - PIN_MIDDLE_WIDTH) ? (MAX_MAP_WIDTH - PIN_MIDDLE_WIDTH) : currentCoordinateLeft;
    currentCoordinateLeft = currentCoordinateLeft < MIN_MAP_WIDTH ? MIN_MAP_WIDTH : currentCoordinateLeft;
  };

  const setPinPosition = () => {
    mainPin.style.top = `${currentCoordinateTop}px`;
    mainPin.style.left = `${currentCoordinateLeft}px`;
  };

  const setMoveValue = (evt) => {
    let shift = {
      x: startCoordinates.x - evt.clientX,
      y: startCoordinates.y - evt.clientY
    };
    startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    currentCoordinateLeft = mainPin.offsetLeft - shift.x;
    currentCoordinateTop = mainPin.offsetTop - shift.y;
  };

  const onMouseMove = (evt) => {
    evt.preventDefault();
    setMoveValue(evt);
    checkCoordinate();
    setPinPosition();
    setAddressValue();
  };

  const onMouseUp = (evt) => {
    evt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  const onMouseDown = (evt) => {
    if (typeof evt === `object`) {
      switch (evt.button) {
        case RIGHT_BUTTON:
          evt.preventDefault();
          startCoordinates = {
            x: evt.clientX,
            y: evt.clientY
          };
          document.addEventListener(`mousemove`, onMouseMove);
          document.addEventListener(`mouseup`, onMouseUp);
          break;
      }
    }
  };

  const addListenerToActivatePage = () => {
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, onEnterKeydown);
    mainPin.addEventListener(`mousedown`, onMouseDown);
  };

  const activate = (pins) => {
    pinsArray = pins;
    convertFieldsToDisabled();
    addId();
    addListenerToActivatePage();
  };

  const deactivate = () => {
    currentCoordinateLeft = 570;
    currentCoordinateTop = 375;
    setPinPosition();
    convertPageToDeactivate();
    removeOldPins();
    window.card.remove();
  };

  window.map = {
    activate,
    deactivate,
    setAddressValue,
  };
})();
