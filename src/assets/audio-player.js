import {assets} from './config.js';
import {createSessionSound} from '../features/global-sound.js';
// Shared adapter. The callable handle remains backwards compatible with Breathe/Mood.
export function playAsset(id,options={}){const asset=typeof id==='object'?id:assets.audio[id];if(id==='none'){const stop=()=>{};stop.started=Promise.resolve(false);return stop;}if(!asset)throw new Error('This sound is not available yet.');return createAudioHandle(asset,options);}
export function createAudioHandle(asset,{onEnded=()=>{},onInterrupted=()=>{},onError=()=>{},media:providedMedia,soundScope:providedScope}={}){
 let stopped=false,intentional=false,hasStarted=false,virtualPosition=0,virtualStartedAt=0,fadeTimer,fadeResolve,ctx,gain,media,source,removeListeners=()=>{};const volume=asset.volume??.025,virtualDuration=asset.progressDuration||0,scope=providedScope||createSessionSound(),ownsScope=!providedScope;let muted=!scope.enabled,unsubscribe=()=>{};
 const Context=typeof window!=='undefined'&&(window.AudioContext||window.webkitAudioContext);
 if(asset.url){
  media=providedMedia||new Audio();media.src=asset.url;media.loop=asset.loop??true;media.preload='auto';
  // One GainNode makes fades work on iOS too, where HTMLMediaElement.volume may be fixed.
  if(Context){try{ctx=new Context();gain=ctx.createGain();gain.gain.value=muted?0:volume;source=ctx.createMediaElementSource(media);source.connect(gain);gain.connect(ctx.destination);}catch{ctx?.close().catch(()=>{});ctx=null;gain=null;}}
  if(!gain)media.volume=muted?0:volume;
  const ended=()=>{if(!stopped&&!intentional&&media.ended)onEnded();},paused=()=>{if(!stopped&&!intentional&&!media.ended)onInterrupted();},failed=()=>{if(!stopped)onError(new Error('This audio is no longer available.'));};
  media.addEventListener?.('ended',ended);media.addEventListener?.('pause',paused);media.addEventListener?.('error',failed);removeListeners=()=>{media.removeEventListener?.('ended',ended);media.removeEventListener?.('pause',paused);media.removeEventListener?.('error',failed);};
 }else{
  if(!Context)throw new Error('Audio is unavailable in this browser.');ctx=new Context();gain=ctx.createGain();gain.gain.value=muted?0:volume;gain.connect(ctx.destination);const synth=assets.synth;
  if(['noise','rain','ocean'].includes(asset.kind)){const buffer=ctx.createBuffer(1,ctx.sampleRate*synth.noiseSeconds,ctx.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+synth.brownStep*(Math.random()*2-1))/synth.brownDecay;data[i]=asset.kind==='rain'?(Math.random()*2-1)*synth.rainGain:last*synth.brownGain;}source=ctx.createBufferSource();source.buffer=buffer;source.loop=asset.loop;source.connect(gain);source.start();if(asset.kind==='ocean'){const lfo=ctx.createOscillator(),depth=ctx.createGain();lfo.frequency.value=synth.oceanHz;depth.gain.value=synth.oceanDepth;lfo.connect(depth);depth.connect(gain.gain);lfo.start();}}
  else if(asset.kind==='drop'){const o=ctx.createOscillator(),t=ctx.currentTime;o.frequency.setValueAtTime(asset.frequencies[0],t);o.frequency.exponentialRampToValueAtTime(asset.frequencies[1],t+asset.duration*.65);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(muted ? .0001 : volume,t+.02);gain.gain.exponentialRampToValueAtTime(.0001,t+asset.duration);o.connect(gain);o.start();o.stop(t+asset.duration);o.onended=()=>{unsubscribe();if(ownsScope)scope.dispose();ctx.close().catch(()=>{});};}
  else for(const f of asset.frequencies||[]){const o=ctx.createOscillator();o.frequency.value=f;o.connect(gain);o.start();}
 }
 if(ctx)ctx.onstatechange=()=>{if(!intentional&&!stopped&&['suspended','interrupted'].includes(ctx.state))onInterrupted();};
 const cancelFade=()=>{clearInterval(fadeTimer);fadeResolve?.();fadeResolve=null;};
 const stop=()=>{if(stopped)return;stopped=true;intentional=true;cancelFade();unsubscribe();if(ownsScope)scope.dispose();removeListeners();if(ctx){ctx.onstatechange=null;ctx.close().catch(()=>{});}if(media){media.pause();media.removeAttribute('src');media.load();}};
 const virtualTime=()=>virtualDuration?(virtualPosition+(intentional?0:(Date.now()-virtualStartedAt)/1000))%virtualDuration:0;
 stop.pause=()=>{if(virtualDuration)virtualPosition=virtualTime();intentional=true;cancelFade();media?.pause();ctx?.suspend().catch(()=>{});};
 stop.resume=()=>{if(stopped)return Promise.reject(new Error('Playback was interrupted.'));intentional=false;virtualStartedAt=Date.now();if(gain&&hasStarted){gain.gain.cancelScheduledValues(ctx.currentTime);gain.gain.setValueAtTime(muted?0:volume,ctx.currentTime);}else if(media&&!gain)media.volume=muted?0:volume;hasStarted=true;const playback=media?media.play():Promise.resolve();return Promise.all([playback,ctx?ctx.resume():Promise.resolve()]).then(()=>{if(stopped||intentional||media?.paused||(ctx&&ctx.state!=='running'))throw new Error('Playback was interrupted.');return true;});};
 stop.setLoop=value=>{if(media)media.loop=value;else if(source&&'loop'in source)source.loop=value;};
 Object.defineProperties(stop,{duration:{get:()=>Number.isFinite(media?.duration)?media.duration:virtualDuration},currentTime:{get:()=>media?.currentTime||virtualTime()}});
 stop.seek=seconds=>{const duration=Number.isFinite(media?.duration)?media.duration:virtualDuration;if(!duration)return false;if(media)media.currentTime=Math.max(0,Math.min(seconds,duration));else{virtualPosition=Math.max(0,Math.min(seconds,duration));virtualStartedAt=Date.now();}return true;};
 stop.fade=(ms=900)=>new Promise(resolve=>{cancelFade();fadeResolve=resolve;const start=Date.now(),initial=gain?gain.gain.value:media?.volume||0;if(gain){gain.gain.cancelScheduledValues(ctx.currentTime);gain.gain.setValueAtTime(initial,ctx.currentTime);gain.gain.linearRampToValueAtTime(0,ctx.currentTime+ms/1000);}fadeTimer=setInterval(()=>{const p=Math.min(1,(Date.now()-start)/ms);if(!gain&&media)media.volume=initial*(1-p);if(p>=1){clearInterval(fadeTimer);fadeResolve=null;resolve();}},30);});
 if(gain&&asset.fadeInMs&&asset.kind!=='drop'){gain.gain.setValueAtTime(0,ctx.currentTime);gain.gain.linearRampToValueAtTime(muted?0:volume,ctx.currentTime+asset.fadeInMs/1000);}
 let subscribed=false;unsubscribe=scope.subscribe(state=>{const nextMuted=!state.effectiveSoundEnabled;if(!subscribed){subscribed=true;muted=nextMuted;return;}muted=nextMuted;if(stopped)return;if(gain){gain.gain.cancelScheduledValues(ctx.currentTime);gain.gain.setValueAtTime(muted?0:volume,ctx.currentTime);}else if(media)media.volume=muted?0:volume;});
 stop.started=stop.resume();stop.started.catch(()=>{});return stop;
}
