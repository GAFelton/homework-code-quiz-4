var timeLeftSpan = document.getElementById("timeLeft");
var highScoreSpan = document.getElementById("highScore");
var hidden = document.getElementById("hidden");
var introBox = document.getElementsByClassName("intro-box");
var startButton = document.getElementById("startButton");
var questionBox = document.getElementsByClassName("question-box");
var questionHeader = document.getElementById("questionHeader");
var questionArea = document.getElementById("questionArea");
// var qButton1 = document.getElementById("questionButton1");
// var qButton2 = document.getElementById("questionButton2");
// var qButton3 = document.getElementById("questionButton3");
// var qButton4 = document.getElementById("questionButton4");
var secondsLeft = 75;
var questions = {
    "q1": ["question1", "answer1", "answer2", "answer3", "answer4"],
    "q2": ["question2", "answer1", "answer2", "answer3", "answer4"],
    "q3": ["question3", "answer1", "answer2", "answer3", "answer4"],
    "q4": ["question4", "answer1", "answer2", "answer3", "answer4"],
    "q5": ["question5", "answer1", "answer2", "answer3", "answer4"]
};

var highScore = localStorage.getItem("high-score");

calcHighScore();

function calcHighScore() {
    if (highScore === null) {
        highScoreSpan.textContent = "0";
    }
    else {
    highScoreSpan.textContent = highScore;
    }
}

function startTimer() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeLeftSpan.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        // END QUIZ FUNCTION
      }
  
    }, 1000);
  }

function endIntro() {
    introBox.setAttribute("display", "none");
    questionBox.setAttribute("display", "block");
    hidden.setAttribute("display", "block");
}  

function renderQuestion1() {
    questionArea.innerHTML = "";
    questionHeader.textContent = questions.q1[0];

    for (var j = 1; j < q1.length in questions; j++) {
        var question1 = questions.q1[j];

        var button = document.createElement("button");
        button.textcontent = question1;
        button.setAttribute("data-index", j);
        questionArea.appendChild(button);
    }
}

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    endIntro();
    startTimer();
    renderQuestion1();
})

/* CODE QUIZ PSEUDOCODE
question storage: Array for each question. [0] is the question, [1]-[4] are the possible answers.


on button click, start timer.
display q1.
each question has 4 possible answers. (display answers randomly?)
on correct answer click, say "Correct" and move to the next question.
on incorrect answer click, say "Incorrect", deduct 15 seconds from timer, and move to the next question.
q2
q3
q4
q5

Game Over: When timer = 0 or when user completes all questions, end the quiz.
Input form to save initials and score (to localStorage).

*/