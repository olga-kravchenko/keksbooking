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
    offSuccess(evt);
  } else if (evt.key === `Escape` && $error) {
    onErrorClose(evt);
    offError(evt);
  }
};

const onDocumentClick = (evt) => {
  const $success = $main.find(`.success`);
  const $error = $main.find(`.error`);
  if ($success) {
    onSuccessClose(evt);
    offSuccess(evt);
  } else if ($error) {
    onErrorClose(evt);
    offError(evt);
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
};

const showErrorModal = () => {
  renderErrorModal();
  onError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
