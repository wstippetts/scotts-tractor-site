/* ============================================================
   SCOTT'S TRACTOR SERVICE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL PROGRESS BAR ── */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── NAVBAR SCROLL STATE ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    // Scrolled state
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ── HAMBURGER MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ── INTERSECTION OBSERVER — REVEAL ANIMATIONS ── */
  const revealEls = document.querySelectorAll('.reveal');
  const staggerEls = document.querySelectorAll('.stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
  staggerEls.forEach(el => revealObserver.observe(el));

  /* ── ANIMATED COUNTERS ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ── PARALLAX HERO ── */
  const hero = document.getElementById('hero');
  function parallaxHero() {
    if (window.scrollY > window.innerHeight) return;
    const offset = window.scrollY * 0.35;
    const overlay = hero.querySelector('.hero-overlay') || hero.querySelector('.hero-static-bg');
    if (overlay) overlay.style.transform = `translateY(${offset}px)`;
    const video = document.getElementById('hero-video');
    if (video) video.style.transform = `translateY(${offset}px)`;
  }

  /* ── MAIN SCROLL HANDLER ── */
  function onScroll() {
    updateProgress();
    updateNav();
    parallaxHero();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── VIDEO BACKGROUND ── */
  // The <video> element is in the HTML but hidden until a src is present.
  // This checks for a src and shows/hides the placeholder accordingly.
  const heroVideo = document.getElementById('hero-video');
  const heroPh    = document.getElementById('hero-video-placeholder');

  function checkVideo() {
    if (!heroVideo) return;
    const source = heroVideo.querySelector('source');
    const src = source ? source.getAttribute('src') : heroVideo.getAttribute('src');
    const hasSrc = src && src.trim() !== '';
    if (hasSrc) {
      heroVideo.style.display = 'block';
      if (heroPh) heroPh.style.display = 'none';
      heroVideo.load();
      heroVideo.play().catch(() => {
        // Autoplay may be blocked in some browsers, but muted should usually allow it.
      });
    } else {
      heroVideo.style.display = 'none';
      if (heroPh) heroPh.style.display = 'flex';
    }
  }
  checkVideo();

  /* ── SMOOTH SCROLL for older browsers ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
