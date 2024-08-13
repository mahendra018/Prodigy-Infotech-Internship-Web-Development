let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;

function startPause() {
    const startPauseBtn = document.getElementById('startPauseBtn');
    if (!isRunning) {
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.remove('start');
        startPauseBtn.classList.add('pause');
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        isRunning = true;
    } else {
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('pause');
        startPauseBtn.classList.add('start');
        clearInterval(interval);
        isRunning = false;
    }
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '00';
    document.getElementById('startPauseBtn').textContent = 'Start';
    document.getElementById('startPauseBtn').classList.remove('pause');
    document.getElementById('startPauseBtn').classList.add('start');
    document.getElementById('laps').innerHTML = '';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / 60000) % 60);
    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('seconds').textContent = formatTime(seconds);
    document.getElementById('milliseconds').textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function lap() {
    if (isRunning) {
        const lapTime = document.getElementById('minutes').textContent + ':' +
                        document.getElementById('seconds').textContent + ':' +
                        document.getElementById('milliseconds').textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        document.getElementById('laps').appendChild(lapItem);
    }
}
