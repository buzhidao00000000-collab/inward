(()=>{
'use strict';
if(window.__inwardGlassPressInstalled)return;
window.__inwardGlassPressInstalled=true;
const held=new Map();
function resolve(node){
 const element=node instanceof Element?node:node?.parentElement;
 const control=element?.closest('#inward-preview button,.iw-photo-viewer-close,#breath-toggle');
 if(!control||control.disabled||control.getAttribute('aria-disabled')==='true')return null;
 return {control,surface:control.matches('[data-tab],[data-relax-mode]')?control.closest('.iw-glass-nav'):control};
}
function refresh(surface){surface.classList.toggle('iw-glass-pressed',Array.from(held.values()).some(record=>record.surface===surface))}
function begin(key,record){if(held.has(key))return;held.set(key,record);refresh(record.surface)}
function end(key){const record=held.get(key);if(!record)return;held.delete(key);refresh(record.surface)}
function releaseAll(){for(const key of Array.from(held.keys()))end(key)}
document.addEventListener('pointerdown',event=>{
 if(event.button>0)return;
 const target=resolve(event.target);if(!target)return;
 begin('pointer:'+event.pointerId,{...target,x:event.clientX,y:event.clientY});
},true);
for(const type of ['pointerup','pointercancel','lostpointercapture'])document.addEventListener(type,event=>end('pointer:'+event.pointerId),true);
document.addEventListener('pointermove',event=>{
 const key='pointer:'+event.pointerId,record=held.get(key);if(!record)return;
 // A horizontal drag or page scroll hands control back to its own gesture.
 if(Math.hypot(event.clientX-record.x,event.clientY-record.y)>9){end(key);return}
 const box=record.control.getBoundingClientRect();
 if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)end(key);
},true);
document.addEventListener('keydown',event=>{
 if(event.repeat||![' ','Enter'].includes(event.key))return;
 const target=resolve(event.target);if(target)begin('key:'+event.key,target);
},true);
document.addEventListener('keyup',event=>end('key:'+event.key),true);
document.addEventListener('focusout',event=>{
 for(const [key,record] of held)if(key.startsWith('key:')&&record.control.contains(event.target)&&!record.control.contains(event.relatedTarget))end(key);
},true);
window.addEventListener('blur',releaseAll);
document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAll()});
})();
