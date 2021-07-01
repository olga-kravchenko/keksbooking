'use strict';

const main = $(`main`);
const successModalTemplate = $(`#success`).contents();
const errorModalTemplate = $(`#error`).contents();

const renderSuccessModal = () => {
  const modalSuccess = successModalTemplate.clone();
  main.append(modalSuccess);
  return modalSuccess;
};

const onSuccessClose = (evt) => {
  evt.preventDefault();
  $(`.success`).remove();
};

const renderErrorModal = () => {
  const modalError = errorModalTemplate.clone();
  main.append(modalError);
  return modalError;
};

const onErrorClose = (evt) => {
  evt.preventDefault();
  $(`.error`).remove();
};

const onEscapeKeydown = (evt) => {
  const success = main.find(`.success`);
  const error = main.find(`.error`);
  if (evt.key === `Escape` && success) {
    onSuccessClose(evt);
  } else if (evt.key === `Escape` && error) {
    onErrorClose(evt);
  }
};

const onDocumentClick = (evt) => {
  const success = main.find(`.success`);
  const error = main.find(`.error`);
  if (evt.target === success) {
    onSuccessClose(evt);
  } else if (evt.target === error) {
    onErrorClose(evt);
  }
};

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  $(`.error`).remove();
};

const addListenersOnSuccess = () => {
  $(document).on(`click`, onDocumentClick);
  $(document).on(`keydown`, onEscapeKeydown);
};

const addListenersOnError = () => {
  const errorButton = main.querySelector(`.error__button`);
  errorButton.on(`click`, onErrorButtonClick);
  $(document).on(`click`, onDocumentClick);
  $(document).on(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  addListenersOnSuccess();
};

const showErrorModal = () => {
  renderErrorModal();
  addListenersOnError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
