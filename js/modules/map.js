'use strict';

const $map = $(`.map`);
const $mainPin = $map.find(`.map__pin--main`);
const $pinsSection = $map.find(`.map__pins`);
const $form = $(`.ad-form`);
const $filterForm = $(`.map__filters`);
const $formResetButton = $form.find(`.ad-form__reset`);
const $FormFields = $(`.ad-form :input`);
const $FilterFormFields = $(`.map__filters :input`);

let defaultPins;

const onPinSectionClick = (evt) => {
  const $pin = $(evt.target).closest(`.map__pin:not(.map__pin--main)`);
  const $card = $(`.map__card.popup`);
  const cardAndPinPresence = ($card.length && $pin.length);
  const isNotMatchedById = (cardAndPinPresence && $card.data(`id`) !== $pin.data(`id`));
  if ($pin.length || isNotMatchedById) {
    window.pin.removeActiveClass();
    window.pin.showActiveCard(evt, defaultPins);
  }
};

const activatePage = () => {
  $map.removeClass(`map--faded`);
  $form.removeClass(`ad-form--disabled`);
  $FormFields.prop(`disabled`, false);
  $FilterFormFields.prop(`disabled`, false);
  $mainPin.off(`mousedown`, onMainPinMouseDown);
  window.pinMoving.setAddressValue();
  window.pin.render(defaultPins);
  $pinsSection.on(`click`, onPinSectionClick);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === window.util.LEFT_BUTTON) {
    activatePage();
  }
};

const onEnterKeydown = (evt) => {
  const isEnter = evt.key === window.util.BUTTON_ENTER;
  if (isEnter) {
    activatePage();
  }
};

const onFormResetButtonClick = () => {
  $form[0].reset();
  $filterForm[0].reset();
  window.filterForm.renderPins(defaultPins);
  window.preview.reset();
  window.pinMoving.resetPosition();
};

const on = (pins) => {
  $mainPin.on(`mousedown`, onMainPinMouseDown);
  $mainPin.on(`keydown`, onEnterKeydown);
  window.pinMoving.on();
  window.filterForm.on(pins);
  $formResetButton.on(`click`, onFormResetButtonClick);
};


const addIdToPins = () => {
  for (let i = 0; i < defaultPins.length; i++) {
    defaultPins[i].id = i;
  }
};

const activate = (pins) => {
  defaultPins = pins;
  $FormFields.prop(`disabled`, true);
  $FilterFormFields.prop(`disabled`, true);
  addIdToPins();
  on(defaultPins);
};

const deactivate = () => {
  $FormFields.prop(`disabled`, true);
  $FilterFormFields.prop(`disabled`, true);
  window.pinMoving.resetPosition();
  $map.addClass(`map--faded`);
  $form.addClass(`ad-form--disabled`);
  $form[0].reset();
  $filterForm[0].reset();
  $mainPin.on(`mousedown`, onMainPinMouseDown);
  window.pin.removeOldOnes();
  window.card.remove();
  window.preview.reset();
  window.form.onTypeChange();
};

window.map = {
  activate,
  deactivate,
};
