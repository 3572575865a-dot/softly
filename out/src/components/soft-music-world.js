import {softMusicVisual as config} from '../assets/soft-music.js';
// Called only when a new track's Sound Space is mounted, never by animation frames.
export function chooseSoftMusicVariant(random=Math.random){const index=Math.min(config.variants.length-1,Math.max(0,Math.floor(random()*config.variants.length)));return {...config.variants[index]};}
export function softMusicWorld({palette=config.palette,effect=config.effect}={}){
 const p=config.palettes[palette]||config.palettes[config.palette],e=config.effects[effect]||config.effects[config.effect];
 const style=`--music-core:${p.core};--music-ring:${p.ring};--music-mist:${p.mist};--music-bg:${p.background};--music-inner:${e.inner}%;--music-peak:${e.peak}%;--music-outer:${e.outer}%;--music-start:${e.start};--music-end:${e.end};--music-opacity:${e.opacity};--music-diameter:${config.diameter};--music-drift:${config.driftSeconds}s;--music-drift-opacity:${config.driftOpacity}`;
 return `<div class="sound-world soft-music-world" data-effect="${effect}" data-palette="${palette}" aria-hidden="true" style="${style}"><div class="music-mist"></div><div class="music-core"></div>${config.layers.map(l=>`<div class="music-ring-anchor" style="--music-x:${l.x}%;--music-y:${l.y}%;--music-blur:${l.blur}px;--music-radius:${l.scale};--music-seconds:${l.seconds}s;--music-delay:${l.delay}s"><div class="music-diffusion-ring"></div></div>`).join('')}</div>`;
}
// CSS compositor animations only. Pause offscreen and release listeners on teardown.
export function attachSoftMusicWorld(root){const art=root.querySelector('.soft-music-world'),abort=new AbortController();const visibility=()=>art.classList.toggle('music-suspended',document.hidden);document.addEventListener('visibilitychange',visibility,{signal:abort.signal});visibility();return()=>abort.abort();}
