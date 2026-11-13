import {WIDTH,HEIGHT,random} from './world.js';
import {prop} from './art.js';
function ellipse(c,color,x,y,rx,ry){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
export function paintGround(z){
 const out=document.createElement('canvas');out.width=WIDTH;out.height=HEIGHT;const c=out.getContext('2d'),rnd=random(71+z.index*37),snow=z.index===1,fire=z.index===2;
 c.fillStyle=fire?'#252439':snow?'#b9d4df':'#387a46';c.fillRect(0,0,WIDTH,HEIGHT);
 const palette=fire?['#39324a','#423450','#292a3b']:snow?['#dbeaf0','#a8cbd8','#cce2e9']:['#3c7d47','#407f48','#357645','#458449'];
 for(let i=0;i<2700;i++){const x=rnd()*WIDTH,y=rnd()*HEIGHT;ellipse(c,palette[i%4]||palette[0],x,y,12+rnd()*35,5+rnd()*12)}
 for(let i=0;i<14000;i++){const x=rnd()*WIDTH,y=rnd()*HEIGHT;c.fillStyle=fire?'#6f466637':snow?'#ffffff65':i%3?'#a1c86430':'#123d343c';c.fillRect(x,y,1+rnd()*3,1+rnd()*3);if(!snow&&!fire&&i%7===0){c.fillRect(x+2,y-3,1,5);c.fillRect(x-2,y-1,1,3)}}
 // Irregular stone paving retains the original collision and travel routes.
 const onPath=(x,y)=>Math.abs(y-560)<42||Math.abs(x-430)<32&&y>170&&y<1240||Math.abs(x-1300)<31&&y>260&&y<1220||z.index===0&&Math.hypot((x-435)/1.4,y-555)<77;
 for(let y=170;y<1240;y+=11)for(let x=0;x<WIDTH;x+=19){if(!onPath(x,y))continue;const j=rnd();c.fillStyle=fire?['#66596e','#51485f','#776778'][Math.floor(j*3)]:snow?['#99b6c7','#adc7d4','#8eaab9'][Math.floor(j*3)]:['#b8a679','#c6b68a','#a7976b'][Math.floor(j*3)];c.beginPath();c.roundRect(x+(Math.floor(y/11)%2)*7,y,16+rnd()*3,8+rnd()*2,2);c.fill();c.fillStyle=fire?'#9a819549':'#f8e8af44';c.fillRect(x+3,y+1,10,1)}
 // Layered riverbanks, pebbles, shallows, water and lily pads.
 c.fillStyle=fire?'#4b3048':snow?'#e8f4f3':'#245940';c.fillRect(880,0,120,HEIGHT);
 c.fillStyle=fire?'#ae3d31':snow?'#5795b7':'#207f98';c.fillRect(895,0,90,HEIGHT);
 for(let y=0;y<HEIGHT;y+=14){ellipse(c,fire?'#ff9c3d':snow?'#e7faff':'#83b9a1',893+Math.sin(y*.04)*3,y,5,9);ellipse(c,fire?'#f05f32':snow?'#c6e8ed':'#497d63',987+Math.cos(y*.03)*3,y,5,9);c.fillStyle=fire?'#f9ba5549':'#b1eddf39';c.fillRect(904+rnd()*50,y,7+rnd()*25,2)}
 c.fillStyle=fire?'#ed6936':'#256c9b';c.fillRect(927,0,20,HEIGHT);
 for(let i=0;i<32;i++){const y=rnd()*HEIGHT;if(Math.abs(y-560)<70)continue;ellipse(c,fire?'#ffdf74':'#3a967b',906+rnd()*60,y,5,2);if(!snow&&!fire){c.fillStyle='#eecae2';c.fillRect(912+rnd()*35,y-2,3,2)}}
 // Stone abutments and plank bridge with detailed railings.
 c.fillStyle='#39404b';c.fillRect(870,503,138,116);for(let x=875;x<1004;x+=10){c.fillStyle=snow?'#a9bac1':'#ab8150';c.fillRect(x,512,8,95);c.fillStyle='#e3c58c80';c.fillRect(x+1,516,1,84);c.fillStyle='#5b4036';c.fillRect(x+3,525,2,2);c.fillRect(x+3,592,2,2)}
 for(const yy of [507,606]){c.fillStyle='#654c36';c.fillRect(866,yy,147,5);c.fillStyle='#d1b47a';c.fillRect(866,yy,147,2);for(let x=870;x<1015;x+=28){c.fillStyle='#584837';c.fillRect(x,yy-7,7,16);c.fillStyle='#d5ba8c';c.fillRect(x,yy-8,7,3)}}
 for(const f of z.flowers){if(onPath(f.x,f.y)||f.x>865&&f.x<1015)continue;c.fillStyle=fire?'#eb925f':snow?'#f6ffff':['#ffe68f','#efb4db','#bcdfff','#bedb7d','#ffffff'][f.type];c.fillRect(f.x,f.y,3,3);c.fillStyle=fire?'#7a4466':'#2e664f';c.fillRect(f.x+1,f.y+3,1,4)}
 for(const r of z.rocks){if(onPath(r.x,r.y))continue;prop(c,fire?'lava-rock':snow?'crystal':'moss-rock',r.x,r.y,r.size*2.8,r.size*3.4)}
 if(fire){c.save();c.translate(1430,1000);c.strokeStyle='#bc6aff65';c.lineWidth=3;for(const r of [155,180]){c.beginPath();c.ellipse(0,0,r,r*.7,0,0,7);c.stroke()}for(let i=0;i<16;i++){const a=i*Math.PI/8;c.save();c.translate(Math.cos(a)*167,Math.sin(a)*116);c.rotate(a);c.fillStyle='#d4a5ff';c.fillRect(-3,-4,6,8);c.restore()}c.restore()}
 return out;
}
export function drawTree(c,t,index){const name=index===1?'fir':index===2?(t.variant===0?'ruin':'lava-rock'):t.variant===2?'blossom':t.variant===0?'pine':'oak';ellipse(c,'#0d24374d',t.x+8,t.y+2,32*t.size,11*t.size);prop(c,name,t.x,t.y,(index===2?106:140)*t.size,118*t.size)}
export function drawHouse(c,h,index){ellipse(c,'#0b1f3555',h.x+h.w/2,h.y+h.h,h.w*.65,18);prop(c,index===1?'snow-house':'cottage',h.x+h.w/2,h.y+h.h,h.h+100,h.w+48)}
export function scenery(c,z,t){
 // Lanterns along the central lane, light blooms and fireflies.
 for(const x of [360,520,1090,1370]){const y=488; c.fillStyle='#37404c';c.fillRect(x,y-34,4,37);c.fillStyle='#d3b276';c.fillRect(x-3,y-38,10,12);c.fillStyle=z.index===2?'#d47aff':'#fff0aa';c.fillRect(x-1,y-36,6,8);c.save();c.globalCompositeOperation='lighter';const light=c.createRadialGradient(x+2,y-30,0,x+2,y-30,30);light.addColorStop(0,z.index===2?'#bb54ff66':'#ffc76555');light.addColorStop(1,'#ffce5500');c.fillStyle=light;c.fillRect(x-30,y-60,64,64);c.restore()}
 if(z.index===0){for(let i=0;i<12;i++){const x=240+i*10,y=675;c.fillStyle='#664e38';c.fillRect(x,y-12,4,18);c.fillStyle='#b99a61';c.fillRect(x,y-12,3,2);c.fillRect(x,y-7,12,3)}
 for(let i=0;i<15;i++){const x=630+Math.sin(t*.3+i*17)*100,y=380+Math.cos(t*.4+i*13)*70;c.fillStyle=`rgba(236,255,149,${.45+Math.sin(t*2+i)*.4})`;c.fillRect(x,y,2,2)}}
}
