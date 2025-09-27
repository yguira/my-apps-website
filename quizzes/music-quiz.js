const questions = [
  {
    question: "Who is known as the King of Pop?",
    choices: ["Michael Jackson", "Elvis Presley", "Prince", "Justin Timberlake"],
    correct: "Michael Jackson"
  },
  {
    question: "Which band released the song 'Bohemian Rhapsody'?",
    choices: ["The Beatles", "Queen", "Pink Floyd", "Aerosmith"],
    correct: "Queen"
  },
  {
    question: "Who sang 'Rolling in the Deep'?",
    choices: ["Adele", "Beyoncé", "Rihanna", "Taylor Swift"],
    correct: "Adele"
  },
  {
    question: "Which instrument does Elton John famously play?",
    choices: ["Guitar", "Violin", "Piano", "Drums"],
    correct: "Piano"
  },
  {
    question: "What is the stage name of Marshall Mathers?",
    choices: ["Dr. Dre", "50 Cent", "Eminem", "Jay-Z"],
    correct: "Eminem"
  },
  {
    question: "Which female artist released the album '1989'?",
    choices: ["Katy Perry", "Ariana Grande", "Taylor Swift", "Dua Lipa"],
    correct: "Taylor Swift"
  },
  {
    question: "What was The Beatles’ first hit single?",
    choices: ["Yesterday", "Love Me Do", "Let It Be", "Hey Jude"],
    correct: "Love Me Do"
  },
  {
    question: "Which rapper is famous for the song 'Sicko Mode'?",
    choices: ["Drake", "Kanye West", "Travis Scott", "Lil Nas X"],
    correct: "Travis Scott"
  },
  {
    question: "Who composed the Four Seasons?",
    choices: ["Bach", "Mozart", "Vivaldi", "Beethoven"],
    correct: "Vivaldi"
  },
  {
    question: "Which K-pop group performed 'Dynamite'?",
    choices: ["EXO", "BLACKPINK", "BTS", "TWICE"],
    correct: "BTS"
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
