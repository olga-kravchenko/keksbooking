'use strict';

const ApartmentNames = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const map = $(`.map`);
const filterContainer = $(`.map__filters-container`);
const cardTemplate = $(`#card`)[0].content;

const addFeatures = (newCard, advertisement) => {
  const featureSection = newCard.find(`.popup__features`);
  featureSection.empty();
  let features = advertisement.offer.features;
  for (let i = 0; i < features.length; i++) {
    const feature = $(`<li></li>`);
    feature.addClass(`popup__feature`);
    feature.addClass(`popup__feature--${features[i]}`);
    featureSection.append(feature);
  }
};

const addPhotos = (newCard, advertisement) => {
  const photosSection = newCard.find(`.popup__photos`);
  photosSection.empty();
  let photos = advertisement.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    const photo = $(`<img src="${photos[i]}" alt="Фотография жилья" width="45" height="45">`);
    photo.addClass(`popup__photo`);
    photosSection.append(photo);
  }
};

const create = (advertisement, id) => {
  const newCard = $(cardTemplate.cloneNode(true));
  newCard.find(`.popup__title`).text(advertisement.offer.title);
  newCard.find(`.popup__text--address`).text(advertisement.offer.address);
  newCard.find(`.popup__text--price`).text(`${advertisement.offer.price}₽/ночь`);
  newCard.find(`.popup__type`).text(ApartmentNames[advertisement.offer.type]);
  newCard.find(`.popup__text--capacity`).text(`${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`);
  newCard.find(`.popup__text--time`).text(`Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`);
  addFeatures(newCard, advertisement);
  newCard.find(`.popup__description`).text(advertisement.offer.description);
  addPhotos(newCard, advertisement);
  newCard.find(`.popup__avatar`).attr(`src`, advertisement.author.avatar);
  newCard.find(`.map__card.popup`).data(`id`, id);
  return newCard;
};

const remove = () => {
  const card = $(`.map__card.popup`);
  if (card.length) {
    card.remove();
  }
};

const show = (pin, pinsArray) => {
  const id = pin.data(`id`);
  const fragment = $(document.createDocumentFragment());
  const newCard = create(pinsArray[id], id);
  fragment.append(newCard);
  map.append(fragment, filterContainer);
};

const hide = () => {
  const card = $(`.map__card`);
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
  const closeButton = $(`.popup__close`);
  closeButton.on(`click`, onCloseButtonClick);
  $(document).on(`keydown`, onEscKeydown);
};

const removeListener = () => {
  const closeButton = $(`.popup__close`);
  closeButton.off(`click`, onCloseButtonClick);
  $(document).off(`keydown`, onEscKeydown);
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

