import {soundConfig as config} from '../assets/sound.js';
const v=config.visual,TAU=Math.PI*2;
const count=(n,fn)=>Array.from({length:n},(_,i)=>fn(i)).join('');
const shape=(tag,kind,i,extra='')=>`<${tag} class="space-layer space-${kind}" data-i="${i}" fill="${v.palette[i%v.palette.length]}" stroke="${v.palette[i%v.palette.length]}" ${extra}/>`;
// All presets share the existing SVG surface and one disposable, throttled animation loop.
export function soundWorld(preset){
 let shapes='';
 if(preset==='resonance')shapes=count(v.layers,i=>shape('path','curve',i))+count(v.speckCount,i=>shape('circle','dot',i,'r="1"'));
 else if(preset==='fibers')shapes=count(v.dotColumns*v.dotRows,i=>shape('circle','dot',i,'r="1.5"'));
 else if(preset==='rain')shapes=count(v.rainCount,i=>shape('ellipse','rain',i,'rx="2" ry="9"'))+count(4,i=>shape('ellipse','ripple',i,'cx="160" cy="230" rx="8" ry="3"'));
 else if(preset==='underwater')shapes=count(4,i=>shape('path','ray',i))+count(v.bubbleCount,i=>shape('circle','ripple',i,'r="3"'));
 else if(preset==='campfire'||preset==='wind')shapes=count(v.ribbonCount,i=>shape('path','ribbon',i))+(preset==='wind'?count(8,i=>shape('circle','dot',i,'r="1.4"')):'');
 else if(preset==='ripples')shapes=count(3,i=>shape('ellipse','ripple',i,'cx="160" cy="160" rx="50" ry="40"'));
 else if(preset==='stream'||preset==='flow')shapes=count(6,i=>shape('path','curve',i));
 else if(preset==='brown2')shapes=count(v.layers,i=>shape('path','wave',i));
 else if(preset!=='none')shapes=count(v.layers,i=>shape('path',preset==='liquid'?'blob':'mist',i));
 return `<svg class="sound-world" data-preset="${preset}" viewBox="0 0 320 320" aria-hidden="true">${shapes}<circle class="sound-touch-ripple" cx="160" cy="160" r="35"/></svg>`;
}
function curve(t,i,base,amplitude,frequency=1){let d='';for(let x=-60;x<=380;x+=5){const y=base+Math.sin(x/320*TAU*frequency+t*.27+i*1.8)*amplitude+Math.sin(x/210+t*.17+i)*5;d+=`${x===-60?'M':'L'}${x} ${y.toFixed(2)}`;}return d;}
function blob(t,i){let d='';for(let j=0;j<=72;j++){const a=j/72*TAU,r=v.blobRadius+i*4+Math.sin(a*3+t*.23+i)*v.blobMorph+Math.cos(a*2-t*.17+i)*7;const x=160+Math.cos(a)*r*(1+.045*Math.sin(t*.21+i)),y=160+Math.sin(a)*r*(1+.055*Math.cos(t*.18+i));d+=`${j?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`;}return d+'Z';}
export function attachSoundWorld(root){
 const svg=root.querySelector('.sound-world');if(!svg)return ()=>{};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),abort=new AbortController(),preset=svg.dataset.preset;
 const shapes=[...svg.querySelectorAll('.space-layer')],ripple=svg.querySelector('.sound-touch-ripple');
 let raf=0,last=-Infinity,start=performance.now(),touchAt=-Infinity,disposed=false,visible=true;
 root.addEventListener('pointerdown',e=>{if(e.target.closest('button,input,select,dialog'))return;const r=svg.getBoundingClientRect();ripple.setAttribute('cx',(e.clientX-r.left)/r.width*320);ripple.setAttribute('cy',(e.clientY-r.top)/r.height*320);touchAt=performance.now();},{signal:abort.signal});
 function draw(now){
 const t=reduced.matches?0:(now-start)/1000;
 shapes.forEach(el=>{const i=Number(el.dataset.i),kind=el.classList[1],phase=t*.25+i;let opacity=.4;
 const attr=(key,value)=>el.setAttribute(key,String(value));
 if(preset==='fibers'){
 const col=i%v.dotColumns,row=Math.floor(i/v.dotColumns),x=43+col*v.dotSpacing,y=54+row*v.dotSpacing;
 const cx=160+65*Math.sin(t*.18),cy=155+55*Math.cos(t*.15),dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy),bulge=Math.exp(-d*d/7500)*Math.sin(t*.45-d*.025);
 attr('cx',x+dx*bulge*.16+Math.sin(y*.025+t*.2)*3);attr('cy',y+dy*bulge*.16+Math.cos(x*.025+t*.22)*4);attr('r',1.25+(bulge+1)*.45);opacity=.32+(bulge+1)*.2;
 }else if(kind==='space-dot'){
 attr('cx',preset==='wind'?((i*53+t*5)%400)-40:28+(i*71)%266+Math.sin(phase)*7);attr('cy',110+(i*47)%110+Math.cos(phase*.7)*9);opacity=.22+.2*(.5+.5*Math.sin(phase));
 }else if(preset==='resonance'){attr('d',curve(t,i,153+i*6,v.waveAmplitude,1.15));opacity=.52-i*.08;}
 else if(preset==='liquid'){
 const a=t/config.motion.periodSeconds*TAU,w=Math.sin(a+i*.8);
 attr('d',config.paths.liquid);attr('fill',v.liquidPalette[i]);
 el.style.transform=`translate(${w*v.liquidTravel}px,${Math.cos(a*.7+i)*v.liquidTravel*.5}px) scale(${1+w*v.liquidScale},${1+Math.cos(a+i)*v.liquidScale})`;
 opacity=v.liquidOpacity[i];
 }else if(preset==='brown'){
 const a=t/config.motion.periodSeconds*TAU;attr('d',config.paths.liquid);attr('fill',config.material.brown);
 el.style.transform=`translate(${Math.sin(a+i*.8)*config.motion.travel}px,${Math.cos(a*.7+i)*config.motion.travel*.5}px)`;opacity=.14;
 }else if(preset==='waves'){
 attr('d',config.paths.wave);attr('fill',config.material.milk);attr('stroke',config.material.milk);
 const a=t/config.motion.periodSeconds*TAU*(1-i*.18);el.style.transform=`translate(${Math.sin(a+i*.8)*config.motion.travel}px,${i*17+Math.cos(a*.7+i)*9}px)`;opacity=v.oceanOpacity[i];
 }
 else if(preset==='waves'||preset==='brown2'){
 const deep=preset==='brown2';attr('d',curve(t*(deep?.45:1-i*.16),i,155+i*29,deep?13:24,deep?.65:.85)+'L380 390L-60 390Z');opacity=deep?.30:.34;
 }else if(preset==='stream'||preset==='flow'){attr('d',curve(t*(1+i*.13),i,105+i*23,8,.85));opacity=.22+.035*i;}
 else if(preset==='rain'){
 if(kind==='space-rain'){const x=24+(i*73)%270,y=((20+i*47+t*(6+i%3))%330)-10;attr('cx',x);attr('cy',y);attr('rx',1.4+i%3*.4);attr('ry',6+i%4*2);attr('fill',config.material.milk);attr('stroke','none');opacity=v.rainOpacity+.12*Math.sin(phase);}
 else{const q=(t*.12+i*.27)%1;attr('cx',50+i*70);attr('cy',220+i%2*42);attr('rx',3+q*23);attr('ry',1+q*7);attr('stroke',config.material.milk);opacity=Math.sin(q*Math.PI)*.6;}
 }else if(preset==='underwater'){
 if(kind==='space-ray'){const x=40+i*74+Math.sin(t*.18+i)*13;attr('d',`M${x} -30L${x+12} -30L${x+65} 330L${x-42} 330Z`);opacity=.12+.08*(.5+.5*Math.sin(phase));}
 else{attr('cx',38+(i*67)%250+Math.sin(t*.3+i)*8);attr('cy',350-((i*43+t*(3+i%3))%400));attr('r',2+i%3*1.5);opacity=.4;}
 }else if(preset==='campfire'){
 const x=160+(i%3-1)*19,y=255-i*3,w=v.flameWidth*(1-i*.12),h=v.flameHeight*(1-i*.13),sway=Math.sin(t*.65+i*.7)*v.flameSway;
 // Rounded base, inward shoulders and a tapered, swaying tip: a flame, not a floating ribbon.
 attr('d',`M${x} ${y}C${x-w*1.5} ${y-8} ${x-w} ${y-h*.48} ${x-w*.5} ${y-h*.64}Q${x-w*.55} ${y-h*.36} ${x-w*.12} ${y-h*.44}C${x+w*.30+sway} ${y-h*.68} ${x-w*.12+sway} ${y-h*.85} ${x+sway} ${y-h}C${x+w*.65+sway} ${y-h*.72} ${x+w*1.4} ${y-h*.32} ${x+w*.65} ${y-10}Q${x+w*.35} ${y+3} ${x} ${y}Z`);
 attr('fill',i>2?config.material.milk:v.palette[i]);opacity=.30+.06*Math.sin(t*.5+i);
 }else if(preset==='wind'){
 const y=90+i*38;attr('d',curve(t,i,y,12,.7)+Array.from({length:89},(_,j)=>{const x=380-j*5;return `L${x} ${y+9+Math.sin(x/320*TAU*.7+t*.27+i*1.8)*12+Math.sin(x/210+t*.17+i)*5}`;}).join('')+'Z');opacity=.17;
 }else if(preset==='ripples'){const q=(t*.055+i/3)%1;attr('rx',30+q*115);attr('ry',25+q*90);opacity=Math.sin(q*Math.PI)*.4;}
 else{attr('d',blob(t*.6,i));el.style.transform=`translate(${Math.sin(t*.16+i)*33}px,${Math.cos(t*.13+i)*24}px) scale(1.4,.75)`;opacity=.22;}
 el.style.opacity=opacity;
 });
 const q=Math.min(1,(now-touchAt)/config.motion.touchMs);ripple.style.opacity=(1-q)*.3;ripple.setAttribute('r',35+q*(reduced.matches?5:55));
 }
 function frame(now){if(disposed)return;if(now-last>=1000/(reduced.matches?4:v.fps)){draw(now);last=now;}raf=requestAnimationFrame(frame);}
 function visibility(){cancelAnimationFrame(raf);if(!disposed&&!document.hidden&&visible)raf=requestAnimationFrame(frame);}
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();});observer?.observe(svg);
 document.addEventListener('visibilitychange',visibility,{signal:abort.signal});draw(start);visibility();
 return ()=>{disposed=true;cancelAnimationFrame(raf);observer?.disconnect();abort.abort();};
}
