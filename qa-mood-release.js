import {moodView} from './src/features/mood-view.js';
import {releaseSpaceView} from './src/features/release-view.js';
import {createMemoryStore} from './src/features/home-memory.js';
import {decorateMascotHeader} from './src/components/mascot.js';
import {applyAssetTokens} from './src/assets/config.js';
applyAssetTokens();
const map=new Map(),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},memory=createMemoryStore(storage),root=document.querySelector('#app');let cleanup=()=>{};
function mount(html){cleanup();cleanup=()=>{};root.innerHTML='<div class="app-shell"><main>'+html+'</main></div>';window.scrollTo(0,0);}
function menu(){mount('<h1>Isolated interaction check</h1><p>Temporary test data only</p><button class="primary" id="qa-mood">Mood</button><button class="primary" id="qa-release">Let It Out</button>');root.querySelector('#qa-mood').onclick=()=>moodView({mount,setCleanup:fn=>{cleanup=fn;decorateMascotHeader(root,'mood');},storage});root.querySelector('#qa-release').onclick=()=>{cleanup=releaseSpaceView({root,mount,onHome:menu,memory,preferences:storage});};}menu();
