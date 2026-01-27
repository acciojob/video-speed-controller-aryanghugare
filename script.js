const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('input');
const skipButtons = player.querySelectorAll('[data-skip]');


// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Update Play Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// Handle Volume & Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}


// Progress Bar
function handleProgress() {
  const percent =
    (video.currentTime / video.duration) * 100;

  progressBar.style.width = `${percent}%`;
}


// Click Progress Bar
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}



// Events
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(btn =>
  btn.addEventListener('click', skip)
);

ranges.forEach(range =>
  range.addEventListener('change', handleRangeUpdate)
);

ranges.forEach(range =>
  range.addEventListener('mousemove', handleRangeUpdate)
);

progress.addEventListener('click', scrub);
