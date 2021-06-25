'use strict';
(() => {
  const PIN_HEIGHT = 87;
  const PIN_MIDDLE_WIDTH = 34;
  const MAX_MAP_WIDTH = 1200;
  const MIN_MAP_WIDTH = 270;
  const MIN_MAP_HEIGHT = 130;
  const MAX_MAP_HEIGHT = 630;
  const RIGHT_BUTTON = 0;
  const QUANTITY_SHOWN_PINS = 5;
  const FILTER_SWITCHING_TIME = 500;

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsSection = map.querySelector(`.map__pins`);

  const form = document.querySelector(`.ad-form`);
  const activeFields = form.querySelectorAll(`.ad-form input, .ad-form select, .ad-form textarea, .ad-form button`);
  const addressInput = form.querySelector(`#address`);
  const filtersForm = document.querySelector(`.map__filters`);
  const housingType = filtersForm.querySelector(`#housing-type`);
  const housingPrice = filtersForm.querySelector(`#housing-price`);
  const housingRooms = filtersForm.querySelector(`#housing-rooms`);
  const housingGuests = filtersForm.querySelector(`#housing-guests`);
  const housingFeatures = filtersForm.querySelector(`#housing-features`);

  let currentCoordinateLeft = 570;
  let currentCoordinateTop = 375;
  let startCoordinates;
  let pinsArray;
  let lastTimeout;

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
    filtersForm.reset();
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  };

  const renderPins = (pins) => {
    removeOldPins();
    window.card.remove();
    const fragment = document.createDocumentFragment();
    const filterByQuantity = pins.length > QUANTITY_SHOWN_PINS ? QUANTITY_SHOWN_PINS : pins.length;
    for (let i = 0; i < filterByQuantity; i++) {
      const newPin = window.pin.create(pins[i]);
      fragment.appendChild(newPin);
    }
    pinsSection.appendChild(fragment);
  };

  const checkPrice = (pins) => {
    const priceValue = housingPrice.value;
    if (priceValue !== `any`) {
      pins = pins.filter((e) => {
        if (priceValue === `middle`) {
          return e.offer.price > 10000 || e.offer.price < 50000;
        } else if (priceValue === `low`) {
          return e.offer.price < 10000;
        } else {
          return e.offer.price > 50000;
        }
      });
    }
    return pins;
  };

  const checkPlace = (pins) => {
    const typeValue = housingType.value;
    if (typeValue !== `any`) {
      pins = pins.filter((e) => e.offer.type === typeValue);
    }
    return pins;
  };

  const checkRooms = (pins) => {
    const roomsValue = housingRooms.value;
    if (roomsValue !== `any`) {
      pins = pins.filter((e) => {
        if (roomsValue === `1`) {
          return e.offer.rooms === 1;
        } else if (roomsValue === `2`) {
          return e.offer.rooms === 2;
        } else {
          return e.offer.rooms === 3;
        }
      });
    }
    return pins;
  };

  const checkGuests = (pins) => {
    const guestsValue = housingGuests.value;
    if (guestsValue !== `any`) {
      pins = pins.filter((e) => {
        if (guestsValue === `1`) {
          return e.offer.guests === 1;
        } else if (guestsValue === `2`) {
          return e.offer.guests === 2;
        } else {
          return e.offer.guests === 0;
        }
      });
    }
    return pins;
  };

  const checkCheckbox = (pins) => {
    const checkboxes = Array.from(housingFeatures.querySelectorAll(`.map__checkbox:checked`))
      .map((e) => e.value);

    if (checkboxes.length > 0) {
      pins = pins.filter((e) => {
        return checkboxes.every((checked) => e.offer.features.indexOf(checked) !== -1);
      });
    }
    return pins;
  };

  const getFilteredData = () => {
    let filteredPins = [...pinsArray];
    filteredPins = checkPrice(filteredPins);
    filteredPins = checkPlace(filteredPins);
    filteredPins = checkRooms(filteredPins);
    filteredPins = checkGuests(filteredPins);
    filteredPins = checkCheckbox(filteredPins);
    return filteredPins;
  };

  const debounce = () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      const filteredPins = getFilteredData();
      renderPins(filteredPins);
    }, FILTER_SWITCHING_TIME);
  };

  const onSectionChange = () => {
    debounce();
  };

  const onPinSectionClick = (evt) => {
    const pin = evt.target.closest(`.map__pin[type=button]:not(.map__overlay)`);
    const card = document.querySelector(`.map__card.popup`);
    if (pin && !card) {
      window.card.open(pin, pinsArray);
    } else {
      if (card && pin) {
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
    renderPins(pinsArray);
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
    housingType.addEventListener(`change`, onSectionChange);
    housingPrice.addEventListener(`change`, onSectionChange);
    housingRooms.addEventListener(`change`, onSectionChange);
    housingGuests.addEventListener(`change`, onSectionChange);
    housingFeatures.addEventListener(`change`, onSectionChange);
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
