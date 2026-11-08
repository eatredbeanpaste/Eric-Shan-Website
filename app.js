/* Shared logic for index.html, about.html and projects.html.
   Requires data.js (T, S, CAP, IMG) to be loaded first. */
T.en.nHome='Home';T.zh.nHome='首页';
T.en.nFeat='Featured Projects';T.zh.nFeat='精选项目';
T.en.allProj='View all projects';T.zh.allProj='查看全部项目';
var PAGE=document.body.getAttribute('data-page'),FEAT=[0,1,4],fi=0,ft=null,cur='en';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function g(i){return document.getElementById(i)}
function tags(a){return '<ul class="tags">'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}

/* ---------- featured carousel (home page) ---------- */
function buildCar(d,l,MORE){
var s=FEAT.map(function(i,k){var p=i===0?d.feat:d.p[i-1];return '<div class="feat slide'+(k===fi?' on':'')+'" role="button" tabindex="'+(k===fi?0:-1)+'" data-i="'+i+'">'+(IMG[i]&&IMG[i][0]?'<img class="thumb" src="'+IMG[i][0]+'" alt="" loading="lazy">':'')+'<div><p class="when">'+p.w+'</p><h3>'+p.t+'</h3>'+tags(p.tags)+'<p class="sum">'+S[l][i]+'</p><span class="more">'+MORE+'</span></div></div>'}).join('');
var dots=FEAT.map(function(i,k){return '<button type="button" class="dot-b'+(k===fi?' on':'')+'" data-s="'+k+'" aria-label="'+(k+1)+'"></button>'}).join('');
g('feat').innerHTML='<div class="slides">'+s+'</div><div class="car-ctl"><button type="button" class="car-btn" data-d="-1" aria-label="Previous">‹</button><div class="dots">'+dots+'</div><button type="button" class="car-btn" data-d="1" aria-label="Next">›</button></div>'}
function go(n){fi=(n+FEAT.length)%FEAT.length;document.querySelectorAll('#feat .slide').forEach(function(e,k){e.classList.toggle('on',k===fi);e.tabIndex=k===fi?0:-1});document.querySelectorAll('#feat .dot-b').forEach(function(e,k){e.classList.toggle('on',k===fi)})}
function stop(){clearInterval(ft)}
function play(){stop();if(reduce)return;ft=setInterval(function(){if(!(g('dlg')&&g('dlg').open))go(fi+1)},6000)}
if(g('feat')){var F=g('feat');
F.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-d'))go(fi+ +b.getAttribute('data-d'));else if(b.hasAttribute('data-s'))go(+b.getAttribute('data-s'));play()});
F.addEventListener('mouseenter',stop);F.addEventListener('mouseleave',play);F.addEventListener('focusin',stop);F.addEventListener('focusout',play);
var tx=0;F.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
F.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40){go(fi+(dx<0?1:-1));play()}});
play()}

/* ---------- render ---------- */
function render(l){
var d=T[l],MORE=l==='zh'?'查看详情':'View details';document.documentElement.lang=l==='zh'?'zh-CN':'en';
window.CUR={d:d,l:l};
document.querySelectorAll('[data-k]').forEach(function(e){e.textContent=d[e.getAttribute('data-k')]});
if(g('feat'))buildCar(d,l,MORE);
if(g('grid')){var all=[d.feat].concat(d.p);g('grid').innerHTML=all.map(function(p,k){return '<div class="card" role="button" tabindex="0" data-i="'+k+'"><h3>'+p.t+'</h3><p class="when">'+p.w+'</p>'+tags(p.tags)+'<p>'+S[l][k]+'</p><span class="more">'+MORE+'</span></div>'}).join('')}
if(g('jobs'))g('jobs').innerHTML=d.jobs.map(function(j){return '<div class="job"><time>'+j.w+'</time><div><h3>'+j.t+', '+j.o+'</h3><ul>'+j.b.map(function(b){return '<li>'+b+'</li>'}).join('')+'</ul></div></div>'}).join('');
g('lang').textContent=l==='zh'?'EN':'中文';setBtn(l)}

