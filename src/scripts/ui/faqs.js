import { ScrollTrigger } from '../../integrations/animation.js';
import { animateCollapse } from './collapse.js';
export function faqs() {
  /* --- FAQ Toggle Handler --- */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.faq-toggle');
    if (!button) return;

    const item = button.closest('.faq-item');
    if (!item) return;

    const content = item.querySelector('.faq-content');
    const icon = button.querySelector('.faq-icon');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const activeClass = 'text-brand-espresso-300';

    // Reset all sibling FAQs
    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove(activeClass);
        otherItem.querySelector('.faq-toggle')?.setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-icon')?.classList.remove('rotate-45');

        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent && window.getComputedStyle(otherContent).display !== 'none') {
          animateCollapse.slideUp(otherContent, 200);
        }
      }
    });

    if (isOpen) {
      button.setAttribute('aria-expanded', 'false');
      icon?.classList.remove('rotate-45');
      item.classList.remove(activeClass);
      animateCollapse.slideUp(content, 200).eventCallback('onComplete', () => {
        ScrollTrigger.refresh();
      });
    } else {
      button.setAttribute('aria-expanded', 'true');
      icon?.classList.add('rotate-45');
      item.classList.add(activeClass);
      animateCollapse.slideDown(content, 200).eventCallback('onComplete', () => {
        ScrollTrigger.refresh();
      });
    }
  });
}
