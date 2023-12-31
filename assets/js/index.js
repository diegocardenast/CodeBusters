// INDEX PAGE

const audio = document.querySelector('audio');
const volumeButton = document.getElementById('volumeButton');
const volumeIcon = document.getElementById('volumeIcon');
let playMusic = false;
audio.volume = 0.05;
window.onload = function() {
  audio.play();
}

// Mute and mute index page
function toggleAudio() {
  if (audio.paused) {
      audio.play();
      volumeIcon.classList.remove('fa-volume-mute');
      volumeIcon.classList.add('fa-volume-high');
  } else {
      audio.pause();
      volumeIcon.classList.remove('fa-volume-high');
      volumeIcon.classList.add('fa-volume-mute');
  }
}

try {
  volumeButton.addEventListener('click', toggleAudio);
} catch (error) {
  console.log("Volume button not found")
  console.log(playMusic)
}


// Variables for modal box
const closeInstructions = document.getElementById('close-instructions');
const rulesModal = document.getElementById('rules');

// Close instructions when clicking on button
closeInstructions.onclick = function () {
  rulesModal.style.display = "none";
};