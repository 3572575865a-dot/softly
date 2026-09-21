// The web build uses the platform Screen Wake Lock API only during visible Quiet Mode.
export function createQuietWakeLock({request=()=>navigator.wakeLock?.request('screen'),visible=()=>!document.hidden}={}){
 let active=false,suspended=false,disposed=false,lock=null,generation=0,pending=false;
 async function release(){generation++;const previous=lock;lock=null;try{await previous?.release();}catch{}}
 async function sync(){if(disposed||!active||suspended||!visible()){await release();return;}if(lock||pending)return;const version=generation;pending=true;try{const next=await request();if(!next)return;if(disposed||!active||!visible()||version!==generation){await next.release();return;}lock=next;next.addEventListener?.('release',()=>{if(lock===next)lock=null;},{once:true});}catch{/* Unsupported or refused wake lock never blocks Quiet Mode. */}finally{pending=false;if(!disposed&&active&&!suspended&&visible()&&version!==generation)void sync();}}
 return {setActive(value){active=value;return sync();},sync,suspend(){suspended=true;return release();},resume(){suspended=false;return sync();},dispose(){disposed=true;active=false;return release();}};
}
