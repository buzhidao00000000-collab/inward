(()=>{
'use strict';
const poses={"idle":{"left":[108.0,100.5,108.0,107.4035593725,102.4035593725,113.0,95.5,113.0,88.5964406275,113.0,83.0,107.4035593725,83.0,100.5,83.0,93.5964406275,88.5964406275,88.0,95.5,88.0,102.4035593725,88.0,108.0,93.5964406275,108.0,100.5],"right":[187.0,92.5,187.0,99.4035593725,181.4035593725,105.0,174.5,105.0,167.5964406275,105.0,162.0,99.4035593725,162.0,92.5,162.0,85.5964406275,167.5964406275,80.0,174.5,80.0,181.4035593725,80.0,187.0,85.5964406275,187.0,92.5],"mouth":[203.961,181.246,207.814,193.049,194.763,207.896,174.812,214.408,154.861,220.92,135.565,216.631,131.712,204.827,127.86,193.024,147.886,199.548,167.837,193.036,187.788,186.524,200.109,169.442,203.961,181.246],"nose":[131.5,145.5,152.5,144.5],"heart":0,"core":1,"halo":0.3,"heartScale":1},"inhale":{"left":[122.0,85.4999,122.0,93.508,115.508,99.9999,107.5,99.9999,99.4919,99.9999,93.0,93.508,93.0,85.4999,93.0,77.4918,99.4919,90.5,107.5,90.5,115.508,90.5,122.0,77.4918,122.0,85.4999],"right":[191.314,64.4693,193.871,72.0584,189.791,80.2831,182.202,82.8398,174.613,85.3964,166.388,81.3169,163.832,73.7278,161.275,66.1388,171.58,76.3937,179.169,73.837,186.758,71.2803,188.757,56.8803,191.314,64.4693],"mouth":[211.507,151.082,212.036,154.993,201.373,159.665,187.691,161.516,174.008,163.368,162.488,161.698,161.958,157.787,161.429,153.876,172.092,149.204,185.774,147.353,199.457,145.501,210.977,147.171,211.507,151.082],"nose":[168.5,116.5,189.5,115.5],"heart":1,"core":1.005,"halo":0.32,"heartScale":1},"compact":{"left":[135.0,90.4999,135.0,98.508,128.50799999999998,104.9999,120.5,104.9999,112.4919,104.9999,106.0,98.508,106.0,90.4999,106.0,82.4918,112.4919,95.5,120.5,95.5,128.50799999999998,95.5,135.0,82.4918,135.0,90.4999],"right":[181.314,73.4693,183.871,81.0584,179.791,89.2831,172.202,91.8398,164.613,94.3964,156.388,90.3169,153.832,82.7278,151.275,75.1388,161.58,85.3937,169.169,82.837,176.758,80.2803,178.757,65.8803,181.314,73.4693],"mouth":[199.8549,144.9574,200.2252,147.6951,192.7611,150.9655,183.1837,152.2612,173.6056,153.5576,165.5416,152.3886,165.1706,149.6509,164.8003,146.91320000000002,172.26440000000002,143.6428,181.8418,142.3471,191.41989999999998,141.0507,199.4839,142.2197,199.8549,144.9574],"nose":[171,117,187,116],"heart":1,"core":1.025,"halo":0.43,"heartScale":0.82},"exhale":{"left":[122.0,85.4999,122.0,93.508,115.508,99.9999,107.5,99.9999,99.4919,99.9999,93.0,93.508,93.0,85.4999,93.0,77.4918,99.4919,90.5,107.5,90.5,115.508,90.5,122.0,77.4918,122.0,85.4999],"right":[191.314,64.4693,193.871,72.0584,189.791,80.2831,182.202,82.8398,174.613,85.3964,166.388,81.3169,163.832,73.7278,161.275,66.1388,171.58,76.3937,179.169,73.837,186.758,71.2803,188.757,56.8803,191.314,64.4693],"mouth":[209.574,174.136,212.349,194.646,203.508,212.774,189.825,214.625,176.143,216.477,162.801,201.351,160.025,180.841,157.25,160.332,166.092,142.204,179.774,140.353,193.457,138.501,206.798,153.626,209.574,174.136],"nose":[168.5,116.5,189.5,115.5],"heart":0,"core":1.01,"halo":0.36,"heartScale":1},"relaxed":{"left":[117.0,91.4999,117.0,99.508,110.508,105.9999,102.5,105.9999,94.4919,105.9999,88.0,99.508,88.0,91.4999,88.0,83.4918,94.4919,96.5,102.5,96.5,110.508,96.5,117.0,83.4918,117.0,91.4999],"right":[198.314,69.4693,200.871,77.0584,196.791,85.2831,189.202,87.8398,181.613,90.3964,173.388,86.3169,170.832,78.7278,168.275,71.1388,178.58,81.3937,186.169,78.837,193.758,76.2803,195.757,61.8803,198.314,69.4693],"mouth":[210.80270000000002,177.05008,213.71644999999998,198.17538,204.4334,216.84722,190.06625,218.75375,175.70015,220.66131000000001,161.69105,205.08153,158.77625,183.95623,155.8625,162.83195999999998,165.1466,144.16012,179.5127,142.25359,193.87985,140.34603,207.8879,155.92478,210.80270000000002,177.05008],"nose":[166.5,118.5,191.5,117.5],"heart":0,"core":0.985,"halo":0.27,"heartScale":1.03}};
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>{n=clamp(n);return n*n*(3-2*n)};
function mix(a,b,t){const out={};for(const key of Object.keys(a))out[key]=Array.isArray(a[key])?a[key].map((n,i)=>n+(b[key][i]-n)*t):a[key]+(b[key]-a[key])*t;return out}
function sample(ms,initial=poses.idle){
 const total=Math.max(0,ms)/1000,cycle=Math.floor(total/13),position=total-cycle*13;
 let pose,phase,local;
 if(position<5){phase='inhale';local=position;pose=local<.9?mix(cycle===0?initial:poses.relaxed,poses.inhale,ease(local/.9)):mix(poses.inhale,poses.compact,ease((local-.9)/4.1))}
 else{phase='exhale';local=position-5;pose=local<.9?mix(poses.compact,poses.exhale,ease(local/.9)):mix(poses.exhale,poses.relaxed,ease((local-.9)/7.1))}
 const fade=ease(local/.24);
 return {pose,phase,labelIn:phase==='inhale'?fade:1-fade,labelEx:phase==='exhale'?fade:cycle===0?0:1-fade,time:ms};
}
const svg=document.getElementById('iw-breathing');if(!svg)return;
const find=id=>svg.querySelector('#'+id);
const left=find('breath-eye-left'),right=find('breath-eye-right'),mouth=find('breath-mouth'),heart=find('breath-heart');
const startButton=find('breath-start'),endButton=find('breath-end'),startText=find('breath-start-text'),status=find('breath-status');
const path=values=>'M'+values.slice(0,2).map(n=>n.toFixed(3)).join(',')+'C'+values.slice(2).map(n=>n.toFixed(3)).join(',')+'Z';
let mode='idle',raf=0,startedAt=0,initialPose=poses.idle,returnAt=0,returnFrom=null;
let current={pose:poses.idle,phase:'idle',labelIn:0,labelEx:0,time:0};
function apply(state){
 const p=state.pose;current=state;
 left.setAttribute('d',path(p.left));right.setAttribute('d',path(p.right));mouth.setAttribute('d',path(p.mouth));
 find('breath-nose-left').setAttribute('cx',p.nose[0]);find('breath-nose-left').setAttribute('cy',p.nose[1]);
 find('breath-nose-right').setAttribute('cx',p.nose[2]);find('breath-nose-right').setAttribute('cy',p.nose[3]);
 find('breath-nose-dots').setAttribute('opacity',1-p.heart);heart.setAttribute('opacity',p.heart);
 heart.setAttribute('transform',`translate(180 120) scale(${p.heartScale}) translate(-180 -120)`);
 find('breath-core').setAttribute('transform',`translate(146.5 143.5) scale(${p.core}) translate(-146.5 -143.5)`);
 find('breath-halo').setAttribute('fill-opacity',p.halo);
 find('breath-label-inhale').setAttribute('opacity',state.labelIn);find('breath-label-exhale').setAttribute('opacity',state.labelEx);
 find('breath-wind-inhale').setAttribute('opacity',state.labelIn*.8);find('breath-wind-exhale').setAttribute('opacity',state.labelEx*.8);
 svg.querySelectorAll('.breath-wind-line').forEach((line,i)=>{line.style.strokeDashoffset=String(-state.time*.036-i*13);line.style.opacity=String(.6+.25*Math.sin(state.time*.002+i))});
 if(svg.dataset.phase!==state.phase){svg.dataset.phase=state.phase;status.textContent=state.phase==='inhale'?'Inhale for 5 seconds':state.phase==='exhale'?'Exhale for 8 seconds':state.phase==='ending'?'Returning to rest':'Ready';svg.dispatchEvent(new CustomEvent('breathing:phase',{detail:{phase:state.phase}}))}
}
function frame(now){
 if(mode==='breathing')apply(sample(now-startedAt,initialPose));
 else if(mode==='ending'){
  const progress=clamp((now-returnAt)/1000),t=ease(progress);
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
