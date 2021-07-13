'use strict';

const MIN_PRICE_VALUE = 10000;
const MAX_PRICE_VALUE = 50000;
const ANY_VALUE = `any`;
const FILTER_SWITCHING_TIME = 500;

const PriceFiltering = {
  MIDDLE: `middle`,
  LOW: `low`,
  HIGH: `high`,
};

let lastTimeout;
let sortedPins;

const $filterForm = $(`.map__filters`);
const $housingType = $filterForm.find(`#housing-type`);
const $housingPrice = $filterForm.find(`#housing-price`);
const $housingRooms = $filterForm.find(`#housing-rooms`);
const $housingGuests = $filterForm.find(`#housing-guests`);
const $housingFeatures = $filterForm.find(`#housing-features`);

const checkValueByPrice = (priceValue, price) => {
  let isValid;
  switch (priceValue) {
    case PriceFiltering.LOW:
      isValid = price < MIN_PRICE_VALUE;
      break;
    case PriceFiltering.MIDDLE:
      isValid = price >= MIN_PRICE_VALUE && price <= MAX_PRICE_VALUE;
      break;
    case PriceFiltering.HIGH:
      isValid = price > MAX_PRICE_VALUE;
      break;
  }
  return isValid;
};

const getFilteredPinsByPrice = (pins) => {
  if ($housingPrice.val() !== ANY_VALUE) {
    pins = pins.filter((pin) => checkValueByPrice($housingPrice.val(), pin.offer.price));
  }
  return pins;
};

const getFilteredPinsByPlace = (pins) => {
  if ($housingType.val() !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.type === $housingType.val());
  }
  return pins;
};

const getFilteredPinsByRooms = (pins) => {
  if ($housingRooms.val() !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.rooms === +$housingRooms.val());
  }
  return pins;
};

const getFilteredPinsByGuests = (pins) => {
  if ($housingGuests.val() !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.guests === +$housingGuests.val());
  }
  return pins;
};

const getFilteredPinsByFeatures = (pins) => {
  const $checkedFeatures = $housingFeatures.find(`.map__checkbox:checked`);
  const $features = Array.from($checkedFeatures).map((feature) => feature.value);
  if ($features.length > 0) {
    pins = pins.filter((pin) => $features.every((checked) => pin.offer.features.indexOf(checked) !== -1));
  }
  return pins;
};

const getFilteredPins = (pins) => {
  let filteredPins = [...pins];
  filteredPins = getFilteredPinsByPrice(filteredPins);
  filteredPins = getFilteredPinsByPlace(filteredPins);
  filteredPins = getFilteredPinsByRooms(filteredPins);
  filteredPins = getFilteredPinsByGuests(filteredPins);
  filteredPins = getFilteredPinsByFeatures(filteredPins);
  return filteredPins;
};

const onSectionChange = () => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    const filteredPins = getFilteredPins(sortedPins);
    window.pin.render(filteredPins);
  }, FILTER_SWITCHING_TIME);
};


const on = (pins) => {
  sortedPins = pins;
  $housingType.on(`change`, onSectionChange);
  $housingPrice.on(`change`, onSectionChange);
  $housingRooms.on(`change`, onSectionChange);
  $housingGuests.on(`change`, onSectionChange);
  $housingFeatures.on(`change`, onSectionChange);
};

window.filterForm = {
  on,
};
