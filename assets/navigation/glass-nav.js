(()=>{
'use strict';
const nav=document.querySelector('#inward-preview .iw-glass-nav');if(!nav)return;
const buttons=Array.from(nav.querySelectorAll('[data-tab]'));
const selection=nav.querySelector('.iw-nav-selection');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let selected=buttons.findIndex(button=>button.classList.contains('iw-active'));
let position=0,velocity=0,target=0,width=0,barWidth=0,frame=0,last=0,pending=false;
function paint(){
 const speed=Math.min(1,Math.abs(velocity)/950);
 const stretch=reduceMotion.matches?1:1+speed*.075;
 selection.style.width=width+'px';
 selection.style.transform=`translateX(${position}px) scale(${stretch},${1-(stretch-1)*.28})`;
 // Reflection trails the moving capsule slightly, then settles at its upper rim.
 nav.style.setProperty('--iw-glint-x',(position+width/2-velocity*.012)+'px');
 nav.style.setProperty('--iw-glint-strength',String(reduceMotion.matches ? .15 : .15+speed*.75));
 selection.style.setProperty('--iw-local-glint',Math.max(-12,Math.min(12,-velocity*.012))+'px');
 nav.dataset.navPosition=position.toFixed(3);
}
function tick(now){
 const dt=Math.min(.04,Math.max(0,(now-last)/1000));last=now;
 // Closed-form damped spring: changing target retains the current position and
 // velocity, so rapid taps redirect the same capsule instead of restarting it.
 const omega=22,damping=.86,frequency=omega*Math.sqrt(1-damping*damping);
 const offset=position-target,a=offset,b=(velocity+damping*omega*offset)/frequency;
 const decay=Math.exp(-damping*omega*dt),cos=Math.cos(frequency*dt),sin=Math.sin(frequency*dt);
 position=target+decay*(a*cos+b*sin);
 velocity=decay*((b*frequency-damping*omega*a)*cos+(-a*frequency-damping*omega*b)*sin);
 if(Math.abs(position-target)<.04&&Math.abs(velocity)<.5){position=target;velocity=0;paint();nav.dataset.motion='idle';frame=0;return}
 paint();frame=requestAnimationFrame(tick);
}
function move(immediate=false){
 nav.dataset.selected=buttons[selected].dataset.tab;
 // A focused mobile composer temporarily hides the navigation. Wait until it
 // is visible before measuring, rather than animating toward zero-sized tabs.
 if(!nav.clientWidth){pending=true;return}
 pending=false;
 target=buttons[selected].offsetLeft;width=buttons[selected].offsetWidth;
 if(immediate||reduceMotion.matches){cancelAnimationFrame(frame);frame=0;position=target;velocity=0;paint();nav.dataset.motion='idle';return}
 nav.dataset.motion='moving';
 if(!frame){last=performance.now();frame=requestAnimationFrame(tick)}
}
function measure(){
 const nextWidth=nav.clientWidth;if(!nextWidth)return;
 if(nextWidth===barWidth){if(pending)move();return}
 if(barWidth)position*=nextWidth/barWidth;
 barWidth=nextWidth;move(true);
}
document.addEventListener('inward:tabchange',event=>{
 const index=buttons.findIndex(button=>button.dataset.tab===event.detail.tab);
 if(index<0)return;
 selected=index;move();
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
new ResizeObserver(measure).observe(nav);
measure();
})();
