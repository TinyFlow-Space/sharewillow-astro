import { gsap } from '../../integrations/animation.js';
export const animateCollapse = {
    slideUp(element, duration = 250) {
      return gsap.to(element, {
        height: 0,
        opacity: 0,
        duration: duration / 1000,
        ease: 'power2.out',
        onComplete: () => {
          element.style.display = 'none';
        },
      });
    },
    slideDown(element, duration = 250) {
      element.style.display = 'block';
      const targetHeight = element.scrollHeight;

      return gsap.fromTo(
        element,
        { height: 0, opacity: 0 },
        {
          height: targetHeight,
          opacity: 1,
          duration: duration / 1000,
          ease: 'power2.out',
          onComplete: () => {
            element.style.height = 'auto';
          },
        }
      );
    },
  };


