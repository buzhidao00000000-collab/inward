# INWARD breathing animation

Original SVG artwork and outline labels were supplied by the user. No external libraries or runtime network calls are required.

- `breathing.svg`: standalone animated SVG. Open directly in a browser, or embed with `<object>` / inline SVG. Scripts do not run when SVG is embedded as `<img>`.
- `breathing.js`: native SVG controller; inhale lasts 5 seconds, exhale lasts 8 seconds.
- `scene.svg`: editable resting SVG scene.
- `states.json`: facial control points derived from the original artwork.
- `../../breathing.html`: standalone preview.
- `../../index.html` and `../../inward-home.html`: the Relax tab includes the same scene and controller inline.

Start moves the front-facing expression toward the right-facing artwork over 0.38 seconds. Changes between inhale and exhale take 0.28 seconds. The nose uses two opaque, continuously morphing lobes, rather than crossfading overlapping expressions; its outline follows the same motion. Eye positions remain fixed during each breathing phase.

Both circular backgrounds scale uniformly about their shared center from 1 to 5/6 during inhale, then return to 1 during exhale. The inhaling nose and its outline grow by 18%. The exhaling mouth grows by 18%. Wind lines flow toward the upper left for inhale and lower right for exhale.

End eases the last displayed pose back to rest in 0.45 seconds, including the circles and feature sizes. Leaving Relax ends the exercise without clearing the Dialogue draft.

`window.InwardBreathing.start()` and `.end()` control the current scene. `.sample(milliseconds)` returns a pure timeline sample for deterministic timing checks.

Inhale/Exhale outline labels crossfade over 0.8 seconds. Facial shapes still morph without opacity crossfades. The exhale mouth retains its lower original position and grows about its own center, keeping it separate from both nose dots throughout the cycle and End return.

Single-button revision: user-supplied Start/End SVG artwork is displayed in one centered 188x45 control. Idle shows Start only; breathing shows End only. End keeps its artwork while the pose returns to rest, briefly disables repeat activation, then restores Start. Pointer and Enter/Space activation share the same control. Original supplied files are retained as `start-button.svg` and `end-button.svg`.
