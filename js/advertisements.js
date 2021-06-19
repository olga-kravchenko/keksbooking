'use strict';
(() => {
  const QUANTITY_OF_ADVERTISEMENTS = 8;
  const MIN_QUANTITY_OF_ROOMS = 1;
  const MAX_QUANTITY_OF_ROOMS = 3;
  const MIN_QUANTITY_OF_VISITORS = 1;
  const MAX_QUANTITY_OF_VISITORS = 3;
  const MONEY_CONVERTER = 100;
  const MIN_X_COORDINATE = 100;
  const MAX_X_COORDINATE = 1100;
  const MIN_Y_COORDINATE = 130;
  const MAX_Y_COORDINATE = 630;
  const TYPES_OF_APARTMENTS = [`palace`, `flat`, `house`, `bungalow`];
  const NAMES_OF_APARTMENTS = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const get = () => {
    let advertisements = [];
    for (let i = 0; i < QUANTITY_OF_ADVERTISEMENTS; i++) {
      let number = i + 1;
      const advertisement = {
        author: {
          avatar: `img/avatars/user0${number}.png`
        },
        offer: {
          title: `Уютные апартаменты №0${number}`,
          price: number * MONEY_CONVERTER,
          type: NAMES_OF_APARTMENTS[window.util.getRandomNumber(0, TYPES_OF_APARTMENTS.length)],
          rooms: window.util.getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
          guests: window.util.getRandomNumber(MIN_QUANTITY_OF_VISITORS, MAX_QUANTITY_OF_VISITORS),
          checkin: TIMES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, TIMES.length)],
          checkout: TIMES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, TIMES.length)],
          features: FEATURES.slice(window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, FEATURES.length)),
          description: `Классное место для отыха №0${number}`,
          photos: PHOTOS.slice(window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, PHOTOS.length)),
        },
        location: {
          x: window.util.getRandomNumber(MIN_X_COORDINATE, MAX_X_COORDINATE),
          y: window.util.getRandomNumber(MIN_Y_COORDINATE, MAX_Y_COORDINATE),
        }
      };
      advertisement.address = `${advertisement.location.x}, ${advertisement.location.y}`;
      advertisements.push(advertisement);
    }
    return advertisements;
  };


  window.advertisements = {
    get,
  };
})();
