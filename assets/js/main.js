/**
 * SORRINDO COM VOCÊ — Main Script
 * Handles: Menu, Scroll, Reveal, Counters, Carousel
 */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initRevealAnimations();
  initCounterAnimation();
  initTestimonialsCarousel();
  initNavHighlight();
  initCurrentYear();
  initTreatmentAccordion();
});

/* ── HEADER ─────────────────────────────────────────────────── */
function initHeader() {
  const header = $('#header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    });
  }, { passive: true });

  // Run once on load
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}

/* ── MOBILE MENU ────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle     = $('#menuToggle');
  const menu       = $('#mobileMenu');
  const overlay    = $('#menuOverlay');
  const closeLinks = $$('[data-close-menu]');

  if (!toggle || !menu || !overlay) return;

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('a', menu)?.focus(), 300);
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  closeLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });

  // Focus trap
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !menu.classList.contains('is-open')) return;
    const focusable = $$('a, button', menu);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

/* ── REVEAL ON SCROLL ───────────────────────────────────────── */
function initRevealAnimations() {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ── COUNTER ANIMATION ──────────────────────────────────────── */
function initCounterAnimation() {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  // Skip animation if reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(el => {
      el.textContent = parseInt(el.dataset.target, 10).toLocaleString('pt-BR');
    });
    return;
  }

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const duration = 1600;
    let startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(easeOutQuart(progress) * target).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR');
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ── TESTIMONIALS CAROUSEL ──────────────────────────────────── */
function initTestimonialsCarousel() {
  const track   = $('#testimonialsTrack');
  const dotsEl  = $('#testimonialDots');
  const prevBtn = $('#testimonialPrev');
  const nextBtn = $('#testimonialNext');

  if (!track) return;

  const items = $$('.testimonial', track);
  if (!items.length) return;

  let current     = 0;
  let autoplayTimer = null;

  // Build dots
  if (dotsEl) {
    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonials__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === 0));
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      dotsEl.appendChild(dot);
    });
  }

  function getOffset(index) {
    // Use element positions for accuracy across breakpoints
    const trackRect  = track.getBoundingClientRect();
    const itemRect   = items[index].getBoundingClientRect();
    // Current offset + difference between item and track left edge
    const currentTranslate = getComputedTranslate();
    return currentTranslate + (itemRect.left - trackRect.left);
  }

  function getComputedTranslate() {
    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    return -matrix.m41; // translateX value (negated)
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, items.length - 1));
    // Calculate offset cleanly
    const trackRect = track.getBoundingClientRect();
    let offset = 0;
    for (let i = 0; i < current; i++) {
      const style = window.getComputedStyle(track);
      const gap   = parseFloat(style.gap) || 24;
      offset += items[i].getBoundingClientRect().width + gap;
    }
    track.style.transform = `translateX(-${offset}px)`;

    $$('.testimonials__dot', dotsEl).forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function next() { goTo(current >= items.length - 1 ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? items.length - 1 : current - 1); }

  function startAutoplay() {
    autoplayTimer = setInterval(next, 5500);
  }
  function stopAutoplay()  { clearInterval(autoplayTimer); }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  prevBtn?.addEventListener('click', () => { prev(); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { next(); resetAutoplay(); });

  // Touch / swipe
  let touchStartX = 0;
  let touchStartY = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      dx < 0 ? next() : prev();
      resetAutoplay();
    }
  }, { passive: true });

  // Keyboard
  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });

  // Pause on hover/focus
  const wrapper = track.closest('.testimonials__track-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
    wrapper.addEventListener('focusin',    stopAutoplay);
    wrapper.addEventListener('focusout',   startAutoplay);
  }

  // Recalculate on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 200);
  }, { passive: true });

  goTo(0);
  startAutoplay();
}

/* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────── */
function initNavHighlight() {
  const sections = $$('section[id]');  // only sections, not divs
  const navLinks = $$('.header__nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, {
    rootMargin: '-35% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ── CURRENT YEAR ───────────────────────────────────────────── */
function initCurrentYear() {
  const el = $('#currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── TREATMENT ACCORDION (touch + click) ───────────────────── */
function initTreatmentAccordion() {
  const items = $$('.treatment-item');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Fechar todos os outros
      items.forEach(other => {
        if (other !== item) other.classList.remove('is-open');
      });

      // Alternar o atual
      item.classList.toggle('is-open', !isOpen);
    });

    // Acessibilidade: teclado
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}
