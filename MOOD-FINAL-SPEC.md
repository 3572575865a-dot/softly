FINAL MASTER IMPLEMENTATION PROMPT

MOOD EXPERIENCE
ONE DAY, ONE GUMMY — WEEK / MONTH / YEAR EMOTIONAL JAR

This is the FINAL Mood specification.

This specification supersedes ALL previous Mood specifications
wherever they conflict.

In particular, REMOVE / IGNORE any previous instruction that says:

- multiple Mood records may be created on the same calendar day
- multiple moments may be added to the same day
- each emotion creates its own Daily Gummy
- each check-in creates a gummy
- Month View contains Daily Gummies
- Year View contains Daily Gummies
- numeric emotion percentages should be displayed
- “Add a moment” should exist
- a separate “View [date]” button should exist
- Daily Detail should repeat emotion names/intensity inside the note card

The FINAL Mood system is defined below.

==================================================
1. CORE PRODUCT IDEA
==================================================

Mood is a gentle visual record of emotional life.

It is NOT:

- a psychological questionnaire
- a productivity tracker
- a diary streak
- a happiness score
- an analytics dashboard
- an AI emotion interpreter
- a daily obligation

Core principle:

Notice what is here.
Give the day a shape.
Let it exist without needing to change it.

==================================================
2. STRICT IMPLEMENTATION SCOPE
==================================================

Only inspect and modify files directly related to:

- Mood landing screen
- Make / Remake
- emotion selection
- emotion intensity
- optional daily text
- Daily Mood Record
- Daily Gummy
- transparent Daily Gummy
- Mood Jar
- Week View
- Month View
- Year View
- Daily Gummy Detail
- emotion proportion bar
- Mood editing
- 24-hour edit lock
- Mood persistence
- gummy rendering
- gummy aggregation
- Mood mascot
- accessibility
- Reduce Motion

Do NOT:

- redesign Home
- modify Breathe
- modify Sound
- modify Guided Flows
- modify Let It Out
- modify Quiet Mode
- modify Home regulation-ring logic
- refactor unrelated architecture
- add AI analysis
- add reminders
- add gamification
- add unsolicited analytics

Reuse existing:

- navigation
- global background
- glass materials
- mascot component
- typography
- design tokens
- persistence architecture
- animation utilities

whenever practical.

==================================================
3. FINAL DATA PHILOSOPHY
==================================================

The source of truth is:

ONE Daily Mood Record
per calendar day.

Conceptually:

DailyMoodRecord {
    id
    calendarDay
    createdAt
    updatedAt
    emotions: [
        {
            emotionId
            intensity
        }
    ] // maximum 3
    note?
}

Do not create multiple visible Mood records
for the same calendar day.

==================================================
4. ONE CALENDAR DAY = MAXIMUM ONE RECORD
==================================================

A calendar day may contain:

ZERO
or
ONE

Daily Mood Record.

Never more than one.

Remove the previous multiple-check-in model.

Do NOT create:

Morning record
Afternoon record
Evening record

for the same day.

==================================================
5. MAXIMUM THREE EMOTIONS PER DAY
==================================================

One Daily Mood Record may contain:

minimum:
1 emotion

maximum:
3 emotions.

This limit applies to the ENTIRE DAY.

The user cannot add another three emotions later
by creating another check-in.

There is no second check-in.

==================================================
6. EMOTION SELECTION
==================================================

Keep the existing approved emotion vocabulary.

Do not replace it with a giant clinical emotion wheel.

Emotion selection should remain:

soft
visual
easy to scan
non-clinical.

Selected state may use:

- gentle expansion
- subtle depth
- slightly stronger opacity
- restrained glow
- gummy-like tactile response

Avoid aggressive checkmarks.

==================================================
7. EMOTION COLORS
==================================================

Each emotion retains its own color identity.

Mood may use richer colors than the global UI,
but colors should remain:

soft
sophisticated
slightly muted.

