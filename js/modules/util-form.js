'use strict';

const $main = $(`main`);
const $successTemplate = $(`#success`).contents();
const $errorTemplate = $(`#error`).contents();

const renderSuccessModal = () => {
  const $modalSuccess = $successTemplate.clone();
  $main.append($modalSuccess);
  return $modalSuccess;
};

const onSuccessClose = () => {
  $(`.success`).remove();
  offSuccess();
  offError();
};

const renderErrorModal = () => {
  const $modalError = $errorTemplate.clone();
  $main.append($modalError);
  return $modalError;
};

const onErrorClose = () => {
  $(`.error`).remove();
};

const onEscapeKeydown = (evt) => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  if (evt.key === `Escape` && $success.length) {
    onSuccessClose(evt);
  } else if (evt.key === `Escape` && $error.length) {
    onErrorClose(evt);
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

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  $(`.error`).remove();
};

const onSuccess = () => {
  $(document).on(`click`, onDocumentClick);
  $(document).on(`keydown`, onEscapeKeydown);
};

const offSuccess = () => {
  $(document).off(`click`, onDocumentClick);
  $(document).off(`keydown`, onEscapeKeydown);
};

const onError = () => {
  const $errorButton = $main.find(`.error__button`);
  $errorButton.on(`click`, onErrorButtonClick);
  $(document).on(`click`, onDocumentClick);
  $(document).on(`keydown`, onEscapeKeydown);
};

const offError = () => {
  const $errorButton = $main.find(`.error__button`);
  $errorButton.off(`click`, onErrorButtonClick);
  $(document).off(`click`, onDocumentClick);
  $(document).off(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  onSuccess();
  window.map.deactivate();
};

const showErrorModal = () => {
  renderErrorModal();
  onError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