/* ---------- theme ---------- */
var root=document.documentElement;
function isDark(){return root.getAttribute('data-theme')==='dark'}
function setBtn(l){var b=g('theme'),d=isDark(),z=l==='zh';b.innerHTML=d?'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';b.setAttribute('aria-label',d?(z?'切换到浅色模式':'Switch to light mode'):(z?'切换到深色模式':'Switch to dark mode'))}
try{var st=localStorage.getItem('theme');if(st==='dark'||st==='light')root.setAttribute('data-theme',st)}catch(e){}
g('theme').addEventListener('click',function(){var n=isDark()?'light':'dark';function ap(){root.setAttribute('data-theme',n);setBtn(cur)}if(document.startViewTransition&&!reduce){root.classList.add('theme-vt');document.startViewTransition(ap).finished.finally(function(){root.classList.remove('theme-vt')})}else ap();try{localStorage.setItem('theme',n)}catch(e){}});

/* ---------- nav highlight + scroll bar ---------- */
document.querySelectorAll('nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-p')===PAGE)});
(function(){var bi=document.querySelector('#batt i'),tk=false;function bat(){tk=false;var m=root.scrollHeight-innerHeight;bi.style.width=(m>0?Math.min(100,scrollY/m*100):0)+'%'}addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(bat)}},{passive:true});bat()})();

