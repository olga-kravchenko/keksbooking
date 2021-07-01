'use strict';
$(() => {
  const title = $(`.map__title`);
  const mainPin = $(`.map__pin--main`);

  title.animate({
    'font-size': `120px`,
    'opacity': `1`,
  }, 1000, () => {
    mainPin.fadeTo(300, 0).css(`display`, `block`).fadeTo(500, 1);
  });
});

