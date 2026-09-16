import {moodConfig} from '../assets/mood.js';
import {assets} from '../assets/config.js';
import {emotions,mix,dominant} from '../features/mood-data.js';
let serial=0;

export function gummy(items=[],label){
 const material=assets.gummy.material,shape=assets.gummy.shape||moodConfig.shape;
 const id='gummy-'+(++serial),parts=mix(items).filter(e=>e.proportion>0),face=dominant(items),color=t=>emotions.find(e=>e.emotionType===t)?.color||'#ffffff';let offset=0;
 label=label|| (face?items.map(e=>e.emotionType).join(', '):'Transparent daily gummy');
 const stops=parts.map(p=>{const start=offset;offset+=p.proportion*100;const feather=Math.min(material.feather,p.proportion*25);return `<stop offset="${start+feather}%" stop-color="${color(p.emotionType)}"/><stop offset="${offset-feather}%" stop-color="${color(p.emotionType)}"/>`;}).join('');
 return `<svg class="gummy-svg ${face?'':'transparent-gummy'}" viewBox="0 0 100 90" role="img" aria-label="${label}"><defs><linearGradient id="${id}" x1="0" y1="0" x2=".9" y2="1">${stops||`<stop stop-color="white" stop-opacity="${material.emptyOpacity}"/>`}</linearGradient><radialGradient id="${id}-light" cx=".3" cy=".15" r=".85"><stop stop-color="white" stop-opacity="${material.highlightOpacity}"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs><path class="gummy-fill" d="${shape}" fill="url(#${id})" fill-opacity="${parts.length?moodConfig.presenceMin+(moodConfig.presenceMax-moodConfig.presenceMin)*Math.min(100,Math.max(...items.map(e=>e.weight)))/100:material.bodyOpacity}" stroke="white" stroke-opacity="${material.outlineOpacity}"/><path d="${shape}" fill="url(#${id}-light)"/></svg>`;
}
