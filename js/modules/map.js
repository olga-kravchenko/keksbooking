'use strict';

const RIGHT_BUTTON = 0;
const QUANTITY_SHOWN_PINS = 5;
const FILTER_SWITCHING_TIME = 500;

const $map = $(`.map`);
const $mainPin = $map.find(`.map__pin--main`);
const $pinsSection = $map.find(`.map__pins`);
const $form = $(`.ad-form`);
const $filtersForm = $(`.map__filters`);
const $formResetButton = $form.find(`.ad-form__reset`);

let pinsArray;
let lastTimeout;

const convertFieldsToDisabled = () => {
  $(`.ad-form :input`).prop(`disabled`, true);
  $(`.map__filters :input`).prop(`disabled`, true);
};

const addId = () => {
  for (let i = 0; i < pinsArray.length; i++) {
    const pins = pinsArray[i];
    pins.id = i;
  }
};

const convertPageToActive = () => {
  $map.removeClass(`map--faded`);
  $form.removeClass(`ad-form--disabled`);
  $(`.ad-form :input`).prop(`disabled`, false);
  $(`.map__filters :input`).prop(`disabled`, false);
  $mainPin.off(`mousedown`, onMainPinMouseDown);
};

const convertPageToDeactivate = () => {
  $map.addClass(`map--faded`);
  $form.addClass(`ad-form--disabled`);
  $form[0].reset();
  $filtersForm[0].reset();
  $mainPin.on(`mousedown`, onMainPinMouseDown);
};

const renderPins = (pins) => {
  removeOldPins();
  window.card.remove();
  const fragment = $(document.createDocumentFragment());
  const displayedPins = pins.length > QUANTITY_SHOWN_PINS ? QUANTITY_SHOWN_PINS : pins.length;
  for (let i = 0; i < displayedPins; i++) {
    const newPin = window.pin.create(pins[i]);
    fragment.append(newPin);
  }
  $pinsSection.append(fragment);
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
  const activePin = $(`.map__pin--active`);
  if (activePin.length) {
    activePin.removeClass(`map__pin--active`);
  }
};

const showActiveAdvertisement = (evt) => {
  const pin = $(evt.target).closest(`.map__pin[type=button]:not(.map__overlay)`);
  pin.addClass(`map__pin--active`);
  window.card.expand(pin, pinsArray);
};

const onPinSectionClick = (evt) => {
  const $pin = $(evt.target).closest(`.map__pin:not(.map__pin--main)`);
  const $card = $(`.map__card.popup`);
  const cardAndPinPresent = ($card.length && $pin.length);
  const isID = (cardAndPinPresent && $card.data(`id`) !== $pin.data(`id`));
  const isCardDontOpen = ($pin.length && !$card.length);
  if (isCardDontOpen || isID) {
    removeActivePin();
    showActiveAdvertisement(evt);
  }
};

const removeOldPins = () => {
  const pins = $(`.map__pin:not(.map__pin--main)`);
  if (pins) {
    pins.remove();
  }
};

const addListenerOnPinSection = () => {
  $pinsSection.on(`click`, onPinSectionClick);
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
  $form[0].reset();
  $filtersForm.reset();
  renderPins(pinsArray);
  window.preview.reset();
  window.pinMoving.resetPosition();
};

const addListenerToActivatePage = () => {
  $mainPin.on(`mousedown`, onMainPinMouseDown);
  $mainPin.on(`keydown`, onEnterKeydown);
  window.pinMoving.addListener();
  window.filtersForm.addListeners();
  $formResetButton.on(`click`, onFormResetButtonClick);
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
