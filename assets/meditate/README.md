# Meditate scenery and sound wheels

The Scenery button opens ten distinct themes: starry lake, aurora, firefly forest, seaside, misty forest, rainy lake, waterfall, dunes, wildflower sky, and moonlit landscape. Artwork sources and processing details are in `scenes/sources.json`. Aurora and moon imagery are sourced illustrations. The firefly scene overlays animated points on a sourced forest photograph; it is not presented as a firefly photograph.

The Audio button opens nine corresponding animated cards: rain, ocean waves, stream, forest birds, wind, white noise, pink noise, summer night, and fireplace. Choosing a sound starts that recording. Play/Pause and volume remain available after closing the wheel. Leaving Meditate pauses playback. Initial page load never plays audio. Playback errors offer an explicit Play retry.

Both wheels use the same upright, spring-driven, infinite looping interaction, supporting drag, click, scroll and keyboard navigation. Opening one closes the other. Escape, outside clicks and leaving the tab close the wheel. The playback controls are excluded from outside-click dismissal so touch release reaches the same control as touch down.

All photos, animated images and audio are local assets. `sound-art/SOURCES.md` distinguishes the original animated SVG effects and fireplace SVG effects. `sounds/SOUNDS_LICENSING.md`, `sounds/sources.json` and the user-accessible `sounds/credits.html` retain the recording authors, sources and licenses. Audio is AAC for phone compatibility, using up to 40 seconds of each source and a one-second tail/head crossfade before encoding. HTML audio loop timing still depends on the device.

`scene-picker.js` and `scene-picker.css` are embedded in both main HTML entry pages; synchronize these copies. Current-instance Chromium mobile validation exercises all ten image changes and all nine actual media decoders, starts playback from a real click, checks pause/resume/volume, cycles the sound-wheel boundary, and verifies tab cleanup. Headless validation cannot substitute for listening to audio output or testing real iOS Safari.

Sound card SVGs have separate `.still.svg` posters. Unselected cards and closed wheels always use posters; only the selected card in an open wheel loads its animated SVG. Both main pages were checked with screenshot comparisons before and after selection.
