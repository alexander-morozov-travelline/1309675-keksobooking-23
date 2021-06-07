'use strict';

const getRandomNumber = (min, max) => {
  if(min<0 || min > max) {
    throw new RangeError('Ошибка данных: первое значение должно быть меньше второго и быть >= 0');
  }
  return Math.random() * (max - min) + min;
};

console.log( getRandomNumber(1,2));
