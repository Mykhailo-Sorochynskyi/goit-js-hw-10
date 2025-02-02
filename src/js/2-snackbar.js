import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const ms = document.querySelector('.form > label input');

const fieldset = document.querySelector('fieldset');

const userData = {
  value: '',
  delay: '',
};

ms.addEventListener('input', event => {
  userData.delay = ms.value;
});

fieldset.addEventListener('click', event => {
  if (event.target.type === 'radio') {
    userData.value = event.target.value;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  form.reset();
  if (userData.value && userData.delay) {
    fetchUserServer(userData)
      .then(delay =>
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          color: 'green',
        })
      )
      .catch(delay => {
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          color: 'red',
        });
      });
  }
});

const fetchUserServer = ({ value, delay }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};
