import {toggleDisabledElement, toggleDisabledElementList} from './util.js';

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

const GUEST_ROOM_AVAILABLE_LIST = {
  1: {0: false, 1: true, 2: false, 3: false},
  2: {0: false, 1: true, 2: true, 3: false},
  3: {0: false, 1: true, 2: true, 3: true},
  100: {0: true, 1: false, 2: false, 3: false},
};

const MIN_PRICE_FOR_NIGHT = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const MIN_TITLE_LENGTH = 30;

const onTitleChange = () => {
  const valueLength = offerTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitle.reportValidity();
  }
};

const onPriceChange = () => {
  if(price.value < price.min || price>price.max) {
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

const onTimeChange = (timeValue) => {
  timeInSelect.value = timeValue.target.value;
  timeOutSelect.value = timeValue.target.value;
};

const onTypeOfHouseChange = () => {
  const typeOfHouse = typeOfHouseSelect.value;
  const minPrice = MIN_PRICE_FOR_NIGHT[typeOfHouse];
  price.setAttribute('min', minPrice);
  price.placeholder = minPrice;
};

const onRoomChange = () => {
  const roomAmount = roomsSelect.value;
  const guestRoomAvailable = GUEST_ROOM_AVAILABLE_LIST[roomAmount];

  optionCapacityGuests.forEach((option) => {
    const isOptionDisabled = !guestRoomAvailable[option.value];
    toggleDisabledElement(option, isOptionDisabled);
    if(option.selected && isOptionDisabled){
      guestsSelect.setCustomValidity('Выберите допустимое значение из списка');
    }
  });
};

const onGuestsChange = () => {
  guestsSelect.setCustomValidity('');
};

offerTitle.addEventListener('change', onTitleChange);
price.addEventListener('change', onPriceChange);
timeInSelect.addEventListener('change', onTimeChange);
timeOutSelect.addEventListener('change', onTimeChange);
typeOfHouseSelect.addEventListener('change', onTypeOfHouseChange);
roomsSelect.addEventListener('change', onRoomChange);
guestsSelect.addEventListener('change', onGuestsChange);

onRoomChange();
onTypeOfHouseChange();

export {disableOfferForm, enableOfferForm};
