'use strict';
(() => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.util = {
    getRandomNumber,
  };
})();
