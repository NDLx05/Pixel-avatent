export const WIDTH=1800,HEIGHT=1400;
export const ZONES=[
 {name:'Thung Lũng Lục Bảo',sub:'RỪNG CỔ · CẤP 1–3',ground:['#3d6547','#406b49','#426d4a','#3b6246'],path:'#a69c70',water:'#28677a',trees:'#316b48',sky:'#b8df8d',spawn:[420,540]},
 {name:'Băng Nguyên Tĩnh Lặng',sub:'PHƯƠNG BẮC · CẤP 3–5',ground:['#bacfcd','#bed4d2','#b4cbc9','#c6d8d3'],path:'#8ea9aa',water:'#4e8b9d',trees:'#527e83',sky:'#c4e9fa',spawn:[350,550]},
 {name:'Phế Tích Tro Tàn',sub:'KHE NỨT · CẤP 5+',ground:['#3b3546','#393241','#403747','#443849'],path:'#6a5663',water:'#b54f36',trees:'#53425b',sky:'#fa9669',spawn:[350,550]}
];
export function random(seed){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
export function buildZone(index){const rnd=random(712+index*300),trees=[],rocks=[],flowers=[],obstacles=[];
 const houses=index===0?[{x:250,y:360,w:120,h:95,type:0},{x:480,y:335,w:105,h:90,type:1},{x:285,y:720,w:105,h:85,type:2}]:index===1?[{x:270,y:350,w:125,h:100,type:1}]:[];
 for(const h of houses)obstacles.push({x:h.x-8,y:h.y-12,w:h.w+16,h:h.h+12});
 obstacles.push({x:900,y:0,w:80,h:500},{x:900,y:620,w:80,h:780});
 for(let i=0;i<190;i++){const x=60+rnd()*1680,y=60+rnd()*1280;const road=Math.abs(y-560)<90||Math.abs(x-430)<65||Math.abs(x-1300)<65;const village=index===0&&x<650&&y>240&&y<870;const river=x>850&&x<1040;const arena=index===2&&Math.hypot(x-1430,y-1000)<230;const nearSpawn=SPAWNS[index].some(([,sx,sy])=>Math.hypot(x-sx,y-sy)<70);if(road||village||river||arena||nearSpawn)continue;const t={x:Math.round(x),y:Math.round(y),size:0.7+rnd()*.65,variant:Math.floor(rnd()*3)};trees.push(t);obstacles.push({x:x-9,y:y-12,w:18,h:20});}
 for(let i=0;i<65;i++){let x=rnd()*1760+20,y=rnd()*1360+20;if(Math.abs(y-560)<70||Math.abs(x-430)<55||x>850&&x<1040)continue;rocks.push({x,y,size:7+rnd()*13});}
 for(let i=0;i<450;i++)flowers.push({x:rnd()*WIDTH,y:rnd()*HEIGHT,type:Math.floor(rnd()*5)});
 const portals=[{x:1570,y:555,to:(index+1)%3,name:ZONES[(index+1)%3].name},{x:130,y:555,to:(index+2)%3,name:ZONES[(index+2)%3].name}];
 const chests=[{x:655,y:310,id:`${index}-a`},{x:1240,y:850,id:`${index}-b`},{x:1570,y:1180,id:`${index}-c`}];
 const npc={x:445,y:455,kind:'mage',name:'Aelia · Người giữ rừng'};
 const pets=index===0?[{kind:'chicken',x:350,y:680},{kind:'chicken',x:385,y:700},{kind:'fox',x:620,y:360}]:index===1?[{kind:'fox',x:620,y:360}]:[];
 return {index,...ZONES[index],trees,rocks,flowers,houses,obstacles,portals,chests,npc,pets};
}
export const SPAWNS=[
 [['slime-green',695,515],['slime-green',760,710],['slime-green',615,880],['slime-green',790,340],['slime-green',1160,600],['goblin',1240,400],['goblin',1320,720],['goblin',1460,480],['bat',1140,1020],['spider',1430,1040],['bat',700,1150]],
 [['wolf',660,520],['wolf',730,750],['wolf',680,310],['skeleton',1170,480],['skeleton',1330,700],['skeleton',1450,380],['spider',700,1060],['spider',1180,1050],['bat',1520,1000]],
 [['imp',710,520],['imp',700,780],['imp',1160,460],['imp',1270,720],['skeleton',680,1040],['bat',1160,1030],['spider',1430,360],['golem',1430,1000]]
];
