import {techniques} from './breathe.js';
import {builtInTracks,musicStore} from './sound-data.js';
import {assets} from '../assets/config.js';
import {icon} from '../components/icons.js';

const KEY='softly-custom-shortcut-v1';
const ICONS={waves:'M2 7c4-5 7 5 12 0s7 0 8 0M2 12c4-5 7 5 12 0s7 0 8 0M2 17c4-5 7 5 12 0s7 0 8 0',moon:'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z',star:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',circle:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',heart:'M20 5c-3-3-7-1-8 2-1-3-5-5-8-2-5 5 4 12 8 15 4-3 13-10 8-15Z',cloud:'M7 18h12a4 4 0 0 0 .2-8A7 7 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z',leaf:'M20 4C10 4 4 9 4 16a4 4 0 0 0 4 4c7 0 12-6 12-16ZM5 19c2-4 6-7 11-9',flower:'M12 8c-3-8-8-5-5 0-6-3-8 3-2 5-5 4-1 9 4 5 2 6 8 5 7-1 6 3 8-3 2-6 4-4 0-9-5-4Z',sparkle:'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z',sun:'M12 4v-2M12 22v-2M4 12H2m20 0h-2M5.9 5.9 4.5 4.5m15 15-1.4-1.4M18.1 5.9l1.4-1.4M4.5 19.5l1.4-1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',mountain:'M2 20 10 5l5 9 2-4 5 10Z',clover:'M12 12C4 7 3 2 8 3c3 0 4 3 4 6 0-6 5-8 8-5 3 4-2 8-8 8 7 0 9 5 5 8-4 2-6-2-5-8 0 7-5 9-8 5-2-4 2-6 8-5Z'};
const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const ICON_STYLES={
  waves:{iconColor:'#748EA9',iconBackgroundColor:'rgba(116,142,169,.12)'},
  moon:{iconColor:'#9484A4',iconBackgroundColor:'rgba(148,132,164,.12)'},
  star:{iconColor:'#AA819C',iconBackgroundColor:'rgba(170,129,156,.12)'},
  circle:{iconColor:'#8195A4',iconBackgroundColor:'rgba(129,149,164,.12)'},
  heart:{iconColor:'#B08193',iconBackgroundColor:'rgba(176,129,147,.12)'},
  cloud:{iconColor:'#909ABB',iconBackgroundColor:'rgba(144,154,187,.12)'},
  leaf:{iconColor:'#829B89',iconBackgroundColor:'rgba(130,155,137,.12)'},
  flower:{iconColor:'#BA8C9D',iconBackgroundColor:'rgba(186,140,157,.12)'},
  sparkle:{iconColor:'#A886A0',iconBackgroundColor:'rgba(168,134,160,.12)'},
  sun:{iconColor:'#B79A69',iconBackgroundColor:'rgba(183,154,105,.12)'},
  mountain:{iconColor:'#778FA7',iconBackgroundColor:'rgba(119,143,167,.12)'},
  clover:{iconColor:'#86A18B',iconBackgroundColor:'rgba(134,161,139,.12)'}
};

export function shortcutIconStyle(id){return ICON_STYLES[id]||ICON_STYLES.star;}
export function shortcutIcon(id){return `<svg viewBox="0 0 24 24" fill="none" stroke="${shortcutIconStyle(id).iconColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[id]||ICONS.star}"/></svg>`;}
export function readCustomShortcut(storage=localStorage){try{const value=JSON.parse(storage.getItem(KEY));return value&&['breathe','sound'].includes(value.type)&&typeof value.itemId==='string'&&ICONS[value.iconId]?value:null;}catch{return null;}}
export function writeCustomShortcut(storage,shortcut){storage.setItem(KEY,JSON.stringify({type:shortcut.type,itemId:shortcut.itemId,iconId:shortcut.iconId,label:shortcut.label}));}

