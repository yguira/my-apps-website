const questions = [
  {
    category: "General Knowledge",
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    category: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Saturn", "Jupiter"],
    correct: "Mars"
  },
  {
    category: "General Knowledge",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Mark Twain", "William Shakespeare", "Jane Austen", "Homer"],
    correct: "William Shakespeare"
  },
  {
    category: "General Knowledge",
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: "Blue Whale"
  },
  {
    category: "General Knowledge",
    question: "Which country invented tea?",
    choices: ["India", "China", "England", "Japan"],
    correct: "China"
  },
  {
    category: "General Knowledge",
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correct: "2"
  },
  {
    category: "General Knowledge",
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
  },
  {
    category: "General Knowledge",
    question: "How many continents are there on Earth?",
    choices: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    category: "General Knowledge",
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Osmium", "Oxygen", "Oxide", "Oregano"],
    correct: "Oxygen"
  },
  {
    category: "General Knowledge",
    question: "In what year did the first man land on the moon?",
    choices: ["1965", "1969", "1971", "1975"],
    correct: "1969"
  }
];

// DOM elements
const questionElem = document.getElementById("question");
const choicesElem = document.getElementById("choices");
const feedbackElem = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const questionBox = document.getElementById("question-box");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let timer;
let timeLeft = 10;

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuestions = shuffleArray([...questions]); // Copy & shuffle
  scoreBox.style.display = "none";
  nextBtn.textContent = "Next";
  nextBtn.style.display = "inline-block";
  questionBox.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;

  const current = shuffledQuestions[currentQuestionIndex];
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

  const correct = shuffledQuestions[currentQuestionIndex].correct;
  if (selected === correct) {
    feedbackElem.textContent = "✅ Correct!";
    feedbackElem.style.color = "green";
    score++;
  } else {
    feedbackElem.textContent = `❌ Oops! Correct answer: ${correct}`;
    feedbackElem.style.color = "red";
  }

  Array.from(choicesElem.children).forEach(btn => btn.disabled = true);
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionBox.style.display = "none";
  nextBtn.style.display = "none";
  scoreBox.style.display = "block";
  scoreBox.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>Your Score: ${score} / ${shuffledQuestions.length}</p>
    <button onclick="startQuiz()" class="quiz-button">🔁 Restart Quiz</button>
  `;
}

function startTimer() {
  feedbackElem.textContent = `⏳ Time left: ${timeLeft}s`;
  feedbackElem.style.color = "black";

  timer = setInterval(() => {
    timeLeft--;
    feedbackElem.textContent = `⏳ Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackElem.textContent = `⏰ Time's up! Correct answer: ${shuffledQuestions[currentQuestionIndex].correct}`;
      feedbackElem.style.color = "orange";
      Array.from(choicesElem.children).forEach(btn => btn.disabled = true);
      nextBtn.disabled = false;
    }
  }, 1000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize
startQuiz();
