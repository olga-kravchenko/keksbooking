'use strict';

const MAX_QUANTITY_OF_ROOMS = 100;
const MIN_QUANTITY_OF_PLACES = 0;

const Message = {
  NOT_ERROR: ``,
  NOT_ENOUGH_ROOMS: `Каждая комната вмещает только 1 гостя, выберите более просторный вариант`,
  TOO_MANY_ROOMS: `Для такого варианта доступно соответствие '100 комнат' и 'не для гостей'`,
};

const MinPriceValue = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const TypeApartment = {
  BUNGALOW: `bungalow`,
  FLAT: `flat`,
  HOUSE: `house`,
  PALACE: `palace`,
};

const $form = $(`.ad-form`);
const $roomQuantity = $form.find(`#room_number`);
const $capacityQuantity = $form.find(`#capacity`);
const $type = $form.find(`#type`);
const $price = $form.find(`#price`);
const $timeIn = $form.find(`#timein`);
const $timeOut = $form.find(`#timeout`);

const checkRoomsAndCapacity = (evt) => {
  const rooms = +$roomQuantity.val();
  const capacity = +$capacityQuantity.val();
  let currentMessage = Message.NOT_ERROR;
  if (rooms === MAX_QUANTITY_OF_ROOMS && capacity !== MIN_QUANTITY_OF_PLACES
    || capacity === MIN_QUANTITY_OF_PLACES && rooms !== MAX_QUANTITY_OF_ROOMS) {
    currentMessage = Message.TOO_MANY_ROOMS;
  } else if (rooms < capacity) {
    currentMessage = Message.NOT_ENOUGH_ROOMS;
  }
  if (currentMessage) {
    evt.preventDefault();
  }
  $roomQuantity[0].setCustomValidity(currentMessage);
  $roomQuantity[0].reportValidity();
  return Boolean(!currentMessage);
};

const onRoomOrCapacityChange = () => checkRoomsAndCapacity();

const onTypeChange = () => {
  let minPrice = MinPriceValue.BUNGALOW;
  switch ($type.val()) {
    case TypeApartment.FLAT:
      minPrice = MinPriceValue.FLAT;
      break;
    case TypeApartment.HOUSE:
      minPrice = MinPriceValue.HOUSE;
      break;
    case TypeApartment.PALACE:
      minPrice = MinPriceValue.PALACE;
      break;
  }
  $price.attr(`min`, minPrice);
  $price.attr(`placeholder`, minPrice);
};

const onTimeInChange = () => $timeOut.val($timeIn.val());
const onTimeOutChange = () => $timeIn.val($timeOut.val());

const onFormSubmit = (evt) => {
  if (checkRoomsAndCapacity(evt)) {
    evt.preventDefault();
    const formData = new FormData($form[0]);
    window.backend.post(formData, window.utilForm.showSuccessModal, window.utilForm.showErrorModal);
  }
};

const on = () => {
  $roomQuantity.on(`change`, onRoomOrCapacityChange);
  $capacityQuantity.on(`change`, onRoomOrCapacityChange);
  $type.on(`change`, onTypeChange);
  $timeIn.on(`change`, onTimeInChange);
  $timeOut.on(`change`, onTimeOutChange);
  $form.on(`submit`, onFormSubmit);
  window.preview.on();
};

window.form = {
  on,
};
