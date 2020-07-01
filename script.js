var timeLeftSpan = document.getElementById("timeLeft");
var highScoreSpan = document.getElementById("highScore");
var introBox = document.getElementsByClassName("intro-box");
var startButton = document.getElementById("startButton");
var questionBox = document.getElementsByClassName("question-box");
var questionHeader = document.getElementById("questionHeader");
var qButton1 = document.getElementById("questionButton1");
var qButton2 = document.getElementById("questionButton2");
var qButton3 = document.getElementById("questionButton3");
var qButton4 = document.getElementById("questionButton4");

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