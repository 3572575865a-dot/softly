// All breathing presentation defaults are replaceable here. Paths are placeholder SVGs.
export const breathingAssets={
 motion:{prepareSeconds:3,controlsMs:3000,revealMs:6000,settleMs:450,endingMs:2000,smoothingMs:120, pauseSmoothingMs:400,ambientSeconds:24},
 visual:{orbScale:.34,capsuleWidth:.12,capsuleHeight:.32,secondInhaleShare:.78,bubbleScale:.30,bubbleBase:.72,bubbleRise:12,bubbleMergeX:65,bubbleMergeY:40,moonTravel:36,reducedRange:.12,rippleScale:.06,lightTravel:3},
 material:{pink:'#EDD8E7',milk:'#fffaf8',shade:'#c3adb9',opacity:.7},
 worlds:{
  square:{path:'M90 50H210Q250 50 250 90V210Q250 250 210 250H90Q50 250 50 210V90Q50 50 90 50Z'},
  capsule:{path:'M150 43C205 43 219 82 219 150C219 218 205 257 150 257C95 257 81 218 81 150C81 82 95 43 150 43Z'},
  orb:{path:'M150 58C206 53 245 96 243 152C247 204 208 244 150 242C93 247 54 203 58 149C54 96 96 55 150 58Z'},
  bubbles:{path:'M150 66C199 66 234 104 234 150C234 197 199 234 150 234C103 234 66 197 66 150C66 103 103 66 150 66Z'},
  ribbon:{path:'M150 150C103 80 46 90 46 150C46 211 103 221 150 150C197 79 254 90 254 150C254 210 197 220 150 150Z'},
  moon:{path:'M91 86C66 155 117 215 205 189C166 242 78 211 72 148C69 119 78 98 91 86Z'}
 },
 audio:{enabled:false,backgroundTrack:null,inhaleSFX:null,holdSFX:null,secondInhaleSFX:null,exhaleSFX:null,transitionSFX:null,objectMotionSFX:null,volume:.025}
};
