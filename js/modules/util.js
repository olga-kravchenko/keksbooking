'use strict';

const BUTTON_ENTER = `Enter`;
const BUTTON_ESCAPE = `Escape`;
const LEFT_BUTTON = 0;
const ERROR_MODAL_DISPLAY_TIME = 300000;

const showErrorMessage = (errorMessage) => {
  const $errorModal = $(`<div></div>`);
  $errorModal.addClass(`modal-error`);
  $errorModal.text(errorMessage);
  $(`body`).prepend($errorModal);
  setTimeout(() => $errorModal.remove(), ERROR_MODAL_DISPLAY_TIME);
};

window.util = {
  BUTTON_ENTER,
  BUTTON_ESCAPE,
  LEFT_BUTTON,
  showErrorMessage,
};
