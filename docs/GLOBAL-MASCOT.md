# Global Mascot State System

## One character, one component

`components/mascot.js` retains the existing body, eyes, mouth, cheeks, feet, ears and star. A shared inner visual rig allows sizing and pose changes without changing Home's interaction container.

Supported options: `state`, `size` (small / large / 48–200px), `animated`, `expression` (neutral / happy / sleepy / concerned), `interactionMode` (none / home). Invalid state/expression values fall back to neutral defaults. Rendering adds no buttons or menus.

States: idle, meditating, breathing, sleeping, listening, calm, dreamy, curious. All share the same silhouette. Differences are subtle closed eyes, settled feet, relaxed posture, contour breathing, occasional lean or blink. No recoloring, dancing, headphones, text or new character assets were introduced.

## Presence

- Breathe selection: 56px breathing mascot.
- Sound browsing / playback: 56px listening mascot.
- Mood jar / creation / revisit: 56px curious mascot.
- Header layout reserves space to the right, within the existing safe-area padding. Mascot is decorative, noninteractive and not inside a card.
- Immersive breathing and Brain Dump keep their existing designs. Overstimulation keeps its existing Home character and owns its slower animation.

## Home visits

`mascot-state.js` owns the curated Home pool: meditating / breathing / sleeping / listening. It chooses once on entry and excludes the prior pose. Previous pose is kept in sessionStorage where available to avoid immediate repetition on reload; blocked storage gracefully falls back to runtime state.

Home-to-Home rendering is the same visit. Opening another page ends the visit. Quiet-mode entry/exit, ring expiration and note-bubble changes do not end the visit. The pose controller does not read or write regulation events, ring state, notes or Mood entries.

Gestures remain attached to the original 244×244px invisible Home button. Visual states have pointer-events disabled. The memory bubble remains a separate, stationary hit target.

## Motion and verification

Motion is mostly 8–13 seconds, with pauses or occasional movement. Reduce Motion disables all mascot animations while retaining static pose cues. `animated=false` also disables motion.

Automated tests cover visit stability, avoiding immediate repetition, launch/storage fallback and shared component options. Existing breathing, 24-hour memory and Mood data tests remain passing (19 total).

Browser checks confirmed: Home unchanged during same-visit render; new pose after leaving/returning; Breathe/Sound/Mood mapping; no companion in immersive breathing; no title overlap at 402px viewport; unchanged Home hit area. iPhone hardware performance and touch feel remain unmeasured.
