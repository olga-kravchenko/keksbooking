'use strict';

(() => {
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

  const Time = {
    TWELVE: `12:00`,
    THIRTEEN: `13:00`,
    FOURTEEN: `14:00`,
  };

  const form = document.querySelector(`.ad-form`);
  const roomQuantity = document.querySelector(`#room_number`);
  const capacityQuantity = document.querySelector(`#capacity`);
  const type = form.querySelector(`#type`);
  const price = form.querySelector(`#price`);
  const timeIn = form.querySelector(`#timein`);
  const timeOut = form.querySelector(`#timeout`);
  const formResetButton = form.querySelector(`.ad-form__reset`);

  const roomsAndPlacesValid = (evt) => {
    const rooms = +roomQuantity.value;
    const places = +capacityQuantity.value;
    let currentMessage = window.constants.EMPTY_STRING;
    if (rooms === MAX_QUANTITY_OF_ROOMS && places !== MIN_QUANTITY_OF_PLACES
      || places === MIN_QUANTITY_OF_PLACES && rooms !== MAX_QUANTITY_OF_ROOMS) {
      currentMessage = Message.TOO_MANY_ROOMS;
    } else if (rooms < places) {
      currentMessage = Message.NOT_ENOUGH_ROOMS;
    }
    if (currentMessage) {
      evt.preventDefault();
    }
    roomQuantity.setCustomValidity(currentMessage);
    roomQuantity.reportValidity();
    return Boolean(!currentMessage);
  };

  const onTypeChange = () => {
    let minPrice = MinPriceValue.BUNGALOW;
    switch (type.value) {
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
    price.min = minPrice;
    price.placeholder = minPrice;
  };

  const changeTimeValue = (firstSelectValue) => {
    let time;
    switch (firstSelectValue) {
      case Time.TWELVE:
        time = Time.TWELVE;
        break;
      case Time.THIRTEEN:
        time = Time.THIRTEEN;
        break;
      case Time.FOURTEEN:
        time = Time.FOURTEEN;
        break;
    }
    return time;
  };

  const onTimeInChange = () => {
    timeOut.value = changeTimeValue(timeIn.value);
  };

  const onTimeOutChange = () => {
    timeIn.value = changeTimeValue(timeOut.value);
  };

  const onSuccess = () => {
    window.utilForm.showSuccessModal();
  };

  const onError = () => {
    window.utilForm.showErrorModal();
  };

  const onFormResetButtonClick = () => {
    form.reset();
  };

  const onFormSubmit = (evt) => {
    if (roomsAndPlacesValid(evt)) {
      evt.preventDefault();
      const formData = new FormData(form);
      window.backend.post(formData, onSuccess, onError);
      window.map.deactivate();
    }
  };

  const addListener = () => {
    roomQuantity.addEventListener(`change`, roomsAndPlacesValid);
    capacityQuantity.addEventListener(`change`, roomsAndPlacesValid);
    type.addEventListener(`change`, onTypeChange);
    timeIn.addEventListener(`change`, onTimeInChange);
    timeOut.addEventListener(`change`, onTimeOutChange);
    formResetButton.addEventListener(`click`, onFormResetButtonClick);
    form.addEventListener(`submit`, onFormSubmit);
  };

  const activate = () => {
    addListener();
  };

  window.form = {
    activate,
  };
})();
