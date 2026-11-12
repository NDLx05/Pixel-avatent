// Pure gameplay rules, shared by runtime and tests. No browser dependencies.
export const CLASSES = {
 warrior:{name:'Kiếm Vệ',title:'BỨC TƯỜNG THÀNH',desc:'Kiếm rộng, giáp dày. Áp sát và quét sạch kẻ địch.',hp:180,mp:85,damage:24,armor:5,range:100,color:'#f2b861',skills:['Kiếm kích','Lốc kiếm','Địa chấn']},
 mage:{name:'Linh Pháp',title:'NGƯỜI GIỮ TINH TÚ',desc:'Điều khiển băng và tinh tú. Gây sát thương từ xa.',hp:125,mp:150,damage:26,armor:2,range:290,color:'#ad95ff',skills:['Tinh cầu','Băng phong','Thiên thạch']},
 archer:{name:'Du Hiệp',title:'NGỌN GIÓ TỰ DO',desc:'Mũi tên chính xác, bước chân nhanh. Làm chủ khoảng cách.',hp:145,mp:110,damage:22,armor:3,range:330,color:'#88dfba',skills:['Xuyên tâm','Mưa tên','Bão lá']}
};
export const MONSTERS={
 'slime-green':{name:'Slime ngọc',hp:55,damage:7,xp:22,gold:9,speed:39},
 bat:{name:'Dơi bóng đêm',hp:60,damage:8,xp:27,gold:11,speed:80},
 wolf:{name:'Sói tuyết',hp:95,damage:13,xp:38,gold:16,speed:87},
 skeleton:{name:'Vệ binh xương',hp:115,damage:14,xp:42,gold:18,speed:49},
 goblin:{name:'Goblin lang thang',hp:85,damage:11,xp:32,gold:14,speed:55},
 spider:{name:'Nhện thạch anh',hp:90,damage:10,xp:34,gold:14,speed:65},
 imp:{name:'Quỷ lửa',hp:145,damage:17,xp:53,gold:22,speed:64},
 golem:{name:'HỘ VỆ KHE NỨT',hp:950,damage:26,xp:260,gold:150,speed:32}
};
export const QUESTS=[
 {title:'Bình yên cho thung lũng',text:'Hạ 4 Slime ngọc quanh bờ suối.',target:'slime-green',need:4,zone:0,gold:60,xp:60},
 {title:'Dấu chân trong rừng',text:'Đánh bại 3 Goblin lang thang.',target:'goblin',need:3,zone:0,gold:90,xp:85},
 {title:'Tiếng gọi phương Bắc',text:'Qua cổng Băng Nguyên, hạ 3 Sói tuyết.',target:'wolf',need:3,zone:1,gold:120,xp:100},
 {title:'Vệ binh bị lãng quên',text:'Hạ 3 Vệ binh xương tại Băng Nguyên.',target:'skeleton',need:3,zone:1,gold:140,xp:120},
 {title:'Ngọn lửa cuối cùng',text:'Qua cổng Tro Tàn, hạ 3 Quỷ lửa.',target:'imp',need:3,zone:2,gold:180,xp:150},
 {title:'Khép lại khe nứt',text:'Đánh bại Hộ vệ Khe Nứt tại phế tích.',target:'golem',need:1,zone:2,gold:500,xp:300}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function createHero(kind='warrior'){
 if(!CLASSES[kind])kind='warrior';const c=CLASSES[kind];
 return {kind,x:420,y:540,hp:c.hp,maxHp:c.hp,mp:c.mp,maxMp:c.mp,level:1,xp:0,nextXP:90,damage:c.damage,armor:c.armor,range:c.range,gold:30,potions:5,weapon:0,gear:0,cooldowns:[0,0,0,0,0],face:1,state:'idle',anim:0,invuln:0};
}
export function gainXP(h,n){h.xp+=Math.max(0,n);let levels=0;while(h.xp>=h.nextXP&&h.level<50){h.xp-=h.nextXP;h.level++;h.nextXP=Math.round(h.nextXP*1.35);h.maxHp+=20;h.maxMp+=10;h.damage+=4;h.hp=h.maxHp;h.mp=h.maxMp;levels++;}return levels;}
export function applyDamage(h,n){const hit=Math.max(1,Math.round(n-(h.armor||0)));h.hp=Math.max(0,h.hp-hit);return hit;}
export function castSkill(h,slot){const cost=[0,18,35,0,0][slot];if(h.hp<=0||slot<0||slot>4||h.cooldowns[slot]>0||h.mp<cost)return false;if(slot===4&&h.potions<=0)return false;h.mp-=cost;h.cooldowns[slot]=[0.48,4,9,2.3,5][slot];return true;}
export function advanceQuest(q,kind){if(q&&q.target===kind)q.count=Math.min(q.need,q.count+1);}
export function canOccupy(x,y,r,rects,width,height){if(x<r||y<r||x>width-r||y>height-r)return false;return !rects.some(b=>Math.hypot(x-clamp(x,b.x,b.x+b.w),y-clamp(y,b.y,b.y+b.h))<r);}
export function restoreSave(raw){try{
 const s=JSON.parse(raw);if(s.version!==1||!s.hero||!CLASSES[s.hero.kind])return null;
 const h=createHero(s.hero.kind),src=s.hero;const num=(v,d,min,max)=>Number.isFinite(v)?clamp(v,min,max):d;
 const level=Math.floor(num(src.level,1,1,50));for(let i=1;i<level;i++)gainXP(h,h.nextXP);
 h.weapon=Math.floor(num(src.weapon,0,0,20));h.gear=Math.floor(num(src.gear,0,0,20));h.damage+=h.weapon*6;h.armor+=h.gear*2;
 for(const [k,max] of [['gold',999999],['potions',99],['xp',h.nextXP-1],['hp',h.maxHp],['mp',h.maxMp]])h[k]=num(src[k],h[k],0,max);
 h.x=num(src.x,420,30,1770);h.y=num(src.y,540,30,1370);h.hp=Math.max(1,h.hp);
 return {hero:h,zone:[0,1,2].includes(s.zone)?s.zone:0,quest:Math.floor(num(s.quest,0,0,QUESTS.length)),count:Math.floor(num(s.count,0,0,10)),pet:['fox','chicken','none'].includes(s.pet)?s.pet:'fox',chests:Array.isArray(s.chests)?s.chests.filter(x=>typeof x==='string').slice(0,50):[]};
 }catch{return null;}}
