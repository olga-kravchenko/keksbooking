'use strict';

const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;

const $template = $(`#pin`)[0].content;

const create = (ad) => {
  const $pin = $($template.cloneNode(true));
  const $mapPin = $pin.find(`.map__pin`);
  const $mapPinImg = $mapPin.find(`img`);
  $mapPin.data(`id`, ad.id);
  $mapPin.css({
    'left': `${ad.location.x + SHIFT_PIN_X}px`,
    'top': `${ad.location.y + SHIFT_PIN_Y}px`
  });
  $mapPinImg.attr(`src`, ad.author.avatar);
  $mapPinImg.attr(`alt`, ad.offer.title);
  return $pin;
};

window.pin = {
  create,
};
