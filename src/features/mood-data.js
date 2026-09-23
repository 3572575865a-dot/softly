import {emotions,allEmotions,emotionColor} from '../assets/emotion-palette.js';
export {emotions,allEmotions,emotionColor};
// Legacy weight is a lossless 0–100 storage encoding; UI/composition use normalized intensity.
export const intensityOf=e=>e.weight/100;
export const fromIntensity=(emotionType,intensity)=>({emotionType,weight:Math.max(0,Math.min(1,intensity))*100});
export const localDate=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export function parseDate(key){const d=new Date(key+'T12:00:00');if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||!Number.isFinite(+d)||localDate(d)!==key)throw new Error('Choose a valid date.');return d;}
export function mix(items){const total=items.reduce((n,e)=>n+intensityOf(e),0);return items.map(e=>({...e,proportion:total?intensityOf(e)/total:1/items.length}));}
export function dominant(items){
 return items.filter(e=>e.weight>0).reduce((best,item,index)=>{
 const candidate={...item,order:item.lastOccurrence??index};
 return !best||candidate.weight>best.weight||(candidate.weight===best.weight&&candidate.order>=best.order)?candidate:best;
 },null)?.emotionType||null;
}
export function entry(date,items,note='',previous){parseDate(date);if(items.length<1||items.length>3||new Set(items.map(e=>e.emotionType)).size!==items.length||items.some(e=>!allEmotions.some(t=>t.emotionType===e.emotionType)||!Number.isFinite(e.weight)||e.weight<0||e.weight>100))throw new Error('Choose up to three feelings.');const now=new Date().toISOString(),createdAt=previous?.createdAt||now;return {id:previous?.id||('mood-'+crypto.randomUUID()),date,moodDate:date,wasBackfilled:previous?.wasBackfilled??false,emotions:items.map(e=>({...e})),note:String(note).slice(0,4000),createdAt,updatedAt:now,editableUntil:new Date(Date.parse(createdAt)+86400000).toISOString()};}
export function yesterday(now=Date.now()){const date=new Date(now);date.setDate(date.getDate()-1);return localDate(date);}
export function nextLocalMidnight(now=Date.now()){const date=new Date(now);date.setHours(24,0,0,0);return +date;}
export function canMake(date,now=Date.now()){return date===localDate(new Date(now))||date===yesterday(now);}
export function canEdit(record,now=Date.now()){if(!record||Date.parse(record.createdAt)>now)return false;const today=localDate(new Date(now));return record.date===today||(record.date===yesterday(now)&&record.wasBackfilled===true&&localDate(new Date(record.createdAt))===today);}
export function moodAction(record,date,now=Date.now()){return record?(canEdit(record,now)?'Remake':null):canMake(date,now)?(date===yesterday(now)?'Make up':'Make'):null;}
export function saveDaily(date,items,note,previous,now=Date.now()){
 if(previous?(previous.date!==date||!canEdit(previous,now)):!canMake(date,now))throw new Error('This day is a saved memory now.');
 if(!items.some(e=>e.weight>0))throw new Error('Give at least one feeling a little room.');const saved=entry(date,items,note,previous);if(!previous){saved.createdAt=new Date(now).toISOString();saved.wasBackfilled=date===yesterday(now);}saved.moodDate=date;saved.updatedAt=new Date(now).toISOString();delete saved.editableUntil;return saved;
}
export function weekDates(date){const d=parseDate(date);d.setDate(d.getDate()-(d.getDay()+6)%7);return Array.from({length:7},(_,i)=>{const day=new Date(d);day.setDate(d.getDate()+i);return localDate(day);});}
export function shiftDate(date,period,amount){const d=parseDate(date);if(period==='Week')d.setDate(d.getDate()+amount*7);else if(period==='Month'){d.setDate(1);d.setMonth(d.getMonth()+amount);}else{d.setDate(1);d.setMonth(0);d.setFullYear(d.getFullYear()+amount);}return localDate(d);}
export function entriesOnDate(entries,date){return Object.values(entries).filter(r=>r.date===date).sort((a,b)=>Date.parse(a.createdAt)-Date.parse(b.createdAt));}
export const intensityLabel=weight=>weight<34?'A little':weight<67?'Some':'A lot';
// Persistence enforces one source record per date; visuals remain derived.
export function dailyComposition(records){
 const totals=new Map();let occurrence=0;
 // Derived only: one date remains one physical gummy and the save model is unchanged.
 const ordered=records.map((record,index)=>({record,index})).sort((a,b)=>Date.parse(a.record.updatedAt||a.record.createdAt)-Date.parse(b.record.updatedAt||b.record.createdAt)||a.index-b.index);
 for(const {record} of ordered)for(const item of record.emotions){
 const order=occurrence++;if(item.weight<=0)continue;
 const total=totals.get(item.emotionType)||{emotionType:item.emotionType,weight:0};
 total.weight+=item.weight;total.lastOccurrence=order;totals.set(item.emotionType,total);
 }
 return mix([...totals.values()]);
}
export function deriveDayGummy(entries,date){const records=entriesOnDate(entries,date);return {id:'day:'+date,date,recorded:records.length>0,recordIds:records.map(r=>r.id),items:dailyComposition(records),weight:50};}
export function saveMoodRecord(entries,date,items,note,now=Date.now()){const current=entriesOnDate(entries,date);if(current.length>1)throw new Error('One record per day is required.');const record=saveDaily(date,items,note,current[0],now);return {...entries,[record.id]:record};}
export function periodDates(date,period='Week'){if(period==='Week')return weekDates(date);const d=parseDate(date);d.setDate(1);if(period==='Year')d.setMonth(0);const month=d.getMonth(),year=d.getFullYear(),days=[];while(d.getFullYear()===year&&(period==='Year'||d.getMonth()===month)){days.push(localDate(d));d.setDate(d.getDate()+1);}return days;}
export function deriveDailyGummies(entries,date,period='Week'){const grouped=new Map();for(const r of Object.values(entries)){if(!grouped.has(r.date))grouped.set(r.date,{});grouped.get(r.date)[r.id]=r;}return periodDates(date,period).map(day=>deriveDayGummy(grouped.get(day)||{},day));}
function aggregate(entries,date,period){const groups=new Map(),prefix=date.slice(0,period==='Month'?7:4),offset=(parseDate(date.slice(0,7)+'-01').getDay()+6)%7;for(const r of Object.values(entries)){if(!r.date.startsWith(prefix+'-'))continue;const unit=period==='Month'?Math.floor((Number(r.date.slice(8))-1+offset)/7)+1:Number(r.date.slice(5,7));for(const e of r.emotions){if(e.weight<=0)continue;const id=prefix+':'+(period==='Month'?'week':'month')+'-'+unit+':'+e.emotionType;const group=groups.get(id)||{id,emotionType:e.emotionType,weight:0,...(period==='Month'?{month:prefix,weekIndex:unit}:{year:prefix,monthIndex:unit})};group.weight+=e.weight;groups.set(id,group);}}return [...groups.values()].sort((a,b)=>(a.weekIndex||a.monthIndex)-(b.weekIndex||b.monthIndex)||allEmotions.findIndex(e=>e.emotionType===a.emotionType)-allEmotions.findIndex(e=>e.emotionType===b.emotionType)).map(p=>({...p,items:[{emotionType:p.emotionType,weight:p.weight}]}));}
export const deriveMonthGummies=(entries,date)=>aggregate(entries,date,'Month');
export const deriveYearGummies=(entries,date)=>aggregate(entries,date,'Year');
export const STORAGE_KEY='softly-mood-v1',LEGACY_BACKUP_KEY='softly-mood-before-daily-v3';
export function loadEntries(storage){const raw=storage.getItem(STORAGE_KEY);if(!raw)return {};const data=JSON.parse(raw);if(![1,2,3].includes(data.version)||!data.entries||typeof data.entries!=='object'||Array.isArray(data.entries))throw new Error('Saved moods could not be read.');const days=new Map(),ids=new Set();for(const [key,e] of Object.entries(data.entries)){if(data.version===1&&key!==e.date)throw new Error('Saved moods could not be read.');entry(e.date,e.emotions,e.note,e);if(!e.id||ids.has(e.id)||!Number.isFinite(Date.parse(e.createdAt)))throw new Error('Saved moods could not be read.');ids.add(e.id);if(!days.has(e.date))days.set(e.date,[]);days.get(e.date).push(e);}const normalized={};for(const records of days.values()){if(data.version===3&&records.length>1)throw new Error('One record per day is required.');records.sort((a,b)=>Date.parse(a.createdAt)-Date.parse(b.createdAt)||a.id.localeCompare(b.id));const first=records[0],latest=[...records].sort((a,b)=>Date.parse(a.updatedAt||a.createdAt)-Date.parse(b.updatedAt||b.createdAt)||a.id.localeCompare(b.id)).at(-1);normalized[first.id]={...latest,id:first.id,createdAt:first.createdAt,emotions:latest.emotions.map(e=>({...e}))};}return normalized;}
export function persist(storage,entries){const days=new Set();for(const record of Object.values(entries)){entry(record.date,record.emotions,record.note,record);if(days.has(record.date))throw new Error('One record per day is required.');days.add(record.date);}const raw=storage.getItem(STORAGE_KEY);if(raw&&JSON.parse(raw).version!==3&&!storage.getItem(LEGACY_BACKUP_KEY))storage.setItem(LEGACY_BACKUP_KEY,raw);storage.setItem(STORAGE_KEY,JSON.stringify({version:3,entries}));}

export function migrateMoodStore(storage){const entries=loadEntries(storage),raw=storage.getItem(STORAGE_KEY);if(raw&&JSON.parse(raw).version!==3)persist(storage,entries);return entries;}
