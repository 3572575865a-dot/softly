import {moodConfig} from '../assets/mood.js';
import {assets} from '../assets/config.js';
export function visualSize(weight,min,max,lo,hi){return lo+(hi-lo)*Math.sqrt(Math.max(0,Math.min(1,max===min?.5:(weight-min)/(max-min))));}
export function jarLayout(pieces,period,width,scalePieces=pieces){
 const w=Math.max(220,width),height=w*.98;
 if(period==='Week'){const size=w*moodConfig.weekDiameterRatio,slots=[[.21,.72,-13],[.49,.75,8],[.77,.70,17],[.32,.48,11],[.66,.46,-14],[.32,.22,-8],[.66,.20,10]];return {height:w*.98,nodes:pieces.map((p,i)=>({...p,size,x:w*slots[i][0],y:w*slots[i][1],angle:slots[i][2]}))};}
 const weights=scalePieces.map(p=>p.weight),min=Math.min(...weights),max=Math.max(...weights);
 const lo=period==='Week'?Math.max(52,w*moodConfig.weekMinRatio):period==='Month'?Math.max(49,w*assets.gummyLayout.monthMin):Math.max(55,w*assets.gummyLayout.yearMin),hi=period==='Week'?w*moodConfig.weekMaxRatio:period==='Month'?w*assets.gummyLayout.monthMax:w*assets.gummyLayout.yearMax;
 const nodes=pieces.map((p,i)=>({...p,size:visualSize(p.weight,period==='Week'?0:min,period==='Week'?100:max,lo,hi),angle:((i*17)%19)-9}));
 const rows=[];let row=[],used=0;
 for(const n of nodes){const footprint=n.size*.9;if(row.length&&used+footprint>w*.86){rows.push(row);row=[];used=0;}row.push(n);used+=footprint;}if(row.length)rows.push(row);
 const heights=rows.map(r=>Math.max(...r.map(n=>n.size))*.83+3),h=Math.max(height,heights.reduce((a,b)=>a+b,0)+w*.22);
 let y=h-w*.13;for(let i=0;i<rows.length;i++){const r=rows[i],rw=r.reduce((n,p)=>n+p.size*.9,0);let x=(w-rw)/2;y-=heights[i]/2;for(const n of r){n.x=x+n.size*.45;n.y=y;x+=n.size*.9;}y-=heights[i]/2;}
 return {height:h,nodes};
}
