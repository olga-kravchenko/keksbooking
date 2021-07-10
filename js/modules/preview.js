'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const $mapImageChooser = $(`#avatar`);
const $mapImage = $(`.ad-form-header__upload img`);
const $apartmentImageChooser = $(`#images`);
const $apartmentImage = $(`.ad-form__photo`);

const onFileChooserAvatarChange = () => {
  const reader = new FileReader();
  const file = $mapImageChooser[0].files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matchingTheFileType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
    if (matchingTheFileType) {
      $(reader).on(`load`, () => {
        $mapImage.attr(`src`, reader.result);
        $mapImage.attr(`alt`, `Загруженное изображение`);
      });
      reader.readAsDataURL(file);
    }
  }
};

const onFileChooserImageChange = () => {
  const reader = new FileReader();
  const file = $apartmentImageChooser[0].files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matchingTheFileType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
    if (matchingTheFileType) {
      $(reader).on(`load`, () => {
        $apartmentImage.css({
          'backgroundImage': `url(${reader.result})`,
          'backgroundSize': `cover`,
          'backgroundPosition': `center`,
        });
      });
      reader.readAsDataURL(file);
    }
  }
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
