//Variables
var timerEl = document.querySelector("#timer");
var startBtnEl = document.querySelector("#startbtn");
var mainContentEl = document.querySelector("#mainContent");
var answerBarEl = document.querySelector(".answerBar");
var finalScoreEl = document.querySelector("#finalScore");
var clearScoresBtn = document.querySelector("#clear");
var questionCount = 0;
var gameOverHeader;
var gameOverBody;
var gameOverForm;
var gameOverFormLabel;
var gameOverFormInput;
var formValue;
var questionEl;
var countDown = 90;
var pointsArr = [];

//Questions Array
var questionArr = [
    {
        question: "Commonly used data types DO NOT include: ",
        answers: [
        "1: Strings",
        "2. Booleans",
        "3: Alerts",
        "4: Numbers"],
        correctAnswer: 2,
    },
    {
        question: "The condition within an if/else statement is enclosed within ___________.",
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
        correctAnswer: 3,
    },
];

//Start Button Event Listener -- Click button to start quiz function
if (startBtnEl !== null){
    startBtnEl.addEventListener("click", startQuiz);
}
/*Timer count down, and start of interval countdown. When the countdown reaches 0 questionCount is set to 5 and the function
renderQuestion will send you to the gameOver() function */
function startQuiz(){
    interval = setInterval(function (){
        countDown--;
        timerEl.innerHTML = "Timer: " + countDown;
        if (countDown <= 0){
            clearInterval(interval);   
            questionCount = 5;
            renderQuestion();
        }
    }, 1000);
    renderQuestion();
}

//Main component that matches buttons and compares answer with correct answer listed in index of the question array and sends to the functions rightAnswer or wrongAnswer
mainContentEl.addEventListener("click", function (event){
    var element = event.target;    
    if (element.matches("button")){
        if (element.dataset.index == questionArr[questionCount]["correctAnswer"]){
            rightAnswer();
        }
        else if (!element.hasAttribute("data-index")) {
        }
        else {
            wrongAnswer();
        }
    }
});

// Question Renders with appropriate buttons and timer and re-writes the screen with the h4 and div buttons
function renderQuestion() {
    mainContentEl.innerHTML = "";
    if (questionCount > 4){
        clearInterval(interval);
        timerEl.innerHTML = "Time: " + countDown;
        gameOver();
    }
    else {
    questionEl = document.createElement("h4");    
    questionEl.innerText = questionArr[questionCount]["question"];
    mainContentEl.append(questionEl);
    divEl = document.createElement("div");
    divEl.setAttribute("class", "btn-group-vertical");      
    for (var i = 0; i < questionArr[questionCount]["answers"].length; i++){
        answersEl = document.createElement("button");        
        answersEl.innerText = questionArr[questionCount]["answers"][i];
        answersEl.setAttribute("class", "btn-group-vertical");                  
        answersEl.setAttribute("data-index", i);
        divEl.appendChild(answersEl);
        }
    mainContentEl.append(divEl);
    }
}

// Function for right answers and the change of HTML, NO subtraction from time
function rightAnswer(){
    var correctResponse;
    answerBarEl.innerHTML = "";
    correctResponse = document.createElement("div");
    correctResponse.innerText = "Correct!";
    correctResponse.setAttribute("class", "answerBar");
    correctResponse.setAttribute("style", "border-top: lightgray solid 2px");
    correctResponse.style.backgroundColor = "green";
    correctResponse.style.color = "black";
    correctResponse.style.fontWeight = "bold";
    correctResponse.style.textAlign = "center";
    answerBarEl.append(correctResponse);
    setTimeout(function(){
        correctResponse.innerHTML = "";
        correctResponse.setAttribute("style", "border-top: none");
    }, 1000);
    questionCount++;    
    renderQuestion();
}

// Function for wrong answers and the change of HTML and the subtraction of time
function wrongAnswer(){
    var wrongResponse;
    answerBarEl.innerHTML = "";
    wrongResponse = document.createElement("div");
    wrongResponse.innerText = "Wrong!";
    wrongResponse.setAttribute("class","answerBar");
    wrongResponse.setAttribute("style", "border-top: lightgray solid 2px");
    wrongResponse.style.backgroundColor = "red";
    wrongResponse.style.color = "white";
    wrongResponse.style.fontWeight = "bold";
    wrongResponse.style.textAlign = "center";
    answerBarEl.append(wrongResponse);
    setTimeout(function (){
        wrongResponse.innerHTML = "";
        wrongResponse.setAttribute("style", "border-top: none");
    }, 1000);
    countDown -= 10;
    questionCount++;    
    renderQuestion();    
}

//Game Over function, crates page with classes and score is the countdown
function gameOver(){
    gameOverHeader = document.createElement("h4");
    gameOverHeader.setAttribute("class", "mainContent");
    gameOverHeader.style.textAlign = "center";
    gameOverHeader.innerText = "Quiz Completed!!!!";
    gameOverBody = document.createElement("div");
    gameOverBody.innerText = "Your final score is: " + countDown;    
    gameOverHeader.append(gameOverBody);
    gameOverForm = document.createElement("form");
    gameOverForm.setAttribute("style", "padding: 10px");
    gameOverFormLabel = document.createElement("label");
    gameOverFormLabel.innerText = "Enter Initials: ";
    gameOverForm.append(gameOverFormLabel);
    gameOverFormInput = document.createElement("input");
    gameOverFormInput.setAttribute("class", "form-control");
    gameOverFormInput.setAttribute("type", "text");
    gameOverFormInput.setAttribute("pattern", "[A-Za-z]{3}");
    gameOverFormInput.setAttribute("id", "formInput");
    gameOverFormInput.setAttribute("placeholder", "Initials (Letters ONLY) press ENTER when done");
    gameOverForm.append(gameOverFormInput);
    gameOverBody.append(gameOverForm);
    mainContentEl.append(gameOverHeader);
}

//calls high score page function
highScoresPage();

//Function for high scores page, puts the high scores that have been saved
function highScoresPage(){   
    if (finalScoreEl !== null){
        var combinedScore = JSON.parse(localStorage.getItem("scoreArr"));
        finalScoreEl.innerHTML = "";        
        for (i = 0; i < combinedScore.length; i += 2){
            var scoreAppend = document.createElement("div");
            scoreAppend.setAttribute("class", "highScores");
            scoreAppend.innerText = combinedScore[i] + " " + combinedScore[i + 1];              
            finalScoreEl.append(scoreAppend);          
        }
    }
}

//Function that waits for submit by enter button to store new score and then switches to the quizhighscores html
mainContentEl.addEventListener("submit", function(event){    
    event.preventDefault();    
    var element = event.target;
    formValue = gameOverFormInput.value;
    if (element.matches("form")) {
        if (JSON.parse(localStorage.getItem("scoreArr") == null)){
            pointsArr = [];
        } else{
            pointsArr = JSON.parse(localStorage.getItem("scoreArr"));
        }        
        pointsArr.push(formValue);
        pointsArr.push(countDown);        
        localStorage.setItem("scoreArr", JSON.stringify(pointsArr));
        window.location.href = "./quizhighscores.html";        
    }
});

//Clears score Array in local storage when clear scores button is clicked
if (clearScoresBtn !== null) {
    clearScoresBtn.addEventListener("click", function(){
        localStorage.setItem("scoreArr", JSON.stringify([]));
        highScoresPage();
    });
}