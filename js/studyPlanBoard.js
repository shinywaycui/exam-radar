(function(){
  const scenarios=[['highschool','高中生申请本科','国内普高 · 高一开始规划'],['master','本科申请硕士','大学期间准备']];
  const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国']];
  const common=[
    {time:'高一上',tone:'language',language:['秋季周末班｜德语 A1｜240课时','寒假｜复习预习｜每周6—10小时']},
    {time:'高一下',tone:'language',language:['春季周末班｜德语 A2｜240课时','暑假全日制｜德语 B1｜180课时']},
    {time:'高二上',tone:'language',language:['秋季周末班｜德语 B1+｜150课时','寒假｜复习预习｜每周6—10小时']},
    {time:'高二下',tone:'language',language:['春季周末班｜德语 B2｜240课时','暑假全日制｜德福备考｜160课时','考试｜B2 阶段考试｜取得证书']},
    {time:'高三 · 高考期',tone:'decision',language:['德福备考持续进行'],apply:['准备高考','准备申请材料'],detail:'审核材料通常约1个月'},
  ];
  const routeData={
    direct:{label:'高考成绩 ≥ 70%',title:'高考直申路径',summary:'达到高考满分70%，进入审核、语言达标与本科申请流程。',later:[
      {time:'7—8月',tone:'apply',language:['国内继续学习德语','或先到德国学习德语'],apply:['等待审核结果'],detail:'按语言基础选择学习地点'},
      {time:'9月—次年1月',tone:'apply',language:['继续冲刺德福考试'],apply:['可选择国内继续学习','或先赴德国学习语言'],detail:'根据语言成绩选择方案'},
      {time:'次年4—7月',tone:'milestone',language:['最低考出B2等级','德福通过后持续学习'],apply:['申请德国本科直入'],detail:'同步关注申请截止时间'},
      {time:'次年8—10月',tone:'milestone',language:['未达德福16分则国内续学','达标后入境德国'],apply:['获签赴德','完成大学注册'],detail:'正式衔接德国本科'}
    ]},
    prep:{label:'低于高考满分60%，参加团审项目校考，等预录取',title:'团审项目路径',summary:'低于高考满分60%，参加团审项目校考，等预录取。',later:[
      {time:'7—8月',tone:'apply',language:['继续学习德语'],apply:['参加团审项目校考','等待项目预录取'],detail:'按项目要求准备校考'},
      {time:'9—10月',tone:'apply',language:['准备10月或次年4月德适'],apply:['本科线以上：资料审核','本科线以下：继续语言'],detail:'根据高考成绩分流'},
      {time:'11—次年1月',tone:'apply',language:['德适通过后持续学习'],apply:['审核通过后办理签证','准备赴德'],detail:'保持语言学习连续性'},
      {time:'次年4—7月',tone:'milestone',language:['4月德适通过后继续学习'],apply:['办理签证赴德','用预科成绩申请冬季入学'],detail:'未通过可调整英语授课国家'},
      {time:'次年8—10月',tone:'milestone',language:['用合格语言成绩申请'],apply:['完成大学注册'],detail:'按预科结业情况安排入学'}
    ]}
  };
  const masterItems=[
    {time:'大一上',tone:'language',language:['秋季周末/晚班｜德语 A1｜240课时 · 每周6–10小时','寒假｜复习巩固'],apply:['明确德国硕士方向','保持GPA，建议均分80+']},
    {time:'大一下',tone:'language',language:['周末/晚班｜德语 A2｜240课时 · 每周6–10小时','暑假全日制｜德语 B1｜180课时 · 约1个月'],apply:['保持GPA并重视课程匹配','参加实习、竞赛或科研']},
    {time:'大二上',tone:'language',language:['秋季周末/晚班｜德语 B1+｜150课时 · 每周6–10小时','寒假｜复习巩固'],apply:['持续提升GPA与课程匹配']},
    {time:'大二下',tone:'language',language:['周末/晚班｜德语 B2｜240课时 · 每周6–10小时','暑假全日制｜德福备考｜160课时 · 约20天'],apply:['初步确定院校梯度','评估TestAS / APS面谈路径']},
    {time:'大三上',tone:'decision',language:['参加首次德福考试','按成绩安排2–3次刷分'],apply:['确定最终院校及专业','规划APS审核时间与方式','确认GRE / GMAT要求']},
    {time:'大三下及暑假6–8月',tone:'apply',language:['持续德福刷分','按成绩强化，未达标持续备考','目标德福4×4或院校要求'],apply:['推进TestAS / APS面谈','按确认路径推进APS审核','准备硕士申请材料']},
    {time:'大四上9–10月',tone:'apply',language:['继续德福 / 歌德考试','考出GRE / GMAT（如要求）'],apply:['补充所需学业材料','同步准备硕士申请']},
    {time:'大四上10月–次年2月',tone:'apply',language:['语言未达标则继续刷分'],apply:['按个人情况完成APS审核','取得APS审核证书','完善选校及申请方案']},
    {time:'大四下3–4月',tone:'apply',language:['准备德福 / 歌德考试','冲刺最终语言成绩'],apply:['开具前7学期成绩单','完善硕士正式申请材料','确定最终院校及专业']},
    {time:'大四下5–7月',tone:'milestone',language:['冲刺目标院校语言要求','按院校政策补充语言成绩'],apply:['正式递交硕士申请','跟进院校审核及补件','确认最终录取方案']},
    {time:'毕业后7–9月',tone:'milestone',language:['保持德语能力','强化学术及专业场景德语'],apply:['获取录取并确定院校','完成APS补审并办理签证','准备住宿、保险及行前事项']},
    {time:'10–11月',tone:'milestone',language:['进入学术德语及专业课程学习'],apply:['赴德完成注册及入学','入读硕士专业或语言班']}
  ];
  function tabs(state){return`<div class="selector-section scenario-selector"><div class="selector-caption"><i>2</i><span><b>选择申请身份</b><small>不同学习阶段对应不同规划方案</small></span></div><div class="matrix-scenarios">${scenarios.map(s=>`<button class="${state.scenario===s[0]?'active':''}" data-plan-scenario="${s[0]}"><i>${s[0]==='master'?'◇':'▣'}</i><span><b>${s[1]}</b><small>${s[2]}</small></span></button>`).join('')}</div></div>`}
  function placeholder(title,text,backAttr,backValue){return`<div class="matrix-placeholder"><div><span>ROADMAP TEMPLATE</span><h3>${title}</h3><p>${text}</p></div><button ${backAttr}="${backValue}">返回德国高中生示例</button></div>`}
  function courseLine(text){const parts=String(text).split('｜');if(parts.length===1)return`<p class="course-line simple"><b>${parts[0]}</b></p>`;return`<p class="course-line"><span>${parts[0]}</span><b>${parts[1]}</b>${parts[2]?`<em>${parts[2]}</em>`:''}</p>`}
  function masterBoard(state){
    const items=masterItems;
    return`<section class="matrix-page de-master" style="--decols:${items.length}"><header class="matrix-title"><div><p class="section-kicker">GERMANY MASTER ROADMAP</p><h2>德国本科申请硕士规划</h2></div><div class="country-selector"><div class="selector-caption"><i>1</i><span><b>选择目标国家</b></span></div><div class="matrix-countries">${countries.map(c=>`<button class="${state.country===c[0]?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}<em>✓</em></button>`).join('')}</div></div></header>${tabs(state)}<div class="matrix-route"><div class="route-summary"><span>德国本科申硕士</span><b>大学期间准备</b><p>语言、课程匹配与专业背景并行，完成 APS、申请、签证及入学。</p></div><div class="route-options"><div class="selector-caption"><i>3</i><span><b>目标节点</b></span></div><button class="active"><small>德国硕士</small><b>德授直入 / 语言班</b><em>✓</em></button></div></div><div class="matrix-shell"><div class="matrix-era master-era"><strong>规划阶段</strong><div class="before"><i>01</i><b>语言、GPA 与专业背景建设</b><span>大一 — 大三暑假</span></div><div class="after"><i>02</i><b>APS、硕士申请与入学执行</b><span>大四 — 赴德入学</span></div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${items.map((x,i)=>`<div class="${x.tone}"><small>${String(i+1).padStart(2,'0')}</small><b>${x.time}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${items.map(x=>`<article class="${x.tone}">${x.language.map(courseLine).join('')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>留学节点</strong>${items.map(x=>`<article class="${x.tone} has-content">${x.apply.map(t=>`<p>${t}</p>`).join('')}</article>`).join('')}</div></div><footer class="matrix-note"><b>阅读方式：</b>大一至大三同步建设德语、GPA、课程匹配与专业背景；大四集中完成 APS 和申请。<span>具体要求以德国院校及官方最新政策为准。</span></footer></section>`;
  }
  function studyPlan(state={country:'DE',route:'direct',scenario:'highschool'}){
    state.scenario=state.scenario||'highschool';const country=countries.find(x=>x[0]===state.country)||countries[0],route=routeData[state.route]||routeData.direct,items=[...common,...route.later];
    if(state.country==='DE'&&state.scenario==='master')return masterBoard(state);
    return`<section class="matrix-page"><header class="matrix-title"><div><p class="section-kicker">STUDY ABROAD ROADMAP</p><h2>欧亚留学语言规划轴</h2></div><div class="country-selector"><div class="selector-caption"><i>1</i><span><b>选择目标国家</b></span></div><div class="matrix-countries">${countries.map(c=>`<button class="${state.country===c[0]?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}<em>✓</em></button>`).join('')}</div></div></header>${tabs(state)}${state.country!=='DE'?placeholder(`${country[2]}规划线待补充`,'确认德国版本的信息结构后，可按照相同模板逐国录入。','data-plan-country','DE'):state.scenario!=='highschool'?placeholder(scenarios.find(s=>s[0]===state.scenario)[1],'该申请人群已保留独立入口，后续可根据背景和目标入学季录入节点。','data-plan-scenario','highschool'):`<div class="matrix-route"><div class="route-summary"><span>德国高中生申请本科</span><b>${route.title}</b><p>${route.summary}</p></div><div class="route-options"><div class="selector-caption"><i>3</i><span><b>选择成绩路径</b></span></div>${Object.entries(routeData).map(([id,r])=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><small>${id==='direct'?'路径 A':'路径 B'}</small><b>${r.label}</b><em>✓</em></button>`).join('')}</div></div><div class="matrix-shell"><div class="matrix-era"><strong>规划阶段</strong><div class="before"><i>01</i><b>高考前 · 语言能力建设</b><span>高一上 — 高二下</span></div><div class="pivot"><b>高考</b><span>成绩分流</span></div><div class="after"><i>02</i><b>高考后 · 留学申请执行</b><span>审核 — 签证 — 入学</span></div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${items.map((x,i)=>`<div class="${x.tone}"><small>${String(i+1).padStart(2,'0')}</small><b>${x.time}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${items.map(x=>`<article class="${x.tone}">${(x.language||[]).map(courseLine).join('')}${x.detail?`<small>${x.detail}</small>`:''}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>留学节点</strong>${items.map(x=>`<article class="${x.tone} ${(x.apply||[]).length?'has-content':''}">${(x.apply||[]).map(t=>`<p>${t}</p>`).join('')||'<em>语言准备阶段</em>'}</article>`).join('')}</div></div><footer class="matrix-note"><b>阅读方式：</b>高考前重点完成语言能力建设，高考后依据成绩进入审核、签证与入学流程。<span>具体要求以德国院校及官方最新政策为准。</span></footer>`}</section>`
  }
  window.UI.studyPlan=state=>{
    let html=studyPlan(state)
      .replace('德授直入 / 语言班','德授直入')
      .replace('入读硕士专业或语言班','正式入读德国硕士')
      .replace('matrix-grid matrix-lane language"','matrix-grid matrix-lane language" style="flex:1.38"')
      .replace('matrix-grid matrix-lane application"','matrix-grid matrix-lane application" style="flex:.72"');
    if(state?.country==='DE'&&state?.scenario==='master')html=html.replace('具体要求以德国院校及官方最新政策为准。','APS审核时间及方式因人而异，应结合在读学期、学业情况、申请时间及最新政策确认。');
    if(state?.country==='DE'&&state?.scenario==='highschool')html=html.replace('<section class="matrix-page">',`<section class="matrix-page de-undergrad" style="--decols:${state.route==='direct'?9:10}">`);
    return html;
  };
})();
