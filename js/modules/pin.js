'use strict';

const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;

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

window.pin = {
  create,
};
