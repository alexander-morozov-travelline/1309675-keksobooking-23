import {isEscEvent, isEnterEvent} from './util.js';

const successPopupTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');
const errorPopupTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');

let successPopup = null;
let errorPopup = null;
let onSuccessPopupKeydown = null;
let onErrorPopupKeydown = null;

const onCloseSuccessPopup = () => {
  if (successPopup !== null) {
    successPopup.removeEventListener('click', onCloseSuccessPopup);
    document.removeEventListener('keydown', onSuccessPopupKeydown);
    successPopup.remove();
    successPopup = null;
  }
};

const onCloseErrorPopup = () => {
  if (errorPopup !== null) {
    errorPopup.removeEventListener('click', onCloseErrorPopup);
    document.removeEventListener('keydown', onErrorPopupKeydown);
    errorPopup.remove();
    errorPopup = null;
  }
};

onSuccessPopupKeydown = (evt) => {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    onCloseSuccessPopup();
  }
};

onErrorPopupKeydown = (evt) => {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    onCloseErrorPopup();
  }
};

const showSuccessPopup = () => {
  successPopup = successPopupTemplate.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', successPopup);
  successPopup.addEventListener('click', onCloseSuccessPopup);
  document.addEventListener('keydown', onSuccessPopupKeydown);
};

const showErrorPopup = () => {
  errorPopup = errorPopupTemplate.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', errorPopup);
  errorPopup.addEventListener('click', onCloseErrorPopup);
  document.addEventListener('keydown', onErrorPopupKeydown);
};

export {showSuccessPopup, showErrorPopup};
