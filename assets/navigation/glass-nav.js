(()=>{
'use strict';
const nav=document.querySelector('#inward-preview .iw-glass-nav');if(!nav)return;
const buttons=Array.from(nav.querySelectorAll('[data-tab]'));
const selection=nav.querySelector('.iw-nav-selection');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let selected=buttons.findIndex(button=>button.classList.contains('iw-active'));
let position=0,target=0,width=0,barWidth=0,feedback=0,pending=false,playback=null,shapePlayback=null,generation=0,lastX=0,lastTime=0;
nav.dataset.engine='motion-14.7.1';
nav.dataset.build='nav5-glass-lift';
function currentX(){
 const transform=getComputedStyle(selection).transform;
 return transform==='none'?position:new DOMMatrixReadOnly(transform).m41;
}
function reflect(x,velocity=0){
 position=x;nav.dataset.navPosition=x.toFixed(3);
 const fraction=Math.max(0,Math.min(1,(x+width/2)/Math.max(1,barWidth)));
 nav.style.setProperty('--iw-light-angle',(110+fraction*65)+'deg');
 nav.style.setProperty('--iw-glint-x',(x+width/2)+'px');
 selection.style.setProperty('--iw-local-light',(48+Math.max(-18,Math.min(18,-velocity*.016)))+'%');
}
function stop(){
 const x=currentX(),style=getComputedStyle(selection);
 const snapshot={x,height:parseFloat(style.height),top:parseFloat(style.top)};
 generation++;
 if(playback){playback.stop();playback=null}
 if(shapePlayback){shapePlayback.stop();shapePlayback=null}
 cancelAnimationFrame(feedback);feedback=0;
 selection.style.transform=`translateX(${x}px)`;
 selection.style.height=snapshot.height+'px';selection.style.top=snapshot.top+'px';
 return snapshot;
}
function follow(now){
 const x=currentX(),dt=Math.max(1,now-lastTime);
 reflect(x,(x-lastX)*1000/dt);lastX=x;lastTime=now;
 if(playback||shapePlayback)feedback=requestAnimationFrame(follow);
}
function move(immediate=false){
 nav.dataset.selected=buttons[selected].dataset.tab;
 if(!nav.clientWidth){pending=true;return}
 pending=false;
 const from=stop();
 target=buttons[selected].offsetLeft;width=buttons[selected].offsetWidth;
 selection.style.width=width+'px';
 if(immediate){
  selection.style.transform=`translateX(${target}px)`;selection.style.height='55px';selection.style.top='7.5px';
  reflect(target);nav.dataset.motion='idle';return;
 }
 const version=++generation;
 nav.dataset.motion='moving';lastX=from.x;lastTime=performance.now();
 const duration=reduceMotion.matches ? .32 : .4;
 const lift=nav.clientHeight*1.5,liftTop=(nav.clientHeight-lift)/2;
 // Color changes immediately; the glass lens follows 20–35ms later, then lands.
 playback=window.Motion.animateMini(selection,{transform:[`translateX(${from.x}px)`,`translateX(${target}px)`]},{duration:reduceMotion.matches ? .21 : .26,delay:reduceMotion.matches ? .02 : .035,ease:[.4,0,.2,1]});
 shapePlayback=window.Motion.animateMini(selection,{height:[from.height+'px',lift+'px',lift+'px','55px'],top:[from.top+'px',liftTop+'px',liftTop+'px','7.5px']},{duration,times:[0,.18,.72,1],ease:[.2,.65,.3,1]});
 feedback=requestAnimationFrame(follow);
 playback.then(()=>{if(version===generation)nav.dataset.motion='landing'});
 Promise.all([playback,shapePlayback]).then(()=>{
  if(version!==generation)return;
  playback=null;shapePlayback=null;cancelAnimationFrame(feedback);feedback=0;
  selection.style.transform=`translateX(${target}px)`;selection.style.height='55px';selection.style.top='7.5px';
  reflect(target);nav.dataset.motion='idle';
 });
}

function measure(){
 const next=nav.clientWidth;if(!next)return;
 if(next===barWidth){if(pending)move();return}
 barWidth=next;move(true);
}
document.addEventListener('inward:tabchange',event=>{
 const index=buttons.findIndex(button=>button.dataset.tab===event.detail.tab);
 if(index<0)return;selected=index;move();
});
nav.addEventListener('keydown',event=>{
 const current=buttons.indexOf(document.activeElement);if(current<0)return;
 let next=current;
 if(event.key==='ArrowRight')next=(current+1)%buttons.length;
 else if(event.key==='ArrowLeft')next=(current+buttons.length-1)%buttons.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=buttons.length-1;
 else return;
 event.preventDefault();buttons[next].focus();buttons[next].click();
});
reduceMotion.addEventListener('change',()=>move(true));
new ResizeObserver(measure).observe(nav);measure();
})();
