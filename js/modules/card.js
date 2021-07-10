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

const addFeatures = ($newCard, pinInfo) => {
  const $featureSection = $newCard.find(`.popup__features`);
  if (pinInfo.offer.features.length) {
    $featureSection.empty();
    const features = pinInfo.offer.features;
    const $fragment = $(document.createDocumentFragment());
    features.forEach((feature) => {
      const $feature = $(`<li class="popup__feature popup__feature--${feature}"></li>`);
      $fragment.append($feature);
    });
    $featureSection.append($fragment);
  } else {
    $featureSection.remove();
  }
};

const addPhotos = ($newCard, pinInfo) => {
  const $photosSection = $newCard.find(`.popup__photos`);
  if (pinInfo.offer.photos.length) {
    $photosSection.empty();
    const photos = pinInfo.offer.photos;
    const $fragment = $(document.createDocumentFragment());
    photos.forEach((photoSrc) => {
      const $photo = $(`<img class="popup__photo" src="${photoSrc}" alt="${pinInfo.offer.title}" width="45" height="45">`);
      $fragment.append($photo);
    });
    $photosSection.append($fragment);
  } else {
    $photosSection.remove();
  }
};

const createAndInit = (pinInfo) => {
  const $newCard = $(template.cloneNode(true));
  $newCard.find(`.popup__avatar`).attr(`src`, pinInfo.author.avatar);
  $newCard.find(`.popup__title`).text(pinInfo.offer.title);
  $newCard.find(`.popup__text--address`).text(pinInfo.offer.address);
  $newCard.find(`.popup__text--price`).text(`${pinInfo.offer.price}₽/ночь`);
  $newCard.find(`.popup__type`).text(ApartmentNames[pinInfo.offer.type]);
  $newCard.find(`.popup__text--capacity`).text(`${pinInfo.offer.rooms} комнаты для ${pinInfo.offer.guests} гостей`);
  $newCard.find(`.popup__text--time`).text(`Заезд после ${pinInfo.offer.checkin}, выезд до ${pinInfo.offer.checkout}`);
  addFeatures($newCard, pinInfo);
  $newCard.find(`.popup__description`).text(pinInfo.offer.description);
  addPhotos($newCard, pinInfo);
  return $newCard;
};

const remove = () => {
  const $card = $(`.map__card.popup`);
  if ($card.length) {
    $card.remove();
  }
};

const render = (activePin) => {
  const $fragment = $(document.createDocumentFragment());
  const newCard = createAndInit(activePin);
  $fragment.append(newCard);
  $map.append($fragment, $filterContainer);
};

const onCloseButtonClick = () => {
  remove();
  window.map.removeActivePin();
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  if (isEscape) {
    remove();
    window.map.removeActivePin();
  }
};

const on = () => {
  $(`.popup__close`).on(`click`, onCloseButtonClick);
  $(document).on(`keydown`, onEscKeydown);
};

const show = (activePin) => {
  remove();
  render(activePin);
  on();
};

window.card = {
  show,
  remove,
};
