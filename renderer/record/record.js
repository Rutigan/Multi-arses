const videoElement = document.querySelector('video');

let startBtn = document.querySelector('.record-start');
let stopBtn = document.querySelector('.record-stop');
let selectVideoBtn = document.getElementById('record-choose');
let btnRoll = document.querySelector('#btn-modal-record-roll');
let btnResize = document.querySelector('#btn-modal-record-open');
let btnClose = document.querySelector('#btn-modal-record-close');
let processIndicator = document.querySelector('#process');
let infoDesktop = document.querySelector('#infoDesktop');
let indicator = document.querySelector('#indicator');
let proc = false;
let controllers = document.querySelector('.main__controls');

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

console.log(Buffer);

window.Bridge.stream((event, stream)=>{
  const source = stream;
  infoDesktop.innerHTML = source.name;
  async function selectSource(source) {
    let mediaRecorder;
    const recorderChunks = [];
    const constrains = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id,
        }
      }
    };
    processIndicator.innerHTML = 'Процесс...';
    indicator.classList.add('.indicator');
    controllers.style.opacity = 0;
    const stream = await navigator.mediaDevices.getUserMedia(constrains); 
    videoElement.srcObject = stream;
    videoElement.play();
    const options = { mainType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvaliable;
    mediaRecorder.onstop = handleStop;
    function handleDataAvaliable(e) {
      recorderChunks.push(e.data);
    };
    async function handleStop(e) {
      const blob = new Blob(recorderChunks, {
        type: 'video/webm; codecs=vp9'
      });
      
      const buffer = Buffer.from(await blob.arrayBuffer());
      
      await window.Bridge.saveVideo(buffer);
    }
    

    stopBtn.onclick = e => {
      mediaRecorder.stop();
    };
    startBtn.onclick = e => {
      mediaRecorder.start();
    };
  }
  selectSource(source);

  
  return proc = false
});





if (proc) {
  processIndicator.innerHTML = 'Процесс...';
  indicator.classList.add('.indicator');
  controllers.style.opacity = 0;
} else {
  processIndicator.innerHTML = '...';
  indicator.classList.remove('.indicator');
  controllers.style.opecity = 1;
}




