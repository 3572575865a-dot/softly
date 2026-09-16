import {breathingAssets as config} from '../assets/breathing.js';
let serial=0;
export function breathingWorld(preset){
 const key=config.worlds[preset]?preset:'orb',id='breath-world-'+(++serial),path=config.worlds[key].path;
 return `<svg class="breathing-world" data-world="${key}" viewBox="0 0 300 300" aria-hidden="true"><defs><radialGradient id="${id}"><stop stop-color="${config.material.milk}" stop-opacity=".78"/><stop offset=".7" stop-color="${config.material.pink}" stop-opacity=".52"/><stop offset="1" stop-color="${config.material.shade}" stop-opacity=".2"/></radialGradient></defs><g class="world-ripples"><circle cx="150" cy="150" r="112"/><circle cx="150" cy="150" r="131"/></g><g class="world-body"><path class="world-base" d="${path}" fill="url(#${id})"/><path class="world-energy" d="${path}" pathLength="100"/><ellipse class="world-light" cx="125" cy="112" rx="34" ry="48" fill="url(#${id})"/></g><circle class="world-second" cx="221" cy="195" r="35" fill="url(#${id})"/></svg>`;
}
const ease=t=>(1-Math.cos(Math.PI*t))/2;
export function breathExpansion(s,method){if(s.name==='Inhale')return ease(s.progress)*(method.id==='sigh'?config.visual.secondInhaleShare:1);if(s.name==='Inhale again')return config.visual.secondInhaleShare+(1-config.visual.secondInhaleShare)*ease(s.progress);if(s.name==='Exhale')return 1-ease(s.progress);return method.phases.slice(0,s.index).some(p=>p[0]==='Exhale')?0:1;}
export function paintBreathingWorld(svg,s,method,{reduced=false,ambient=0}={}){
 const v=config.visual,e=breathExpansion(s,method),range=reduced?v.reducedRange:1,key=method.visualPreset,body=svg.querySelector('.world-body'),energy=svg.querySelector('.world-energy'),second=svg.querySelector('.world-second'),ripples=svg.querySelector('.world-ripples');
 let sx=1,sy=1,y=0,opacity=config.material.opacity;
 if(key==='orb'){sx=sy=1+(v.orbScale*(e-.5))*range;ripples.style.opacity=String(reduced?.06:.06+.13*e);ripples.style.transform=`scale(${1+v.rippleScale*e*range})`;}
 if(key==='capsule'){sx=1+(v.capsuleWidth*(e-.5))*range;sy=1+(v.capsuleHeight*(e-.5))*range;}
 if(key==='bubbles'){sx=sy=v.bubbleBase+v.bubbleScale*e*range;opacity=.26+.44*e;const p=s.name==='Inhale again'?ease(s.progress):s.name==='Exhale'?1:0;second.style.opacity=String(s.name==='Inhale again'?.7*Math.sin(Math.PI*p):0);second.style.transform=`translate(${-v.bubbleMergeX*p*range}px,${-v.bubbleMergeY*p*range}px) scale(${1-.45*p*range})`;y=-v.bubbleRise*e*range;}
 if(key==='moon'){y=v.moonTravel*(.5-e)*range;opacity=.40+.12*e;}
 if(key==='square'){energy.style.strokeDasharray=`${Math.max(.01,s.cycleProgress*100)} 100`;energy.style.strokeDashoffset='0';opacity=.65;}
 if(key==='ribbon'){energy.style.strokeDasharray='24 76';energy.style.strokeDashoffset=String(-100*(s.cycle+(s.index+s.progress)/method.phases.length)*(reduced?v.reducedRange:1));opacity=.63;}
 body.style.transform=`translateY(${y}px) scale(${sx},${sy})`;body.style.opacity=String(opacity);svg.querySelector('.world-light').style.transform=`translate(${Math.sin(ambient)*v.lightTravel}px,${Math.cos(ambient)*v.lightTravel*.67}px)`;
 return e;
}
