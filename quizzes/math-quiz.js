const questions = [
  {
    question: "What is 12 × 3?",
    choices: ["36", "24", "48", "33"],
    correct: "36"
  },
  {
    question: "What is 100 ÷ 4?",
    choices: ["20", "25", "30", "22"],
    correct: "25"
  },
  {
    question: "What is 15 + 27?",
    choices: ["42", "43", "41", "40"],
    correct: "42"
  },
  {
    question: "What is the square root of 81?",
    choices: ["8", "9", "7", "6"],
    correct: "9"
  },
  {
    question: "What is 50% of 200?",
    choices: ["50", "100", "75", "150"],
    correct: "100"
  },
  {
    question: "What is 7²?",
    choices: ["49", "42", "56", "36"],
    correct: "49"
  },
  {
    question: "What is 90 - 45?",
    choices: ["40", "35", "45", "55"],
    correct: "45"
  },
  {
    question: "What is 8 × 7?",
    choices: ["54", "56", "58", "64"],
    correct: "56"
  },
  {
    question: "What is 144 ÷ 12?",
    choices: ["12", "10", "14", "11"],
    correct: "12"
  },
  {
    question: "What is 3³ (3 to the power of 3)?",
    choices: ["6", "9", "27", "18"],
    correct: "27"
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
  shuffle(questions); // Shuffle again on reset
  loadQuestion();
}

// Initialize Quiz
shuffle(questions);
loadQuestion();
