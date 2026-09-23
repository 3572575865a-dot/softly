import {test} from 'node:test';import assert from 'node:assert/strict';
import {createHomeVisitState,PAGE_MASCOT_STATE} from './mascot-state.js';
import {mascot} from './mascot.js';
import {tummyAssets} from '../assets/tummy.js';
test('Home always returns to the original Floating pose across visits',()=>{const visit=createHomeVisitState();assert.equal(visit.enter(),'floating');visit.leave();assert.equal(visit.enter(),'floating');});
test('browse mascots use Exhale without headphones and Floating with headphones',()=>{assert.equal(PAGE_MASCOT_STATE.breathe,'exhale');assert.equal(PAGE_MASCOT_STATE.sound,'listening');assert.match(mascot({state:PAGE_MASCOT_STATE.breathe}),/data-pose="exhale"/);assert.match(mascot({state:PAGE_MASCOT_STATE.sound}),/data-pose="floating"/);assert.equal(PAGE_MASCOT_STATE.mood,'floating');});
test('all reference poses reuse a single four-tentacle silhouette and configurable artwork',()=>{for(const state of ['floating','inhale','exhale','listening']){const html=mascot({state,size:'small',animated:false});assert.equal((html.match(/class="tummy-body"/g)||[]).length,1);assert.match(html,/data-tentacles="4"/);assert.match(html,/--mascot-size:56px/);assert.doesNotMatch(html,/<button/);}assert.deepEqual(Object.keys(tummyAssets.paths),['floating','inhale','exhale']);assert.ok(tummyAssets.actions.includes('breath'));});
