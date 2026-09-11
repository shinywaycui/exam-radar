(function(){
  const esc=window.UI.esc;
  const scenarios=[
    {id:'highschool',icon:'01',title:'高中生申请本科',sub:'国内普高 · 高一开始规划',ready:true},
    {id:'undergrad',icon:'02',title:'大学在读申请',sub:'转专业 / 转学 / 重读本科'},
    {id:'master',icon:'03',title:'本科申请硕士',sub:'大学期间语言与申请规划'},
    {id:'graduate',icon:'04',title:'毕业后申请',sub:'毕业生 / 工作后再申请'}
  ];
  const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国'],['FR','🇫🇷','法国'],['IT','🇮🇹','意大利'],['ES','🇪🇸','西班牙'],['RU','🇷🇺','俄罗斯']];
  const routes={
    direct:{label:'高考成绩 ≥ 70%',short:'本科直申',tag:'推荐路径',summary:'满足高考成绩要求，完成 APS 审核与语言准备后申请德国本科。',steps:[
      ['高一上','语言启程','秋季周末 · A1|寒假 · 复习预习','240课时','每周 6—10 小时'],
      ['高一下','语言进阶','春季周末 · A2|暑假全日制 · B1','420课时','A2 240课时 + B1 180课时'],
      ['高二','能力达标','高二上 · B1+|高二下 · B2|暑假 · 德福备考','阶段考试','完成 B2 考试并取得证书'],
      ['高考期','路径确认','≥ 70%','准备材料','预留约1个月审核时间'],
      ['7—10月','申请执行','APS审核','语言续学','国内或德国继续学习'],
      ['11—次年4月','签证衔接','B2 / 德适','申请入学','冬季或夏季入学'],
      ['次年4—10月','完成入学','大学注册','赴德入学','未达语言则顺延一学期']
    ]},
    prep:{label:'达到当地本科线',short:'团审 / 预科',tag:'衔接路径',summary:'通过团审校考或预科衔接德国本科，语言与申请同步推进。',steps:[
      ['高一上','语言启程','秋季周末 · A1|寒假 · 复习预习','240课时','每周 6—10 小时'],
      ['高一下','语言进阶','春季周末 · A2|暑假全日制 · B1','420课时','A2 240课时 + B1 180课时'],
      ['高二','能力达标','高二上 · B1+|高二下 · B2|暑假 · 德福备考','阶段考试','完成 B2 考试并准备校考'],
      ['高考期','路径确认','本科线','参加校考','获取团审项目预录取'],
      ['7—10月','申请执行','材料审核','德语续学','瞄准10月或次年4月'],
      ['11—次年4月','预科衔接','德适 / B2','办理签证','进入预科或语言班'],
      ['次年4—10月','完成入学','预科结业','申请本科','根据成绩匹配入学季']
    ]}
  };
  function scenarioTabs(active){return`<div class="plan-scenarios">${scenarios.map(s=>`<button class="${active===s.id?'active':''}" data-plan-scenario="${s.id}"><i>${s.icon}</i><span><b>${s.title}</b><small>${s.sub}</small></span>${s.ready?'<em>示例</em>':''}</button>`).join('')}</div>`}
  function coming(state){const item=scenarios.find(s=>s.id===state.scenario)||scenarios[1];return`<div class="plan-empty-state"><i>${item.icon}</i><div><span>GERMANY ROADMAP</span><h3>${item.title}</h3><p>这个申请场景已纳入整体结构，后续可按学生年级、专业背景、语言基础和目标入学季补充具体节点。</p></div><button data-plan-scenario="highschool">先看高中生完整示例</button></div>`}
  function studyPlan(state={country:'DE',route:'direct',scenario:'highschool'}){
    state.scenario=state.scenario||'highschool';
    const country=countries.find(x=>x[0]===state.country)||countries[0],route=routes[state.route]||routes.direct;
    return`<section class="study-board"><header class="board-head"><div><p class="section-kicker">STUDY ABROAD ROADMAP</p><h2>欧亚留学语言规划轴</h2><p>选择学生阶段与申请路径，在一张图里看完语言、申请和入学节奏。</p></div><div class="board-country"><span>${country[1]}</span><div><small>当前国家</small><b>${country[2]}</b></div></div></header><div class="board-toolbar"><div class="country-compact">${countries.map(c=>`<button class="${state.country===c[0]?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></div>${scenarioTabs(state.scenario)}${state.country!=='DE'?`<div class="plan-empty-state country"><i>${country[1]}</i><div><span>COMING SOON</span><h3>${country[2]}规划线待补充</h3><p>页面框架已经统一，确认德国版本后可按国家逐条录入规划方案。</p></div><button data-plan-country="DE">返回德国示例</button></div>`:state.scenario!=='highschool'?coming(state):`<div class="route-bar"><div><span>高中生申请德国本科</span><h3>${route.short}</h3><p>${route.summary}</p></div><div class="route-pills">${Object.entries(routes).map(([id,r])=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><small>${r.tag}</small><b>${r.label}</b></button>`).join('')}</div></div><div class="horizontal-roadmap"><div class="roadmap-header"><span>学习阶段</span>${route.steps.map((s,i)=>`<div class="time-block time-${i}"><small>${String(i+1).padStart(2,'0')}</small><b>${s[0]}</b></div>`).join('')}</div><div class="roadmap-track"><span>关键节点</span>${route.steps.map((s,i)=>`<article class="phase-${i} ${i===3?'decision':''}"><i>${i<3?'语言':i===3?'分流':i<6?'申请':'入学'}</i><small>${s[1]}</small><div class="stage-lines">${String(s[2]).split('|').map(x=>{const parts=x.split('·');return`<div><span>${esc(parts[0].trim())}</span><b>${esc((parts[1]||parts[0]).trim())}</b></div>`}).join('')}</div><strong>${s[3]}</strong><p>${s[4]}</p></article>`).join('')}</div><div class="roadmap-rail"><span></span>${route.steps.map((_,i)=>`<i class="${i===3?'decision':''}"></i>`).join('')}</div></div><footer class="board-foot"><div><i></i><span><b>语言学习</b> 高一至高二分阶段完成 A1—B2</span></div><div><i></i><span><b>申请办理</b> 高考后进入审核、签证与注册</span></div><p>规划随学生基础、考试结果及院校政策动态调整</p></footer>`}</section>`
  }
  window.UI.studyPlan=studyPlan;
})();
