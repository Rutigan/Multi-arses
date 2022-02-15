const videoElement = document.querySelector('video');

let startBtn = document.querySelector('.record-start');
let stopBtn = document.querySelector('.record-stop');
let selectVideoBtn = document.getElementById('record-choose');



console.log(selectVideoBtn);

selectVideoBtn.onclick(getVideoSources)

function getVideoSources() {
  window.Bridge.selectVideo();
}
