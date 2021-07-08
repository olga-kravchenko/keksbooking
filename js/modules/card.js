'use strict';

const ApartmentNames = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const $map = $(`.map`);
const $filterContainer = $(`.map__filters-container`);
const template = $(`#card`)[0].content;

const addFeatures = (newCard, ad) => {
  const isEmptyFeatures = ad.offer.features.length === 0;
  const $featureSection = newCard.find(`.popup__features`);
  if (isEmptyFeatures) {
    $featureSection.remove();
  } else {
    $featureSection.empty();
    const features = ad.offer.features;
    const $fragment = $(document.createDocumentFragment());
    features.forEach((e) => {
      const $feature = $(`<li></li>`);
      $feature.addClass(`popup__feature`);
      $feature.addClass(`popup__feature--${e}`);
      $fragment.append($feature);
    });
    $featureSection.append($fragment);
  }
};

const addPhotos = (newCard, ad) => {
  const isPhotoSectionPresent = ad.offer.photos.length === 0;
  const $photosSection = newCard.find(`.popup__photos`);
  if (isPhotoSectionPresent) {
    $photosSection.remove();
  } else {
    $photosSection.empty();
    const photos = ad.offer.photos;
    const $fragment = $(document.createDocumentFragment());
    photos.forEach((e) => {
      const $photo = $(`<img src="${e}" alt="${ad.offer.title}" width="45" height="45">`);
      $photo.addClass(`popup__photo`);
      $fragment.append($photo);
    });
    $photosSection.append($fragment);
  }
};

const create = (ad, id) => {
  const $newCard = $(template.cloneNode(true));
  $newCard.find(`.popup__avatar`).attr(`src`, ad.author.avatar);
  $newCard.find(`.popup__title`).text(ad.offer.title);
  $newCard.find(`.popup__text--address`).text(ad.offer.address);
  $newCard.find(`.popup__text--price`).text(`${ad.offer.price}₽/ночь`);
  $newCard.find(`.popup__type`).text(ApartmentNames[ad.offer.type]);
  $newCard.find(`.popup__text--capacity`).text(`${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  $newCard.find(`.popup__text--time`).text(`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);
  addFeatures($newCard, ad);
  $newCard.find(`.popup__description`).text(ad.offer.description);
  addPhotos($newCard, ad);
  $newCard.find(`.map__card.popup`).data(`id`, id);
  return $newCard;
};

const remove = () => {
  const $card = $(`.map__card.popup`);
  if ($card.length) {
    $card.remove();
  }
};

const render = (pin, pins) => {
  const id = pin.data(`id`);
  const $fragment = $(document.createDocumentFragment());
  const newCard = create(pins[id], id);
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

const show = (pin, pins) => {
  remove();
  render(pin, pins);
  on();
};

window.card = {
  create,
  show,
  remove,
};
