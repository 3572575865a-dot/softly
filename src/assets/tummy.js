// TummyTummy: reference-based silhouettes. The four final cubic lobes are its only tentacles.
export const tummyAssets={
 colors:{outline:'#D7CBD2',body:'#E4D7DD',ink:'#AD96A2',milk:'#FFF8FA'},
 motion:{floatSeconds:7,blinkSeconds:13,inhaleMs:3000,exhaleMs:4000,gestureMs:2400,tapDelayMs:380},
 actions:['breath','sway','bubbles','blink'],
 paths:{
 floating:'M78 211C41 199 12 179 15 145C19 91 65 31 129 23C197 12 255 48 280 109C296 148 294 180 270 199C253 213 224 221 204 223C218 245 189 250 177 234C180 268 147 271 143 241C128 267 103 260 109 237C90 255 68 241 77 225C85 218 83 215 78 211Z',
 inhale:'M79 211C42 211 23 194 28 159C35 92 67 39 131 34C197 27 243 55 258 117C269 155 273 186 250 202C239 209 228 212 217 212C239 248 204 265 185 237C179 261 153 258 150 232C147 262 116 259 113 231C122 264 79 266 73 240C68 227 73 219 79 211Z',
 exhale:'M72 205C34 206 8 193 16 159C29 104 71 43 132 30C195 17 252 50 278 107C297 148 300 178 279 196C265 207 244 211 228 211C281 218 255 252 197 232C212 264 159 270 151 240C145 268 104 264 109 234C67 259 28 239 52 224C64 219 76 220 72 205Z'
 }
};
let serial=0;
export function tummyArtwork(){const id='tummy-'+(++serial),a=tummyAssets;
 return `<svg class="tummy-svg" viewBox="0 0 300 280" aria-hidden="true" style="--tummy-body:${a.colors.body};--tummy-outline:${a.colors.outline};--tummy-ink:${a.colors.ink};--tummy-milk:${a.colors.milk};--tummy-floating:path('${a.paths.floating}');--tummy-inhale:path('${a.paths.inhale}');--tummy-exhale:path('${a.paths.exhale}');--tummy-float:${a.motion.floatSeconds}s;--tummy-blink:${a.motion.blinkSeconds}s;--tummy-gesture:${a.motion.gestureMs}ms">
 <defs><radialGradient id="${id}" cx=".42" cy=".35" r=".8"><stop stop-color="${a.colors.milk}" stop-opacity=".88"/><stop offset=".65" stop-color="${a.colors.body}" stop-opacity=".78"/><stop offset="1" stop-color="${a.colors.body}" stop-opacity=".92"/></radialGradient></defs>
 <g class="tummy-float"><g class="tummy-gesture"><path class="tummy-body" data-tentacles="4" d="${a.paths.floating}" fill="url(#${id})"/>
 <g class="tummy-face" fill="none" stroke="${a.colors.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
 <g class="tummy-face-floating"><path d="M120 107Q126 95 134 103M164 102Q173 94 178 106"/><g class="tummy-eyes"><ellipse cx="129" cy="121" rx="2.8" ry="4.6" fill="${a.colors.ink}" stroke="none"/><ellipse cx="165" cy="124" rx="2.8" ry="4.6" fill="${a.colors.ink}" stroke="none"/></g><path class="tummy-floating-smile" d="M113 134Q143 155 180 141"/><path class="tummy-home-mouth" d="M151 128C138 122 138 136 147 136C137 136 138 150 152 143"/></g>
 <g class="tummy-face-inhale"><path d="M119 113L129 119L119 123M173 113L163 119L173 123"/><ellipse cx="146" cy="128" rx="4" ry="3"/></g>
 <g class="tummy-face-exhale"><path d="M117 110Q124 102 132 104M166 104Q176 105 181 111M117 128Q125 136 132 129M166 129Q175 135 182 127"/><ellipse cx="149" cy="147" rx="7" ry="11"/></g>
 <g class="tummy-cheeks" fill="${a.colors.ink}" stroke="none" opacity=".35"><circle cx="97" cy="132" r="3"/><circle cx="88" cy="138" r="2.8"/><circle cx="98" cy="144" r="2.6"/><circle cx="201" cy="137" r="3"/><circle cx="211" cy="144" r="2.8"/><circle cx="200" cy="150" r="2.6"/></g></g>
 <g class="tummy-headphones">
 <path d="M34 123C35 -9 258 -12 271 126" fill="none" stroke="${a.colors.ink}" stroke-opacity=".48" stroke-width="12" stroke-linecap="round"/>
 <path d="M40 120C45 6 248 2 264 122" fill="none" stroke="${a.colors.milk}" stroke-opacity=".6" stroke-width="3"/>
 <ellipse cx="31" cy="137" rx="21" ry="35" transform="rotate(12 31 137)" fill="${a.colors.body}"/>
 <ellipse cx="25" cy="137" rx="14" ry="32" transform="rotate(12 25 137)" fill="${a.colors.ink}" opacity=".23"/>
 <ellipse cx="270" cy="138" rx="22" ry="36" transform="rotate(-8 270 138)" fill="${a.colors.body}"/>
 <ellipse cx="277" cy="138" rx="15" ry="33" transform="rotate(-8 277 138)" fill="${a.colors.ink}" opacity=".26"/>
 </g>
 </g></g><g class="tummy-bubbles" fill="none" stroke="${a.colors.ink}" stroke-opacity=".35" stroke-width="1.5"><circle cx="28" cy="90" r="7"/><circle cx="279" cy="191" r="5"/><circle cx="19" cy="118" r="3"/></g></svg>`;
}
