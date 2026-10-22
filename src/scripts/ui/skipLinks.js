
export function skipLinks() {
  const skipLinks = document.querySelectorAll('[data-target="skip-link"]');

  skipLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        // Focus function: Shifts focus to first interactive element or target container
        const focusTarget = () => {
          const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            'details',
            '[tabindex]:not([tabindex="-1"])'
          ].join(',');

          // Find visible focusable elements inside target container
          const focusables = Array.from(
            targetElement.querySelectorAll(focusableSelectors)
          ).filter((el) => el.offsetParent !== null);

          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            // Fallback: Make container temporarily focusable and focus it
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            targetElement.addEventListener(
              'blur',
              () => targetElement.removeAttribute('tabindex'),
              { once: true }
            );
          }
        };

        // Scroll listener handling (syncs scroll finish before shifting keyboard focus)
        let scrollTimeout;
        let hasScrolled = false;

        const onScroll = () => {
          hasScrolled = true;
          window.clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            window.removeEventListener('scroll', onScroll);
            focusTarget();
          }, 60);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Fallback execution if no scrolling occurs (e.g., target already in view)
        setTimeout(() => {
          if (!hasScrolled) {
            window.removeEventListener('scroll', onScroll);
            focusTarget();
          }
        }, 100);
      }
    });
  });

}
