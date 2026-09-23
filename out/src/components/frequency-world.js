import {frequencyVisual as config} from '../assets/frequency.js';
const TAU=Math.PI*2;
export function chooseFrequencyVariant(random=Math.random){return config.variants[Math.min(config.variants.length-1,Math.max(0,Math.floor(random()*config.variants.length)))];}
export function frequencyWorld(variant=chooseFrequencyVariant()){return `<canvas class="sound-world frequency-world" data-variant="${variant}" aria-hidden="true"></canvas>`;}
export function createFrequencyParticles(random=Math.random){return Array.from({length:config.particleCount},()=>{const core=random()<config.coreShare;return {core,angle:random()*TAU,radius:core?Math.pow(random(),.65)*config.coreRadius:config.haloInner+random()*config.haloWidth,band:core?(random()+random()+random()-1.5):random(),phase:random()*TAU,depth:random(),size:config.sizeMin+random()*(config.sizeMax-config.sizeMin),color:Math.floor(random()*config.palette.length)};});}
export function frequencyPoint(p,time,variant){
 const c=config,breathe=Math.sin(time/c.breathSeconds*TAU),drift=Math.sin(time*c.driftSpeed+p.phase)*c.driftAmount*(p.core?c.coreDrift:1),ringOffset=p.core?p.band*c.ringThickness:c.haloRingOffset+p.band*c.haloRingWidth;
 let angle=p.angle+time*c.orbitSpeed*(.5+p.depth*.5),radius,light=0;
 if(variant==='ring')radius=c.ringRadius*(1+.075*breathe)+ringOffset+drift;
 else if(variant==='bloom')radius=(.17+.13*(.5+.5*breathe))*p.radius+drift;
 else if(variant==='waves'){const wave=.5+.5*Math.cos(TAU*(p.radius*c.waveBands-time/c.waveSeconds));light=wave**6;radius=p.radius*c.fieldRadius+light*.014+drift;}
 else{const gather=(.5+.5*Math.sin(time/32*TAU))*.8;radius=p.radius*c.fieldRadius*(1-gather)+(c.ringRadius+ringOffset)*gather+drift;angle+=.11*Math.sin(time*.08+p.phase);}
 return {x:Math.cos(angle)*radius,y:Math.sin(angle)*radius+Math.cos(time*.12+p.phase)*c.driftAmount*.65*(p.core?c.coreDrift:1),size:p.size*(1+light*.3),opacity:Math.min(1,c.opacityMin+p.depth*(c.opacityMax-c.opacityMin)+light*.14)*(p.core?1:c.haloOpacity)};
}
export function attachFrequencyWorld(root){
 const canvas=root.querySelector('.frequency-world'),ctx=canvas.getContext('2d');if(!ctx)return()=>{};
 const particles=createFrequencyParticles(),abort=new AbortController(),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const sprites=(config.palettes[canvas.dataset.variant]||config.palette).map(color=>{const s=document.createElement('canvas');s.width=s.height=config.spriteSize;const c=s.getContext('2d'),r=s.width/2,g=c.createRadialGradient(r,r,0,r,r,r);g.addColorStop(0,color);g.addColorStop(.38,color);g.addColorStop(1,color+'00');c.fillStyle=g;c.fillRect(0,0,s.width,s.height);return s;});
 let frame,last=0,elapsed=0,visible=true,disposed=false,width=1,height=1;
 function paint(){ctx.clearRect(0,0,width,height);const unit=Math.min(width,height);for(const p of particles){const v=frequencyPoint(p,elapsed,canvas.dataset.variant),size=v.size*unit/340*3;ctx.globalAlpha=v.opacity;ctx.drawImage(sprites[p.color],width*.5+v.x*unit-size/2,height*.5+v.y*unit-size/2,size,size);}ctx.globalAlpha=1;}
 function tick(now){if(disposed||document.hidden||!visible)return;if(!last)last=now;const dt=now-last;if(dt>=1000/config.fps){elapsed+=Math.min(dt,100)/1000;last=now;paint();}frame=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(frame);last=0;if(disposed||document.hidden||!visible)return;if(reduce.matches)paint();else frame=requestAnimationFrame(tick);}
 function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,config.maxDpr);canvas.width=Math.max(1,Math.round(width*dpr));canvas.height=Math.max(1,Math.round(height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);paint();}
 const observer=new ResizeObserver(resize);observer.observe(canvas);const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});intersection.observe(canvas);
 document.addEventListener('visibilitychange',sync,{signal:abort.signal});reduce.addEventListener('change',sync,{signal:abort.signal});resize();sync();
 return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();abort.abort();};
}
