import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const atlas=JSON.parse(readFileSync(new URL('assets/characters/manifest.json',root)));
test('all 11 source characters have complete, in-bounds animation rows',()=>{
 assert.equal(Object.keys(atlas).length,11);
 for(const [kind,m] of Object.entries(atlas)){
  const png=readFileSync(new URL(m.src,root));
  const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
  for(const state of ['idle','walk','attack','hurt','die']){
   const a=m.rows[state];assert.ok(a,kind+': '+state);assert.ok(a.frames>1&&a.fps>0);
   assert.ok(a.frames*m.frameWidth<=width);assert.ok((a.row+1)*m.frameHeight<=height);
  }
 }
});
test('offline precache references only existing local runtime files',()=>{
 const sw=readFileSync(new URL('sw.js',root),'utf8');
 const files=JSON.parse(sw.match(/const FILES\s*=\s*(\[[\s\S]*?\]);/)[1]);
 for(const path of files)assert.ok(existsSync(fileURLToPath(new URL(path,root))),path);
 for(const path of ['src/game.js','src/core.js','src/render.js','src/world.js','assets/icon-192.png'])assert.ok(files.includes('./'+path));
});
