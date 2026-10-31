/**
 * main.js — Nizhal frontend interactions
 *
 * Self-contained, no build step needed.
 * Handles: navbar scroll, mobile menu, tabs, scroll animations, parallax.
 * Replaces Webflow's interaction engine on our own domain.
 */

(function () {
  'use strict';

  /* ── 1. Force everything visible (belt-and-braces over CSS) ─────────── */
  function forceVisible() {
    document.querySelectorAll('[data-w-id], img, h1, h2, h3, h4, h5, h6, p').forEach(function (el) {
      el.style.opacity  = '';
      el.style.transform = '';
    });
  }

  /* ── 2. Navbar: scroll state + mobile menu ───────────────────────────── */
  function initNavbar() {
    var nav = document.querySelector('.navbar-component');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile hamburger */
    var btn  = document.querySelector('.navbar-menu-button');
    var menu = document.querySelector('.navbar-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        var isOpen = btn.classList.contains('w--open');
        btn.classList.toggle('w--open', !isOpen);
        if (isOpen) {
          menu.style.display = '';
        } else {
          menu.style.display    = 'flex';
          menu.style.flexDirection = 'column';
        }
      });
    }

    /* Highlight active nav link based on URL */
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.navbar-link, .footer-link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (href === path) {
        a.classList.add('w--current');
      }
    });
  }

  /* ── 3. Tabs (testimonials) ──────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.w-tabs').forEach(function (tabs) {
      var links = tabs.querySelectorAll('.w-tab-link');
      var panes = tabs.querySelectorAll('.w-tab-pane');
      if (!links.length || !panes.length) return;

      function activate(i) {
        links.forEach(function (l, idx) {
          l.classList.toggle('w--current', idx === i);
          l.setAttribute('aria-selected', idx === i ? 'true' : 'false');
        });
        panes.forEach(function (p, idx) {
          p.classList.toggle('w--tab-active', idx === i);
          p.style.display = idx === i ? 'block' : 'none';
        });
      }

      activate(0);
      links.forEach(function (link, i) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          activate(i);
        });
      });
    });
  }

  /* ── 4. Scroll-triggered fade-up animations ──────────────────────────── */
  function initAnimations() {
    if (!('IntersectionObserver' in window)) return;

    /* Elements we want to animate in */
    var selectors = [
      '.portfolio-item',
      '.stat-item',
      '.stat-image-wrapper',
      '.about-component',
      '.testimonials-component',
      '.section-banner-cta .banner-cta-component',
      '.footer-component'
    ].join(', ');

    var targets = document.querySelectorAll(selectors);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) {
      el.classList.add('fade-up');
      observer.observe(el);
    });
  }

  /* ── 5. CTA banner parallax headings ────────────────────────────────── */
  function initParallax() {
    var top    = document.querySelector('.cta-heading-top');
    var bottom = document.querySelector('.cta-heading-bottom');
    if (!top && !bottom) return;

    var section = (top || bottom).closest('.section-banner-cta');
    if (!section) return;

    window.addEventListener('scroll', function () {
      var rect     = section.getBoundingClientRect();
      var inView   = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      var progress = 1 - rect.bottom / (window.innerHeight + rect.height);
      var px       = (progress * 50).toFixed(2);

      if (top)    top.style.transform    = 'translateX(calc(-4% - ' + px + 'px))';
      if (bottom) bottom.style.transform = 'translateX(calc(4% + ' + px  + 'px))';
    }, { passive: true });
  }

  /* ── 6. Contact form — POST to /api/contact ─────────────────────────── */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var success = document.querySelector('.form-success');
    var error   = document.querySelector('.form-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {
        name:    form.querySelector('[name="name"]')    ? form.querySelector('[name="name"]').value    : '',
        email:   form.querySelector('[name="email"]')   ? form.querySelector('[name="email"]').value   : '',
        message: form.querySelector('[name="message"]') ? form.querySelector('[name="message"]').value : ''
      };

      var btn = form.querySelector('[type="submit"], .button');
      if (btn) btn.disabled = true;

      fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            form.style.display = 'none';
            if (success) { success.style.display = 'block'; }
          } else {
            if (error) {
              error.style.display = 'block';
              error.textContent   = (json.errors || [json.message]).join(' ');
            }
            if (btn) btn.disabled = false;
          }
        })
        .catch(function () {
          if (error) {
            error.style.display = 'block';
            error.textContent   = 'Something went wrong. Please try again.';
          }
          if (btn) btn.disabled = false;
        });
    });
  }

  /* ── Boot ────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    forceVisible();
    initNavbar();
    initTabs();
    initAnimations();
    initParallax();
    initContactForm();
  });

})();

