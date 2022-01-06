//Clicking start initiates a timer, hides the start button, and launches question queue.
//Question is multiple choice and glows on hover.
//Clicking an answer will prompt the next question to appear.
    //Answer correctness will briefly display under question box.
//The right/wrong appears under a line <br>
//If the question is answered incorrectly, time is subtracted from the clock.
//At the end, the time left becomes the score.
//At the end, a form appears where the user can submit their username to the highscores.

//Timer variables
var secondsLeft = 1000;
var dynamicTimer = document.getElementById("timer");
var newNameScore = [];

//Test initiation variables
var startButton = document.getElementById("start");
var quizIntro = document.getElementById("quizIntro")

//Question variables
var questionHead = document.body.children[1].children[0];
var questionBody = document.getElementById("questionBody");
var answerGrade = document.getElementById("answerGrade");
var wrongTally = 0;

//Finishing variables
var inputField = document.querySelector('#userInitials');
var highscores = document.querySelector('#highscores');
var highscoresLink = document.querySelector('#highscoresLink');

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
    secondsLeft-=20;
    wrongTally++;
}


//Writing questions
//TODO: Needs debugging; after first question is answered, regardless of correctness, the wrong function is called on every question thereafter.
//This is also bugging the score, causing deductions to be made even if the question is answered correctly.

//TODO: Instead of each question being a function, create an array that contains multiple objects, 
// take questions/answers/correct answer and store into individual objects in array; compare submitted information to correct; 
// iterate thru array and attach eventlistener to buttons for each choice; increase the counter, 
// update the display (display a different part of the array)

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
            questionFive();
        } else {
            wrong();
            questionFive();
        }
    });
}

const questionFive = () => {
    questionHead.textContent = "Why do we need to convert an object into JSON in order for it to properly persist to local storage?"
    questionBody.children[0].textContent = "Local storage only accepts JSON objects."
    questionBody.children[1].textContent = "(Correct)   Local storage can only store strings, so we convert the object to JSON to store it properly."
    questionBody.children[2].textContent = "Local storage cannot read JavaScript, so we convert JavaScript into JSON."
    questionBody.children[3].textContent = "It is convention to store objects using JSON, and we must follow that pattern so that our code is easy to read."

    questionBody.addEventListener("click", function(event) {
        var element = event.target;
        
        if (element === questionBody.children[1]) {
            right();
            gameEnd();
        } else {
            wrong();
            gameEnd();
        }
    });
}

//Function for ending game; tallys score and saves it to localstorage

function gameEnd() {
    var finalScore = secondsLeft;
    questionHead.textContent = "Your score was " + finalScore + ". " + "You answered " + wrongTally + " questions wrong.";
    questionBody.textContent = "Submit your score below!"
    inputField.style.display = "inline";
    answerGrade.children[1].style.display = "none";


    var submitScore = document.createElement("button")
    submitScore.setAttribute('id','submitButton')
    submitScore.textContent = "Submit Score"
    document.querySelector("#submitHere").appendChild(submitScore);


    submitScore.addEventListener("click", function() {   
        saveScore();
        showScores();
    }) 
}

function saveScore() {
    var nameScore = {
            yourName: inputField.value,
            score: secondsLeft
        }
        newNameScore = JSON.parse(localStorage.getItem("nameScore")) || []
        newNameScore.push(nameScore);
        localStorage.setItem("nameScore", JSON.stringify(newNameScore));
}

function showScores() {
    highscores.style.display = "block";
    answerGrade.style.display = "block";
    newNameScore = JSON.parse(localStorage.getItem("nameScore")) || []
    for (let i = 0; i < newNameScore.length; i++) {
        var player = newNameScore[i];

        var highscoreItem = document.createElement("li");
        highscoreItem.textContent = player.yourName + " scored " + player.score;
        highscoreItem.classList.add("highscoreItem");
        highscores.appendChild(highscoreItem);
    }
}

startButton.addEventListener("click", function() {
    startButton.setAttribute("style", "display:none");
    quizIntro.setAttribute("style", "display:none");
    questionBody.style.display = "block";
    questionOne ();
});