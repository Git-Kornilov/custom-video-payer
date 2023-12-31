"use strict";
const player = document.querySelector(".player");
const video = document.querySelector("video");

const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");

const playBtn = document.getElementById("play-btn");

const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");

const fullscreenBtn = document.querySelector(".fullscreen");

const speed = document.querySelector(".player-speed");

let lastVolume = 1;
let fullscreen = false;

// Play & Pause ----------------------------------- //
const showPauseIcon = () => {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    showPauseIcon();
  } else {
    video.pause();
    showPlayIcon();
  }
};

// On video end - show play btn
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //
const displayTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
};

const setProgress = (e) => {
  const newTime = e.offsetX / progressRange.offsetWidth;

  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //
const changeVolumeIcon = (volume) => {
  volumeIcon.className = "";

  if (volume > 0.7) volumeIcon.classList.add("fas", "fa-volume-up");
  if (volume < 0.7 && volume > 0)
    volumeIcon.classList.add("fas", "fa-volume-down");
  if (volume === 0) volumeIcon.classList.add("fas", "fa-volume-off");

  volumeIcon.setAttribute("title", "Mute");
};

const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;

  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;

  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  changeVolumeIcon(volume);

  lastVolume = volume;
};

const toggleMute = () => {
  volumeIcon.className = "";

  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;

    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon(lastVolume);
  }
};

// Change Playback Speed -------------------- //
const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //
const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add("video-fullscreen");
};

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }

  video.classList.remove("video-fullscreen");
};

const toggleFullscreen = () => {
  fullscreen ? closeFullscreen() : openFullscreen(player);

  fullscreen = !fullscreen;
};

// addEventListener

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProgress);

volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

speed.addEventListener("change", changeSpeed);

fullscreenBtn.addEventListener("click", toggleFullscreen);
