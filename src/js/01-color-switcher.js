
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const CHANGE_COLOR_DELAY = 1000;

let intervalId = null;

// startBtn.setAttribute('disabled', 'disabled')

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click',onStopBtnClick);

function onStartBtnClick() {
    console.log("START");
    intervalId = setInterval(() => {
        console.log(getRandomHexColor());
        document.body.style.background = getRandomHexColor();
    }, CHANGE_COLOR_DELAY);

    changeBtnStatus(false, true);
   
}

function onStopBtnClick() {
    console.log("STOP");

    clearInterval(intervalId);

    changeBtnStatus(true, false);

}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBtnStatus = (remove, add) => {
    startBtn.disabled = add;
    stopBtn.disabled = remove;
};
