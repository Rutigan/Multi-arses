// let btnDefaultRollMODAL = document.querySelector("#btn-modal-record-roll");
const btnDefaultRollMODAL = document.querySelector('#btn-modal-record-roll');


const currentModalWindow = [
  "infoModalWindow",
  "recordWindow",
  "colorWindow",
  "docWindow",
  "configWindow"
];



btnDefaultRollMODAL.addEventListener('click', () => {
  let currentWindow = currentModalWindow[1];
  console.log(currentWindow);
  console.log(btnDefaultRollMODAL);
  window.Bridge.rollDownModalRecord(currentWindow);
});

// btnDefaultResize.addEventListener('click', (currentModalWindow) => {
//   window.Bridge.resizeModalRecord()
// });


// btnDefaultClose.addEventListener('click', (currentModalWindow) => {
//   window.Bridge.CloseModalRecord()
// });