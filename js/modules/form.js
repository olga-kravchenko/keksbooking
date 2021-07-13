'use strict';

const MAX_QUANTITY_OF_ROOMS = 100;
const WITHOUT_GUESTS = 0;

const Message = {
  EMPTY: ``,
  NOT_ENOUGH_ROOMS: `Каждая комната вмещает только 1 гостя, выберите более просторный вариант`,
  TOO_MANY_ROOMS: `Для такого варианта доступно соответствие '100 комнат' и 'не для гостей'`,
};

const TypeAndPriceValue = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const $form = $(`.ad-form`);
const $roomQuantity = $form.find(`#room_number`);
const $capacityQuantity = $form.find(`#capacity`);
const $type = $form.find(`#type`);
const $price = $form.find(`#price`);
const $timeIn = $form.find(`#timein`);
const $timeOut = $form.find(`#timeout`);

const onTypeChange = () => {
  const minPrice = TypeAndPriceValue[$type.val()];
  $price.attr({
    'min': minPrice,
    'placeholder': minPrice
  });
};

const checkRoomsAndCapacity = () => {
  const rooms = +$roomQuantity.val();
  const capacity = +$capacityQuantity.val();
  let currentMessage = Message.EMPTY;
  if (rooms === MAX_QUANTITY_OF_ROOMS && capacity !== WITHOUT_GUESTS
    || rooms !== MAX_QUANTITY_OF_ROOMS && capacity === WITHOUT_GUESTS) {
    currentMessage = Message.TOO_MANY_ROOMS;
  } else if (rooms < capacity) {
    currentMessage = Message.NOT_ENOUGH_ROOMS;
  }
  $roomQuantity[0].setCustomValidity(currentMessage);
  $roomQuantity[0].reportValidity();
  return Boolean(!currentMessage);
};

const onRoomOrCapacityChange = () => checkRoomsAndCapacity();
const onTimeInChange = () => $timeOut.val($timeIn.val());
const onTimeOutChange = () => $timeIn.val($timeOut.val());

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (checkRoomsAndCapacity(evt)) {
    const formData = new FormData($form[0]);
    window.backend.post(formData, window.utilForm.showSuccessModal, window.utilForm.showErrorModal);
  }
};

const on = () => {
  window.preview.on();
  $type.on(`change`, onTypeChange);
  $roomQuantity.on(`change`, onRoomOrCapacityChange);
  $capacityQuantity.on(`change`, onRoomOrCapacityChange);
  $timeIn.on(`change`, onTimeInChange);
  $timeOut.on(`change`, onTimeOutChange);
  $form.on(`submit`, onFormSubmit);
};

window.form = {
  on,
  onTypeChange,
};
