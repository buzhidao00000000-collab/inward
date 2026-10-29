# INWARD breathing animation

Original SVG artwork and outline labels were supplied by the user. No external libraries or runtime network calls are required.

- `breathing.svg`: standalone animated SVG. Open directly in a browser, or embed with `<object>` / inline SVG. Scripts do not run when SVG is embedded as `<img>`.
- `breathing.js`: native SVG animation controller, with a 5-second inhale and 8-second exhale cycle.
- `scene.svg`: editable resting SVG scene.
- `states.json`: facial control points derived from the original artwork.
- `../../breathing.html`: standalone preview page.
- The Relax tab in `../../index.html` and `../../inward-home.html` includes the same scene and animation controller inline.

Start begins the cycle. End eases the current expression back to rest over one second. Inhale wind flows toward the upper left; Exhale wind flows toward the lower right. Leaving Relax ends the exercise without clearing the Dialogue draft.

`window.InwardBreathing.start()` and `.end()` control the current scene. `.sample(milliseconds)` returns a pure timeline sample for deterministic timing checks.