export function customShortcutView({root,mount,onBack,onSave,initial=readCustomShortcut()}){
  let active=true,type=initial?.type||'breathe',itemId=initial?.itemId||'',iconId=initial?.iconId||'waves',tracks=null;
  mount(`<section class="custom-shortcut"><button class="icon-button custom-shortcut-back" type="button" aria-label="Back to Home">${icon('back')}</button><header class="custom-shortcut-heading"><h1>Custom Shortcut</h1><p>Keep something you reach for close.</p></header><div class="custom-shortcut-types" role="group" aria-label="Shortcut type"><button type="button" data-shortcut-type="breathe">Breathe</button><button type="button" data-shortcut-type="sound">Sound</button></div><p class="custom-shortcut-label">Choose one experience</p><div class="custom-shortcut-items" role="group" aria-label="Experiences"></div><p class="custom-shortcut-label">Choose an icon</p><div class="custom-shortcut-icons" role="group" aria-label="Shortcut icon">${Object.keys(ICONS).map(id=>`<button type="button" data-shortcut-icon="${id}" aria-label="${id}"><span class="custom-shortcut-icon-preview" style="background:${shortcutIconStyle(id).iconBackgroundColor}">${shortcutIcon(id)}</span><span>${id[0].toUpperCase()+id.slice(1)}</span></button>`).join('')}</div><button class="primary custom-shortcut-save" type="button">Save Shortcut</button><p class="custom-shortcut-error" role="alert"></p></section>`,{navigation:false});
  const items=root.querySelector('.custom-shortcut-items'),save=root.querySelector('.custom-shortcut-save'),error=root.querySelector('.custom-shortcut-error');
  root.querySelector('.custom-shortcut-back').onclick=onBack;
  function available(){return type==='breathe'?techniques.map(t=>({id:t.id,label:t.name,detail:t.contextLabel,category:'breathe'})):tracks||[];}
  function renderItems(){
    root.querySelectorAll('[data-shortcut-type]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.shortcutType===type)));
    root.querySelectorAll('[data-shortcut-icon]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.shortcutIcon===iconId)));
    if(type==='sound'&&!tracks){items.innerHTML='<p class="soft-note">Opening your sounds…</p>';save.disabled=true;loadSounds();return;}
    const list=available();items.innerHTML=list.length?list.map(track=>`<button class="glass custom-shortcut-item" type="button" data-shortcut-item="${escape(track.id)}" aria-pressed="${track.id===itemId}"><span><strong>${escape(track.label)}</strong><small>${escape(track.detail||'')}</small></span><span class="custom-shortcut-radio" aria-hidden="true"></span></button>`).join(''):'<p class="soft-note">No sounds available here yet.</p>';
    items.querySelectorAll('[data-shortcut-item]').forEach(button=>button.onclick=()=>{itemId=button.dataset.shortcutItem;renderItems();});
    save.disabled=!list.some(track=>track.id===itemId);
  }
  async function loadSounds(){
    const builtIn=builtInTracks().filter(track=>{const source=assets.audio[track.id];return source?.kind!=='file'||!!source.url;});
    let personal=[];try{personal=(await musicStore.list()).filter(track=>track.audioBlob&&!track.unavailable);}catch{if(active)error.textContent='Your saved music could not be opened.';}
    if(!active)return;
    tracks=[...builtIn,...personal].map(track=>({id:track.id,label:track.displayName,detail:track.sourceType==='userImported'?'My Music':assets.soundCategories.find(category=>category.id===track.category)?.name||'Sound',category:track.category}));
    renderItems();
  }
  root.querySelectorAll('[data-shortcut-type]').forEach(button=>button.onclick=()=>{if(type===button.dataset.shortcutType)return;type=button.dataset.shortcutType;itemId='';renderItems();});
  root.querySelectorAll('[data-shortcut-icon]').forEach(button=>button.onclick=()=>{iconId=button.dataset.shortcutIcon;root.querySelectorAll('[data-shortcut-icon]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));});
  save.onclick=()=>{const selected=available().find(track=>track.id===itemId);if(!selected)return;try{const shortcut={type,itemId,iconId,label:selected.label};writeCustomShortcut(localStorage,shortcut);onSave(shortcut);}catch{error.textContent='This shortcut could not be saved. Please try again.';}};
  renderItems();
  return ()=>{active=false;};
}
