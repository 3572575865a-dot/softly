# Let It Out / Release Space

Home double-tap opens this feature; the long-hold Quiet Mode and white regulation ring are unchanged.

- One-time intro flag; new text, retained text, release, regret, and quiet resting states.
- Keep uses the existing single local retained note with original rolling 24-hour expiry. Reopening does not extend it. Home bubble exists only for valid retained text.
- Full source text stays intact in memory until release completes. At most 14 text fragments render during the configurable 10-second release. Backgrounding pauses progress. Keep this restores and retains the full source. Expired retained text cannot be revived.
- Existing text can be copied or shared through browser-native support, or deleted. Neither copy nor share changes retention. No analysis, Mood record, or ring event is created.
- Unsaved drafts survive in-app navigation interruptions in memory only; refreshing/closing the browser can discard an unsaved draft. Kept notes use local browser storage. No network service stores this feature's text.
- Configuration: src/assets/release.js. Existing mascot/material assets remain shared placeholders. Reduced motion uses a gentle fade.
- Unit tests cover exact Unicode/long-text reconstruction, completion, rolling expiry, and cross-tab replacement protection. Native sharing availability depends on the browser/device.
