import {soundConfig as config} from '../assets/sound.js';
// Shared preset renderer for built-in Sound and My Music. Touch is visual-only.
export function soundWorld(preset){const p=config.paths;
 let shapes='';
 if(preset==='waves')shapes=[0,1,2].map(i=>`<path class="sound-wave" style="--layer:${i}" d="${p.wave}"/>`).join('');
 else if(preset==='rain')shapes=Array.from({length:14},(_,i)=>`<ellipse class="sound-droplet" style="--layer:${i}" cx="${24+(i*73)%270}" cy="${20+(i*47)%255}" rx="2" ry="9"/>`).join('');
 else if(['resonance','ripples'].includes(preset))shapes=[0,1,2].map(i=>`<ellipse class="sound-ring" style="--layer:${i}" cx="160" cy="160" rx="${47+i*35}" ry="${36+i*28}"/>`).join('')+(preset==='resonance'?Array.from({length:12},(_,i)=>`<circle class="sound-speck" style="--layer:${i}" cx="${35+(i*67)%250}" cy="${30+(i*41)%255}" r="2"/>`).join(''):'');
 else if(preset==='fibers')shapes=Array.from({length:20},(_,i)=>`<path class="sound-fiber" style="--layer:${i}" d="M${44+i*12} 248Q${25+i*12} 169 ${44+i*12} ${80+(i%3)*9}"/>`).join('');
 else if(preset==='paper')shapes=[0,1,2].map(i=>`<rect class="sound-sheet" style="--layer:${i}" x="${55+i*15}" y="${60+i*25}" width="170" height="145" rx="12"/>`).join('');
 else if(preset==='flow')shapes=`<path class="sound-flow" d="${p.flow}"/>`;
 else if(preset!=='none')shapes=[0,1,2].map(i=>`<path class="sound-cloud" style="--layer:${i}" d="${p.liquid}"/>`).join('');
 return `<svg class="sound-world" data-preset="${preset}" viewBox="0 0 320 320" aria-hidden="true">${shapes}<circle class="sound-touch-ripple" cx="160" cy="160" r="35"/></svg>`;
}
export function attachSoundWorld(root){const svg=root.querySelector('.sound-world'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),abort=new AbortController();let start=performance.now(),raf,disposed=false,touchAt=-Infinity;
 const shapes=[...svg.children].filter(e=>!e.classList.contains('sound-touch-ripple')),ripple=svg.querySelector('.sound-touch-ripple');
 function touch(e){if(e.target.closest('button,input,select,dialog'))return;const r=svg.getBoundingClientRect();ripple.setAttribute('cx',String((e.clientX-r.left)/r.width*320));ripple.setAttribute('cy',String((e.clientY-r.top)/r.height*320));touchAt=performance.now();}
 root.addEventListener('pointerdown',touch,{signal:abort.signal});
 function frame(now){if(disposed)return;const t=(now-start)/1000,a=t/config.motion.periodSeconds*Math.PI*2,travel=reduced.matches?config.motion.reducedTravel:config.motion.travel,settle=Math.min(1,t/config.settleSeconds),preset=svg.dataset.preset;
 shapes.forEach((el,i)=>{const wave=Math.sin(a+i*.8),drift=Math.cos(a*.7+i);let x=wave*travel,y=drift*travel*.5,scale=1;if(preset==='rain'){x=0;y=reduced.matches?drift:((t*6+i*19)%45)-22;el.style.opacity=String(.10+.12*(.5+.5*Math.sin(a+i)));}else if(el.classList.contains('sound-speck')){x*=1-settle;y*=1-settle;el.style.opacity=String(.25*(1-settle));}else if(el.classList.contains('sound-ring')){scale=1+wave*(reduced.matches?.005:.035);el.style.opacity=String(preset==='resonance'?.12+.20*settle:.14+.12*(.5+.5*wave));}else if(preset==='fibers'){x=wave*travel*.25;y=0;}else if(preset==='liquid'){scale=1+wave*(reduced.matches?.003:.025);}el.style.transform=`translate(${x}px,${y}px) scale(${scale})`;});
 const touch=Math.min(1,(now-touchAt)/config.motion.touchMs);ripple.style.opacity=String((1-touch)*.3);ripple.setAttribute('r',String(35+touch*(reduced.matches?5:55)));raf=requestAnimationFrame(frame);}
 function visibility(){cancelAnimationFrame(raf);if(!document.hidden)raf=requestAnimationFrame(frame);}
 document.addEventListener('visibilitychange',visibility,{signal:abort.signal});raf=requestAnimationFrame(frame);return ()=>{disposed=true;cancelAnimationFrame(raf);abort.abort();};
}
