'use strict';

(() => {
  const MAX_QUANTITY_OF_ROOMS = 100;
  const MIN_QUANTITY_OF_PLACES = 0;
  const MIN_NAME_LENGTH = 30;

  // const TypeOfApartaments = {
  //   palace: 0,
  //   flat: 1000,
  //   house: 5000,
  //   bungalow: 10000,
  // };

  const form = document.querySelector(`.ad-form`);
  const roomQuantity = document.querySelector(`#room_number`);
  const capacityQuantity = document.querySelector(`#capacity`);
  const inputTittle = form.querySelector(`#title`);
  const type = form.querySelector(`#type`);
  // const price = form.querySelector(`#price`);

  const checkRoomsAndPlaces = (evt) => {
    const rooms = +roomQuantity.value;
    const places = +capacityQuantity.value;
    let currentMessage = ``;

    if (rooms === MAX_QUANTITY_OF_ROOMS && places !== MIN_QUANTITY_OF_PLACES
      || places === MIN_QUANTITY_OF_PLACES && rooms !== MAX_QUANTITY_OF_ROOMS) {
      currentMessage = `Для такого варианта доступно соответствие '100 комнат' и 'не для гостей'`;
    } else if (rooms < places) {
      currentMessage = `Каждая комната вмещает только 1 гостя, выберите более просторный вариант`;
    }

    if (currentMessage) {
      evt.preventDefault();
    }
    roomQuantity.setCustomValidity(currentMessage);
    roomQuantity.reportValidity();
  };

  const onInputTittleCheckInput = () => {
    const length = inputTittle.value.trim().length;
    let message = length < MIN_NAME_LENGTH ? `Ещё ${MIN_NAME_LENGTH - length} симв.` : ``;
    inputTittle.setCustomValidity(message);
    inputTittle.reportValidity();
  };

  const onTypeChange = () => {
    // if()
    // type.value =
    //

  };

  const addListener = () => {
    roomQuantity.addEventListener(`change`, checkRoomsAndPlaces);
    capacityQuantity.addEventListener(`change`, checkRoomsAndPlaces);
    type.addEventListener(`change`, onTypeChange);
    form.addEventListener(`submit`, checkRoomsAndPlaces);
    inputTittle.addEventListener(`input`, onInputTittleCheckInput);
  };

  const activate = () => {
    addListener();
  };

  window.form = {
    activate,
  };
})();
