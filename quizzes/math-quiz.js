const questions = [
  // =========================
  // EASY
  // =========================
  {
    category: "Multiplication",
    difficulty: "easy",
    question: "What is 12 × 3?",
    choices: ["36", "24", "48", "33"],
    correct: "36"
  },
  {
    category: "Division",
    difficulty: "easy",
    question: "What is 100 ÷ 4?",
    choices: ["20", "25", "30", "22"],
    correct: "25"
  },
  {
    category: "Addition",
    difficulty: "easy",
    question: "What is 15 + 27?",
    choices: ["42", "43", "41", "40"],
    correct: "42"
  },
  {
    category: "Square Roots",
    difficulty: "easy",
    question: "What is the square root of 81?",
    choices: ["8", "9", "7", "6"],
    correct: "9"
  },
  {
    category: "Percentages",
    difficulty: "easy",
    question: "What is 50% of 200?",
    choices: ["50", "100", "75", "150"],
    correct: "100"
  },
  {
    category: "Exponents",
    difficulty: "easy",
    question: "What is 7²?",
    choices: ["49", "42", "56", "36"],
    correct: "49"
  },
  {
    category: "Subtraction",
    difficulty: "easy",
    question: "What is 90 - 45?",
    choices: ["40", "35", "45", "55"],
    correct: "45"
  },
  {
    category: "Multiplication",
    difficulty: "easy",
    question: "What is 8 × 7?",
    choices: ["54", "56", "58", "64"],
    correct: "56"
  },
  {
    category: "Division",
    difficulty: "easy",
    question: "What is 144 ÷ 12?",
    choices: ["12", "10", "14", "11"],
    correct: "12"
  },
  {
    category: "Exponents",
    difficulty: "easy",
    question: "What is 3³?",
    choices: ["6", "9", "27", "18"],
    correct: "27"
  },
  {
    category: "Fractions",
    difficulty: "easy",
    question: "What is 1/2 of 40?",
    choices: ["10", "20", "30", "25"],
    correct: "20"
  },
  {
    category: "Addition",
    difficulty: "easy",
    question: "What is 125 + 75?",
    choices: ["180", "190", "200", "210"],
    correct: "200"
  },
  {
    category: "Percentages",
    difficulty: "easy",
    question: "What is 10% of 350?",
    choices: ["25", "35", "45", "50"],
    correct: "35"
  },
  {
    category: "Geometry",
    difficulty: "easy",
    question: "How many degrees are in a right angle?",
    choices: ["45°", "90°", "120°", "180°"],
    correct: "90°"
  },
  {
    category: "Fractions",
    difficulty: "easy",
    question: "Which fraction is equal to 0.5?",
    choices: ["1/4", "1/3", "1/2", "3/4"],
    correct: "1/2"
  },

  // =========================
  // MEDIUM
  // =========================
  {
    category: "Algebra",
    difficulty: "medium",
    question: "Solve for x: x + 7 = 19",
    choices: ["10", "11", "12", "13"],
    correct: "12"
  },
  {
    category: "Algebra",
    difficulty: "medium",
    question: "Solve for x: 3x = 27",
    choices: ["7", "8", "9", "10"],
    correct: "9"
  },
  {
    category: "Percentages",
    difficulty: "medium",
    question: "What is 25% of 360?",
    choices: ["75", "80", "90", "100"],
    correct: "90"
  },
  {
    category: "Fractions",
    difficulty: "medium",
    question: "What is 3/4 of 80?",
    choices: ["40", "50", "60", "70"],
    correct: "60"
  },
  {
    category: "Geometry",
    difficulty: "medium",
    question: "What is the area of a rectangle with length 8 and width 5?",
    choices: ["13", "26", "40", "80"],
    correct: "40"
  },
  {
    category: "Geometry",
    difficulty: "medium",
    question: "What is the perimeter of a square with side length 7?",
    choices: ["14", "21", "28", "49"],
    correct: "28"
  },
  {
    category: "Exponents",
    difficulty: "medium",
    question: "What is 2⁵?",
    choices: ["10", "16", "25", "32"],
    correct: "32"
  },
  {
    category: "Order of Operations",
    difficulty: "medium",
    question: "What is 8 + 4 × 3?",
    choices: ["20", "24", "36", "12"],
    correct: "20"
  },
  {
    category: "Order of Operations",
    difficulty: "medium",
    question: "What is (10 + 2) × 3?",
    choices: ["16", "26", "36", "30"],
    correct: "36"
  },
  {
    category: "Decimals",
    difficulty: "medium",
    question: "What is 2.5 × 4?",
    choices: ["8", "9", "10", "12"],
    correct: "10"
  },
  {
    category: "Ratios",
    difficulty: "medium",
    question: "Simplify the ratio 12:18.",
    choices: ["2:3", "3:4", "6:9", "4:5"],
    correct: "2:3"
  },
  {
    category: "Average",
    difficulty: "medium",
    question: "What is the average of 10, 20, 30, and 40?",
    choices: ["20", "25", "30", "35"],
    correct: "25"
  },
  {
    category: "Algebra",
    difficulty: "medium",
    question: "If 2x + 4 = 18, what is x?",
    choices: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    category: "Geometry",
    difficulty: "medium",
    question: "What is the area of a triangle with base 10 and height 6?",
    choices: ["20", "30", "40", "60"],
    correct: "30"
  },
  {
    category: "Percentages",
    difficulty: "medium",
    question: "A $80 item is discounted by 25%. What is the sale price?",
    choices: ["$55", "$60", "$65", "$70"],
    correct: "$60"
  },
  {
    category: "Fractions",
    difficulty: "medium",
    question: "What is 1/3 + 1/3?",
    choices: ["1/3", "1/2", "2/3", "1"],
    correct: "2/3"
  },
  {
    category: "Powers",
    difficulty: "medium",
    question: "What is 10² + 5²?",
    choices: ["105", "110", "120", "125"],
    correct: "125"
  },

  // =========================
  // HARD
  // =========================
  {
    category: "Algebra",
    difficulty: "hard",
    question: "Solve for x: 4x - 7 = 21",
    choices: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    category: "Algebra",
    difficulty: "hard",
    question: "Solve for x: 5x + 10 = 3x + 30",
    choices: ["5", "10", "15", "20"],
    correct: "10"
  },
  {
    category: "Geometry",
    difficulty: "hard",
    question: "What is the area of a circle with radius 4? Use π ≈ 3.14.",
    choices: ["25.12", "50.24", "62.8", "100.48"],
    correct: "50.24"
  },
  {
    category: "Geometry",
    difficulty: "hard",
    question: "A right triangle has legs of 6 and 8. What is the hypotenuse?",
    choices: ["9", "10", "12", "14"],
    correct: "10"
  },
  {
    category: "Exponents",
    difficulty: "hard",
    question: "What is 2⁸?",
    choices: ["128", "256", "512", "1024"],
    correct: "256"
  },
  {
    category: "Fractions",
    difficulty: "hard",
    question: "What is 3/5 ÷ 2/3?",
    choices: ["6/15", "9/10", "5/6", "2/5"],
    correct: "9/10"
  },
  {
    category: "Percentages",
    difficulty: "hard",
    question: "A price increases from $80 to $100. What is the percentage increase?",
    choices: ["20%", "25%", "30%", "40%"],
    correct: "25%"
  },
  {
    category: "Algebra",
    difficulty: "hard",
    question: "If y = 3x + 2 and x = 4, what is y?",
    choices: ["10", "12", "14", "16"],
    correct: "14"
  },
  {
    category: "Probability",
    difficulty: "hard",
    question: "What is the probability of rolling an even number on a standard six-sided die?",
    choices: ["1/6", "1/3", "1/2", "2/3"],
    correct: "1/2"
  },
  {
    category: "Average",
    difficulty: "hard",
    question: "The average of five numbers is 18. What is their total?",
    choices: ["72", "80", "90", "100"],
    correct: "90"
  },
  {
    category: "Algebra",
    difficulty: "hard",
    question: "Solve for x: 2(x + 5) = 24",
    choices: ["5", "7", "9", "12"],
    correct: "7"
  },
  {
    category: "Geometry",
    difficulty: "hard",
    question: "A rectangle has area 72 and width 8. What is its length?",
    choices: ["7", "8", "9", "10"],
    correct: "9"
  },
  {
    category: "Square Roots",
    difficulty: "hard",
    question: "What is √196?",
    choices: ["12", "13", "14", "16"],
    correct: "14"
  },
  {
    category: "Order of Operations",
    difficulty: "hard",
    question: "What is 18 ÷ 3 × (2 + 1)?",
    choices: ["6", "12", "18", "27"],
    correct: "18"
  },
  {
    category: "Percentages",
    difficulty: "hard",
    question: "If 30% of a number is 45, what is the number?",
    choices: ["120", "135", "150", "165"],
    correct: "150"
  },
  {
    category: "Sequences",
    difficulty: "hard",
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    choices: ["36", "40", "42", "48"],
    correct: "42"
  },
  {
    category: "Algebra",
    difficulty: "hard",
    question: "If x² = 144 and x is positive, what is x?",
    choices: ["10", "11", "12", "14"],
    correct: "12"
  },
  {
    category: "Logic",
    difficulty: "hard",
    question: "If three notebooks cost $12, how much do seven notebooks cost at the same rate?",
    choices: ["$24", "$26", "$28", "$30"],
    correct: "$28"
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
// SELECT 10 QUESTIONS
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

  return shuffleArray([
    ...easy,
    ...medium,
    ...hard
  ]);
}

// =========================
// LOAD QUESTION
// =========================
function loadQuestion() {
  clearInterval(timer);

  questionAnswered = false;

  const current =
    quizQuestions[currentQuestionIndex];

  if (current.difficulty === "easy") {
    timeLeft = 10;
  } else if (current.difficulty === "medium") {
    timeLeft = 15;
  } else {
    timeLeft = 20;
  }

  progressElem.textContent =
    `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

  categoryElem.textContent =
    `${current.category} • ${current.difficulty.toUpperCase()}`;

  questionElem.textContent =
    current.question;

  choicesElem.innerHTML = "";
  feedbackElem.textContent = "";

  nextBtn.disabled = true;

  if (!fiftyUsed) {
    lifelineBtn.disabled = false;
  }

  const shuffledChoices =
    shuffleArray([...current.choices]);

  shuffledChoices.forEach(choice => {
    const btn =
      document.createElement("button");

    btn.textContent = choice;
    btn.className = "quiz-button";
    btn.dataset.answer = choice;

    btn.onclick = () =>
      checkAnswer(choice, btn);

    choicesElem.appendChild(btn);
  });

  startTimer();

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
function checkAnswer(
  selected,
  selectedButton
) {
  if (questionAnswered) return;

  questionAnswered = true;
  clearInterval(timer);

  const current =
    quizQuestions[currentQuestionIndex];

  const correct = current.correct;

  const buttons =
    Array.from(choicesElem.children);

  buttons.forEach(btn => {
    btn.disabled = true;

    if (
      btn.dataset.answer === correct
    ) {
      btn.classList.add(
        "correct-answer"
      );
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
        `✅ Correct! 🔥 ${streak} in a row — calculator brain activated!`;
    } else if (streak >= 3) {
      feedbackElem.textContent =
        `✅ Correct! 🔥 ${streak} question streak!`;
    } else {
      feedbackElem.textContent =
        "✅ Correct!";
    }

    feedbackElem.style.color =
      "green";
  } else {
    streak = 0;

    selectedButton.classList.add(
      "wrong-answer"
    );

    feedbackElem.textContent =
      `❌ Not quite! Correct answer: ${correct}`;

    feedbackElem.style.color =
      "red";
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

  if (
    currentQuestionIndex <
    quizQuestions.length
  ) {
    loadQuestion();
  } else {
    showScore();
  }
}

// =========================
// TIMER
// =========================
function startTimer() {
  feedbackElem.textContent =
    `⏳ Time left: ${timeLeft}s`;

  feedbackElem.style.color =
    "#1f2937";

  timer = setInterval(() => {
    timeLeft--;

    feedbackElem.textContent =
      `⏳ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);

      questionAnswered = true;
      streak = 0;

      updateStreakDisplay();

      const correct =
        quizQuestions[
          currentQuestionIndex
        ].correct;

      feedbackElem.textContent =
        `⏰ Time's up! Correct answer: ${correct}`;

      feedbackElem.style.color =
        "darkorange";

      Array.from(
        choicesElem.children
      ).forEach(btn => {
        btn.disabled = true;

        if (
          btn.dataset.answer ===
          correct
        ) {
          btn.classList.add(
            "correct-answer"
          );
        }
      });

      lifelineBtn.disabled = true;
      nextBtn.disabled = false;
    }
  }, 1000);
}

