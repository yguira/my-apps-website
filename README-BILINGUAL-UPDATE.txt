YG Technology Website — English/French Bilingual Update

HOW TO INSTALL
1. Back up or commit your current website first.
2. Extract this ZIP into the ROOT of your my-apps-website project.
3. Allow Windows to merge folders and replace files when prompted.
4. Do NOT delete other existing files that are not in this package.

TEST LOCALLY
From the website root:
  python -m http.server 5500

Then open:
  http://localhost:5500

TEST THESE ITEMS
- EN / FR language control in the navigation.
- Switch to FR on the homepage, then visit other pages; French should remain selected.
- Refresh a page; the selected language should remain.
- Test Contact, Downloads, FAQ, Support, Privacy, Terms, Statistics, Data pages.
- Open quizzes in French and verify questions, buttons, timer/results text are French.
- Test the chat in French with: Bonjour, Peux-tu m'aider ?, Quels quiz sont disponibles ?
- Switch back to English.
- Confirm the homepage does not auto-scroll to the chatbox on load.

COMMIT
  git status
  git add .
  git commit -m "Add English and French language support"
  git push

NOTE
No translation API is required. The translations are included in the website code.
