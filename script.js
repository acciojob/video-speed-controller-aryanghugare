// Get video
const video = document.querySelector('.flex');
const wrapper = document.querySelector('.wrapper');

// Remove default controls
video.controls = false;


// ---------- Create Controls Container ----------
const controls = document.createElement('div');
controls.className = 'controls';


// ---------- Play / Pause Button ----------
const toggle = document.createElement('button');
toggle.className = 'player__button';
toggle.textContent = '►';


// ---------- Progress Bar ----------
const progress = document.createElement('div');
progress.className = 'progress';

const progressFilled = document.createElement('div');
progressFilled.className = 'progress__filled';

progress.appendChild(progressFilled);


// ---------- Volume Slider ----------
const volume = document.createElement('input');
volume.type = 'range';
volume.min = 0;
volume.max = 1;
volume.step = 0.05;
volume.value = 1;


// ---------- Speed Slider ----------
const speed = document.createElement('input');
speed.type = 'range';
speed.min = 0.5;
speed.max = 2;
speed.step = 0.1;
speed.value = 1;


// ---------- Skip Buttons ----------
const back = document.createElement('button');
back.textContent = '« 10s';
back.dataset.skip = -10;

const forward = document.createElement('button');
forward.textContent = '25s »';
forward.dataset.skip = 25;


// ---------- Append Controls ----------
controls.append(
  toggle,
  back,
  forward,
  progress,
  volume,
  speed
);

wrapper.appendChild(controls);



// ---------- Functions ----------

// Play / Pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}


// Update Button Icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// Volume & Speed
function handleRange() {
  if (this === volume) {
    video.volume = this.value;
  }

  if (this === speed) {
    video.playbackRate = this.value;
  }
}


// Update Progress
function updateProgress() {
  const percent =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.width = percent + '%';
}


// Click Progress
function scrub(e) {
  const time =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = time;
}



// ---------- Events ----------

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

back.addEventListener('click', skip);
forward.addEventListener('click', skip);

volume.addEventListener('input', handleRange);
speed.addEventListener('input', handleRange);

video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', scrub);
