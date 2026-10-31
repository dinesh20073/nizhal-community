/**
 * animations.js
 * Fade-in animations using IntersectionObserver.
 * Works without Webflow's proprietary interaction engine.
 */

export function initAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.section-about, .section-stats, .section-portfolio, ' +
    '.section-testimonials, .section-banner-cta, ' +
    '.portfolio-item, .stat-item, .about-component'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => {
    // Only animate if not already visible
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}

