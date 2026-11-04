(()=>{
'use strict';
const root=document.getElementById('inward-preview'),phone=root?.querySelector('.iw-phone');if(!phone)return;
const overlay=document.createElement('div');overlay.className='iw-duration-overlay';overlay.hidden=true;
overlay.innerHTML=`<section class="iw-duration-sheet" role="dialog" aria-modal="true" aria-labelledby="iw-duration-title"><div class="iw-duration-handle" aria-hidden="true"></div><button class="iw-duration-close" type="button" aria-label="Close duration picker">×</button><h2 id="iw-duration-title">Meditation duration</h2><div class="iw-duration-readout" aria-hidden="true"><span class="iw-duration-number">20</span><span class="iw-duration-unit">min</span></div><div class="iw-duration-ruler" role="slider" tabindex="0" aria-label="Meditation duration in minutes" aria-orientation="horizontal" aria-valuemin="1" aria-valuemax="120" aria-valuenow="20" aria-valuetext="20 minutes"><div class="iw-duration-ticks" aria-hidden="true"></div><span class="iw-duration-pointer" aria-hidden="true"></span></div><div class="iw-duration-limits" aria-hidden="true"><span>1 min</span><span>2 h</span></div><button class="iw-duration-confirm" type="button">Start meditation</button><p class="iw-duration-footnote">Sound stops when the timer ends.</p></section>`;
phone.append(overlay);
const sheet=overlay.querySelector('section'),ruler=overlay.querySelector('.iw-duration-ruler'),track=overlay.querySelector('.iw-duration-ticks'),number=overlay.querySelector('.iw-duration-number'),confirm=overlay.querySelector('.iw-duration-confirm');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const min=1,max=120,step=12,clamp=n=>Math.max(min,Math.min(max,n));
const ticks=[],tickHeights=[],tickTargets=[],tickSpeeds=[];
let waveFrame=0,waveTime=0;
for(let minute=min;minute<=max;minute++){const tick=document.createElement('span');tick.className='iw-duration-tick'+(minute%5===0||minute===min?' is-major':'');tick.style.left=`${(minute-min)*step}px`;if(minute%15===0||minute===min){const label=document.createElement('span');label.textContent=minute;tick.append(label)}track.append(tick);ticks.push(tick)}
let request=null,returnFocus=null,closingTimer=0,value=20,position=20,target=20,velocity=0,raf=0,last=0,drag=null,displayed=20,numberTimer=0,openFrame=0;
function paint(){
 // Each tick retains its own spring state, leaving a trailing crest on fast swipes.
 ticks.forEach((tick,index)=>{const distance=Math.abs(index+min-position),influence=distance<7?Math.pow(Math.cos(distance/7*Math.PI/2),2):0;tickTargets[index]=6+46*influence;if(tickHeights[index]===undefined||reduced.matches){tickHeights[index]=tickTargets[index];tickSpeeds[index]=0;tick.style.setProperty('--tick-height',tickHeights[index]+'px')}});
 if(!reduced.matches&&!waveFrame&&tickTargets.some((height,i)=>Math.abs(height-tickHeights[i])>.025)){waveTime=0;waveFrame=requestAnimationFrame(animateWave)}
 track.style.transform=`translate3d(${-(position-min)*step}px,0,0)`;
 value=clamp(Math.round(position));ruler.setAttribute('aria-valuenow',String(value));ruler.setAttribute('aria-valuetext',`${value} ${value===1?'minute':'minutes'}`);
 if(value!==displayed){number.textContent=value;number.style.setProperty('--digit-shift',value>displayed?'5px':'-5px');number.classList.remove('is-changing');void number.offsetWidth;number.classList.add('is-changing');clearTimeout(numberTimer);numberTimer=setTimeout(()=>number.classList.remove('is-changing'),160);displayed=value}
}
function animateWave(now){
 const dt=waveTime?Math.min((now-waveTime)/1000,.024):1/60;waveTime=now;let moving=false;
 ticks.forEach((tick,i)=>{const delta=tickTargets[i]-tickHeights[i],speed=(tickSpeeds[i]||0)+(delta*170-(tickSpeeds[i]||0)*17)*dt;tickSpeeds[i]=speed;tickHeights[i]=Math.max(4,Math.min(56,tickHeights[i]+speed*dt));if(Math.abs(tickTargets[i]-tickHeights[i])>.025||Math.abs(speed)>.15)moving=true;else{tickHeights[i]=tickTargets[i];tickSpeeds[i]=0}tick.style.setProperty('--tick-height',tickHeights[i]+'px')});
 if(moving&&!overlay.hidden&&!reduced.matches)waveFrame=requestAnimationFrame(animateWave);else resetWave();
}
function resetWave(){cancelAnimationFrame(waveFrame);waveFrame=0;waveTime=0;ticks.forEach((tick,i)=>{tickHeights[i]=tickTargets[i];tickSpeeds[i]=0;tick.style.setProperty('--tick-height',tickHeights[i]+'px')})}
function tick(now){
 const dt=Math.min((now-(last||now))/1000,.032);last=now;
 const acceleration=(target-position)*220-velocity*28;velocity+=acceleration*dt;position=clamp(position+velocity*dt);paint();
 if(Math.abs(target-position)>.001||Math.abs(velocity)>.01){raf=requestAnimationFrame(tick)}else{position=target;velocity=0;raf=0;last=0;paint()}
}
function choose(next){target=clamp(Math.round(next));if(reduced.matches){position=target;velocity=0;paint();return}if(!raf){last=0;raf=requestAnimationFrame(tick)}}
function cancelMotion(){cancelAnimationFrame(raf);raf=0;last=0;velocity=0;if(drag&&ruler.hasPointerCapture(drag.id))ruler.releasePointerCapture(drag.id);drag=null;sheet.classList.remove('is-dragging')}
function close(restore=true){if(overlay.hidden)return;request=null;cancelAnimationFrame(openFrame);cancelMotion();position=target=value;paint();resetWave();overlay.classList.remove('is-open');clearTimeout(closingTimer);closingTimer=setTimeout(()=>{overlay.hidden=true},reduced.matches?0:260);if(restore&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true})}
function open(event){clearTimeout(closingTimer);cancelMotion();request=event.detail;returnFocus=document.activeElement;overlay.hidden=false;position=target=value;paint();resetWave();openFrame=requestAnimationFrame(()=>overlay.classList.add('is-open'));ruler.focus({preventScroll:true})}
ruler.addEventListener('pointerdown',event=>{if(event.button>0)return;event.preventDefault();cancelMotion();ruler.focus({preventScroll:true});const scale=phone.getBoundingClientRect().width/phone.offsetWidth;drag={id:event.pointerId,x:event.clientX,start:position,lastX:event.clientX,time:performance.now(),speed:0,scale};ruler.setPointerCapture(event.pointerId);sheet.classList.add('is-dragging')});
ruler.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const now=performance.now();drag.speed=-(event.clientX-drag.lastX)/drag.scale/step/Math.max(.008,(now-drag.time)/1000);drag.lastX=event.clientX;drag.time=now;position=clamp(drag.start-(event.clientX-drag.x)/drag.scale/step);target=position;paint()});
function release(event,cancelled=false){if(!drag||event.pointerId!==drag.id)return;const state=drag;drag=null;if(ruler.hasPointerCapture(event.pointerId))ruler.releasePointerCapture(event.pointerId);sheet.classList.remove('is-dragging');const momentum=!cancelled&&!reduced.matches&&performance.now()-state.time<100?Math.max(-8,Math.min(8,state.speed*.12)):0;choose(position+momentum)}
ruler.addEventListener('pointerup',event=>release(event));ruler.addEventListener('pointercancel',event=>release(event,true));ruler.addEventListener('lostpointercapture',event=>release(event,true));
ruler.addEventListener('wheel',event=>{event.preventDefault();choose(target+(Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY)/12)},{passive:false});
ruler.addEventListener('keydown',event=>{const delta={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,PageUp:10,PageDown:-10}[event.key];if(delta||event.key==='Home'||event.key==='End'){event.preventDefault();choose(event.key==='Home'?min:event.key==='End'?max:target+delta)}});
overlay.querySelector('.iw-duration-close').addEventListener('click',()=>close());
overlay.addEventListener('click',event=>{if(event.target===overlay)close()});
overlay.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close()}if(event.key==='Tab'){const elements=[overlay.querySelector('.iw-duration-close'),ruler,confirm],index=elements.indexOf(document.activeElement);if(event.shiftKey&&index===0){event.preventDefault();confirm.focus()}else if(!event.shiftKey&&index===2){event.preventDefault();elements[0].focus()}}});
confirm.addEventListener('click',()=>{const start=request?.start;if(!start)return;const minutes=value;close();start(minutes)});
document.addEventListener('inward:meditationrequest',open);
document.addEventListener('inward:tabchange',()=>close(false));document.addEventListener('inward:relaxmodechange',()=>close(false));
window.addEventListener('blur',()=>{if(drag)release({pointerId:drag.id},true)});
paint();
})();
