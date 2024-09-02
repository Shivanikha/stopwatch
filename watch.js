
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Function to handle button color change
function setButtonActive(button) {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 200); // Remove active state after 200ms
}

// Function to start the timer
function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateDisplay, 1);
        running = true;
    }
}

// Function to update the display
function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    running = false;
    lapCounter = 1;
    lapList.innerHTML = '';
}

// Function to add a lap entry
function addLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

// Event listeners for buttons
startButton.addEventListener('click', () => {
    startTimer();
    setButtonActive(startButton);
});

pauseButton.addEventListener('click', () => {
    pauseTimer();
    setButtonActive(pauseButton);
});

resetButton.addEventListener('click', () => {
    resetTimer();
    setButtonActive(resetButton);
});

lapButton.addEventListener('click', () => {
    addLap();
    setButtonActive(lapButton);
});
