const questions = [
  // =========================
  // EASY
  // =========================
  {
    category: "U.S. History",
    difficulty: "easy",
    question: "Who was the first President of the United States?",
    choices: [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "John Adams"
    ],
    correct: "George Washington"
  },
  {
    category: "World War II",
    difficulty: "easy",
    question: "In which year did World War II end?",
    choices: ["1940", "1945", "1939", "1950"],
    correct: "1945"
  },
  {
    category: "Ancient Rome",
    difficulty: "easy",
    question: "Which empire built the Colosseum?",
    choices: [
      "Greek Empire",
      "Roman Empire",
      "Ottoman Empire",
      "Byzantine Empire"
    ],
    correct: "Roman Empire"
  },
  {
    category: "Colonial History",
    difficulty: "easy",
    question: "What was the name of the ship used by the Pilgrims in 1620?",
    choices: [
      "Titanic",
      "Santa Maria",
      "Mayflower",
      "Beagle"
    ],
    correct: "Mayflower"
  },
  {
    category: "World War II",
    difficulty: "easy",
    question: "Who was British Prime Minister during most of World War II?",
    choices: [
      "Winston Churchill",
      "Neville Chamberlain",
      "Margaret Thatcher",
      "Tony Blair"
    ],
    correct: "Winston Churchill"
  },
  {
    category: "Ancient Civilizations",
    difficulty: "easy",
    question: "Which civilization built Machu Picchu?",
    choices: ["Aztec", "Inca", "Maya", "Olmec"],
    correct: "Inca"
  },
  {
    category: "British History",
    difficulty: "easy",
    question: "The Great Fire of London occurred in which year?",
    choices: ["1666", "1766", "1566", "1866"],
    correct: "1666"
  },
  {
    category: "Cold War",
    difficulty: "easy",
    question: "What wall separated East and West Berlin until 1989?",
    choices: [
      "Iron Curtain",
      "Berlin Wall",
      "Wall of Shame",
      "Cold Barrier"
    ],
    correct: "Berlin Wall"
  },
  {
    category: "Space Race",
    difficulty: "easy",
    question: "Who was the first human to travel into outer space?",
    choices: [
      "Buzz Aldrin",
      "Neil Armstrong",
      "Yuri Gagarin",
      "Alan Shepard"
    ],
    correct: "Yuri Gagarin"
  },
  {
    category: "French History",
    difficulty: "easy",
    question: "Which revolution is associated with 'Liberty, Equality, Fraternity'?",
    choices: [
      "American Revolution",
      "Russian Revolution",
      "French Revolution",
      "Industrial Revolution"
    ],
    correct: "French Revolution"
  },
  {
    category: "Ancient Egypt",
    difficulty: "easy",
    question: "Which civilization built the pyramids at Giza?",
    choices: [
      "Romans",
      "Ancient Egyptians",
      "Persians",
      "Phoenicians"
    ],
    correct: "Ancient Egyptians"
  },
  {
    category: "U.S. History",
    difficulty: "easy",
    question: "Who issued the Emancipation Proclamation?",
    choices: [
      "George Washington",
      "Abraham Lincoln",
      "Theodore Roosevelt",
      "Woodrow Wilson"
    ],
    correct: "Abraham Lincoln"
  },
  {
    category: "Ancient Greece",
    difficulty: "easy",
    question: "The Olympic Games originated in which ancient civilization?",
    choices: [
      "Roman",
      "Greek",
      "Egyptian",
      "Persian"
    ],
    correct: "Greek"
  },
  {
    category: "Exploration",
    difficulty: "easy",
    question: "Which explorer reached the Americas in 1492?",
    choices: [
      "Marco Polo",
      "Christopher Columbus",
      "Ferdinand Magellan",
      "James Cook"
    ],
    correct: "Christopher Columbus"
  },
  {
    category: "U.S. History",
    difficulty: "easy",
    question: "The American Declaration of Independence was adopted in which year?",
    choices: ["1776", "1789", "1812", "1865"],
    correct: "1776"
  },

  // =========================
  // MEDIUM
  // =========================
  {
    category: "Ancient Rome",
    difficulty: "medium",
    question: "Who was the first Roman emperor?",
    choices: [
      "Julius Caesar",
      "Augustus",
      "Nero",
      "Trajan"
    ],
    correct: "Augustus"
  },
  {
    category: "European History",
    difficulty: "medium",
    question: "The Renaissance began in which country?",
    choices: [
      "France",
      "Italy",
      "Germany",
      "Spain"
    ],
    correct: "Italy"
  },
  {
    category: "World War I",
    difficulty: "medium",
    question: "Which event directly triggered World War I?",
    choices: [
      "Invasion of Poland",
      "Assassination of Archduke Franz Ferdinand",
      "Russian Revolution",
      "Sinking of the Titanic"
    ],
    correct: "Assassination of Archduke Franz Ferdinand"
  },
  {
    category: "American Revolution",
    difficulty: "medium",
    question: "Which battle is generally considered the final major battle of the American Revolution?",
    choices: [
      "Battle of Yorktown",
      "Battle of Lexington",
      "Battle of Bunker Hill",
      "Battle of Saratoga"
    ],
    correct: "Battle of Yorktown"
  },
  {
    category: "Ancient Civilizations",
    difficulty: "medium",
    question: "Which ancient civilization developed cuneiform writing?",
    choices: [
      "Sumerians",
      "Romans",
      "Aztecs",
      "Vikings"
    ],
    correct: "Sumerians"
  },
  {
    category: "Cold War",
    difficulty: "medium",
    question: "Which organization was created in 1949 as a military alliance among Western countries?",
    choices: [
      "United Nations",
      "NATO",
      "Warsaw Pact",
      "European Union"
    ],
    correct: "NATO"
  },
  {
    category: "Asian History",
    difficulty: "medium",
    question: "Which dynasty built much of the Great Wall seen today?",
    choices: [
      "Han",
      "Tang",
      "Ming",
      "Qing"
    ],
    correct: "Ming"
  },
  {
    category: "African History",
    difficulty: "medium",
    question: "Mansa Musa was ruler of which empire?",
    choices: [
      "Mali Empire",
      "Songhai Empire",
      "Ghana Empire",
      "Aksumite Empire"
    ],
    correct: "Mali Empire"
  },
  {
    category: "European History",
    difficulty: "medium",
    question: "Who led France during the later stages of the French Revolution and Napoleonic era?",
    choices: [
      "Louis XIV",
      "Napoleon Bonaparte",
      "Charles de Gaulle",
      "Robespierre"
    ],
    correct: "Napoleon Bonaparte"
  },
  {
    category: "U.S. History",
    difficulty: "medium",
    question: "Which U.S. constitutional amendment abolished slavery?",
    choices: [
      "10th Amendment",
      "13th Amendment",
      "15th Amendment",
      "19th Amendment"
    ],
    correct: "13th Amendment"
  },
  {
    category: "Exploration",
    difficulty: "medium",
    question: "Which explorer led the expedition that achieved the first circumnavigation of Earth?",
    choices: [
      "Ferdinand Magellan",
      "Christopher Columbus",
      "Vasco da Gama",
      "Amerigo Vespucci"
    ],
    correct: "Ferdinand Magellan"
  },
  {
    category: "World War II",
    difficulty: "medium",
    question: "What was the code name for the Allied invasion of Normandy?",
    choices: [
      "Operation Torch",
      "Operation Overlord",
      "Operation Market Garden",
      "Operation Barbarossa"
    ],
    correct: "Operation Overlord"
  },
  {
    category: "Ancient Greece",
    difficulty: "medium",
    question: "Which Greek city-state was famous for its military culture?",
    choices: [
      "Athens",
      "Sparta",
      "Corinth",
      "Delphi"
    ],
    correct: "Sparta"
  },
  {
    category: "Russian History",
    difficulty: "medium",
    question: "Which revolution brought the Bolsheviks to power in Russia?",
    choices: [
      "February Revolution",
      "October Revolution",
      "French Revolution",
      "Industrial Revolution"
    ],
    correct: "October Revolution"
  },
  {
    category: "Medieval History",
    difficulty: "medium",
    question: "Which document signed in 1215 limited the power of the English king?",
    choices: [
      "Magna Carta",
      "Bill of Rights",
      "Treaty of Versailles",
      "Domesday Book"
    ],
    correct: "Magna Carta"
  },
  {
    category: "Latin American History",
    difficulty: "medium",
    question: "Which leader is strongly associated with independence movements across northern South America?",
    choices: [
      "Simón Bolívar",
      "Che Guevara",
      "Fidel Castro",
      "José Martí"
    ],
    correct: "Simón Bolívar"
  },
  {
    category: "Industrial History",
    difficulty: "medium",
    question: "The Industrial Revolution began first in which country?",
    choices: [
      "France",
      "Germany",
      "Britain",
      "United States"
    ],
    correct: "Britain"
  },

  // =========================
  // HARD
  // =========================
  {
    category: "Ancient Rome",
    difficulty: "hard",
    question: "Which Roman emperor issued the Edict of Milan in 313 CE?",
    choices: [
      "Constantine I",
      "Augustus",
      "Hadrian",
      "Marcus Aurelius"
    ],
    correct: "Constantine I"
  },
  {
    category: "World War I",
    difficulty: "hard",
    question: "Which treaty formally ended the war between Germany and the Allied Powers after World War I?",
    choices: [
      "Treaty of Versailles",
      "Treaty of Paris",
      "Treaty of Vienna",
      "Treaty of Utrecht"
    ],
    correct: "Treaty of Versailles"
  },
  {
    category: "Ancient Civilizations",
    difficulty: "hard",
    question: "Which civilization used quipu as a system of record keeping?",
    choices: [
      "Inca",
      "Maya",
      "Aztec",
      "Phoenician"
    ],
    correct: "Inca"
  },
  {
    category: "Byzantine History",
    difficulty: "hard",
    question: "Which Byzantine emperor ordered the construction of Hagia Sophia?",
    choices: [
      "Justinian I",
      "Constantine XI",
      "Basil II",
      "Alexios I"
    ],
    correct: "Justinian I"
  },
  {
    category: "African History",
    difficulty: "hard",
    question: "Which West African city became famous as a major center of trade and Islamic scholarship?",
    choices: [
      "Timbuktu",
      "Carthage",
      "Lagos",
      "Alexandria"
    ],
    correct: "Timbuktu"
  },
  {
    category: "European History",
    difficulty: "hard",
    question: "Which event in  defenestration helped trigger the Thirty Years' War?",
    choices: [
      "Defenestration of Prague",
      "Boston Tea Party",
      "Storming of the Bastille",
      "Gunpowder Plot"
    ],
    correct: "Defenestration of Prague"
  },
  {
    category: "Ancient History",
    difficulty: "hard",
    question: "Which ancient people founded the city of Carthage?",
    choices: [
      "Phoenicians",
      "Romans",
      "Greeks",
      "Persians"
    ],
    correct: "Phoenicians"
  },
  {
    category: "Asian History",
    difficulty: "hard",
    question: "Who founded the Mongol Empire?",
    choices: [
      "Kublai Khan",
      "Genghis Khan",
      "Tamerlane",
      "Attila"
    ],
    correct: "Genghis Khan"
  },
  {
    category: "U.S. History",
    difficulty: "hard",
    question: "Which Supreme Court case established judicial review in the United States?",
    choices: [
      "Marbury v. Madison",
      "Brown v. Board of Education",
      "Dred Scott v. Sandford",
      "McCulloch v. Maryland"
    ],
    correct: "Marbury v. Madison"
  },
  {
    category: "European History",
    difficulty: "hard",
    question: "Which conflict was fought between the houses of Lancaster and York?",
    choices: [
      "Hundred Years' War",
      "Wars of the Roses",
      "English Civil War",
      "Thirty Years' War"
    ],
    correct: "Wars of the Roses"
  },
  {
    category: "World War II",
    difficulty: "hard",
    question: "Which 1942 battle is widely considered a major turning point in the Pacific War?",
    choices: [
      "Battle of Midway",
      "Battle of Okinawa",
      "Battle of Iwo Jima",
      "Battle of Leyte Gulf"
    ],
    correct: "Battle of Midway"
  },
  {
    category: "Ancient Greece",
    difficulty: "hard",
    question: "Which battle in 490 BCE saw the Athenians defeat a Persian invasion force?",
    choices: [
      "Marathon",
      "Thermopylae",
      "Salamis",
      "Plataea"
    ],
    correct: "Marathon"
  },
  {
    category: "Middle Eastern History",
    difficulty: "hard",
    question: "Which empire captured Constantinople in 1453?",
    choices: [
      "Ottoman Empire",
      "Mongol Empire",
      "Roman Empire",
      "Persian Empire"
    ],
    correct: "Ottoman Empire"
  },
  {
    category: "European History",
    difficulty: "hard",
    question: "Which ruler was known as the 'Sun King'?",
    choices: [
      "Louis XIV",
      "Henry VIII",
      "Philip II",
      "Frederick the Great"
    ],
    correct: "Louis XIV"
  },
  {
    category: "U.S. History",
    difficulty: "hard",
    question: "Which purchase in 1803 nearly doubled the territory of the United States?",
    choices: [
      "Louisiana Purchase",
      "Alaska Purchase",
      "Gadsden Purchase",
      "Florida Purchase"
    ],
    correct: "Louisiana Purchase"
  },
  {
    category: "African History",
    difficulty: "hard",
    question: "The ancient Kingdom of Aksum was centered primarily in the region of modern Ethiopia and which neighboring country?",
    choices: [
      "Eritrea",
      "Kenya",
      "Sudan",
      "Somalia"
    ],
    correct: "Eritrea"
  },
  {
    category: "Cold War",
    difficulty: "hard",
    question: "The Cuban Missile Crisis occurred in which year?",
    choices: [
      "1956",
      "1962",
      "1968",
      "1973"
    ],
    correct: "1962"
  },
  {
    category: "European History",
    difficulty: "hard",
    question: "Which peace settlement ended the Thirty Years' War in 1648?",
    choices: [
      "Peace of Westphalia",
      "Treaty of Versailles",
      "Congress of Vienna",
      "Treaty of Tordesillas"
    ],
    correct: "Peace of Westphalia"
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

  const current = quizQuestions[currentQuestionIndex];

  if (current.difficulty === "easy") {
    timeLeft = 10;
  } else if (current.difficulty === "medium") {
    timeLeft = 12;
  } else {
    timeLeft = 15;
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

  const shuffledChoices =
    shuffleArray([...current.choices]);

  shuffledChoices.forEach(choice => {
    const btn = document.createElement("button");

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
function checkAnswer(selected, selectedButton) {
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
        `✅ Correct! 🔥 ${streak} in a row — history legend mode!`;
    } else if (streak >= 3) {
      feedbackElem.textContent =
        `✅ Correct! 🔥 ${streak} question streak!`;
    } else {
      feedbackElem.textContent =
        "✅ Correct!";
    }

    feedbackElem.style.color = "green";
  } else {
    streak = 0;

    selectedButton.classList.add(
      "wrong-answer"
    );

    feedbackElem.textContent =
      `❌ Incorrect! Correct answer: ${correct}`;

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
        quizQuestions[currentQuestionIndex].correct;

      feedbackElem.textContent =
        `⏰ Time's up! Correct answer: ${correct}`;

      feedbackElem.style.color =
        "darkorange";

      Array.from(
        choicesElem.children
      ).forEach(btn => {
        btn.disabled = true;

        if (
          btn.dataset.answer === correct
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
    quizQuestions[currentQuestionIndex];

  const correct =
    current.correct;

  const wrongButtons =
    Array.from(choicesElem.children)
      .filter(
        btn =>
          btn.dataset.answer !== correct
      );

  const shuffledWrong =
    shuffleArray([...wrongButtons]);

  shuffledWrong
    .slice(0, 2)
    .forEach(btn => {
      btn.style.visibility = "hidden";
      btn.disabled = true;
    });

  fiftyUsed = true;

  lifelineBtn.disabled = true;
  lifelineBtn.textContent =
    "✅ 50/50 Used";
}

// =========================
// STREAK
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

  questionBox.style.display = "none";
  nextBtn.style.display = "none";
  lifelineBtn.style.display = "none";

  scoreBox.style.display = "block";

  const rating =
    getHistoryRank(
      score,
      quizQuestions.length
    );

  const percentage =
    Math.round(
      (score / quizQuestions.length) * 100
    );

  scoreBox.innerHTML = `
    <h2>📜 History Challenge Complete!</h2>

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
      🔁 Challenge History Again
    </button>
  `;

  scoreBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// =========================
// FUN HISTORY RANKS
// =========================
function getHistoryRank(score, total) {
  const percent =
    (score / total) * 100;

  if (percent === 100) {
    return "🏛️ Historian Supreme! The archives have nothing on you.";
  }

  if (percent >= 90) {
    return "📚 History Scholar! Extremely impressive.";
  }

  if (percent >= 80) {
    return "🧠 History Buff confirmed. You know your eras.";
  }

  if (percent >= 70) {
    return "⚔️ Strong performance! A few empires managed to escape you.";
  }

  if (percent >= 60) {
    return "📜 Solid knowledge! You'd survive a history debate.";
  }

  if (percent >= 50) {
    return "🤔 Respectable! The past still has a few secrets.";
  }

  if (percent >= 30) {
    return "😅 History fought back a little harder than expected.";
  }

  return "😂 The past defeated you this round. Time for a historical rematch.";
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
