import {disableOfferForm, enableOfferForm, resetForm } from './form.js';
import {disableFilters, enableFilters, resetFilter} from './filters.js';
import {resetMap} from './map.js';

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
