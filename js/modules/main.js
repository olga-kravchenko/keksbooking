'use strict';

const onSuccess = window.map.activate;
const onError = window.util.showErrorMessage;

window.backend.get(onSuccess, onError);
window.form.on();
