const questions = [
  // =========================
  // EASY
  // =========================
  {
    category: "Geography",
    difficulty: "easy",
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    category: "Science",
    difficulty: "easy",
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Saturn", "Jupiter"],
    correct: "Mars"
  },
  {
    category: "Literature",
    difficulty: "easy",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Mark Twain", "William Shakespeare", "Jane Austen", "Homer"],
    correct: "William Shakespeare"
  },
  {
    category: "Nature",
    difficulty: "easy",
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: "Blue Whale"
  },
  {
    category: "History",
    difficulty: "easy",
    question: "Which country is commonly credited with inventing tea drinking?",
    choices: ["India", "China", "England", "Japan"],
    correct: "China"
  },
  {
    category: "Math",
    difficulty: "easy",
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correct: "2"
  },
  {
    category: "Geography",
    difficulty: "easy",
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
  },
  {
    category: "Geography",
    difficulty: "easy",
    question: "How many continents are there on Earth?",
    choices: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    category: "Science",
    difficulty: "easy",
    question: "Which element has the chemical symbol O?",
    choices: ["Osmium", "Oxygen", "Oxide", "Gold"],
    correct: "Oxygen"
  },
  {
    category: "History",
    difficulty: "easy",
    question: "In what year did humans first land on the Moon?",
    choices: ["1965", "1969", "1971", "1975"],
    correct: "1969"
  },
  {
    category: "Geography",
    difficulty: "easy",
    question: "Which country has the city of Tokyo as its capital?",
    choices: ["China", "Japan", "South Korea", "Thailand"],
    correct: "Japan"
  },
  {
    category: "Science",
    difficulty: "easy",
    question: "What gas do humans need to breathe to survive?",
    choices: ["Carbon Dioxide", "Oxygen", "Hydrogen", "Helium"],
    correct: "Oxygen"
  },
  {
    category: "Animals",
    difficulty: "easy",
    question: "Which animal is known for having black and white stripes?",
    choices: ["Tiger", "Zebra", "Leopard", "Panda"],
    correct: "Zebra"
  },
  {
    category: "Math",
    difficulty: "easy",
    question: "What is 12 × 8?",
    choices: ["86", "94", "96", "108"],
    correct: "96"
  },
  {
    category: "Technology",
    difficulty: "easy",
    question: "What does CPU stand for?",
    choices: [
      "Central Processing Unit",
      "Computer Personal Utility",
      "Central Program User",
      "Core Processing Utility"
    ],
    correct: "Central Processing Unit"
  },
  {
    category: "Geography",
    difficulty: "easy",
    question: "Which continent is Egypt located in?",
    choices: ["Asia", "Europe", "Africa", "South America"],
    correct: "Africa"
  },
  {
    category: "Food",
    difficulty: "easy",
    question: "Which fruit is traditionally used to make guacamole?",
    choices: ["Mango", "Avocado", "Lime", "Cucumber"],
    correct: "Avocado"
  },

  // =========================
  // MEDIUM
  // =========================
  {
    category: "Science",
    difficulty: "medium",
    question: "Which planet has the shortest day in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
  },
  {
    category: "History",
    difficulty: "medium",
    question: "Which empire built Machu Picchu?",
    choices: ["Aztec", "Roman", "Inca", "Maya"],
    correct: "Inca"
  },
  {
    category: "Geography",
    difficulty: "medium",
    question: "What is the longest river in South America?",
    choices: ["Amazon", "Orinoco", "Paraná", "São Francisco"],
    correct: "Amazon"
  },
  {
    category: "Science",
    difficulty: "medium",
    question: "What is the hardest natural substance?",
    choices: ["Quartz", "Diamond", "Granite", "Steel"],
    correct: "Diamond"
  },
  {
    category: "Technology",
    difficulty: "medium",
    question: "What does HTTP stand for?",
    choices: [
      "HyperText Transfer Protocol",
      "High Transfer Text Process",
      "Hyper Terminal Transmission Program",
      "Host Transfer Technology Protocol"
    ],
    correct: "HyperText Transfer Protocol"
  },
  {
    category: "Geography",
    difficulty: "medium",
    question: "Which country has the most people in South America?",
    choices: ["Argentina", "Colombia", "Peru", "Brazil"],
    correct: "Brazil"
  },
  {
    category: "History",
    difficulty: "medium",
    question: "Who was the first president of the United States?",
    choices: [
      "Thomas Jefferson",
      "George Washington",
      "Abraham Lincoln",
      "John Adams"
    ],
    correct: "George Washington"
  },
  {
    category: "Science",
    difficulty: "medium",
    question: "Which part of the cell contains most of its genetic material?",
    choices: ["Cell Wall", "Nucleus", "Ribosome", "Cytoplasm"],
    correct: "Nucleus"
  },
  {
    category: "Math",
    difficulty: "medium",
    question: "What is the square root of 144?",
    choices: ["10", "11", "12", "14"],
    correct: "12"
  },
  {
    category: "Language",
    difficulty: "medium",
    question: "Which language has the most native speakers worldwide?",
    choices: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correct: "Mandarin Chinese"
  },
  {
    category: "Astronomy",
    difficulty: "medium",
    question: "What is the closest star to Earth after the Sun?",
    choices: ["Sirius", "Betelgeuse", "Proxima Centauri", "Polaris"],
    correct: "Proxima Centauri"
  },
  {
    category: "Geography",
    difficulty: "medium",
    question: "Which country is home to the ancient city of Petra?",
    choices: ["Egypt", "Jordan", "Greece", "Turkey"],
    correct: "Jordan"
  },
  {
    category: "Biology",
    difficulty: "medium",
    question: "Which organ produces insulin?",
    choices: ["Liver", "Kidney", "Pancreas", "Spleen"],
    correct: "Pancreas"
  },
  {
    category: "History",
    difficulty: "medium",
    question: "The Renaissance began in which country?",
    choices: ["France", "Italy", "Spain", "Germany"],
    correct: "Italy"
  },
  {
    category: "Physics",
    difficulty: "medium",
    question: "What is the unit of electrical resistance?",
    choices: ["Volt", "Ampere", "Ohm", "Watt"],
    correct: "Ohm"
  },
  {
    category: "Computing",
    difficulty: "medium",
    question: "Which number system is used internally by digital computers?",
    choices: ["Decimal", "Binary", "Roman", "Duodecimal"],
    correct: "Binary"
  },
  {
    category: "Geography",
    difficulty: "medium",
    question: "Which desert is the largest hot desert in the world?",
    choices: ["Gobi", "Kalahari", "Sahara", "Arabian"],
    correct: "Sahara"
  },

  // =========================
  // HARD
  // =========================
  {
    category: "Chemistry",
    difficulty: "hard",
    question: "Which element has the highest melting point among pure metals?",
    choices: ["Iron", "Tungsten", "Titanium", "Platinum"],
    correct: "Tungsten"
  },
  {
    category: "History",
    difficulty: "hard",
    question: "Which treaty formally ended World War I between Germany and the Allied Powers?",
    choices: [
      "Treaty of Paris",
      "Treaty of Versailles",
      "Treaty of Vienna",
      "Treaty of Utrecht"
    ],
    correct: "Treaty of Versailles"
  },
  {
    category: "Geography",
    difficulty: "hard",
    question: "Which country has the most natural lakes?",
    choices: ["Russia", "Canada", "United States", "Finland"],
    correct: "Canada"
  },
  {
    category: "Astronomy",
    difficulty: "hard",
    question: "Which planet has the most prominent ring system?",
    choices: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: "Saturn"
  },
  {
    category: "Biology",
    difficulty: "hard",
    question: "Which blood type is known as the universal red-cell donor?",
    choices: ["AB Positive", "O Positive", "O Negative", "A Negative"],
    correct: "O Negative"
  },
  {
    category: "Science",
    difficulty: "hard",
    question: "Which scientist developed the three laws of planetary motion?",
    choices: [
      "Galileo Galilei",
      "Johannes Kepler",
      "Isaac Newton",
      "Nicolaus Copernicus"
    ],
    correct: "Johannes Kepler"
  },
  {
    category: "Geography",
    difficulty: "hard",
    question: "What is the capital of Mongolia?",
    choices: ["Astana", "Ulaanbaatar", "Tashkent", "Bishkek"],
    correct: "Ulaanbaatar"
  },
  {
    category: "Literature",
    difficulty: "hard",
    question: "Who wrote 'The Brothers Karamazov'?",
    choices: [
      "Leo Tolstoy",
      "Fyodor Dostoevsky",
      "Anton Chekhov",
      "Nikolai Gogol"
    ],
    correct: "Fyodor Dostoevsky"
  },
  {
    category: "Physics",
    difficulty: "hard",
    question: "Which particle carries the electromagnetic force?",
    choices: ["Electron", "Photon", "Neutron", "Proton"],
    correct: "Photon"
  },
  {
    category: "History",
    difficulty: "hard",
    question: "Which civilization used quipu for record keeping?",
    choices: ["Maya", "Inca", "Aztec", "Phoenician"],
    correct: "Inca"
  },
  {
    category: "Geography",
    difficulty: "hard",
    question: "Which strait separates Asia from North America?",
    choices: [
      "Strait of Gibraltar",
      "Bering Strait",
      "Bosporus",
      "Strait of Malacca"
    ],
    correct: "Bering Strait"
  },
  {
    category: "Chemistry",
    difficulty: "hard",
    question: "What is the atomic number of gold?",
    choices: ["47", "78", "79", "82"],
    correct: "79"
  },
  {
    category: "Math",
    difficulty: "hard",
    question: "What is the value of 2 to the 10th power?",
    choices: ["512", "1000", "1024", "2048"],
    correct: "1024"
  },
  {
    category: "Technology",
    difficulty: "hard",
    question: "Which protocol is primarily used to securely browse websites?",
    choices: ["FTP", "SMTP", "HTTPS", "SSH"],
    correct: "HTTPS"
  },
  {
    category: "Science",
    difficulty: "hard",
    question: "What is the name of the boundary around a black hole beyond which nothing can escape?",
    choices: [
      "Photon Belt",
      "Event Horizon",
      "Gravity Core",
      "Singularity Ring"
    ],
    correct: "Event Horizon"
  },
  {
    category: "History",
    difficulty: "hard",
    question: "Which ancient civilization built the city of Carthage?",
    choices: ["Phoenicians", "Romans", "Greeks", "Persians"],
    correct: "Phoenicians"
  }
];

