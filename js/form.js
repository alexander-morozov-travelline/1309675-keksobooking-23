import {toggleDisabledElement, toggleDisabledElementList} from './util.js';
import {showSuccessPopup, showErrorPopup} from './popup.js';
import {resetApp} from './state.js';
import {sendData} from './api.js';

const MIN_TITLE_LENGTH = 30;
const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const TYPE_PRICE_DEFAULT = 'flat';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const offerTitle = form.querySelector('#title');
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');
const optionCapacityGuests = guestsSelect.querySelectorAll('option');
const price = form.querySelector('#price');
const typeOfHouseSelect = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const address = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');
const avatarInput = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const houseInput = form.querySelector('#images');
const housePreviewContainer = form.querySelector('.ad-form__photo');

const imageExtensions = ['gif', 'jpg', 'jpeg', 'png'];

const guestRoomAvailableList = {
  1: {0: false, 1: true, 2: false, 3: false},
  2: {0: false, 1: true, 2: true, 3: false},
  3: {0: false, 1: true, 2: true, 3: true},
  100: {0: true, 1: false, 2: false, 3: false},
};

const minPriceForNight = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const setAddressInput = (coords) => {
  address.value = coords;
};

const onTitleChange = () => {
  const valueLength = offerTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitle.reportValidity();
  }
};

const onPriceChange = () => {
  if (price.value < price.min || price>price.max) {
    price.reportValidity();
  }
};

const disableOfferForm = () => {
  form.classList.add('ad-form--disabled');
  toggleDisabledElementList(formFieldsets, true);
};

const enableOfferForm = () => {
  form.classList.remove('ad-form--disabled');
  toggleDisabledElementList(formFieldsets, false);
};

const onTypeOfHouseChange = () => {
  const typeOfHouse = typeOfHouseSelect.value;
  const minPrice = minPriceForNight[typeOfHouse];
  price.setAttribute('min', minPrice);
  price.placeholder = minPrice;
};

const onRoomChange = () => {
  const roomAmount = roomsSelect.value;
  const guestRoomAvailable = guestRoomAvailableList[roomAmount];

  optionCapacityGuests.forEach((option) => {
    const isOptionDisabled = !guestRoomAvailable[option.value];
    toggleDisabledElement(option, isOptionDisabled);
    if (option.selected && isOptionDisabled) {
      guestsSelect.setCustomValidity('Выберите допустимое значение из списка');
    }
  });
};

const resetForm = () => {
  form.reset();
  price.placeholder = minPriceForNight[TYPE_PRICE_DEFAULT];
  avatarPreview.src = AVATAR_DEFAULT;
  housePreviewContainer.innerHTML = '';
  onTypeOfHouseChange();
  onRoomChange();
};

const onTimeChange = (timeValue) => {
  timeInSelect.value = timeValue.target.value;
  timeOutSelect.value = timeValue.target.value;
};

const onGuestsChange = () => {
  guestsSelect.setCustomValidity('');
};


const onResetClick = (evt) => {
  evt.preventDefault();
  resetApp();
};

const setPreview = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = imageExtensions.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  setPreview(avatarInput, avatarPreview);
});

houseInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  const housePhotoPreview = document.createElement('img');
  housePhotoPreview.style.width = '100%';
  housePhotoPreview.style.height = '100%';
  housePhotoPreview.style.objectFit = 'cover';
  housePreviewContainer.appendChild(housePhotoPreview);
  setPreview(houseInput, housePhotoPreview);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  sendData(formData)
    .then(showSuccessPopup)
    .then(resetApp)
    .catch(showErrorPopup);
});

offerTitle.addEventListener('change', onTitleChange);
price.addEventListener('change', onPriceChange);
timeInSelect.addEventListener('change', onTimeChange);
timeOutSelect.addEventListener('change', onTimeChange);
typeOfHouseSelect.addEventListener('change', onTypeOfHouseChange);
roomsSelect.addEventListener('change', onRoomChange);
guestsSelect.addEventListener('change', onGuestsChange);
resetButton.addEventListener('click', onResetClick);

onRoomChange();
onTypeOfHouseChange();

export {
  disableOfferForm,
  enableOfferForm,
  setAddressInput,
  resetForm,
  resetButton
};
