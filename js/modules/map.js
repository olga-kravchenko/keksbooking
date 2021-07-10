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
const $activeFormFields = $(`.ad-form :input`);
const $activeFiltersFormFields = $(`.map__filters :input`);

let defaultPins;
let lastTimeout;

const convertFieldsToDisabled = () => {
  $activeFormFields.prop(`disabled`, true);
  $activeFiltersFormFields.prop(`disabled`, true);
};

const addId = () => {
  for (let i = 0; i < defaultPins.length; i++) {
    const pins = defaultPins[i];
    pins.id = i;
  }
};

const convertPageToActive = () => {
  $map.removeClass(`map--faded`);
  $form.removeClass(`ad-form--disabled`);
  $activeFormFields.prop(`disabled`, false);
  $activeFiltersFormFields.prop(`disabled`, false);
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
  const $fragment = $(document.createDocumentFragment());
  const displayedPins = pins.length > QUANTITY_SHOWN_PINS ? QUANTITY_SHOWN_PINS : pins.length;
  for (let i = 0; i < displayedPins; i++) {
    const newPin = window.pin.create(pins[i]);
    $fragment.append(newPin);
  }
  $pinsSection.append($fragment);
};

const debounce = () => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    const filteredPins = window.filtersForm.getData(defaultPins);
    renderPins(filteredPins);
  }, FILTER_SWITCHING_TIME);
};

const removeActivePin = () => {
  const $activePin = $(`.map__pin--active`);
  if ($activePin.length) {
    $activePin.removeClass(`map__pin--active`);
  }
};

const showActiveCard = (evt) => {
  const $pin = $(evt.target).closest(`.map__pin[type=button]:not(.map__overlay)`);
  $pin.addClass(`map__pin--active`);
  const id = $pin.data(`id`);
  const activePin = defaultPins[id];
  window.card.show(activePin);
};

const onPinSectionClick = (evt) => {
  const $pin = $(evt.target).closest(`.map__pin:not(.map__pin--main)`);
  const $card = $(`.map__card.popup`);
  const cardAndPinPresence = ($card.length && $pin.length);
  const isNotMatchedById = (cardAndPinPresence && $card.data(`id`) !== $pin.data(`id`));
  if ($pin.length || isNotMatchedById) {
    removeActivePin();
    showActiveCard(evt);
  }
};

const removeOldPins = () => {
  const $pins = $(`.map__pin:not(.map__pin--main)`);
  if ($pins) {
    $pins.remove();
  }
};

const activatePage = () => {
  convertPageToActive();
  window.pinMoving.setAddressValue();
  renderPins(defaultPins);
  $pinsSection.on(`click`, onPinSectionClick);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === RIGHT_BUTTON) {
    activatePage();
  }
};

const onEnterKeydown = (evt) => {
  const isEnter = evt.key === `Enter`;
  if (isEnter) {
    activatePage();
  }
};

const onFormResetButtonClick = () => {
  $form[0].reset();
  $filtersForm[0].reset();
  renderPins(defaultPins);
  window.preview.reset();
  window.pinMoving.resetPosition();
};

const on = () => {
  $mainPin.on(`mousedown`, onMainPinMouseDown);
  $mainPin.on(`keydown`, onEnterKeydown);
  window.pinMoving.on();
  window.filtersForm.on();
  $formResetButton.on(`click`, onFormResetButtonClick);
};

const activate = (pins) => {
  defaultPins = pins;
  convertFieldsToDisabled();
  addId();
  on();
};

const deactivate = () => {
  convertFieldsToDisabled();
  window.pinMoving.resetPosition();
  convertPageToDeactivate();
  removeOldPins();
  window.card.remove();
  window.preview.reset();
  window.form.onTypeChange();
};

window.map = {
  activate,
  deactivate,
  debounce,
  renderPins,
  removeActivePin,
};
