// common.js

// 👉 Dynamically add padding to body based on navbar height
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  if (nav) {
    const navHeight = nav.offsetHeight;
    document.body.style.paddingTop = navHeight + "px";
  }
});

// 👉 Hide/show navbar + hamburger on scroll
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && currentScroll > 50) {
    // Scrolling down
    if (nav) nav.style.top = "-100px";
    if (hamburger) hamburger.classList.add("hide");
  } else {
    // Scrolling up
    if (nav) nav.style.top = "0";
    if (hamburger) hamburger.classList.remove("hide");
  }

  lastScrollTop = currentScroll;
});
