import {createQuietWakeLock} from './quiet-wake-lock.js';
import {assets} from '../assets/config.js';
import {startAmbience} from './audio.js';

// Keeps the original Home DOM and mascot alive throughout all four states.
export function attachQuietMode(root, onDouble) {
 const shell=root.querySelector('.app-shell'),mascot=root.querySelector('.mascot-touch');
 const wake=createQuietWakeLock();
 const originalLabel=mascot.getAttribute('aria-label');
 const surrounding=[...shell.querySelectorAll('.home-header,.situations,.features,.permission,.nav,.companion-label,.gesture-hint')];
 const layer=document.createElement('div');layer.className='quiet-layer';layer.hidden=true;
 layer.innerHTML='<p class="quiet-message">Nothing to do right now.</p><div class="quiet-controls" inert><button data-quiet="sound" aria-pressed="false">Sound Off</button><button data-quiet="exit">Exit</button></div>';
 shell.append(layer);
 const controls=layer.querySelector('.quiet-controls'),sound=layer.querySelector('[data-quiet="sound"]');
 const abort=new AbortController(),listen=(el,event,fn)=>el.addEventListener(event,fn,{signal:abort.signal});
 let state='home',pressStart=0,point=null,lastTap=0,frame,restoreTimer,controlsTimer,relaxTimers=[],stopSound=()=>{},soundOn=false,scroll=0;
 const setState=value=>{state=value;shell.dataset.quiet=value;};setState('home');
 const clearPress=()=>{cancelAnimationFrame(frame);pressStart=0;point=null;};
 const reveal=()=>{if(state!=='overstimulation')return;clearTimeout(controlsTimer);controls.inert=false;controls.classList.add('visible');controlsTimer=setTimeout(()=>{if(controls.contains(document.activeElement))mascot.focus({preventScroll:true});controls.classList.remove('visible');controls.inert=true;},assets.motion.controlsHideMs);};
 const squish=e=>{const r=mascot.getBoundingClientRect();mascot.style.setProperty('--touch-x',`${Math.max(-3,Math.min(3,(e.clientX-r.left-r.width/2)/25))}px`);mascot.style.setProperty('--touch-y',`${Math.max(-2,Math.min(2,(e.clientY-r.top-r.height/2)/30))}px`);mascot.classList.add('quiet-touched');};
 const releaseSquish=()=>{mascot.classList.remove('quiet-touched');mascot.style.setProperty('--touch-x','0px');mascot.style.setProperty('--touch-y','0px');};
 const enter=()=>{
 clearPress();setState('overstimulation');wake.setActive(true);layer.hidden=false;scroll=window.scrollY;
 const rect=mascot.getBoundingClientRect();mascot.style.setProperty('--center-y',`${innerHeight/2-(rect.top+rect.height/2)}px`);
 document.body.style.overflow='hidden';surrounding.forEach(e=>e.inert=true);
 mascot.setAttribute('aria-label','Quiet companion. Press Escape to leave, or Tab to reveal controls.');mascot.focus({preventScroll:true});
 try{navigator.vibrate?.(8);}catch{} // Optional browser capability; native haptic adapter can replace this.
 relaxTimers=[30000,60000,120000].map((ms,i)=>setTimeout(()=>shell.dataset.relax=String(i+1),ms));
 };
 const cancel=()=>{if(state!=='longPressPreparing')return;clearPress();setState('home');shell.style.setProperty('--quiet-progress','0');releaseSquish();};
 const prepare=()=>{if(state!=='home')return;setState('longPressPreparing');pressStart=performance.now();
 const tick=now=>{if(state!=='longPressPreparing')return;const elapsed=now-pressStart;shell.style.setProperty('--quiet-progress',String(Math.min(1,elapsed/3000)));if(elapsed>=3000)enter();else frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);};
 const exit=()=>{if(state!=='overstimulation')return;wake.setActive(false);stopSound();soundOn=false;sound.textContent='Sound Off';sound.setAttribute('aria-pressed','false');clearTimeout(controlsTimer);relaxTimers.forEach(clearTimeout);controls.classList.remove('visible');controls.inert=true;setState('returningHome');shell.style.setProperty('--quiet-progress','0');releaseSquish();mascot.style.setProperty('--center-y','0px');delete shell.dataset.relax;
 restoreTimer=setTimeout(()=>{layer.hidden=true;setState('home');surrounding.forEach(e=>e.inert=false);document.body.style.overflow='';window.scrollTo(0,scroll);mascot.setAttribute('aria-label',originalLabel);mascot.focus({preventScroll:true});},assets.motion.quietReturnMs);};
 listen(mascot,'contextmenu',e=>e.preventDefault());
 listen(mascot,'pointerdown',e=>{if(e.button!==0)return;if(state==='overstimulation'){mascot.setPointerCapture(e.pointerId);squish(e);return;}if(state!=='home')return;point={x:e.clientX,y:e.clientY};mascot.setPointerCapture(e.pointerId);squish(e);prepare();});
 listen(mascot,'pointermove',e=>{if(state==='overstimulation'&&mascot.hasPointerCapture(e.pointerId))squish(e);else if(point&&Math.hypot(e.clientX-point.x,e.clientY-point.y)>14){lastTap=0;cancel();}});
 listen(mascot,'pointerup',()=>{releaseSquish();if(state!=='longPressPreparing')return;const short=performance.now()-pressStart<380;cancel();const now=performance.now();if(short&&lastTap&&now-lastTap<380){lastTap=0;onDouble();}else lastTap=short?now:0;});
 listen(mascot,'pointercancel',()=>{lastTap=0;releaseSquish();cancel();});
 listen(window,'blur',()=>{cancel();releaseSquish();wake.suspend();});listen(window,'focus',()=>wake.sync());listen(window,'pagehide',()=>{cancel();wake.suspend();});listen(window,'pageshow',()=>wake.sync());listen(document,'visibilitychange',()=>{if(document.hidden)cancel();wake.sync();});
 listen(mascot,'keydown',e=>{if(state==='home'&&e.key==='Enter'){e.preventDefault();onDouble();}if(e.key===' '&&!e.repeat){e.preventDefault();prepare();}});
 listen(mascot,'keyup',e=>{if(e.key===' ')cancel();});listen(mascot,'blur',cancel);
 listen(document,'keydown',e=>{if(state!=='overstimulation')return;if(e.key==='Escape'){e.preventDefault();exit();}if(e.key==='Tab'){e.preventDefault();reveal();const exitButton=layer.querySelector('[data-quiet="exit"]');(document.activeElement===sound?exitButton:document.activeElement===exitButton?mascot:sound).focus();}});
 listen(layer,'click',e=>{if(e.target===layer)reveal();});
 listen(controls,'pointerdown',()=>{clearTimeout(controlsTimer);});
 listen(sound,'click',()=>{if(soundOn){stopSound();soundOn=false;}else{try{stopSound=startAmbience('noise');soundOn=true;}catch{soundOn=false;}}sound.textContent=soundOn?'Sound On':'Sound Off';sound.setAttribute('aria-pressed',String(soundOn));reveal();});
 listen(layer.querySelector('[data-quiet="exit"]'),'click',exit);
 return ()=>{wake.dispose();abort.abort();clearPress();clearTimeout(restoreTimer);clearTimeout(controlsTimer);relaxTimers.forEach(clearTimeout);stopSound();document.body.style.overflow='';layer.remove();};
}
