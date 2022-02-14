let btnDefaultRoll = document.querySelector('#btn-default-roll');
let btnDefaultResize = document.querySelector('#btn-default-open');
let btnDefaultClose = document.querySelector('#btn-default-close');


const currentModalWindow = [
  "infoModalWindow",
  "recordWindow",
  "colorWindow",
  "docWindow",
  "configWindow"
];

btnDefaultRoll.addEventListener('click', () => {
  window.Bridge.rollDownApp();
});

btnDefaultResize.addEventListener('click', () => {
  window.Bridge.resize()
});


btnDefaultClose.addEventListener('click', () => {
  window.Bridge.appClose()
});

