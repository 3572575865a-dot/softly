# Mood — final contract

Authoritative specification: MOOD-FINAL-SPEC.md. This replaces earlier conflicting Mood documents.

## Daily record
- Zero or one record per calendar day, with 1–3 emotions, independent intensities, and one optional note.
- Make creates the record. The same primary control becomes Remake and updates that record. No Add a moment or View-date buttons.
- Editing follows local calendar days: today is editable; a missing yesterday may be backfilled and remade until today ends. Records originally made yesterday and older dates are read-only. Foreground and midnight refresh eligibility. Mood records retain moodDate, createdAt and wasBackfilled.
- Gummy and proportion bar share the same normalized intensity composition. Percentages are not visible; accessible composition descriptions may include them.
- The optional note card contains only original creation time and the actual note, with no repeated emotions or intensity descriptions. Empty notes omit the card.

## Three resolutions
- Week: exactly seven daily gummies. Recorded days mix up to three colors; unrecorded days have a clear gummy with no inferred emotion.
- Month: one single-emotion gummy per emotion per calendar week. Only dates inside the selected month contribute. Equal emotions in different weeks remain separate.
- Year: one single-emotion gummy per emotion per calendar month. Equal emotions in different months remain separate; no annual global emotion merge.
- Aggregate size uses bounded square-root scaling of accumulated intensity. Scale bounds derive from the entire selected period, even when browsing a different physical window.
- Large aggregate collections use at most 24 physical objects at a time; Earlier / More navigate the remaining groups. No stored aggregate database, empty aggregate category, or transparent Month/Year objects.

## Persistence and legacy migration
- Existing storage key softly-mood-v1 now writes schema version 3. The active record collection must have unique calendar dates.
- For legacy duplicate dates, use the latest updated record's exact emotion selection and note, with the earliest original ID and createdAt. This retains a maximum of three emotions and one visible note without restarting the edit window.
- When opening Mood, before the first v3 write, preserve the complete old storage payload at softly-mood-before-daily-v3. Older duplicate notes remain in this recovery backup, never in visible version history. A failed backup write prevents replacement of the original store.
- Saving reloads current persisted records before updating so stale Make controls cannot append a second record to the day.

## Scope and assets
Only Mood data, rendering, controls, layout, tests, and this contract changed. Existing Home, Breathe, Sound, Let It Out, Quiet Mode, and regulation-ring behavior remain unchanged. Shape, material, color palette, sizes, and motion continue to use shared replaceable asset configuration.

## Validation
Regression coverage is documented in docs/2026-09-21-POLISH.md. Mood coverage includes one-record upsert, local-calendar editing and backfill boundaries, source backup migration, Week transparent states, partial-week Month aggregation, per-month Year aggregation, removal of old contributions after Remake, and responsive size bounds. Browser QA uses an isolated in-memory store.

## September 21 palette and intensity update
The selectable palette is defined in src/assets/emotion-palette.js. Content and Dreamy remain historical identities only. Sliders use normalized 0–1 intensity; persistence retains the existing lossless weight = intensity × 100 encoding. The gummy and detail bar both use mix(). New saves require at least one positive intensity.
