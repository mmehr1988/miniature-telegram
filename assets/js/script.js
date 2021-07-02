'use strict';

// -------------------------------------------------------
// GAME SETTINGS
// -------------------------------------------------------

var cTime = 75;
var qCount = 0;
var score = 0;

// -------------------------------------------------------
// VARIABLES DISPLAYED IN THE SEQUENCE OF EVENTS OCCURING
// -------------------------------------------------------

var queryElement = (element) => {
  return document.querySelector(element);
};

// VARIABLES | SECTION = QUESTIONS
var secQuestion = queryElement('.section-questions');
var questionEl = queryElement('.quizDataQuestion');
var btnAnswer = document.querySelectorAll('.answer');

var wrongCorrect = queryElement('.wrong-correct');

// VARIABLES | SECTION = INTRO
var secIntro = queryElement('.section-intro');
var btnStartQuiz = queryElement('.start-quiz');
var navTime = queryElement('.nav-time');
var btnHighscore = queryElement('.nav-highscore');

// VARIABLES | SECTION = INITIALS
var secInitials = queryElement('.section-initials');
var btnSubmit = queryElement('.submit-score');
var initialsInput = queryElement('#initials-text');
var initialsInput = queryElement('#initials-text');

// VARIABLES | SECTION = HIGHSCORES
var secHighscores = queryElement('.section-highscore');
var highscoreList = queryElement('.highscore-list');
var btnClearScore = queryElement('.clear-score');
var btnGoBack = queryElement('.go-back');

// VARIABLES | SECTION = GAMEOVER
var secGameOver = queryElement('.section-gameover');
var btnGameOver = queryElement('.game-over');

// -------------------------------------------------------
// TO START QUIZ
// -------------------------------------------------------

let timeTicker;
btnStartQuiz.addEventListener('click', () => {
  secIntro.classList.add('hidden');
  secQuestion.classList.remove('hidden');
  setQuestion(qCount);
  timeTicker = setInterval(countdown, 1000);
  init();
});

// -------------------------------------------------------
// KEEP TRACK OF TIME SO LONG AS TIME > 0
//-------------------------------------------------------

function countdown() {
  if (cTime > 0) {
    cTime--;
    navTime.textContent = cTime;
  } else {
    clearInterval(timeTicker);
    secQuestion.classList.add('hidden');
    secGameOver.classList.remove('hidden');
  }
}

// -------------------------------------------------------
// QUIZ DATA PULL BASED ON BUTTON CLICK
// -------------------------------------------------------

function setQuestion(id) {
  if (id < quizData.length) {
    questionEl.textContent = quizData[id].question;
    btnAnswer[0].textContent = quizData[id].a;
    btnAnswer[1].textContent = quizData[id].b;
    btnAnswer[2].textContent = quizData[id].c;
    btnAnswer[3].textContent = quizData[id].d;
  }
}
// -------------------------------------------------------

let showWrongCorrect = () => {
  setTimeout(function () {
    wrongCorrect.innerHTML = '';
  }, 1000);
};

var finalScore = queryElement('.finalScore');

// listens to each click of the answer buttons and questions change accordingly
for (let i = 0; i < btnAnswer.length; i++) {
  btnAnswer[i].addEventListener('click', () => {
    if (qCount < quizData.length - 1) {
      if (quizData[qCount].correct === btnAnswer[i].value) {
        wrongCorrect.innerHTML = 'Correct';
        showWrongCorrect();
        qCount++;
        setQuestion(qCount);
      } else {
        wrongCorrect.innerHTML = 'Wrong';
        cTime = cTime - 20;
        showWrongCorrect();
        qCount++;
        setQuestion(qCount);
      }
    } else {
      clearInterval(timeTicker);
      secQuestion.classList.add('hidden');
      secInitials.classList.remove('hidden');
      navTime.textContent = cTime;
      score = cTime;
      finalScore.textContent = score;
    }
  });
}

// -------------------------------------------------------
// HIGHSCORES + LOCAL STORAGE
// -------------------------------------------------------

var highscoresArray = [];

function renderHighscores() {
  highscoreList.innerHTML = '';

  // Loop to create a new li for each highscore submitted
  for (var i = 0; i < highscoresArray.length; i++) {
    var li = document.createElement('li');
    // Used turnery operator to display within text when appending li. This drove me crazy a little
    li.textContent = `${highscoresArray[i].initialsText}: ${highscoresArray[i].score}`;
    li.setAttribute('data-index', i);

    highscoreList.appendChild(li);
  }
}
// Load highscores from local storage
function init() {
  var storedHighscores = JSON.parse(localStorage.getItem('highscoresArray'));

  if (storedHighscores !== null) {
    highscoresArray = storedHighscores;
  }
  renderHighscores();
}
// To store to local storage
function storeHighscores() {
  localStorage.setItem('highscoresArray', JSON.stringify(highscoresArray));
}

// -------------------------------------------------------
// FOR SUBMITTING HIGHSCORES
// -------------------------------------------------------

btnSubmit.addEventListener('click', () => {
  var initialsText = initialsInput.value.trim();

  if (initialsText === '') {
    return '';
  } else {
    highscoresArray.push({
      initialsText: initialsText,
      score: score,
    });

    // For sorting the values in local storage
    highscoresArray = highscoresArray.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });

    secInitials.classList.add('hidden');
    secHighscores.classList.remove('hidden');
    initialsInput.value = '';
    storeHighscores();
    renderHighscores();
  }
});

// -------------------------------------------------------
// QUIZ APP MAIN BUTTONS | CLICK EVENT
// -------------------------------------------------------

// HIGH SCORE BUTTON | CLICK EVENT
btnHighscore.addEventListener('click', () => {
  if (secHighscores.classList.contains('hidden')) {
    secIntro.classList.add('hidden');
    secQuestion.classList.add('hidden');
    secInitials.classList.add('hidden');
    secHighscores.classList.remove('hidden');
    secGameOver.classList.add('hidden');
    init();
  }
});

// CLEAR SCORES BUTTON | CLICK EVENT
btnClearScore.addEventListener('click', () => {
  clearInterval(timeTicker);
  highscoreList.innerHTML = '';
  localStorage.clear();
});

// GO BACK BUTTON | CLICK EVENT
btnGoBack.addEventListener('click', () => {
  reload();
});

// GAMEOVER BUTTON | CLICK EVENT
btnGameOver.addEventListener('click', () => {
  reload();
});

// -------------------------------------------------------
// RELOAD GAME FUNCTION
// -------------------------------------------------------

const reload = function () {
  location.reload();
};
