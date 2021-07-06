'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const $mapImageChooser = $(`#avatar`);
const $mapImage = $(`.ad-form-header__upload img`);
const $apartmentImageChooser = $(`#images`);
const $apartmentImage = $(`.ad-form__photo`);

const reader = new FileReader();

const imageChange = ($fileChooser, onReaderLoad) => {
  const file = $fileChooser[0].files[0];
  const fileName = file.name.toLowerCase();
  const matchingTheFileType = FILE_TYPES.some((e) => fileName.endsWith(e));
  if (matchingTheFileType) {
    $(reader).on(`load`, onReaderLoad);
    reader.readAsDataURL(file);
  }
};

const onReaderLoadSetAvatarImage = () => $mapImage.attr({src: `${reader.result}`, alt: `Загруженное изображение`});

const onReaderLoadSetApartmentImage = () => {
  $apartmentImage.css({
    'backgroundImage': `url(${reader.result})`,
    'backgroundSize': `cover`,
    'backgroundPosition': `center`,
  });
};

const onFileChooserAvatarChange = () => imageChange($mapImageChooser, onReaderLoadSetAvatarImage);
const onFileChooserImageChange = () => imageChange($apartmentImageChooser, onReaderLoadSetApartmentImage);

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
