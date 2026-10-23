import {readBreathDefault,writeBreathDefault} from './features/shortcut-preferences.js';
import {readCustomRhythm,writeCustomRhythm,DEFAULT_RHYTHM} from './features/breathe-preferences.js';
import {releaseSpaceView} from './features/release-view.js';
import {tapItOutView} from './features/tap-it-out.js';
import {customShortcutView,readCustomShortcut,shortcutIcon,shortcutIconStyle} from './features/custom-shortcut.js';
import {assets,applyAssetTokens} from './assets/config.js';
applyAssetTokens();
import {homeMemory,migrateBrainDump,activityId} from './features/home-memory.js';
import {traceRing,attachHomeTrace} from './features/home-trace.js';
import {moodView} from './features/mood-view.js';
import {attachQuietMode} from './features/overstimulation.js';
import {icon} from './components/icons.js';
import {attachTummyInteractions} from './components/tummy-interactions.js';
import {mascot,decorateMascotHeader} from './components/mascot.js';
import {createHomeVisitState} from './components/mascot-state.js';
let poseStorage;try{poseStorage=sessionStorage;}catch{}
const homeVisit=createHomeVisitState(poseStorage);
import {techniques,customTechnique} from './features/breathe.js';
import {breathingSessionView} from './features/breathe-view.js';
import {getLanguage,toggleLanguage,applyLocale,installLocalization,formatDate} from './features/i18n.js';
migrateBrainDump();
installLocalization();
const app=document.querySelector('#app');let page='home',cleanup=()=>{},selected=techniques[0],minutes=3;let customRhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)}),customMinutes=10,homeBreathShortcut=false,shortcutSlot=1;
const button=(label,action,cls='')=>`<button class="${cls}" data-action="${action}" ${action==='back'?'aria-label="Back home"':''}>${label}</button>`;
function nav(){return `<nav class="glass nav" aria-label="Main navigation">${['home','breathe','mood'].map(n=>`<button data-page="${n}" ${page===n?'aria-current="page"':''}>${icon(n)}<span>${n[0].toUpperCase()+n.slice(1)}</span></button>`).join('')}</nav>`;}
function mount(content,{navigation=true}={}){cleanup();document.documentElement.classList.toggle('home-responsive',content.includes('class="home-header"'));cleanup=()=>{};app.innerHTML=`<div class="app-shell"><main id="main">${content}</main>${navigation?nav():''}</div>`;const homeHeader=app.querySelector('.home-header');if(homeHeader){const top=homeHeader.querySelector('.topline');const languageButton=document.createElement('button');languageButton.className='language-toggle';languageButton.type='button';top.append(languageButton);const updateLanguageButton=()=>{languageButton.textContent=getLanguage()==='zh-CN'?'中文':'EN';languageButton.setAttribute('aria-label',getLanguage()==='zh-CN'?'切换至英文':'Switch to Simplified Chinese');top.querySelector('time').textContent=formatDate(new Date());};languageButton.onclick=()=>{toggleLanguage();updateLanguageButton();};updateLanguageButton();}applyLocale(app);if(!homeHeader)homeVisit.leave();if(navigation)decorateMascotHeader(app,page);app.querySelectorAll('[data-page]').forEach(el=>el.onclick=()=>render(el.dataset.page));window.scrollTo(0,0);}
function heading(title,sub){return `<header class="page-heading"><p class="eyebrow">A LITTLE SPACE FOR YOU</p><h1>${title}</h1><p>${sub}</p></header>`;}
function render(next='home'){page=next;if(next==='breathe')homeBreathShortcut=false;if(next==='home')home();if(next==='breathe')breathe();if(next==='mood')mood();if(next==='tap')tapItOut();if(next==='custom-shortcut')customShortcut();}
function tapItOut(){cleanup=tapItOutView({root:app,mount,onBack:()=>render('home')});}
function customShortcut(){cleanup=customShortcutView({root:app,mount,slot:shortcutSlot,onBack:()=>render('home'),onSave:()=>render('home')});}
function openCustomShortcut(slot){shortcutSlot=slot;render('custom-shortcut');}
function launchHomeShortcut(shortcut,slot){if(shortcut.type==='breathe'){selected=techniques.find(t=>t.id===shortcut.itemId);if(!selected){openCustomShortcut(slot);return;}if(selected.id==='custom'){const rhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)});selected=customTechnique(rhythm);}page='breathe';session(3,()=>render('home'));return;}openCustomShortcut(slot);}
function bindHomeShortcut(card,shortcut,slot){let pressTimer=null,suppressClick=false,editing=false,pointerType='mouse';const cancel=()=>{clearTimeout(pressTimer);pressTimer=null;};const openEdit=()=>{if(editing)return;editing=true;suppressClick=true;cancel();if(pointerType==='touch'||pointerType==='pen')try{navigator.vibrate?.(8);}catch{}openCustomShortcut(slot);};card.addEventListener('pointerdown',e=>{if(!shortcut||e.button!==0)return;pointerType=e.pointerType;suppressClick=false;editing=false;cancel();pressTimer=setTimeout(openEdit,600);});card.addEventListener('pointerup',cancel);card.addEventListener('pointercancel',cancel);card.addEventListener('pointerleave',cancel);card.addEventListener('contextmenu',e=>{if(!shortcut)return;e.preventDefault();pointerType=e.pointerType||pointerType;openEdit();});card.addEventListener('keydown',e=>{if(shortcut&&e.shiftKey&&e.key==='Enter'){e.preventDefault();pointerType='keyboard';openEdit();}});card.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;return;}shortcut?launchHomeShortcut(shortcut,slot):openCustomShortcut(slot);});}
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function homeShortcutCard(slot,shortcut){const label=escapeHtml(shortcut?.label||'Custom');return `<button class="glass scenario" data-shortcut-slot="${slot}" aria-label="${shortcut?'Open '+label+'. Hold to change shortcut.':'Set custom shortcut '+slot}"><span class="bubble" style="${shortcut?'background:'+shortcutIconStyle(shortcut.iconId).iconBackgroundColor:''}">${shortcut?shortcutIcon(shortcut.iconId):'＋'}</span><span>${label}</span></button>`;}
const HOME_GESTURE_HINT_KEY='softly-home-gesture-hint-seen-v1';
function home(){
 const homeState=homeVisit.enter(),now=new Date(),greeting=now.getHours()<12?'Good morning':now.getHours()<18?'Good afternoon':'Good evening';
 const shortcuts=[readCustomShortcut(localStorage,1),readCustomShortcut(localStorage,2)];
 let showGestureHint=true;try{showGestureHint=localStorage.getItem(HOME_GESTURE_HINT_KEY)!=='1';}catch{}
 mount(`<header class="home-header"><div class="topline"><span class="wordmark"><span class="home-greeting">${greeting},</span><span class="wordmark-symbol">✦</span></span><time>${now.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</time></div><h1>TummyTummy</h1></header><section class="situations" aria-label="How can we help?"><button class="glass scenario" data-action="anxious"><span class="bubble blue">${icon('breathe')}</span><span>I’m anxious</span></button><button class="glass scenario" data-action="tap"><span class="bubble lavender">${icon('spark')}</span><span>Tap It Out</span></button>${shortcuts.map((shortcut,index)=>homeShortcutCard(index+1,shortcut)).join('')}</section><section class="companion"><div class="mascot-stage"><button class="mascot-touch" aria-label="Companion. Double tap or press Enter for Let It Out. Hold for 3 seconds or hold Space for a quiet moment.">${traceRing()}${mascot({state:homeState,size:'large',animated:true,interactionMode:'home'})}</button></div><p class="companion-label">Here with you.</p>${showGestureHint?'<button class="gesture-hint" type="button" aria-label="Dismiss gesture tip">Double tap to let it out · Hold to slow down</button>':''}</section>`);
 const tummy=attachTummyInteractions(app),disposeQuiet=attachQuietMode(app,brainDump,tummy.tap),disposeTrace=attachHomeTrace(app,brainDump);
 cleanup=()=>{tummy.dispose();disposeTrace();disposeQuiet();};
 const dismissGestureHint=()=>{const hint=app.querySelector('.gesture-hint');if(!hint)return;hint.remove();try{localStorage.setItem(HOME_GESTURE_HINT_KEY,'1');}catch{}};
 app.querySelector('.gesture-hint')?.addEventListener('click',dismissGestureHint);
 app.querySelector('.mascot-touch').addEventListener('pointerdown',dismissGestureHint);
 app.querySelector('.mascot-touch').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')dismissGestureHint();});
 app.querySelector('[data-action="anxious"]').onclick=()=>{const saved=readBreathDefault(localStorage);selected=saved?.method||{...techniques[0],name:'Extended Exhale'};page='breathe';session(saved?.minutes??3,()=>render('home'));};
 app.querySelector('[data-action="tap"]').onclick=()=>render('tap');
 shortcuts.forEach((shortcut,index)=>bindHomeShortcut(app.querySelector(`[data-shortcut-slot="${index+1}"]`),shortcut,index+1));
}
const breatheCardNames={slow:'Slow Breathing',box:'Box Breathing','478':'478 Breathing',coherent:'Coherent Breathing',sigh:'Physiological Sigh',sleep:'Sleep Breathing',custom:'Custom Breathing'};
function breathe(){
 mount('<header class="page-heading breathe-list-heading"><h1>Breathe</h1></header><div class="stack technique-grid breathe-methods">'+[...techniques.slice(1,5),techniques[0],techniques[5],techniques[6]].map(t=>'<button class="glass choice" data-technique="'+t.id+'"><strong>'+breatheCardNames[t.id]+'</strong>'+(t.id==='custom'?'':'<span class="method-context">'+t.contextLabel+'</span>')+'<span class="method-ratio">'+t.detail+'</span></button>').join('')+'</div>');
 app.querySelectorAll('[data-technique]').forEach(e=>e.onclick=()=>{selected=techniques.find(t=>t.id===e.dataset.technique);if(selected.id==='custom')customRhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)});breathingSettings();});
}
function breathingSettings(){
 const isCustom=selected.id==='custom',settingsHeading=isCustom?'<header class="page-heading breathe-settings-heading"><h1>'+selected.name+'</h1></header>':heading(selected.name,selected.shortDescription);
 mount('<section class="breathe-settings '+(isCustom?'custom-breathe-settings':'')+'"><button class="icon-button breathe-back" data-breath-back aria-label="Back to methods">'+icon('back')+'</button>'+settingsHeading+
 (selected.id==='custom'?'<fieldset class="custom-rhythm"><legend>Your rhythm · seconds</legend>'+['Inhale','Hold after inhale (optional)','Exhale','Hold after exhale (optional)'].map((label,i)=>'<label>'+label+'<input data-rhythm="'+i+'" type="number" min="'+(i%2?0:1)+'" max="30" step="1" required value="'+(Number.isFinite(customRhythm[i])?customRhythm[i]:'')+'"></label>').join('')+'<button type="button" class="quiet-button custom-reset" id="custom-reset">Reset</button></fieldset>':'')+
 '<p class="field-label">How long would you like?</p><div class="duration" aria-label="Session duration">'+[1,3,5,0,'custom'].map(n=>'<button data-duration="'+n+'" class="glass '+(minutes===n?'selected':'')+'" aria-pressed="'+(minutes===n)+'">'+(n==='custom'?'Custom':n===0?'No time limit':n+' min')+'</button>').join('')+'</div>'+(minutes==='custom'?'<label class="field-label">Minutes<input id="custom-min" type="number" min="1" max="120" step="1" required value="'+(Number.isFinite(customMinutes)?customMinutes:'')+'"></label>':'')+'<p id="breath-error" role="alert"></p><div class="breathe-settings-actions">'+button('Begin','begin','primary')+button('Set as Default','save-breath-default','glass')+'</div><p data-breath-saved role="status" class="soft-note"></p></section>');
 app.querySelector('[data-breath-back]').onclick=()=>homeBreathShortcut?render('home'):breathe();
 app.querySelectorAll('[data-duration]').forEach(e=>e.onclick=()=>{minutes=e.dataset.duration==='custom'?'custom':Number(e.dataset.duration);breathingSettings();});
 app.querySelectorAll('[data-rhythm]').forEach(e=>e.oninput=()=>{customRhythm[Number(e.dataset.rhythm)]=e.value===''?NaN:Number(e.value);try{writeCustomRhythm(localStorage,customRhythm);}catch{}});
 app.querySelector('#custom-reset')?.addEventListener('click',()=>{customRhythm=[...DEFAULT_RHYTHM];try{writeCustomRhythm(localStorage,customRhythm);}catch{}breathingSettings();});
 const input=app.querySelector('#custom-min');if(input)input.oninput=()=>customMinutes=input.value===''?NaN:Number(input.value);
 app.querySelector('[data-action="save-breath-default"]').onclick=()=>{if([...app.querySelectorAll('input')].some(e=>!e.reportValidity()))return;try{writeBreathDefault(localStorage,{id:selected.id,minutes:minutes==='custom'?customMinutes:minutes,rhythm:customRhythm});app.querySelector('[data-breath-saved]').textContent='Home will start with this breathing exercise.';}catch(error){app.querySelector('#breath-error').textContent=error.message;}};
 app.querySelector('[data-action="begin"]').onclick=()=>{if([...app.querySelectorAll('input')].some(e=>!e.reportValidity()))return;try{if(selected.id==='custom')selected=customTechnique(customRhythm);session(minutes==='custom'?customMinutes:minutes,()=>render(homeBreathShortcut?'home':'breathe'));}catch(error){app.querySelector('#breath-error').textContent=error.message;}};
}
function session(duration,onReturn=()=>render('breathe')){const eventId=activityId();cleanup=breathingSessionView({root:app,mount,method:selected,minutes:duration,onComplete:()=>homeMemory.record('breathe',eventId),onReturn});}
function brainDump(){cleanup=releaseSpaceView({root:app,mount,onHome:()=>render('home')});}
function mood(){moodView({mount,setCleanup:fn=>cleanup=fn});}
render();
