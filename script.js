let startTime, updatedTime, difference, tInterval;
let running = false;
let time = { hours: 0, minutes: 0, seconds: 0 };
let lapNumber = 1;

// Update time display
function updateDisplay() {
    document.getElementById('time').textContent = 
        `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1000);
        running = true;
        document.getElementById('startButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
        document.getElementById('lapButton').disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    clearInterval(tInterval);
    running = false;
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval);
    time = { hours: 0, minutes: 0, seconds: 0 };
    updateDisplay();
    document.getElementById('lapList').innerHTML = '';
    running = false;
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('lapButton').disabled = true;
}

// Get and show the time
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    time.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    time.minutes = Math.floor((difference / (1000 * 60)) % 60);
    time.seconds = Math.floor((difference / 1000) % 60);
    
    updateDisplay();
}

// Record a lap time
function recordLap() {
    const lapList = document.getElementById('lapList');
    const lapTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber++}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

// Event listeners
document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('pauseButton').addEventListener('click', pauseStopwatch);
document.getElementById('resetButton').addEventListener('click', resetStopwatch);
document.getElementById('lapButton').addEventListener('click', recordLap);