Do not make every emotion pastel-white.

Do not turn the whole screen into a saturated rainbow.

==================================================
8. INTENSITY
==================================================

Each selected emotion has its own intensity.

Example:

Sad = 3
Happy = 2
Calm = 1

Intensity is stored numerically internally.

However:

do not make the experience feel like a clinical score.

Avoid large numeric dashboards.

==================================================
9. INTENSITY MEANING
==================================================

Intensity means:

how present that feeling was.

It does NOT mean:

how bad
how dangerous
how successful
how healthy.

Do not map high intensity to warning behavior.

==================================================
10. ONE OPTIONAL TEXT NOTE PER DAY
==================================================

Each Daily Mood Record may contain:

ONE optional text note.

Not:

one note per emotion
multiple moment notes
multiple journal cards.

The user may leave it empty.

==================================================
11. NOTE IS OPTIONAL
==================================================

Do not require:

- explanation
- trigger
- event
- category
- title
- tags
- location
- people
- reason

The user may save:

emotion(s)
+
intensity

without text.

==================================================
12. MOOD NOTE IS NOT LET IT OUT
==================================================

Mood text and Let It Out remain separate.

Mood text:

a small optional record attached to one day.

Let It Out:

the separate ephemeral vent/release experience.

Do not merge their storage or product meaning.

==================================================
13. FIRST ACTION = MAKE
==================================================

If the current calendar day has NO Daily Mood Record:

show ONE primary button:

Make

This creates today's record.

Do not simultaneously show:

Remake
Add a moment
View today.

==================================================
14. AFTER RECORDING = REMAKE
==================================================

Once today's Daily Mood Record exists:

the SAME primary button becomes:

Remake

Conceptually:

no record today
→ Make

record exists and is editable
→ Remake.

Do not show Make and Remake simultaneously.

==================================================
15. REMOVE “ADD A MOMENT”
==================================================

REMOVE:

Add a moment

from the Mood interface.

Do not replace it with:

Add another mood
Add check-in
Add feeling
Add entry.

One day has one Mood Record.

==================================================
16. REMOVE “VIEW [DATE]” BUTTON
==================================================

REMOVE the separate bottom button such as:

View Sep 16, 2026

History navigation happens through the Jar.

If the user wants to inspect a day:

they tap its gummy.

Do not duplicate this navigation with another large button.

==================================================
17. REMAKE
==================================================

Remake means:

EDIT TODAY'S EXISTING RECORD.

It does NOT:

- create another record
- create another gummy
- append another moment
- duplicate the text
- preserve another visible version

==================================================
18. WHAT REMAKE MAY CHANGE
==================================================

During the editable period,
Remake may change:

- selected emotion(s)
- maximum 3 emotions total
- each emotion's intensity
- resulting emotion proportions
- the day's optional text

All changes update the SAME record.

==================================================
19. UNLIMITED MODIFICATION DURING EDIT WINDOW
==================================================

Within the allowed edit window:

the user may Remake the Daily Mood Record
as many times as they want.

Do not limit the number of edits.

Do not display:

edit count
revision count
version history.

==================================================
20. 24-HOUR EDIT WINDOW
==================================================

The Daily Mood Record remains editable for:

24 ROLLING HOURS

from its ORIGINAL createdAt timestamp.

Conceptually:

editableUntil =
createdAt + 24 hours.

Do NOT use:

updatedAt + 24 hours.

Editing must NOT restart the 24-hour window.

==================================================
21. AFTER 24 HOURS
==================================================

After the record is more than 24 hours old:

the record becomes READ-ONLY.

Preserve:

- gummy
- emotion composition
- text
- date
- history

Do NOT delete the record.

Do NOT delete the gummy.

Do NOT allow further editing.

==================================================
22. READ-ONLY SHOULD NOT FEEL PUNITIVE
==================================================

Do not show alarming copy such as:

