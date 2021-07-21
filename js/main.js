import {activateApp, deactivateApp} from './state.js';
import {initMap, drawOfferMarkers, redrawOfferMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filters, filterOffers} from './filters.js';
import {resetButton} from './form.js';
import {debounce} from './utils/debounce.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

deactivateApp();

initMap
  .then(activateApp)
  .then(getData)
  .then((offerList) => {
    const shortenedOfferList = offerList.slice(0, OFFER_COUNT);
    drawOfferMarkers(shortenedOfferList);

    filters.addEventListener('change', debounce(
      () => {
        const filteredOffers = filterOffers(offerList).slice(0, OFFER_COUNT);
        redrawOfferMarkers(filteredOffers);
      },
      RERENDER_DELAY,
    ));

    resetButton.addEventListener('click', () => {
      redrawOfferMarkers(shortenedOfferList);
    });
  })
  .catch( (error) => {
    showAlert(`Не удалось загрузить объявления (${error})`);
  });
