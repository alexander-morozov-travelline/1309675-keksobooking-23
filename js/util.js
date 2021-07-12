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

const disabledElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const disabledElementList = (elementList, isDisabled) => {
  elementList.forEach((element) => {
    disabledElement(element, isDisabled);
  });
};

export {getRandomNumber, getRandomReal, getArrayRandElement, getArrayRandLength, shuffleArr, disabledElement, disabledElementList};
