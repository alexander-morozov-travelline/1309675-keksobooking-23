import {toggleDisabledElement, toggleDisabledElementList} from './util.js';

const filters = document.querySelector('.map__filters');
const filterSelects = filters.querySelectorAll('select');
const filterFeatures = filters.querySelector('.map__features');

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

export {disableFilters, enableFilters};
