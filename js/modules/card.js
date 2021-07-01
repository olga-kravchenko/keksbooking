'use strict';

const ApartmentNames = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const map = document.querySelector(`.map`);
const filterContainer = map.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content;

const addFeatures = (newCard, advertisement) => {
  const featureSection = newCard.querySelector(`.popup__features`);
  featureSection.innerHTML = ``;
  let features = advertisement.offer.features;
  for (let i = 0; i < features.length; i++) {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`);
    feature.classList.add(`popup__feature--${features[i]}`);
    featureSection.appendChild(feature);
  }
};

const addPhotos = (newCard, advertisement) => {
  const photosSection = newCard.querySelector(`.popup__photos`);
  photosSection.innerHTML = ``;
  let photos = advertisement.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    const photo = document.createElement(`img`);
    photo.classList.add(`popup__photo`);
    photo.src = `${photos[i]}`;
    photo.alt = `Фотография жилья`;
    photo.style.width = `45px`;
    photo.style.height = `40px`;
    photosSection.appendChild(photo);
  }
};

const create = (advertisement, id) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = advertisement.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = advertisement.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${advertisement.offer.price}₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = ApartmentNames[advertisement.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  addFeatures(newCard, advertisement);
  newCard.querySelector(`.popup__description`).textContent = advertisement.offer.description;
  addPhotos(newCard, advertisement);
  newCard.querySelector(`.popup__avatar`).src = advertisement.author.avatar;
  newCard.querySelector(`.map__card.popup`).dataset.id = id;
  return newCard;
};

const remove = () => {
  const card = document.querySelector(`.map__card.popup`);
  if (card) {
    card.remove();
  }
};

const show = (pin, pinsArray) => {
  const id = pin.data(`id`);
  const fragment = document.createDocumentFragment();
  const newCard = create(pinsArray[id], id);
  fragment.appendChild(newCard);
  map.insertBefore(fragment, filterContainer);
};

const hide = () => {
  const card = document.querySelector(`.map__card`);
  card.remove();
};

const onCloseButtonClick = (evt) => {
  removeListener();
  hide();
  window.map.removeActivePin(evt);
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  if (isEscape) {
    evt.preventDefault();
    removeListener();
    hide();
    window.map.removeActivePin(evt);
  }
};

const addListener = () => {
  const closeButton = document.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, onCloseButtonClick);
  document.addEventListener(`keydown`, onEscKeydown);
};

const removeListener = () => {
  const closeButton = document.querySelector(`.popup__close`);
  closeButton.removeEventListener(`click`, onCloseButtonClick);
  document.removeEventListener(`keydown`, onEscKeydown);
};

const expand = (pin, pins) => {
  remove();
  show(pin, pins);
  addListener();
};

window.card = {
  create,
  expand,
  remove,
};

