'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const $mapImageChooser = $(`#avatar`);
const $mapImage = $(`.ad-form-header__upload img`);
const $apartmentImageChooser = $(`#images`);
const $apartmentImage = $(`.ad-form__photo`);

const reader = new FileReader();

const imageChange = ($fileChooser, img) => {
  const file = $fileChooser[0].files[0];
  const fileName = file.name.toLowerCase();
  const matchingTheFileType = FILE_TYPES.some((e) => fileName.endsWith(e));
  if (matchingTheFileType) {
    $(reader).on(`load`, () => {
      img.attr(`src`, reader.result);
      img.attr(`alt`, `Загруженное изображение`);
    });
    reader.readAsDataURL(file);
  }
};

const onFileChooserAvatarChange = () => {
  imageChange($mapImageChooser, $mapImage);
};

const onFileChooserImageChange = () => {
  const picture = $(`<img src="" alt="">`);
  picture.css({
    'width': `40px`,
    'height': `40px`
  });
  $apartmentImage.append(picture);
  imageChange($apartmentImageChooser, picture);
};

const reset = () => {
  $mapImage.attr(`src`, `img/muffin-grey.svg`);
  const $image = $(`.ad-form__photo img`);
  if ($image.length) {
    $image.remove();
  }
};

const addListeners = () => {
  $mapImageChooser.on(`change`, onFileChooserAvatarChange);
  $apartmentImageChooser.on(`change`, onFileChooserImageChange);
};

window.preview = {
  addListeners,
  reset,
};
