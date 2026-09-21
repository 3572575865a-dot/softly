import {readCustomRhythm,writeCustomRhythm,DEFAULT_RHYTHM} from './features/breathe-preferences.js';
import {releaseSpaceView} from './features/release-view.js';
import {assets,applyAssetTokens} from './assets/config.js';
applyAssetTokens();
import {homeMemory,migrateBrainDump,activityId} from './features/home-memory.js';
import {traceRing,attachHomeTrace} from './features/home-trace.js';
import {moodView} from './features/mood-view.js';
import {attachQuietMode} from './features/overstimulation.js';
import {createSoundFeature} from './features/sound-view.js';
import {icon} from './components/icons.js';
import {mascot,decorateMascotHeader} from './components/mascot.js';
import {createHomeVisitState} from './components/mascot-state.js';
let poseStorage;try{poseStorage=sessionStorage;}catch{}
const homeVisit=createHomeVisitState(poseStorage);
import {techniques,customTechnique} from './features/breathe.js';
import {breathingSessionView} from './features/breathe-view.js';
migrateBrainDump();
const app=document.querySelector('#app');let page='home',cleanup=()=>{},selected=techniques[0],minutes=3;let customRhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)}),customMinutes=10;
const button=(label,action,cls='')=>`<button class="${cls}" data-action="${action}" ${action==='back'?'aria-label="Back home"':''}>${label}</button>`;
function nav(){return `<nav class="glass nav" aria-label="Main navigation">${['home','breathe','sound','mood'].map(n=>`<button data-page="${n}" ${page===n?'aria-current="page"':''}>${icon(n)}<span>${n[0].toUpperCase()+n.slice(1)}</span></button>`).join('')}</nav>`;}
function mount(content,{navigation=true}={}){cleanup();document.documentElement.classList.toggle('home-fixed',content.includes('class="home-header"'));cleanup=()=>{};app.innerHTML=`<div class="app-shell"><main id="main">${content}</main>${navigation?nav():''}</div>`;if(!app.querySelector('.home-header'))homeVisit.leave();if(navigation)decorateMascotHeader(app,page);app.querySelectorAll('[data-page]').forEach(el=>el.onclick=()=>render(el.dataset.page));window.scrollTo(0,0);}
function heading(title,sub){return `<header class="page-heading"><p class="eyebrow">A LITTLE SPACE FOR YOU</p><h1>${title}</h1><p>${sub}</p></header>`;}
function render(next='home'){page=next;if(next==='home')home();if(next==='breathe')breathe();if(next==='sound')sound();if(next==='mood')mood();}
function home(){const homeState=homeVisit.enter();const now=new Date();const greeting=now.getHours()<12?'Good morning':now.getHours()<18?'Good afternoon':'Good evening';mount(`<header class="home-header"><div class="topline"><span class="wordmark">softly<span>✦</span></span><time>${now.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</time></div><p class="greeting">${greeting},</p><h1>It’s okay to<br>take a moment.</h1><p class="subtitle">A softer mind, a kinder you.</p></header><section class="situations" aria-label="How can we help?"><button class="glass scenario" data-action="anxious"><span class="bubble blue">${icon('breathe')}</span><span>I’m anxious</span></button><button class="glass scenario" data-action="sleep"><span class="bubble lavender">${icon('moon')}</span><span>I can’t sleep</span></button><button class="glass scenario" data-action="quiet"><span class="bubble rose">${icon('spark')}</span><span>Quiet my mind</span></button><button class="glass scenario" data-action="custom-home"><span class="bubble">＋</span><span>Custom</span></button></section><section class="companion"><div class="mascot-stage"><button class="mascot-touch" aria-label="Companion. Double tap or press Enter for Let It Out. Hold for 3 seconds or hold Space for a quiet moment.">${traceRing()}${mascot({state:homeState,size:'large',animated:true,interactionMode:'home'})}</button></div><p class="companion-label">Here with you.</p><p class="gesture-hint">Double tap to let it out · Hold to slow down</p></section>`);const disposeQuiet=attachQuietMode(app,brainDump),disposeTrace=attachHomeTrace(app,brainDump);cleanup=()=>{disposeTrace();disposeQuiet();};app.querySelector('[data-action="anxious"]').onclick=()=>{selected={...techniques[0],name:'Extended Exhale'};page='breathe';session(3);};app.querySelector('[data-action="sleep"]').onclick=()=>{page='sound';soundPlayer('noise');};app.querySelector('[data-action="quiet"]').onclick=()=>{page='sound';soundPlayer('frequency');};app.querySelector('[data-action="custom-home"]').onclick=()=>{page='breathe';selected=techniques.find(t=>t.id==='custom');customRhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)});breathingSettings();};}
function breathe(){
 mount(heading('Breathe','Follow your breath')+'<div class="stack technique-grid breathe-methods">'+[...techniques.slice(1,5),techniques[0],techniques[5],techniques[6]].map(t=>'<button class="glass choice" data-technique="'+t.id+'"><strong>'+t.name+'</strong><span class="method-context">'+t.contextLabel+'</span><span class="method-ratio">'+t.detail+'</span></button>').join('')+'</div>');
 app.querySelectorAll('[data-technique]').forEach(e=>e.onclick=()=>{selected=techniques.find(t=>t.id===e.dataset.technique);if(selected.id==='custom')customRhythm=readCustomRhythm({getItem:key=>localStorage.getItem(key)});breathingSettings();});
}
function breathingSettings(){
 mount('<section class="breathe-settings"><button class="glass breathe-back" data-breath-back>Back to methods</button>'+heading(selected.name,selected.shortDescription)+
 (selected.id==='custom'?'<fieldset class="custom-rhythm"><legend>Your rhythm · seconds</legend>'+['Inhale','Hold after inhale (optional)','Exhale','Hold after exhale (optional)'].map((label,i)=>'<label>'+label+'<input data-rhythm="'+i+'" type="number" min="'+(i%2?0:1)+'" max="30" step="1" required value="'+(Number.isFinite(customRhythm[i])?customRhythm[i]:'')+'"></label>').join('')+'<button type="button" class="quiet-button custom-reset" id="custom-reset">Reset</button></fieldset>':'')+
 '<p class="field-label">How long would you like?</p><div class="duration" aria-label="Session duration">'+[1,3,5,0,'custom'].map(n=>'<button data-duration="'+n+'" class="glass '+(minutes===n?'selected':'')+'" aria-pressed="'+(minutes===n)+'">'+(n==='custom'?'Custom':n===0?'No time limit':n+' min')+'</button>').join('')+'</div>'+(minutes==='custom'?'<label class="field-label">Minutes<input id="custom-min" type="number" min="1" max="120" step="1" required value="'+(Number.isFinite(customMinutes)?customMinutes:'')+'"></label>':'')+'<p class="soft-note">Keep it comfortable. You can stop whenever you like.</p><p id="breath-error" role="alert"></p>'+button('Begin','begin','primary')+'</section>');
 app.querySelector('[data-breath-back]').onclick=breathe;
 app.querySelectorAll('[data-duration]').forEach(e=>e.onclick=()=>{minutes=e.dataset.duration==='custom'?'custom':Number(e.dataset.duration);breathingSettings();});
 app.querySelectorAll('[data-rhythm]').forEach(e=>e.oninput=()=>{customRhythm[Number(e.dataset.rhythm)]=e.value===''?NaN:Number(e.value);try{writeCustomRhythm(localStorage,customRhythm);}catch{}});
 app.querySelector('#custom-reset')?.addEventListener('click',()=>{customRhythm=[...DEFAULT_RHYTHM];try{writeCustomRhythm(localStorage,customRhythm);}catch{}breathingSettings();});
 const input=app.querySelector('#custom-min');if(input)input.oninput=()=>customMinutes=input.value===''?NaN:Number(input.value);
 app.querySelector('[data-action="begin"]').onclick=()=>{if([...app.querySelectorAll('input')].some(e=>!e.reportValidity()))return;try{if(selected.id==='custom')selected=customTechnique(customRhythm);session(minutes==='custom'?customMinutes:minutes);}catch(error){app.querySelector('#breath-error').textContent=error.message;}};
}
function session(duration){const eventId=activityId();cleanup=breathingSessionView({root:app,mount,method:selected,minutes:duration,onComplete:()=>homeMemory.record('breathe',eventId),onReturn:()=>render('breathe')});}
function brainDump(){cleanup=releaseSpaceView({root:app,mount,onHome:()=>render('home')});}
const soundFeature=createSoundFeature({root:app,mount,setCleanup:fn=>cleanup=fn,heading,onStarted:()=>homeMemory.record('sound',activityId())});
function sound(){soundFeature.browse();}
function soundPlayer(id){soundFeature.playById(id);}
function mood(){moodView({mount,setCleanup:fn=>cleanup=fn});}
render();
