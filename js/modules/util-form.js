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
  removeListenersFromSuccess();
};

const onErrorClose = () => {
  $(`.error`).remove();
  removeListenersFromError();
};

const onEscapeKeydown = (evt) => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  const isEscapeKeydown = evt.key === window.util.BUTTON_ESCAPE;
  if (isEscapeKeydown && $success.length) {
    onSuccessClose();
  } else if (isEscapeKeydown && $error.length) {
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

const addListenersToSuccess = () => {
  $document.on(`click`, onDocumentClick);
  $document.on(`keydown`, onEscapeKeydown);
};

const removeListenersFromSuccess = () => {
  $document.off(`click`, onDocumentClick);
  $document.off(`keydown`, onEscapeKeydown);
};

const addListenersToError = () => {
  const $errorButton = $main.find(`.error__button`);
  $errorButton.on(`click`, onErrorClose);
  $document.on(`click`, onDocumentClick);
  $document.on(`keydown`, onEscapeKeydown);
};

const removeListenersFromError = () => {
  $document.off(`click`, onDocumentClick);
  $document.off(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  addListenersToSuccess();
  window.map.deactivate();
};

const showErrorModal = () => {
  renderErrorModal();
  addListenersToError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
