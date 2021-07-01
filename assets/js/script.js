'use strict';

// ---------------------------------------------------------------------------------------
// VARIABLES
// ---------------------------------------------------------------------------------------

// SECTION = NAV
var btnHighscore = document.getElementById('highscore');

// SECTION = INTRO

var sectionIntro = document.querySelector('.section-intro');
var startEl = document.getElementById('start-quiz');

// TIMER
var timerEl = document.getElementById('countdown');

// SECTION = QUESTIONS + ANSWERS
var sectionQuestions = document.querySelector('.section-questions');
var quizQuestionEl = document.querySelector('.question');
var showWrongCorrect = document.querySelector('.wrong-correct');

// SECTION = INITIALS

var sectionInitials = document.querySelector('.section-initials');
var scoreCountSpan = document.querySelector('#score-count');
var scoreForm = document.querySelector('#score-form');
var initialsInput = document.querySelector('#initials-text');
var btnSubmitScore = document.getElementById('submit-score');

// SECTION = HIGHSCORES

var sectionHighscore = document.querySelector('.section-highscore');
var scoreList = document.querySelector('#score-list');
var btnClearScore = document.getElementById('clear-score');
var btnGoBack = document.getElementById('go-back');

// SECTION = GAME OVER
var sectionGameOver = document.querySelector('.section-gameover');
var btnGameOver = document.getElementById('game-over');

// ---------------------------------------------------------------------------------------
// QUESTION
// ---------------------------------------------------------------------------------------

const quizData = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    a: '<javascript>',
    b: '<script>',
    c: '<js>',
    d: '<scripting>',
    correct: 'b',
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    a: '<body>',
    b: '<head>',
    c: '<main>',
    d: 'both <body> and <head>',
    correct: 'd',
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    a: 'alert("Hellow World")',
    b: 'alertBox("Hellow World")',
    c: 'masgBox("Hellow World")',
    d: 'masg("Hellow World")',
    correct: 'a',
  },
  {
    question: 'What year was JavaScript launched?',
    a: '1996',
    b: '1995',
    c: '1994',
    d: 'none of the above',
    correct: 'b',
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    a: '/This is a comment',
    b: '//This is a comment',
    c: '<!--This is a comment-->',
    d: 'none of the above',
    correct: 'b',
  },
];

// ---------------------------------------------------------------------------------------
// RELOAD
// ---------------------------------------------------------------------------------------

var questionCount = 0;
var timeLeft = 75;

// ---------------------------------------------------------------------------------------
// FUNCTION | TIMER
// ---------------------------------------------------------------------------------------

startEl.addEventListener('click', function (event) {
  var element = event.target;
  if (element.matches('button') === true) {
    sectionIntro.classList.toggle('hidden');
    sectionQuestions.classList.toggle('hidden');
    setQuestion(questionCount);
    countdown();
  }
});

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 1 && questionCount === quizData.length) {
      clearInterval(timeInterval);
      sectionQuestions.classList.add('hidden');
      sectionInitials.classList.remove('hidden');
      highscoreList();
      scoreCountSpan.textContent = `Your final score is: ${timeLeft + 1}`;
    } else if (timeLeft > 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = 75;
      clearInterval(timeInterval);
      sectionQuestions.classList.add('hidden');
      sectionGameOver.classList.remove('hidden');
    }
  }, 1000);
}

// ---------------------------------------------------------------------------------------
// FUNCTION | QUESTIONS + CHECK
// ---------------------------------------------------------------------------------------

// SETTING THE QUIZ DATA QUESTION & CHOICES
function setQuestion(id) {
  if (id < quizData.length) {
    quizQuestionEl.textContent = quizData[id].question;
    btnAnswer[0].textContent = quizData[id].a;
    btnAnswer[1].textContent = quizData[id].b;
    btnAnswer[2].textContent = quizData[id].c;
    btnAnswer[3].textContent = quizData[id].d;
  }
}

var btnAnswer = document.querySelectorAll('.answer');

// This function loops through the answer buttons and retrieves their assigned value
for (let i = 0; i < btnAnswer.length; i++)
  btnAnswer[i].addEventListener('click', function () {
    if (questionCount < quizData.length) {
      if (quizData[questionCount].correct === btnAnswer[i].value) {
        showWrongCorrect.textContent = 'Correct';
        questionCount++;
        setQuestion(questionCount);
      } else {
        showWrongCorrect.textContent = 'Wrong';
        timeLeft = timeLeft - 20;
        questionCount++;
        setQuestion(questionCount);
      }
    }
    setTimeout(function () {
      showWrongCorrect.textContent = '';
    }, 500);
  });

// ---------------------------------------------------------------------------------------
// SECTION | HIGH SCORES
// ---------------------------------------------------------------------------------------

var highscores = [];

function renderHighscores() {
  // Clear todoList element and update todoCountSpan
  scoreList.innerHTML = '';
  scoreCountSpan.textContent = highscores.length;

  // Render a new li for each todo
  for (var i = 0; i < highscores.length; i++) {
    var score = highscores[i];

    var li = document.createElement('li');
    li.textContent = score;
    li.setAttribute('data-index', i);

    scoreList.appendChild(li);
  }
}

// FUNCTION TO LOAD HIGHSCORES
function highscoreList() {
  var storedScores = JSON.parse(localStorage.getItem('highscores'));

  if (storedScores !== null) {
    highscores = storedScores;
  }

  renderHighscores();
}

function storeHighscores() {
  localStorage.setItem('highscores', JSON.stringify(highscores));
}

// SUBMIT SCORE | CLICK EVENT
btnSubmitScore.addEventListener('click', function (event) {
  event.preventDefault();

  sectionInitials.classList.toggle('hidden');
  sectionHighscore.classList.toggle('hidden');

  var initialsText = initialsInput.value.trim();

  if (initialsText === '') {
    return;
  }

  highscores.push(`${initialsText}: ${timeLeft + 1}`);

  initialsInput.value = '';

  storeHighscores();
  renderHighscores();
});

// CLEAR SCORES | CLICK EVENT

btnClearScore.addEventListener('click', function (event) {
  var element = event.target;
  if (element.matches('button') === true) {
    scoreCountSpan.textContent = 0;
    scoreList.innerHTML = '';
    localStorage.clear();
  }
});

// GO BACK | CLICK EVENT
btnGoBack.addEventListener('click', function (event) {
  var element = event.target;
  if (element.matches('button') === true) {
    reload();
  }
});

// HIGHSCORE | CLICK EVENT

btnHighscore.addEventListener('click', function (event) {
  var element = event.target;

  if (element.matches('button') === true && sectionHighscore.classList.contains('hidden')) {
    sectionIntro.classList.add('hidden');
    sectionQuestions.classList.add('hidden');
    sectionInitials.classList.add('hidden');
    sectionHighscore.classList.remove('hidden');
    sectionGameOver.classList.add('hidden');
    highscoreList();
  }
});

// GAMEOVER | CLICK EVENT
btnGameOver.addEventListener('click', function (event) {
  var element = event.target;
  if (element.matches('button') === true) {
    reload();
  }
});

// RELOAD GAME | CLICK EVENT

const reload = function () {
  location.reload();
};
