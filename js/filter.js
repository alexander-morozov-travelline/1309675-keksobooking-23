const filterForm = document.querySelector('.map__filters');
/*const filterSelects = filterForm.querySelectorAll('select');
const filterFeatures = filterForm.querySelector('.map__features');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');
const checkboxFeatures = housingFeatures.querySelectorAll('.map__checkbox');*/

//@todo: Пока просто добавил переменные, потом нужно будет для инициализации фильтров, пока использую только для reset form

const resetFilter = () => {
  filterForm.reset();
};

export {  resetFilter };
