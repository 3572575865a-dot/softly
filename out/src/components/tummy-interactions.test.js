import {test} from 'node:test';import assert from 'node:assert/strict';
import {attachTummyInteractions} from './tummy-interactions.js';
import {tummyAssets} from '../assets/tummy.js';
test('single breath returns to Floating, subsequent gesture resets, and Quiet Mode loops until exit',t=>{
 t.mock.timers.enable({apis:['setTimeout']});let notify;
 const original=globalThis.MutationObserver;globalThis.MutationObserver=class{constructor(fn){notify=fn;}observe(){}disconnect(){}};
 const shell={dataset:{quiet:'home'}},rig={dataset:{pose:'floating'}},root={querySelector:s=>s==='.app-shell'?shell:rig};
 try{const c=attachTummyInteractions(root);c.tap();assert.equal(rig.dataset.pose,'inhale');t.mock.timers.tick(tummyAssets.motion.inhaleMs);assert.equal(rig.dataset.pose,'exhale');t.mock.timers.tick(tummyAssets.motion.exhaleMs);assert.equal(rig.dataset.pose,'floating');c.tap();assert.equal(rig.dataset.action,'sway');t.mock.timers.tick(tummyAssets.motion.gestureMs);assert.equal(rig.dataset.action,undefined);shell.dataset.quiet='overstimulation';notify();assert.equal(rig.dataset.pose,'inhale');t.mock.timers.tick(tummyAssets.motion.inhaleMs);assert.equal(rig.dataset.pose,'exhale');t.mock.timers.tick(tummyAssets.motion.exhaleMs);assert.equal(rig.dataset.pose,'inhale');shell.dataset.quiet='returningHome';notify();assert.equal(rig.dataset.pose,'floating');c.dispose();t.mock.timers.tick(10000);assert.equal(rig.dataset.pose,'floating');}finally{globalThis.MutationObserver=original;}
});
