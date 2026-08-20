YG-Tech Quiz + Chat Update
==========================

Copy/extract these files into the ROOT of your existing my-apps-website project.
Allow the existing files to be overwritten when prompted.

CHANGED FILES
- chat.js
- styles.css
- quizzes.html
- js/quiz-engine.js

NEW FILES
- quizzes/flag-quiz.html
- quizzes/flag-data.js
- quizzes/brain-teasers.html
- quizzes/brain-teasers-data.js

WHAT CHANGED
1. Flag Frenzy added as the first quiz.
   - 45 flag questions: 15 easy, 15 medium, 15 hard.
   - Uses hosted flag images with emoji fallback.
   - 10 random questions per round.

2. Brain Teasers added as the second quiz.
   - 36 questions: 12 easy, 12 medium, 12 hard.
   - Logic, number patterns, quick-thinking, probability, and puzzles.
   - 10 random questions per round.

3. Quiz timer increased globally by 3 seconds per question.
   - Existing quiz data files do not need to be edited.

4. Chat upgraded without an API.
   - Better greeting vs request detection.
   - Basic arithmetic such as 12 + 7.
   - Site-specific answers for quizzes, Invoice Studio, downloads, contact, etc.
   - Remembers the previous intent for short follow-ups like "why?".
   - Repeated-message responses.
   - Variable typing delay.
   - Attempt 10 still guarantees: "Look, bro, I am tired of your trolling. Let me rest."

TEST LOCALLY
From the project root:
    python -m http.server 5500

Open:
    http://localhost:5500/quizzes.html

Also test the chat on the home page.

RESET CHAT DURING TESTING
In the browser console:
    sessionStorage.removeItem("chatAttemptCount");
    sessionStorage.removeItem("previousUserText");
    sessionStorage.removeItem("lastChatIntent");
    location.reload();

COMMIT
    git status
    git add .
    git commit -m "Add Flag Frenzy, Brain Teasers, and smarter chat"
    git push
