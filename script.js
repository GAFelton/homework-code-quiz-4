var timeLeftSpan = document.getElementById("timeLeft");
var highScoreSpan = document.getElementById("highScore");
var timer = document.getElementById("timer");
var introBox = document.querySelector(".intro-box");
var startButton = document.getElementById("startButton");
var retakeButton = document.querySelector(".retakeButton");
var retakeButton1 = document.querySelector(".retakeButton1");
var questionBox = document.querySelector(".question-box");
var questionHeader = document.getElementById("questionHeader");
var questionArea = document.getElementById("questionArea");
var validationArea = document.querySelector(".textFade");
var failBox = document.getElementById("failBox");
var winBox = document.getElementById("winBox");
var currentScore = document.getElementById("currentScore");
var hsInputForm = document.getElementById("hs-form");
var EnterHSButton = document.getElementById("enterHSButton");
var resetHSListButton = document.getElementById("resetHSList");
var hsListArea = document.getElementById("hsList");
var quizEndBoolean = false;
var currentQuestionIndex = 0;
// var questions is an array of objects. Each object is a question for the quiz, containing three properties: questionText, choices, and answer.
var questions = [
    // Question Object 1
    {
        questionText: "What is the correct syntax for referring to an external script called “thematrix.js”?",
        choices: [
            "<script src=”thematrix.js”>",
            "<script href=”thematrix.js”>",
            "<script ref=”thematrix.js”>",
            "<script name=”thematrix.js”>"
        ],
        answer: 0
    },
    // Question Object 2
    {
        questionText: "How is a function called in JavaScript?",
        choices: [
            "call myFunction()",
            "call function myFunction()",
            "myFunction()",
            "function myFunction()"
        ],
        answer: 2
    },
    // Question Object 3
    {
        questionText: "How do you initialize an array in JavaScript?",
        choices: [
            "var matrixCharacters= “Neo”, “Trinity”, “Morpheus”",
            "var matrixCharacters=(1:Neo, 2:Trinity, 3:Morpheus)",
            "var matrixCharacters=(1=Neo, 2=Trinity, 3=Morpheus)",
            "var matrixCharacters=[“Neo”, “Trinity”, “Morpheus”]"
        ],
        answer: 3
    },

    // Question Object 4
    {
        questionText: "Which of the following methods removes the last element from an array and returns that element?",
        choices: [
            "get()",
            "last()",
            "pop()",
            "unshift()"
        ],
        answer: 2
    },
    // Question Object 5
    {
        questionText: "Which of the following is the correct syntax of a FOR loop?",
        choices: [
            "for (increment; initialize; test)",
            "for (initialize; test), increment",
            "for (initialize; test; increment)",
            "for (test; initialize; increment)"
        ],
        answer: 0
    }
]
totalQuestions = questions.length;
console.log("Total Questions: " + totalQuestions);
var secondsLeft = totalQuestions * 15;
console.log("You will have " + secondsLeft + " seconds to complete the quiz.");
var allScores = [];
var timerInterval;
pullHighScores();

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

function transitionBack() {
    validationArea.addEventListener("transitionend", function () {
        validationArea.textContent = ("");
        // validationArea.style.transition = ("opacity 40ms 40ms");
        validationArea.style.opacity = ("1");
        validationArea.removeEventListener("transitionend", function () {
            validationArea.textContent = ("");
            // validationArea.style.transition = ("opacity 40ms 40ms");
            validationArea.style.opacity = ("1");
        });
    })
};

function rightAnswer() {
    validationArea.style.color = ("green");
    validationArea.textContent = ("Correct!");
    validationArea.style.opacity = ("0");

    transitionBack();
}

