// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('.controls input');
const skipButtons = player.querySelectorAll('[data-skip]');

let isMouseDown = false;


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
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}


// ---------------- Skip ----------------

function skip() {
  video.currentTime += Number(this.dataset.skip);
}


// ---------------- Volume & Speed ----------------

function handleRangeUpdate() {
  video[this.name] = this.value;
}


// ---------------- Progress Bar ----------------

function handleProgress() {

  if (!video.duration) return;

  const percent =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.width = percent + '%';
}


// Scrub Video
function scrub(e) {

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}



// ---------------- Events ----------------

// Play / Pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);


// Button Update
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('loadedmetadata', updateButton);


// Skip
skipButtons.forEach(btn => {
  btn.addEventListener('click', skip);
});


// Volume & Speed
ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
});


// Progress
video.addEventListener('timeupdate', handleProgress);


// Scrubbing (Click + Drag)
progress.addEventListener('click', scrub);

progress.addEventListener('mousedown', () => {
  isMouseDown = true;
});

progress.addEventListener('mouseup', () => {
  isMouseDown = false;
});

progress.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    scrub(e);
  }
});
