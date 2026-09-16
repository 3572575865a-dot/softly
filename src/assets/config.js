// Placeholder asset manifest. Replace URLs/renderers here during visual polish.
export const assets={
 mascot:{urls:{},sizes:{small:56,large:140}},
 gummy:{shape:null,faces:null,material:{bodyOpacity:.78,outlineOpacity:.48,highlightOpacity:.38,emptyOpacity:.12,faceOpacity:.8,feather:10,faceColor:'#53505d',lightFaceColor:'#f9f0ef'}},
 audio:{
  noise:{label:'Brown Noise',description:'A soft, deep hush',category:'noise',kind:'noise',url:null,volume:.025,loop:true},
  rain:{label:'Rain',description:'A light wash of sound',category:'noise',kind:'rain',url:null,volume:.025,loop:true},
  ocean:{label:'Ocean',description:'A slow, rolling rhythm',category:'noise',kind:'ocean',url:null,volume:.025,loop:true},
  soft:{label:'Soft music',description:'A gentle tonal soundscape',category:'music',kind:'tones',frequencies:[174,261,348],url:null,volume:.025,loop:true},
  frequency:{label:'174 Hz',description:'A steady, gentle tone',category:'hz',kind:'tones',frequencies:[174],url:null,volume:.025,loop:true},
  gummyDrop:{kind:'drop',url:null,volume:.018,loop:false,frequencies:[420,180],duration:.2}
 },
 soundCategories:[{id:'hz',name:'Frequency'},{id:'noise',name:'White Noise'},{id:'asmr',name:'ASMR'},{id:'music',name:'Soft Music'}],
 breatheMusic:{slow:'none',box:'none','478':'none',coherent:'none',sigh:'none',sleep:'none'},
 motion:{ringMs:1900,brainDumpReturnMs:360,bubbleFadeMs:900,dropLandingMs:1150,quietReturnMs:1200,quietMessageMs:6000,controlsHideMs:5000,viewSwitchMs:260,gummySelectMs:240,jarFormMs:850,remakeMs:900,shakeMs:2400},
 physics:{spring:24,gravity:24,horizontalDamping:7,verticalDamping:8,restitution:1.12,collisionRadius:.395,shakeX:65,shakeY:50},
 gummyLayout:{weekDiameter:.365,monthMin:.17,monthMax:.29,yearMin:.20,yearMax:.35},
 synth:{noiseSeconds:5,brownStep:.02,brownDecay:1.02,brownGain:3,rainGain:.25,oceanHz:.1,oceanDepth:.015},
};
export function applyAssetTokens(){const root=document.documentElement;for(const [key,value] of Object.entries(assets.motion))root.style.setProperty('--'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),value+'ms');}
export function soundCatalog(){return assets.soundCategories.map(c=>({...c,tracks:Object.entries(assets.audio).filter(([,a])=>a.category===c.id).map(([id,a])=>[id,a.label,a.description])}));}
