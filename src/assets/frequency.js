// Frequency-only visual assets. No audio timing or spectrum coupling.
export const frequencyVisual={
 variants:['ring','bloom','waves','drift'],
 particleCount:3000,fps:30,maxDpr:1.5,
 palette:['#B08FA9','#A3A3C4','#BC9DAF'],
 palettes:{
  ring:['#B68EA9','#C6A0B8','#A995B9'],
  bloom:['#8EAAC1','#A0BDCC','#A4ABC7'],
  waves:['#C49B90','#D0ABA0','#C6A3AE'],
  drift:['#A297BF','#B5A8CB','#AAA5C4']
 },
 sizeMin:.65,sizeMax:1.7,opacityMin:.35,opacityMax:.85,
 ringRadius:.27,ringThickness:.024,fieldRadius:.37,
 coreShare:.86,coreRadius:.74,haloInner:.82,haloWidth:.30,haloRingOffset:.035,haloRingWidth:.095,coreDrift:.4,haloOpacity:.55,
 breathSeconds:18,orbitSpeed:.032,driftSpeed:.24,waveSeconds:14,waveBands:2.6,
 driftAmount:.014,spriteSize:32
};
