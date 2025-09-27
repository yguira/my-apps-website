const questions = [
  {
    question: "Who was the first President of the United States?",
    choices: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correct: "George Washington"
  },
  {
    question: "In which year did World War II end?",
    choices: ["1940", "1945", "1939", "1950"],
    correct: "1945"
  },
  {
    question: "Which empire built the Colosseum?",
    choices: ["Greek Empire", "Roman Empire", "Ottoman Empire", "Byzantine Empire"],
    correct: "Roman Empire"
  },
  {
    question: "What was the name of the ship on which the Pilgrims traveled to America in 1620?",
    choices: ["Titanic", "Santa Maria", "Mayflower", "Beagle"],
    correct: "Mayflower"
  },
  {
    question: "Who was the British Prime Minister during most of World War II?",
    choices: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"],
    correct: "Winston Churchill"
  },
  {
    question: "Which ancient civilization built Machu Picchu?",
    choices: ["Aztec", "Inca", "Maya", "Olmec"],
    correct: "Inca"
  },
  {
    question: "The Great Fire of London occurred in which year?",
    choices: ["1666", "1766", "1566", "1866"],
    correct: "1666"
  },
  {
    question: "What wall separated East and West Berlin until 1989?",
    choices: ["Iron Curtain", "Berlin Wall", "Wall of Shame", "Cold Barrier"],
    correct: "Berlin Wall"
  },
  {
    question: "Who was the first human to journey into outer space?",
    choices: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
    correct: "Yuri Gagarin"
  },
  {
    question: "Which revolution is associated with the slogan 'Liberty, Equality, Fraternity'?",
    choices: ["American Revolution", "Russian Revolution", "French Revolution", "Industrial Revolution"],
    correct: "French Revolution"
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
    // ✅ Scroll to quiz container on mobile
  const quizContainer = document.getElementById("question-box");
  if (quizContainer) {
    setTimeout(() => {
      quizContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // delay to ensure buttons render first
  }

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
