YG-Tech Site-Wide Quiz & Article Spotlights
===========================================

This update scales the fixed left/right promo panels across the entire website.

Files in this package:
- index.html              (removes the old homepage-only promo HTML/script)
- navbar-fix.js           (loads the promo system once, site-wide)
- js/side-promos.js       (creates and renders both fixed panels automatically)

IMPORTANT:
Your current styles.css already contains the premium side-promo styling, so this
patch does not replace styles.css.

INSTALL
1. Extract this ZIP into the root of your my-apps-website folder.
2. Allow Windows to replace/merge the files above.
3. Do not add <aside> promo markup to individual pages.
4. Do not add side-promos.js <script> tags to individual pages.

HOW IT WORKS
Every content page already loads navbar-fix.js. navbar-fix.js now loads
/js/side-promos.js from the site root. side-promos.js then creates the left and
right panels automatically. Internal quiz URLs are also resolved from the site
root, so they work from root pages and nested pages.

BILINGUAL SUPPORT
The promo content includes English and French labels/descriptions. It detects
<html lang="fr"> and common YG-Tech localStorage language keys. It also listens
for language changes on the <html lang> attribute.

TEST LOCALLY
From the website root:
  python -m http.server 5500

Test at least:
  http://localhost:5500/
  http://localhost:5500/quizzes.html
  http://localhost:5500/quizzes/flag-quiz.html
  http://localhost:5500/gen-math-courses/algebra.html

The panels intentionally disappear on viewport widths 1450px and below so they
never cover the main website.

COMMIT AFTER TESTING
  git status
  git add .
  git commit -m "Scale quiz and article spotlights site-wide"
  git fetch origin
  git rebase origin/main
  git push origin main

FUTURE ARTICLES
To replace an external article with a YG-Tech-hosted article, edit
js/side-promos.js and change, for example:
  link: 'articles/how-ai-works.html',
  external: false

No other page needs to be edited.
