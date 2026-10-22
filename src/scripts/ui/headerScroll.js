
export function headerScroll(lenis) {
  const header = document.getElementById('main-header');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (header) {
    let lastScrollTop = 0;

    lenis.on('scroll', ({ scroll }) => {
      // Don't auto-hide header if mobile menu is actively open
      if (mobileDrawer?.classList.contains('flex')) return;

      if (Math.abs(lastScrollTop - scroll) <= 10) return;

      if (scroll > lastScrollTop && scroll > 120) {
        header.classList.add('nav-hidden');
      } else {
        header.classList.remove('nav-hidden');
      }

      lastScrollTop = scroll;
    });
  }
}
