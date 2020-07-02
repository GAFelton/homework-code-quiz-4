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
var currentQuestionIndex = 0;
var questions = [
    // Question Object 1
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 1
    },
        // Question Object 2
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    },
        // Question Object 2
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    },
        // Question Object 2
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    },
        // Question Object 2
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    }    
]

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

function renderQuestion(index) {
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
questionArea.innerHTML = "";

var currentQuestion = question[index];
questionHeader.textContent = currentQuestion.questionText;
var buttons = []
// in this kind of for loop, we can only iterate forwards. It is meant for an object or an array.
for (var [idx, choice] of currentQuestion.choices.entries()) console.log(choice); {
    var button = document.createElement("button");
    button.textcontent = choice;
    button.setAttribute("data-index", idx);
    questionArea.appendChild(button);

    // Bind click listener when you create the button
    button.addEventListener("click", handleAnswerClick)
    ​
            buttons.push(button)
}
shuffle(buttons);
for(var button of buttons) questionArea.appendChild(button);

}

function handleAnswerClick(event) {
    event.preventDefault();
    
    var buttonIdx = event.currentTarget.getAttribute('data-index');
    console.log(buttonIdx);
    // TODO - Do something with clicked index
​
    // Answer Validation
}

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    endIntro();
    startTimer();
    renderQuestion1();
})

/* CODE QUIZ PSEUDOCODE
question storage: Array for each question. Each question is an object. Within each object, there are three parameters: Question, Possible Answers[], Correct Answer Index.


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