import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
	start: document.querySelector('button'),
	inputCalendar: document.querySelector('input'),
	days: document.querySelector('span[data-days]'),
	hours: document.querySelector('span[data-hours]'),
	minutes: document.querySelector('span[data-minutes]'),
	seconds: document.querySelector('span[data-seconds]'),
}
	

let fp;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0]>options.defaultDate) {
            refs.start.disabled = '';
            fp = selectedDates[0].getTime();      
        } else {
            alert('Please choose a date in the future');
        }
  },
};

flatpickr("#datetime-picker", options);

refs.start.addEventListener('click', onStartClick)

function onStartClick() {
    timer.start(fp)
    refs.start.disabled = 'disabled';
}

class Timer {
    constructor({onTick}) {
        this.isActive = false;
        this.intervalID = null;
        this.onTick = onTick;
    }
    
    start(startTime) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;


        this.intervalID = setInterval(() => {
        const currentTime = Date.now()
        const deltaTime = startTime - currentTime
        const timerTime = this.convertMs(deltaTime)
        console.log(timerTime)
        if (deltaTime<1000) {
            clearInterval(this.intervalID);
            this.isActive = false;
        } 
        this.onTick(timerTime)    
        }, 1000)
    }
    
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    };


    convertMs(ms) {
        const second = 1000;
        const minute = second * 60; 
        const hour = minute * 60;
        const day = hour * 24;
  
  
        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
        return { days, hours, minutes, seconds };
    }
}
  
const timer = new Timer({
    onTick: updateClock
});
  

function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;   
}
