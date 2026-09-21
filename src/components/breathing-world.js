import {breathingAssets as config} from '../assets/breathing.js';
let serial=0;const tracks=new WeakMap();
export function breathingWorld(preset){
 const key=config.worlds[preset]?preset:'orb',id='breath-world-'+(++serial),world=config.worlds[key],path=world.path;
 const accent=world.accent||config.material.shade;
 return `<svg class="breathing-world" data-world="${key}" viewBox="0 0 300 300" style="--world-accent:${accent}" aria-hidden="true"><defs><radialGradient id="${id}" cx=".35" cy=".25" r=".85"><stop stop-color="color-mix(in srgb, ${accent} 82%, ${config.material.milk})" stop-opacity=".95"/><stop offset=".48" stop-color="${accent}" stop-opacity=".9"/><stop offset="1" stop-color="${accent}" stop-opacity=".96"/></radialGradient></defs>${key==='ribbon'?`<path class="flower-stem" d="${world.stem}"/>`:''}<ellipse class="world-shadow" cx="150" cy="264" rx="45" ry="6"/><g class="world-body"><path class="world-base" d="${path}" fill="url(#${id})"/><path class="world-energy" d="${path}" pathLength="100"/>${key==='sphere'?`<path class="balloon-knot" d="${world.knot}"/><path class="balloon-string" d="${world.string}"/>`:key==='ribbon'?Array.from({length:world.petals},(_,i)=>`<path class="flower-petal" data-petal="${i}" d="${world.petal}" fill="url(#${id})"/>`).join('')+`<circle class="flower-center" cx="150" cy="145" r="17" fill="${config.material.milk}"/>`:''}</g><circle class="world-ball" r="10" fill="${accent}"/></svg>`;
}
const ease=t=>(1-Math.cos(Math.PI*Math.max(0,Math.min(1,t))))/2;
export function breathExpansion(s,method){if(s.name==='Inhale')return ease(s.progress)*(method.id==='sigh'?config.visual.secondInhaleShare:1);if(s.name==='Inhale again')return config.visual.secondInhaleShare+(1-config.visual.secondInhaleShare)*ease(s.progress);if(s.name==='Exhale')return 1-ease(s.progress);return method.phases.slice(0,s.index).some(p=>p[0]==='Exhale')?0:1;}
export function worldState(s,method,{reduced=false}={}){
 const e=breathExpansion(s,method),range=reduced?config.visual.reducedRange:1;
 return {expansion:e,scale:1+config.visual.orbScale*(e-.5)*range,rise:-config.visual.moonTravel*e*range,
 cloudProgress:((s.cycle%2)*3+s.index+Math.max(0,Math.min(1,s.progress)))/6,
 trackProgress:e,ribbonProgress:(s.cycle+(s.index+s.progress)/method.phases.length)%1};
}
export function paintBreathingWorld(svg,s,method,{reduced=false}={}){
 const v=config.visual,state=worldState(s,method,{reduced}),e=state.expansion,key=method.visualPreset,body=svg.querySelector('.world-body'),energy=svg.querySelector('.world-energy'),shadow=svg.querySelector('.world-shadow');
 let scale=1,y=0;
 if(key==='orb'||key==='sphere'){scale=state.scale;y=state.rise*.28;}
 if(key==='moon')y=state.rise;
 if(key==='cloud'){energy.style.strokeDasharray=`${state.cloudProgress*100} 100`;energy.style.strokeDashoffset='0';}
 if(key==='square'){energy.style.strokeDasharray=`${Math.max(.01,s.cycleProgress*100)} 100`;energy.style.strokeDashoffset='0';}
 if(key==='ribbon'){const w=config.worlds.ribbon,scatter=1-e,travel=reduced?config.visual.reducedRange:1;svg.querySelectorAll('.flower-petal').forEach((petal,i)=>{const angle=i*360/w.petals,rad=angle*Math.PI/180,drift=scatter*travel;const x=150+drift*(w.scatterX+Math.sin(rad)*24),y=145+drift*(Math.cos(rad)*w.scatterY-30);petal.setAttribute('transform',`translate(${x} ${y}) rotate(${angle+drift*(35+i*3)}) translate(0 ${-drift*(24+i%3*9)})`);petal.style.opacity=String(1-.64*scatter);});}
 if(key==='spiral'){
  const path=svg.querySelector('.world-base');let length=tracks.get(path);if(!length){length=path.getTotalLength();tracks.set(path,length);}
  // With Reduce Motion, keep the ball still and show the same exact progress as a track fill.
  const distance=(reduced?.5:state.trackProgress)*length,point=path.getPointAtLength(distance),a=path.getPointAtLength(Math.max(0,distance-.5)),b=path.getPointAtLength(Math.min(length,distance+.5)),norm=Math.hypot(b.x-a.x,b.y-a.y)||1,w=config.worlds.spiral,offset=w.ballRadius+w.strokeWidth/2+w.contactGap,ball=svg.querySelector('.world-ball');ball.setAttribute('r',w.ballRadius);ball.setAttribute('cx',point.x-(b.y-a.y)/norm*offset);ball.setAttribute('cy',point.y+(b.x-a.x)/norm*offset);
  energy.style.strokeDasharray=`${state.trackProgress*100} 100`;energy.style.opacity=reduced?'.85':'0';
 }
 body.style.transform=`translateY(${y}px) scale(${scale})`;
 shadow.style.transform=`scale(${1-.17*e},${1-.2*e})`;shadow.style.opacity=String(.22-.09*e);
 return e;
}
