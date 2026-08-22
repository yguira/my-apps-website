// YG-Tech bilingual UI helper (English / French)
// Stable version: translates static and dynamically-added UI without
// observing character-data writes, preventing recursive DOM mutation loops.
(() => {
  "use strict";

  const STORAGE_KEY = "ygtechLanguage";
  const supported = new Set(["en", "fr"]);
  const translations = { fr: Object.create(null) };
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  let storedLanguage = "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.has(saved)) storedLanguage = saved;
  } catch (_) {}

  let currentLanguage = storedLanguage;
  let applying = false;
  let observerStarted = false;

  const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

  function register(language, map) {
    if (!supported.has(language) || !map) return;
    Object.assign(translations[language], map);

    // If French was remembered from a previous visit, the translation file
    // loads after this helper. Apply it once the map becomes available.
    if (language === currentLanguage) apply(document.documentElement);
  }

  function translateDynamic(text, language = currentLanguage) {
    if (language !== "fr") return null;
    const clean = normalize(text);
    let match;

    // Quiz/runtime UI.
    if ((match = clean.match(/^Question (\d+) of (\d+)$/i))) return `Question ${match[1]} sur ${match[2]}`;
    if ((match = clean.match(/^🔥 Current streak: (\d+)$/i))) return `🔥 Série actuelle : ${match[1]}`;
    if ((match = clean.match(/^⏳ Time left: (\d+)s$/i))) return `⏳ Temps restant : ${match[1]} s`;
    if ((match = clean.match(/^✅ Correct! 🔥 (\d+) in a row — you're on fire!$/i))) return `✅ Correct ! 🔥 ${match[1]} bonnes réponses d’affilée — vous êtes en feu !`;
    if ((match = clean.match(/^✅ Correct! 🔥 (\d+) question streak!$/i))) return `✅ Correct ! 🔥 Série de ${match[1]} bonnes réponses !`;
    if ((match = clean.match(/^❌ Not quite! Correct answer: (.+)$/i))) return `❌ Pas tout à fait ! Bonne réponse : ${t(match[1], "fr")}`;
    if ((match = clean.match(/^⏰ Time's up! Correct answer: (.+)$/i))) return `⏰ Temps écoulé ! Bonne réponse : ${t(match[1], "fr")}`;
    if ((match = clean.match(/^Your Score:\s*(\d+)\s*\/\s*(\d+)$/i))) return `Votre score : ${match[1]} / ${match[2]}`;
    if ((match = clean.match(/^(\d+)% correct$/i))) return `${match[1]} % de bonnes réponses`;
    if ((match = clean.match(/^🔥 Best streak: (\d+)$/i))) return `🔥 Meilleure série : ${match[1]}`;

    // Quiz category label: "Geography • EASY".
    if ((match = clean.match(/^(.+?)\s*•\s*(EASY|MEDIUM|HARD)$/i))) {
      const diff = { EASY: "FACILE", MEDIUM: "MOYEN", HARD: "DIFFICILE" }[match[2].toUpperCase()];
      return `${t(match[1], "fr")} • ${diff}`;
    }

    // Chat prefixes and typing indicator.
    if ((match = clean.match(/^You:\s*(.*)$/i))) return `Vous : ${match[1]}`;
    if ((match = clean.match(/^AI:\s*(.*)$/i))) return `IA : ${t(match[1], "fr")}`;
    if (/^AI is typing\.*$/i.test(clean)) {
      const dots = (clean.match(/\.*$/) || [""])[0];
      return `L’IA écrit${dots}`;
    }

    if ((match = clean.match(/^\/([0-9]+) characters$/i))) return `/${match[1]} caractères`;

    return null;
  }

  function t(value, language = currentLanguage) {
    const raw = String(value ?? "");
    if (language === "en") return raw;

    const clean = normalize(raw);
    if (!clean) return raw;

    const exact = translations[language]?.[clean];
    if (exact != null) return exact;

    const dynamic = translateDynamic(clean, language);
    if (dynamic != null) return dynamic;

    return raw;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;

    const parentTag = node.parentElement?.tagName;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"].includes(parentTag)) return;

    // The first value seen for a text node is its English/source value.
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node) ?? "";

    if (currentLanguage === "en") {
      if (node.nodeValue !== original) node.nodeValue = original;
      return;
    }

    const trimmed = normalize(original);
    if (!trimmed) return;

    const translated = t(trimmed, currentLanguage);
    if (translated === trimmed || translated === original) return;

    const lead = original.match(/^\s*/)?.[0] || "";
    const trail = original.match(/\s*$/)?.[0] || "";
    const nextValue = `${lead}${translated}${trail}`;

    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }

  // Intentionally omit "value" so language switching can never overwrite
  // text that a visitor has typed into a form field.
  const translatableAttributes = ["placeholder", "title", "aria-label", "alt"];

  function translateElementAttributes(element) {
    if (!(element instanceof Element)) return;

    let store = originalAttributes.get(element);
    if (!store) {
      store = Object.create(null);
      originalAttributes.set(element, store);
    }

    for (const attr of translatableAttributes) {
      if (!element.hasAttribute(attr)) continue;
      if (!(attr in store)) store[attr] = element.getAttribute(attr);

      const original = store[attr];
      if (original == null) continue;

      const nextValue = currentLanguage === "en" ? original : t(original, currentLanguage);
      if (element.getAttribute(attr) !== nextValue) element.setAttribute(attr, nextValue);
    }
  }

  function translateSubtree(root) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }

    if (!(root instanceof Element) && root !== document.documentElement) return;

    if (root instanceof Element) translateElementAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);

    if (root.querySelectorAll) {
      root.querySelectorAll("*").forEach(translateElementAttributes);
    }
  }

  function updateLanguageControls() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === currentLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function startObserver() {
    if (observerStarted || !document.body) return;
    observer.observe(document.body, { childList: true, subtree: true });
    observerStarted = true;
  }

  function pauseObserver() {
    if (!observerStarted) return;
    observer.disconnect();
    observerStarted = false;
  }

  function apply(root = document.documentElement) {
    if (!root || applying) return;

    applying = true;
    const shouldResume = observerStarted;
    if (shouldResume) pauseObserver();

    try {
      document.documentElement.lang = currentLanguage;
      translateSubtree(root);
      updateLanguageControls();
    } finally {
      applying = false;
      if (shouldResume) startObserver();
    }
  }

  function setLanguage(language, { persist = true } = {}) {
    if (!supported.has(language)) return;

    currentLanguage = language;

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch (_) {}
    }

    apply(document.documentElement);
    window.dispatchEvent(new CustomEvent("ygtech:languagechange", {
      detail: { language }
    }));
  }

  function getLanguage() {
    return currentLanguage;
  }

  // Only observe added/replaced child nodes. We deliberately do NOT observe
  // characterData. Element.textContent/innerText updates replace child text
  // nodes and therefore still get translated, while recursive text mutation
  // loops are impossible.
  const observer = new MutationObserver((mutations) => {
    if (applying) return;

    const added = [];
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => added.push(node));
    }

    if (!added.length) return;

    pauseObserver();
    applying = true;
    try {
      for (const node of added) translateSubtree(node);
      updateLanguageControls();
    } finally {
      applying = false;
      startObserver();
    }
  });

  window.YGI18N = {
    register,
    t,
    setLanguage,
    getLanguage,
    apply,
    updateLanguageControls
  };

  document.addEventListener("DOMContentLoaded", () => {
    apply(document.documentElement);
    startObserver();
  });
})();
