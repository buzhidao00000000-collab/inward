(()=>{
'use strict';
const root=document.getElementById('inward-preview');if(!root)return;
const phone=root.querySelector('.iw-phone'),base=root.querySelector('.iw-meditate-background');
const sceneTrigger=root.querySelector('.iw-meditate-controls button[aria-label="Scenery"]'),soundTrigger=root.querySelector('.iw-meditate-controls button[aria-label="Audio"]');
if(!base||!sceneTrigger||!soundTrigger)return;
const wheels=[];
function createWheel({id,trigger,items,label,kind,onChoose}){
let selected=-1;
const count=items.length,lastIndex=count-1;
const picker=document.createElement('div');picker.className='iw-scene-picker '+(id==='iw-sound-picker'?'iw-sound-picker':'');picker.id=id;picker.hidden=true;picker.setAttribute('role','group');picker.setAttribute('aria-label',label);picker.tabIndex=-1;
const cards=items.map((item,i)=>{const button=document.createElement('button');button.className='iw-scene-card';button.type='button';button.setAttribute('aria-label',`Choose ${kind} ${i+1}: ${item.name}`);button.setAttribute('aria-pressed',String(i===selected));const img=document.createElement('img');img.src=item.still||item.art;img.alt='';img.draggable=false;button.append(img);const caption=document.createElement('span');caption.className='iw-media-card-caption';caption.textContent=item.name;button.append(caption);picker.append(button);return button});
const status=document.createElement('span');status.className='iw-scene-picker-status';status.setAttribute('aria-live','polite');picker.append(status);phone.append(picker);
trigger.setAttribute('aria-controls',picker.id);trigger.setAttribute('aria-expanded','false');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let current=1,target=1,velocity=0,raf=0,last=0,drag=null,suppressClick=false,wheelTimer=0,entrance=1;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const wrap=n=>((n%count)+count)%count;
const offset=n=>wrap(n+count/2)-count/2;
const nearest=index=>current+offset(index-current);
function paint(){
 cards.forEach((card,i)=>{const d=offset(i-current),dist=Math.abs(d),scale=1-.16*Math.min(dist,2),x=10+26*d*d,y=158+d*107;
 card.style.transform=dist>2.5?'translate3d(0,0,0) scale(.68)':`translate3d(${x+(1-entrance)*65}px,${y}px,0) scale(${scale*entrance})`;
 card.style.visibility=dist>2.5?'hidden':'visible';
 card.style.opacity=String(clamp(1-dist*.19,.3,1)*clamp((2.5-dist)/.65,0,1)*entrance);card.style.zIndex=String(10-Math.round(dist*2));});
 updateCardArt();
}
function tick(now){
 const dt=Math.min((now-(last||now))/1000,.032);last=now;
 if(!drag){const acceleration=(target-current)*220-velocity*27;velocity+=acceleration*dt;current+=velocity*dt}
 entrance=reduced.matches?1:Math.min(1,entrance+dt*5);
 paint();
 if(drag||Math.abs(target-current)>.001||Math.abs(velocity)>.01||entrance<1)raf=requestAnimationFrame(tick);
 else{current=target=wrap(target);velocity=0;raf=0;last=0;paint()}
}
function updateCardArt(){cards.forEach((card,i)=>{const item=items[i],url=!picker.hidden&&card.style.visibility!=='hidden'&&(!reduced.matches||i===selected)&&(item.key!=='white-noise'||i===selected)?item.art:(item.still||item.art);const image=card.querySelector('img');if(image.getAttribute('src')!==url)image.src=url})}
reduced.addEventListener('change',updateCardArt);
function animate(){if(!raf){last=0;raf=requestAnimationFrame(tick)}}
async function choose(index){
 target=Math.round(index);selected=wrap(target);cards.forEach((c,i)=>c.setAttribute('aria-pressed',String(i===selected)));status.textContent=`${label}: ${items[selected].name}, ${selected+1} of ${items.length}`;animate();
 updateCardArt();onChoose(selected,status);
}
function open(){if(!picker.hidden)return;for(const other of wheels)other.close();picker.hidden=false;root.classList.add('iw-scene-picker-open');trigger.setAttribute('aria-expanded','true');current=target=selected<0?0:selected;velocity=0;entrance=reduced.matches?1:.8;updateCardArt();animate();picker.focus({preventScroll:true})}
function close(){
 if(picker.hidden)return;picker.hidden=true;updateCardArt();root.classList.remove('iw-scene-picker-open');trigger.setAttribute('aria-expanded','false');
 if(drag&&picker.hasPointerCapture(drag.id))picker.releasePointerCapture(drag.id);drag=null;
 cancelAnimationFrame(raf);raf=0;last=0;clearTimeout(wheelTimer);
}
trigger.addEventListener('click',()=>{if(picker.hidden)open();else close()});
cards.forEach((c,i)=>c.addEventListener('click',event=>{if(suppressClick&&event.detail){suppressClick=false;return}choose(nearest(i))}));
picker.addEventListener('pointerdown',event=>{if(event.button>0)return;event.preventDefault();suppressClick=false;velocity=0;drag={id:event.pointerId,y:event.clientY,start:current,lastY:event.clientY,time:performance.now(),speed:0,moved:false,scale:phone.getBoundingClientRect().width/phone.offsetWidth};});
picker.addEventListener('pointermove',event=>{
 if(!drag||event.pointerId!==drag.id)return;
 const delta=(event.clientY-drag.y)/drag.scale;
 if(!drag.moved&&Math.abs(delta)<4)return;
 if(!drag.moved){drag.moved=true;picker.setPointerCapture(event.pointerId)}
 event.preventDefault();const now=performance.now();drag.speed=-(event.clientY-drag.lastY)/drag.scale/107/Math.max(.008,(now-drag.time)/1000);drag.lastY=event.clientY;drag.time=now;
 current=drag.start-delta/107;target=current;animate();
});
function release(event,cancelled=false){
 if(!drag||event.pointerId!==drag.id)return;
 const state=drag;drag=null;if(picker.hasPointerCapture(event.pointerId))picker.releasePointerCapture(event.pointerId);
 if(!state.moved)return;suppressClick=true;
 const momentum=performance.now()-state.time<100?clamp(state.speed*.12,-.7,.7):0;
 choose(cancelled?nearest(selected<0?1:selected):Math.round(current+momentum));
}
picker.addEventListener('pointerup',event=>release(event));picker.addEventListener('pointercancel',event=>release(event,true));
picker.addEventListener('wheel',event=>{event.preventDefault();target+=event.deltaY*.005;animate();clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>choose(Math.round(target)),120)},{passive:false});
picker.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();trigger.focus();return}const step=['ArrowDown','ArrowRight'].includes(event.key)?1:['ArrowUp','ArrowLeft'].includes(event.key)?-1:0;if(step||event.key==='Home'||event.key==='End'){event.preventDefault();choose(event.key==='Home'?nearest(0):event.key==='End'?nearest(lastIndex):Math.round(target)+step)}});
document.addEventListener('pointerdown',event=>{if(!picker.hidden&&!picker.contains(event.target)&&!trigger.contains(event.target))close()});
document.addEventListener('inward:tabchange',event=>{if(event.detail.tab!=='relax')close()});
document.addEventListener('inward:relaxmodechange',event=>{if(event.detail.mode!=='meditate')close()});
paint();
const wheel={close,get isOpen(){return !picker.hidden}};wheels.push(wheel);return wheel;

}
const scenes=[{"name":"Starry lake","art":"assets/meditate/scenes/scene-1.jpg"},{"name":"Alpine dusk","art":"assets/meditate/scenes/alpine-dusk-unsplash.jpg"},{"name":"Fireflies","art":"assets/meditate/scenes/scene-3.svg"},{"name":"Seaside","art":"assets/meditate/scenes/scene-4.jpg"},{"name":"Misty forest","art":"assets/meditate/scenes/scene-5.jpg"},{"name":"Rainy lake","art":"assets/meditate/scenes/scene-6.jpg"},{"name":"Waterfall","art":"assets/meditate/scenes/scene-7.jpg"},{"name":"Forest canopy","art":"assets/meditate/scenes/forest-canopy-unsplash.jpg"},{"name":"Starry peaks","art":"assets/meditate/scenes/starry-peaks-unsplash.jpg"}];
const layers=[base,base.cloneNode()];layers[1].style.opacity='0';base.after(layers[1]);let front=0,loadVersion=0;
async function changeScene(index,status){
 stopMeditation();
 const version=++loadVersion,url=scenes[index].art,preload=new Image();preload.src=url;
 try{await preload.decode();if(version!==loadVersion)return;const next=1-front;layers[next].src=url;await layers[next].decode();if(version!==loadVersion)return;layers[next].style.opacity='1';layers[front].style.opacity='0';front=next;}catch{status.textContent='Image could not load. Please choose again.'}
}
createWheel({id:'iw-scene-picker',trigger:sceneTrigger,items:scenes,label:'Meditation scenery',kind:'scenery',onChoose:changeScene});
const sounds=[['rain','Rain'],['waves','Ocean waves'],['stream','Stream'],['birds','Forest birds'],['wind','Wind'],['white-noise','White noise'],['pink-noise','Pink noise'],['summer-night','Summer night'],['fireplace','Fireplace']].map(([key,name])=>({key,name,art:`assets/meditate/sound-art/${key}.gif`,still:`assets/meditate/sound-art/${key}.still.svg`}));
const audio=new Audio();audio.loop=true;audio.preload='none';audio.volume=.45;
let activeSound=-1,playVersion=0,sessionDeadline=0,sessionTimer=0;
const meditationButton=root.querySelector('.iw-meditate-start');
const soundStatus=document.createElement('span');soundStatus.className='iw-scene-picker-status';soundStatus.setAttribute('aria-live','polite');phone.append(soundStatus);
function syncPlayer(){
 const playing=!audio.paused;
 soundTrigger.setAttribute('aria-pressed',String(playing));
 if(meditationButton){
  meditationButton.setAttribute('aria-label',playing?'End meditation':'Start meditation');
  meditationButton.setAttribute('aria-pressed',String(playing));
  const image=meditationButton.querySelector('img');
  image.src=playing?'assets/breathing/end-button.svg':'assets/meditate/start-button.svg';image.alt=playing?'End':'Start';
 }
}
async function startAudio(minutes){
 const version=++playVersion;
 try{await audio.play();if(version!==playVersion)return;sessionDeadline=Date.now()+minutes*60000;sessionTimer=setInterval(checkSession,1000);soundStatus.textContent=`Playing ${sounds[activeSound].name} for ${minutes} minutes`;syncPlayer()}catch{if(version===playVersion){soundStatus.textContent='Audio could not start. Press Start to try again.';syncPlayer()}}
}
function changeSound(index,status){
 stopMeditation();activeSound=index;audio.src=`assets/meditate/sounds/${sounds[index].key}.m4a`;status.textContent=`Selected ${sounds[index].name}. Press Start to begin.`;root.classList.add('iw-sound-selected');
}
createWheel({id:'iw-sound-picker',trigger:soundTrigger,items:sounds,label:'Ambient sounds',kind:'sound',onChoose:changeSound});
meditationButton?.addEventListener('click',()=>{
 if(audio.paused){for(const wheel of wheels)wheel.close();document.dispatchEvent(new CustomEvent('inward:meditationrequest',{detail:{start(minutes){if(activeSound<0)changeSound(0,soundStatus);startAudio(minutes)}}}))}
 else{stopMeditation();soundStatus.textContent='Meditation ended'}
});
audio.addEventListener('play',syncPlayer);audio.addEventListener('pause',syncPlayer);audio.addEventListener('error',()=>{soundStatus.textContent='Audio could not load. Choose again.';syncPlayer()});
syncPlayer();
function checkSession(){if(sessionDeadline&&Date.now()>=sessionDeadline){stopMeditation();soundStatus.textContent='Meditation complete'}}
function stopMeditation(){++playVersion;clearInterval(sessionTimer);sessionTimer=0;sessionDeadline=0;audio.pause();syncPlayer()}
document.addEventListener('visibilitychange',checkSession);
document.addEventListener('inward:tabchange',event=>{if(event.detail.tab!=='relax')stopMeditation()});
document.addEventListener('inward:relaxmodechange',event=>{if(event.detail.mode!=='meditate')stopMeditation()});
window.addEventListener('pagehide',stopMeditation);
})();
