// All breathing presentation defaults are replaceable here. Paths are placeholder SVGs.
export const breathingAssets={
 motion:{prepareSeconds:3,preparationFadeMs:450,preparationPulseMs:1000,controlsMs:3000,revealMs:6000,settleMs:450,endingMs:1000,skipEndingMs:2000,smoothingMs:120, pauseSmoothingMs:400,ambientSeconds:24},
 visual:{preparationStartScale:.78,preparationEndScale:1.2,preparationOpacity:.35,orbScale:.34,capsuleWidth:.12,capsuleHeight:.32,secondInhaleShare:.62,bubbleScale:.30,bubbleBase:.72,bubbleRise:12,bubbleMergeX:65,bubbleMergeY:40,moonTravel:36,reducedRange:.12,rippleScale:.06,lightTravel:3},
 material:{countdownColor:'#A19EA0',countdownOpacity:.88,completionColor:'#A19EA0',pink:'#EDD8E7',milk:'#fffaf8',shade:'#c3adb9',opacity:.7},
 worlds:{
  cloud:{path:'M52 150C27 108 62 65 104 87C121 38 184 38 204 87C248 64 278 112 254 146C287 188 249 228 211 211C184 252 121 247 100 219C58 240 24 198 52 150Z',accent:'#A3BBC6',track:'#C8CDD4'},
  spiral:{ballRadius:10,strokeWidth:5,endpointGapRadii:.75,path:'M151 143C176 140 177 173 155 184C124 200 95 170 101 141C110 91 174 83 207 117C251 163 214 231 161 242C108 253 60 218 55 173C49 126 76 83 111 65',accent:'#95787A',track:'#C9B1B3'},
  sphere:{path:'M150 55C198 55 220 95 220 137C220 177 191 207 158 220Q150 228 142 220C109 207 80 177 80 137C80 95 102 55 150 55Z',accent:'#ACB3A6',detail:'#99A49B',knot:'M150 221L143 232Q150 229 157 232Z',string:'M150 231C131 243 170 251 148 271C141 278 149 283 151 288'},
  square:{accent:'#9D8EAB',path:'M90 50H210Q250 50 250 90V210Q250 250 210 250H90Q50 250 50 210V90Q50 50 90 50Z'},
  capsule:{path:'M150 43C205 43 219 82 219 150C219 218 205 257 150 257C95 257 81 218 81 150C81 82 95 43 150 43Z'},
  orb:{accent:'#D5D0D9',face:{color:'#AAA0B1',eyes:'M129 77Q133 74 138 75M162 75Q168 75 173 78',nose:{x:150,y:76,r:1.7},mouths:{Inhale:'M150 85C146 85 146 90 150 91C154 90 154 85 150 85Z',Hold:'M140 85L140 89M140 87L161 87M161 85L161 89',Exhale:'M141 85Q150 86 159 84C162 96 139 97 141 85Z'}},path:'M150 58C206 53 245 96 243 152C247 204 208 244 150 242C93 247 54 203 58 149C54 96 96 55 150 58Z'},
  bubbles:{path:'M150 66C199 66 234 104 234 150C234 197 199 234 150 234C103 234 66 197 66 150C66 103 103 66 150 66Z'},
  ribbon:{petals:14,scatterX:72,scatterY:30,stem:'M150 160Q154 201 164 253',petal:'M0 -15C-14 -26 -15 -57 0 -65C15 -57 14 -26 0 -15Z',accent:'#BD8F83',path:'M150 150C103 80 46 90 46 150C46 211 103 221 150 150C197 79 254 90 254 150C254 210 197 220 150 150Z'},
  moon:{accent:'#DCD8CD',path:'M91 86C66 155 117 215 205 189C166 242 78 211 72 148C69 119 78 98 91 86Z'}
 },
 audio:{enabled:false,backgroundTrack:null,inhaleSFX:null,holdSFX:null,secondInhaleSFX:null,exhaleSFX:null,transitionSFX:null,objectMotionSFX:null,volume:.025}
};
