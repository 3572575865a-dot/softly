# Current polish patch — Home, Quiet Mode and Let It Out

This patch supersedes the fixed/non-scrolling Home requirement in the earlier September 21 note.

- Home now uses natural vertical flow with a responsive 230–264px ring and the original 140px mascot. Short viewports scroll; bottom navigation remains fixed. Content reserves 124px plus bottom safe area. Removed lower feature cards stay removed.
- Quiet Mode continues using the browser Screen Wake Lock abstraction only after successful activation. Foreground resumes it while active. Suspension now also prevents a pending request from reacquiring while the page is inactive. No native iOS code is included.
- Keep this, Copy Text, Share, Delete, release recovery, Stay here and Go home share the existing glass material and one release-secondary style. Inline actions share 46px height and 20px corners.
- Stay here clears the completed release state, timers/progress, temporary draft and fragment DOM, then renders an empty usable input with focus. It does not replay onboarding, restore released text or affect another tab's retained note.

Validation: 18 relevant state regression checks passed. Browser checks verified 402×874 natural layout, 320×568 scrollable layout/fixed navigation, Home double-tap, common secondary styles, and completion → Stay here → empty focused input → fresh writing. Browser/device policy can still refuse Wake Lock; native-device sleep behavior was not tested.

Iteration workflow: update the same hosted HTTPS address for review. Do not produce a downloadable project package/export unless explicitly requested. Deployment transport is internal, not a user-facing export.
