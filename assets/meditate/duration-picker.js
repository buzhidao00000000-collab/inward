(()=>{
'use strict';
const root=document.getElementById('inward-preview'),phone=root?.querySelector('.iw-phone');if(!phone)return;
const overlay=document.createElement('div');overlay.className='iw-duration-overlay';overlay.hidden=true;
overlay.innerHTML=`<section class="iw-duration-sheet" role="dialog" aria-modal="true" aria-labelledby="iw-duration-title"><div class="iw-duration-handle" aria-hidden="true"></div><button class="iw-duration-close" type="button" aria-label="Close duration picker">×</button><h2 id="iw-duration-title">Meditation duration</h2><div class="iw-duration-control"><div class="iw-duration-bubble" aria-hidden="true"><span>20</span><small>min</small></div><div class="iw-duration-track" aria-hidden="true"><div class="iw-duration-fill"></div></div><input class="iw-duration-range" type="range" min="1" max="120" step="1" value="20" aria-label="Meditation duration" aria-valuetext="20 minutes"><div class="iw-duration-labels" aria-hidden="true"><span>1 min</span><span>2 h</span></div></div><button class="iw-duration-confirm" type="button">Start meditation</button><p class="iw-duration-footnote">Sound stops when the timer ends.</p></section>`;
phone.append(overlay);
const sheet=overlay.querySelector('section'),range=overlay.querySelector('input'),bubble=overlay.querySelector('.iw-duration-bubble span'),confirm=overlay.querySelector('.iw-duration-confirm');
let request=null,returnFocus=null,closingTimer=0;
function paint(){const minutes=Number(range.value),progress=(minutes-1)/119;sheet.style.setProperty('--duration-progress',progress);bubble.textContent=minutes;confirm.textContent='Start meditation';range.setAttribute('aria-valuetext',`${minutes} minutes`)}
function close(restore=true){if(overlay.hidden)return;request=null;overlay.classList.remove('is-open');clearTimeout(closingTimer);closingTimer=setTimeout(()=>{overlay.hidden=true},220);if(restore&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true})}
function open(event){clearTimeout(closingTimer);request=event.detail;returnFocus=document.activeElement;overlay.hidden=false;paint();requestAnimationFrame(()=>overlay.classList.add('is-open'));range.focus({preventScroll:true})}
range.addEventListener('input',paint);
range.addEventListener('pointerdown',()=>sheet.classList.add('is-dragging'));
const release=()=>sheet.classList.remove('is-dragging');window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
overlay.querySelector('.iw-duration-close').addEventListener('click',()=>close());
overlay.addEventListener('click',event=>{if(event.target===overlay)close()});
overlay.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close()}if(event.key==='Tab'){const elements=[overlay.querySelector('.iw-duration-close'),range,confirm],index=elements.indexOf(document.activeElement);if(event.shiftKey&&index===0){event.preventDefault();confirm.focus()}else if(!event.shiftKey&&index===2){event.preventDefault();elements[0].focus()}}});
confirm.addEventListener('click',()=>{const start=request?.start;if(!start)return;const minutes=Number(range.value);close();start(minutes)});
document.addEventListener('inward:meditationrequest',open);
document.addEventListener('inward:tabchange',()=>close(false));document.addEventListener('inward:relaxmodechange',()=>close(false));
paint();
})();
