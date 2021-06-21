var startGameBtn = document.getElementById("start-button");
var introContainer = document.getElementById("intro");
var questionContainer = document.getElementById("question-container");
var currentIndex = 0;
var questionDisplay = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-button");
var popup = document.getElementById("popup");
var timerEl = document.getElementById("countDown");
var GameEndEL = document.getElementById("game-end");
var finalScore = document.getElementById("final-score-is");
var submitBtnEl = document.getElementById("submit-button");
var nameOfPlayerEl = document.getElementById("player-name");
var questions = [
    {
        question: "What are variables used for in JavaScript Programs?",
        answers: [
            { Text: "Storing numbers, dates, or other values", correct: true },
            { Text: "Varying randomly", correct: true },
            { Text: "Causing high-school algebra flashback", correct: false },
            { Text: "Storing numbers, dates, or other values", correct: false },
        ],
    },
    {
        question: "What is the capital of Connecticut?",
        answers: [
            { Text: "Hartford", correct: true },
            { Text: "Albany", correct: false },
            { Text: "Yarmouth", correct: false },
            { Text: "A place where people get stabbed.", correct: true },
        ],
    },
    {
        question: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
        answers: [
            { Text: "35 cubic feet", correct: false },
            { Text: "42", correct: false },
            { Text: "All of 3", correct: false },
            { Text: "700 pounds", correct: true },
        ],
    },
    {
        question: "How many licks does it take to get to the center of a Tootsie-pop?",
        answers: [
            { Text: "One", correct: false },
            { Text: "Two", correct: false },
            { Text: "Three", correct: false },
            { Text: "The world may never know.", correct: true },
        ],
    },
];

var startGame = function () {
    console.log("This function works");
    introContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    questionDisplay.textContent = questions[currentIndex].question;
    createAnswer();
    countDown();
};

var createAnswer = function () {
    answerButtonEl.innerHTML = "";
    for (var i = 0; i < questions[currentIndex].answers.length; i++) {
        thisButton = document.createElement("Button");
        thisButton.classList.add("btn-btn")
        thisButton.textContent = questions[currentIndex].answers[i].Text;
        if (questions[currentIndex].answers[i].correct) {
            thisButton.setAttribute("id", "true");
        }
        answerButtonEl.append(thisButton);
        thisButton.addEventListener("click", nextQuestion);
    }
}
var nextQuestion = function () {
    console.log("This works")
    if (this.getAttribute("id") === "true") {
        popup.classList.remove("hide")
        popup.textContent = "Correct"
    } else {
        popup.classList.remove("hide")
        popup.textContent = "Incorrect"
        timeLeft = time - 15;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
        questionDisplay.textContent = questions[currentIndex].question;
        createAnswer();
    } else {
        gameEnd();
    }
}
var timeLeft = questions.length * 15
var timeInterval;
var countDown = function () {

    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time:" + timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = "Time:" + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time: 0"
            alert("Time is up!");
            clearInterval(timeInterval);
            gameEnd();
        }

    }, 1000);
};

var gameEnd = function () {
    console.log("This is the end of the game!")
    score = timeLeft;
    clearInterval(timeInterval);
    questionContainer.classList.add("hide")
    GameEndEL.classList.remove("hide")
    finalScore.innerHTML = "Your Score is " + score;
    console.log(score)
};

var saveScore = function (event) {
    console.log("submit btn works")
    event.preventDefault();
    totalScore = JSON.parse(localStorage.getItem("totalScore")) || [];
    var playerName = document.getElementById("player-name").value;
    var newScore = {
        playerName: playerName,
        score: score
    };

    if (playerName === "") {
        alert("Name cannot be blank")
    } else {
        totalScore.push(newScore)
        localStorage.setItem("totalScore", JSON.stringify(totalScore))
    }
};

startGameBtn.addEventListener("click", startGame);
submitBtnEl.addEventListener("click", saveScore)