// =========================
// DOM ELEMENTS
// =========================
const questionElem = document.getElementById("question");
const choicesElem = document.getElementById("choices");
const feedbackElem = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const questionBox = document.getElementById("question-box");

const progressElem = document.getElementById("quiz-progress");
const categoryElem = document.getElementById("quiz-category");
const streakElem = document.getElementById("streak-display");
const lifelineBtn = document.getElementById("fifty-btn");

// =========================
// QUIZ STATE
// =========================
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;

let quizQuestions = [];

let timer;
let timeLeft = 10;

let questionAnswered = false;
let fiftyUsed = false;

// =========================
// START QUIZ
// =========================
function startQuiz() {
  clearInterval(timer);

  score = 0;
  streak = 0;
  bestStreak = 0;
  currentQuestionIndex = 0;
  fiftyUsed = false;

  quizQuestions = getQuizQuestions();

  scoreBox.style.display = "none";
  questionBox.style.display = "block";

  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Next";
  nextBtn.disabled = true;

  lifelineBtn.style.display = "inline-block";
  lifelineBtn.disabled = false;
  lifelineBtn.textContent = "🎯 50/50 Lifeline";

  updateStreakDisplay();
  loadQuestion();
}

// =========================
// SELECT 10 BALANCED QUESTIONS
// 3 Easy + 4 Medium + 3 Hard
// =========================
function getQuizQuestions() {
  const easy = shuffleArray(
    questions.filter(q => q.difficulty === "easy")
  ).slice(0, 3);

  const medium = shuffleArray(
    questions.filter(q => q.difficulty === "medium")
  ).slice(0, 4);

  const hard = shuffleArray(
    questions.filter(q => q.difficulty === "hard")
  ).slice(0, 3);

  return shuffleArray([...easy, ...medium, ...hard]);
}

