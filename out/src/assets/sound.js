// Sound-only presentation configuration. Audio remains in the shared asset manifest.
export const soundConfig={
 importVolume:.35,fadeMs:900,controlsMs:3000,transitionMs:650,settleSeconds:30,importTimeoutMs:15000,maxImportBytes:150*1024*1024,
 material:{pink:'#EDD8E7',milk:'#fffaf8',brown:'#c5b5af',mist:'#d9cbd7'},
 motion:{periodSeconds:24,travel:13,reducedTravel:1,touchMs:1700},
 categoryVisuals:{hz:'resonance',noise:'mist',asmr:'fibers',music:'liquid'},
 trackVisuals:{noise:'brown',rain:'rain',ocean:'waves',soft:'liquid',frequency:'resonance'},
 personalVisuals:[['liquid','Liquid Light'],['waves','Soft Waves'],['mist','Drifting Mist'],['ripples','Soft Ripples'],['resonance','Resonance Field'],['none','No Visual']],
 modes:[['once','Play Once'],['loop','Loop'],['continuous','Continuous']],
 paths:{wave:'M-70 155Q20 105 110 150T290 145T470 145V1000H-70Z',liquid:'M160 55C250 26 304 134 257 207C228 287 94 268 65 203C18 122 87 27 160 55Z',flow:'M-20 230C90 250 100 75 180 95S230 250 350 75'}
};
