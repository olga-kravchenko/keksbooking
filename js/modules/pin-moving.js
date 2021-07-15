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

let currentX = START_COORDINATE_X;
let currentY = START_COORDINATE_Y;

let previousCoordinates;

const checkAndSetCoordinates = () => {
  if (currentY > MAX_MAP_HEIGHT) {
    currentY = MAX_MAP_HEIGHT;
  } else if (currentY < MIN_MAP_HEIGHT) {
    currentY = MIN_MAP_HEIGHT;
  }
  if (currentX > MAX_MAP_WIDTH) {
    currentX = MAX_MAP_WIDTH;
  } else if (currentX < MIN_MAP_WIDTH) {
    currentX = MIN_MAP_WIDTH;
  }
};

const setAddressValue = () => {
  const x = Math.floor(currentX + PIN_MIDDLE_WIDTH);
  const y = Math.floor(currentY + PIN_HEIGHT);
  $addressInput.val(`${x}, ${y}`);
};

const setPinPosition = () => {
  $mainPin.css({
    'top': `${currentY}px`,
    'left': `${currentX}px`,
  });
};

const resetPosition = () => {
  currentX = START_COORDINATE_X;
  currentY = START_COORDINATE_Y;
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
  currentX = $mainPin.position().left - shift.x;
  currentY = $mainPin.position().top - shift.y;
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
  const isLeftButtonClicked = evt.button === window.util.LEFT_BUTTON;
  if (isLeftButtonClicked) {
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
  on,
  setAddressValue,
  resetPosition,
};
