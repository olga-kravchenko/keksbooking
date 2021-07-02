'use strict';

const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;

const $template = $(`#pin`)[0].content;

const create = (advertisement) => {
  const $pin = $($template.cloneNode(true));
  const $mapPin = $pin.find(`.map__pin`);
  const $mapPinImg = $mapPin.find(`img`);
  $mapPin.data(`id`, advertisement.id);
  $mapPin.css({
    'left': `${advertisement.location.x + SHIFT_PIN_X}px`,
    'top': `${advertisement.location.y + SHIFT_PIN_Y}px`
  });
  $mapPinImg.attr(`src`, advertisement.author.avatar);
  $mapPinImg.attr(`alt`, advertisement.offer.title);
  return $pin;
};

window.pin = {
  create,
};
