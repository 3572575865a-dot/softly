export const DAY=86400000;
export const NOTE_KEY='softly-dump',EVENTS_KEY='softly-regulation-events-v1';
export function startOfDay(now=Date.now()){const d=new Date(now);d.setHours(0,0,0,0);return +d;}
export function nextDay(now=Date.now()){const d=new Date(now);d.setHours(24,0,0,0);return +d;}
export function liveNote(note,now=Date.now()){return !!note&&typeof note.content==='string'&&note.content.trim().length>0&&Number.isFinite(note.createdAt)&&note.createdAt<=now&&note.expiresAt===note.createdAt+DAY&&note.expiresAt>now;}
export function liveEvents(events,now=Date.now()){const seen=new Set();return events.filter(e=>e&&typeof e.id==='string'&&['breathe','sound'].includes(e.type)&&Number.isFinite(e.createdAt)&&e.createdAt<=now&&e.createdAt>=startOfDay(now)&&!seen.has(e.id)&&seen.add(e.id));}
export function hasRegulatedToday(events,now=Date.now()){return liveEvents(events,now).some(e=>e.type==='breathe'||e.type==='sound');}
export function createMemoryStore(storage,clock=()=>Date.now(),uid=()=>crypto.randomUUID()){
 function read(key,fallback){try{return JSON.parse(storage.getItem(key))??fallback;}catch{return fallback;}}
 function note(){const value=read(NOTE_KEY,null);if(liveNote(value,clock()))return value;if(value)storage.removeItem(NOTE_KEY);return null;}
 function saveNote(content){if(!content.trim()){storage.removeItem(NOTE_KEY);return null;}const current=note(),now=clock(),next={id:current?.id||uid(),type:'text',content,createdAt:current?.createdAt??now,expiresAt:current?.expiresAt??now+DAY};storage.setItem(NOTE_KEY,JSON.stringify(next));return next;}
 function events(){const value=read(EVENTS_KEY,[]),old=Array.isArray(value)?value:[],valid=liveEvents(old,clock());if(valid.length!==old.length)storage.setItem(EVENTS_KEY,JSON.stringify(valid));return valid;}
 function record(type,id){if(!['breathe','sound'].includes(type))throw new Error('Unknown activity');const all=events();if(!hasRegulatedToday(all,clock())){all.push({id,type,createdAt:clock()});storage.setItem(EVENTS_KEY,JSON.stringify(all));}return all;}
 return {note,saveNote,events,record,clearNote(){storage.removeItem(NOTE_KEY);}};
}
// Keep this tab functional if browser storage is unavailable, without replacing existing data.
let fallback=new Map();const storage={getItem(key){try{return localStorage.getItem(key)??fallback.get(key)??null;}catch{return fallback.get(key)??null;}},setItem(key,value){try{localStorage.setItem(key,value);fallback.delete(key);}catch{fallback.set(key,value);}},removeItem(key){fallback.delete(key);try{localStorage.removeItem(key);}catch{}}};
export const homeMemory=createMemoryStore(storage);
export function migrateBrainDump(){try{const legacy=sessionStorage.getItem(NOTE_KEY);if(legacy){if(!homeMemory.note())homeMemory.saveNote(legacy);sessionStorage.removeItem(NOTE_KEY);}}catch{}}
export function activityId(){return crypto.randomUUID();}
