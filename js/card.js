'use strict';

const ApartmentNames = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const map = document.querySelector(`.map`);
const filter = map.querySelector(`.map__filters-container`);
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

const addPhoto = (newCard, advertisement) => {
  const photoSection = newCard.querySelector(`.popup__photos`);
  photoSection.innerHTML = ``;
  let photos = advertisement.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    const photo = document.createElement(`img`);
    photo.classList.add(`popup__photo`);
    photo.src = `${photos[i]}`;
    photo.alt = `Фотография жилья`;
    photo.style.width = `45px`;
    photo.style.height = `40px`;
    photoSection.appendChild(photo);
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
  addPhoto(newCard, advertisement);
  newCard.querySelector(`.popup__avatar`).src = advertisement.author.avatar;
  newCard.querySelector(`.map__card.popup`).dataset.id = id;
  return newCard;
};

const remove = () => {
  const oldCard = document.querySelector(`.map__card.popup`);
  if (oldCard) {
    oldCard.remove();
  }
};

const show = (pin, pinsArray) => {
  const id = pin.dataset.id;
  const fragment = document.createDocumentFragment();
  const newCard = window.card.create(pinsArray[id], id);
  fragment.appendChild(newCard);
  map.insertBefore(fragment, filter);
};

const hide = () => {
  const card = document.querySelector(`.map__card`);
  card.remove();
};

const onCloseButtonClick = () => {
  removeEventListenerToHideCard();
  hide();
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  if (isEscape) {
    evt.preventDefault();
    removeEventListenerToHideCard();
    hide();
  }
};

const addEventListenerToHideCard = () => {
  const closeButton = document.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, onCloseButtonClick);
  document.addEventListener(`keydown`, onEscKeydown);
};

const removeEventListenerToHideCard = () => {
  const closeButton = document.querySelector(`.popup__close`);
  closeButton.removeEventListener(`click`, onCloseButtonClick);
  document.removeEventListener(`keydown`, onEscKeydown);
};

const open = (pin, pins) => {
  remove();
  show(pin, pins);
  addEventListenerToHideCard();
};

window.card = {
  create,
  open,
  remove,
};

