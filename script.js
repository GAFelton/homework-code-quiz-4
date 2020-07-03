var timeLeftSpan = document.getElementById("timeLeft");
var highScoreSpan = document.getElementById("highScore");
var timer = document.getElementById("timer");
var introBox = document.querySelector(".intro-box");
var startButton = document.getElementById("startButton");
var questionBox = document.querySelector(".question-box");
var questionHeader = document.getElementById("questionHeader");
var questionArea = document.getElementById("questionArea");
var validationArea = document.querySelector(".textFade");
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
    // Question Object 3
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    },
    // Question Object 4
    {
        questionText: "What is the color of the sky?",
        choices: [
            "green",
            "blue",
            "red"
        ],
        answer: 2
    },
    // Question Object 5
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
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeftSpan.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // END QUIZ FUNCTION
        }

    }, 1000);
}

function endIntro() {
    introBox.style.display = "none";
    questionBox.style.display = "flex";
    timer.style.display = "block";
}

function rightAnswer() {
    validationArea.style.color = ("green");
    validationArea.textContent = ("Correct!");
    validationArea.style.opacity = ("0");

    validationArea.addEventListener("transitionend", function(){
        validationArea.textContent = ("");
        validationArea.style.opacity = ("1");
    });
}

function wrongAnswer() {
    validationArea.style.color = ("red");
    validationArea.textContent = ("Wrong.");
    validationArea.style.opacity = ("0");

    validationArea.addEventListener("transitionend", function(){
        validationArea.textContent = ("");
        validationArea.style.opacity = ("1");
    });
}

// validationArea.addEventListener("animationend", listener, false);

// function listener(){
//     validationArea.textContent = ("");
//     validationArea.style.opacity = ("1");
// }

function renderQuestion(index) {
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    questionArea.innerHTML = "";

    var currentQuestion = questions[index];
    questionHeader.textContent = currentQuestion.questionText;
    var buttons = [];
    // in this kind of for loop, we can only iterate forwards. It is meant for an object or an array.
    // for (var [idx, choice] of currentQuestion.choices.entries()); 
    for (i = 0; i < currentQuestion.choices.length; i++) {
        var button = document.createElement("button");
        button.textContent = currentQuestion.choices[i];
        button.setAttribute("data-index", i);

        // Bind click listener when you create the button
        button.addEventListener("click", handleAnswerClick);
        buttons.push(button);
        console.log(buttons);
    }
    buttons = shuffle(buttons);
    for (i = 0; i < buttons.length; i++) {
        questionArea.appendChild(buttons[i]);
    }
    // for(var button of buttons) questionArea.appendChild(button);

}

function handleAnswerClick(event) {
    event.preventDefault();

    var buttonIdx = event.currentTarget.getAttribute('data-index');
    console.log(buttonIdx);
    console.log(questions[currentQuestionIndex].answer)
    // TODO - Do something with clicked index
    if (buttonIdx == questions[currentQuestionIndex].answer) {
        rightAnswer();
    }
    else {
        secondsLeft = secondsLeft - 15;
        wrongAnswer();

    }
    // Answer Validation
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
}

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    endIntro();
    startTimer();
    renderQuestion(currentQuestionIndex);
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