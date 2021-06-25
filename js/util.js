'use strict';

const ERROR_MODAL_DISPLAY_TIME = 3000;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const showErrorMessage = (errorMessage) => {
  const errorModal = document.createElement(`div`);
  errorModal.classList.add(`modal-error`);
  errorModal.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, errorModal);
  setTimeout(() => errorModal.remove(), ERROR_MODAL_DISPLAY_TIME);
};

window.util = {
  getRandomNumber,
  showErrorMessage,
};
