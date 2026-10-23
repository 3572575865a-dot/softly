import {breathingTutorial} from './breathe-preferences.js';
import {createBreathingSession} from './breathe.js';
import {breathingWorld,paintBreathingWorld} from '../components/breathing-world.js';
import {breathingAssets as config} from '../assets/breathing.js';
import {playAsset} from '../assets/audio-player.js';
import {createSessionSound,mountSessionSoundControl} from './global-sound.js';
import {getLanguage,t} from './i18n.js';
// Shared entry point for standalone sessions and Guided Flow steps.
// Guided Flow supplies onSkip/onReturn; no second timing or rendering implementation.
export function breathingSessionView({root,mount,method,minutes=0,guided=false,onComplete=()=>{},onReturn=()=>{},onSkip=()=>{}}){
 const timing=config.motion,engine=createBreathingSession({method,duration:minutes*60,preparation:timing.prepareSeconds}),soundScope=createSessionSound();
 const tutorial=getLanguage()==='zh-CN'?method.phases.filter(([,seconds])=>seconds>0).map(([name,seconds])=>`${t(name)} ${seconds} 秒`).join(' · '):breathingTutorial(method);
 mount(`<section class="breathing-session" aria-label="${method.name}" data-mode="preparing"><p class="breathing-title">Get ready</p><p class="preparation-tutorial">${tutorial}</p><div class="preparation-ripples" aria-hidden="true"><i></i><i></i><i></i></div><button class="glass preparation-continue" hidden>Continue</button><div class="breathing-atmosphere" aria-hidden="true"></div><button class="breathing-object" aria-label="Reveal current breathing phase and count">${breathingWorld(method.visualPreset)}</button><div class="breathing-guidance"><span class="breathing-phase"></span><span class="breathing-count"></span></div><div class="breathing-preparation"><p>Bring your attention to your breath.</p>${method.id==='478'?'<p class="breathing-cue">In through your nose.<br>Out gently through your mouth.</p><p class="breathing-cue">Keep it comfortable.<br>You don’t need to force the hold.</p>':''}</div><p class="breathing-ending" role="status"></p><span class="sr-only breathing-status" role="status" aria-live="polite" aria-atomic="true"></span><div class="breathing-controls"><button class="glass" data-breath="pause">Pause</button><button class="glass" data-breath="end">End</button>${guided?'<button class="glass" data-breath="skip">Skip</button>':''}</div></section>`,{navigation:false});
 const screen=root.querySelector('.breathing-session'),visual=screen.querySelector('.breathing-object'),svg=screen.querySelector('svg'),guidance=screen.querySelector('.breathing-guidance'),phase=screen.querySelector('.breathing-phase'),count=screen.querySelector('.breathing-count'),status=screen.querySelector('.breathing-status'),pause=screen.querySelector('[data-breath="pause"]'),controls=screen.querySelector('.breathing-controls'),hasAudio=config.audio.enabled&&Object.entries(config.audio).some(([key,value])=>key.endsWith('Track')||key.endsWith('SFX')?Boolean(value):false),soundControlCleanup=hasAudio?mountSessionSoundControl(screen,soundScope,'breath-session-toggle'):()=>{};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),abort=new AbortController();let preparePulse=null,lastCountdown=0;let raf,controlsTimer,endingTimer,settleTimer,disposed=false,ending=false,revealUntil=0,lastAnnouncement='',audioStop=null,audioTried=false;
 for(const [key,value] of Object.entries(config.material))screen.style.setProperty('--breathing-'+key,value);
 screen.style.setProperty('--breathing-settle',timing.settleMs+'ms');screen.style.setProperty('--breathing-preparation-fade',timing.preparationFadeMs+'ms');
 function stopAudio(){audioStop?.();audioStop=null;}
 function audio(){if(audioTried||!config.audio.enabled||!config.audio.backgroundTrack)return;audioTried=true;try{audioStop=playAsset(config.audio.backgroundTrack,{soundScope});audioStop.started.catch(()=>{});}catch{/* Optional presentation must never affect timing. */}}
 function revealControls(){if(ending||engine.sample().preparing)return;clearTimeout(controlsTimer);screen.classList.add('controls-visible');if(!engine.sample().paused)controlsTimer=setTimeout(()=>{if(!controls.contains(document.activeElement))screen.classList.remove('controls-visible');},timing.controlsMs);}
 function finish(reason){if(ending)return;ending=true;const qualifies=engine.qualifies(reason);engine.end();stopAudio();clearTimeout(controlsTimer);screen.dataset.mode='ending';screen.classList.remove('controls-visible');controls.inert=true;visual.disabled=true;if(qualifies)onComplete();settleTimer=setTimeout(()=>{cancelAnimationFrame(raf);preparePulse?.cancel();screen.querySelector('.breathing-ending').textContent=reason==='skip'?'Stay here.':'That’s enough for now.';endingTimer=setTimeout(()=>{if(reason==='skip')onSkip();else onReturn({reason,completed:qualifies});},reason==='skip'?timing.skipEndingMs:timing.endingMs);},timing.settleMs);}
 function setPaused(value,interrupted=false){if(ending)return;if(value){engine.pause();stopAudio();pause.textContent=interrupted?'Continue':'Resume';}else{engine.resume();audioTried=false;pause.textContent='Pause';}screen.dataset.paused=String(value);status.textContent=value?(interrupted?'Paused. Continue when you’re ready.':'Paused.'): 'Following your breath.';revealControls();}
 screen.querySelector('.preparation-continue').onclick=()=>setPaused(false);
 pause.onclick=e=>{setPaused(!engine.sample().paused);if(e.detail)pause.blur();};
 screen.querySelector('[data-breath="end"]').onclick=()=>finish('end');
 screen.querySelector('[data-breath="skip"]')?.addEventListener('click',()=>finish('skip'));
 visual.onclick=()=>{revealUntil=performance.now()+timing.revealMs;};
 screen.addEventListener('click',e=>{if(!e.target.closest('button'))revealControls();},{signal:abort.signal});
 controls.addEventListener('focusin',revealControls,{signal:abort.signal});controls.addEventListener('focusout',revealControls,{signal:abort.signal});
 screen.addEventListener('keydown',e=>{if(e.key==='Escape'&&!engine.sample().preparing){revealControls();pause.focus();}},{signal:abort.signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)setPaused(true,true);},{signal:abort.signal});
 window.addEventListener('pagehide',()=>setPaused(true,true),{signal:abort.signal});
 window.addEventListener('blur',()=>setPaused(true,true),{signal:abort.signal});
 function frame(now){if(disposed)return;const s=engine.sample();
 if(!ending){if(s.finished){finish('complete');}else{
 if(!s.preparing&&screen.dataset.mode==='preparing')revealControls();screen.dataset.mode=s.preparing?'preparing':'active';controls.inert=s.preparing;screen.querySelector('.breathing-title').textContent=s.preparing?'Get ready':method.name;screen.querySelector('.preparation-continue').hidden=!(s.preparing&&s.paused);if(s.preparing&&s.countdown!==lastCountdown){lastCountdown=s.countdown;preparePulse?.cancel();if(!reduced.matches)preparePulse=screen.querySelector('.preparation-ripples').animate([{transform:`scale(${config.visual.preparationStartScale})`,opacity:config.visual.preparationOpacity},{transform:`scale(${config.visual.preparationEndScale})`,opacity:0}],{duration:timing.preparationPulseMs,easing:'ease-out',fill:'both'});}if(preparePulse){if(s.paused)preparePulse.pause();else if(preparePulse.playState==='paused')preparePulse.play();}
 const show=s.preparing||s.showText||now<revealUntil||s.paused;guidance.classList.toggle('guidance-hidden',!show);
 phase.textContent=s.preparing?'':s.name;count.textContent=s.preparing?String(s.countdown):`${s.remaining} ${s.remaining===1?'second':'seconds'}`;
 const announce=s.preparing?'Preparing':s.paused?'Paused':s.name;if(announce!==lastAnnouncement){status.textContent=s.preparing?'Bring your attention to your breath.':s.paused?'Paused.':`${s.name}, ${s.duration} seconds.`;lastAnnouncement=announce;}
 if(!s.preparing&&!s.paused)audio();
 }}
 // Phase snapshot drives both typography and geometry; no presentation clock or lag.
 const expansion=paintBreathingWorld(svg,s,method,{reduced:reduced.matches});
 screen.querySelector('.breathing-atmosphere').style.opacity=String(method.id==='sleep'?.45+.1*expansion:.65+.15*expansion);
 raf=requestAnimationFrame(frame);
 }
 revealControls();raf=requestAnimationFrame(frame);
 return ()=>{disposed=true;preparePulse?.cancel();cancelAnimationFrame(raf);clearTimeout(controlsTimer);clearTimeout(endingTimer);clearTimeout(settleTimer);abort.abort();stopAudio();soundControlCleanup();soundScope.dispose();};
}
