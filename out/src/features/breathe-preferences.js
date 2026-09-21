import {customTechnique} from './breathe.js';
export const CUSTOM_BREATH_KEY='softly-custom-breath-v1',DEFAULT_RHYTHM=[4,0,6,0];
export function readCustomRhythm(storage){try{const rhythm=JSON.parse(storage.getItem(CUSTOM_BREATH_KEY));customTechnique(rhythm);return [...rhythm];}catch{return [...DEFAULT_RHYTHM];}}
export function writeCustomRhythm(storage,rhythm){customTechnique(rhythm);storage.setItem(CUSTOM_BREATH_KEY,JSON.stringify(rhythm));return [...rhythm];}
export const breathingTutorial=method=>method.phases.filter(([,seconds])=>seconds>0).map(([name,seconds])=>`${name} ${seconds}s`).join(' · ');
