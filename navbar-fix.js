// Fetch and inject navbar
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    // Enable search functionality
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
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
          'vlc': 'downloads.html',
          'vlc media player': 'downloads.html',
          'media player': 'downloads.html',
          '7zip': 'downloads.html',
          '7-zip': 'downloads.html',
          'file archiver': 'downloads.html',
          'calculator': 'downloads.html',
          'organizer': 'downloads.html',
          'invoice': 'downloads.html'
        };

        let found = false;
        for (const keyword in routes) {
          if (query.includes(keyword)) {
            window.location.href = routes[keyword];
            found = true;
            break;
          }
        }

        if (!found) {
          alert("No match found. Try a different keyword.");
        }
      });
    }

    // Hamburger toggle functionality
    const toggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('show');
        });
      });
    }
  })
  .catch(error => {
    console.error('Error loading navbar:', error);
  });

// Scroll behavior to hide/show navbar
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const currentScroll = window.scrollY;

  if (!nav) return;

  if (currentScroll > lastScrollTop && currentScroll > 50) {
    nav.style.top = "-100px";
    if (hamburger) hamburger.classList.add("hide");
  } else {
    nav.style.top = "0";
    if (hamburger) hamburger.classList.remove("hide");
  }

  lastScrollTop = currentScroll;
});
