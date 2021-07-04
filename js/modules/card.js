'use strict';

const ApartmentNames = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const $map = $(`.map`);
const $filterContainer = $(`.map__filters-container`);
const $template = $(`#card`)[0].content;

const addFeatures = (newCard, advertisement) => {
  const $featureSection = newCard.find(`.popup__features`);
  $featureSection.empty();
  let features = advertisement.offer.features;
  for (let i = 0; i < features.length; i++) {
    const $feature = $(`<li></li>`);
    $feature.addClass(`popup__feature`);
    $feature.addClass(`popup__feature--${features[i]}`);
    $featureSection.append($feature);
  }
};

const addPhotos = (newCard, advertisement) => {
  const $photosSection = newCard.find(`.popup__photos`);
  $photosSection.empty();
  let photos = advertisement.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    const $photo = $(`<img src="${photos[i]}" alt="${advertisement.offer.title}" width="45" height="45">`);
    $photo.addClass(`popup__photo`);
    $photosSection.append($photo);
  }
};

const create = (ad, id) => {
  const $newCard = $($template.cloneNode(true));
  $newCard.find(`.popup__title`).text(ad.offer.title);
  $newCard.find(`.popup__text--address`).text(ad.offer.address);
  $newCard.find(`.popup__text--price`).text(`${ad.offer.price}₽/ночь`);
  $newCard.find(`.popup__type`).text(ApartmentNames[ad.offer.type]);
  $newCard.find(`.popup__text--capacity`).text(`${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  $newCard.find(`.popup__text--time`).text(`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);
  addFeatures($newCard, ad);
  $newCard.find(`.popup__description`).text(ad.offer.description);
  addPhotos($newCard, ad);
  $newCard.find(`.popup__avatar`).attr(`src`, ad.author.avatar);
  $newCard.find(`.map__card.popup`).data(`id`, id);
  return $newCard;
};

const remove = () => {
  const $card = $(`.map__card.popup`);
  if ($card.length) {
    $card.remove();
  }
};

const show = (pin, pinsArray) => {
  const id = pin.data(`id`);
  const $fragment = $(document.createDocumentFragment());
  const newCard = create(pinsArray[id], id);
  $fragment.append(newCard);
  $map.append($fragment, $filterContainer);
};

const onCloseButtonClick = (evt) => {
  remove();
  window.map.removeActivePin(evt);
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  if (isEscape) {
    evt.preventDefault();
    remove();
    window.map.removeActivePin(evt);
  }
};

const on = () => {
  $(`.popup__close`).on(`click`, onCloseButtonClick);
  $(document).on(`keydown`, onEscKeydown);
};

const expand = (pin, pins) => {
  remove();
  show(pin, pins);
  on();
};

window.card = {
  create,
  expand,
  remove,
};

