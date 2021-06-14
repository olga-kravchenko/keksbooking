'use strict';

const QUANTITY_OF_ADVERTISEMENTS = 8;
const MIN_QUANTITY_OF_ROOMS = 1;
const MAX_QUANTITY_OF_ROOMS = 5;
const MIN_QUANTITY_OF_VISITORS = 1;
const MAX_QUANTITY_OF_VISITORS = 15;
const MIN_ARRAY_INDEX = 0;
const MONEY_CONVERTER = 100;
const MIN_X_COORDINATE = 100;
const MAX_X_COORDINATE = 1100;
const MIN_Y_COORDINATE = 130;
const MAX_Y_COORDINATE = 630;
const SHIFT_PIN_X = 40;
const SHIFT_PIN_Y = 51;
const TYPES_OF_APARTMENTS = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content;
const pins = map.querySelector(`.map__pins`);

map.classList.remove(`map--faded`);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getAdvertisements = () => {
  let advertisements = [];
  for (let i = 0; i < QUANTITY_OF_ADVERTISEMENTS; i++) {
    let number = i + 1;

    const advertisement = {
      author: {
        avatar: `img/avatars/user0${number}.png`
      },
      offer: {
        title: `заголовок предложения 0${number}`,
        price: number * MONEY_CONVERTER,
        type: TYPES_OF_APARTMENTS[getRandomNumber(0, TYPES_OF_APARTMENTS.length)],
        rooms: getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
        guests: getRandomNumber(MIN_QUANTITY_OF_VISITORS, MAX_QUANTITY_OF_VISITORS),
        checkin: TIMES[getRandomNumber(MIN_ARRAY_INDEX, TIMES.length)],
        checkout: TIMES[getRandomNumber(MIN_ARRAY_INDEX, TIMES.length)],
        features: FEATURES.slice(getRandomNumber(MIN_ARRAY_INDEX, FEATURES.length)),
        description: `description 0${number}`,
        photos: PHOTOS.slice(getRandomNumber(MIN_ARRAY_INDEX, PHOTOS.length)),
      },
      location: {
        x: getRandomNumber(MIN_X_COORDINATE, MAX_X_COORDINATE),
        y: getRandomNumber(MIN_Y_COORDINATE, MAX_Y_COORDINATE),
      }
    };
    advertisement.address = `${advertisement.location.x}, ${advertisement.location.y}`;
    advertisements.push(advertisement);
  }
  return advertisements;
};

const createDomElementPin = (advertisement) => {
  const newPin = pinTemplate.cloneNode(true);
  const pinButton = newPin.querySelector(`.map__pin`);
  const pinImg = pinButton.querySelector(`img`);
  pinButton.style.left = `${advertisement.location.x + SHIFT_PIN_X}px`;
  pinButton.style.top = `${advertisement.location.y + SHIFT_PIN_Y}px`;
  pinImg.src = advertisement.author.avatar;
  pinImg.alt = `Заголовок объявления`;
  return newPin;
};

const fillDomElementsByPin = (arr) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    const newPhoto = createDomElementPin(arr[i]);
    fragment.appendChild(newPhoto);
  }
  pins.appendChild(fragment);
};

const pinsArray = getAdvertisements();
fillDomElementsByPin(pinsArray);
