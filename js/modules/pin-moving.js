'use strict';

const PIN_HEIGHT = 40;
const PIN_MIDDLE_WIDTH = 34;
const MAX_MAP_WIDTH = 1166;
const MIN_MAP_WIDTH = 270;
const MIN_MAP_HEIGHT = 90;
const MAX_MAP_HEIGHT = 590;
const START_COORDINATE_X = 570;
const START_COORDINATE_Y = 375;

const $mainPin = $(`.map__pin--main`);
const $addressInput = $(`#address`);
const $document = $(document);

let coordinateX = START_COORDINATE_X;
let coordinateY = START_COORDINATE_Y;

let previousCoordinates;

const checkAndSetCoordinates = () => {
  if (coordinateY > MAX_MAP_HEIGHT) {
    coordinateY = MAX_MAP_HEIGHT;
  } else if (coordinateY < MIN_MAP_HEIGHT) {
    coordinateY = MIN_MAP_HEIGHT;
  } else if (coordinateX > MAX_MAP_WIDTH) {
    coordinateX = MAX_MAP_WIDTH;
  } else if (coordinateX < MIN_MAP_WIDTH) {
    coordinateX = MIN_MAP_WIDTH;
  }
};

const setAddressValue = () => {
  const x = coordinateX + PIN_MIDDLE_WIDTH;
  const y = coordinateY + PIN_HEIGHT;
  $addressInput.val(`${x}, ${y}`);
};

const setPinPosition = () => {
  $mainPin.css({
    'top': `${coordinateY}px`,
    'left': `${coordinateX}px`,
  });
};

const resetPosition = () => {
  coordinateX = START_COORDINATE_X;
  coordinateY = START_COORDINATE_Y;
  setPinPosition();
};

const setMoveValue = (evt) => {
  const shift = {
    x: previousCoordinates.x - evt.clientX,
    y: previousCoordinates.y - evt.clientY,
  };
  previousCoordinates = {
    x: evt.clientX,
    y: evt.clientY,
  };
  coordinateX = $mainPin.position().left - shift.x;
  coordinateY = $mainPin.position().top - shift.y;
};

const onMouseMove = (evt) => {
  setMoveValue(evt);
  checkAndSetCoordinates();
  setPinPosition();
  setAddressValue();
};

const onMouseUp = () => {
  $document.off(`mousemove`, onMouseMove);
  $document.off(`mouseup`, onMouseUp);
};

const onMouseDown = (evt) => {
  const isLeftButton = evt.button === window.util.LEFT_BUTTON;
  if (isLeftButton) {
    previousCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };
    $document.on(`mousemove`, onMouseMove);
    $document.on(`mouseup`, onMouseUp);
  }
};

const on = () => $mainPin.on(`mousedown`, onMouseDown);

window.pinMoving = {
  setAddressValue,
  on,
  resetPosition,
};