// =========================
// 50/50 LIFELINE
// =========================
function useFiftyFifty() {
  if (
    fiftyUsed ||
    questionAnswered
  ) {
    return;
  }

  const current =
    quizQuestions[
      currentQuestionIndex
    ];

  const correct = current.correct;

  const wrongButtons =
    Array.from(
      choicesElem.children
    ).filter(
      btn =>
        btn.dataset.answer !==
        correct
    );

  const shuffledWrong =
    shuffleArray([
      ...wrongButtons
    ]);

  shuffledWrong
    .slice(0, 2)
    .forEach(btn => {
      btn.style.visibility =
        "hidden";

      btn.disabled = true;
    });

  fiftyUsed = true;

  lifelineBtn.disabled = true;

  lifelineBtn.textContent =
    "✅ 50/50 Used";
}

// =========================
// STREAK DISPLAY
// =========================
function updateStreakDisplay() {
  if (streak >= 2) {
    streakElem.textContent =
      `🔥 Current streak: ${streak}`;
  } else {
    streakElem.textContent = "";
  }
}

// =========================
// FINAL SCORE
// =========================
function showScore() {
  clearInterval(timer);

  questionBox.style.display =
    "none";

  nextBtn.style.display =
    "none";

  lifelineBtn.style.display =
    "none";

  scoreBox.style.display =
    "block";

  const rating =
    getMathRank(
      score,
      quizQuestions.length
    );

  const percentage =
    Math.round(
      (score /
        quizQuestions.length) *
        100
    );

  scoreBox.innerHTML = `
    <h2>➕ Math Challenge Complete!</h2>

    <p class="final-score">
      Your Score:
      <strong>
        ${score} / ${quizQuestions.length}
      </strong>
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

    <button
      onclick="startQuiz()"
      class="quiz-button"
    >
      🔁 Try Another Challenge
    </button>
  `;

  scoreBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// =========================
// FUN MATH RANKS
// =========================
function getMathRank(score, total) {
  const percent =
    (score / total) * 100;

  if (percent === 100) {
    return "🏆 Perfect! Your calculator may be feeling unemployed.";
  }

  if (percent >= 90) {
    return "🧠 Math wizard! Numbers clearly respect you.";
  }

  if (percent >= 80) {
    return "📐 Excellent! Very strong number sense.";
  }

  if (percent >= 70) {
    return "➗ Nice work! A few problems managed to escape.";
  }

  if (percent >= 60) {
    return "✏️ Solid performance! Your math muscles are working.";
  }

  if (percent >= 50) {
    return "🤔 Not bad! One more round could change everything.";
  }

  if (percent >= 30) {
    return "😅 The numbers fought back this time.";
  }

  return "😂 Math won this round. Demand a rematch.";
}

// =========================
// SHUFFLE HELPER
// =========================
function shuffleArray(array) {
  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];
  }

  return array;
}

// =========================
// INITIALIZE
// =========================
startQuiz();
