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

const addFeatures = ($featureSection, features) => {
  if (!features.length) {
    $featureSection.remove();
  } else {
    $featureSection.empty();
    const $fragment = $(document.createDocumentFragment());
    features.forEach((feature) => $fragment.append($(`<li class="popup__feature popup__feature--${feature}"></li>`)));
    $featureSection.append($fragment);
  }
};

const addPhotos = ($photosSection, photos, title) => {
  if (!photos.length) {
    $photosSection.remove();
  } else {
    $photosSection.empty();
    const $fragment = $(document.createDocumentFragment());
    photos.forEach((photoSrc) => {
      $fragment.append($(`<img class="popup__photo" src="${photoSrc}" alt="${title}" width="45" height="45">`));
    });
    $photosSection.append($fragment);
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
  addFeatures($newCard.find(`.popup__features`), pinInfo.offer.features);
  $newCard.find(`.popup__description`).text(pinInfo.offer.description);
  addPhotos($newCard.find(`.popup__photos`), pinInfo.offer.photos, pinInfo.offer.title);
  return $newCard;
};

const render = (activePin) => {
  const newCard = createAndInit(activePin);
  $map.append(newCard, $filterContainer);
};

const remove = () => {
  const $card = $(`.map__card.popup`);
  if ($card.length) {
    $card.remove();
    window.pin.removeActiveClass();
    $(document).off(`keydown`, onEscKeydown);
  }
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === window.util.BUTTON_ESCAPE;
  if (isEscape) {
    remove();
  }
};

const onCloseButtonClick = () => remove();

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