Editing expired
You can no longer change this
Record locked

unless technically necessary.

Simply remove/disable editing gracefully.

Historical Mood is something to look back on,
not something to maintain forever.

==================================================
23. DAILY GUMMY — CORE RULE
==================================================

Every calendar day represented in Week View has:

EXACTLY ONE Daily Gummy.

There are two possible states:

RECORDED DAY
→ mixed-emotion gummy

UNRECORDED DAY
→ transparent gummy.

==================================================
24. RECORDED DAILY GUMMY
==================================================

If the day has a Daily Mood Record:

its maximum three emotions are mixed inside:

ONE gummy.

Example:

Sad = 3
Happy = 2
Calm = 1

Result:

ONE Daily Gummy containing all three emotion identities.

Do NOT create three gummies.

==================================================
25. DAILY GUMMY IS A DAY
==================================================

The Daily Gummy represents:

THE DAY.

It does NOT represent:

one emotion
one check-in
one note.

Core relationship:

ONE DAY
→ ONE GUMMY.

==================================================
26. DAILY GUMMY MIXING
==================================================

Do NOT calculate one average flat color.

Multiple emotions should remain visibly present.

Use restrained techniques such as:

- organic marbling
- translucent color regions
- soft internal gradients
- cloudy blending
- overlapping translucent gummy material
- gentle diffusion

The gummy should communicate:

“several feelings existed together.”

==================================================
27. DAILY GUMMY COMPOSITION
==================================================

Daily Gummy internal color presence derives from
the selected emotion intensities.

Conceptually:

emotionProportion[e] =
intensity[e] / sum(all selected emotion intensities)

The proportions remain internal.

Do not show numeric percentages to the user.

==================================================
28. UNRECORDED DAY = TRANSPARENT GUMMY
==================================================

If a calendar day has NO Daily Mood Record:

still create/display ONE transparent Daily Gummy
for that day in Week View.

Do NOT omit the day.

==================================================
29. TRANSPARENT GUMMY MEANING
==================================================

Transparent means only:

“Nothing was recorded for this day.”

It does NOT mean:

- neutral mood
- empty day
- bad day
- forgotten day
- failure
- zero emotion
- emotionally blank.

The app does not know what the user felt.

Do not infer anything.

==================================================
30. TRANSPARENT GUMMY VISUAL
==================================================

Use the same gummy material family,
but make it:

- clear / nearly transparent
- softly refractive
- gently visible through edge light
- low saturation
- visually alive

Do NOT use:

grey disabled placeholder
dashed outline
question mark
X
empty slot.

It is a real transparent gummy.

==================================================
31. WEEK VIEW
==================================================

WEEK VIEW is DAY-BASED.

A complete week contains:

7 Daily Gummies.

Each gummy corresponds to one calendar day.

Recorded:
mixed-emotion gummy.

Unrecorded:
transparent gummy.

==================================================
32. WEEK JAR
==================================================

Preserve the existing Jar metaphor.

The Jar should feel:

- translucent
- soft
- elegant
- glass-like
- spacious
- integrated with the pink-grey mist

Do not make it a literal candy machine or game.

==================================================
33. JAR IS NOT PROGRESS
==================================================

Never imply:

Fill the Jar
Complete the Jar
7/7 days
You missed a day
Keep checking in.

Transparent gummies ensure that
days still exist even when nothing was recorded.

==================================================
34. TAPPING A RECORDED DAILY GUMMY
==================================================

Tap a recorded Daily Gummy
→ open Daily Mood Detail.

Remove the separate View button.

The gummy itself is the navigation object.

==================================================
35. DAILY DETAIL — FINAL STRUCTURE
==================================================

Daily Detail should contain:

DATE

↓

DAILY MIXED GUMMY

↓

EMOTION IDENTITIES
maximum 3

↓

ONE EMOTION PROPORTION BAR

↓

ONE MILKY-WHITE GLASS NOTE CARD
if appropriate.

