// Shared navbar loader for the entire site.
// This file lives in the project root and can be loaded from root pages
// or nested pages such as /quizzes/, /gen-math-courses/, and /ml-courses/.

(function () {
  const navbarPlaceholder = document.getElementById('navbar');

  if (!navbarPlaceholder) {
    return;
  }

  // Resolve the site root from THIS script's location rather than from the
  // current HTML page. This keeps navbar paths working from nested folders.
  const scriptElement = document.currentScript;
  const scriptUrl = scriptElement
    ? new URL(scriptElement.src, window.location.href)
    : new URL('navbar-fix.js', window.location.href);
  const siteRoot = new URL('./', scriptUrl);

  const siteUrl = (path) => new URL(path, siteRoot).href;

  fetch(siteUrl('navbar.html'))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Navbar request failed: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      navbarPlaceholder.innerHTML = data;

      // Convert all navbar links from project-root-relative paths to URLs
      // based on the actual site root. This works locally and on GitHub Pages.
      navbarPlaceholder.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');

        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:')
        ) {
          return;
        }

        link.href = siteUrl(href);
      });

      // Enable search functionality.
      const searchForm = document.getElementById('search-form');
      const searchInput = document.getElementById('search-input');

      if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const query = searchInput.value.toLowerCase().trim();

          const routes = {
            'chat': 'index.html#chatbox',
            'contact': 'index.html#contact',
            'about': 'index.html#about',
            'quizzes': 'quizzes.html',
            'quiz': 'quizzes.html',
            'downloads': 'downloads.html',
            'download': 'downloads.html',
            'programmer': 'index.html#Programmer',
            'home': 'index.html#home',
            'vlc media player': 'downloads.html',
            'media player': 'downloads.html',
            'vlc': 'downloads.html',
            '7-zip': 'downloads.html',
            '7zip': 'downloads.html',
            'file archiver': 'downloads.html',
            'calculator': 'downloads.html',
            'organizer': 'downloads.html',
            'invoice': 'downloads.html',
            'data science': 'data-resources.html',
            'datasets': 'datasets.html',
            'dataset': 'datasets.html',
            'statistics': 'statistics.html'
          };

          for (const keyword in routes) {
            if (query.includes(keyword)) {
              window.location.href = siteUrl(routes[keyword]);
              return;
            }
          }

          alert('No match found. Try a different keyword.');
        });
      }

      // Hamburger toggle functionality.
      const toggleBtn = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');

      if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
          navLinks.classList.toggle('show');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('show');
          });
        });
      }
    })
    .catch((error) => {
      console.error('Error loading navbar:', error);
    });

  // Scroll behavior to hide/show navbar.
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const currentScroll = window.scrollY;

    if (!nav) return;

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      nav.style.top = '-100px';
      if (hamburger) hamburger.classList.add('hide');
    } else {
      nav.style.top = '0';
      if (hamburger) hamburger.classList.remove('hide');
    }

    lastScrollTop = currentScroll;
  });
})();
