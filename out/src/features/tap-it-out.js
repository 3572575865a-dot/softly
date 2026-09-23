import {mascot} from '../components/mascot.js';
import {icon} from '../components/icons.js';
import {createSessionSound,mountSessionSoundControl} from './global-sound.js';

const KEY='softly-tap-it-out-today-v1';
const PHRASES=['patience +1','calm +1','courage +1','softness +1','peace +1','whatever that was +1','letting go +1','luck +1'];
const today=()=>{const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;};

export function createLuckStore(storage=localStorage,clock=today){
  function read(){
    try{const saved=JSON.parse(storage.getItem(KEY));return saved?.date===clock()&&Number.isInteger(saved.luck)&&saved.luck>=0?saved.luck:0;}catch{return 0;}
  }
  function add(){const luck=read()+1;try{storage.setItem(KEY,JSON.stringify({date:clock(),luck}));}catch{}return luck;}
  return {read,add};
}

function woodenTap(soundScope){
  let context,master;
  const unsubscribe=soundScope.subscribe(state=>{if(master)master.gain.value=state.effectiveSoundEnabled?1:0;});
  return {
    play(){
      if(!soundScope.enabled)return;
      try{
        context ||= new (window.AudioContext||window.webkitAudioContext)();
        if(!master){master=context.createGain();master.gain.value=soundScope.enabled?1:0;master.connect(context.destination);}
        if(context.state==='suspended')context.resume();
        const now=context.currentTime,osc=context.createOscillator(),filter=context.createBiquadFilter(),gain=context.createGain();
        osc.type='sine';osc.frequency.setValueAtTime(570,now);osc.frequency.exponentialRampToValueAtTime(235,now+.11);
        filter.type='lowpass';filter.frequency.value=1050;
        gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.055,now+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+.15);
        osc.connect(filter).connect(gain).connect(master);osc.start(now);osc.stop(now+.16);
      }catch{}
    },
    dispose(){unsubscribe();context?.close();context=null;master=null;}
  };
}

export function tapItOutView({root,mount,onBack,store=createLuckStore()}){
  mount(`<section class="tap-space"><button class="icon-button tap-back" type="button" aria-label="Back to Home">${icon('back')}</button><header class="tap-heading"><h1>TAP IT OUT</h1><p>Whatever it is, tap it out.</p></header><div class="tap-center"><div class="tap-stage"><button class="tap-mascot" type="button" aria-label="Tap TummyTummy for Luck">${mascot({state:'floating',size:200,animated:true})}<svg class="tap-star" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4.5 29.6 17 43 20.3 32.6 29.2 33.5 43 24 35.8 14.5 43 15.4 29.2 5 20.3 18.4 17Z"/></svg></button><div class="tap-bubbles" aria-hidden="true"></div><span class="tap-phrase" aria-live="polite"></span></div><p class="tap-luck">LUCK · <span>${store.read()}</span></p></div></section>`,{navigation:false});
  const button=root.querySelector('.tap-mascot'),luck=root.querySelector('.tap-luck span'),bubbles=root.querySelector('.tap-bubbles'),phrase=root.querySelector('.tap-phrase'),soundScope=createSessionSound(),soundControlCleanup=mountSessionSoundControl(root.querySelector('.tap-space'),soundScope,'tap-session-toggle'),sound=woodenTap(soundScope);
  let taps=0,animation,phraseAnimation,lastPhrase=-1;
  function bubble(){const count=taps%12===0?2:1;for(let i=0;i<count;i++){const dot=document.createElement('span');dot.className='tap-bubble';dot.style.setProperty('--drift',`${(i?1:-1)*(15+Math.random()*24)}px`);dot.style.left=`${45+Math.random()*13}%`;dot.style.top=`${30+Math.random()*15}%`;bubbles.append(dot);dot.addEventListener('animationend',()=>dot.remove(),{once:true});}}
  function showPhrase(){const choice=Math.floor(Math.random()*(PHRASES.length-1));lastPhrase=choice>=lastPhrase?choice+1:choice;phrase.textContent=PHRASES[lastPhrase];phraseAnimation?.cancel();phraseAnimation=phrase.animate([{opacity:0,transform:'translateY(5px)'},{opacity:.8,transform:'translateY(0)',offset:.16},{opacity:.7,transform:'translateY(-8px)',offset:.62},{opacity:0,transform:'translateY(-16px)'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?900:1300,easing:'ease-out'});}
  button.onclick=()=>{sound.play();luck.textContent=store.add();taps++;animation?.cancel();animation=button.animate([{transform:'scale(1,1)'},{transform:'scale(1.025,.94)',offset:.35},{transform:'scale(.99,1.015)',offset:.72},{transform:'scale(1,1)'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?180:330,easing:'ease-out'});showPhrase();if(taps%3===0)bubble();};
  root.querySelector('.tap-back').onclick=onBack;
  const midnightCheck=setInterval(()=>{luck.textContent=store.read();},15000);
  return ()=>{clearInterval(midnightCheck);animation?.cancel();phraseAnimation?.cancel();sound.dispose();soundControlCleanup();soundScope.dispose();};
}
