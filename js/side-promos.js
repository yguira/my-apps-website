// =====================================================
// YG-TECH SITE-WIDE SIDE PROMOTIONS
// Automatically injects the quiz and article spotlights on every page.
// Internal links are resolved from this script's site-root location so
// the same file works from root pages and nested quiz/course pages.
// =====================================================

(function () {
  'use strict';

  // Prevent duplicate timers/observers if an older page still has a manual
  // <script src="js/side-promos.js"> tag while navbar-fix.js also loads it.
  if (window.__YGTECH_SIDE_PROMOS_INITIALIZED__) return;
  window.__YGTECH_SIDE_PROMOS_INITIALIZED__ = true;

  const QUIZ_ROTATION_MS = 8000;
  const ARTICLE_ROTATION_MS = 12000;

  const scriptElement = document.currentScript;
  const scriptUrl = scriptElement
    ? new URL(scriptElement.src, window.location.href)
    : new URL('js/side-promos.js', window.location.href);
  const siteRoot = new URL('../', scriptUrl);
  const siteUrl = (path) => new URL(path, siteRoot).href;

  // ---------------------------------------------------
  // CONTENT
  // Add future quizzes/articles here once and the entire
  // website will pick them up automatically.
  // ---------------------------------------------------

  const quizPromos = [
    {
      icon: '🌍',
      title: { en: 'Flag Frenzy', fr: 'Défi des drapeaux' },
      description: {
        en: "How well do you know the world's flags? Test yourself in a quick challenge.",
        fr: 'Reconnaissez-vous les drapeaux du monde ? Testez vos connaissances en quelques questions.'
      },
      link: 'quizzes/flag-quiz.html',
      badge: { en: 'TRENDING', fr: 'TENDANCE' }
    },
    {
      icon: '😄',
      title: { en: 'Emoji Challenge', fr: 'Défi Emoji' },
      description: {
        en: 'Decode movies, foods, places, and everyday phrases using emojis.',
        fr: 'Décodez des films, aliments, lieux et expressions du quotidien grâce aux emojis.'
      },
      link: 'quizzes/emoji-challenge.html',
      badge: { en: 'POPULAR', fr: 'POPULAIRE' }
    },
    {
      icon: '🧠',
      title: { en: 'General Knowledge', fr: 'Culture générale' },
      description: {
        en: 'Put your everyday knowledge to the test with a quick trivia challenge.',
        fr: 'Testez votre culture générale avec un quiz rapide et accessible.'
      },
      link: 'quizzes/general-knowledge.html',
      badge: { en: '', fr: '' }
    },
    {
      icon: '💻',
      title: { en: 'Tech Trivia', fr: 'Quiz Technologie' },
      description: {
        en: 'Think you know computers and technology? See how you score.',
        fr: 'Vous connaissez bien les ordinateurs et la technologie ? Découvrez votre score.'
      },
      link: 'quizzes/tech-trivia.html',
      badge: { en: 'TECH', fr: 'TECH' }
    },
    {
      icon: '🎬',
      title: { en: 'Movie Quiz', fr: 'Quiz Cinéma' },
      description: {
        en: 'Test your movie knowledge with questions from popular films.',
        fr: 'Testez vos connaissances du cinéma avec des questions sur des films populaires.'
      },
      link: 'quizzes/movie-quiz.html',
      badge: { en: '', fr: '' }
    },
    {
      icon: '🎵',
      title: { en: 'Music Quiz', fr: 'Quiz Musique' },
      description: {
        en: 'Challenge your knowledge of music, artists, and popular culture.',
        fr: 'Testez vos connaissances sur la musique, les artistes et la culture populaire.'
      },
      link: 'quizzes/music-quiz.html',
      badge: { en: '', fr: '' }
    }
  ];

  const articlePromos = [
    {
      icon: '🤖',
      category: { en: 'Artificial Intelligence', fr: 'Intelligence artificielle' },
      title: { en: 'What Is Artificial Intelligence?', fr: "Qu'est-ce que l'intelligence artificielle ?" },
      description: {
        en: 'A clear introduction to AI, machine learning, deep learning, and how modern AI systems work.',
        fr: "Une introduction claire à l'IA, à l'apprentissage automatique, au deep learning et au fonctionnement des systèmes modernes."
      },
      source: 'IBM',
      link: 'https://www.ibm.com/think/topics/artificial-intelligence',
      badge: { en: 'FEATURED', fr: 'À LA UNE' },
      external: true
    },
    {
      icon: '🌐',
      category: { en: 'Internet', fr: 'Internet' },
      title: { en: 'What Is DNS?', fr: "Qu'est-ce que le DNS ?" },
      description: {
        en: 'Learn how website names are translated into IP addresses and how your browser finds websites.',
        fr: 'Découvrez comment les noms de sites sont convertis en adresses IP et comment votre navigateur trouve les sites web.'
      },
      source: 'Cloudflare Learning Center',
      link: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
      badge: { en: 'LEARN', fr: 'DÉCOUVRIR' },
      external: true
    },
    {
      icon: '☁️',
      category: { en: 'Cloud Computing', fr: 'Cloud computing' },
      title: { en: 'What Is the Cloud?', fr: "Qu'est-ce que le cloud ?" },
      description: {
        en: 'A beginner-friendly explanation of cloud computing, servers, virtualization, and online services.',
        fr: 'Une explication accessible du cloud computing, des serveurs, de la virtualisation et des services en ligne.'
      },
      source: 'Cloudflare Learning Center',
      link: 'https://www.cloudflare.com/learning/cloud/what-is-the-cloud/',
      badge: { en: '', fr: '' },
      external: true
    },
    {
      icon: '🛡️',
      category: { en: 'Cybersecurity', fr: 'Cybersécurité' },
      title: { en: 'Protect Yourself From Online Scams', fr: 'Se protéger contre les arnaques en ligne' },
      description: {
        en: 'Learn practical ways to recognize scams, phishing attempts, malicious websites, and online fraud.',
        fr: "Découvrez des moyens pratiques de reconnaître les arnaques, l'hameçonnage, les sites malveillants et la fraude en ligne."
      },
      source: 'Google Safety Center',
      link: 'https://safety.google/safety/scams-fraud/',
      badge: { en: 'SECURITY', fr: 'SÉCURITÉ' },
      external: true
    }
  ];

  let currentQuizPromo = 0;
  let currentArticlePromo = 0;
  let quizTimer = null;
  let articleTimer = null;

  function getLanguage() {
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    if (htmlLang.startsWith('fr')) return 'fr';

    try {
      const stored = (
        localStorage.getItem('ygtechLanguage') ||
        localStorage.getItem('ygtech-language') ||
        localStorage.getItem('language') ||
        ''
      ).toLowerCase();
      if (stored.startsWith('fr')) return 'fr';
    } catch (error) {
      // localStorage can be unavailable in unusually restricted browsers.
    }

    return 'en';
  }

  function localized(value, lang) {
    if (value && typeof value === 'object') {
      return value[lang] || value.en || '';
    }
    return value || '';
  }

  function createPromoPanels() {
    if (!document.body) return false;

    if (!document.getElementById('quiz-promo')) {
      const quizAside = document.createElement('aside');
      quizAside.className = 'side-promo side-promo-left';
      quizAside.id = 'quiz-promo';
      quizAside.setAttribute('aria-label', 'Quiz spotlight');
      quizAside.innerHTML = '<div id="quiz-promo-content"></div>';
      document.body.appendChild(quizAside);
    }

    if (!document.getElementById('article-promo')) {
      const articleAside = document.createElement('aside');
      articleAside.className = 'side-promo side-promo-right';
      articleAside.id = 'article-promo';
      articleAside.setAttribute('aria-label', 'Featured article');
      articleAside.innerHTML = '<div id="article-promo-content"></div>';
      document.body.appendChild(articleAside);
    }

    return true;
  }

  function renderQuizPromo() {
    const container = document.getElementById('quiz-promo-content');
    if (!container) return;

    const lang = getLanguage();
    const quiz = quizPromos[currentQuizPromo];
    const badge = localized(quiz.badge, lang);

    container.innerHTML = `
      ${badge ? `<span class="promo-status">${badge}</span>` : ''}

      <div class="side-promo-inner promo-fade">
        <span class="side-promo-label">
          ${lang === 'fr' ? 'Quiz à découvrir' : 'Quiz Spotlight'}
        </span>

        <div class="side-promo-icon" aria-hidden="true">${quiz.icon}</div>

        <h3>${localized(quiz.title, lang)}</h3>
        <p>${localized(quiz.description, lang)}</p>

        <a href="${siteUrl(quiz.link)}" class="side-promo-button">
          ${lang === 'fr' ? 'Jouer maintenant →' : 'Play Now →'}
        </a>
      </div>

      <div class="promo-progress" aria-hidden="true">
        <div class="promo-progress-bar" style="animation-duration: ${QUIZ_ROTATION_MS}ms;"></div>
      </div>
    `;
  }

  function renderArticlePromo() {
    const container = document.getElementById('article-promo-content');
    if (!container) return;

    const lang = getLanguage();
    const article = articlePromos[currentArticlePromo];
    const badge = localized(article.badge, lang);
    const href = article.external ? article.link : siteUrl(article.link);
    const target = article.external
      ? 'target="_blank" rel="noopener noreferrer"'
      : '';

    container.innerHTML = `
      ${badge ? `<span class="promo-status">${badge}</span>` : ''}

      <div class="side-promo-inner promo-fade">
        <span class="side-promo-label">
          ${localized(article.category, lang)}
        </span>

        <div class="side-promo-icon" aria-hidden="true">${article.icon}</div>

        <h3>${localized(article.title, lang)}</h3>
        <p>${localized(article.description, lang)}</p>

        <span class="promo-source">
          ${lang === 'fr' ? 'Source' : 'Source'}: ${article.source}
        </span>

        <a href="${href}" class="side-promo-button" ${target}>
          ${article.external
            ? (lang === 'fr' ? "Lire l'article ↗" : 'Read Article ↗')
            : (lang === 'fr' ? "Lire l'article →" : 'Read Article →')}
        </a>
      </div>

      <div class="promo-progress" aria-hidden="true">
        <div class="promo-progress-bar" style="animation-duration: ${ARTICLE_ROTATION_MS}ms;"></div>
      </div>
    `;
  }

  function renderAll() {
    if (!createPromoPanels()) return;

    const lang = getLanguage();
    const quizAside = document.getElementById('quiz-promo');
    const articleAside = document.getElementById('article-promo');
    if (quizAside) {
      quizAside.setAttribute(
        'aria-label',
        lang === 'fr' ? 'Quiz à découvrir' : 'Quiz spotlight'
      );
    }
    if (articleAside) {
      articleAside.setAttribute(
        'aria-label',
        lang === 'fr' ? 'Article à la une' : 'Featured article'
      );
    }

    renderQuizPromo();
    renderArticlePromo();
  }

  function startRotation() {
    if (quizTimer) clearInterval(quizTimer);
    if (articleTimer) clearInterval(articleTimer);

    quizTimer = setInterval(() => {
      currentQuizPromo = (currentQuizPromo + 1) % quizPromos.length;
      renderQuizPromo();
    }, QUIZ_ROTATION_MS);

    articleTimer = setInterval(() => {
      currentArticlePromo = (currentArticlePromo + 1) % articlePromos.length;
      renderArticlePromo();
    }, ARTICLE_ROTATION_MS);
  }

  function init() {
    renderAll();
    startRotation();

    // If the bilingual system changes <html lang="..."> in place,
    // refresh both cards immediately without waiting for the next rotation.
    const langObserver = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'lang')) {
        renderAll();
      }
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    // Optional hook for the translation system if it dispatches a custom event.
    window.addEventListener('ygtech:languagechange', renderAll);
    window.addEventListener('languagechange', renderAll);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
