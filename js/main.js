import {activateApp, deactivateApp} from './state.js';
import {initMap, createOfferMarker} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import './form.js';

const OFFER_COUNT = 10;

deactivateApp();

initMap
  .then(activateApp)
  .then(getData)
  .then((offerList) => {
    offerList.slice(0, OFFER_COUNT).forEach((offer) => createOfferMarker(offer));
  })
  .catch( (error) => {
    showAlert(`Не удалось загрузить объявления (${error})`);
  });
