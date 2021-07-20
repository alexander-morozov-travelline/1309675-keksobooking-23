const API_GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const API_SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = () => (
  fetch(API_GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(response.status);
    })
    .then((response) => response.json())
);

const sendData = (formData) => (
  fetch(API_SEND_DATA_URL,
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(response.status);
  })
);

export {getData, sendData};
