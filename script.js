var timeLeftSpan = document.getElementById("timeLeft");
var highScoreSpan = document.getElementById("highScore");
var timer = document.getElementById("timer");
var introBox = document.querySelector(".intro-box");
var startButton = document.getElementById("startButton");
var questionBox = document.querySelector(".question-box");
var questionHeader = document.getElementById("questionHeader");
var questionArea = document.getElementById("questionArea");
var validationArea = document.querySelector(".textFade");
var failBox = document.getElementById("failBox");
var winBox = document.getElementById("winBox");
var currentScore = document.getElementById("currentScore");
var hsInitialsInput = document.getElementById("hsInitials");
var EnterHSButton = document.getElementById("enterHSButton");
var hsListArea = document.getElementById("hsList");
var quizEndBoolean = false;
var secondsLeft = questions.length * 15;
var currentQuestionIndex = 0;
// var questions is an array of objects. Each object is a question for the quiz, containing three properties: questionText, choices, and answer.
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
var allScores = [];
var highScore = JSON.parse(localStorage.getItem("allScores"[0]));
var timerInterval;

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

        if (secondsLeft === 0 || secondsLeft < 0) {
            clearInterval(timerInterval);
            console.log("Out of Time! Time remaining: " + secondsLeft)
            // END QUIZ FUNCTION
            youLose();
        }

        if (quizEndBoolean === true) {
            clearInterval(timerInterval);
            timeLeftSpan.textContent = secondsLeft + 1;
        }
    }, 1000);
}

function endIntro() {
    introBox.style.display = "none";
    questionBox.style.display = "flex";
    failBox.style.display = "none";
    winBox.style.display = "none";
    timer.style.display = "block";
}

//end quiz function
function endQuiz() {
    quizEndBoolean = true;
    questionBox.style.display = "none";
    introBox.style.display = "none";
}

function rightAnswer() {
    validationArea.style.color = ("green");
    validationArea.textContent = ("Correct!");
    validationArea.style.opacity = ("0");

    validationArea.addEventListener("transitionend", function () {
        validationArea.textContent = ("");
        validationArea.style.opacity = ("1");
        validationArea.removeEventListener("transitionend", function () {
            validationArea.textContent = ("");
            validationArea.style.opacity = ("1");
        });
    });
}

function wrongAnswer() {
    validationArea.style.color = ("red");
    validationArea.textContent = ("Wrong.");
    validationArea.style.opacity = ("0");

    validationArea.addEventListener("transitionend", function () {
        validationArea.textContent = ("");
        validationArea.style.opacity = ("1");
        validationArea.removeEventListener("transitionend", function () {
            validationArea.textContent = ("");
            validationArea.style.opacity = ("1");
        });
    });
}

function renderQuestion(index) {
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    questionArea.innerHTML = "";
    // if ();
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
    console.log("Button ID: " + buttonIdx);
    console.log("Question ID: " + questions[currentQuestionIndex].answer)
    // TODO - Do something with clicked index
    if (buttonIdx == questions[currentQuestionIndex].answer) {
        rightAnswer();
    }
    else {
        secondsLeft = secondsLeft - 15;
        wrongAnswer();

    }
    currentQuestionIndex++;
    // End The Quiz
    if (currentQuestionIndex < questions.length && secondsLeft > 0) {

        renderQuestion(currentQuestionIndex);
    }

    else if (currentQuestionIndex >= questions.length && secondsLeft > 0) {
        // You win function
        youWin();
    }

    else {
        // You lose function
        youLose();
    }
}

// You win Function
function youWin() {
    // clearInterval(timerInterval);
    endQuiz();
    winBox.style.display = "flex";
    failBox.style.display = "none";
    currentScore.textContent = secondsLeft;
    console.log(secondsLeft);
}
// You lose Function
function youLose() {
    endQuiz();
    failBox.style.display = "flex";
    winBox.style.display = "none";
    console.log(currentScore);
    console.log(secondsLeft);
}

function renderHighScores() {
    hsListArea.innerHTML = "";

    for (var i = 0; i < 5; i++) {
        var renderScore = allScores[i];

        var li = document.createElement("li");
        li.textContent = renderScore;
        li.setAttribute("data-index", i);
        hsListArea.appendChild(li);
    }
}

function pullHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("allScores"));

    if (storedHighScores !== null) {
        allScores = storedHighScores;
    }
    renderHighScores();
}

function storeHighScores() {
    localStorage.setItem("allScores", JSON.stringify(allScores));
}

EnterHSButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    var hsInitials = hsInitialsInput.value.trim().toUpperCase();
    if (hsInitials === "") {
        return;
    }

    var newScore = {
        "initials": hsInitials,
        "score": currentScore.textContent
    }
    allScores.push(newScore);
    hsInitialsInput.value = "";
    // sort by value
    allScores.sort(function (a, b) {
        return a.score - b.score;
    });
    storeHighScores();
    pullHighScores();
});

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    secondsLeft = questions.length * 15;
    currentQuestionIndex = 0;
    quizEndBoolean = false;
    endIntro();
    startTimer();
    renderQuestion(currentQuestionIndex);
});


/* CODE QUIZ PSEUDOCODE
question storage: Array for each question. Each question is an object. Within each object, there are three parameters: Question, Possible Answers[], Correct Answer Index.


on button click, start timer.
display q1.
-each question has 4 possible answers. (display answers in random order)
-on correct answer click, say "Correct" and move to the next question.
-on incorrect answer click, say "Incorrect", deduct 15 seconds from timer, and move to the next question.
q2
q3
q4
q5

Game Over: When timer = 0 or when user completes all questions, end the quiz.
Input form to save initials and score (to localStorage).

*/