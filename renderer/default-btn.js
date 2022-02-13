let btnDefaultRoll = document.querySelector('#btn-default-roll');
let btnDefaultResize = document.querySelector('#btn-default-open');
let btnDefaultClose = document.querySelector('#btn-default-close');

btnDefaultRoll.addEventListener('click', (e) => {
  window.Bridge.rollDownModal();
});

btnDefaultResize.addEventListener('click', () => {
  window.Bridge.resizeModal()
});


btnDefaultClose.addEventListener('click', () => {
  window.Bridge.ModalClose()
});