export const techniques=[
 {id:'slow',name:'Slow Breathing · 4–6',contextLabel:'Gentle Relaxation',shortDescription:'A longer exhale to soften the pace.',detail:'4 – 6',visualPreset:'ribbon',phases:[['Inhale',4],['Exhale',6]]},
 {id:'box',name:'Box Breathing · 4–4–4–4',contextLabel:'Focus & Grounding',shortDescription:'A steady rhythm to follow.',detail:'4 – 4 – 4 – 4',visualPreset:'square',phases:[['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]]},
 {id:'478',name:'4–7–8 Breathing',contextLabel:'Sleep & Unwinding',shortDescription:'Slow down before rest.',detail:'4 – 7 – 8',visualPreset:'capsule',phases:[['Inhale',4],['Hold',7],['Exhale',8]]},
 {id:'coherent',name:'Coherent Breathing · 5–5',contextLabel:'Everyday Balance',shortDescription:'An even, steady rhythm.',detail:'5 – 5',visualPreset:'orb',phases:[['Inhale',5],['Exhale',5]]},
 {id:'sigh',name:'Physiological Sigh',contextLabel:'For Tense Moments',shortDescription:'A quick way to slow things down.',detail:'3 – 1 – 6',visualPreset:'bubbles',phases:[['Inhale',3],['Inhale again',1],['Exhale',6]]},
 {id:'sleep',name:'Sleep Breathing · 4–8',contextLabel:'Bedtime',shortDescription:'Slow and quiet for winding down.',detail:'4 – 8',visualPreset:'moon',phases:[['Inhale',4],['Exhale',8]]},
 {id:'custom',name:'Custom Breathing',contextLabel:'Your own rhythm',shortDescription:'Make room for a comfortable pace.',detail:'Your own breathing pattern',visualPreset:'orb',phases:[['Inhale',4],['Exhale',6]]}
];
export function customTechnique(values){if(values.length!==4||values.some((n,i)=>!Number.isInteger(n)||n>30||n<(i%2?0:1)))throw new Error('Use whole seconds: 1–30 for breaths and 0–30 for optional holds.');return {...techniques.at(-1),phases:values.map((n,i)=>[['Inhale','Hold','Exhale','Hold'][i],n]).filter(p=>p[1]>0)};}
export const cycleLength=method=>method.phases.reduce((n,p)=>n+p[1],0);
export function phaseAt(seconds,method){const length=cycleLength(method),cycle=Math.floor(Math.max(0,seconds)/length);let t=Math.max(0,seconds)%length;for(let index=0;index<method.phases.length;index++){const [name,duration]=method.phases[index];if(t<duration)return {name,duration,index,elapsed:t,progress:t/duration,remaining:Math.max(1,Math.ceil(duration-t)),cycle,showText:cycle<5,cycleProgress:(Math.max(0,seconds)%length)/length};t-=duration;}}
// Monotonic, injectable clock. Neither CSS nor audio can advance the session.
export function createBreathingSession({method,duration=0,now=()=>performance.now(),preparation=3}){
 if(!Number.isFinite(duration)||duration<0)throw new Error('Invalid session duration');
 const length=cycleLength(method),finishAt=duration?Math.ceil(duration/length)*length:Infinity;
 let elapsed=0,last=now(),paused=false,ended=false;
 function sample(){const current=now();if(!paused&&!ended)elapsed+=Math.max(0,current-last)/1000;last=current;const seconds=Math.min(Math.max(0,elapsed-preparation),finishAt);return {...phaseAt(seconds,method),seconds,preparing:elapsed<preparation,countdown:Math.max(1,Math.ceil(preparation-elapsed)),paused,finished:seconds>=finishAt,ended};}
 return {sample,pause(){const s=sample();paused=true;return {...s,paused:true};},resume(){last=now();paused=false;return sample();},end(){const s=sample();ended=true;return {...s,ended:true};},qualifies(reason){const s=sample();return reason==='complete'&&s.finished||reason==='end'&&!duration&&!s.preparing&&s.seconds>=length;},finishAt};
}
