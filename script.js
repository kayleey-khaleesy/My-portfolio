

document.addEventListener("DOMContentLoaded", () => {
  
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector("#primary-nav");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navList.style.display = expanded ? "none" : "flex";
    });
  }

  
  const typingEl = document.querySelector(".typing");
  const texts = [
    "Creative Web Developer",
    "AI Enthusiast",
    "Front-End Developer",
  ];
  let tIndex = 0,
    charIndex = 0,
    deleting = false;

  function typeTick() {
    const current = texts[tIndex];
    if (!deleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeTick, 1100);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        tIndex = (tIndex + 1) % texts.length;
      }
    }
    setTimeout(typeTick, deleting ? 55 : 110);
  }
  if (typingEl) typeTick();

  
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  
  const revealElems = document.querySelectorAll(".project-card, .card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElems.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 600ms ease, transform 600ms ease";
    observer.observe(el);
  });
});
