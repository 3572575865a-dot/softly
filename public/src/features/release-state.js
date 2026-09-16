// Text stays intact in memory; visual fragments are never the source of truth.
export function releaseFragments(text,max=14){const points=Array.from(text),size=Math.max(1,Math.ceil(points.length/max));return Array.from({length:Math.ceil(points.length/size)},(_,i)=>points.slice(i*size,(i+1)*size).join(''));}
export function createReleaseSession(memory,clock=()=>Date.now()){
 let retained=memory.note(),text=retained?.content||'',phase='writing';
 const valid=()=>!retained||retained.expiresAt>clock()&&memory.note()?.id===retained.id;
 function expire(){if(valid())return false;text='';retained=null;phase='writing';return true;}
 return {get text(){return text;},get retained(){return retained;},get phase(){return phase;},setText(value){if(phase==='writing'&&!retained)text=value;},expire,
 start(){if(expire()||!text.trim())return false;phase='releasing';return true;},
 keep(){if(expire()||!text.trim())return false;const current=memory.note();if(current&&current.id!==retained?.id)throw new Error('Another text is being kept. Return home to open it.');retained=memory.saveNote(text);phase='kept';return true;},
 complete(){if(phase!=='releasing')return false;if(retained&&memory.note()?.id===retained.id)memory.clearNote();text='';retained=null;phase='released';return true;},
 remove(){if(retained&&memory.note()?.id===retained.id)memory.clearNote();text='';retained=null;phase='writing';},
 cancelRelease(){if(phase==='releasing')phase='writing';}
 };
}
