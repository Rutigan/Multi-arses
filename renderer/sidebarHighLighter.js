let btnImage = document.querySelectorAll('#btn-image');
let btnBodyImage = document.querySelectorAll('#btn-options');
let btnImagePath = document.querySelectorAll('path');
let btnOptions = {
  desktop: document.querySelector('#btn[active="true"]'),
  record: document.querySelector('#btn-options-record'),
  doc: document.querySelector('#btn-options-doc'),
  color: document.querySelector('#btn-options-color'),
  option: document.querySelector('#btn-options-option')
}
const btnTestComminication = document.querySelector('#btn-test');

btnBodyImage.forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-options__active')) {
      let currentNodes = [...e.target.childNodes];
      e.target.classList.remove('btn-options__active');
      let path = currentNodes[1];
      path.classList.remove('btn-options__active__path');
    } else {
      // метод closest не находит дочерние елементы из-за чего приходится использовать nodeList 
      // console.log(e.target.childNodes);
      let currentNodes = [...e.target.childNodes];
      e.target.classList.add('btn-options__active');
      let path = currentNodes[1];
      path.classList.add('btn-options__active__path');
    }
  })
})

// да можно было использвать toggle но я забыл про него
btnImage.forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-options__active')) {
      let currentNodes = [...e.target.childNodes];
      e.target.classList.remove('btn-options__active');
      let path = currentNodes[1];
      path.classList.remove('btn-options__active__path');
    } else {
      // метод closest не находит дочерние елементы из-за чего приходится использовать nodeList 
      // console.log(e.target.childNodes);
      let currentNodes = [...e.target.childNodes];
      e.target.classList.add('btn-options__active');
      let path = currentNodes[1];
      path.classList.add('btn-options__active__path');
    }
  })
});

btnImagePath.forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-options__active__path')) {
      e.target.classList.remove('btn-options__active__path');
      let svg = e.target.closest('.ionicon');
      svg.classList.remove('btn-options__active');
    } else {
      e.target.classList.add('btn-options__active__path');
      let svg = e.target.closest('.ionicon');
      svg.classList.add('btn-options__active');
    }
  })
});



// * Тестирование коммуникаци
// btnTestComminication.addEventListener('click', (e) => {
//   console.log("Render > Main");
//   let lead = e.target.classList;
//   window.Bridge.sendSubmit(lead);
// })





