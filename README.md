# ShareWillow — Astro migration

A structural migration of the three supplied HTML pages to **Astro 7.4.2 + Tailwind CSS 4.3.3**. The original project remains unchanged in the parent directory.

## Run

Requires Node.js **22.23.4 or newer**.

```sh
cd sharewillow-astro
npm ci
npm run dev
```

If your terminal is already in this directory, omit `cd sharewillow-astro`.

```sh
npm run check
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. Routes retain their original filenames: `/`, `/index.html`, `/blog.html`, and `/blog-details.html`. This configuration assumes the site is hosted at the domain root. Canonical/social metadata deliberately retains the original production URLs; update those explicitly when changing the production domain.

## Organization

```text
src/
  pages/                    Page composition and page-specific script entrypoints
  layouts/SiteLayout.astro  Document shell, shared CSS, header, skip link, footer
  components/
    navigation/             Header variants, reusable dropdown, mobile/desktop menus
    home/                   Home page sections
    blog/                   Blog/article sections and reusable article cards
    metadata/               Original page titles, metadata, canonical URLs, icons
    CallToAction.astro      Shared closing call-to-action
    Footer.astro            Shared footer composition
  data/latest-articles.json Article card content
  scripts/
    entries/                Page-specific client entrypoints
    ui/                     Smooth scroll, header, drawer, accordions, dropdowns, skip links
    shared.js               Shared initialization
    home.js                 Lottie/GSAP home interactions and accessible tabs
    blog.js                 Mobile filter drawer
  integrations/animation.js npm imports for GSAP, ScrollTrigger, and Lenis
  styles/global.css         Original Tailwind theme and custom CSS
public/src/assets/          All 54 original assets, unchanged
tests/parity.mjs           Original-versus-production browser comparison
```

Public assets retain their original `src/assets` URL paths, including Lottie JSON and font filenames. This avoids asset optimization, conversion, and filename changes. Font references in the CSS were corrected for the bundled stylesheet location.

Tailwind v4 uses its official Vite plugin. The theme, breakpoints, raw CSS, classes, animation settings, and responsive markup are preserved. New styles should be added deliberately; do not clean up unusual legacy classes without checking visual parity.

GSAP 3.12.5, Lenis 1.1.18, and lottie-web 5.12.2 match the old CDN versions. The previously unpinned `@lottiefiles/lottie-player@latest` is pinned to 2.0.12. All are bundled from npm, with no JavaScript library CDN dependency. No React or other UI framework is included. No Optimizely integration is included, per the clarification that “Optimizely” meant code optimization.

## Verification

```sh
npx playwright install chromium
npm run build
npm run test:parity
```

The parity test expects the original HTML and `src/` in the parent directory. Set `ORIGINAL_SITE=/absolute/path/to/original` if they are elsewhere. It creates an isolated baseline in the OS temporary directory, using the original Tailwind source and the matching compiler. The supplied original `dist/output.css` was absent, and its preinstalled dependencies lacked macOS native binaries; neither is modified by the test.

The test checks DOM structure, original asset bytes, full-page screenshots at 390/768/991/992/1024/1440 px, and desktop/mobile interactions against the original. Original CDN requests are fulfilled from matching installed packages so network availability does not alter results. Static screenshot comparisons disable JavaScript and CSS animations equally on both versions; separate live browser checks exercise JavaScript, Lottie initialization, scroll transitions, keyboard navigation, tabs, and accordions. Screenshots and `report.json` are generated under `test-results/`.

See [MIGRATION.md](MIGRATION.md) for source limitations and validation scope.
