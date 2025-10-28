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
    seconds = seconds - 60;
    minutes += amountOfMinutes;
    seconds = restOfSeconds;
    }else if (isNaN(seconds)){
        seconds = 0;
    }else if (seconds == undefined){
        seconds = 0;
    }else if (seconds <0){
        seconds = 0;
  }

  return { minutes, seconds};
}

function update_display(minutes, seconds) {
  let formatted = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  timeInput.value = formatted;
 
}


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

increaseTime.addEventListener("click", (event) => {

    const icon = startBtn.querySelector("i");
    const timer_was_running = icon.classList.contains("fa-pause");

    if (timer_was_running){
        stop_timer()
    }

    let current = get_current_time();
    let newMinutes = current.minutes;
    let newSeconds = current.seconds;

     if (event.target.classList.contains('btn_increase_time_to')){
        const clickedButtonId = event.target.id;
        console.log(`Button with ID: ${clickedButtonId} was clicked.`);

        if (clickedButtonId === 'btn_increase_time_to_30s') {
            newSeconds += 30;
        } else if (clickedButtonId === 'btn_increase_time_to_1min') {
            newMinutes += 1;
        } else if (clickedButtonId === 'btn_increase_time_to_5min') {
            newMinutes += 5;
        }
    }

    if(newSeconds >= 60){
        newMinutes += Math.floor(newSeconds/60);
        newSeconds = newSeconds%60;
    }

    update_display(newMinutes, newSeconds);

    if (timer_was_running){
        start_timer();
    }
});
