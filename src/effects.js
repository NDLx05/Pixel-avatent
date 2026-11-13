// Deterministic, bounded particles: visual-only effects do not alter combat rules.
export function advancedEffect(c,e,time){
 const supported=['fireSpin','quake','meteor','arrows','vortex','web','claw','bite','dash'];
 if(!supported.includes(e.type))return false;
 const p=Math.max(0,Math.min(1,1-e.life/e.max)),r=e.radius||80;
 c.save();c.translate(e.x,e.y);c.globalAlpha=Math.min(1,e.life*5);c.globalCompositeOperation='lighter';
 c.strokeStyle=e.color;c.fillStyle=e.color;c.shadowColor=e.color;c.shadowBlur=12;
 const ring=(rr,flat=.55)=>{c.beginPath();c.ellipse(0,0,Math.max(1,rr),Math.max(1,rr*flat),0,0,Math.PI*2);c.stroke()};
 const spark=(x,y,s,color)=>{c.fillStyle=color;c.fillRect(x-s,y,s*2,2);c.fillRect(x,y-s,2,s*2)};
 if(e.type==='fireSpin'){
  for(let j=0;j<4;j++){const a=p*7+j*Math.PI/2;c.lineWidth=9-j;c.strokeStyle=['#ff651b','#ffb52e','#fff0a0','#ff4a48'][j];c.beginPath();c.ellipse(0,-12,r*(.4+p*.6),r*(.23+p*.33),0,a,a+1.8);c.stroke()}
  for(let i=0;i<20;i++){const a=i*2.4+p*5; spark(Math.cos(a)*r*p,Math.sin(a)*r*.5*p-15,2,'#ffd27b')}
 }else if(e.type==='quake'){
  c.lineWidth=4;c.strokeStyle='#ffc26b';ring(r*p);c.lineWidth=2;ring(r*p*.8);
  for(let i=0;i<12;i++){const a=i*Math.PI/6; c.beginPath();c.moveTo(0,0);for(let j=1;j<5;j++){const rr=r*p*j/4;c.lineTo(Math.cos(a+(j%2?.07:-.07))*rr,Math.sin(a)*rr*.6)}c.stroke();const x=Math.cos(a)*r*.7,y=Math.sin(a)*r*.4;c.fillStyle=i%2?'#ffbb68':'#9f7b73';c.fillRect(x,y-Math.sin(p*Math.PI)*35,8,8)}
 }else if(e.type==='meteor'){
  const impact=Math.min(1,p*2.5);c.lineWidth=2;c.strokeStyle='#c494ff';ring(r*.7);ring(r*.6);
  for(let i=0;i<8;i++){const a=i*Math.PI/4+time*.5;spark(Math.cos(a)*r*.7,Math.sin(a)*r*.38,3,'#dfb9ff')}
  if(p<.45){const x=(1-impact)*100,y=-(1-impact)*210-15;const grad=c.createLinearGradient(x,y,x+65,y-100);grad.addColorStop(0,'#fff0bb');grad.addColorStop(1,'#9855ff00');c.fillStyle=grad;c.beginPath();c.moveTo(x-18,y);c.lineTo(x+65,y-100);c.lineTo(x+18,y);c.fill();c.fillStyle='#fff3be';c.beginPath();c.arc(x,y,19,0,7);c.fill()}
  else {c.lineWidth=9*(1-p);c.strokeStyle='#ffb866';ring(r*(p-.4)*1.6);for(let i=0;i<24;i++){const a=i*2.4;spark(Math.cos(a)*r*p,Math.sin(a)*r*p*.6,3,'#d1a6ff')}}
 }else if(e.type==='arrows'){
  c.lineWidth=1;ring(r*.8);
  for(let i=0;i<15;i++){const phase=(p+i*.037)%1,x=Math.sin(i*8)*r*.8,y=Math.cos(i*11)*r*.45-(1-phase)*130;c.strokeStyle='#9eff87';c.lineWidth=2;c.beginPath();c.moveTo(x+18,y-35);c.lineTo(x,y);c.stroke();c.fillStyle='#e5ffb1';c.beginPath();c.moveTo(x-4,y-7);c.lineTo(x,y+3);c.lineTo(x+7,y-6);c.fill()}
 }else if(e.type==='vortex'){
  for(let i=0;i<5;i++){c.strokeStyle=i%2?'#eaffbd':'#67e2a1';c.lineWidth=3;c.beginPath();c.ellipse(0,-i*12,r*(1-p*.4)*(1-i*.13),r*.3*(1-i*.13),p*3+i*.2,p*8+i,p*8+i+4.7);c.stroke()}
  for(let i=0;i<22;i++){const a=i*2.4+p*10;c.save();c.translate(Math.cos(a)*r*.8,Math.sin(a)*r*.4-p*50);c.rotate(a);c.fillStyle=i%2?'#dcff9e':'#6edd80';c.fillRect(0,0,8,3);c.restore()}
 }else if(e.type==='web'){
  c.lineWidth=1.3;for(const rr of [.3,.6,1])ring(rr*r*p,.7);for(let i=0;i<8;i++){const a=i*Math.PI/4;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*r*p,Math.sin(a)*r*p*.7);c.stroke()}
 }else if(e.type==='dash'){
  c.rotate(e.angle||0);for(let i=0;i<8;i++){c.globalAlpha=(1-p)*.5;c.fillStyle=i%2?'#bff7e4':'#eefaff';c.fillRect(-r-i*8-p*20,(i-4)*7,25+i*4,2)}
 }else{
  c.rotate(e.angle||0);for(let i=-1;i<2;i++){c.lineWidth=3;c.beginPath();c.moveTo(8,-22+i*10);c.quadraticCurveTo(40+p*25,-8+i*8,32+p*20,20+i*5);c.stroke()}
 }
 c.restore();return true;
}
