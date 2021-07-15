import {setAddressInput} from './form.js';
import {generateOfferList} from './data.js';
import {getTemplateCard} from './card.js';
import {activateApp} from './state.js';

const resetButton = document.querySelector('.ad-form__reset');

const OFFER_COUNT = 10;
const LOCATION_DECIMAL_NUMBER = 5;

const defaultCoords = {
  LAT: 35.65160,
  LNG: 139.74908,
};

const offers = generateOfferList(OFFER_COUNT);

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateApp();
    })
    .setView({
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    }, 11);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const defaultMainPin = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPin = L.marker(
    {
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    },
    {
      draggable: true,
      icon: defaultMainPin,
    },
  );

  mainPin.addTo(map);

  const initMainPinCoords = () => {
    setAddressInput(`${defaultCoords.LAT}, ${defaultCoords.LNG}`);

    mainPin.on('moveend', (evt) => {
      const coordinateLat = (evt.target.getLatLng().lat).toFixed(LOCATION_DECIMAL_NUMBER);
      const coordinateLng = (evt.target.getLatLng().lng).toFixed(LOCATION_DECIMAL_NUMBER);
      setAddressInput(`${coordinateLat}, ${coordinateLng}`);
    });
  };

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    mainPin.setLatLng({
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    });
    map.setView({
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    }, 11);
    setAddressInput(`${defaultCoords.LAT}, ${defaultCoords.LNG}`);
  });

  const addMarkersGroup = L.layerGroup().addTo(map);
  const adMarkerIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const createOfferMarker = (offer) => {
    const {lat, lng} = offer.location;
    const adMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        adMarkerIcon,
      },
    );
    adMarker
      .addTo(addMarkersGroup)
      .bindPopup(
        getTemplateCard(offer),
        {
          keepInView: true,
        },
      );
  };

  offers.forEach((offer) => createOfferMarker(offer));

  initMainPinCoords();
};

export {initMap};
