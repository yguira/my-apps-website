YG-Tech Bilingual Freeze Fix v2

What this changes
-----------------
1. Replaces js/i18n.js with a safer translation engine.
2. Removes characterData observation entirely.
3. Pauses the MutationObserver whenever translations are applied.
4. Observes only newly added/replaced DOM nodes for dynamic content.
5. Stops translating form field value attributes, so user-entered text is never overwritten.
6. Adds ?v=20260822b to the i18n.js script reference on every bilingual HTML page so the browser cannot reuse the previous cached translator.

Install
-------
Extract this ZIP into the ROOT of my-apps-website and allow files/folders to merge and replace.
Do not delete the rest of your website.

Then stop/restart the local server:
  Ctrl+C
  python -m http.server 5500

Open:
  http://localhost:5500

Use Ctrl+F5 once.

If the previous French choice is remembered, that is fine. This version should load directly in French without freezing.
For a clean English test, run in DevTools Console:
  localStorage.removeItem("ygtechLanguage");
  location.reload();

Then test EN -> FR and FR -> EN.
