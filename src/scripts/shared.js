import { smoothScroll } from './ui/smoothScroll.js';
import { headerScroll } from './ui/headerScroll.js';
import { mobileDrawer } from './ui/mobileDrawer.js';
import { mobileAccordions } from './ui/mobileAccordions.js';
import { faqs } from './ui/faqs.js';
import { dropdowns } from './ui/dropdowns.js';
import { skipLinks } from './ui/skipLinks.js';

document.addEventListener('DOMContentLoaded', () => {
  const lenis = smoothScroll();
  headerScroll(lenis);
  mobileDrawer(lenis);
  mobileAccordions();
  faqs();
  dropdowns();
  skipLinks();
});
