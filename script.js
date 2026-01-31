const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('.controls input');
const skipButtons = player.querySelectorAll('[data-skip]');

let mouseDown = false;


// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Update Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// Skip
function skip() {
  video.currentTime += Number(this.dataset.skip);
}


// Volume & Speed
function handleRange() {
  video[this.name] = this.value;
}


// Progress
function handleProgress() {

  if (!video.duration) return;

  const percent =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.width = percent + '%';
}


// Scrub
function scrub(e) {

  const time =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = time;
}



// Events

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('loadedmetadata', updateButton);


skipButtons.forEach(btn => {
  btn.addEventListener('click', skip);
});


ranges.forEach(range => {
  range.addEventListener('input', handleRange);
});


video.addEventListener('timeupdate', handleProgress);


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
