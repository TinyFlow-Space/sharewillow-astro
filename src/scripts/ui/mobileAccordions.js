import { gsap, ScrollTrigger } from '../../integrations/animation.js';
import { animateCollapse } from './collapse.js';
export function mobileAccordions() {
  /* --- Mobile Accordion Handler --- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mobile-accordion-btn');
    if (!btn) return;

    const content = btn.nextElementSibling;
    if (!content || !content.classList.contains('mobile-accordion-content')) return;

    const svg = btn.querySelector('svg');
    const isVisible = window.getComputedStyle(content).display !== 'none';

    // 1. Close all other open accordions (Sibling items)
    document.querySelectorAll('.mobile-accordion-content').forEach((item) => {
      if (item !== content && window.getComputedStyle(item).display !== 'none') {
        animateCollapse.slideUp(item, 250);
      }
    });

    document.querySelectorAll('.mobile-accordion-btn svg').forEach((icon) => {
      if (icon !== svg) icon.classList.remove('rotate-90');
    });

    // 2. Toggle current item (Self item)
    if (isVisible) {
      // Closing the active item
      svg?.classList.remove('rotate-90');
      
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          content.style.display = 'none'; // Guarantee DOM state display: none
          content.style.height = '';      // Clean up inline height inline override
          ScrollTrigger.refresh();
        },
      });
    } else {
      // Opening the target item
      svg?.classList.add('rotate-90');
      content.style.display = 'block';

      const targetHeight = content.scrollHeight;

      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: targetHeight,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            content.style.height = 'auto'; // Re-enable auto-height for responsive resizing
            ScrollTrigger.refresh();
          },
        }
      );
    }
  });


}
