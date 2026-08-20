(() => {
  "use strict";

  const data = window.quizData;
  if (!data || !data.config || !Array.isArray(data.questions)) {
    console.error("Quiz data failed to load. Make sure the quiz data file is loaded before quiz-engine.js.");
    return;
  }

  const config = data.config;
  const questions = data.questions;

  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const feedbackElem = document.getElementById("feedback");
  const timerElem = document.getElementById("quiz-timer");
  const nextBtn = document.getElementById("next-btn");
  const scoreBox = document.getElementById("score-box");
  const questionBox = document.getElementById("question-box");
  const progressElem = document.getElementById("quiz-progress");
  const categoryElem = document.getElementById("quiz-category");
  const streakElem = document.getElementById("streak-display");
  const lifelineBtn = document.getElementById("fifty-btn");
  const titleElem = document.getElementById("quiz-title");
  const subtitleElem = document.getElementById("quiz-subtitle");

  const requiredElements = [
    questionElem,
    choicesElem,
    feedbackElem,
    timerElem,
    nextBtn,
    scoreBox,
    questionBox,
    progressElem,
    categoryElem,
    streakElem,
    lifelineBtn
  ];

  if (requiredElements.some(element => !element)) {
    console.error("Quiz page is missing one or more required elements.");
    return;
  }

  let currentQuestionIndex = 0;
  let score = 0;
  let streak = 0;
  let bestStreak = 0;
  let quizQuestions = [];
  let timer = null;
  let timeLeft = 10;
  let questionAnswered = false;
  let fiftyUsed = false;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function validateQuestions() {
    const invalid = questions.filter(question =>
      !question.question ||
      !Array.isArray(question.choices) ||
      question.choices.length < 2 ||
      !question.choices.includes(question.correct) ||
      !question.difficulty
    );

    if (invalid.length) {
      console.warn(`${invalid.length} quiz question(s) have invalid data and may not work correctly.`, invalid);
    }
  }

  function getRoundSize() {
    const counts = config.difficultyCounts || {};
    const configuredTotal = Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0);
    return config.questionsPerRound || configuredTotal || Math.min(10, questions.length);
  }

  function getQuizQuestions() {
    const counts = config.difficultyCounts || { easy: 3, medium: 4, hard: 3 };
    const selected = [];
    const selectedSet = new Set();

    Object.entries(counts).forEach(([difficulty, count]) => {
      const pool = shuffleArray(
        questions.filter(question => question.difficulty === difficulty)
      );

      pool.slice(0, count).forEach(question => {
        selected.push(question);
        selectedSet.add(question);
      });
    });

    const targetSize = Math.min(getRoundSize(), questions.length);

    if (selected.length < targetSize) {
      const remaining = shuffleArray(
        questions.filter(question => !selectedSet.has(question))
      );
      selected.push(...remaining.slice(0, targetSize - selected.length));
    }

    return shuffleArray(selected).slice(0, targetSize);
  }

  function getQuestionTime(question) {
    const times = config.times || {};
    const baseTime = Number(times[question.difficulty] || config.defaultTime || 12);
    const extraTime = Number(config.timeBonus ?? 3);

    // Give every quiz a little more breathing room without changing each data file.
    return Math.max(5, baseTime + extraTime);
  }

  function updateStreakDisplay() {
    streakElem.textContent = streak >= 2 ? `🔥 Current streak: ${streak}` : "";
  }

  function updateLifelineState() {
    if (fiftyUsed) {
      lifelineBtn.disabled = true;
      lifelineBtn.textContent = "✅ 50/50 Used";
      return;
    }

    lifelineBtn.disabled = questionAnswered;
    lifelineBtn.textContent = "🎯 50/50 Lifeline";
  }

  function startQuiz() {
    clearInterval(timer);

    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    bestStreak = 0;
    questionAnswered = false;
    fiftyUsed = false;
    quizQuestions = getQuizQuestions();

    if (!quizQuestions.length) {
      scoreBox.style.display = "block";
      scoreBox.innerHTML = "<h2>Quiz unavailable</h2><p>No questions could be loaded.</p>";
      return;
    }

    if (titleElem) titleElem.textContent = config.title || "Quiz";
    if (subtitleElem) subtitleElem.textContent = config.subtitle || "10 random questions. Different challenge every time.";
    document.title = config.title || document.title;

    scoreBox.style.display = "none";
    questionBox.style.display = "block";
    feedbackElem.textContent = "";

    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true;
    nextBtn.textContent = "Next";

    lifelineBtn.style.display = "inline-block";
    updateStreakDisplay();
    updateLifelineState();

    loadQuestion();
  }

  function loadQuestion() {
    clearInterval(timer);
    questionAnswered = false;

    const current = quizQuestions[currentQuestionIndex];
    timeLeft = getQuestionTime(current);

    progressElem.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    categoryElem.textContent = `${current.category || "Quiz"} • ${String(current.difficulty).toUpperCase()}`;
    questionElem.textContent = current.question;
    updateQuestionImage(current);

    choicesElem.innerHTML = "";
    feedbackElem.textContent = "";
    nextBtn.disabled = true;
    updateLifelineState();

    shuffleArray([...current.choices]).forEach(choice => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice;
      button.className = "quiz-button";
      button.dataset.answer = choice;
      button.addEventListener("click", () => checkAnswer(choice, button));
      choicesElem.appendChild(button);
    });

    startTimer();

    if (window.matchMedia("(max-width: 700px)").matches) {
      setTimeout(() => {
        questionBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }


  function updateQuestionImage(question) {
    let imageElem = document.getElementById("quiz-question-image");

    if (!imageElem) {
      imageElem = document.createElement("img");
      imageElem.id = "quiz-question-image";
      imageElem.className = "quiz-question-image";
      imageElem.loading = "eager";
      questionElem.parentNode.insertBefore(imageElem, questionElem);
    }

    if (!question.image) {
      imageElem.style.display = "none";
      imageElem.removeAttribute("src");
      imageElem.removeAttribute("alt");
      return;
    }

    imageElem.style.display = "block";
    imageElem.alt = question.imageAlt || "Quiz image";
    imageElem.src = question.image;

    imageElem.onerror = () => {
      imageElem.style.display = "none";
      if (question.imageFallback) {
        questionElem.textContent = `${question.imageFallback} ${question.question}`;
      }
    };
  }

  function checkAnswer(selected, selectedButton) {
    if (questionAnswered) return;

    questionAnswered = true;
    clearInterval(timer);
    timerElem.textContent = "";

    const correct = quizQuestions[currentQuestionIndex].correct;
    const buttons = Array.from(choicesElem.children);

    buttons.forEach(button => {
      button.disabled = true;
      if (button.dataset.answer === correct) {
        button.classList.add("correct-answer");
      }
    });

    if (selected === correct) {
      score++;
      streak++;
      bestStreak = Math.max(bestStreak, streak);

      if (streak >= 5) {
        feedbackElem.textContent = `✅ Correct! 🔥 ${streak} in a row — you're on fire!`;
      } else if (streak >= 3) {
        feedbackElem.textContent = `✅ Correct! 🔥 ${streak} question streak!`;
      } else {
        feedbackElem.textContent = "✅ Correct!";
      }
      feedbackElem.className = "quiz-feedback correct-feedback";
    } else {
      streak = 0;
      selectedButton.classList.add("wrong-answer");
      feedbackElem.textContent = `❌ Not quite! Correct answer: ${correct}`;
      feedbackElem.className = "quiz-feedback wrong-feedback";
    }

    updateStreakDisplay();
    updateLifelineState();
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }

  function startTimer() {
    timerElem.textContent = `⏳ Time left: ${timeLeft}s`;

    timer = setInterval(() => {
      timeLeft--;
      timerElem.textContent = `⏳ Time left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        questionAnswered = true;
        streak = 0;
        timerElem.textContent = "";
        updateStreakDisplay();

        const correct = quizQuestions[currentQuestionIndex].correct;
        feedbackElem.textContent = `⏰ Time's up! Correct answer: ${correct}`;
        feedbackElem.className = "quiz-feedback time-feedback";

        Array.from(choicesElem.children).forEach(button => {
          button.disabled = true;
          if (button.dataset.answer === correct) {
            button.classList.add("correct-answer");
          }
        });

        updateLifelineState();
        nextBtn.disabled = false;
      }
    }, 1000);
  }

  function useFiftyFifty() {
    if (fiftyUsed || questionAnswered) return;

    const correct = quizQuestions[currentQuestionIndex].correct;
    const wrongButtons = Array.from(choicesElem.children)
      .filter(button => button.dataset.answer !== correct && !button.disabled);

    shuffleArray(wrongButtons)
      .slice(0, Math.min(2, Math.max(0, wrongButtons.length - 1)))
      .forEach(button => {
        button.classList.add("lifeline-hidden-choice");
        button.disabled = true;
      });

    fiftyUsed = true;
    updateLifelineState();
  }

  function getRank(percent) {
    const ranks = Array.isArray(config.ranks) && config.ranks.length
      ? [...config.ranks].sort((a, b) => b.min - a.min)
      : [
          { min: 100, text: "🏆 Perfect score! Incredible!" },
          { min: 80, text: "😎 Excellent work!" },
          { min: 60, text: "🙂 Nice work!" },
          { min: 0, text: "🔁 Give it another shot!" }
        ];

    return ranks.find(rank => percent >= rank.min)?.text || ranks[ranks.length - 1].text;
  }

  function showScore() {
    clearInterval(timer);
    timerElem.textContent = "";

    questionBox.style.display = "none";
    nextBtn.style.display = "none";
    lifelineBtn.style.display = "none";
    feedbackElem.textContent = "";
    feedbackElem.className = "quiz-feedback";
    streakElem.textContent = "";

    const percentage = Math.round((score / quizQuestions.length) * 100);
    const rating = getRank(percentage);

    scoreBox.style.display = "block";
    scoreBox.innerHTML = `
      <h2>${config.completionTitle || "🎉 Quiz Complete!"}</h2>
      <p class="final-score">Your Score: <strong>${score} / ${quizQuestions.length}</strong></p>
      <p>${percentage}% correct</p>
      <p class="quiz-rank">${rating}</p>
      <p>🔥 Best streak: ${bestStreak}</p>
      <div class="quiz-end-buttons">
        <button type="button" id="play-again-btn" class="quiz-button">🔁 Play Again</button>
        <a href="../quizzes.html" class="quiz-button">⬅️ Back to Quizzes</a>
      </div>
    `;

    document.getElementById("play-again-btn")?.addEventListener("click", startQuiz);

    scoreBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  nextBtn.addEventListener("click", nextQuestion);
  lifelineBtn.addEventListener("click", useFiftyFifty);

  validateQuestions();
  startQuiz();
})();
