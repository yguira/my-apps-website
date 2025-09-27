const questions = [
  {
    question: "Who is known as the father of the computer?",
    choices: ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"],
    correct: "Charles Babbage"
  },
  {
    question: "What does 'HTML' stand for?",
    choices: [
      "HyperText Markup Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language"
    ],
    correct: "HyperText Markup Language"
  },
  {
    question: "Which programming language is known as the backbone of web development?",
    choices: ["Python", "Java", "JavaScript", "C++"],
    correct: "JavaScript"
  },
  {
    question: "What year was the first iPhone released?",
    choices: ["2005", "2007", "2008", "2010"],
    correct: "2007"
  },
  {
    question: "What does CPU stand for?",
    choices: [
      "Central Process Unit",
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Processing Unit"
    ],
    correct: "Central Processing Unit"
  },
  {
    question: "What company developed the Windows operating system?",
    choices: ["Apple", "Microsoft", "Google", "IBM"],
    correct: "Microsoft"
  },
  {
    question: "Which of these is NOT a programming language?",
    choices: ["Ruby", "Python", "Anaconda", "Java"],
    correct: "Anaconda"
  },
  {
    question: "What does 'AI' stand for in technology?",
    choices: [
      "Artificial Intelligence",
      "Automated Input",
      "Advanced Integration",
      "Applied Informatics"
    ],
    correct: "Artificial Intelligence"
  },
  {
    question: "Which social media platform was created first?",
    choices: ["Facebook", "Twitter", "LinkedIn", "MySpace"],
    correct: "MySpace"
  },
  {
    question: "What is 'HTTP' used for?",
    choices: [
      "HyperText Transfer Protocol",
      "HyperText Transmission Protocol",
      "Hyperlink Transfer Protocol",
      "Hyper Tool Transfer Protocol"
    ],
    correct: "HyperText Transfer Protocol"
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
  shuffle(questions); // Shuffle again on reset
  loadQuestion();
}

// Initialize Quiz
shuffle(questions);
loadQuestion();
