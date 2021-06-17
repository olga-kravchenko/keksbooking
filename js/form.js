'use strict';

(() => {
  const MAX_QUANTITY_OF_ROOMS = 100;
  const MIN_QUANTITY_OF_PLACES = 0;

  const form = document.querySelector(`.ad-form`);
  const roomQuantity = document.querySelector(`#room_number`);
  const capacityQuantity = document.querySelector(`#capacity`);

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

  roomQuantity.addEventListener(`change`, checkRoomsAndPlaces);
  capacityQuantity.addEventListener(`change`, checkRoomsAndPlaces);
  form.addEventListener(`submit`, checkRoomsAndPlaces);

  window.form = {};
})();
