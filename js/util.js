'use strict';

const ERROR_MODAL_DISPLAY_TIME = 3000;

const showErrorMessage = (errorMessage) => {
  const errorModal = $(`<div></div>`);
  errorModal.addClass(`modal-error`);
  errorModal.text(errorMessage);
  $(`body`).before(errorModal);
  setTimeout(() => errorModal.remove(), ERROR_MODAL_DISPLAY_TIME);
};

window.util = {
  showErrorMessage,
};
