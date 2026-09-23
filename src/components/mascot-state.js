export const MASCOT_STATES=['floating','inhale','exhale','idle','meditating','breathing','sleeping','listening','calm','dreamy','curious'];
export const HOME_STATE_POOL=['floating'];
export const PAGE_MASCOT_STATE={breathe:'exhale',sound:'listening',mood:'floating'};
export const selectHomeState=()=> 'floating';
export function createHomeVisitState(){let active=false;return {enter(){active=true;return 'floating';},leave(){active=false;},current(){return active?'floating':null;}};}
