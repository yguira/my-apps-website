// Lightweight, accessible screenshot viewer for Invoice Studio galleries.
(function () {
  const lightbox = document.getElementById('screenshot-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  let lastTrigger = null;

  function openLightbox(button) {
    const imagePath = button.dataset.galleryImage;
    const altText = button.dataset.galleryAlt || 'Invoice Studio screenshot';
    if (!imagePath) return;

    lastTrigger = button;
    lightboxImage.src = imagePath;
    lightboxImage.alt = altText;
    lightboxCaption.textContent = button.closest('figure')?.querySelector('figcaption')?.textContent || altText;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox-close')?.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.src = '';
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-gallery-image]').forEach((button) => {
    button.addEventListener('click', () => openLightbox(button));
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((button) => {
    button.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });


  // Horizontal screenshot carousel controls. Swiping/trackpad scrolling still works.
  document.querySelectorAll('.carousel-arrow[data-carousel-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const rail = document.getElementById(button.dataset.carouselTarget);
      if (!rail) return;
      const direction = button.classList.contains('carousel-prev') ? -1 : 1;
      const amount = Math.max(220, rail.clientWidth * 0.82);
      rail.scrollBy({ left: direction * amount, behavior: 'smooth' });
    });
  });

})();