/* ---------- project demos ---------- */
function flyHTML(z){return '<div class="fly"><label for="duty">'+(z?'占空比':'Duty cycle')+' <b id="dv"></b></label><input id="duty" type="range" min="20" max="60" value="40"><svg id="pwm" viewBox="0 0 300 70" role="img" aria-label="PWM"><path id="pp" fill="none" stroke="currentColor" stroke-width="2"/></svg><p class="vo">'+(z?'输出电压':'Output voltage')+' <b id="vo"></b></p><div class="bar"><i id="vb"></i></div><p class="note">'+(z?'理想化反激变换器：连续导通模式，匝比 1:1，输入 20 V，Vout = Vin × D / (1 − D)。实际电路由 PI 控制器设定 PWM。':'Idealised flyback in continuous conduction, 1:1 turns ratio, 20 V input: Vout = Vin × D / (1 − D). In the real build a PI controller sets the PWM.')+'</p></div>'}
function flyInit(){var s=document.getElementById('duty');function u(){var D=s.value/100,v=20*D/(1-D),w=150*D;document.getElementById('dv').textContent=s.value+'%';document.getElementById('vo').textContent=v.toFixed(1)+' V';document.getElementById('vb').style.width=((v-5)/25*100)+'%';document.getElementById('pp').setAttribute('d','M0 60V10H'+w+'V60H150V10H'+(150+w)+'V60H300')}s.addEventListener('input',u);u()}
function R(id,l,a,b,v,s){return '<label for="'+id+'">'+l+' <b id="'+id+'v"></b></label><input id="'+id+'" type="range" min="'+a+'" max="'+b+'" value="'+v+'" step="'+(s||1)+'">'}
function chip(id,t){return '<span class="chip" id="'+id+'">'+t+'</span>'}
var DEMO={4:{h:flyHTML,i:flyInit},
0:{h:function(z){return '<div class="fly">'+R('mv',z?'附近的运动强度':'Movement near the nodes',0,10,0)+'<svg viewBox="0 0 300 70" role="img" aria-label="CSI"><path d="M0 27H300M0 43H300" stroke="currentColor" stroke-dasharray="4 4" opacity=".4" fill="none"/><path id="cs" fill="none" stroke="currentColor" stroke-width="2"/></svg><p class="vo">'+chip('rc','')+'</p><p class="note">'+(z?'模拟信号，非实测数据。运动会扰动 Wi-Fi 信道状态信息 (CSI)，波动超过阈值（虚线）即判定为检测到。':'Simulated signal, not measured data. Movement disturbs the Wi-Fi Channel State Information (CSI); when it swings past the threshold (dashed lines) a detection is triggered.')+'</p></div>'},
i:function(){var s=g('mv'),z=window.CUR.l==='zh';function u(){var m=s.value/10,d='',mx=0;for(var k=0;k<60;k++){var r=Math.sin(k*12.9898)*43758.5453%1,v=r*(.08+.9*m)+m*.5*Math.sin(k*.45);mx=Math.max(mx,Math.abs(v));d+=(k?'L':'M')+(k*300/59).toFixed(1)+' '+(35-v*20).toFixed(1)}g('cs').setAttribute('d',d);g('mvv').textContent=s.value+'/10';var t=mx>.4;g('rc').classList.toggle('on',t);g('rc').textContent=t?(z?'已检测到运动':'Movement detected'):(z?'无运动':'Clear')}s.addEventListener('input',u);u()}},
1:{h:function(z){return '<div class="fly">'+R('bv',z?'电池电压 (V)':'Battery voltage (V)',11,12.8,12.8,.1)+'<p class="vo" id="bl"></p><p>'+chip('bz',z?'蜂鸣器':'Buzzer')+chip('rl',z?'继电器动作（断开负载）':'Relay on (load disconnected)')+'</p><p class="note">'+(z?'示意阈值，仅用于演示，实际电路阈值可能不同。':'')+'</p></div>'},
i:function(){var s=g('bv'),C=['#22c55e','#f59e0b','#ef4444'];
function u(){var v=Math.round(+s.value*10)/10,cut=v<11.5,st=cut?-1:v>12.2?0:v>11.8?1:2,h='';
for(var k=0;k<3;k++){var on=st===k;h+='<span class="dot'+(on?' on':'')+'"'+(on?' style="background:'+C[k]+';border-color:'+C[k]+';box-shadow:0 0 10px '+C[k]+'"':'')+'></span>'}
g('bl').innerHTML=h;g('bvv').textContent=v.toFixed(1)+' V';g('bz').classList.toggle('on',st===2);g('rl').classList.toggle('on',cut)}
s.addEventListener('input',u);u()}},
2:{h:function(z){return '<div class="fly">'+R('tl',z?'面板倾角':'Panel tilt',0,90,40)+'<svg viewBox="0 0 300 90" role="img" aria-label="Energy vs tilt"><path id="sc" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><path d="M133 5V85" stroke="currentColor" stroke-dasharray="4 4" opacity=".5"/><circle id="sm" r="6" fill="currentColor"/></svg><p class="vo">'+(z?'相对年发电量 ':'Relative annual energy ')+'<b id="se"></b></p><p class="note">'+(z?'简化模型：新西兰纬度下约 40° 倾角发电量最高，这也是支架采用的角度（虚线）。':'Simplified model: around 40° gives the most energy at New Zealand’s latitude, which is the angle the mount holds (dashed line).')+'</p></div>'},
i:function(){var s=g('tl');function E(t){return Math.cos((t-40)*Math.PI/180)*100}function X(t){return t/90*300}function Y(t){return 80-(E(t)-60)/40*70}var d='';for(var t=0;t<=90;t+=3)d+=(t?'L':'M')+X(t).toFixed(1)+' '+Y(t).toFixed(1);g('sc').setAttribute('d',d);function u(){var t=+s.value;g('tlv').textContent=t+'°'+(Math.abs(t-40)<2?' ✓':'');g('se').textContent=E(t).toFixed(0)+'%';g('sm').setAttribute('cx',X(t));g('sm').setAttribute('cy',Y(t))}s.addEventListener('input',u);u()}}};

