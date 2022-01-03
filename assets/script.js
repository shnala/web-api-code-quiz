console.log("JS is linked.")
//Timer variables
var secondsLeft = 60;
var dynamicTimer = document.getElementById("timer");

//Test initiation variables
var startButton = document.getElementById("start");

const setTime = () => {
    var timerInterval = setInterval(() => {
        secondsLeft--;
        dynamicTimer.textContent = secondsLeft + " seconds";
        
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

timer.addEventListener("click", function() {
    
});