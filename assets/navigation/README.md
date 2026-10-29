# INWARD glass navigation

The user supplied `original.svg`. Icon and label paths remain from that artwork. The same capsule moves between the four tabs.

## Animation

The official Motion 14.7.1 browser build is vendored and embedded inline. `glass-nav.js` calls `Motion.animateMini` to animate the capsule transform using the browser Web Animations API, with a 35ms follow delay and a 0.26-second horizontal transition. Interrupted animations retain the current painted position before retargeting. A lightweight render callback tracks the native transform for soft lighting. Resize and keyboard handling preserve alignment; reduced-motion preferences are respected.

## Glass

The implementation was restudied against rdev/liquid-glass-react's source: separate sharp content, blurred glass and masked border layers; directional low-intensity gradients instead of a bright white hotspot. CSS and WebKit mask/backdrop declarations provide the rim treatment without introducing React or relying on Chromium-only displacement filters.

## References and package provenance

- https://github.com/rdev/liquid-glass-react — approximately 6,551 GitHub stars and 133,657 monthly npm downloads at the 2026-10-29 check. Used as a visual/implementation reference.
- https://github.com/motiondivision/motion — approximately 34,641 GitHub stars and 94,742,950 monthly npm downloads at the check. Actual animation runtime used.
- Counts were read from GitHub repository pages and npm registry search metadata. They are time-specific observations, recorded in `references.json`.
- The Motion npm tarball's SHA-512 was verified against registry metadata before using its bundle. Bundle SHA-256 and package provenance are in `references.json`.
- Licenses are retained in `vendor/`.

The source SVG, split navigation markup, CSS, controller and vendor runtime are kept in this directory. Both application entry HTML files embed the CSS and scripts for offline use. Dialogue/Relax behavior and drafts are preserved; Report and Me remain Coming soon tab views.

Visible-motion fix: reduced-motion mode retains a short non-bouncy transition rather than skipping animation entirely. The darker translucent gray capsule improves movement visibility. `../../navigation-preview.html` is a standalone review page at a new URL, avoiding old application-page caches.

Glass-lift revision: button color changes immediately. Horizontal travel follows after 35ms and lasts 260ms (20ms / 210ms in reduced-motion mode). A synchronized 400ms shape animation raises the capsule from 55px to 105px in a 70px bar, centered at top -17.5px, then returns it to 55px / 7.5px. This extends 25% of bar height above and below it. Navigation overflow is visible; backdrop blur lives on a separate rounded base layer. During moving/landing states the capsule remains translucent with blur and soft rim highlights, becoming gray only once the landing finishes. Interrupted transitions retain position, height and top values. The standalone preview uses the same controller and CSS.
