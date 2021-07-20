const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  if(min<0 || min > max) {
    throw new RangeError('Ошибка данных: первое значение должно быть меньше второго и быть >= 0');
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomReal = (min, max, decimalNumber) => {
  if(min<0 || min > max) {
    throw new RangeError('Ошибка данных: первое значение должно быть меньше второго и быть >= 0');
  }
  return (Math.random() * (max - min) + min).toFixed(decimalNumber);
};

const  getArrayRandElement = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const shuffleArr = (arr) => arr.sort(() => Math.random() - 0.5);

const getArrayRandLength = (arr) => shuffleArr(arr.slice(0, getRandomNumber(1, arr.length)));

const toggleDisabledElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const toggleDisabledElementList = (elementList, isDisabled) => {
  elementList.forEach((element) => {
    toggleDisabledElement(element, isDisabled);
  });
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {
  getRandomNumber,
  getRandomReal,
  getArrayRandElement,
  getArrayRandLength,
  shuffleArr,
  toggleDisabledElement,
  toggleDisabledElementList,
  isEscEvent,
  isEnterEvent,
  showAlert
};
