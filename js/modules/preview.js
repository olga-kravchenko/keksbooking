'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const $mapImageChooser = $(`#avatar`);
const $mapImage = $(`.ad-form-header__upload img`);
const $apartmentImageChooser = $(`#images`);
const $apartmentImage = $(`.ad-form__photo`);

const reader = new FileReader();

const createImage = () => {
  const $picture = $(`<img src="img/muffin-grey.svg" alt="">`);
  $picture.css({
    'width': `40px`,
    'height': `40px`,
  });
  $apartmentImage.append($picture);
  return $picture;
};

const $picture = createImage();

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
  imageChange($apartmentImageChooser, $picture);
};

const reset = () => {
  $mapImage.attr(`src`, `img/muffin-grey.svg`);
  $picture.attr(`src`, `img/muffin-grey.svg`);
};

const addListeners = () => {
  $mapImageChooser.on(`change`, onFileChooserAvatarChange);
  $apartmentImageChooser.on(`change`, onFileChooserImageChange);
};

window.preview = {
  addListeners,
  reset,
};
