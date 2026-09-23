import {icon} from '../components/icons.js';

const KEY='softly-global-sound-v1';
const CHANGE='softly-global-sound-change';

export function readGlobalSound(storage=globalThis.localStorage){
  try{const saved=JSON.parse(storage?.getItem(KEY));return {globalQuietEnabled:saved?.globalQuietEnabled===true,hasSeenQuietModeExplanation:saved?.hasSeenQuietModeExplanation===true};}
  catch{return {globalQuietEnabled:false,hasSeenQuietModeExplanation:false};}
}

export function setGlobalQuiet(enabled,{acknowledge=false,storage=globalThis.localStorage}={}){
  const current=readGlobalSound(storage);
  const next={globalQuietEnabled:Boolean(enabled),hasSeenQuietModeExplanation:current.hasSeenQuietModeExplanation||acknowledge};
  storage.setItem(KEY,JSON.stringify(next));
  if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent(CHANGE,{detail:next}));
  return next;
}

export function createSessionSound(){
  let global=readGlobalSound(),override=false,disposed=false;
  const subscribers=new Set();
  const snapshot=()=>({globalQuietEnabled:global.globalQuietEnabled,effectiveSoundEnabled:!global.globalQuietEnabled||override,localSessionSoundOverride:override});
  const notify=()=>{const state=snapshot();for(const subscriber of subscribers)subscriber(state);};
  const changed=event=>{global=event.detail||readGlobalSound();if(!global.globalQuietEnabled)override=false;notify();};
  const stored=event=>{if(event.key!==KEY)return;global=readGlobalSound();if(!global.globalQuietEnabled)override=false;notify();};
  if(typeof window!=='undefined'){window.addEventListener(CHANGE,changed);window.addEventListener('storage',stored);}
  return {
    get enabled(){return snapshot().effectiveSoundEnabled;},
    get globalQuietEnabled(){return global.globalQuietEnabled;},
    toggleOverride(){if(disposed||!global.globalQuietEnabled)return;override=!override;notify();},
    subscribe(callback){subscribers.add(callback);callback(snapshot());return ()=>subscribers.delete(callback);},
    dispose(){if(disposed)return;disposed=true;if(typeof window!=='undefined'){window.removeEventListener(CHANGE,changed);window.removeEventListener('storage',stored);}subscribers.clear();}
  };
}

export function mountSessionSoundControl(container,scope,className=''){
  const button=document.createElement('button');button.type='button';button.className=`icon-button session-sound-toggle ${className}`;
  button.onclick=event=>{event.stopPropagation();scope.toggleOverride();};
  container.append(button);
  const unsubscribe=scope.subscribe(state=>{
    button.hidden=!state.globalQuietEnabled;
    button.setAttribute('aria-label',state.effectiveSoundEnabled?'Mute sound for this session':'Turn sound on for this session');
    button.setAttribute('aria-pressed',String(state.effectiveSoundEnabled));
    button.innerHTML=icon(state.effectiveSoundEnabled?'speaker':'speaker-muted');
  });
  return ()=>{unsubscribe();button.remove();};
}
