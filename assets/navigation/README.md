# INWARD glass navigation

The user supplied `original.svg`. Its icon paths, label outlines, frame and selected-capsule geometry are preserved. `navigation.html` contains the split inline layers; selection color follows `currentColor`.

`glass-nav.js` animates one selected capsule with a damped spring, slight motion-dependent stretch, and following rim highlights. `glass-nav.css` uses CSS backdrop filtering; no third-party runtime or network request is needed. Keyboard arrow keys/Home/End and `prefers-reduced-motion` are supported. A ResizeObserver keeps the selection aligned after viewport changes.

Reference researched on GitHub: https://github.com/UlviShabanbayli/domvybe-liquid-tabs (MIT). Its spring-driven glass-lens concept and rim highlights informed the implementation; its source code is not bundled or required.

Dialogue and Relax retain their workflows. Report and Me retain the existing Coming soon status, presented as tab views so the active tab and page title stay consistent.
