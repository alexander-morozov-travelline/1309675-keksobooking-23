const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const fillElementOfferData = (element, text) => {
  if (text) {
    element.textContent = text;
  } else {
    element.classList.add('visually-hidden');
  }
};

const getTemplateCard = ({author, offer}) => {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.popup__title');
  const cardAddress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardCheckTime = card.querySelector('.popup__text--time');
  const cardFeatures = card.querySelector('.popup__features');
  const cardPhotoList = card.querySelector('.popup__photos');
  const cardPhoto = cardPhotoList.querySelector('.popup__photo');
  const cardAvatar = card.querySelector('.popup__avatar');
  const cardDescription = card.querySelector('.popup__description');

  fillElementOfferData(cardTitle, offer.title);
  fillElementOfferData(cardAddress, offer.address);
  fillElementOfferData(cardPrice, offer.price ? `${offer.price} ₽/ночь` : null);
  fillElementOfferData(cardType, offerType[offer.type]);
  fillElementOfferData(cardDescription, offer.description);

  if (author.avatar) {
    cardAvatar.src = author.avatar;
  } else {
    cardAvatar.classList.add('visually-hidden');
  }

  if (offer.rooms && offer.guests) {
    fillElementOfferData(cardCapacity, `${offer.rooms} комнаты для ${offer.guests} гостей`);
  }

  if (offer.checkin && offer.checkout) {
    fillElementOfferData(cardCheckTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  }

  cardFeatures.innerHTML = '';
  if (offer.features) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add(
        'popup__feature',
        `popup__feature--${feature}`,
      );
      cardFeatures.appendChild(featureElement);
    });
  } else {
    cardFeatures.classList.add('visually-hidden');
  }

  cardPhotoList.innerHTML = '';
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = cardPhoto.cloneNode(false);
      photoElement.src = photo;
      cardPhotoList.appendChild(photoElement);
    });
  } else {
    cardFeatures.classList.add('visually-hidden');
  }
  return card;
};

export {getTemplateCard};
