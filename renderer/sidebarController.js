const mainBlock = document.querySelector('.main__body');

let btnRecord = document.querySelector(".btn-record");


// function getMainPosition(element) {
//   element.getBoundingClientRect();
//   let position = {
//     X: element.getBoundingClientRect().x,
//     Y: element.getBoundingClientRect().y,
//   }
//   return position
//  }
// let position = getMainPosition(mainBlock)

btnRecord.addEventListener("click", () => {
  window.Bridge.createRecordModalWindow();
})