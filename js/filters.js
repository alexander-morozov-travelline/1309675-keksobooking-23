import {disabledElement, disabledElementList} from './util.js';

const filters = document.querySelector('.map__filters');
const filterSelects = filters.querySelectorAll('select');
const filterFeatures = filters.querySelector('.map__features');

const disableFilters = () => {
  filters.classList.add('map__filters--disabled');
  disabledElementList(filterSelects, true);
  disabledElement(filterFeatures, true);
};

const enableFilters = () => {
  filters.classList.remove('map__filters--disabled');
  disabledElementList(filterSelects,false);
  disabledElement(filterFeatures, false);
};

export {disableFilters, enableFilters};
