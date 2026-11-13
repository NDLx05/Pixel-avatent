// V2 generated art, normalized from measured alpha bounds. No external runtime dependencies.
export const artImages = {};
let metadata = {};
export async function loadArt() {
  const response = await fetch('assets/v2/atlas.json');
  if (!response.ok) throw new Error('Không tải được đồ họa V2');
  metadata = await response.json();
  await Promise.all(Object.entries(metadata.sheets).map(([key, src]) => new Promise((resolve,reject) => {
    const im = new Image(); im.onload=()=>{artImages[key]=im;resolve()}; im.onerror=()=>reject(new Error('Không tải được '+src)); im.src=src;
  })));
}
export function artFrame(ctx,key,frame,x,y,height,widthLimit=height*1.7,alpha=1,face=1) {
  const entry=metadata.entries?.[key]; if(!entry||!artImages[entry.sheet]) return false;
  const b=entry.frames[Math.min(frame,entry.frames.length-1)];
  const scale=Math.min(height/entry.normalHeight,widthLimit/entry.normalWidth);
  const w=b[2]*scale,h=b[3]*scale;
  ctx.save();ctx.globalAlpha*=alpha;ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);
  ctx.imageSmoothingEnabled=false;ctx.drawImage(artImages[entry.sheet],...b,-w/2,-h,w,h);ctx.restore();return true;
}
export function animatedArt(ctx,kind,state,t,x,y,scale,face,alpha){
 const hero=['warrior','mage','archer'].includes(kind);
 const frames=hero?{idle:[0,1],walk:[2,3],attack:[4,5],hurt:[6],die:[7]}:{idle:[0],walk:[1,2],attack:[3],hurt:[4],die:[5]};
 const seq=frames[state]||frames.idle;
 const f=seq[state==='attack'?Math.min(seq.length-1,Math.floor(t*9)):Math.floor(t*(state==='walk'?9:2))%seq.length];
 const size=(kind==='golem'?36:hero?27:25)*scale;
 ctx.save();
 const bob=state==='walk'?Math.abs(Math.sin(t*18))*2:state==='idle'?Math.sin(t*3)*.7:0;
 const lunge=state==='attack'?Math.sin(Math.min(1,t/.4)*Math.PI)*7*face:0;
 const fade=state==='die'?Math.max(0,1-Math.max(0,t-.65)/.85):1;
 const hit=state==='hurt'?Math.sin(t*40)*2:0;
 const ok=artFrame(ctx,kind,f,x+lunge+hit,y-bob,size,size*1.8,alpha*fade,face);
 ctx.restore();return ok;
}
export function prop(ctx,key,x,y,height,width){return artFrame(ctx,key,0,x,y,height,width||height*1.6)}
