import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {restoreSave} from '../src/core.js';
import {advancedEffect} from '../src/effects.js';
const root=new URL('../',import.meta.url);
const meta=JSON.parse(readFileSync(new URL('assets/v2/atlas.json',root)));
test('V2 covers all 13 actors and 12 environmental props with valid rectangles',()=>{
 assert.equal(Object.keys(meta.entries).length,25);
 for(const [key,a] of Object.entries(meta.entries)){
  const bytes=readFileSync(new URL(meta.sheets[a.sheet],root));const w=bytes.readUInt32BE(16),h=bytes.readUInt32BE(20);
  assert.equal(a.frames.length,a.sheet==='props'?1:a.sheet==='heroes'?8:6,key);
  for(const [x,y,fw,fh] of a.frames){assert.ok(fw>0&&fh>0&&x>=0&&y>=0&&x+fw<=w&&y+fh<=h,key)}
  assert.ok(a.normalWidth>0&&a.normalHeight>0);
 }
});
test('V1 save retains identity, quest progress, equipment and companions under V2',()=>{
 const v=restoreSave(JSON.stringify({version:1,hero:{kind:'archer',level:4,x:700,y:550,gold:220,potions:9,weapon:3,gear:2},zone:1,quest:3,count:2,pet:'chicken',chests:['0-a']}));
 assert.equal(v.hero.kind,'archer');assert.equal(v.hero.level,4);assert.equal(v.hero.weapon,3);assert.equal(v.count,2);assert.equal(v.pet,'chicken');assert.deepEqual(v.chests,['0-a']);
});
test('all new effects render safely throughout their lifetime',()=>{
 let depth=0,calls=0;const noop=()=>{calls++};const c=new Proxy({save(){depth++},restore(){depth--},createLinearGradient(){return {addColorStop:noop}}},{get(o,k){return k in o?o[k]:noop},set(o,k,v){o[k]=v;return true}});
 for(const type of ['fireSpin','quake','meteor','arrows','vortex','web','claw','bite','dash'])for(const life of [1,.5,.01,0])assert.equal(advancedEffect(c,{type,life,max:1,x:10,y:10,radius:150,color:'#fff',angle:1},1),true);
 assert.equal(depth,0);assert.ok(calls>100);assert.equal(advancedEffect(c,{type:'unknown'},1),false);
});
