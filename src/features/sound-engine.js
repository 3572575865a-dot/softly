import {assets} from '../assets/config.js';
import {playAsset} from '../assets/audio-player.js';
import {soundConfig} from '../assets/sound.js';
import {effectiveMode,nextTrack} from './sound-data.js';
let activeSession=null;
export function createSoundSession({track,getTracks=()=>[],onState=()=>{},onStarted=()=>{},onFinish=()=>{},guided=false,duration=0,soundScope,audioFactory=playAsset,now=()=>Date.now(),makeURL=b=>URL.createObjectURL(b),revokeURL=u=>URL.revokeObjectURL(u)}){
 activeSession?.dispose();let handle,url,version=0,playAttempt=0,disposed=false,ending=false,playing=false,paused=false,deadline=0,mode=effectiveMode(track,{guided,duration}),error='',timerMinutes=duration;
 const emit=()=>onState({track,mode,playing,paused,ending,error,deadline,timerMinutes,guided,currentTime:handle?.currentTime||0,duration:handle?.duration||0,seekable:!!handle?.seek});
 function release(){handle?.();handle=null;if(url){revokeURL(url);url=null;}}
 function fail(e){if(disposed||ending)return;version++;release();playing=false;paused=false;error=e?.message||'This audio is no longer available.';emit();}
 async function finish(reason='exit'){if(disposed||ending)return;ending=true;version++;playing=false;emit();await handle?.fade(soundConfig.fadeMs);if(disposed)return;release();onFinish(reason);}
 function interrupted(){if(disposed||ending||!playing)return;pause();}
 function naturalEnd(){if(disposed||ending||!playing||paused)return;if(deadline&&now()>=deadline){finish('timer');return;}if(mode==='continuous'&&!guided){const next=nextTrack(getTracks(),track.id);if(next){release();track=next;start();return;}}finish('natural');}
 function start(){if(disposed||ending)return;const token=++version,attempt=++playAttempt;release();error='';paused=false;playing=false;emit();try{const asset=track.sourceType==='builtIn'?{...assets.audio[track.id]}:{url:(url=makeURL(track.audioBlob)),volume:soundConfig.importVolume};asset.loop=mode==='loop'||!!deadline||!!duration;asset.fadeInMs=soundConfig.transitionMs;handle=audioFactory(asset,{soundScope,onEnded:()=>{if(token===version)naturalEnd();},onInterrupted:()=>{if(token===version)interrupted();},onError:e=>{if(token===version)fail(e);}});handle.started.then(ok=>{if(disposed||ending||token!==version||attempt!==playAttempt||paused)return;if(!ok)throw new Error('This audio is no longer available.');playing=true;if(!deadline&&duration){deadline=now()+duration*60000;handle.setLoop(true);}emit();onStarted(track);}).catch(e=>{if(token===version&&attempt===playAttempt&&!paused)fail(e);});}catch(e){fail(e);}}
 function pause(){if(disposed||ending||!handle)return;playAttempt++;handle.pause();playing=false;paused=true;emit();}
 function resume(){if(disposed||ending)return;if(!handle){start();return;}const token=version,attempt=++playAttempt;error='';handle.resume().then(()=>{if(disposed||ending||token!==version||attempt!==playAttempt)return;playing=true;paused=false;emit();onStarted(track);}).catch(e=>{if(token===version&&attempt===playAttempt)fail(e);});}
 function setTimer(minutes){if(guided)return;if(!Number.isFinite(minutes)||minutes<0||minutes>1440)throw new Error('Choose 1–1440 minutes.');timerMinutes=minutes;deadline=minutes?now()+minutes*60000:0;handle?.setLoop(mode==='loop'||!!deadline);emit();}
 function seek(seconds){if(disposed||ending||!handle?.seek||!handle.seek(seconds))return false;emit();return true;}
 function switchFrequency(next){if(disposed||ending||guided||track.category!=='hz'||next?.sourceType!=='builtIn'||assets.audio[next.id]?.category!=='hz')return;track=next;start();}
 function setMode(value){if(guided||track.sourceType!=='userImported'||!['once','loop','continuous'].includes(value))return;mode=value;handle?.setLoop(mode==='loop'||!!deadline);emit();}
 function tick(){if(disposed||ending)return;if(deadline&&now()>=deadline){finish('timer');return;}if(playing)emit();}
 const timer=setInterval(tick,250);
 const api={start,pause,resume,seek,switchFrequency,setTimer,setMode,finish,tick,get state(){return {track,mode,playing,paused,ending,error,deadline,timerMinutes,guided,currentTime:handle?.currentTime||0,duration:handle?.duration||0,seekable:!!handle?.seek};},dispose(){if(disposed)return;disposed=true;version++;clearInterval(timer);release();if(activeSession===api)activeSession=null;}};activeSession=api;return api;
}
