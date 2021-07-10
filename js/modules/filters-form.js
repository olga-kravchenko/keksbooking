'use strict';

const MIN_PRICE_VALUE = 10000;
const MAX_PRICE_VALUE = 50000;
const ANY_VALUE = `any`;

const PriceFiltering = {
  MIDDLE: `middle`,
  LOW: `low`,
  HIGH: `high`,
};

const $filtersForm = $(`.map__filters`);
const $housingType = $filtersForm.find(`#housing-type`);
const $housingPrice = $filtersForm.find(`#housing-price`);
const $housingRooms = $filtersForm.find(`#housing-rooms`);
const $housingGuests = $filtersForm.find(`#housing-guests`);
const $housingFeatures = $filtersForm.find(`#housing-features`);

const checkPrice = (pins) => {
  const priceValue = $housingPrice.val();
  if (priceValue !== ANY_VALUE) {
    pins = pins.filter((pin) => {
      let isValid;
      switch (priceValue) {
        case PriceFiltering.LOW:
          isValid = pin.offer.price < MIN_PRICE_VALUE;
          break;
        case PriceFiltering.MIDDLE:
          isValid = pin.offer.price >= MIN_PRICE_VALUE && pin.offer.price <= MAX_PRICE_VALUE;
          break;
        case PriceFiltering.HIGH:
          isValid = pin.offer.price > MAX_PRICE_VALUE;
          break;
      }
      return isValid;
    });
  }
  return pins;
};

const checkPlace = (pins) => {
  const typeValue = $housingType.val();
  if (typeValue !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.type === typeValue);
  }
  return pins;
};

const checkRooms = (pins) => {
  const roomsValue = $housingRooms.val();
  if (roomsValue !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.rooms === +roomsValue);
  }
  return pins;
};

const checkGuests = (pins) => {
  const guestsValue = $housingGuests.val();
  if (guestsValue !== ANY_VALUE) {
    pins = pins.filter((pin) => pin.offer.guests === +guestsValue);
  }
  return pins;
};

const checkCheckbox = (pins) => {
  const $checkedFeatures = $housingFeatures.find(`.map__checkbox:checked`);
  const $features = Array.from($checkedFeatures).map((feature) => feature.value);
  if ($features.length > 0) {
    pins = pins.filter((pin) => $features.every((checked) => pin.offer.features.indexOf(checked) !== -1));
  }
  return pins;
};

const getData = (pinsArray) => {
  let filteredPins = [...pinsArray];
  filteredPins = checkPrice(filteredPins);
  filteredPins = checkPlace(filteredPins);
  filteredPins = checkRooms(filteredPins);
  filteredPins = checkGuests(filteredPins);
  filteredPins = checkCheckbox(filteredPins);
  return filteredPins;
};

const onSectionChange = () => {
  window.map.debounce();
};

const on = () => {
  $housingType.on(`change`, onSectionChange);
  $housingPrice.on(`change`, onSectionChange);
  $housingRooms.on(`change`, onSectionChange);
  $housingGuests.on(`change`, onSectionChange);
  $housingFeatures.on(`change`, onSectionChange);
};

window.filtersForm = {
  getData,
  on,
};
