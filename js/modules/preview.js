'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooserAvatar = document.querySelector(`#avatar`);
const previewAvatar = document.querySelector(`.ad-form-header__upload img`);
const fileChooserImage = document.querySelector(`#images`);
const previewPicture = document.querySelector(`.ad-form__photo`);

const reader = new FileReader();

const imageChange = (fileChooser, img) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matchingTheFileType = FILE_TYPES.some((e) => fileName.endsWith(e));
  if (matchingTheFileType) {
    reader.addEventListener(`load`, () => {
      img.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onFileChooserAvatarChange = () => {
  imageChange(fileChooserAvatar, previewAvatar);
};

const onFileChooserImageChange = () => {
  const picture = document.createElement(`img`);
  picture.style.width = `40px`;
  picture.style.height = `40px`;
  previewPicture.appendChild(picture);
  imageChange(fileChooserImage, picture);
};

const reset = () => {
  previewAvatar.src = `img/muffin-grey.svg`;
  const image = document.querySelector(`.ad-form__photo img`);
  if (image) {
    image.remove();
  }
};

const addListeners = () => {
  fileChooserAvatar.addEventListener(`change`, onFileChooserAvatarChange);
  fileChooserImage.addEventListener(`change`, onFileChooserImageChange);
};

window.preview = {
  addListeners,
  reset,
};
