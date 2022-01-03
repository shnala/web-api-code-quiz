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

//Test initiation variables
var startButton = document.getElementById("start");
var quizIntro = document.getElementById("quizIntro")

//Question variables
var questionHead = document.body.children[1].children[0];
var questionBody = document.getElementById("questionBody")
var answerGrade = document.getElementById("answerGrade")


//Establishing timer
const setTime = () => {
    var timerInterval = setInterval(() => {
        secondsLeft--;
        dynamicTimer.textContent = secondsLeft + " seconds left";
        
        if(secondsLeft === 1) {
            dynamicTimer.textContent = secondsLeft + " second left";
        }
        else if(secondsLeft === 0) {
            clearInterval(timerInterval);
            dynamicTimer.textContent = "";
        }
    }, 1000);
}


//TODO: Code to make Right/Wrong appear underneath question
// const rightWrong = () => {
//   if (answer === true) {
    
// }  

// }



//Writing questions
const questionOne = () => {    
    questionHead.textContent = "Which of the following best describes a Web API?"
    questionBody.children[0].textContent = "Web APIs are built into your web browser and contain methods that allow us to manipulate a web page via JavaScript."
    questionBody.children[0] = true;
    questionBody.children[1].textContent = "Web APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the Web."
    questionBody.children[2].textContent = "Web APIs are low level code (say C or C++) that directly control the computer's GPU or other graphics functions."
    questionBody.children[3].textContent = "Web APIs are a part of the JavaScript language itself and are built into your browser."

    
    questionBody.addEventListener("click", function() {
        if (questionOne === true) {
            console.log("It works!")
        } else {
            console.log("It doesn't work")
        }
    });
}

const questionTwo = () => {
    questionHead.textContent = "Which of the following would change an element's background to red?"
    questionBody.children[0].textContent = "element.setAttribute('style', 'red')"
    questionBody.children[1].textContent = "element.setAttribute('red')"
    questionBody.children[2].textContent = "element.setAttribute('class', 'background:red')"
    questionBody.children[3].textContent = "element.setAttribute('style', 'background-color:red')"

    questionBody.addEventListener("click", function() {
        questionThree ();
    });
}

const questionThree = () => {
    questionHead.textContent = "How would you append the following to the DOM? var myDiv = document.createElement('div');"
    questionBody.children[0].textContent = "myDiv.appendChild.document.body;"
    questionBody.children[1].textContent = "document.body.appendChild('div');"
    questionBody.children[2].textContent = "document.body.appendChild = myDiv;"
    questionBody.children[3].textContent = "document.body.appendChild(myDiv);"

    // questionBody.addEventListener("click", function() {
    //     questionFour ();
    // });
}


startButton.addEventListener("click", function() {
    startButton.setAttribute("style", "display:none");
    quizIntro.setAttribute("style", "display:none");
    questionBody.style.display = "block";
    questionOne ();
});