YG-Tech Emoji Challenge Update

This update replaces the Brain Teasers card on quizzes.html with Emoji Challenge.

Files to copy into the root of your website project:
- quizzes.html (replace existing)
- quizzes/emoji-challenge.html (new)
- quizzes/emoji-challenge-data.js (new)

The old brain-teasers.html and brain-teasers-data.js files can stay in the project; they will no longer appear on the quiz list. You may delete them later if you want.

Test locally:
python -m http.server 5500
Then open:
http://localhost:5500/quizzes.html

Commit:
git add .
git commit -m "Replace Brain Teasers with Emoji Challenge"
git push
