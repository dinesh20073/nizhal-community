/**
 * navbar.js
 * Handles scroll state and mobile menu toggle.
 */

export function initNavbar() {
  const nav = document.querySelector('.navbar-component');
  if (!nav) return;

  // Add .is-scrolled class once user scrolls past 40px
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once in case page loads scrolled

  // Mobile hamburger toggle
  const menuButton = document.querySelector('.navbar-menu-button');
  const navMenu    = document.querySelector('.navbar-menu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.classList.contains('w--open');

      menuButton.classList.toggle('w--open', !isOpen);
      navMenu.style.display = isOpen ? '' : 'flex';
      navMenu.style.flexDirection = 'column';
    });
  }

  // Highlight the current page link
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.navbar-link').forEach((link) => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath) {
      link.classList.add('w--current');
    } else {
      link.classList.remove('w--current');
    }
  });
}

