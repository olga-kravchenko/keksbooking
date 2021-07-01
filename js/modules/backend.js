'use strict';

const STATUS_CODE_OK = 200;
const TIMEOUT_IN_MS = 10000;

const ServerUrl = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`,
};

const onRequestLoad = (request, onLoad, onError) => {
  if (request.status === STATUS_CODE_OK) {
    onLoad(request.response);
  } else {
    onError(`Статус ответа: ${request.status} ${request.statusText}`);
  }
};

const onRequestError = (onError) => onError(`Произошла ошибка соединения`);
const onRequestTimeout = (onError) => onError(`Запрос не успел выполниться за ${TIMEOUT_IN_MS} мс`);

const sendRequest = (onSuccess, onError, requestMethod, data) => {
  const request = new XMLHttpRequest();
  request.responseType = `json`;
  request.timeout = TIMEOUT_IN_MS;
  request.addEventListener(`load`, () => onRequestLoad(request, onSuccess, onError));
  request.addEventListener(`error`, () => onRequestError(onError));
  request.addEventListener(`timeout`, () => onRequestTimeout(onError));
  const url = requestMethod === `POST` ? ServerUrl.POST : ServerUrl.GET;
  request.open(requestMethod, url);
  if (data) {
    request.send(data);
  } else {
    request.send();
  }
};

const get = (onSuccess, onError) => sendRequest(onSuccess, onError, `GET`);
const post = (data, onSuccess, onError) => sendRequest(onSuccess, onError, `POST`, data);

window.backend = {
  get,
  post,
};
