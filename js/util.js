const ALERT_SHOW_TIME = 5000;

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
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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
  toggleDisabledElement,
  toggleDisabledElementList,
  isEscEvent,
  isEnterEvent,
  showAlert
};
