// Define variables for timer
let countdownTimer;
let targetTime = 0;
let isPaused = false;
let timeLeft = 0;

// Get DOM elements
const datetimeInput = document.getElementById("datetime");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Start button logic
startBtn.onclick = function () {
  // Only calculate new target time if not resuming
  if (!isPaused) {
    const selectedTime = new Date(datetimeInput.value);
    targetTime = selectedTime.getTime();

    // Validate the time
    if (!targetTime || targetTime <= Date.now()) {
      alert("Please select a valid future time.");
      return;
    }

    timeLeft = targetTime - Date.now();
  } else {
    // Resuming, so use remaining time
    targetTime = Date.now() + timeLeft;
  }

  isPaused = false;
  clearInterval(countdownTimer);
  countdownTimer = setInterval(updateDisplay, 1000);
  updateDisplay();
};

// Pause button logic
pauseBtn.onclick = function () {
  clearInterval(countdownTimer);
  timeLeft = targetTime - Date.now();
  isPaused = true;
};

// Reset everything
resetBtn.onclick = function () {
  clearInterval(countdownTimer);
  document.getElementById("days").textContent = "0";
  document.getElementById("hours").textContent = "0";
  document.getElementById("minutes").textContent = "0";
  document.getElementById("seconds").textContent = "0";
  datetimeInput.value = "";
  isPaused = false;
  timeLeft = 0;
  targetTime = 0;
};

// Main update function
function updateDisplay() {
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) {
    clearInterval(countdownTimer);
    alert("⏰ Time's Up!");
    resetBtn.click();
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
