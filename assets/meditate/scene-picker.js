(()=>{
'use strict';
const root=document.getElementById('inward-preview');if(!root)return;
const phone=root.querySelector('.iw-phone'),trigger=root.querySelector('.iw-meditate-controls button[aria-label="Scenery"]'),base=root.querySelector('.iw-meditate-background');
if(!trigger||!base)return;
const urls=Array.from({length:4},(_,i)=>`assets/meditate/scenes/scene-${i+1}.jpg`);
const layers=[base,base.cloneNode()];layers[1].style.opacity='0';base.after(layers[1]);
let front=0,loadVersion=0,selected=-1;
const picker=document.createElement('div');picker.className='iw-scene-picker';picker.id='iw-scene-picker';picker.hidden=true;picker.setAttribute('role','group');picker.setAttribute('aria-label','Meditation scenery');picker.tabIndex=-1;
const cards=urls.map((url,i)=>{const button=document.createElement('button');button.className='iw-scene-card';button.type='button';button.setAttribute('aria-label',`Choose scenery ${i+1}`);button.setAttribute('aria-pressed',String(i===selected));const img=document.createElement('img');img.src=url;img.alt='';img.draggable=false;button.append(img);picker.append(button);return button});
const status=document.createElement('span');status.className='iw-scene-picker-status';status.setAttribute('aria-live','polite');picker.append(status);phone.append(picker);
trigger.setAttribute('aria-controls',picker.id);trigger.setAttribute('aria-expanded','false');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let current=1,target=1,velocity=0,raf=0,last=0,drag=null,suppressClick=false,wheelTimer=0,entrance=1;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function paint(){
 cards.forEach((card,i)=>{const d=i-current,dist=Math.abs(d),scale=1-.16*Math.min(dist,2),x=10+26*d*d,y=158+d*107;
 card.style.transform=`translate3d(${x+(1-entrance)*65}px,${y}px,0) scale(${scale*entrance})`;
 card.style.opacity=String(clamp(1-dist*.19,.3,1)*entrance);card.style.zIndex=String(10-Math.round(dist*2));});
}
function tick(now){
 const dt=Math.min((now-(last||now))/1000,.032);last=now;
 if(!drag){const acceleration=(target-current)*220-velocity*27;velocity+=acceleration*dt;current+=velocity*dt}
 entrance=reduced.matches?1:Math.min(1,entrance+dt*5);
 paint();
 if(drag||Math.abs(target-current)>.001||Math.abs(velocity)>.01||entrance<1)raf=requestAnimationFrame(tick);
 else{current=target;velocity=0;raf=0;last=0;paint()}
}
function animate(){if(!raf){last=0;raf=requestAnimationFrame(tick)}}
async function choose(index){
 selected=target=clamp(index,0,3);cards.forEach((c,i)=>c.setAttribute('aria-pressed',String(i===selected)));status.textContent=`Scenery ${selected+1} of 4`;animate();
 const version=++loadVersion,url=urls[selected],preload=new Image();preload.src=url;
 try{await preload.decode()}catch{return}
 if(version!==loadVersion)return;
 const next=1-front;layers[next].src=url;
 try{await layers[next].decode()}catch{return}
 if(version!==loadVersion)return;
 layers[next].style.opacity='1';layers[front].style.opacity='0';front=next;
}
function open(){picker.hidden=false;root.classList.add('iw-scene-picker-open');trigger.setAttribute('aria-expanded','true');current=target=selected<0?1:selected;velocity=0;entrance=reduced.matches?1:.8;animate();picker.focus({preventScroll:true})}
function close(){
 picker.hidden=true;root.classList.remove('iw-scene-picker-open');trigger.setAttribute('aria-expanded','false');
 if(drag&&picker.hasPointerCapture(drag.id))picker.releasePointerCapture(drag.id);drag=null;
 cancelAnimationFrame(raf);raf=0;last=0;clearTimeout(wheelTimer);
}
trigger.addEventListener('click',()=>picker.hidden?open():close());
cards.forEach((c,i)=>c.addEventListener('click',event=>{if(suppressClick&&event.detail){suppressClick=false;return}choose(i)}));
picker.addEventListener('pointerdown',event=>{if(event.button>0)return;suppressClick=false;velocity=0;drag={id:event.pointerId,y:event.clientY,start:current,lastY:event.clientY,time:performance.now(),speed:0,moved:false,scale:phone.getBoundingClientRect().width/phone.offsetWidth};});
picker.addEventListener('pointermove',event=>{
 if(!drag||event.pointerId!==drag.id)return;
 const delta=(event.clientY-drag.y)/drag.scale;
 if(!drag.moved&&Math.abs(delta)<4)return;
 if(!drag.moved){drag.moved=true;picker.setPointerCapture(event.pointerId)}
 event.preventDefault();const now=performance.now();drag.speed=-(event.clientY-drag.lastY)/drag.scale/107/Math.max(.008,(now-drag.time)/1000);drag.lastY=event.clientY;drag.time=now;
 const raw=drag.start-delta/107;current=raw<0?raw*.25:raw>3?3+(raw-3)*.25:raw;target=current;animate();
});
function release(event,cancelled=false){
 if(!drag||event.pointerId!==drag.id)return;
 const state=drag;drag=null;if(picker.hasPointerCapture(event.pointerId))picker.releasePointerCapture(event.pointerId);
 if(!state.moved)return;suppressClick=true;
 const momentum=performance.now()-state.time<100?clamp(state.speed*.12,-.7,.7):0;
 choose(cancelled?selected:Math.round(clamp(current+momentum,0,3)));
}
picker.addEventListener('pointerup',event=>release(event));picker.addEventListener('pointercancel',event=>release(event,true));
picker.addEventListener('wheel',event=>{event.preventDefault();target=clamp(target+event.deltaY*.005,0,3);animate();clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>choose(Math.round(target)),120)},{passive:false});
picker.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();trigger.focus();return}const step=['ArrowDown','ArrowRight'].includes(event.key)?1:['ArrowUp','ArrowLeft'].includes(event.key)?-1:0;if(step||event.key==='Home'||event.key==='End'){event.preventDefault();choose(event.key==='Home'?0:event.key==='End'?3:clamp(Math.round(target)+step,0,3))}});
document.addEventListener('pointerdown',event=>{if(!picker.hidden&&!picker.contains(event.target)&&!trigger.contains(event.target))close()});
document.addEventListener('inward:tabchange',event=>{if(event.detail.tab!=='relax')close()});
document.addEventListener('inward:relaxmodechange',event=>{if(event.detail.mode!=='meditate')close()});
paint();
})();