// =========================
// LOAD QUESTION
// =========================
function loadQuestion() {
  clearInterval(timer);

  questionAnswered = false;

  const current = quizQuestions[currentQuestionIndex];

  // Time based on difficulty
  if (current.difficulty === "easy") {
    timeLeft = 9;
  } else if (current.difficulty === "medium") {
    timeLeft = 11;
  } else {
    timeLeft = 13;
  }

  progressElem.textContent =
    `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

  categoryElem.textContent =
    `${current.category} • ${current.difficulty.toUpperCase()}`;

  questionElem.textContent = current.question;

  choicesElem.innerHTML = "";
  feedbackElem.textContent = "";

  nextBtn.disabled = true;

  if (!fiftyUsed) {
    lifelineBtn.disabled = false;
  }

  const shuffledChoices = shuffleArray([...current.choices]);

  shuffledChoices.forEach(choice => {
    const btn = document.createElement("button");

    btn.textContent = choice;
    btn.className = "quiz-button";

    btn.dataset.answer = choice;

    btn.onclick = () => checkAnswer(choice, btn);

    choicesElem.appendChild(btn);
  });

  startTimer();

  // Scroll into view on mobile
  setTimeout(() => {
    questionBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}

// =========================
// CHECK ANSWER
// =========================
function checkAnswer(selected, selectedButton) {
  if (questionAnswered) return;

  questionAnswered = true;
  clearInterval(timer);

  const current = quizQuestions[currentQuestionIndex];
  const correct = current.correct;

  const buttons = Array.from(choicesElem.children);

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.dataset.answer === correct) {
      btn.classList.add("correct-answer");
    }
  });

  if (selected === correct) {
    score++;
    streak++;

    if (streak > bestStreak) {
      bestStreak = streak;
    }

    if (streak >= 5) {
      feedbackElem.textContent =
        `✅ Correct! 🔥 ${streak} in a row — you're on fire!`;
    } else if (streak >= 3) {
      feedbackElem.textContent =
        `✅ Correct! 🔥 ${streak} question streak!`;
    } else {
      feedbackElem.textContent = "✅ Correct!";
    }

    feedbackElem.style.color = "green";
  } else {
    streak = 0;

    selectedButton.classList.add("wrong-answer");

    feedbackElem.textContent =
      `❌ Not quite! Correct answer: ${correct}`;

    feedbackElem.style.color = "red";
  }

  updateStreakDisplay();

  lifelineBtn.disabled = true;
  nextBtn.disabled = false;
}

