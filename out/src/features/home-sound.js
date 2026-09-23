import {icon} from '../components/icons.js';
import {readGlobalSound,setGlobalQuiet,createSessionSound} from './global-sound.js';

export function attachHomeSoundToggle(root){
  const button=root.querySelector('.home-sound-toggle'),scope=createSessionSound();
  let dialog=null;
  const unsubscribe=scope.subscribe(state=>{
    button.classList.toggle('quiet-on',state.globalQuietEnabled);
    button.setAttribute('aria-pressed',String(state.globalQuietEnabled));
    button.innerHTML=`${icon(state.globalQuietEnabled?'speaker-muted':'speaker')}<span>${state.globalQuietEnabled?'Quiet On':'Sound On'}</span>`;
  });
  function explain(){
    let confirmed=false;
    dialog=document.createElement('dialog');dialog.className='quiet-explanation';
    dialog.innerHTML=`<div class="quiet-explanation-content"><h2>Quiet Mode</h2><p>All sounds will stay muted across the app.</p><p>You can still turn sound on temporarily<br>inside any page.</p><button class="glass quiet-explanation-confirm" type="button">Got it</button></div>`;
    root.querySelector('.app-shell').append(dialog);
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>{dialog.remove();dialog=null;if(confirmed)try{setGlobalQuiet(true,{acknowledge:true});}catch{}},{once:true});
    dialog.querySelector('.quiet-explanation-confirm').onclick=()=>{confirmed=true;dialog.classList.add('quiet-explanation-closing');setTimeout(()=>dialog?.close(),180);};
    dialog.showModal();
  }
  button.onclick=()=>{
    const state=readGlobalSound();
    if(state.globalQuietEnabled){setGlobalQuiet(false);return;}
    if(state.hasSeenQuietModeExplanation){setGlobalQuiet(true);return;}
    explain();
  };
  return ()=>{unsubscribe();scope.dispose();dialog?.close();};
}
