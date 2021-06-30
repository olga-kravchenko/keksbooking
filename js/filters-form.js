'use strict';

const MIN_PRICE_VALUE = 10000;
const MAX_PRICE_VALUE = 50000;
const ANY_VALUE = `any`;

const PriceFiltering = {
  MIDDLE: `middle`,
  LOW: `low`,
};

const QuantityOfRooms = {
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
};

const QuantityOfGuests = {
  NULL: `0`,
  ONE: `1`,
  TWO: `2`,
};

const filtersForm = $(`.map__filters`);
const housingType = filtersForm.find(`#housing-type`);
const housingPrice = filtersForm.find(`#housing-price`);
const housingRooms = filtersForm.find(`#housing-rooms`);
const housingGuests = filtersForm.find(`#housing-guests`);
const housingFeatures = filtersForm.find(`#housing-features`);

const checkPrice = (pins) => {
  const priceValue = housingPrice.val();
  if (priceValue !== ANY_VALUE) {
    pins = pins.filter((e) => {
      switch (priceValue) {
        case PriceFiltering.MIDDLE:
          return e.offer.price > MIN_PRICE_VALUE || e.offer.price < MAX_PRICE_VALUE;
        case PriceFiltering.LOW:
          return e.offer.price < MIN_PRICE_VALUE;
        default:
          return e.offer.price > MAX_PRICE_VALUE;
      }
    });
  }
  return pins;
};

const checkPlace = (pins) => {
  const typeValue = housingType.val();
  if (typeValue !== ANY_VALUE) {
    pins = pins.filter((e) => e.offer.type === typeValue);
  }
  return pins;
};

const checkRooms = (pins) => {
  const roomsValue = housingRooms.val();
  if (roomsValue !== ANY_VALUE) {
    pins = pins.filter((e) => {
      switch (roomsValue) {
        case QuantityOfRooms.ONE:
          return e.offer.rooms === +QuantityOfRooms.ONE;
        case QuantityOfRooms.TWO:
          return e.offer.rooms === +QuantityOfRooms.TWO;
        default:
          return e.offer.rooms === +QuantityOfRooms.THREE;
      }
    });
  }
  return pins;
};

const checkGuests = (pins) => {
  const guestsValue = housingGuests.val();
  if (guestsValue !== ANY_VALUE) {
    pins = pins.filter((e) => {
      switch (guestsValue) {
        case QuantityOfGuests.ONE:
          return e.offer.guests === +QuantityOfGuests.ONE;
        case QuantityOfGuests.TWO:
          return e.offer.guests === +QuantityOfGuests.TWO;
        default:
          return e.offer.guests === +QuantityOfGuests.NULL;
      }
    });
  }
  return pins;
};

const checkCheckbox = (pins) => {
  const checkedFeatures = housingFeatures.find(`.map__checkbox:checked`);
  const features = Array.from(checkedFeatures).map((e) => e.value);
  if (features.length > 0) {
    pins = pins.filter((e) => features.every((checked) => e.offer.features.indexOf(checked) !== -1));
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

const addListeners = () => {
  housingType.on(`change`, onSectionChange);
  housingPrice.on(`change`, onSectionChange);
  housingRooms.on(`change`, onSectionChange);
  housingGuests.on(`change`, onSectionChange);
  housingFeatures.on(`change`, onSectionChange);
};

window.filtersForm = {
  getData,
  addListeners,
};

