'use strict';

const $main = $(`main`);
const $successTemplate = $(`#success`).contents();
const $errorTemplate = $(`#error`).contents();

const renderSuccessModal = () => {
  const $modalSuccess = $successTemplate.clone();
  $main.append($modalSuccess);
  return $modalSuccess;
};

const onSuccessClose = (evt) => {
  evt.preventDefault();
  $(`.success`).remove();
};

const renderErrorModal = () => {
  const $modalError = $errorTemplate.clone();
  $main.append($modalError);
  return $modalError;
};

const onErrorClose = (evt) => {
  evt.preventDefault();
  $(`.error`).remove();
};

const onEscapeKeydown = (evt) => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  if (evt.key === `Escape` && $success) {
    onSuccessClose(evt);
  } else if (evt.key === `Escape` && $error) {
    onErrorClose(evt);
  }
};

const onDocumentClick = (evt) => {
  const $success = $(`.success`);
  const $error = $(`.error`);
  if ($success) {
    onSuccessClose(evt);
  } else if ($error) {
    onErrorClose(evt);
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

const onError = () => {
  const errorButton = $main.querySelector(`.error__button`);
  errorButton.on(`click`, onErrorButtonClick);
  $(document).on(`click`, onDocumentClick);
  $(document).on(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  onSuccess();
};

const showErrorModal = () => {
  renderErrorModal();
  onError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
