(()=>{
'use strict';
const poses={"idle":{"left":[108.0,100.5,108.0,107.4035593725,102.4035593725,113.0,95.5,113.0,88.5964406275,113.0,83.0,107.4035593725,83.0,100.5,83.0,93.5964406275,88.5964406275,88.0,95.5,88.0,102.4035593725,88.0,108.0,93.5964406275,108.0,100.5],"right":[187.0,92.5,187.0,99.4035593725,181.4035593725,105.0,174.5,105.0,167.5964406275,105.0,162.0,99.4035593725,162.0,92.5,162.0,85.5964406275,167.5964406275,80.0,174.5,80.0,181.4035593725,80.0,187.0,85.5964406275,187.0,92.5],"mouth":[203.961,181.246,207.814,193.049,194.763,207.896,174.812,214.408,154.861,220.92,135.565,216.631,131.712,204.827,127.86,193.024,147.886,199.548,167.837,193.036,187.788,186.524,200.109,169.442,203.961,181.246],"noseLeft":[136.0,145.5,136.0,143.01471862576142,133.98528137423858,141.0,131.5,141.0,129.01471862576142,141.0,127.0,143.01471862576142,127.0,145.5,127.0,147.98528137423858,129.01471862576142,150.0,131.5,150.0,133.98528137423858,150.0,136.0,147.98528137423858,136.0,145.5],"noseRight":[148.0,144.5,148.0,142.01471862576142,150.01471862576142,140.0,152.5,140.0,154.98528137423858,140.0,157.0,142.01471862576142,157.0,144.5,157.0,146.98528137423858,154.98528137423858,149.0,152.5,149.0,150.01471862576142,149.0,148.0,146.98528137423858,148.0,144.5],"noseScale":1,"mouthScale":1,"noseOutline":0,"circleScale":1,"faceY":0,"faceX":0,"noseLine":[132.142,145.3235,130.542,143.4235,133.89175,137.448325,141.267,143.8235,142.85025000000002,141.94825,146.61675,138.673275,149.01675,140.57325,151.41675,142.47325,150.4335,144.53175,149.64175,145.3235]},"inhale":{"left":[122.0,85.4999,122.0,93.508,115.508,99.9999,107.5,99.9999,99.4919,99.9999,93.0,93.508,93.0,85.4999,93.0,77.4918,99.4919,90.5,107.5,90.5,115.508,90.5,122.0,77.4918,122.0,85.4999],"right":[191.314,64.4693,193.871,72.0584,189.791,80.2831,182.202,82.8398,174.613,85.3964,166.388,81.3169,163.832,73.7278,161.275,66.1388,171.58,76.3937,179.169,73.837,186.758,71.2803,188.757,56.8803,191.314,64.4693],"mouth":[211.507,151.082,212.036,154.993,201.373,159.665,187.691,161.516,174.008,163.368,162.488,161.698,161.958,157.787,161.429,153.876,172.092,149.204,185.774,147.353,199.457,145.501,210.977,147.171,211.507,151.082],"noseLeft":[179.067,124.794,175.9835,122.1275,170.9835,117.1525,166.00437499999998,113.644125,161.02525,110.13575,156.067,108.094,153.067,111.294,149.317,115.294,150.067,120.16900000000001,154.6295,123.85650000000001,159.192,127.54400000000001,167.567,130.044,179.067,129.294],"noseRight":[179.067,124.794,181.40050000000002,122.294,185.40050000000002,116.669,189.62962500000003,112.4815,193.85875000000001,108.294,198.317,105.544,201.567,108.794,205.73950000000002,112.96600000000001,205.86450000000002,117.71600000000001,202.07137500000002,121.6105,198.27825,125.50500000000001,190.567,128.544,179.067,129.294],"noseScale":1,"mouthScale":1,"noseOutline":1,"circleScale":1,"faceY":18,"faceX":-5,"noseLine":[140.568,121.294,134.168,113.694,147.567,89.7933,177.068,115.294,183.401,107.793,198.467,94.6931,208.067,102.293,217.667,109.893,213.734,118.127,210.567,121.294]},"exhale":{"left":[122.0,85.4999,122.0,93.508,115.508,99.9999,107.5,99.9999,99.4919,99.9999,93.0,93.508,93.0,85.4999,93.0,77.4918,99.4919,90.5,107.5,90.5,115.508,90.5,122.0,77.4918,122.0,85.4999],"right":[191.314,64.4693,193.871,72.0584,189.791,80.2831,182.202,82.8398,174.613,85.3964,166.388,81.3169,163.832,73.7278,161.275,66.1388,171.58,76.3937,179.169,73.837,186.758,71.2803,188.757,56.8803,191.314,64.4693],"mouth":[209.574,151.136,212.349,171.646,203.508,189.774,189.825,191.625,176.143,193.477,162.801,178.351,160.025,157.841,157.25,137.332,166.092,119.20400000000001,179.774,117.35300000000001,193.457,115.501,206.798,130.626,209.574,151.136],"noseLeft":[173.0,116.5,173.0,114.01471862576143,170.98528137423858,112.0,168.5,112.0,166.01471862576142,112.0,164.0,114.01471862576143,164.0,116.5,164.0,118.98528137423857,166.01471862576142,121.0,168.5,121.0,170.98528137423858,121.0,173.0,118.98528137423857,173.0,116.5],"noseRight":[185.0,115.5,185.0,113.01471862576143,187.01471862576142,111.0,189.5,111.0,191.98528137423858,111.0,194.0,113.01471862576143,194.0,115.5,194.0,117.98528137423857,191.98528137423858,120.0,189.5,120.0,187.01471862576142,120.0,185.0,117.98528137423857,185.0,115.5],"noseScale":1,"mouthScale":1,"noseOutline":0,"circleScale":1,"faceY":18,"faceX":-5,"noseLine":[170.142,116.3235,168.542,114.4235,171.89175,108.448325,179.267,114.8235,180.85025000000002,112.94825,184.61675,109.673275,187.01675,111.57325,189.41675,113.47325000000001,188.4335,115.53175,187.64175,116.3235]}};
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>{n=clamp(n);return n*n*(3-2*n)};
const INTRO=.38,CHANGE=.28,RETURN=.45;
function mix(a,b,t){const out={};for(const key of Object.keys(a))out[key]=Array.isArray(a[key])?a[key].map((n,i)=>n+(b[key][i]-n)*t):a[key]+(b[key]-a[key])*t;return out}
// A small shared arc carries the facial landmarks from front view into the
// supplied right-facing artwork; the features do not breathe or squeeze.
function turn(a,b,t){
 const out=mix(a,b,t),arc=Math.sin(Math.PI*t);
 for(const key of ['left','right','mouth','noseLeft','noseRight','noseLine'])out[key]=out[key].map((n,i)=>n+arc*(i%2===0?5:-3));
 return out;
}
const inhalePeak={...poses.inhale,noseScale:1.18};
const exhalePeak={...poses.exhale,mouthScale:1.18};
function sample(ms,initial=poses.idle){
 const total=Math.max(0,ms)/1000,cycle=Math.floor(total/13),position=total-cycle*13;
 let pose,phase,local;
 if(position<5){
  phase='inhale';local=position;
  const duration=cycle===0?INTRO:CHANGE;
  pose=local<duration?(cycle===0?turn(initial,poses.inhale,ease(local/duration)):mix(exhalePeak,poses.inhale,ease(local/duration))):{...poses.inhale};
  // Only the inhaling nose and its outline grow; eye positions stay fixed.
  if(local>=duration)pose.noseScale=1+.18*ease((local-duration)/(5-duration));
  const from=cycle===0?initial.circleScale:1;
  pose.circleScale=from+(2/3-from)*ease(local/5);
 }else{
  phase='exhale';local=position-5;
  pose=local<CHANGE?mix(inhalePeak,poses.exhale,ease(local/CHANGE)):{...poses.exhale};
  // Only the exhaling mouth grows. Both circles expand together to full size.
  if(local>=CHANGE)pose.mouthScale=1+.18*ease((local-CHANGE)/(8-CHANGE));
  pose.circleScale=2/3+(1/3)*ease(local/8);
 }
 const fade=ease(local/.12);
 return {pose,phase,labelIn:phase==='inhale'?fade:0,labelEx:phase==='exhale'?fade:0,time:ms};
}
const svg=document.getElementById('iw-breathing');if(!svg)return;
const find=id=>svg.querySelector('#'+id);
const left=find('breath-eye-left'),right=find('breath-eye-right'),mouth=find('breath-mouth');
const startButton=find('breath-start'),endButton=find('breath-end'),startText=find('breath-start-text'),status=find('breath-status');
const path=values=>'M'+values.slice(0,2).map(n=>n.toFixed(3)).join(',')+'C'+values.slice(2).map(n=>n.toFixed(3)).join(',')+'Z';
const nosePath=values=>path(values).slice(0,-1)+'L'+values.slice(0,2).map(n=>n.toFixed(3)).join(',')+'Z';
let mode='idle',raf=0,startedAt=0,initialPose=poses.idle,returnAt=0,returnFrom=null;
let current={pose:poses.idle,phase:'idle',labelIn:0,labelEx:0,time:0};
function apply(state){
 const p=state.pose;current=state;
 left.setAttribute('d',path(p.left));right.setAttribute('d',path(p.right));mouth.setAttribute('d',path(p.mouth));
 // One pair of opaque paths morphs from dots to the inhaling nose: no stacked
 // fading copies, so intermediate frames cannot show a double nose.
 find('breath-nose-left-shape').setAttribute('d',nosePath(p.noseLeft));
 find('breath-nose-right-shape').setAttribute('d',nosePath(p.noseRight));
 find('breath-nose-features').setAttribute('transform',`translate(180 120) scale(${p.noseScale}) translate(-180 -120)`);
 find('breath-nose-outline').setAttribute('d',path(p.noseLine).slice(0,-1));
 find('breath-nose-outline').setAttribute('stroke-width',p.noseOutline);
 mouth.setAttribute('transform',`translate(185 154) scale(${p.mouthScale}) translate(-185 -154)`);
 find('breath-features').setAttribute('transform',`translate(${p.faceX} ${p.faceY})`);
 const circleTransform=`translate(144 144) scale(${p.circleScale}) translate(-144 -144)`;
 find('breath-core').setAttribute('transform',circleTransform);
 find('breath-halo').setAttribute('transform',circleTransform);
 find('breath-label-inhale').setAttribute('opacity',state.labelIn);find('breath-label-exhale').setAttribute('opacity',state.labelEx);
 find('breath-wind-inhale').setAttribute('opacity',state.labelIn*.8);find('breath-wind-exhale').setAttribute('opacity',state.labelEx*.8);
 svg.querySelectorAll('.breath-wind-line').forEach((line,i)=>{line.style.strokeDashoffset=String(-state.time*.036-i*13);line.style.opacity=String(.6+.25*Math.sin(state.time*.002+i))});
 if(svg.dataset.phase!==state.phase){svg.dataset.phase=state.phase;status.textContent=state.phase==='inhale'?'Inhale for 5 seconds':state.phase==='exhale'?'Exhale for 8 seconds':state.phase==='ending'?'Returning to rest':'Ready';svg.dispatchEvent(new CustomEvent('breathing:phase',{detail:{phase:state.phase}}))}
}
function frame(now){
 if(mode==='breathing')apply(sample(now-startedAt,initialPose));
 else if(mode==='ending'){
  const progress=clamp((now-returnAt)/(RETURN*1000)),t=ease(progress);
  apply({pose:mix(returnFrom.pose,poses.idle,t),phase:progress===1?'idle':'ending',labelIn:returnFrom.labelIn*(1-t),labelEx:returnFrom.labelEx*(1-t),time:returnFrom.time+(now-returnAt)});
  if(progress===1){mode='idle';startButton.setAttribute('aria-disabled','false');startText.textContent='Start';svg.dataset.running='false';return}
 }else return;
 raf=requestAnimationFrame(frame);
}
function start(){
 if(mode==='breathing')return;
 cancelAnimationFrame(raf);initialPose=current.pose;mode='breathing';startedAt=performance.now();
 startButton.setAttribute('aria-disabled','true');startText.textContent='Started';svg.dataset.running='true';frame(startedAt);
}
function end(){
 if(mode==='idle'||mode==='ending')return;
 const now=performance.now();returnFrom=current;
 cancelAnimationFrame(raf);mode='ending';returnAt=now;startButton.setAttribute('aria-disabled','false');startText.textContent='Start';frame(now);
}
function activate(button,action){button.addEventListener('click',action);button.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();action()}})}
activate(startButton,start);activate(endButton,end);
document.addEventListener('inward:tabchange',event=>{if(event.detail.tab!=='relax')end()});
apply(current);svg.dataset.running='false';
window.InwardBreathing=Object.freeze({start,end,sample:ms=>sample(ms),get phase(){return current.phase},get mode(){return mode}});
})();
