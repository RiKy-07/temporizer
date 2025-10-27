let timeInput = document.querySelector("#current_time");
let startBtn = document.querySelector(".btn_start");
let increaseTime = document.querySelector(".increase_time");

let interval;
let minutes;
let seconds;


function get_current_time() {
  let current_time = timeInput.value;
  let [minutes, seconds] = current_time.split(":").map(Number);

  if (minutes < 0) {
    minutes = 0;
  }else if (isNaN(minutes)){
    minutes = 0;
  }else if (minutes == undefined){
    minutes = 0;
  }

  if (seconds >= 60) {
    let amountOfMinutes = Math.floor(seconds / 60);
    let restOfSeconds = seconds - amountOfMinutes * 60;
    seconds = seconds - 59;
    minutes += amountOfMinutes;
    seconds = restOfSeconds + 1;
    }else if (isNaN(seconds)){
        seconds = 0;
    }else if (seconds == undefined){
        seconds = 0;
    }else if (seconds <0){
        seconds = 0;
  }

  return { minutes, seconds };
}

function update_display(minutes, seconds) {
  let formatted = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  timeInput.value = formatted;
}

function prevent_negatives() {}

function start_timer() {
  clearInterval(interval);

  let { minutes, seconds } = get_current_time();

  interval = setInterval(() => {
    if (minutes == 0 && seconds == 0) {
      stop_timer();
    } else {
      seconds--;

      if (seconds >= 60) {
        seconds = 0;
        minutes--;
      } else if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
    }
    update_display(minutes, seconds);
  }, 1000);
}

function stop_timer() {
  clearInterval(interval);
}

startBtn.addEventListener("click", () => {
  const icon = startBtn.querySelector("i");

  if (icon.classList.contains("fa-play")) {
    icon.classList.replace("fa-play", "fa-pause");
    start_timer();
  } else {
    icon.classList.replace("fa-pause", "fa-play");
    stop_timer();
  }
});

increaseTime.addEventListener("click", () => {
    const btn = increaseTime.querySelector(".btn_increase_time_to")

    console.log(btn.id);
    if (btn.id.includes("btn_increase_time_to_30s")){
        seconds = seconds + 30;
        update_display(minutes, seconds = seconds + 30);

    }else if(btn.id.includes("btn_increase_time_to_1min")){
        minutes = minutes + 1;
        update_display(minutes = minutes + 1, seconds);

    }else if(btn.id.includes("btn_increase_time_to_1min")){
        minutes = minutes + 5;
    }
})



// function get_current_time() {
//   let current_time = document.querySelector("#current_time");
//   let time_value = [];
//   time_value = current_time.replace(/\D/g, "").split("").map(Number);
//   return time_value;
// }

// function get_minutes(){
//     let time_value = get_current_time();
//     return time_value.slice(0,-2).join("");
// }

// function get_seconds(){
//     let time_value = get_current_time();
//     return time_value.slice(2).join("");
// }

// function increase_30s(){
//     let current_seconds = Number(get_seconds());
//     current_seconds = current_seconds + 30;
//     return current_seconds;
// }

// function increase_1min(){
//     let current_minutes = Number(get_minutes());
//     current_minutes = current_minutes+1;
//     return current_minutes;
// }

// function increase_5min(){
//     let current_minutes = Number(get_minutes());
//     current_minutes = current_minutes+5;
//     return current_minutes;
// }

// function increase_time(){
//     let input = document.querySelector('#current_time').value;
//     let minutes = get_minutes();
//     let seconds = get_seconds();
//     let btn = document.querySelector('.btn_increase_time_to');

//     window.addEventListener('click', (event) => {
//     const element = event.target;
// })

// }

// function update_time(){
//     return time.innerHTML = get_minutes()+":"+get_seconds();
// }

// function start_timer(){
//     let time_value = get_current_time();
//     let minute = get_minutes();
//     let second = get_seconds();
//     let current_time = document.querySelector('#current_time');

//     let start = document.querySelector('.btn.btn_start');
//     let interval;
//     start.addEventListener('click',()=>{
//     interval = setInterval(watch, 10)
//     current_time.id = 'current_time'
// })
// }

// function watch() {
//     let minute = get_minutes();
//     let second = get_seconds();
//     let current_time = document.querySelector('#current_time');

//     second++
//     if(second==60){
//         minute++
//         second=00;
//     }
//    current_time.innerHTML=twod(minute)+':'+twod(second)

// }

// function twod(digit){
//     if(digit < 10){
//         return ('0' +digit)
//     }
//     else{
//         return digit
//     }
// }
