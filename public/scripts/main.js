
let time = document.querySelector('#current_time'); 

function get_current_time() {
  let current_time = document.querySelector("#current_time").value;
  let time_value = [];
  time_value = current_time.replace(/\D/g, "").split("").map(Number);
  return time_value;
}

function get_minutes(){
    let time_value = get_current_time();
    return time_value.slice(0,-2).join("");
}

function get_seconds(){
    let time_value = get_current_time();
    return time_value.slice(2).join("");
}

function increase_30s(){
    let current_seconds = Number(get_seconds());
    current_seconds = current_seconds + 30;
    return current_seconds;
}

function increase_1min(){
    let current_minutes = Number(get_minutes());
    current_minutes = current_minutes+1;
    return current_minutes;
}

function increase_5min(){
    let current_minutes = Number(get_minutes());
    current_minutes = current_minutes+5;
    return current_minutes;
}

function increase_time(){
    let input = document.querySelector('#current_time').value;
    let minutes = get_minutes();
    let seconds = get_seconds();
    let btn = document.querySelector('.btn_increase_time_to');

    window.addEventListener('click', (event) => {
    const element = event.target;
})

}

function update_time(){
    return time.innerHTML = get_minutes()+":"+get_seconds();
}

function start_timer(){
    let time_value = get_current_time();
    let minute = get_minutes()
}