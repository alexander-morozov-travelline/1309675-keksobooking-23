import {toggleDisabledElement, toggleDisabledElementList} from './util.js';

const ANY_SELECT = 'any';
const LOW_PRICE = 10000;
const MIDDLE_PRICE = 50000;

const CategoryPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const filters = document.querySelector('.map__filters');
const filterSelects = filters.querySelectorAll('select');
const filterFeatures = filters.querySelector('.map__features');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');
const housingFeatures = filters.querySelector('#housing-features');
const checkboxFeatures = housingFeatures.querySelectorAll('.map__checkbox');


const disableFilters = () => {
  filters.classList.add('map__filters--disabled');
  toggleDisabledElementList(filterSelects, true);
  toggleDisabledElement(filterFeatures, true);
};

const enableFilters = () => {
  filters.classList.remove('map__filters--disabled');
  toggleDisabledElementList(filterSelects,false);
  toggleDisabledElement(filterFeatures, false);
};

const resetFilter = () => {
  filters.reset();
};

const  matchesFilterByHousingType = (ad) => {
  const housingTypeValue = housingType.value;
  return housingTypeValue === ANY_SELECT || housingTypeValue ===  ad.offer.type;
};

const matchesFilterByHousingPrice = (ad) => {
  const offerPrice = ad.offer.price;
  switch(housingPrice.value) {
    case CategoryPrice.LOW:
      return offerPrice <= LOW_PRICE;
    case CategoryPrice.MIDDLE:
      return offerPrice >= LOW_PRICE && offerPrice <= MIDDLE_PRICE;
    case CategoryPrice.HIGH:
      return offerPrice >= MIDDLE_PRICE;
  }
  return true;
};

const matchesFilterByHousingRooms = (ad) => {
  const housingRoomsValue = housingRooms.value;
  return housingRoomsValue === ANY_SELECT || Number(housingRoomsValue) === ad.offer.rooms;
};

const matchesFilterByHousingGuests = (ad) => {
  const housingGuestsValue = housingGuests.value;
  return housingGuestsValue === ANY_SELECT || Number(housingGuestsValue) === ad.offer.guests;
};

const matchesFilterByHousingFeatures = (ad) =>
  Array.from(checkboxFeatures).every( (checkbox) =>
    !checkbox.checked || ad.offer.features && ad.offer.features.includes(checkbox.value));

const filterOffers = (offerList) =>
  offerList.filter((ad) =>
    matchesFilterByHousingType(ad) &&
    matchesFilterByHousingPrice(ad) &&
    matchesFilterByHousingRooms(ad) &&
    matchesFilterByHousingGuests(ad) &&
    matchesFilterByHousingFeatures(ad));


export {filters, disableFilters, enableFilters, resetFilter, filterOffers};
