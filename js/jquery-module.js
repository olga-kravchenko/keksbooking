'use strict';
$(() => {
  const title = $(`.map__title`);
  const mainPin = $(`.map__pin--main`);

  title.animate({
    'font-size': `120px`,
    'opacity': `1`,
  }, 2000, () => {
    mainPin.fadeTo(500, 0).css(`display`, `block`).fadeTo(1000, 1);
  });
});

