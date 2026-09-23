import {tummyAssets} from '../assets/tummy.js';
// One Home gesture at a time; Quiet Mode interrupts it and owns the same three-state rig.
export function attachTummyInteractions(root){
 const shell=root.querySelector('.app-shell'),rig=root.querySelector('.mascot-touch .little-friend');
 let timers=[],index=0,active=false,disposed=false,lastMode=shell.dataset.quiet;
 const after=(fn,ms)=>timers.push(setTimeout(()=>{if(!disposed)fn();},ms));
 function reset(){timers.forEach(clearTimeout);timers=[];active=false;rig.dataset.pose='floating';delete rig.dataset.action;}
 function breath(loop=false){active=true;rig.dataset.pose='inhale';after(()=>{rig.dataset.pose='exhale';after(()=>{if(loop&&shell.dataset.quiet==='overstimulation')breath(true);else reset();},tummyAssets.motion.exhaleMs);},tummyAssets.motion.inhaleMs);}
 function tap(){if(active||shell.dataset.quiet!=='home')return;const action=tummyAssets.actions[index++%tummyAssets.actions.length];if(action==='breath')breath();else{active=true;rig.dataset.action=action;after(reset,tummyAssets.motion.gestureMs);}}
 const observer=new MutationObserver(()=>{const mode=shell.dataset.quiet;if(mode===lastMode)return;lastMode=mode;if(mode==='overstimulation'){reset();breath(true);}else if(mode==='returningHome'||mode==='longPressPreparing')reset();});
 observer.observe(shell,{attributes:true,attributeFilter:['data-quiet']});
 return {tap,dispose(){disposed=true;observer.disconnect();reset();}};
}
