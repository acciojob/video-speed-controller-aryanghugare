// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('.controls input');

const rewindBtn = player.querySelector('.rewind');
const skipBtn = player.querySelector('.skip');

let mouseDown = false;


// ---------------- Play / Pause ----------------

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Update Button Icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// ---------------- Rewind / Skip ----------------

function rewind() {

  let newTime = video.currentTime - 10;

  if (newTime < 0) {
    newTime = 0;
  }

  video.currentTime = newTime;
}


function skip() {

  let newTime = video.currentTime + 25;

  if (newTime > video.duration) {
    newTime = video.duration;
  }

  video.currentTime = newTime;
}


// ---------------- Volume & Speed ----------------

function handleRange() {
  video[this.name] = this.value;
}


// ---------------- Progress Bar ----------------

function handleProgress() {

  if (!video.duration) return;

  const percent =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.width = percent + '%';
}


// ---------------- Scrub ----------------

function scrub(e) {

  const time =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = time;
}



// ---------------- Events ----------------

// Play / Pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);


// Button Icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('loadedmetadata', updateButton);


// Rewind / Skip
rewindBtn.addEventListener('click', rewind);
skipBtn.addEventListener('click', skip);


// Volume & Speed
ranges.forEach(range => {
  range.addEventListener('input', handleRange);
});


// Progress
video.addEventListener('timeupdate', handleProgress);


// Scrubbing
progress.addEventListener('click', scrub);

progress.addEventListener('mousedown', () => {
  mouseDown = true;
});

progress.addEventListener('mouseup', () => {
  mouseDown = false;
});

progress.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    scrub(e);
  }
});
