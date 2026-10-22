
export function dropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-dropdown-item');

  const toggleDropdown = (item, forceOpen) => {
    const btn = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');
    if (!btn || !menu) return;

    const isOpen = forceOpen !== undefined ? forceOpen : btn.getAttribute('aria-expanded') !== 'true';

    btn.setAttribute('aria-expanded', String(isOpen));
    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('block', isOpen);
  };

  dropdownItems.forEach((item) => {
    const btn = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');

    // 1. Click Handler for Toggle Button
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(item);
    });

    // 2. Keydown Navigation on Toggle Button
    btn?.addEventListener('keydown', (e) => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Open and move focus on Enter, Space, or ArrowDown
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) toggleDropdown(item, true);

        // Shift focus to the first interactive menu item
        requestAnimationFrame(() => {
          menu?.querySelector('a, button')?.focus();
        });
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        toggleDropdown(item, false);
        btn.focus();
      }
    });

    // 3. Keydown Navigation Inside Menu Links
    menu?.addEventListener('keydown', (e) => {
      const targetItem = e.target.closest('a, button');
      if (!targetItem) return;

      const items = Array.from(menu.querySelectorAll('a, button'));
      const currentIndex = items.indexOf(targetItem);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        toggleDropdown(item, false);
        btn?.focus();
      }
    });

    // 4. Focusout Handling (Auto-close when tabbing out of the component)
    item.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!item.contains(document.activeElement)) {
          toggleDropdown(item, false);
        }
      }, 10);
    });
  });
}
