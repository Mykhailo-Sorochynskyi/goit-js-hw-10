import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const btn = document.querySelector('button[data-start]');
// console.log(btn);
btn.disabled = true;

const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

let userSelectedDate;
let intervalId;
let num = 0;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    let ms = selectedDates[0] - nowDate;

    if (ms >= 0) {
      userSelectedDate = selectedDates[0];
      if (num === 0) {
        btn.disabled = false;
        num += 1;
      } else {
        btn.disabled = true;
      }
    } else {
      iziToast.error({
        message: '❌ Please choose a date in the future',
        messageSize: 18,
        messageLineHeight: 50,
        position: 'topRight',
        icon: '',
      });
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    num = 0;
  }

  input.disabled = true;
  intervalId = setInterval(() => timer(), 1000);
  btn.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timer() {
  const now = new Date();
  const ms = userSelectedDate - now;
  if (ms <= 0) {
    clearInterval(intervalId);
    num = 0;
    input.disabled = false;
    return;
  }

  const time = convertMs(ms);

  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
