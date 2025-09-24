const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Saturn", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Mark Twain", "William Shakespeare", "Jane Austen", "Homer"],
    correct: "William Shakespeare"
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: "Blue Whale"
  },
  {
    question: "Which country invented tea?",
    choices: ["India", "China", "England", "Japan"],
    correct: "China"
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correct: "2"
  },
  {
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
  },
  {
    question: "How many continents are there on Earth?",
    choices: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Osmium", "Oxygen", "Oxide", "Oregano"],
    correct: "Oxygen"
  },
  {
    question: "In what year did the first man land on the moon?",
    choices: ["1965", "1969", "1971", "1975"],
    correct: "1969"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElem = document.getElementById("question");
const choicesElem = document.getElementById("choices");
const feedbackElem = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

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
}

function checkAnswer(selected) {
  const correct = questions[currentQuestionIndex].correct;
  if (selected === correct) {
    feedbackElem.textContent = "✅ Correct!";
    feedbackElem.style.color = "green";
    score++;
  } else {
    feedbackElem.textContent = `❌ Oops! Correct answer: ${correct}`;
    feedbackElem.style.color = "red";
  }

  // Disable all answer buttons
  Array.from(choicesElem.children).forEach(btn => btn.disabled = true);

  nextBtn.disabled = false;
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
  nextBtn.style.display = "none";
  scoreBox.style.display = "block";
  scoreBox.innerHTML = `<h2>🎉 Quiz Completed!</h2><p>Your Score: ${score} / ${questions.length}</p>`;
}

// Start quiz
loadQuestion();
