// ====== WC2026 VAPOR CASINO - APP.JS ======
var M=[],cf='all',myTeam='',curBetMatch=null,curBetType='qp',curQPPick='',curSP=[0,0],curPL={};
var G={lv:1,xp:0,xpN:100,gold:50,streak:0,bestStreak:0,matches:0,stage:'group',teamFlag:'',ach:[],bets:{},stats:{w:0,l:0,total:0,net:0}};

var TEAMS=[
  {f:"🇲🇽",n:"墨西哥",g:"A"},{f:"🇿🇦",n:"南非",g:"A"},{f:"🇰🇷",n:"韩国",g:"A"},{f:"🇨🇿",n:"捷克",g:"A"},
  {f:"🇨🇦",n:"加拿大",g:"B"},{f:"🇧🇦",n:"波黑",g:"B"},{f:"🇶🇦",n:"卡塔尔",g:"B"},{f:"🇨🇭",n:"瑞士",g:"B"},
  {f:"🇧🇷",n:"巴西",g:"C"},{f:"🇲🇦",n:"摩洛哥",g:"C"},{f:"🇭🇹",n:"海地",g:"C"},{f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",n:"苏格兰",g:"C"},
  {f:"🇺🇸",n:"美国",g:"D"},{f:"🇵🇾",n:"巴拉圭",g:"D"},{f:"🇦🇺",n:"澳大利亚",g:"D"},{f:"🇹🇷",n:"土耳其",g:"D"},
  {f:"🇩🇪",n:"德国",g:"E"},{f:"🇨🇼",n:"库拉索",g:"E"},{f:"🇨🇮",n:"科特迪瓦",g:"E"},{f:"🇪🇨",n:"厄瓜多尔",g:"E"},
  {f:"🇳🇱",n:"荷兰",g:"F"},{f:"🇯🇵",n:"日本",g:"F"},{f:"🇹🇳",n:"突尼斯",g:"F"},{f:"🇸🇪",n:"瑞典",g:"F"},
  {f:"🇧🇪",n:"比利时",g:"G"},{f:"🇪🇬",n:"埃及",g:"G"},{f:"🇮🇷",n:"伊朗",g:"G"},{f:"🇳🇿",n:"新西兰",g:"G"},
  {f:"🇪🇸",n:"西班牙",g:"H"},{f:"🇨🇻",n:"佛得角",g:"H"},{f:"🇸🇦",n:"沙特",g:"H"},{f:"🇺🇾",n:"乌拉圭",g:"H"},
  {f:"🇫🇷",n:"法国",g:"I"},{f:"🇸🇳",n:"塞内加尔",g:"I"},{f:"🇮🇶",n:"伊拉克",g:"I"},{f:"🇳🇴",n:"挪威",g:"I"},
  {f:"🇦🇷",n:"阿根廷",g:"J"},{f:"🇩🇿",n:"阿尔及利亚",g:"J"},{f:"🇦🇹",n:"奥地利",g:"J"},{f:"🇯🇴",n:"约旦",g:"J"},
  {f:"🇵🇹",n:"葡萄牙",g:"K"},{f:"🇨🇩",n:"民主刚果",g:"K"},{f:"🇺🇿",n:"乌兹别克斯坦",g:"K"},{f:"🇨🇴",n:"哥伦比亚",g:"K"},
  {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"英格兰",g:"L"},{f:"🇭🇷",n:"克罗地亚",g:"L"},{f:"🇬🇭",n:"加纳",g:"L"},{f:"🇵🇦",n:"巴拿马",g:"L"}
];

var STAGES=[
  {id:'group',icon:'🏟️',label:'小组赛',xp:0},{id:'r32',icon:'⚔️',label:'32强',xp:25},
  {id:'r16',icon:'🗡️',label:'16强',xp:35},{id:'qf',icon:'👑',label:'1/4决赛',xp:40},
  {id:'sf',icon:'🔥',label:'半决赛',xp:50},{id:'final',icon:'🏆',label:'决赛',xp:100}
];

var ACHS=[
  {id:'first',icon:'🥇',name:'首战告捷',desc:'观看第一场'},
  {id:'firstbet',icon:'🎰',name:'初入赌场',desc:'完成首次下注'},
  {id:'group3',icon:'🎯',name:'小组全通',desc:'小组赛全结束'},
  {id:'r32c',icon:'⚔️',name:'32强通关',desc:'32强结束'},
  {id:'prophet',icon:'🔮',name:'神算子',desc:'连续3场猜对'},
  {id:'gambler',icon:'💀',name:'赌徒',desc:'单日下注超100💰'},
  {id:'highroller',icon:'💎',name:'豪赌客',desc:'精确比分猜对'},
  {id:'lv5',icon:'⭐',name:'老司机',desc:'Lv.5'},
  {id:'lv10',icon:'🌟',name:'大师',desc:'Lv.10'},
  {id:'rich',icon:'💰',name:'百万富翁',desc:'累计金币超500'},
  {id:'streak5',icon:'🔥',name:'连中五元',desc:'连续5场猜对'},
  {id:'champ',icon:'🏆',name:'世界之巅',desc:'决赛结束'}
];

var QUESTS=[
  {id:'q1',text:'查看今日赛程',xp:10},{id:'q2',text:'查看任意小组赛程',xp:15},
  {id:'q3',text:'搜索一支球队',xp:10},{id:'q4',text:'查看淘汰赛对阵',xp:20},{id:'q5',text:'下注一场比赛',xp:25}
];

var BET_COSTS={qp:10,sp:20,pl:30};
var BET_PAYOUTS={qp:2,sp:5,pl:8};
var BET_XP={qp:5,sp:15,pl:30};

// ====== PLAYER SELECT ======
function buildTeamGrid(){
  var g=document.getElementById('tgr');
  TEAMS.forEach(function(t){
    var d=document.createElement('div');d.className='tp';
    d.innerHTML='<div class="fl">'+t.f+'</div><div class="nm">'+t.n+'</div>';
    d.onclick=function(){
      document.querySelectorAll('.tp').forEach(function(x){x.classList.remove('sel')});
      d.classList.add('sel');myTeam=t.n;document.getElementById('bs2').disabled=false;
    };
    g.appendChild(d);
  });
}

function startGame(){
  var t=TEAMS.find(function(x){return x.n===myTeam});G.teamFlag=t?t.f:'';
  document.getElementById('ps').classList.add('hid');
  document.getElementById('hud').classList.add('active');
  document.getElementById('stb').style.display='flex';
  loadSave();updateHUD();buildMap();buildQuests();buildAch();
  showToast('🎮 GAME START',G.teamFlag+' '+myTeam+'! 赌场已开张🎰');
  completeQuest('q1');
}

// ====== SAVE/LOAD ======
function save(){try{localStorage.setItem('wc2026',JSON.stringify({myTeam:myTeam,G:G}))}catch(e){}}
function loadSave(){
  try{
    var s=localStorage.getItem('wc2026');
    if(s){var d=JSON.parse(s);if(d.myTeam)myTeam=d.myTeam;if(d.G){
      // Merge carefully
      G.lv=d.G.lv||1;G.xp=d.G.xp||0;G.xpN=d.G.xpN||100;
      G.gold=d.G.gold||50;G.streak=d.G.streak||0;G.bestStreak=d.G.bestStreak||0;
      G.stage=d.G.stage||'group';G.teamFlag=d.G.teamFlag||'';
      G.ach=d.G.ach||[];G.bets=d.G.bets||{};
      G.stats=d.G.stats||{w:0,l:0,total:0,net:0};
    }}
  }catch(e){}
}

// ====== HUD ======
function updateHUD(){
  document.getElementById('hlv').textContent='LV.'+G.lv;
  var hp=calcHP();
  document.getElementById('hpf').style.width=hp+'%';
  document.getElementById('hpv').textContent=hp;
  var xpPct=Math.min(100,Math.floor(G.xp/G.xpN*100));
  document.getElementById('xpf').style.width=xpPct+'%';
  document.getElementById('xpv').textContent=G.xp+'/'+G.xpN;
  document.getElementById('hgV').textContent=G.gold;
  document.getElementById('hst').textContent=G.streak>1?'🔥x'+G.streak:'';
  var tm=M.filter(function(m){return isMyTeam(m)}).length;
  document.getElementById('htm').textContent=tm?'⭐'+tm:'';
  var activeBets=Object.keys(G.bets).filter(function(k){var b=G.bets[k];return b&&!b.resolved}).length;
  document.getElementById('hbet').textContent=activeBets?'🎰'+activeBets:'';
  // Stats bar
  document.getElementById('stW').textContent=G.stats.w;
  document.getElementById('stL').textContent=G.stats.l;
  var total=G.stats.w+G.stats.l;
  document.getElementById('stA').textContent=total?Math.round(G.stats.w/total*100)+'%':'0%';
  document.getElementById('stP').textContent=G.stats.total;
  document.getElementById('stR').textContent=(G.stats.net>=0?'+':'')+G.stats.net+'💰';
  // Rich achievement
  if(G.gold>=500&&G.ach.indexOf('rich')<0)unlock('rich');
  save();
}
function calcHP(){var fin=M.filter(function(m){return m.r}).length;return Math.floor(fin/Math.max(M.length,1)*100)||0}
function addXP(n){G.xp+=n;G.gold+=Math.floor(n/2);while(G.xp>=G.xpN){G.xp-=G.xpN;G.lv++;G.xpN=Math.floor(G.xpN*1.4);showToast('⬆️ LEVEL UP!','Lv.'+G.lv);if(G.lv>=5)unlock('lv5');if(G.lv>=10)unlock('lv10')}updateHUD()}

// ====== MAP ======
function buildMap(){
  var c=document.getElementById('mnd');c.innerHTML='';
  var si=STAGES.findIndex(function(s){return s.id===G.stage});
  STAGES.forEach(function(s,i){
    if(i>0){var l=document.createElement('div');l.className='mc3'+(i<=si?' act':'');c.appendChild(l)}
    var d=document.createElement('div');
    d.className='nd'+(i>si?' lk':'')+(i===si?' cur':'')+(i<si?' cl':'');
    d.innerHTML='<div class="ni">'+s.icon+'</div><div class="nl">'+s.label+'</div>';
    c.appendChild(d);
  });
}

// ====== QUESTS ======
function buildQuests(){
  var c=document.getElementById('qtl');c.innerHTML='';
  var done=JSON.parse(localStorage.getItem('wc2026q')||'[]');
  QUESTS.forEach(function(q){
    var d=document.createElement('div');d.className='qi';
    var isDone=done.indexOf(q.id)>=0;
    d.innerHTML='<div class="qc'+(isDone?' dn':'')+'">'+(isDone?'✓':'')+'</div><div class="qt3">'+q.text+'</div><div class="qx">+'+q.xp+'xp</div>';
    c.appendChild(d);
  });
}
function completeQuest(id){
  var done=JSON.parse(localStorage.getItem('wc2026q')||'[]');
  if(done.indexOf(id)>=0)return;done.push(id);localStorage.setItem('wc2026q',JSON.stringify(done));
  var q=QUESTS.find(function(x){return x.id===id});if(q)addXP(q.xp);
  showToast('📋 QUEST!',q?q.text:'');buildQuests();
}

// ====== ACHIEVEMENTS ======
function buildAch(){
  var c=document.getElementById('agl');c.innerHTML='';
  ACHS.forEach(function(a){
    var d=document.createElement('div');var ul=G.ach.indexOf(a.id)>=0;
    d.className='ab'+(ul?' ul':' lk2');
    d.innerHTML='<div class="ai">'+a.icon+'</div><div class="an">'+a.name+'</div>';d.title=a.desc;c.appendChild(d);
  });
  document.getElementById('ac2v').textContent=G.ach.length+'/'+ACHS.length;
}
function unlock(id){if(G.ach.indexOf(id)<0){G.ach.push(id);var a=ACHS.find(function(x){return x.id===id});showToast('🏆 UNLOCKED!',a?a.name:'');buildAch();save()}}
function togAch(){document.getElementById('agl').classList.toggle('hid')}
function showBetStats(){var e=document.getElementById('stb');e.style.display=e.style.display==='none'||e.style.display===''?'flex':'none'}

// ====== TOAST ======
var toastTimer;
function showToast(t,d){clearTimeout(toastTimer);var e=document.getElementById('ato');document.getElementById('at1').textContent=t;document.getElementById('at2').textContent=d;e.classList.add('show');toastTimer=setTimeout(function(){e.classList.remove('show')},3000)}

// ====== BET SYSTEM ======
function openBet(mid){
  var m=M.find(function(x){return x.id===mid});if(!m)return;
  if(m.r){showToast('⚠️ 已结束','无法下注');return}
  var md=matchDate(m);if(md&&new Date()>=md){showToast('⚠️ 已开赛','锁定下注');return}
  if(G.bets[mid]){showToast('⚠️ 已下注','不可重复');return}
  curBetMatch=m;curBetType='qp';curQPPick='';curSP=[0,0];curPL={};
  document.getElementById('bmTeams').innerHTML=
    '<div class="bmt"><div class="bmf">'+m.t1+'</div><div class="bmn">'+m.n1+'</div></div>'+
    '<div class="bmvs">VS</div>'+
    '<div class="bmt"><div class="bmf">'+m.t2+'</div><div class="bmn">'+m.n2+'</div></div>';
  var tabs=document.querySelectorAll('.bt-tab');
  tabs.forEach(function(t,i){t.classList.toggle('active',i===0)});
  setBetType('qp',tabs[0]);
  document.getElementById('betMo').classList.add('show');
}
function closeBet(){document.getElementById('betMo').classList.remove('show');curBetMatch=null}

function setBetType(type,tab){
  curBetType=type;curQPPick='';curSP=[0,0];curPL={};
  document.querySelectorAll('.bt-tab').forEach(function(t){t.classList.remove('active')});
  if(tab)tab.classList.add('active');
  renderBetBody();updateBetFooter();
}

function renderBetBody(){
  var bd=document.getElementById('betBody');var m=curBetMatch;if(!m){bd.innerHTML='';return}
  if(curBetType==='qp'){
    bd.innerHTML='<div class="qp-opts">'+
      '<div class="qp-opt" onclick="pickQP(\'w1\',this)"><div class="qpf">'+m.t1+'</div><div class="qpl">'+m.n1+' 胜</div></div>'+
      '<div class="qp-opt" onclick="pickQP(\'d\',this)"><div class="qpf">🤝</div><div class="qpl">平局</div></div>'+
      '<div class="qp-opt" onclick="pickQP(\'w2\',this)"><div class="qpf">'+m.t2+'</div><div class="qpl">'+m.n2+' 胜</div></div></div>';
  }else if(curBetType==='sp'){
    bd.innerHTML='<div class="sp-row">'+
      '<span style="font-size:.6em;color:#c8b8e8">'+m.n1+'</span>'+
      '<input class="sp-input" type="number" min="0" max="20" value="0" onchange="curSP[0]=+this.value;updateBetFooter()">'+
      '<span class="sp-sep">:</span>'+
      '<input class="sp-input" type="number" min="0" max="20" value="0" onchange="curSP[1]=+this.value;updateBetFooter()">'+
      '<span style="font-size:.6em;color:#c8b8e8">'+m.n2+'</span></div>';
  }else if(curBetType==='pl'){
    var dayMatches=M.filter(function(x){return x.d===m.d&&!x.r&&x.id!==m.id});
    curPL[m.id]='w1';
    var html='<div class="pl-list">'+
      '<div class="pl-item"><span class="pli">'+m.t1+m.n1+' vs '+m.n2+m.t2+'</span>'+
      '<span class="plw active" onclick="setPL('+m.id+',\'w1\',this)">胜</span>'+
      '<span class="pld" onclick="setPL('+m.id+',\'d\',this)">平</span>'+
      '<span class="pll" onclick="setPL('+m.id+',\'w2\',this)">负</span></div>';
    dayMatches.slice(0,5).forEach(function(dm){
      curPL[dm.id]='w1';
      html+='<div class="pl-item"><span class="pli">'+dm.t1+dm.n1+' vs '+dm.n2+dm.t2+'</span>'+
        '<span class="plw active" onclick="setPL('+dm.id+',\'w1\',this)">胜</span>'+
        '<span class="pld" onclick="setPL('+dm.id+',\'d\',this)">平</span>'+
        '<span class="pll" onclick="setPL('+dm.id+',\'w2\',this)">负</span></div>';
    });
    html+='</div>';bd.innerHTML=html;
  }
}

function pickQP(val,el){curQPPick=val;document.querySelectorAll('.qp-opt').forEach(function(e){e.classList.remove('sel')});el.classList.add('sel');updateBetFooter()}
function setPL(mid,val,el){
  curPL[mid]=val;var row=el.parentElement;
  row.querySelectorAll('.plw,.pld,.pll').forEach(function(e){e.classList.remove('active')});
  el.classList.add('active');updateBetFooter();
}

function getStreakMult(){if(G.streak>=5)return 2;if(G.streak>=3)return 1.5;return 1}

function updateBetFooter(){
  var cost=BET_COSTS[curBetType];var payout=Math.floor(cost*BET_PAYOUTS[curBetType]*getStreakMult());
  var xp=BET_XP[curBetType];var canPlace=false;
  if(curBetType==='qp')canPlace=curQPPick!=='';
  else if(curBetType==='sp')canPlace=(curSP[0]+curSP[1])>0;
  else if(curBetType==='pl')canPlace=Object.keys(curPL).length>=2;
  document.getElementById('bmCost').textContent='花费: '+cost+'💰';
  document.getElementById('bmPay').textContent='赢得: '+payout+'💰 +'+xp+'xp'+(getStreakMult()>1?' ('+getStreakMult()+'x!)':'');
  document.getElementById('bmBtn').disabled=!canPlace||G.gold<cost;
  document.getElementById('bmWarn').textContent=G.gold<cost?'⚠ 金币不足!':'⚠ 开赛后锁定，猜错扣注';
}

function placeBet(){
  if(!curBetMatch)return;var m=curBetMatch;var cost=BET_COSTS[curBetType];
  if(G.gold<cost){showToast('❌ 金币不足','');return}
  G.gold-=cost;G.stats.total++;G.stats.net-=cost;
  var bet={type:curBetType,cost:cost,mult:getStreakMult(),ts:Date.now()};
  if(curBetType==='qp')bet.pick=curQPPick;
  else if(curBetType==='sp')bet.pick=curSP[0]+'-'+curSP[1];
  else if(curBetType==='pl')bet.pick=Object.assign({},curPL);
  G.bets[m.id]=bet;
  if(G.ach.indexOf('firstbet')<0)unlock('firstbet');
  completeQuest('q5');
  // Check daily gamble achievement
  var today=new Date().toDateString();
  var todayCost=0;Object.values(G.bets).forEach(function(b){if(new Date(b.ts).toDateString()===today)todayCost+=b.cost});
  if(todayCost>=100&&G.ach.indexOf('gambler')<0)unlock('gambler');
  showToast('🎰 BET PLACED!','-'+cost+'💰 下注成功');
  closeBet();updateHUD();render();
}

function resolveBets(){
  Object.keys(G.bets).forEach(function(mid){
    var bet=G.bets[mid];if(bet.resolved)return;
    var m=M.find(function(x){return x.id===+mid});if(!m||!m.r)return;
    var parts=m.r.split('-');if(parts.length!==2)return;
    var s1=parseInt(parts[0]),s2=parseInt(parts[1]);
    var won=false;
    if(bet.type==='qp'){
      var actual=s1>s2?'w1':s1<s2?'w2':'d';
      won=bet.pick===actual;
    }else if(bet.type==='sp'){
      won=bet.pick===s1+'-'+s2;
      if(won&&G.ach.indexOf('highroller')<0)unlock('highroller');
    }else if(bet.type==='pl'){
      var actual=s1>s2?'w1':s1<s2?'w2':'d';
      won=bet.pick[+mid]===actual;
    }
    bet.resolved=true;bet.won=won;
    if(won){
      var payout=Math.floor(bet.cost*BET_PAYOUTS[bet.type]*bet.mult);
      var xp=BET_XP[bet.type]||5;
      G.gold+=payout;G.stats.w++;G.stats.net+=payout;G.streak++;
      if(G.streak>G.bestStreak)G.bestStreak=G.streak;
      if(G.streak>=3&&G.ach.indexOf('prophet')<0)unlock('prophet');
      if(G.streak>=5&&G.ach.indexOf('streak5')<0)unlock('streak5');
      addXP(xp);showResult(true,'+'+payout+'💰 +'+xp+'xp');
    }else{
      G.stats.l++;G.streak=0;showResult(false,'-'+bet.cost+'💰');
    }
  });
  updateHUD();
}

function showResult(won,desc){
  var el=document.getElementById('resAnim');
  document.getElementById('resBox').className='res-box '+(won?'res-win':'res-lose');
  document.getElementById('resIcon').textContent=won?'🎰':'💀';
  document.getElementById('resTitle').textContent=won?'YOU WIN!':'YOU LOSE';
  document.getElementById('resDesc').textContent=desc;
  el.classList.add('show');
  setTimeout(function(){el.classList.remove('show')},2500);
}

// ====== MATCH HELPERS ======
function matchDate(m){
  var dm=m.d.match(/(\d+)月(\d+)日/),tm=m.t.match(/(\d+):(\d+)/);
  if(!dm||!tm)return null;
  return new Date(2026,parseInt(dm[1])-1,parseInt(dm[2]),parseInt(tm[1]),parseInt(tm[2]));
}
function isLive(m){var d=matchDate(m);if(!d)return false;var now=new Date();return now>=d&&now<new Date(d.getTime()+120*60000)&&!m.r}
function isMyTeam(m){return myTeam&&(m.n1===myTeam||m.n2===myTeam)}
function countdown(m){
  var d=matchDate(m);if(!d)return'';var diff=d-new Date();if(diff<=0)return'';
  var h=Math.floor(diff/3600000),mi=Math.floor((diff%3600000)/60000);
  if(h>24){var dd=Math.floor(h/24);return'⏰ '+dd+'D '+h%24+'H'}
  return'⏰ '+h+'H '+mi+'M';
}
function isBoss(m){return m.s==='final'||m.s==='sf'}
function isElite(m){return m.s==='qf'||m.s==='r16'}
function getBetState(m){var b=G.bets[m.id];if(!b)return'';if(b.resolved)return b.won?'bet-won':'bet-lost';return'bet-placed'}

// ====== FILTER ======
function sf(f,btn){
  cf=f;document.querySelectorAll('.fb').forEach(function(b){b.classList.remove('active')});
  if(btn)btn.classList.add('active');render();
  if(f!=='all'&&f!=='group')completeQuest('q4');if(f==='group')completeQuest('q2');
}

// ====== RENDER ======
function render(){
  var area=document.getElementById('sa');
  var sq=(document.getElementById('si').value||'').toLowerCase();
  if(sq)completeQuest('q3');
  var filtered=M.filter(function(m){
    if(cf!=='all'&&m.s!==cf)return false;if(cf==='final'&&m.s!=='final')return false;
    if(sq){var s=(m.n1+m.n2+m.v+m.g+m.d).toLowerCase();if(s.indexOf(sq)<0)return false}
    return true;
  });
  // Group by date
  var days={};filtered.forEach(function(m){if(!days[m.d])days[m.d]=[];days[m.d].push(m)});
  var html='';
  Object.keys(days).sort().forEach(function(day){
    var dm=days[day];var liveC=dm.filter(isLive).length;var finC=dm.filter(function(m){return m.r}).length;
    html+='<div class="ds"><div class="dh"><span class="dd">'+day+'</span>';
    if(liveC)html+='<span class="dc">🔴 LIVE x'+liveC+'</span>';
    if(finC)html+='<span class="dc" style="color:rgba(5,255,161,0.35)">✓'+finC+'</span>';
    html+='<span class="dx">'+dm.length+'场</span></div>';
    html+='<div class="mg">';
    dm.forEach(function(m){
      var cls='mc2';
      if(m.r)cls+=' fin';if(isLive(m))cls+=' kox';
      if(isBoss(m))cls+=' boss';if(isElite(m))cls+=' elite';
      if(isMyTeam(m))cls+=' myt';
      var bs=getBetState(m);if(bs)cls+=' '+bs;
      var tag='';if(isBoss(m))tag='<div class="bt2">BOSS +'+STAGES.find(function(s){return s.id===m.s}).xp+'xp</div>';
      else if(isElite(m))tag='<div class="et">ELITE +'+STAGES.find(function(s){return s.id===m.s}).xp+'xp</div>';
      var star=isMyTeam(m)?'<div class="star2">★</div>':'';
      var liveBadge=isLive(m)?'<span class="lb">LIVE</span>':'';
      var cd=countdown(m);var betInd='';
      var bet=G.bets[m.id];
      if(bet&&!bet.resolved){
        var pickTxt='';if(bet.type==='qp')pickTxt=bet.pick==='w1'?m.n1+'胜':bet.pick==='w2'?m.n2+'胜':'平局';
        else if(bet.type==='sp')pickTxt='比分 '+bet.pick;else pickTxt='连串';
        betInd='<div class="bet-ind">🎰'+pickTxt+'</div>';
      }else if(bet&&bet.resolved){
        betInd='<div class="bet-ind">'+(bet.won?'✅赢':'❌输')+'</div>';
      }
      html+='<div class="'+cls+'" onclick="openBet('+m.id+')">'+star+tag+
        '<div class="tr"><span class="ko2">'+m.t+liveBadge+'</span>';
      if(m.g)html+='<span class="gt2 g'+m.g+'">'+m.g+'</span>';
      html+='</div>';
      html+='<div class="tm"><div class="t2"><div class="fl3">'+m.t1+'</div><div class="nm2'+(m.n1===myTeam?' my':'')+'">'+m.n1+'</div></div>';
      html+='<div class="vs">VS</div>';
      html+='<div class="t2"><div class="fl3">'+m.t2+'</div><div class="nm2'+(m.n2===myTeam?' my':'')+'">'+m.n2+'</div></div></div>';
      html+='<div class="vn">'+m.v+'</div>';
      if(m.r)html+='<div class="sc">⚽ '+m.r+'</div>';
      if(cd)html+='<div class="cd">'+cd+'</div>';
      var xpVal=STAGES.find(function(s){return s.id===m.s});
      html+='<div class="cx">+'+(xpVal?xpVal.xp:0)+'xp</div>';
      html+=betInd+'</div>';
    });
    html+='</div></div>';
  });
  area.innerHTML=html;
}

// ====== UPDATE STATUS ======
function updateStatus(){
  var now=new Date();var live=M.filter(isLive).length;var fin=M.filter(function(m){return m.r}).length;
  var next=null;M.forEach(function(m){if(m.r)return;var d=matchDate(m);if(d&&d>now&&(!next||d<next.dt))next={m:m,dt:d}});
  var txt='<span class="lv">● LIVE</span> '+live+'场进行中 | '+fin+'/'+M.length+' 已结束';
  if(next){var cd=countdown(next.m);txt+=cd?' | 下一场 '+cd:''}
  document.getElementById('un2').innerHTML=txt;
}

// ====== FETCH DATA ======
function loadData(){
  fetch('data.json').then(function(r){return r.json()}).then(function(data){
    M=data.matches||data;updateStatus();render();resolveBets();
    // Check stage progression
    var finStages={};M.forEach(function(m){if(m.r){finStages[m.s]=true}});
    var stageOrder=['group','r32','r16','qf','sf','final'];
    var curIdx=0;stageOrder.forEach(function(s,i){if(finStages[s])curIdx=i});
    if(curIdx>0){var newStage=stageOrder[Math.min(curIdx+1,stageOrder.length-1)];
      if(stageOrder.indexOf(newStage)>stageOrder.indexOf(G.stage)){G.stage=newStage;buildMap()}}
    // Achievement checks
    if(M.some(function(m){return m.r})&&G.ach.indexOf('first')<0)unlock('first');
    if(finStages.group&&G.ach.indexOf('group3')<0)unlock('group3');
    if(finStages.r32&&G.ach.indexOf('r32c')<0)unlock('r32c');
  }).catch(function(e){console.error('Load failed',e)});
}

// ====== INIT ======
function init(){
  buildTeamGrid();
  // Check if already started
  loadSave();
  if(myTeam){
    document.getElementById('ps').classList.add('hid');
    document.getElementById('hud').classList.add('active');
    document.getElementById('stb').style.display='flex';
    updateHUD();buildMap();buildQuests();buildAch();
  }
  loadData();
  setInterval(function(){loadData();updateStatus()},60000);
  setInterval(updateStatus,10000);
}

init();