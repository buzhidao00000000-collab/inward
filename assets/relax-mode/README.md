# Relax mode switch

User-provided SVG outlines and selected background form the centered Breathe/Meditate control. The source is retained as original.svg. The switch is shown only on Relax; the History button is hidden on that tab and retained on other tabs.

Breathe retains the existing exercise. Meditate displays an independent placeholder panel (Coming soon) because its screen design has not been supplied. Switching to Meditate ends the breathing animation; switching back restores the Breathe view. Mode choice persists across navigation within the current page. Native buttons, tab roles, arrow/Home/End keys and the shared glass press feedback are supported.

Glass motion revision: the top switch now mounts the same configurable Motion glass-lens controller as the bottom navigation. One persistent capsule slides between source-art coordinates 7px and 88px. At rest it measures 77x30; in transit/drag it expands, magnifies the original vector labels and uses its own uniquely named refraction filter. Original per-option background rectangles are hidden to prevent crossfade/double selections. The capsule supports drag-and-release selection, fast retargeting, keyboard switching and shared hold feedback. Mode changes emit a dedicated event, independent from the bottom navigation.
