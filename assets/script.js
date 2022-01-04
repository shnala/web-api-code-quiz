//Clicking start initiates a timer, hides the start button, and launches question queue.
//Question is multiple choice and glows on hover.
//Clicking an answer will prompt the next question to appear.
    //Answer correctness will briefly display under question box.
//The right/wrong appears under a line <br>
//If the question is answered incorrectly, time is subtracted from the clock.
//At the end, the time left becomes the score.
//At the end, a form appears where the user can submit their username to the highscores.

//Timer variables
var secondsLeft = 500;
var dynamicTimer = document.getElementById("timer");

//Test initiation variables
var startButton = document.getElementById("start");
var quizIntro = document.getElementById("quizIntro")

//Question variables
var questionHead = document.body.children[1].children[0];
var questionBody = document.getElementById("questionBody");
var answerGrade = document.getElementById("answerGrade");
var wrongTally = 0;


//Establishing timer
const setTime = () => {
    var timerInterval = setInterval(() => {
        secondsLeft--;
        dynamicTimer.textContent = secondsLeft + " seconds left";
        
        if(secondsLeft === 1) {
            dynamicTimer.textContent = secondsLeft + " second left";
        }
        else if(secondsLeft === 0 || secondsLeft <0) {
            clearInterval(timerInterval);
            dynamicTimer.textContent = "";
            gameEnd();
        }
    }, 1000);
}


//Subtract from timer when wrong
//TODO: Needs debugging; subtractions from secondsLeft will stack after first wrong answer. e.g., First wrong answer will subtract 50 from secondsLeft, but the second
//wrong answer will subtract 100, and so on. This is presumably because the function is being called more than it needs to be, but I don't know how to prevent this.
const right = () => {
    answerGrade.style.display = "block";
    answerGrade.children[1].textContent = "Correct!"
}

const wrong = () => {
    answerGrade.style.display = "block";
    answerGrade.children[1].textContent = "Incorrect!"
    secondsLeft-=50;
    wrongTally++;
}


//Writing questions
//TODO: Needs debugging; after first question is answered, regardless of correctness, the wrong function is called on every question thereafter.
//This is also bugging the score, causing deductions to be made even if the question is answered correctly.

const questionOne = () => {    
    questionHead.textContent = "Which of the following best describes a Web API?"
    questionBody.children[0].textContent = "(Correct) Web APIs are built into your web browser and contain methods that allow us to manipulate a web page via JavaScript."
    questionBody.children[1].textContent = "Web APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the Web."
    questionBody.children[2].textContent = "Web APIs are low level code (say C or C++) that directly control the computer's GPU or other graphics functions."
    questionBody.children[3].textContent = "Web APIs are a part of the JavaScript language itself and are built into your browser."
   
    questionBody.addEventListener("click", function(event) {
        var element = event.target;
        
        if (element === questionBody.children[0]) {
            right();
            questionTwo();
        } else {
            wrong();
            questionTwo();
        }
    });
}

const questionTwo = () => {
    questionHead.textContent = "Which of the following would change an element's background to red?"
    questionBody.children[0].textContent = "element.setAttribute('style', 'red')"
    questionBody.children[1].textContent = "element.setAttribute('red')"
    questionBody.children[2].textContent = "element.setAttribute('class', 'background:red')"
    questionBody.children[3].textContent = "(Correct) element.setAttribute('style', 'background-color:red')"

    questionBody.addEventListener("click", function(event) {
        var element = event.target;
        
        if (element === questionBody.children[3]) {
            right();
            questionThree();
        } else {
            wrong();
            questionThree();
        }
    });
}

const questionThree = () => {
    questionHead.textContent = "Your colleague notices that when she clicks on a <p> element on her page, handlers run on <p> and on <p>'s parent elements as well. She asks you to help her debug. Which of the following is most likely?"
    questionBody.children[0].textContent = "She forgot to add event.preventDefault() in her script.js file."
    questionBody.children[1].textContent = "The parent node of <p> is triggering a bubbling event that is bubbling down towards <p> when it is clicked."
    questionBody.children[2].textContent = "She added an event listener in the wrong place in her html file."
    questionBody.children[3].textContent = "(Correct)	A bubbling event is occurring that starts with the target element, <p>, and is then running handlers on <p>'s parent and other ancestors."

    questionBody.addEventListener("click", function(event) {
        var element = event.target;
        
        if (element === questionBody.children[3]) {
            right();
            questionFour();
        } else {
            wrong();
            questionFour();
        }
    });
}

const questionFour = () => {
    questionHead.textContent = "Which statement best describes what is happening to data when it is persisted to local storage?"
    questionBody.children[0].textContent = "The data is stored in the database in the backend."
    questionBody.children[1].textContent = "The data is stored under the Applications tab in Chrome Dev Tools."
    questionBody.children[2].textContent = "The data is stored in the window called localStorage."
    questionBody.children[3].textContent = "(Correct)	The data is stored in the client or browser."

    questionBody.addEventListener("click", function(event) {
        var element = event.target;
        
        if (element === questionBody.children[3]) {
            right();
            // questionFive();
            gameEnd();
        } else {
            wrong();
            // questionFive();
            gameEnd();
        }
    });
}

//Function for ending game; tallys score and saves it to localstorage
//TODO: Needs debugging; submitScore button runs even when it is not clicked.

function gameEnd() {
    var finalScore = secondsLeft;
    questionHead.textContent = "Your score was " + finalScore + ". " + "You answered " + wrongTally + " questions wrong.";
    questionBody.textContent = "This is a test."
    answerGrade.style.display = "none";

    localStorage.setItem("finalScore", JSON.stringify(finalScore));
    var submitScore = document.createElement("button")
    submitScore.textContent = "Submit Score"
    document.querySelector("#submitButton").appendChild(submitScore);
    submitScore.addEventListener("click", console.log("This works"))
}

//Function for rendering final score and creating a list of all scores.

function showScores() {
    
}


startButton.addEventListener("click", function() {
    startButton.setAttribute("style", "display:none");
    quizIntro.setAttribute("style", "display:none");
    questionBody.style.display = "block";
    questionOne ();
});