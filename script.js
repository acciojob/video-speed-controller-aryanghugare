// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
		
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');


const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('.controls input');

const skipButtons = player.querySelectorAll('[data-skip]');


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


// ---------------- Skip ----------------

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// ---------------- Volume & Speed ----------------

function handleRangeUpdate() {
  video[this.name] = this.value;
}


// ---------------- Progress Bar ----------------

function handleProgress() {
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

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


// Skip
skipButtons.forEach(btn =>
  btn.addEventListener('click', skip)
);


// Volume & Speed
ranges.forEach(range =>
  range.addEventListener('change', handleRangeUpdate)
);

ranges.forEach(range =>
  range.addEventListener('mousemove', handleRangeUpdate)
);


// Progress
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);
