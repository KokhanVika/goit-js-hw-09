function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const refs = {
    body: document.querySelector("body"),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
}
let colorID;

refs.start.addEventListener('click', onStartClick)
refs.stop.addEventListener('click', onStopClick)

function onStartClick(evt) {
    console.log('start')
    refs.start.disabled = 'disabled';
    refs.stop.disabled = '';
    colorID = setInterval (changeBGC, 1000)
}
function changeBGC() {
 refs.body.style.backgroundColor = `${getRandomHexColor()}`
}


function onStopClick(evt) {
    console.log('stop')
    refs.start.disabled = '';
    refs.stop.disabled = 'disabled';
    clearInterval(colorID)
}



