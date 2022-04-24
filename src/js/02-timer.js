// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
const dateInput = document.querySelector("#datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const dateNow = new Date();
const date = flatpickr('#datetime-picker', options);

let intervlaId = null;

dateInput.addEventListener('change', checkInputDate);
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);


function onStartBtnClick(evt) {

    changeBtnStatus(true);

    let dateMs = date.selectedDates[0].getTime();

    let dateNowMs = dateNow.getTime();

    console.log('MS :',dateMs);

    console.log('NOW MS:',dateNowMs);

    // const deltaMs = dateMs - dateNowMs;
    
    // const afterConvert = convertMs(timerMs);

    // console.log(afterConvert);
    startTimer(dateMs, dateNowMs);


}

function startTimer(dateMs, dateNowMs) {
    
    intervlaId = setInterval(() => {
        let deltaMs = dateMs - dateNowMs;
        console.log(convertMs(deltaMs));
        updateClockface(convertMs(deltaMs));
        }, 1000);
    return;
}

function checkInputDate() {

    let dateMs = date.selectedDates[0].getTime();
    let dateNowMs = dateNow.getTime();

    if (dateMs < dateNowMs) {
        window.alert("Please choose a date in the future");
        changeBtnStatus(true,false);
    } else {
        changeBtnStatus(false,true);
    }
}


function onStopBtnClick() {
    console.log("STOP");
    clearInterval(intervlaId);
    changeBtnStatus(false,true);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}
  
const changeBtnStatus = (add, remove) => {
    startBtn.disabled = add;
    stopBtn.disabled = remove;

};

function updateClockface({ days, hours, minutes, seconds }) {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds; 
}