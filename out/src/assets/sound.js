// Sound-only presentation configuration. Audio remains in the shared asset manifest.
export const soundConfig={
 importVolume:.35,fadeMs:900,controlsMs:3000,transitionMs:650,settleSeconds:30,importTimeoutMs:15000,maxImportBytes:150*1024*1024,
 material:{pink:'#EDD8DF',milk:'#fffaf8',brown:'#D8C5CB',mist:'#E6D6DC'},
 motion:{periodSeconds:24,travel:13,reducedTravel:1,touchMs:1700},
 visual:{fps:30,palette:['#CBA1AF','#E4BFCA','#F2DCE3','#FFFAFC'],liquidPalette:['#E8D5DC','#FFFAF8','#EDD8DF'],layers:3,waveAmplitude:19,blobRadius:105,blobMorph:10,dotColumns:19,dotRows:17,dotSpacing:13,rainCount:18,speckCount:14,ribbonCount:5,bubbleCount:9,liquidTravel:17,liquidScale:.065,liquidOpacity:[.20,.18,.24],oceanOpacity:[.22,.30,.38],rainOpacity:.62,flameWidth:43,flameHeight:150,flameSway:12},
 categoryVisuals:{hz:'resonance',noise:'mist',asmr:'fibers',music:'liquid'},
 trackVisuals:{noise:'brown',rain:'rain',ocean:'waves',soft:'liquid',frequency:'resonance'},
 personalVisuals:[['liquid','Liquid Light'],['waves','Soft Waves'],['mist','Drifting Mist'],['ripples','Soft Ripples'],['resonance','Resonance Field'],['none','No Visual']],
 modes:[['once','Play Once'],['loop','Loop'],['continuous','Continuous']],
 paths:{wave:'M-70 155Q20 105 110 150T290 145T470 145V1000H-70Z',liquid:'M160 55C250 26 304 134 257 207C228 287 94 268 65 203C18 122 87 27 160 55Z',flow:'M-20 230C90 250 100 75 180 95S230 250 350 75'}
};
