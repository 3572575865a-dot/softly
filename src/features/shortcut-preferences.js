import {customTechnique,techniques} from './breathe.js';
import {assets} from '../assets/config.js';
export const BREATH_DEFAULT_KEY='softly-default-breath-v1',FREQUENCY_DEFAULT_KEY='softly-default-frequency-v1';
export function writeBreathDefault(storage,{id,minutes,rhythm}){if(!Number.isInteger(minutes)||minutes<0||minutes>120)throw Error('Choose 0–120 minutes.');if(id==='custom')customTechnique(rhythm);else if(!techniques.some(t=>t.id===id))throw Error('Choose a breathing method.');const saved={id,minutes,...(id==='custom'?{rhythm:[...rhythm]}:{})};storage.setItem(BREATH_DEFAULT_KEY,JSON.stringify(saved));return saved;}
export function readBreathDefault(storage){try{const saved=JSON.parse(storage.getItem(BREATH_DEFAULT_KEY));if(!saved||!Number.isInteger(saved.minutes)||saved.minutes<0||saved.minutes>120)return null;const method=saved.id==='custom'?customTechnique(saved.rhythm):techniques.find(t=>t.id===saved.id);return method?{method,minutes:saved.minutes}:null;}catch{return null;}}
export function readFrequencyDefault(storage){try{const id=storage.getItem(FREQUENCY_DEFAULT_KEY);return assets.audio[id]?.category==='hz'?id:'frequency';}catch{return 'frequency';}}
export function writeFrequencyDefault(storage,id){if(assets.audio[id]?.category!=='hz')throw Error('Choose a frequency.');storage.setItem(FREQUENCY_DEFAULT_KEY,id);}
