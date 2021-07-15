'use strict';

const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;
const QUANTITY_OF_SHOWN_PINS = 5;

const $pinsSection = $(`.map__pins`);
const template = $(`#pin`)[0].content;

const create = (pinInfo) => {
  const $pin = $(template.cloneNode(true));
  const $mapPin = $pin.find(`.map__pin`);
  const $mapPinImg = $mapPin.find(`img`);
  $mapPin.data(`id`, pinInfo.id);
  $mapPin.css({
    'left': `${pinInfo.location.x + SHIFT_PIN_X}px`,
    'top': `${pinInfo.location.y + SHIFT_PIN_Y}px`
  });
  $mapPinImg.attr({
    'src': pinInfo.author.avatar,
    'alt': pinInfo.offer.title,
  });
  return $pin;
};

const removeOldOnes = () => {
  const $pins = $(`.map__pin:not(.map__pin--main)`);
  if ($pins.length) {
    $pins.remove();
  }
};

const render = (pins) => {
  removeOldOnes();
  window.card.remove();
  const $fragment = $(document.createDocumentFragment());
  const displayedPins = pins.length > QUANTITY_OF_SHOWN_PINS ? QUANTITY_OF_SHOWN_PINS : pins.length;
  for (let i = 0; i < displayedPins; i++) {
    const newPin = window.pin.create(pins[i]);
    $fragment.append(newPin);
  }
  $pinsSection.append($fragment);
};

const removeActiveClass = () => {
  const $activePin = $(`.map__pin--active`);
  if ($activePin.length) {
    $activePin.removeClass(`map__pin--active`);
  }
};

const showActiveCard = (evt, defaultPins) => {
  const $pin = $(evt.target).closest(`.map__pin[type=button]:not(.map__overlay)`);
  $pin.addClass(`map__pin--active`);
  const id = $pin.data(`id`);
  const activePin = defaultPins[id];
  window.card.show(activePin);
};

window.pin = {
  render,
  create,
  removeOldOnes,
  showActiveCard,
  removeActiveClass,
};
