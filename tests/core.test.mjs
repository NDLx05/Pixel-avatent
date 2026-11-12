import test from 'node:test';
import assert from 'node:assert/strict';
import {createHero, gainXP, applyDamage, restoreSave, canOccupy, castSkill, advanceQuest} from '../src/core.js';
test('all classes start alive with distinct combat profiles',()=>{
 const heroes=['warrior','mage','archer'].map(createHero);
 assert.equal(heroes.length,3);assert.ok(heroes.every(h=>h.hp===h.maxHp&&h.level===1));
 assert.ok(heroes[0].maxHp>heroes[1].maxHp);assert.ok(heroes[2].range>heroes[0].range);
});
test('level rewards handle multiple levels without losing XP',()=>{const h=createHero('mage');gainXP(h,500);assert.ok(h.level>=3);assert.ok(h.xp<h.nextXP);assert.equal(h.hp,h.maxHp)});
test('damage respects armor and never yields negative health',()=>{const h=createHero('warrior');applyDamage(h,1);assert.ok(h.hp<h.maxHp);applyDamage(h,99999);assert.equal(h.hp,0)});
test('skills consume resources once and reject cooldown or dead caster',()=>{const h=createHero('mage');assert.equal(castSkill(h,1),true);const mana=h.mp;assert.equal(castSkill(h,1),false);assert.equal(h.mp,mana);h.hp=0;assert.equal(castSkill(h,2),false)});
test('invalid saves cannot inject invalid class, zone or non-finite stats',()=>{assert.equal(restoreSave('{oops'),null);assert.equal(restoreSave(JSON.stringify({version:99})),null);const h=createHero('mage');h.hp=NaN;const s=restoreSave(JSON.stringify({version:1,hero:h,zone:999,quest:0}));assert.equal(s.zone,0);assert.ok(Number.isFinite(s.hero.hp));assert.equal(s.hero.kind,'mage')});
test('circle collision blocks wall, permits clear space and blocks world edge',()=>{const rects=[{x:100,y:100,w:80,h:80}];assert.equal(canOccupy(95,130,12,rects,500,500),false);assert.equal(canOccupy(50,50,12,rects,500,500),true);assert.equal(canOccupy(1,50,12,rects,500,500),false)});
test('quest progresses only from correct kill and stops at target',()=>{const q={target:'slime-green',need:3,count:0};advanceQuest(q,'bat');assert.equal(q.count,0);for(let i=0;i<10;i++)advanceQuest(q,'slime-green');assert.equal(q.count,3)});
import {buildZone,SPAWNS,WIDTH,HEIGHT} from '../src/world.js';
test('every monster starts on walkable terrain in each region',()=>{for(let i=0;i<3;i++){const z=buildZone(i);for(const [kind,x,y] of SPAWNS[i])assert.ok(canOccupy(x,y,kind==='golem'?24:13,z.obstacles,WIDTH,HEIGHT),`${i}: ${kind} at ${x},${y}`)}});