Keep the page visually calm.

==================================================
36. EMOTION PROPORTION BAR
==================================================

Keep the proportion bar shown in the current implementation.

The bar visually represents the relative presence
of the day's maximum three emotions.

Do NOT show numeric percentages.

==================================================
37. NO NUMBERS ON PROPORTION BAR
==================================================

For example, internally:

Happy = 50%
Calm = 30%
Sad = 20%

The user should NOT see:

50%
30%
20%.

They see:

emotion labels/colors
+
relative colored regions in the bar.

==================================================
38. BAR VISUAL LANGUAGE
==================================================

The proportion bar should feel like:

a visual sample of what the day contained.

Not:

analytics
progress
health score
business chart.

Use:

- rounded form
- emotion colors
- soft blending
- gummy/glass material
- gentle transitions

Avoid harsh chart dividers.

==================================================
39. SAME DATA DRIVES GUMMY + BAR
==================================================

CRITICAL:

The same daily composition must drive:

A. Daily Gummy internal colors

and

B. proportion bar widths.

Do not randomly generate gummy colors independently.

==================================================
40. DAILY DETAIL — ONE TEXT CARD ONLY
==================================================

The Daily Detail must contain:

AT MOST ONE text record card.

There are no multiple moments.

Do not create multiple glass cards for one day.

==================================================
41. GLASS CARD CONTENT — FINAL RULE
==================================================

The milky glass card should display ONLY:

1. the record TIME
2. the USER'S ACTUAL TEXT NOTE

Do NOT repeat:

- emotion names
- emotion intensity
- emotion proportions
- qualitative intensity labels

inside this card.

==================================================
42. IMPORTANT — NEVER HARD-CODE EXAMPLE TEXT
==================================================

Any example text previously visible in screenshots or prompts,
including:

“111”

was ONLY user-entered test content.

DO NOT hard-code:

“111”

anywhere in the application.

It has NO product meaning.

==================================================
43. DYNAMIC NOTE CONTENT
==================================================

The note card must dynamically read from:

DailyMoodRecord.note

Conceptually:

[record time]

