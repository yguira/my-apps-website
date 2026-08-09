// Shared navbar loader for the entire site.
// Resolves links from this script's location so one navbar works from root and nested pages.

(function () {
  const navbarPlaceholder = document.getElementById('navbar');
  if (!navbarPlaceholder) return;

  const scriptElement = document.currentScript;
  const scriptUrl = scriptElement
    ? new URL(scriptElement.src, window.location.href)
    : new URL('navbar-fix.js', window.location.href);
  const siteRoot = new URL('./', scriptUrl);
  const siteUrl = (path) => new URL(path, siteRoot).href;

  fetch(siteUrl('navbar.html'))
    .then((response) => {
      if (!response.ok) throw new Error(`Navbar request failed: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      navbarPlaceholder.innerHTML = data;

      navbarPlaceholder.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http://') ||
            href.startsWith('https://') || href.startsWith('mailto:') ||
            href.startsWith('tel:')) return;
        link.href = siteUrl(href);
      });

      const searchForm = document.getElementById('search-form');
      const searchInput = document.getElementById('search-input');
      if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function (event) {
          event.preventDefault();
          const query = searchInput.value.toLowerCase().trim();
          const routes = {
            'home': 'index.html',
            'invoice': 'index.html#software',
            'software': 'index.html#software',
            'android': 'index.html#software',
            'windows': 'index.html#software',
            'support': 'support.html',
            'faq': 'faq.html',
            'privacy': 'privacy.html',
            'terms': 'terms.html',
            'release notes': 'changelog.html',
            'changelog': 'changelog.html',
            'chat': 'index.html#chatbox',
            'contact': 'index.html#contact',
            'about': 'index.html#about',
            'developer': 'index.html#Programmer',
            'programmer': 'index.html#Programmer',
            'quizzes': 'quizzes.html',
            'quiz': 'quizzes.html',
            'downloads': 'downloads.html',
            'download': 'downloads.html',
            'vlc': 'downloads.html',
            'notepad': 'downloads.html',
            '7-zip': 'downloads.html',
            '7zip': 'downloads.html',
            'gimp': 'downloads.html',
            'audacity': 'downloads.html',
            'data science': 'data-resources.html',
            'machine learning': 'data-resources.html',
            'statistics': 'statistics.html',
            'datasets': 'datasets.html',
            'dataset': 'datasets.html'
          };

          for (const keyword in routes) {
            if (query.includes(keyword)) {
              window.location.href = siteUrl(routes[keyword]);
              return;
            }
          }
          alert('No match found. Try invoice, datasets, quizzes, statistics, downloads, or contact.');
        });
      }

      // Keep "Home" anchored to the true top of the site and mark the current page.
      const currentFile = window.location.pathname.split('/').pop() || 'index.html';
      navbarPlaceholder.querySelectorAll('.nav-menu a').forEach((link) => {
        const target = new URL(link.href, window.location.href);
        const targetFile = target.pathname.split('/').pop() || 'index.html';

        if (targetFile === currentFile && (!target.hash || target.hash === window.location.hash)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }

        if (targetFile === 'index.html' && !target.hash) {
          link.addEventListener('click', (event) => {
            const onHomePage = currentFile === 'index.html';
            if (!onHomePage) return;
            event.preventDefault();
            history.replaceState(null, '', window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });

      const toggleBtn = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');
      if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
          const isOpen = navLinks.classList.toggle('show');
          toggleBtn.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            toggleBtn.setAttribute('aria-expanded', 'false');
          });
        });
      }
    })
    .catch((error) => console.error('Error loading navbar:', error));

  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.scrollY;
    if (!nav) return;

    if (currentScroll > lastScrollTop && currentScroll > 120) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollTop = Math.max(currentScroll, 0);
  }, { passive: true });
})();
