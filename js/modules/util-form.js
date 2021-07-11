'use strict';

const $main = $(`main`);
const successTemplate = $(`#success`)[0].content;
const errorTemplate = $(`#error`)[0].content;
const $document = $(document);

const renderSuccessModal = () => {
  const $successModal = $(successTemplate.cloneNode(true));
  $main.append($successModal);
  return $successModal;
};

const renderErrorModal = () => {
  const $errorModal = $(errorTemplate.cloneNode(true));
  $main.append($errorModal);
  return $errorModal;
};

const onSuccessClose = () => {
  $(`.success`).remove();
  removeListenersOnSuccess();
};

const onErrorClose = () => {
  $(`.error`).remove();
  removeListenersOnError();
};

const onEscapeKeydown = (evt) => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  const isEscape = evt.key === window.util.BUTTON_ESCAPE;
  if (isEscape && $success.length) {
    onSuccessClose();
  } else if (isEscape && $error.length) {
    onErrorClose();
  }
};

const onDocumentClick = () => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  if ($success.length) {
    onSuccessClose();
  } else if ($error.length) {
    onErrorClose();
  }
};

const addListenersOnSuccess = () => {
  $document.on(`click`, onDocumentClick);
  $document.on(`keydown`, onEscapeKeydown);
};

const removeListenersOnSuccess = () => {
  $document.off(`click`, onDocumentClick);
  $document.off(`keydown`, onEscapeKeydown);
};

const addListenersOnError = () => {
  const $errorButton = $main.find(`.error__button`);
  $errorButton.on(`click`, onErrorClose);
  $document.on(`click`, onDocumentClick);
  $document.on(`keydown`, onEscapeKeydown);
};

const removeListenersOnError = () => {
  $document.off(`click`, onDocumentClick);
  $document.off(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  addListenersOnSuccess();
  window.map.deactivate();
};

const showErrorModal = () => {
  renderErrorModal();
  addListenersOnError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