/* ---------- project dialog + lightbox (home and projects pages) ---------- */
var dlg=g('dlg');
if(dlg){
var lbI=0,lbL=[],lb=document.createElement('div');lb.id='lb';lb.hidden=true;lb.innerHTML='<button id="lp" aria-label="Previous">‹</button><img alt=""><button id="ln" aria-label="Next">›</button><button id="lx" aria-label="Close">×</button>';dlg.appendChild(lb);
function lbShow(k){lbI=(k+lbL.length)%lbL.length;var m=lb.querySelector('img');m.src=lbL[lbI].src;m.alt=lbL[lbI].alt}
dlg.addEventListener('click',function(e){var t=e.target;if(t.matches&&t.matches('.gal img')){lbL=[].slice.call(dlg.querySelectorAll('.gal img'));lb.hidden=false;lbShow(lbL.indexOf(t))}else if(t.id==='lx'||t===lb)lb.hidden=true;else if(t.id==='lp')lbShow(lbI-1);else if(t.id==='ln')lbShow(lbI+1);else if(t===dlg)dlg.close()});
dlg.addEventListener('cancel',function(e){if(!lb.hidden){e.preventDefault();lb.hidden=true}});
dlg.addEventListener('close',function(){lb.hidden=true});
dlg.addEventListener('keydown',function(e){if(!lb.hidden){if(e.key==='ArrowLeft')lbShow(lbI-1);if(e.key==='ArrowRight')lbShow(lbI+1)}});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)lbShow(lbI+(dx<0?1:-1))});
function openP(i){var C=window.CUR,d=C.d,z=C.l==='zh',p=i===0?d.feat:d.p[i-1],im=IMG[i]||[];
g('dbody').innerHTML='<h3>'+p.t+'</h3><p class="when">'+p.w+'</p>'+tags(p.tags)+'<p>'+p.d+'</p>'+(p.r?'<p class="dres">'+p.r+'</p>':'')+(p.x?p.x.map(function(s){return '<h4>'+s.h+'</h4><p>'+s.p+'</p>'}).join(''):'')+(DEMO[i]?DEMO[i].h(z):'')+'<div class="gal">'+CAP[i].map(function(c,k){if(!im[k])return '';var cap=c.split('|')[z?1:0];return '<figure><img src="'+im[k]+'" alt="'+cap+'" loading="lazy"><figcaption>'+cap+'</figcaption></figure>'}).join('')+'</div>';
if(DEMO[i])DEMO[i].i();dlg.showModal();dlg.scrollTop=0}
document.addEventListener('click',function(e){var c=e.target.closest('[data-i]');if(c)openP(+c.getAttribute('data-i'))});
document.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){var c=e.target.closest&&e.target.closest('[data-i]');if(c){e.preventDefault();openP(+c.getAttribute('data-i'))}}});
g('close').addEventListener('click',function(){dlg.close()});
}

/* ---------- paper plane ---------- */
(function(){
var p=g('plane');if(!p||reduce)return;
var t=0,last=performance.now(),TILT=20;
function pos(t){var w=innerWidth,h=innerHeight;return [w/2+w*.42*Math.cos(t),h*.4+h*.28*Math.sin(t)+Math.sin(t*3)*12]}
function frame(now){var dt=Math.min(now-last,50);last=now;t-=dt*.00035;
var a=pos(t),b=pos(t-.01),ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI+TILT;
p.style.transform='translate('+(a[0]-32)+'px,'+(a[1]-24)+'px) rotate('+ang+'deg)';
p.style.opacity=Math.max(0,1-scrollY/(innerHeight*.8));requestAnimationFrame(frame)}
requestAnimationFrame(frame)})();

/* ---------- language ---------- */
try{var s=localStorage.getItem('lang');if(s==='zh'||s==='en')cur=s;else if((navigator.language||'').slice(0,2)==='zh')cur='zh'}catch(e){}
render(cur);
g('lang').addEventListener('click',function(){cur=cur==='en'?'zh':'en';render(cur);try{localStorage.setItem('lang',cur)}catch(e){}});
