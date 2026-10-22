
export function mobileDrawer(lenis) {
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';

      mobileBtn.setAttribute('aria-expanded', String(!isExpanded));
      hamburgerIcon?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');

      if (isExpanded) {
        mobileDrawer.classList.add('hidden');
        mobileDrawer.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        lenis.start();
      } else {
        mobileDrawer.classList.remove('hidden');
        mobileDrawer.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        lenis.stop();
      }
    });
  }
}
