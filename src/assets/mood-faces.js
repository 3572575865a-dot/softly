// Shared clean vector expressions from the supplied Emotion Candy reference.
const face=(ink,markup)=>({ink,markup});
const line='fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"';
export const moodFaces={
 Happy:face('#D08A14',`<path ${line} d="M38 31q3-4 6-1m12-1q4 0 7 4M43 37q3 4 6 0m2 0q3 4 6 0M36 39q12 13 28 0"/><circle cx="36" cy="39" r="1.5" fill="currentColor"/><circle cx="64" cy="39" r="1.5" fill="currentColor"/>`),
 Calm:face('#4E9657',`<path ${line} d="M36 34h8m12 0h8M45 41q5 3 10 0"/><circle cx="37" cy="41" r=".9" fill="currentColor"/><circle cx="63" cy="41" r=".9" fill="currentColor"/>`),
 Loved:face('#C34861',`<g transform="translate(50 33) scale(.62) translate(-48.25 -33)"><path ${line} d="M36 29C37 25 41 25 43 29M55 28C57 24 61 24 63 28M34 34C40 42 56 45 65 32M24 35L25.5 37.5M27 34L28.5 36.5M68 28L69.5 30.5M71 27L72.5 29.5"/></g>`),
 Energized:face('#E98748',`<path ${line} d="M40 35q3-5 6 0m8 0q3-5 6 0M47 40q3 9 6 0"/><circle cx="37" cy="40" r="3" fill="currentColor"/><circle cx="63" cy="40" r="3" fill="currentColor"/>`),
 Excited:face('#C98616',`<path ${line} d="m37 32 7 4-7 4m26-8-7 4 7 4"/><path d="M47 42h6l-3 5z" fill="currentColor"/>`),
 Hopeful:face('#72518C',`<path ${line} d="M36 35q3-4 6 0t6 0m4 0q3-4 6 0t6 0M46 43q4-3 8 0"/>`),
 Sad:face('#4B90C7',`<path ${line} d="M37 34q4 4 8 0m10 0q4 4 8 0M44 47q6-8 12 0"/><path d="M39 40c-2 3 2 5 0 7-2-2 2-4 0-7m22 0c-2 3 2 5 0 7-2-2 2-4 0-7" fill="currentColor"/>`),
 Anxious:face('#627F9F',`<path ${line} d="M36 32q5 3 9-1m10 0q4 4 9 1M44 42q2-3 4 0t4 0t4 0t4 0"/><circle cx="41" cy="37" r="1.7" fill="currentColor"/><circle cx="59" cy="37" r="1.7" fill="currentColor"/>`),
 Stressed:face('#875E85',`<path ${line} d="m37 34 7 4-7 4m26-8-7 4 7 4M45 47q5-4 10 0"/>`),
 Angry:face('#356D97',`<path ${line} d="M36 32q7 6 12 1m4 0q5 5 12-1M42 47q8-12 16 0"/><circle cx="43" cy="37" r="2" fill="currentColor"/><circle cx="57" cy="37" r="2" fill="currentColor"/>`),
 Numb:face('#63495B',`<path ${line} d="M37 32h8m10 0h8M42 37v3m16-3v3M40 44h20"/>`),
 Drained:face('#6A625F',`<path ${line} d="M36 35q4-3 8-1m12 0q4-2 8 1M39 40h6m10 0h6M47 46q3-3 6 0q-3 4-6 0"/><circle cx="42" cy="44" r=".9" fill="currentColor"/><circle cx="58" cy="44" r=".9" fill="currentColor"/>`),
 Content:face('#E98748',`<path ${line} d="M39 36h7m8 0h7M45 43q5 4 10 0"/>`),
 Dreamy:face('#72518C',`<path ${line} d="M37 35q4 4 8 0m10 0q4 4 8 0M45 42q5 4 10 0"/>`)
};
export const moodFacePlacement={centerX:50,centerY:33,scale:1};
