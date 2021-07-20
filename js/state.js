import {disableOfferForm, enableOfferForm, resetForm } from './form.js';
import {disableFilters, enableFilters} from './filters.js';
import {resetMap} from './map.js';
import {resetFilter} from './filter.js';

const activateApp = () => {
  enableOfferForm();
  enableFilters();
};

const deactivateApp = () => {
  disableOfferForm();
  disableFilters();
};

const resetApp = () => {
  resetForm();
  resetFilter();
  resetMap();
};

export {activateApp, deactivateApp, resetApp};
