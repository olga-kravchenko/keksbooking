'use strict';

const RIGHT_BUTTON = 0;
const QUANTITY_SHOWN_PINS = 5;
const FILTER_SWITCHING_TIME = 500;

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const pinsSection = map.querySelector(`.map__pins`);
const form = document.querySelector(`.ad-form`);
const activeFormFields = form.querySelectorAll(`.ad-form input, .ad-form select, .ad-form textarea, .ad-form button`);
const filtersForm = document.querySelector(`.map__filters`);
const activeFiltersFormFields = filtersForm.querySelectorAll(`.map__filters select, .map__filters input`);
const formResetButton = form.querySelector(`.ad-form__reset`);

let pinsArray;
let lastTimeout;

const convertFieldsToDisabled = () => {
  activeFormFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
  activeFiltersFormFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
};

const addId = () => {
  for (let i = 0; i < pinsArray.length; i++) {
    const pins = pinsArray[i];
    pins.id = i;
  }
};

const convertPageToActive = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  activeFormFields.forEach((field) => field.removeAttribute(`disabled`));
  activeFiltersFormFields.forEach((field) => field.removeAttribute(`disabled`));
  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
};

const convertPageToDeactivate = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  activeFormFields.forEach((field) => field.setAttribute(`disabled`, `disabled`));
  form.reset();
  filtersForm.reset();
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
};

const renderPins = (pins) => {
  removeOldPins();
  window.card.remove();
  const fragment = document.createDocumentFragment();
  const displayedPins = pins.length > QUANTITY_SHOWN_PINS ? QUANTITY_SHOWN_PINS : pins.length;
  for (let i = 0; i < displayedPins; i++) {
    const newPin = window.pin.create(pins[i]);
    fragment.appendChild(newPin);
  }
  pinsSection.appendChild(fragment);
};

const debounce = () => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    const filteredPins = window.filtersForm.getData(pinsArray);
    renderPins(filteredPins);
  }, FILTER_SWITCHING_TIME);
};

const removeActivePin = () => {
  const activePin = document.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const showActiveAdvertisement = (evt) => {
  const pin = evt.target.closest(`.map__pin[type=button]:not(.map__overlay)`);
  pin.classList.add(`map__pin--active`);
  window.card.expand(pin, pinsArray);
};

const onPinSectionClick = (evt) => {
  const pin = evt.target.closest(`.map__pin[type=button]:not(.map__overlay)`);
  const card = document.querySelector(`.map__card.popup`);
  const isID = (card && pin && card.dataset.id !== pin.dataset.id);
  const isCardDontOpen = (pin && !card);
  if (isCardDontOpen || isID) {
    removeActivePin();
    showActiveAdvertisement(evt);
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

const activatePage = () => {
  convertPageToActive();
  window.pinMoving.setAddressValue();
  renderPins(pinsArray);
  addListenerOnPinSection();
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

const onFormResetButtonClick = () => {
  form.reset();
  filtersForm.reset();
  renderPins(pinsArray);
  window.preview.reset();
  window.pinMoving.resetPosition();
};

const addListenerToActivatePage = () => {
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onEnterKeydown);
  window.pinMoving.addListener();
  window.filtersForm.addListeners();
  formResetButton.addEventListener(`click`, onFormResetButtonClick);
};

const activate = (pins) => {
  pinsArray = pins;
  convertFieldsToDisabled();
  addId();
  addListenerToActivatePage();
};

const deactivate = () => {
  window.pinMoving.resetPosition();
  convertPageToDeactivate();
  removeOldPins();
  window.card.remove();
  window.preview.reset();
};

window.map = {
  activate,
  deactivate,
  debounce,
  renderPins,
  removeActivePin,
};
