import {generateAdList} from './data.js';
import {createCard} from './card.js';

const OFFER_COUNT = 10;

const offers = generateAdList(OFFER_COUNT);
createCard(offers[0]);