// =========================
// NEXT QUESTION
// =========================
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// =========================
// TIMER
// =========================
function startTimer() {
  feedbackElem.textContent = `⏳ Time left: ${timeLeft}s`;
  feedbackElem.style.color = "#1f2937";

  timer = setInterval(() => {
    timeLeft--;

    feedbackElem.textContent = `⏳ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);

      questionAnswered = true;
      streak = 0;

      updateStreakDisplay();

      const correct =
        quizQuestions[currentQuestionIndex].correct;

      feedbackElem.textContent =
        `⏰ Time's up! Correct answer: ${correct}`;

      feedbackElem.style.color = "darkorange";

      Array.from(choicesElem.children).forEach(btn => {
        btn.disabled = true;

        if (btn.dataset.answer === correct) {
          btn.classList.add("correct-answer");
        }
      });

      lifelineBtn.disabled = true;
      nextBtn.disabled = false;
    }
  }, 1000);
}

// =========================
// 50 / 50 LIFELINE
// =========================
function useFiftyFifty() {
  if (fiftyUsed || questionAnswered) return;

  const current = quizQuestions[currentQuestionIndex];
  const correct = current.correct;

  const wrongButtons = Array.from(choicesElem.children)
    .filter(btn => btn.dataset.answer !== correct);

  const shuffledWrong = shuffleArray([...wrongButtons]);

  // Hide two wrong answers
  shuffledWrong.slice(0, 2).forEach(btn => {
    btn.style.visibility = "hidden";
    btn.disabled = true;
  });

  fiftyUsed = true;

  lifelineBtn.disabled = true;
  lifelineBtn.textContent = "✅ 50/50 Used";
}

// =========================
// STREAK DISPLAY
// =========================
function updateStreakDisplay() {
  if (streak >= 2) {
    streakElem.textContent = `🔥 Current streak: ${streak}`;
  } else {
    streakElem.textContent = "";
  }
}

// =========================
// FINAL SCORE
// =========================
function showScore() {
  clearInterval(timer);

  questionBox.style.display = "none";
  nextBtn.style.display = "none";
  lifelineBtn.style.display = "none";

  scoreBox.style.display = "block";

  const rating = getRank(score, quizQuestions.length);
  const percentage =
    Math.round((score / quizQuestions.length) * 100);

  scoreBox.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>

    <p class="final-score">
      Your Score:
      <strong>${score} / ${quizQuestions.length}</strong>
    </p>

    <p>
      ${percentage}% correct
    </p>

    <p class="quiz-rank">
      ${rating}
    </p>

    <p>
      🔥 Best streak: ${bestStreak}
    </p>

    <button onclick="startQuiz()" class="quiz-button">
      🔁 Play Again
    </button>
  `;

  scoreBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// =========================
// FUN SCORE RANKINGS
// =========================
function getRank(score, total) {
  const percent = (score / total) * 100;

  if (percent === 100) {
    return "🏆 Perfect score! Are you secretly a trivia machine?";
  }

  if (percent >= 90) {
    return "🧠 Outstanding! Your brain definitely showed up today.";
  }

  if (percent >= 80) {
    return "😎 Excellent! You really know your stuff.";
  }

  if (percent >= 70) {
    return "👏 Very solid! Just a couple tricky ones got you.";
  }

  if (percent >= 60) {
    return "🙂 Nice work! You're comfortably above quiz survival level.";
  }

  if (percent >= 50) {
    return "🤔 Not bad! A rematch could get interesting.";
  }

  if (percent >= 30) {
    return "😅 The quiz landed a few punches this time.";
  }

  return "😂 The quiz won this round. Definitely time for a rematch.";
}

// =========================
// SHUFFLE HELPER
// =========================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] =
      [array[j], array[i]];
  }

  return array;
}

// =========================
// INITIALIZE
// =========================
startQuiz();
