let timer_interval;

let header_btn = document.querySelectorAll(".header_wrapper button.btn");
let btn_status = document.querySelector("button.btn");

let timeInput = document.querySelector("#current_time");
let timer_startBtn = document.querySelector(".timer_btn_start");
let timer_stopBtn = document.querySelector(".timer_btn_stop");
let timer_restartBtn = document.querySelector(".timer_btn_restart");

let increaseTime = document.querySelector(".increase_time");
let ui_container = document.querySelector(".wrapper");
let count = 360
const btn_timer = ui_container.querySelector(".btn_timer");
const btn_stopwatch = ui_container.querySelector(".btn_stopwatch");

const timer_content = ui_container.querySelector(".timer_content");
const stopwatch_content = ui_container.querySelector(".stopwatch_content");

const circle = document.querySelector(".time");

btn_stopwatch.onclick = () => {
  if (!btn_stopwatch.classList.contains("btn_background")) {
    btn_stopwatch.classList.add("btn_background");
    btn_timer.classList.remove("btn_background");

    stopwatch_content.classList.remove("disable-element");
    timer_content.classList.add("disable-element");

    stopwatch_content.style.display = "flex";

  }

  if(stopwatch_content.classList.contains("stopwatch_content_paused")){

    for(btn_status of header_btn){
    btn_status.classList.remove("working");
    btn_status.classList.add("paused");
   }
  }

  if(stopwatch_content.classList.contains("stopwatch_content_working")){

    for(btn_status of header_btn){
    btn_status.classList.remove("paused");
    btn_status.classList.add("working");
   }
  } 

  if(stopwatch_content.classList.contains("stopwatch_content")){
    for(btn_status of header_btn){
     btn_status.classList.remove("working", "paused");
   }
  }

};

btn_timer.onclick = () => {
  if (!btn_timer.classList.contains("btn_background")) {
    btn_timer.classList.add("btn_background");
    btn_stopwatch.classList.remove("btn_background");

    timer_content.classList.remove("disable-element");
    stopwatch_content.classList.add("disable-element");

    stopwatch_content.style.display = "";
  }

    if(timer_content.classList.contains("timer_content_paused")){

    for(btn_status of header_btn){
    btn_status.classList.remove("working", "finished");
    btn_status.classList.add("paused");
   }
  }

   if(timer_content.classList.contains("timer_content_working")){

    for(btn_status of header_btn){
     btn_status.classList.remove("paused", "finished");
    btn_status.classList.add("working");
   }
  }

  if(timer_content.classList.contains("timer_content_finished")){

    for(btn_status of header_btn){
     btn_status.classList.remove("paused", "working");
    btn_status.classList.add("finished");
   }
  }

  if(timer_content.classList.contains("timer_content")){
    for(btn_status of header_btn){
     btn_status.classList.remove("working", "paused", "finished");
   }
  }
};

function timer_get_current_time() {
  let current_time = timeInput.value;
  let [minutes, seconds] = current_time.split(":").map(Number);

  if (minutes < 0) {
    minutes = 0;
  } else if (isNaN(minutes)) {
    minutes = 0;
  } else if (minutes == undefined) {
    minutes = 0;
  }

  if (seconds >= 60) {
    let amountOfMinutes = Math.floor(seconds / 60);
    let restOfSeconds = seconds - amountOfMinutes * 60;
    seconds = seconds - 60;
    minutes += amountOfMinutes;
    seconds = restOfSeconds;
  } else if (isNaN(seconds)) {
    seconds = 0;
  } else if (seconds == undefined) {
    seconds = 0;
  } else if (seconds < 0) {
    seconds = 0;
  }

  return { minutes, seconds };
}

function timer_update_display(minutes, seconds) {
  let formatted;
  // timeInput.value = formatted;
  if(minutes<10){
  formatted = String(minutes).padStart(1) + ":" + String(seconds).padStart(2, "0");
  timeInput.value = formatted;
  }

  if(minutes==0){
    formatted = String(seconds);
    timeInput.value = formatted; 
  }

}

