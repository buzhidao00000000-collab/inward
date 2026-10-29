# INWARD glass navigation

The user supplied `original.svg`. Icon and label paths remain from that artwork. The same capsule moves between the four tabs.

## Animation

The official Motion 14.7.1 browser build is vendored and embedded inline. `glass-nav.js` calls `Motion.animateMini` to animate the capsule transform using the browser Web Animations API, with a 0.62-second transition. Interrupted animations retain the current painted position before retargeting. A lightweight render callback tracks the native transform for soft lighting. Resize and keyboard handling preserve alignment; reduced-motion preferences are respected.

## Glass

The implementation was restudied against rdev/liquid-glass-react's source: separate sharp content, blurred glass and masked border layers; directional low-intensity gradients instead of a bright white hotspot. CSS and WebKit mask/backdrop declarations provide the rim treatment without introducing React or relying on Chromium-only displacement filters.

## References and package provenance

- https://github.com/rdev/liquid-glass-react — approximately 6,551 GitHub stars and 133,657 monthly npm downloads at the 2026-10-29 check. Used as a visual/implementation reference.
- https://github.com/motiondivision/motion — approximately 34,641 GitHub stars and 94,742,950 monthly npm downloads at the check. Actual animation runtime used.
- Counts were read from GitHub repository pages and npm registry search metadata. They are time-specific observations, recorded in `references.json`.
- The Motion npm tarball's SHA-512 was verified against registry metadata before using its bundle. Bundle SHA-256 and package provenance are in `references.json`.
- Licenses are retained in `vendor/`.

The source SVG, split navigation markup, CSS, controller and vendor runtime are kept in this directory. Both application entry HTML files embed the CSS and scripts for offline use. Dialogue/Relax behavior and drafts are preserved; Report and Me remain Coming soon tab views.

Visible-motion fix: reduced-motion mode now uses a shorter 0.45-second non-bouncy transition instead of skipping animation entirely. The normal transition remains 0.62 seconds. The darker translucent gray capsule improves movement visibility. `../../navigation-preview.html` is a standalone review page at a new URL, avoiding old application-page caches.
