const questions = [
  {
    question: "Which movie features the quote, 'I'll be back'?",
    choices: ["RoboCop", "Die Hard", "The Terminator", "Predator"],
    correct: "The Terminator"
  },
  {
    question: "Who directed the movie 'Inception'?",
    choices: ["Steven Spielberg", "Martin Scorsese", "Christopher Nolan", "James Cameron"],
    correct: "Christopher Nolan"
  },
  {
    question: "Which actor played Jack in 'Titanic'?",
    choices: ["Brad Pitt", "Leonardo DiCaprio", "Matt Damon", "Tom Cruise"],
    correct: "Leonardo DiCaprio"
  },
  {
    question: "In which movie would you hear 'Why so serious?'",
    choices: ["The Dark Knight", "Joker", "Suicide Squad", "Batman Begins"],
    correct: "The Dark Knight"
  },
  {
    question: "What is the highest-grossing movie of all time (as of 2025)?",
    choices: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
    correct: "Avatar"
  },
  {
    question: "Which movie won Best Picture at the 2020 Oscars?",
    choices: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correct: "Parasite"
  },
  {
    question: "Which franchise includes the character 'Legolas'?",
    choices: ["Harry Potter", "The Hobbit", "The Lord of the Rings", "Narnia"],
    correct: "The Lord of the Rings"
  },
  {
    question: "What is the name of the kingdom in Disney's 'Frozen'?",
    choices: ["Arendelle", "Genovia", "Corona", "Narnia"],
    correct: "Arendelle"
  },
  {
    question: "Which actor plays Deadpool?",
    choices: ["Chris Pratt", "Ryan Reynolds", "Chris Evans", "Hugh Jackman"],
    correct: "Ryan Reynolds"
  },
  {
    question: "Which film begins with a boy receiving a golden ticket?",
    choices: ["Harry Potter", "Charlie and the Chocolate Factory", "Matilda", "The Goonies"],
    correct: "Charlie and the Chocolate Factory"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Shuffle the questions array before starting
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// DOM Elements
const questionElem = document.getElementById("question");
const choicesElem = document.getElementById("choices");
const feedbackElem = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

// Timer display
const timerElem = document.createElement("div");
timerElem.id = "timer";
timerElem.style.fontWeight = "bold";
timerElem.style.marginTop = "10px";
questionElem.insertAdjacentElement("afterend", timerElem);

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerElem.textContent = `⏱️ Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElem.textContent = `⏱️ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackElem.textContent = `⏳ Time's up! Correct answer: ${questions[currentQuestionIndex].correct}`;
      feedbackElem.style.color = "orange";
      disableChoices();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  questionElem.textContent = current.question;
  choicesElem.innerHTML = "";
  feedbackElem.textContent = "";
  nextBtn.disabled = true;

  current.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "quiz-button";
    btn.onclick = () => checkAnswer(choice);
    choicesElem.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestionIndex].correct;
  if (selected === correct) {
    feedbackElem.textContent = "✅ Correct!";
    feedbackElem.style.color = "green";
    score++;
  } else {
    feedbackElem.textContent = `❌ Incorrect! Correct answer: ${correct}`;
    feedbackElem.style.color = "red";
  }

  disableChoices();
  nextBtn.disabled = false;
}

function disableChoices() {
  Array.from(choicesElem.children).forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById("question-box").style.display = "none";
  timerElem.style.display = "none";
  nextBtn.style.display = "none";
  scoreBox.style.display = "block";
  scoreBox.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>Your Score: ${score} / ${questions.length}</p>
    <button onclick="resetQuiz()" class="quiz-button">🔁 Try Again</button>
  `;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreBox.style.display = "none";
  document.getElementById("question-box").style.display = "block";
  nextBtn.style.display = "inline-block";
  timerElem.style.display = "block";
  shuffle(questions);
  loadQuestion();
}

// Initialize Quiz
shuffle(questions);
loadQuestion();