[user's actual note]

Never substitute example/test content.

==================================================
44. NO DUPLICATED EMOTION TEXT
==================================================

REMOVE current Daily Detail text such as:

Energized · Some
Calm · A little
Content · Some

Also remove:

Some
A little
A lot

from the note card.

Emotion information already exists above.

==================================================
45. NOTE CARD WITH NO NOTE
==================================================

If the user wrote no text:

do not display fake content.

Do not display:

111
No note
Nothing written
No text added.

Either:

omit the note card

or use the minimal time treatment
if technically/design-wise appropriate.

==================================================
46. NOTE CARD MATERIAL
==================================================

Use:

- milky-white translucency
- frosted blur
- rounded corners
- gentle edge light
- restrained shadow
- airy spacing

Do not use opaque white.

It should feel like:

a small piece of frosted glass.

==================================================
47. DAILY DETAIL EDITING
==================================================

If the record is still within 24 hours from createdAt:

allow Remake/Edit.

It modifies the SAME Daily Mood Record.

If the 24-hour window has passed:

Daily Detail becomes read-only.

==================================================
48. MONTH VIEW — DIFFERENT AGGREGATION LEVEL
==================================================

MONTH VIEW does NOT display Daily Gummies.

Instead:

MONTH VIEW aggregates emotions BY WEEK.

For each week inside the selected month:

sum the intensity of every recorded emotion
during that week.

==================================================
49. MONTH GUMMY UNIT
==================================================

At Month level:

ONE GUMMY =
ONE EMOTION
WITHIN ONE WEEK.

Unlike Daily Gummies,
Month-level gummies are:

SINGLE-EMOTION gummies.

==================================================
50. MONTH AGGREGATION EXAMPLE
==================================================

Example:

Week 1

Day 1:
Sad = 3
Happy = 2

Day 2:
Happy = 3
Sad = 2

Weekly totals:

Sad = 5
Happy = 5.

Month Jar receives:

ONE Sad gummy
with size derived from 5

and

ONE Happy gummy
with size derived from 5.

==================================================
51. MONTH — SAME EMOTION ACROSS WEEKS
==================================================

Do NOT merge the same emotion across different weeks.

Example:

Week 1:
Sad = 8

Week 2:
Sad = 3

Week 3:
no Sad

Week 4:
Sad = 6

Month Jar contains:

one Week-1 Sad gummy
one Week-2 Sad gummy
one Week-4 Sad gummy.

Their sizes differ according to their weekly totals.

==================================================
52. MONTH GUMMY SIZE
==================================================

At Month level:

SIZE communicates weekly accumulated intensity.

More accumulated emotion weight
→ larger gummy.

Less accumulated weight
→ smaller gummy.

Use a restrained configurable size range.

Do not allow huge differences that break the Jar.

==================================================
53. MONTH GUMMY COLOR
==================================================

Month-level gummies are single-emotion.

Therefore:

Sad weekly gummy
→ Sad color/material

Happy weekly gummy
→ Happy color/material

Calm weekly gummy
→ Calm color/material.

Do NOT mix multiple emotion colors
inside one Month-level gummy.

==================================================
54. MONTH JAR VISUAL
==================================================

Month View should use the SAME Jar visual language
as Week View.

It may be somewhat larger
to accommodate more gummies.

Do NOT replace it with:

calendar grid
heatmap
chart
analytics dashboard.

==================================================
55. PARTIAL WEEKS IN MONTH
==================================================

If a week crosses month boundaries:

aggregate only the days belonging
to the currently selected month.

Do not include adjacent-month days
in the selected month's totals.

==================================================
56. MONTH — WEEKS WITHOUT RECORDS
==================================================

If a week contains no recorded emotions:

do not create fake emotion gummies.

Do not create:

Neutral gummy
Missing gummy
transparent weekly emotion gummy.

Transparent gummies belong specifically
to Week View's day representation.

==================================================
57. YEAR VIEW — MONTHLY AGGREGATION
==================================================

YEAR VIEW aggregates emotions BY MONTH.

For each calendar month:

sum each emotion's intensity
from all Daily Mood Records inside that month.

==================================================
58. YEAR GUMMY UNIT
==================================================

At Year level:

ONE GUMMY =
ONE EMOTION
WITHIN ONE MONTH.

Year-level gummies are:

SINGLE-EMOTION gummies.

==================================================
59. YEAR EXAMPLE
==================================================

January:

Happy total = 10
Sad total = 4

February:

Happy total = 6
Calm total = 8

Year Jar contains:

January Happy gummy
size based on 10

January Sad gummy
size based on 4

February Happy gummy
size based on 6

February Calm gummy
size based on 8.

==================================================
60. DO NOT MERGE SAME EMOTION ACROSS MONTHS
==================================================

If Happy appears in all 12 months:

Year Jar may contain:

12 Happy gummies.

Each gummy belongs to a different month.

Do NOT merge them into one annual Happy gummy.

==================================================
61. YEAR GUMMY SIZE
==================================================

At Year level:

SIZE represents that emotion's accumulated intensity
within that month.

More accumulated intensity
→ larger gummy.

Less
→ smaller gummy.

Use restrained normalized visual sizing.

==================================================
62. YEAR JAR
==================================================

Year View should use the SAME Jar visual language.

The Year Jar may be larger / more spacious.

Do NOT replace Year with:

heatmap
bar chart
line chart
pie chart
calendar analytics.

==================================================
63. THREE LEVELS — FINAL MODEL
==================================================

WEEK
================================

1 gummy = 1 calendar day

Recorded:
mixed-emotion gummy

Unrecorded:
transparent gummy


MONTH
================================

1 gummy =
1 emotion within 1 week

color =
emotion identity

size =
weekly accumulated intensity


YEAR
================================

1 gummy =
1 emotion within 1 month

color =
emotion identity

size =
monthly accumulated intensity.

==================================================
64. DO NOT CONFUSE THESE LEVELS
==================================================

Do NOT implement:

Week:
one gummy per emotion.

Do NOT implement:

Month:
one gummy per day.

Do NOT implement:

Month:
one mixed gummy per week.

Do NOT implement:

Year:
one gummy per day.

Do NOT implement:

Year:
one mixed gummy per month.

Do NOT implement:

Year:
one emotion gummy for the entire year.

==================================================
65. AGGREGATES ARE DERIVED
==================================================

DailyMoodRecord remains the source of truth.

Derive:

Daily Gummy

Weekly Emotion Aggregation

Monthly Emotion Aggregation

from DailyMoodRecords.

Do not destructively convert original records
into aggregate records.

==================================================
66. EDITING UPDATES ALL LEVELS
==================================================

When today's record is Remade within the 24-hour window:

recalculate:

1. today's Daily Gummy
2. affected weekly emotion totals
3. affected monthly emotion totals

and update:

Week
Month
Year

accordingly.

Do not create duplicate aggregate gummies.

==================================================
67. REMOVING AN EMOTION
==================================================

If Remake removes one of today's emotions:

remove its contribution from:

Daily Gummy
weekly aggregate
monthly aggregate.

If an aggregate emotion total becomes zero:

remove that Month/Year aggregate gummy.

==================================================
68. TRANSPARENT GUMMY AFTER RECORD REMOVAL
==================================================

If the Daily Mood Record is removed
and no record remains for that day:

the Week View gummy becomes:

TRANSPARENT.

Do not remove the calendar day from the Week Jar.

==================================================
69. NO VISIBLE AGGREGATE NUMBERS
==================================================

Month and Year require numeric totals internally.

Do NOT display raw totals such as:

Sad 27
Happy 42.

At Month and Year levels:

gummy SIZE communicates relative accumulated presence.

==================================================
70. NO EMOTION RANKING
==================================================

Do not label:

Most common emotion
Dominant emotion
Top feeling
Best emotion
Worst emotion.

Let the visual composition speak for itself.

==================================================
71. NO POSITIVE / NEGATIVE SCORE
==================================================

Do not calculate:

positive percentage
negative percentage
wellbeing score
mood score
good day / bad day.

Mixed emotions remain mixed.

==================================================
72. NO AI ANALYSIS
==================================================

Do NOT add:

- sentiment analysis
- AI emotion detection
- AI note interpretation
- AI weekly summary
- AI monthly summary
- trigger detection
- mood prediction
- recommendations based on Mood text

The user defines their emotions.

==================================================
73. DO NOT INFER EMOTION FROM NOTE
==================================================

The optional text note does not change
the selected emotion data.

Do not analyze it.

Do not challenge the user's emotion selection.

==================================================
74. NO AUTOMATIC BREATHE / SOUND PRESCRIPTION
==================================================

Do not map:

Anxious → Breathe
Sad → Music
Angry → Brown Noise.

Mood is for noticing.

It does not automatically prescribe regulation.

==================================================
75. HOME REGULATION RING
==================================================

Mood does NOT trigger the Home regulation ring.

Preserve:

hasRegulatedToday =
    hasCompletedBreatheToday
    OR
    hasStartedSoundToday

Creating Mood:
does not fill ring.

Remaking Mood:
does not fill ring.

Viewing Jar:
does not fill ring.

==================================================
76. MOOD MASCOT
==================================================

On Mood browsing / creation screens:

use the reusable small mascot
near the top-right where appropriate.

Approximate:

48–64 px.

Possible state:

calm
curious.

==================================================
77. MASCOT BEHAVIOR
==================================================

Mascot may:

- blink slowly
- breathe subtly
- make tiny settling movements

Do not make mascot:

celebrate
mirror negative emotions
look sad because user selected Sad
look happy because user selected Happy.

It remains a quiet companion.

==================================================
78. GLOBAL VISUAL LANGUAGE
==================================================

Preserve:

soft pale pink-grey mist

with pink slightly dominant.

Reference family may remain around:

#EDD8E7.

Mood emotion colors may be richer
inside gummies.

==================================================
79. GLASSMORPHISM
==================================================

Preserve:

- milky translucent surfaces
- frosted blur
- rounded corners
- gentle shadows
- restrained border highlights
- airy spacing

Avoid:

opaque white
dirty grey
strong reflection
glossy plastic UI.

==================================================
80. GUMMY MATERIAL
==================================================

Gummies should feel:

- translucent
- tactile
- soft
- slightly squishy
- organic
- rounded

Not:

hard plastic
chrome
glass marble
furry
cartoon character.

==================================================
81. DIFFICULT EMOTIONS ARE EQUALLY BEAUTIFUL
==================================================

Do not make:

Happy
Calm
Loved

more beautiful than:

Sad
Anxious
Frustrated.

Every emotion belongs to the same
high-quality gummy material family.

No emotion is morally better.

==================================================
82. GUMMY PHYSICS
==================================================

Use restrained soft-body behavior.

Gummies may:

- gently settle
- softly compress
- slightly overlap
- deform once when landing

Do not:

bounce repeatedly
behave like arcade balls
run expensive physics forever.

==================================================
83. MONTH / YEAR SIZE DIFFERENCES
==================================================

Because Month and Year use gummy size
to represent accumulated emotion weight:

make size differences clearly perceptible.

But keep them restrained.

The smallest gummy must remain visible and tappable
where interaction exists.

The largest gummy must not dominate the Jar.

Use configurable min/max size mapping.

==================================================
84. REDUCE MOTION
==================================================

Respect Reduce Motion.

Reduce:

- falling distance
- bouncing
- large gummy deformation
- Jar rearrangement
- large transitions

Use:

fade
small position changes
gentle appearance
predetermined resting positions.

==================================================
85. ACCESSIBILITY
==================================================

Ensure:

- emotion names are accessible
- color is not the only identifier
- selected state is announced
- intensity controls are accessible
- Make is accessible
- Remake is accessible
- Daily Gummies have meaningful labels
- transparent gummies are understandable
- proportion bar has accessible emotion composition information
- Daily Detail text is readable
- Week / Month / Year controls are accessible
- Reduce Motion is respected.

==================================================
86. ACCESSIBILITY AND HIDDEN NUMBERS
==================================================

Numeric percentages do not need to be visually displayed.

For accessibility,
describe the relative emotion composition meaningfully
without turning the visible UI into a numeric dashboard.

Follow platform accessibility conventions.

==================================================
87. NO GAMIFICATION
==================================================

Do NOT add:

streaks
points
XP
badges
achievements
daily goal
Jar completion
rare gummies
collectibles
unlockable emotions
check-in rewards.

==================================================
88. NO DAILY GUILT
==================================================

Do not say:

You missed yesterday
You forgot to check in
Keep your streak
Come back every day.

Transparent gummies represent unrecorded days
without judgment.

==================================================
89. FINAL ACCEPTANCE — DAILY
==================================================

Verify:

[ ] Maximum ONE Mood Record exists per calendar day.

[ ] Maximum THREE emotions exist per day.

[ ] Each emotion has its own intensity.

[ ] ONE optional text note exists per day.

[ ] First creation uses Make.

[ ] Existing editable record uses Remake.

[ ] Make and Remake are the same primary control in different states.

[ ] Add a moment is removed.

[ ] View [date] is removed.

[ ] Remake edits the existing record.

[ ] Unlimited Remake edits are allowed within the 24-hour window.

[ ] Edit window begins at original createdAt.

[ ] Editing does not restart the 24-hour window.

[ ] After 24 hours the record becomes read-only.

==================================================
90. FINAL ACCEPTANCE — DAILY DETAIL
==================================================

Verify:

[ ] Tap Daily Gummy opens Daily Detail.

[ ] Daily Detail shows the gummy.

[ ] Maximum 3 emotion identities appear.

[ ] Proportion bar appears.

[ ] NO numeric percentages appear.

[ ] There is at most ONE note glass card.

[ ] Glass card contains record time.

[ ] Glass card contains the USER'S ACTUAL note.

[ ] “111” is NEVER hard-coded.

[ ] Example/test screenshot text is NEVER used as UI copy.

[ ] Emotion names are not repeated in the note card.

[ ] “Some” is removed.

[ ] “A little” is removed.

[ ] Other qualitative intensity text is removed from the note card.

==================================================
91. FINAL ACCEPTANCE — WEEK
==================================================

Verify:

[ ] Week View uses the Jar.

[ ] Week represents 7 calendar days.

[ ] ONE Daily Gummy represents each day.

[ ] Recorded day = mixed-emotion gummy.

[ ] Unrecorded day = transparent gummy.

[ ] Transparent gummy is not styled as failure.

==================================================
92. FINAL ACCEPTANCE — MONTH
==================================================

Verify:

[ ] Month uses the same Jar visual language.

[ ] Month Jar may be larger.

[ ] Month aggregates by WEEK.

[ ] ONE gummy = ONE emotion in ONE week.

[ ] Month gummies are single-emotion.

[ ] Gummy size represents weekly accumulated intensity.

[ ] Same emotion may appear once for each week where it occurred.

[ ] Same emotion across weeks is NOT merged.

[ ] Month does not render Daily Gummies.

[ ] Month does not create one mixed gummy per week.

==================================================
93. FINAL ACCEPTANCE — YEAR
==================================================

Verify:

[ ] Year uses the same Jar visual language.

[ ] Year Jar may be larger.

[ ] Year aggregates by MONTH.

[ ] ONE gummy = ONE emotion in ONE month.

[ ] Year gummies are single-emotion.

[ ] Gummy size represents monthly accumulated intensity.

[ ] Same emotion may appear once for each month where it occurred.

[ ] Same emotion across months is NOT merged.

[ ] Year does not render Daily Gummies.

[ ] Year does not create one mixed gummy per month.

==================================================
94. FINAL PRODUCT MEANING
==================================================

The system changes resolution as time expands.

TODAY:

I choose up to three feelings.

I can write one small piece of context if I want.

That becomes:

ONE mixed-emotion gummy.

I can return and Remake it
for 24 hours from when I first created it.

After that,
the day remains as it was recorded.


WEEK:

I see seven days.

Some days have color.

Some days are transparent.

A transparent day is still a day.

It is not failure.


MONTH:

I zoom out.

The individual days give way
to the feelings that moved through each week.

Each emotion becomes its own gummy.

Its size quietly carries
how much of that emotion was recorded that week.


YEAR:

I zoom out again.

Now the feelings are gathered by month.

Each emotion in each month
becomes its own gummy.

Its size quietly carries
how much of that emotion was recorded that month.


A Daily Gummy says:

“This is what I recorded that day.”

A transparent Daily Gummy says:

“This day was here too.”

A Month gummy says:

“This feeling was present in this week.”

A Year gummy says:

“This feeling was present in this month.”

No emotion wins.

No day is graded.

No percentage needs to be read.

No streak needs to continue.

No missed day needs to be repaired.

The Jar is not progress.

It is simply a soft visual record of time
and what the user chose to notice within it.

Preserve the existing app architecture,
global visual identity,
Mascot identity,
Home ring behavior,
Breathe,
Sound,
Let It Out,
Quiet Mode,
and Guided Flows.

Do not add features beyond this specification.