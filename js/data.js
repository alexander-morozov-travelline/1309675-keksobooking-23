import {getArrayRandLength, getArrayRandElement, getRandomReal, getRandomNumber} from './util.js';

const TitleList = [
  'Эконом двухместный',
  'Стандарт одноместный',
  'Стандарт двухместный',
  'Студия',
  'Люкс',
  'Апартаменты',
];
const PRICE_MIN = 1000;
const PRICE_MAX = 50000;
const TypeList = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const ROOMS_MIN = 1;
const ROOMS_MAX = 10;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const CheckinList = [
  '12:00',
  '13:00',
  '14:00',
];
const CheckoutList = [
  '12:00',
  '13:00',
  '14:00',
];
const FeatureList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DescriptionList = [
  'Номер оснащенный по самому последнему слову техники',
  'Удобное расположение в самом центре города',
  'Идеальное место для отдыха',
  'Просторное жильё в роскошных аппартаментах',
];
const PhotoList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LOCATION_DECIMAL_NUMBER = 5;


const createOffer = (index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    'author': {
      'avatar': `img/avatars/user${number}.png`,
    },
    'offer': {
      'title': getArrayRandElement(TitleList),
      'address': `${getRandomReal(LAT_MIN, LAT_MAX, LOCATION_DECIMAL_NUMBER)}, ${getRandomReal(LNG_MIN, LNG_MAX, LOCATION_DECIMAL_NUMBER)}`,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type':  getArrayRandElement(TypeList),
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': getArrayRandElement(CheckinList),
      'checkout': getArrayRandElement(CheckoutList),
      'features': getArrayRandLength(FeatureList),
      'description': getArrayRandElement(DescriptionList),
      'photos': getArrayRandLength(PhotoList),
    },
    'location': {
      'lat': Number(getRandomReal(LAT_MIN, LAT_MAX, LOCATION_DECIMAL_NUMBER)),
      'lng': Number(getRandomReal(LNG_MIN, LNG_MAX, LOCATION_DECIMAL_NUMBER)),
    },
  };
};

const generateOfferList = (offerCount) => new Array(offerCount).fill(null).map((item, index) => createOffer(index));

export {generateOfferList};
