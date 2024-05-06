const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const Start = document.querySelector("#start");
const Stop = document.querySelector("#stop");
const Reset = document.querySelector("#reset");
const Lap = document.querySelector("#lap");
const lapList = document.createElement("ul");
document.body.appendChild(lapList);

let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;
let lapCount = 1;

function startTimer() {
  interval = setInterval(updateTimer, 1000);
  Start.disabled = true;
  Stop.disabled = false;

  // Start moving the racing track
  document.querySelector(".moving-track").classList.add("move-track");
}

function stopTimer() {
  clearInterval(interval);
  Start.disabled = false;
  Stop.disabled = true;

  // Stop moving the racing track
  document.querySelector(".moving-track").classList.remove("move-track");
}

function resetTimer() {
  stopTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  lapCount = 1;
  updateDisplay();
  lapList.innerHTML = "";
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  hoursDisplay.textContent = formatTime(hours) + "h";
  minutesDisplay.textContent = formatTime(minutes) + "m";
  secondsDisplay.textContent = formatTime(seconds) + "s";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function recordLap() {
  const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
    seconds
  )}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapList.appendChild(lapItem);
  lapCount++;
}

Start.addEventListener("click", startTimer);
Stop.addEventListener("click", stopTimer);
Reset.addEventListener("click", resetTimer);
Lap.addEventListener("click", recordLap);
