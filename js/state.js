import {disableOfferForm, enableOfferForm} from './form.js';
import {disableFilters, enableFilters} from './filters.js';

const activateApp = () => {
  enableOfferForm();
  enableFilters();
};

const deactivateApp = () => {
  disableOfferForm();
  disableFilters();
};

export {activateApp, deactivateApp};
