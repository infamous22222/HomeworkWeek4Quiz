//questions
let questions = [
  {
    question: "what is 22 squared",
    ChoiceA: "484",
    ChoiceB: "2222",
    ChoiceC: "4",
    ChoiceD: "494",
    ChoiceE: "2244",
    answer: "484",
  },
  {
    question: "find x if 2x+4=12",
    ChoiceA: "12",
    ChoiceB: "4",
    ChoiceC: "6",
    ChoiceD: "9",
    ChoiceE: "not possible",
    answer: "4",
  },
  {
    question: "did this work",
    ChoiceA: "yes",
    ChoiceB: "no",
    ChoiceC: "no",
    ChoiceD: "no",
    ChoiceE: "no",
    answer: "yes",
  },
];
//set global variables
var Choice1 = document.getElementById("Answer1");
var Choice2 = document.getElementById("Answer2");
var Choice3 = document.getElementById("Answer3");
var Choice4 = document.getElementById("Answer4");
var Choice5 = document.getElementById("Answer5");
var timer = document.getElementById("timer");
var deletehighscores = document.getElementById("clearhighscores");
var showhighscores = document.getElementById("showhighscores");
var finalscore = "";
var currentquestion = 0;
if (localStorage.hasOwnProperty('recordedscores')) {
var recordedscores = JSON.parse(localStorage.getItem('recordedscores'))}
else { var recordedscores = []};
console.log(recordedscores);
var selectedanswer;
var countdown;
var time = 20;
var initials = "";

//set event listeners
showhighscores.addEventListener("click", finishquiz )
deletehighscores.addEventListener("click", clearhighscores)
timer.addEventListener("click", RunQuiz);
Choice1.addEventListener("click", (event) => {
  selectedanswer = event.target.textContent;
  CheckAnswer();
});
Choice2.addEventListener("click", (event) => {
  selectedanswer = event.target.textContent;
  CheckAnswer();
});
Choice3.addEventListener("click", (event) => {
  selectedanswer = event.target.textContent;
  CheckAnswer();
});
Choice4.addEventListener("click", (event) => {
  selectedanswer = event.target.textContent;
  CheckAnswer();
});
Choice5.addEventListener("click", (event) => {
  selectedanswer = event.target.textContent;
  CheckAnswer();
});

function clearhighscores() {
  document.getElementById("highscores").innerHTML = "";
  localStorage.clear();
  recordedscores = [];
}
// start quiz/timer
function RunQuiz() {
  document.getElementById("answers").style.display = 'block';
  document.getElementById("highscores").style.display = 'none';
  currentquestion =0;
  time =20;
  Choice1.textContent = questions[currentquestion].ChoiceA;
  Choice2.textContent = questions[currentquestion].ChoiceB;
  Choice3.textContent = questions[currentquestion].ChoiceC;
  Choice4.textContent = questions[currentquestion].ChoiceD;
  Choice5.textContent = questions[currentquestion].ChoiceE;
  title.textContent = questions[currentquestion].question;
  starttimer();
}

function savescores() {
  clearInterval(countdown);
  var initials = window.prompt("enter initials");
  finalscore = {
    initials: initials,
    time: time
  };
  console.log(finalscore);
  console.log(recordedscores);
  recordedscores.push(finalscore);
  localStorage.setItem('recordedscores', JSON.stringify(recordedscores));
  finishquiz();
}

function finishquiz() {
  if (localStorage.hasOwnProperty('recordedscores')) {
  title.textContent = "well done, click on timer to play again";
  recordedscores = JSON.parse(localStorage.getItem('recordedscores'));
  console.log(recordedscores);
  recordedscores.sort((a,b) =>{
    return b.time - a.time; 
  })
};
  title.textContent = "well done, click on start to play";
  console.log(recordedscores);
  document.getElementById("answers").style.display = 'none';
  document.getElementById("highscores").style.display = 'block';
  document.getElementById("highscores").innerHTML = "";
  let list = document.getElementById("highscores");
  recordedscores.forEach((recordedscores)=>{
    let li = document.createElement("li");
    li.innerText = recordedscores.initials + " " + recordedscores.time;
    list.appendChild(li);
  })
}


function starttimer() {
  countdown = setInterval(function () {
    time--;
    timer.textContent = time + "s";
    if (time <= 0) {
      clearInterval(countdown);
      savescores();
    }
  }, 1000);
}

//check answers
function CheckAnswer() {
if (selectedanswer === questions[currentquestion].answer){
    alert("correct");
    time += 5;
    nextquestion();
} else {
    alert("incorrect");
    time -= 5;
    nextquestion();
  }
}

  //move to next question
function nextquestion() {
    if (currentquestion < questions.length - 1) {
      currentquestion += 1;
      Choice1.textContent = questions[currentquestion].ChoiceA;
      Choice2.textContent = questions[currentquestion].ChoiceB;
      Choice3.textContent = questions[currentquestion].ChoiceC;
      Choice4.textContent = questions[currentquestion].ChoiceD;
      Choice5.textContent = questions[currentquestion].ChoiceE;
      title.textContent = questions[currentquestion].question;
    } else {
      savescores();
    }
}

