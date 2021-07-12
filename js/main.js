import {generateAdList} from './data.js';
import {createCard} from './card.js';
import {disableOfferForm, enableOfferForm} from './form.js';
import {disableFilters, enableFilters} from './filters.js';

const OFFER_COUNT = 10;

const offers = generateAdList(OFFER_COUNT);
createCard(offers[0]);

const deactivateApp = () => {
  disableOfferForm();
  disableFilters();
};

const activateApp = () => {
  enableOfferForm();
  enableFilters();
};

deactivateApp();
activateApp();
