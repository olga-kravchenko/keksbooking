'use strict';

const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;
const pinTemplate = document.querySelector(`#pin`).content;

const create = (advertisement) => {
  const newPin = pinTemplate.cloneNode(true);
  newPin.querySelector(`.map__pin`).dataset.id = advertisement.id;
  newPin.querySelector(`.map__pin`).style.left = `${advertisement.location.x + SHIFT_PIN_X}px`;
  newPin.querySelector(`.map__pin`).style.top = `${advertisement.location.y + SHIFT_PIN_Y}px`;
  newPin.querySelector(`img`).src = advertisement.author.avatar;
  newPin.querySelector(`img`).alt = `Заголовок объявления`;
  return newPin;
};

window.pin = {
  create,
};

