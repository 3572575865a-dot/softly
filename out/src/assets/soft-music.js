// Soft Music only. Four replaceable palettes, two diffusion treatments; no audio settings.
export const softMusicVisual={
 palette:'rosePeach',effect:'rings',
 variants:[
  {palette:'rosePeach',effect:'rings'},
  {palette:'lavenderBlue',effect:'bloom'},
  {palette:'butterSage',effect:'rings'},
  {palette:'mistRose',effect:'bloom'}
 ],
 palettes:{
  rosePeach:{core:'#EBC8A5',ring:'#D9A7B8',mist:'#D8C6DF',background:'#ECE1DF'},
  lavenderBlue:{core:'#E6BED2',ring:'#B1B4D8',mist:'#BED7E2',background:'#E7E3EC'},
  butterSage:{core:'#EDE0A7',ring:'#BBCD9D',mist:'#C6D8CC',background:'#E5E8DD'},
  mistRose:{core:'#D7B8D0',ring:'#B1D2CE',mist:'#E5C7CC',background:'#E3E9E6'}
 },
 effects:{rings:{inner:29,peak:48,outer:72,start:.38,end:1.65,opacity:.66},bloom:{inner:0,peak:28,outer:70,start:.30,end:1.75,opacity:.60}},
 layers:[{seconds:13.2,delay:-1.3,x:-2,y:1,blur:15,scale:1},{seconds:14.4,delay:-6.1,x:2,y:-2,blur:19,scale:1.04},{seconds:15.6,delay:-11.2,x:0,y:2,blur:23,scale:.97}],
 driftSeconds:76,driftOpacity:.45,diameter:'min(104vw,78svh,650px)'
};
