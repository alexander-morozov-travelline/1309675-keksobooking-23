import {toggleDisabledElementList} from './util.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');

const disableOfferForm = () => {
  form.classList.add('ad-form--disabled');
  toggleDisabledElementList(formFieldsets, true);
};

const enableOfferForm = () => {
  form.classList.remove('ad-form--disabled');
  toggleDisabledElementList(formFieldsets, false);
};

export {disableOfferForm, enableOfferForm};
