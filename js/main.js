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

getRandomNumber(1,2);
getRandomReal(1.1,1.2, 2);
