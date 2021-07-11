'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const $mapImageChooser = $(`#avatar`);
const $mapImage = $(`.ad-form-header__upload img`);
const $apartmentImageChooser = $(`#images`);
const $apartmentImage = $(`.ad-form__photo`);

const imageChange = ($imageChooser, callBack) => {
  const file = $imageChooser[0].files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matchingTheFileType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
    if (matchingTheFileType) {
      const reader = new FileReader();
      $(reader).on(`load`, () => callBack(reader));
      reader.readAsDataURL(file);
    }
  }
};

const onFileChooserAvatarChange = () => {
  imageChange($mapImageChooser, (reader) => {
    $mapImage.attr({
      'src': reader.result,
      'alt': `Загруженное изображение`,
    });
  });
};

const onFileChooserImageChange = () => {
  imageChange($apartmentImageChooser, (reader) => {
    $apartmentImage.css({
      'backgroundImage': `url(${reader.result})`,
      'backgroundSize': `cover`,
      'backgroundPosition': `center`,
    });
  });
};

const reset = () => {
  $mapImage.attr(`src`, `img/muffin-grey.svg`);
  $apartmentImage.css({'backgroundImage': `none`});
};

const on = () => {
  $mapImageChooser.on(`change`, onFileChooserAvatarChange);
  $apartmentImageChooser.on(`change`, onFileChooserImageChange);
};

window.preview = {
  on,
  reset,
};
