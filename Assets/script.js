var timerEl = document.querySelector("#timer");
var startBtnEl = document.querySelector("#startbtn");
var mainContentEl = document.querySelector(".mainContent");
var answerBarEl = document.querySelector(".answerBar");


var countDown = 90;
var questionArr = [
    {
        question: "Commonly used data types do NOT include: ",
        answers: [
        "1: Strings",
        "2. Booleans",
        "3: Alerts",
        "4:Numbers"],
        correctAnswer: 2,
    },
    {
        question: "The condition within an if/else statement is enclosed withing ___________.",
        answers: [
        "1. Quotes",
        "2. Curly Brackets",
        "3. Parenthesis",
        "4. Square Brackets"],
        correctAnswer: 2,
    },
    {
        question: "Arrays in JavaScript can be used to store________.",
        answers: [
        "1. Numbers and Strings",
        "2. Other Arrays",
        "3. Booleans",
        "4. All of the Above"],
        correctAnswer: 3,
    },
    {
        question: "String values must be enclosed within___ when being assigned to variables.",
        answers: [
        "1. Commas",
        "2. Curly Brackets",
        "3. Quotes",
        "4. Parenthesis"], 
        correctAnswer: 2,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        answers: [
            "1. JavaScript.",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log()"],
        correctAnser: 3,
    },
];

var currentIndex = 0;
//Timer count down, 
function startQuiz(){
    interval = setInterval(function (){
        countDown--;
        timerEl.innterHTML = "Time: " + countDown;
        if (countDown <= 0){
            clearInterval(interval);
            questionCount =5;
            renderQuestion();
        }
    }, 1000);

    renderQuestion();
}

function renderQuestion() {
    mainContentEl.innerHTML = "";
    
}