function wrongAnswer() {
    validationArea.style.color = ("red");
    validationArea.textContent = ("Wrong.");
    validationArea.style.opacity = ("0");

    transitionBack();
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

    if (buttonIdx == questions[currentQuestionIndex].answer) {
        rightAnswer();
    }
    else {
        secondsLeft = secondsLeft - 15;
        wrongAnswer();
    }

    currentQuestionIndex++;
    // Controlling the quiz: Either display next question, win the quiz, or lose the quiz.
    if (currentQuestionIndex < totalQuestions && secondsLeft > 0) {

        renderQuestion(currentQuestionIndex);
    }

    else if (currentQuestionIndex >= totalQuestions && secondsLeft > 0) {
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
    endQuiz();
    winBox.style.display = "flex";
    failBox.style.display = "none";
    currentScore.textContent = secondsLeft;
    console.log(secondsLeft + " seconds remaining.");
}
// You lose Function
function youLose() {
    endQuiz();
    failBox.style.display = "flex";
    winBox.style.display = "none";
    console.log("Your current score is : " + currentScore);
    console.log("You had " + secondsLeft + " seconds remaining!");
}

function storeHighScores() {
    localStorage.setItem("allScores", JSON.stringify(allScores));
}

function renderHighScores() {
    hsListArea.innerHTML = "";

    for (var i = 0; i < allScores.length; i++) {
        // console.log(allScores.initials[i] + " + " + allScores.score[i]);
        var renderScore = allScores[i].initials + ": " + allScores[i].score;

        var li = document.createElement("li");
        li.textContent = renderScore;
        hsListArea.appendChild(li);
    }
}

function pullHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("allScores"));

    if (storedHighScores !== null) {
        allScores = storedHighScores;
    }

    function calcHighScore() {
        if (storedHighScores === null || storedHighScores === undefined) {
            highScoreSpan.textContent = "0";
        }
        else {
            var highScore = allScores[0].initials + ", " + allScores[0].score;
            highScoreSpan.textContent = highScore;
        }
    }
    calcHighScore();
    renderHighScores();
}

hsInputForm.addEventListener("keydown", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        EnterHSButton.click();
    }
});

EnterHSButton.addEventListener("click", function (event) {
    event.preventDefault();
    var hsInitialsInput = document.getElementById("hsInitialsInput").value;
    var hsInitials = hsInitialsInput.trim().toUpperCase();

    if (hsInitials === "") {
        alert("You must enter your initials to save your high score.");
        return;
    }
    console.log(hsInitials);

    // Creating new object to be stored in the array allScores.
    var newScore = {
        "initials": hsInitials,
        "score": currentScore.textContent
    }
    allScores.push(newScore);
    hsInputForm.reset();

    // sort by score value
    if (allScores.length > 1) {
        allScores.sort(function (a, b) {
            return b.score - a.score;
        });
    }
    storeHighScores();
    pullHighScores();
});

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    endIntro();
    startTimer();
    renderQuestion(currentQuestionIndex);
});

retakeButton.addEventListener("click", function () {
    console.log("retake button clicked.");
    location.reload();
});
retakeButton1.addEventListener("click", function () {
    console.log("retake button clicked.");
    location.reload();
});

resetHSListButton.addEventListener("click", function () {
    allScores = [];
    localStorage.clear("allScores");
    pullHighScores();
    console.log("localStorage cleared.");
    retakeButton1.click();
})

/* CODE QUIZ PSEUDOCODE
question storage: Array for each question. Each question is an object. Within each object, there are three parameters: Question, Possible Answers[], Correct Answer Index.


on button click, start timer.
display questions:
-each question has 4 possible answers. (display answers in random order)
-on correct answer click, say "Correct" and move to the next question.
-on incorrect answer click, say "Incorrect", deduct 15 seconds from timer, and move to the next question.
q1
q2
q3
q4
q5
-Hard code as little as possible so that questions are easy to add/remove. Quiz duration, number of possible answers, the order randomizer are all based on quizArray.length.
Game Over: When timer = 0 or when user completes all questions, end the quiz.
Input form to save initials and score (to localStorage). Sort initials in descending order, show highest score.

*/