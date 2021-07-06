'use strict';

const STATUS_CODE_OK = 200;
const TIMEOUT_IN_MS = 10000;

const RequestUrl = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`,
};

const handleErrors = ($xhr, onError) => {
  if ($xhr.status > STATUS_CODE_OK) {
    onError(`Статус ответа: ${$xhr.status} ${$xhr.statusText}`);
  } else if ($xhr.statusText === `timeout`) {
    onError(`Запрос не успел выполниться за ${TIMEOUT_IN_MS} мс`);
  } else {
    onError(`Произошла ошибка соединения`);
  }
};

const get = (onSuccess, onError) => {
  $.ajax({
    url: RequestUrl.GET,
    timeout: TIMEOUT_IN_MS,
    success: (data) => onSuccess(data),
    error: ($xhr) => handleErrors($xhr, onError),
  });
};

const post = (dataPost, onSuccess, onError) => {
  $.ajax({
    type: `POST`,
    url: RequestUrl.POST,
    timeout: TIMEOUT_IN_MS,
    data: dataPost,
    processData: false,
    contentType: false,
    success: () => onSuccess(),
    error: () => onError(),
  });
};

window.backend = {
  get,
  post,
};
