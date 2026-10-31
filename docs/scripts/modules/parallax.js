/**
 * parallax.js
 * Subtle parallax translation on the CTA banner headings on scroll.
 */

export function initParallax() {
  const topHeading    = document.querySelector('.cta-heading-top');
  const bottomHeading = document.querySelector('.cta-heading-bottom');

  if (!topHeading && !bottomHeading) return;

  const onScroll = () => {
    const section = (topHeading || bottomHeading).closest('.section-banner-cta');
    if (!section) return;

    const rect  = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    // progress: 0 when section top hits viewport bottom, 1 when it leaves top
    const progress = 1 - rect.bottom / (window.innerHeight + rect.height);
    const offset   = progress * 40; // max 40px travel

    if (topHeading)    topHeading.style.transform    = `translateX(calc(-3% - ${offset}px))`;
    if (bottomHeading) bottomHeading.style.transform = `translateX(calc(3% + ${offset}px))`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

