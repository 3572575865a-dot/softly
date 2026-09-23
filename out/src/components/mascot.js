import {tummyArtwork} from '../assets/tummy.js';
import {assets} from '../assets/config.js';
import {MASCOT_STATES,PAGE_MASCOT_STATE} from './mascot-state.js';
// One silhouette and one set of facial parts; states only adjust pose and motion.
export function mascot({state='floating',size='large',animated=true,expression='neutral',interactionMode='none'}={}){
 const pose=MASCOT_STATES.includes(state)?state:'idle',pixels=typeof size==='number'?Math.max(48,Math.min(200,size)):assets.mascot.sizes[size]||assets.mascot.sizes.large;
 const face=['neutral','happy','sleepy','concerned'].includes(expression)?expression:'neutral';
 const url=assets.mascot.urls[pose];
 const external=url?`<img class="mascot-image" src="${String(url).replaceAll('&','&amp;').replaceAll('\"','&quot;')}" alt="" draggable="false">`:null;
 return `<div class="little-friend" data-state="${pose}" data-pose="${['inhale','exhale'].includes(pose)?pose:'floating'}" data-animated="${Boolean(animated)}" data-expression="${face}" data-interaction="${interactionMode==='home'?'home':'none'}" style="--mascot-size:${pixels}px;--mascot-scale:${pixels/140}" aria-hidden="true"><div class="mascot-art">${external||tummyArtwork()}</div></div>`;
}
export function decorateMascotHeader(root,page){
 const state=PAGE_MASCOT_STATE[page];if(!state)return;
 const header=root.querySelector('.page-heading,.mood-heading,.mood-editor-top');if(!header)return;
 header.classList.add('has-header-mascot');const companion=document.createElement('div');companion.className='header-mascot';companion.setAttribute('aria-hidden','true');companion.innerHTML=mascot({state,size:'small',animated:true});header.append(companion);
}
