/**
 * tabs.js
 * Testimonial / general tab switching.
 * Replaces Webflow's built-in w-tabs behaviour.
 */

export function initTabs() {
  const tabComponents = document.querySelectorAll('.w-tabs');

  tabComponents.forEach((component) => {
    const links  = component.querySelectorAll('.w-tab-link, .testimonial-tab-link');
    const panes  = component.querySelectorAll('.w-tab-pane, .tab-pane');

    if (!links.length || !panes.length) return;

    const activate = (index) => {
      links.forEach((l, i) => {
        l.classList.toggle('w--current', i === index);
        l.classList.toggle('is-active',  i === index);
        l.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      panes.forEach((p, i) => {
        p.classList.toggle('w--tab-active', i === index);
        p.classList.toggle('is-active',     i === index);
        p.style.display = i === index ? 'block' : 'none';
      });
    };

    // Initialize first tab active
    activate(0);

    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        activate(index);
      });
    });
  });
}

