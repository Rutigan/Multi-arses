const videoElement = document.querySelector('video');

let startBtn = document.querySelector('.record-start');
let stopBtn = document.querySelector('.record-stop');
let selectVideoBtn = document.getElementById('record-choose');
let btnRoll = document.querySelector('#btn-modal-record-roll');
let btnResize = document.querySelector('#btn-modal-record-open');
let btnClose = document.querySelector('#btn-modal-record-close');

btnRoll.addEventListener('click', () =>{
  window.Bridge.recordRollDown()
});
btnResize.addEventListener('click', () =>{
  window.Bridge.recordResize()
});
btnClose.addEventListener('click', () =>{
  window.Bridge.recordClose()
});

selectVideoBtn.addEventListener('click', () => {
  window.Bridge.selectVideo();
});

stopBtn.addEventListener('click', () => {
  window.Bridge.stopRecording()
})


window.Bridge.stream((event, incounter)=>{
  console.log(incounter);
  videoElement.srcObject = stream;
  videoElement.play();
});

