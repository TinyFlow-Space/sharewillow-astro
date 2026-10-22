import { gsap, ScrollTrigger, Lenis } from '../../integrations/animation.js';
export function smoothScroll() {

  /* ==========================================================================
     1. Initialize Lenis Smooth Scroll & GSAP Integration
     ========================================================================== */
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
