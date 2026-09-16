import {assets} from '../assets/config.js';
// Short-lived, damped simulation around a stable packed arrangement.
export function attachJarPhysics(glass,nodes){
 const tuning=assets.physics;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),abort=new AbortController();let raf=0,last=0,until=0,down=null;
 const bodies=nodes.map((n,i)=>({...n,homeX:n.x,homeY:n.y,vx:0,vy:0,r:n.size*tuning.collisionRadius,mass:(n.size/60)**2,el:glass.querySelectorAll('.jar-gummy')[i]}));
 function frame(t){const dt=Math.min(.024,(t-last)/1000||.016);last=t;
 for(const b of bodies){b.vx+=((b.homeX-b.x)*tuning.spring-b.vx*tuning.horizontalDamping)*dt;b.vy+=((b.homeY-b.y)*tuning.spring+tuning.gravity-b.vy*tuning.verticalDamping)*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;}
 for(let k=0;k<2;k++)for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const a=bodies[i],b=bodies[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||.01,over=a.r+b.r-d;if(over>0){const nx=dx/d,ny=dy/d,share=b.mass/(a.mass+b.mass);a.x-=nx*over*share;b.x+=nx*over*(1-share);a.y-=ny*over*share;b.y+=ny*over*(1-share);const v=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(v<0){const impulse=-v*tuning.restitution;a.vx-=nx*impulse*share;b.vx+=nx*impulse*(1-share);a.vy-=ny*impulse*share;b.vy+=ny*impulse*(1-share);}}}
 for(const b of bodies){const w=glass.clientWidth,h=glass.clientHeight;b.x=Math.max(b.r+8,Math.min(w-b.r-8,b.x));b.y=Math.max(b.r+12,Math.min(h-b.r-8,b.y));b.el.style.setProperty('--x',b.x+'px');b.el.style.setProperty('--y',b.y+'px');b.el.style.setProperty('--turn',(b.angle+Math.max(-6,Math.min(6,b.vx*.025)))+'deg');}
 if(t<until)raf=requestAnimationFrame(frame);else raf=0;
 }
 function shake(){if(reduced.matches)return;for(const [i,b] of bodies.entries()){b.vx=(i%2?1:-1)*tuning.shakeX/Math.sqrt(b.mass);b.vy=-tuning.shakeY/Math.sqrt(b.mass);}until=performance.now()+assets.motion.shakeMs;if(!raf){last=performance.now();raf=requestAnimationFrame(frame);}}
 glass.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};},{signal:abort.signal});
 glass.addEventListener('pointermove',e=>{if(down&&Math.abs(e.clientX-down.x)>24&&Math.abs(e.clientY-down.y)<30){down=null;glass.dataset.dragging='true';shake();}},{signal:abort.signal});
 glass.addEventListener('pointerup',()=>{down=null;setTimeout(()=>delete glass.dataset.dragging,0);},{signal:abort.signal});glass.addEventListener('pointercancel',()=>{down=null;delete glass.dataset.dragging;},{signal:abort.signal});
 return {shake,dispose(){cancelAnimationFrame(raf);abort.abort();}};
}
