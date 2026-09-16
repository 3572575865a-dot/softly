export const MASCOT_STATES=['idle','meditating','breathing','sleeping','listening','calm','dreamy','curious'];
export const HOME_STATE_POOL=['meditating','breathing','sleeping','listening'];
export const PAGE_MASCOT_STATE={breathe:'breathing',sound:'listening',mood:'curious'};
const LAST_STATE_KEY='softly-last-home-pose';
export function selectHomeState(previous,random=Math.random){const pool=HOME_STATE_POOL.filter(s=>s!==previous);const n=random();return pool[Math.max(0,Math.min(pool.length-1,Math.floor((Number.isFinite(n)?n:0)*pool.length)))];}
export function createHomeVisitState(storage,random=Math.random){
 let previous;try{previous=storage?.getItem(LAST_STATE_KEY);}catch{}
 let state=null,active=false;
 return {enter(){if(!active){state=selectHomeState(previous,random);previous=state;active=true;try{storage?.setItem(LAST_STATE_KEY,state);}catch{}}return state;},leave(){active=false;},current(){return state;}};
}
