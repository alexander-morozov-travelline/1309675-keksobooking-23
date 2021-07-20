import {setAddressInput} from './form.js';
import {getTemplateCard} from './card.js';

const LOCATION_DECIMAL_NUMBER = 5;
const MAP_ZOOM = 11;
const DEFAULT_COORDS_LAT = 35.65160;
const DEFAULT_COORDS_LNG = 139.74908;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const MAIN_PIN_ANCHOR_X = 26;
const MAIN_PIN_ANCHOR_Y = 52;
const DEFAULT_PIN_WIDTH = 40;
const DEFAULT_PIN_HEIGHT = 40;
const DEFAULT_PIN_ANCHOR_X = 20;
const DEFAULT_PIN_ANCHOR_Y = 40;


const defaultCoords = {
  LAT: DEFAULT_COORDS_LAT,
  LNG: DEFAULT_COORDS_LNG,
};

let map;

const initMap = new Promise((resolve) => {
  map = L.map('map-canvas')
    .on('load', () => {
      resolve();
    })
    .setView({
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const defaultMainPin = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
  iconAnchor: [MAIN_PIN_ANCHOR_X, MAIN_PIN_ANCHOR_Y],
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

const resetMap = () =>{
  mainPin.setLatLng({
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  });
  map.setView({
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  }, MAP_ZOOM);
  setAddressInput(`${defaultCoords.LAT}, ${defaultCoords.LNG}`);
  initMainPinCoords();
};

const addMarkersGroup = L.layerGroup().addTo(map);
const adMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [DEFAULT_PIN_WIDTH, DEFAULT_PIN_HEIGHT],
  iconAnchor: [DEFAULT_PIN_ANCHOR_X, DEFAULT_PIN_ANCHOR_Y],
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


initMainPinCoords();


export {initMap, createOfferMarker, resetMap, initMainPinCoords};
