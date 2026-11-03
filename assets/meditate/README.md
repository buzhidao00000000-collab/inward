# Meditate scenery picker

The Scenery button opens a curved ten-card photo wheel inside Meditate. Drag vertically to follow the cards; release to snap with damped spring motion. The wheel loops continuously in either direction: scene 10 connects to scene 1 without reversing or hitting an end. Card placement uses the nearest wrapped offset; offscreen recycling happens outside the visible arc. Cards always stay upright. Clicking a card, scrolling a wheel, or using arrow/Home/End keys selects a scene. Escape, clicking outside, leaving Relax, or switching to Breathe closes the picker. The chosen background remains selected while navigating within the page.

The ten landscape photos are stored in `scenes/`, with source URLs and SHA-256 checksums in `scenes/sources.json`. They are resized JPEGs delivered from the repository; runtime requests to external image services are unnecessary. The original user-supplied night-sky background remains the initial background until a card is selected.

`scene-picker.js` and `scene-picker.css` are embedded into both main HTML entry pages; keep those copies synchronized. Background changes preload/decode the photo and crossfade two layers. Only transforms and opacity change in the card animation; animation frames stop when the picker is idle or closed. Reduced-motion preferences shorten the background transition and omit the opening scale animation.

Validated on both entry pages with Chromium mobile touch simulation: all ten local photos load, clicking selects the background, vertical touch drag snaps to a card, keyboard navigation works, rapid changes show the latest requested image, and switching to Breathe closes the picker without affecting its controls.