function get_time_in_seconds () {
  const time_in_seconds = (timer_get_current_time().minutes)*60 + timer_get_current_time().seconds;
 console.log('=',count)
  return count;
}

get_time_in_seconds();

function update_circle_progress(){

 

let minutes = timer_get_current_time().minutes;
let seconds = timer_get_current_time().seconds;

const time_in_seconds = get_time_in_seconds();

let step = 360/time_in_seconds;

if(timer_content.classList.contains("timer_content_working")){
    circle.style.backgroundImage = `conic-gradient(#B1C5FF ${ time_in_seconds}deg, #3A3F50 0deg)`
}
// else if(timer_content.classList.contains("timer_content_paused")){
//   circle.style.backgroundImage = ``
//   circle.style.backgroundImage = `conic-gradient(#F7BD54 ${seconds}deg, #3A3F50 0deg)`
// }

}

update_circle_progress();

function start_timer() {
  clearInterval(timer_interval);

  let { minutes, seconds } = timer_get_current_time();

  timer_interval = setInterval(() => {
    count--
    if (minutes == 0 && seconds == 0) {
      let content_btn = timer_content.querySelectorAll("button.btn");

      timer_content.classList.replace("timer_content_working", "timer_content_finished");
      
      for(btn_status of header_btn){
        btn_status.classList.remove("working", "paused");
        btn_status.classList.add("finished");
        count = 360
      }
      for(btn_status of content_btn){
        btn_status.classList.remove("working", "paused");
        btn_status.classList.add("finished");
      }
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
    update_circle_progress()
    timer_update_display(minutes, seconds);
  }, 1000);
}

function stop_timer() {
  clearInterval(timer_interval);
}


// circle.style.background = `conic-gradient($periwinkle ${progress} deg, $charcoal 0deg)`;

// circle.style.backgroundImage = `conic-gradient(#B1C5FF ${progress}deg, #3A3F50 0deg)`;
// circle.style.backgroundColor = `#B1C5FF`;


timer_startBtn.addEventListener("click", () => {
  const icon = timer_startBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  let content_btn = timer_content.querySelectorAll("button.btn");
  let btn_status = timer_content.querySelector("button.btn");

  
  if (icon.classList.contains("fa-play") && timer_content.classList.contains("timer_content")) {
    timer_content.classList.replace("timer_content", "timer_content_working");
    circle.style.background = "conic-gradient($periwinkle 1deg, $charcoal 0deg);"

    for (btn_status of header_btn) {
      btn_status.classList.add("working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.add("working");
    }
    
    start_timer();
  }
});

timer_stopBtn.addEventListener("click", () => {
  const icon = timer_stopBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  let content_btn = timer_content.querySelectorAll("button.btn");
  let btn_status = timer_content.querySelector("button.btn");

  if (icon.classList.contains("fa-pause") && timer_content.classList.contains("timer_content_working")) {

    icon.classList.replace("fa-pause", "fa-play");
    timer_content.classList.replace("timer_content_working", "timer_content_paused");
    for (btn_status of header_btn) {
      btn_status.classList.replace("working", "paused");
    }
    for (btn_status of content_btn) {
      btn_status.classList.replace("working", "paused");
    }
    stop_timer();
  } else if (icon.classList.contains("fa-play") && timer_content.classList.contains("timer_content_paused")) {
    
    icon.classList.replace("fa-play", "fa-pause");
    timer_content.classList.replace("timer_content_paused", "timer_content_working");

    for (btn_status of header_btn) {
      // btn_status.classList.remove("paused", "finished");
      btn_status.classList.replace("paused", "working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.replace("paused", "working");
    }
    start_timer();
  }
});

timer_restartBtn.addEventListener("click", () => {
  const icon = timer_restartBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  let content_btn = timer_content.querySelectorAll("button.btn");
  let btn_status = timer_content.querySelector("button.btn");

  if (icon.classList.contains("fa-rotate-left") && timer_content.classList.contains("timer_content_working")) {
    timer_content.classList.replace("timer_content_working", "timer_content");
    for (btn_status of header_btn) {
      btn_status.classList.remove("working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.remove("working");
    }
    stop_timer();

  } else if (icon.classList.contains("fa-rotate-left") && timer_content.classList.contains("timer_content_paused")) {
    timer_content.classList.replace("timer_content_paused", "timer_content");
    timer_stopBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
    for (btn_status of header_btn) {
      btn_status.classList.remove("paused");
    }
    for (btn_status of content_btn) {
      btn_status.classList.remove("paused");
    }
    stop_timer();

  } else if (icon.classList.contains("fa-rotate-left") && timer_content.classList.contains("timer_content_finished")) {
    timer_content.classList.replace("timer_content_finished", "timer_content");
    icon.classList.replace("fa-play", "fa-pause");
    timer_update_display(5, 0);
    for (btn_status of header_btn) {
      btn_status.classList.remove("finished");
    }
    for (btn_status of content_btn) {
      btn_status.classList.remove("finished");
    }
    stop_timer();
  }



});

increaseTime.addEventListener("click", (event) => {
  const icon = timer_startBtn.querySelector("i");
  const timer_was_running = icon.classList.contains("fa-pause");

  if (timer_was_running) {
    stop_timer();
  }

  let current = timer_get_current_time();
  let newMinutes = current.minutes;
  let newSeconds = current.seconds;

  if (event.target.classList.contains("btn_increase_time_to")) {
    const clickedButtonId = event.target.id;

    if (clickedButtonId === "btn_increase_time_to_30s") {
      newSeconds += 30;
    } else if (clickedButtonId === "btn_increase_time_to_1min") {
      newMinutes += 1;
    } else if (clickedButtonId === "btn_increase_time_to_5min") {
      newMinutes += 5;
    }
  }

  if (newSeconds >= 60) {
    newMinutes += Math.floor(newSeconds / 60);
    newSeconds = newSeconds % 60;
  }

  timer_update_display(newMinutes, newSeconds);

  if (timer_was_running) {
    start_timer();
  }
});

// Stopwatch

let startTime = document.querySelector("#stopwatch");

let stopwatch_interval;

function stopwatch_get_current_time() {
  let current_time = startTime.innerHTML;
  let [hours, minutes, seconds, miliseconds] = current_time.split(".").map(Number);

  if (minutes >= 60) {
    hours++;
  }

  if (seconds >= 60) {
    minutes++;
  }

  if (miliseconds >= 1000) {
    seconds++;
  }

  return { hours, minutes, seconds, miliseconds };
}

function stopwatch_update_display(hours, minutes, seconds, miliseconds) {
  let formatted = String(hours).padStart(2, 0) + "." + String(minutes).padStart(2, "0") + "." + String(seconds).padStart(2, "0") + "." + String(miliseconds).padStart(2, "0"); ;
  startTime.innerHTML = formatted;

  // if(hours>=1){
  //   formatted = + String(hours) + "." + String(minutes).padStart(2, "0") + "." + String(seconds).padStart(2, "0") + "." + String(miliseconds).padStart(2, "0");
  //   startTime.innerHTML = formatted;
  // }

  // if(minutes<60 && hours<1){
  //   formatted = String(minutes) + "." + String(seconds).padStart(2, "0") + "." + String(miliseconds).padStart(2, "0");
  //   startTime.innerHTML = formatted;
  // }

  // if(seconds<60 && minutes<1){
  //   formatted = String(seconds) + "." + String(miliseconds).padStart(2, "0");
  //   startTime.innerHTML = formatted;
  // }
}

function start_stopwatch() {
  clearInterval(stopwatch_interval);

  let { hours, minutes, seconds, miliseconds } = stopwatch_get_current_time();

  stopwatch_interval = setInterval(() => {
    miliseconds++;

    if (miliseconds >= 100) {
      miliseconds = 0;
      seconds++;
    }

    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    stopwatch_update_display(hours, minutes, seconds, miliseconds);
  }, 10);
}

function stop_stopwatch() {
  clearInterval(stopwatch_interval);
}

let stopwatch_startBtn = document.querySelector(".stopwatch_btn_start");
let stopwatch_stopBtn = document.querySelector(".stopwatch_btn_stop");
let stopwatch_restartBtn = document.querySelector(".stopwatch_btn_restart");

stopwatch_startBtn.addEventListener("click", () => {
  const icon = stopwatch_startBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  let content_btn = stopwatch_content.querySelectorAll("button.btn");
  let btn_status = stopwatch_content.querySelector("button.btn");

  if (icon.classList.contains("fa-play") && stopwatch_content.classList.contains("stopwatch_content")) {
    stopwatch_content.classList.replace("stopwatch_content", "stopwatch_content_working");

    for (btn_status of header_btn) {
      btn_status.classList.add("working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.add("working");
    }

    start_stopwatch();
  }
});

stopwatch_stopBtn.addEventListener("click", () => {
  const icon = stopwatch_stopBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  let content_btn = stopwatch_content.querySelectorAll("button.btn");
  let btn_status = stopwatch_content.querySelector("button.btn");

  if (icon.classList.contains("fa-pause") && stopwatch_content.classList.contains("stopwatch_content_working") ) {
    icon.classList.replace("fa-pause", "fa-play");
    stopwatch_content.classList.replace("stopwatch_content_working", "stopwatch_content_paused");
    for (btn_status of header_btn) {
      btn_status.classList.replace("working", "paused");
    }
    for (btn_status of content_btn) {
      btn_status.classList.replace("working", "paused");
    }
    stop_stopwatch();

  } else if (icon.classList.contains("fa-play") && stopwatch_content.classList.contains("stopwatch_content_paused") ) {
    icon.classList.replace("fa-play", "fa-pause");
    stopwatch_content.classList.replace("stopwatch_content_paused", "stopwatch_content_working");
    for (btn_status of header_btn) {
      btn_status.classList.replace("paused", "working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.replace("paused", "working");
    }
    start_stopwatch();
  }
});

stopwatch_restartBtn.addEventListener("click", () => {

  const icon = stopwatch_restartBtn.querySelector("i");
  let header_btn = document.querySelectorAll(".header_wrapper button.btn");
  content_btn = stopwatch_content.querySelectorAll("button.btn");
  btn_status = stopwatch_content.querySelector("button.btn");

  if (icon.classList.contains("fa-rotate-left") && stopwatch_content.classList.contains("stopwatch_content_working") ) {
    stopwatch_content.classList.replace(
      "stopwatch_content_working",
      "stopwatch_content"
    );
    icon.classList.replace("fa-pause", "fa-play");
    for (btn_status of header_btn) {
      btn_status.classList.remove("working");
    }
    for (btn_status of content_btn) {
      btn_status.classList.remove("working");
    }
    
    stop_stopwatch();
  } else if (icon.classList.contains("fa-rotate-left") && stopwatch_content.classList.contains("stopwatch_content_paused") ) {
    stopwatch_content.classList.replace(
      "stopwatch_content_paused",
      "stopwatch_content"
    );
    icon.classList.replace("fa-pause", "fa-play");
    stopwatch_stopBtn
      .querySelector("i")
      .classList.replace("fa-play", "fa-pause");
    for (btn_status of header_btn) {
      btn_status.classList.remove("paused");
    }
    for (btn_status of content_btn) {
      btn_status.classList.remove("paused");
    }

    stop_stopwatch();
  }

});

