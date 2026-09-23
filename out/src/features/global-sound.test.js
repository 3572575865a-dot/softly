import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readGlobalSound,setGlobalQuiet,createSessionSound} from './global-sound.js';
import {createAudioHandle} from '../assets/audio-player.js';

test('global quiet persists while page override remains temporary',()=>{
  const originalWindow=globalThis.window,originalStorage=globalThis.localStorage;
  const values=new Map();
  globalThis.window=new EventTarget();
  globalThis.localStorage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};
  try{
    assert.deepEqual(readGlobalSound(),{globalQuietEnabled:false,hasSeenQuietModeExplanation:false});
    const first=createSessionSound(),second=createSessionSound();
    setGlobalQuiet(true,{acknowledge:true});
    assert.equal(first.enabled,false);
    assert.equal(second.enabled,false);
    first.toggleOverride();
    assert.equal(first.enabled,true);
    assert.equal(second.enabled,false);
    assert.equal(readGlobalSound().globalQuietEnabled,true);
    first.dispose();second.dispose();
    const nextPage=createSessionSound();
    assert.equal(nextPage.enabled,false);
    setGlobalQuiet(false);
    assert.equal(nextPage.enabled,true);
    assert.equal(readGlobalSound().hasSeenQuietModeExplanation,true);
    nextPage.dispose();
  }finally{globalThis.window=originalWindow;globalThis.localStorage=originalStorage;}
});

test('muting an active file preserves its position and playback state',async()=>{
  const originalWindow=globalThis.window,originalStorage=globalThis.localStorage;
  const values=new Map();
  globalThis.window=new EventTarget();
  globalThis.localStorage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};
  const media={paused:true,currentTime:12,duration:60,volume:0,play(){this.paused=false;return Promise.resolve();},pause(){this.paused=true;},removeAttribute(){},load(){}};
  try{
    const scope=createSessionSound(),handle=createAudioHandle({url:'/test.wav',volume:.4,loop:true},{media,soundScope:scope});
    await handle.started;
    setGlobalQuiet(true,{acknowledge:true});
    assert.equal(media.volume,0);
    assert.equal(media.currentTime,12);
    assert.equal(media.paused,false);
    scope.toggleOverride();
    assert.equal(media.volume,.4);
    assert.equal(media.currentTime,12);
    assert.equal(readGlobalSound().globalQuietEnabled,true);
    handle();scope.dispose();
  }finally{globalThis.window=originalWindow;globalThis.localStorage=originalStorage;}
});
