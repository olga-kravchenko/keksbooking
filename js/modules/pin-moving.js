'use strict';

const PIN_HEIGHT = 55;
const PIN_MIDDLE_WIDTH = 34;
const MAX_MAP_WIDTH = 1200;
const MIN_MAP_WIDTH = 270;
const MIN_MAP_HEIGHT = 75;
const MAX_MAP_HEIGHT = 575;
const RIGHT_BUTTON = 0;

const $mainPin = $(`.map__pin--main`);
const $addressInput = $(`#address`);

let currentCoordinateLeft = 570;
let currentCoordinateTop = 375;
let startCoordinates;

const checkCoordinate = () => {
  currentCoordinateTop = currentCoordinateTop > MAX_MAP_HEIGHT ? MAX_MAP_HEIGHT : currentCoordinateTop;
  currentCoordinateTop = currentCoordinateTop < MIN_MAP_HEIGHT ? MIN_MAP_HEIGHT : currentCoordinateTop;
  currentCoordinateLeft = currentCoordinateLeft > (MAX_MAP_WIDTH - PIN_MIDDLE_WIDTH) ? (MAX_MAP_WIDTH - PIN_MIDDLE_WIDTH) : currentCoordinateLeft;
  currentCoordinateLeft = currentCoordinateLeft < MIN_MAP_WIDTH ? MIN_MAP_WIDTH : currentCoordinateLeft;
};

const setAddressValue = () => {
  $addressInput.val(`${currentCoordinateLeft + PIN_MIDDLE_WIDTH}, ${currentCoordinateTop + PIN_HEIGHT}`);
};

const setPinPosition = () => {
  $mainPin.css({
    'top': `${currentCoordinateTop}px`,
    'left': `${currentCoordinateLeft}px`
  });
};

const resetPosition = ()=> {
  currentCoordinateLeft = 570;
  currentCoordinateTop = 375;
  setPinPosition();
};

const setMoveValue = (evt) => {
  let shift = {
    x: startCoordinates.x - evt.clientX,
    y: startCoordinates.y - evt.clientY
  };
  startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };
  currentCoordinateLeft = $mainPin.position().left - shift.x;
  currentCoordinateTop = $mainPin.position().top - shift.y;
};

const onMouseMove = (evt) => {
  evt.preventDefault();
  setMoveValue(evt);
  checkCoordinate();
  setPinPosition();
  setAddressValue();
};

const onMouseUp = (evt) => {
  evt.preventDefault();
  $(document).off(`mousemove`, onMouseMove);
  $(document).off(`mouseup`, onMouseUp);
};

const onMouseDown = (evt) => {
  if (typeof evt === `object`) {
    switch (evt.button) {
      case RIGHT_BUTTON:
        evt.preventDefault();
        startCoordinates = {
          x: evt.clientX,
          y: evt.clientY
        };
        $(document).on(`mousemove`, onMouseMove);
        $(document).on(`mouseup`, onMouseUp);
        break;
    }
  }
};

const on = () => {
  $mainPin.on(`mousedown`, onMouseDown);
};

window.pinMoving = {
  setAddressValue,
  on,
  resetPosition,
};
