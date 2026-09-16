import {assets} from '../assets/config.js';
import {homeMemory,hasRegulatedToday,nextDay} from './home-memory.js';
let lastFull=false;
export const traceRing=()=>'<div class="orbit" aria-hidden="true"><svg class="trace-svg" viewBox="0 0 220 220"><circle class="trace-base" cx="110" cy="110" r="103"/><circle class="trace-fill" cx="110" cy="110" r="103" pathLength="100"/></svg></div>';
export function attachHomeTrace(root,openNote){
 const stage=root.querySelector('.mascot-stage'),shell=root.querySelector('.app-shell'),fill=root.querySelector('.trace-fill');
 const abort=new AbortController();let timer,fadeTimer,raf,secondRaf,bubble=null,disposed=false;
 fill.style.strokeDasharray='100';fill.style.strokeDashoffset=String(lastFull?0:100);
 function sync(){if(disposed)return;clearTimeout(timer);const now=Date.now(),note=homeMemory.note(),events=homeMemory.events(),next=hasRegulatedToday(events,now);
 cancelAnimationFrame(raf);cancelAnimationFrame(secondRaf);raf=requestAnimationFrame(()=>{secondRaf=requestAnimationFrame(()=>{fill.style.transitionDuration=next?assets.motion.ringMs+'ms':'0ms';fill.style.strokeDashoffset=String(next?0:100);lastFull=next;});});
 if(note){clearTimeout(fadeTimer);if(!bubble){bubble=document.createElement('button');bubble.className='memory-bubble';bubble.type='button';bubble.setAttribute('aria-label','Temporarily kept text');bubble.innerHTML='<span></span>';bubble.addEventListener('click',()=>{if(homeMemory.note())openNote();else sync();},{signal:abort.signal});stage.append(bubble);}bubble.classList.remove('fading');bubble.inert=shell.dataset.quiet!=='home';}
 else if(bubble){const old=bubble;old.classList.add('fading');old.inert=true;clearTimeout(fadeTimer);fadeTimer=setTimeout(()=>{old.remove();if(bubble===old)bubble=null;},assets.motion.bubbleFadeMs);}
 const expiries=[...(note?[note.expiresAt]:[]),nextDay(now)];if(expiries.length)timer=setTimeout(sync,Math.max(1,Math.min(...expiries)-Date.now()+1));
 }
 window.addEventListener('focus',sync,{signal:abort.signal});window.addEventListener('storage',sync,{signal:abort.signal});document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();},{signal:abort.signal});
 const observer=new MutationObserver(()=>{if(bubble)bubble.inert=shell.dataset.quiet!=='home';});observer.observe(shell,{attributes:true,attributeFilter:['data-quiet']});sync();
 return ()=>{disposed=true;clearTimeout(timer);clearTimeout(fadeTimer);cancelAnimationFrame(raf);cancelAnimationFrame(secondRaf);abort.abort();observer.disconnect();};
}
