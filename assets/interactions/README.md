# Shared glass press feedback

Pointer down expands application buttons by 6.5%; the breathing glass surface grows by 7% without moving its SVG label or hit area. The resting navigation lens receives the same press feedback while its existing drag/travel optics handle active navigation gestures.

Growth takes 90ms and stays active for the entire hold. Pointer/key release eases back over 180ms. No fixed timeout truncates a long press. Cancel, leaving the control, drag/scroll movement, lost pointer capture, window blur and document visibility changes all clear the hold. Enter/Space key holds and dynamically added feeling/history controls use the same delegated listeners. No default click, form or file chooser behavior is prevented.

Reduced-motion mode uses a smaller, shorter expansion. Both main app entry files and the standalone SVG/HTML previews include the shared feedback.
