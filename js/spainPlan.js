(function(){
const base=UI.studyPlan;
const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国'],['FR','🇫🇷','法国'],['IT','🇮🇹','意大利'],['ES','🇪🇸','西班牙']];
const bachelorPlan={name:'西班牙本科直申',label:'高中毕业当年9月入学',items:[
['高一上','秋季周末/晚班：西语A1，180课时，每周6–10小时；寒假复习巩固','明确西班牙本科留学意向及升学方向；了解西班牙院校及专业方向；保持高中在校成绩'],
['高一下','春季周末/晚班：西语A2，180课时，每周6–10小时；暑假全日制：西语B1，240课时，集中学习约1个月','探索专业及院校方向；了解西班牙本科基本申请要求；参加实践、竞赛等背景提升'],
['高二上','秋季周末/晚班：西语B2.1，180课时，每周6–10小时；寒假复习巩固','初步选校选专业，建立院校梯度；了解目标专业往年录取情况；了解高考成绩转换及加分考试路径'],
['高二下','春季周末/晚班：西语B2.2，180课时，每周6–10小时；暑假全日制：西语考试备考120课时，集中学习约20天','确定主要院校及专业方向；了解目标院校语言及本科申请要求；规划DELE/SIELE语言考试'],
['高二暑假–高三上','进入B2考试阶段；可重点关注10月/11月DELE B2，或根据需要参加SIELE；目标取得B2语言证明','最终确定主要院校及专业方向；确认目标专业高考成绩及加分考试要求；提前准备本科申请相关材料'],
['高三上','根据首考成绩继续刷分；如DELE未通过，可继续参加后续DELE场次或通过SIELE快速补充语言成绩','进一步确定选校及专业梯度；了解UNEDasiss成绩转换/认证及申请流程；规划是否参加PCE等加分考试'],
['高三下1–6月','保持B2语言能力，以高考备考为主；⚠️ 尚未取得语言成绩的学生，应结合目标院校截止时间尽早参加DELE/SIELE','准备学历、成绩等本科申请材料；根据目标专业情况准备PCE等加分考试；6月参加高考'],
['高中毕业6–7月','⚠️ 语言最迟出分关键期：应在目标院校规定的语言证明提交/注册截止日前取得合格成绩；临近截止时间可根据院校认可情况选择SIELE','办理高考成绩转换/认证等手续；根据目标大学及专业要求完成志愿填报；结合转换成绩及加分考试成绩调整申请方案'],
['高中毕业7-8月','加强学术及生活西语，强化课堂表达及专业词汇，为本科课程做好衔接','跟进本科录取结果及后续批次/补录；拿到录取后完成预注册等手续；准备并完成签证、住宿、保险及赴西行前事项；根据录取院校要求完成注册及入学手续'],
['9月','进入本科后的学术西语及专业课程学习','赴西班牙报到并正式进入本科阶段']
]};
const masterPlan={name:'西班牙硕士直申',label:'本科毕业后9–10月入学',items:[
['大一上','秋季周末/晚班：西语A1，180课时，每周6–10小时；寒假复习巩固','明确西班牙硕士留学意向及专业方向；保持并提升本科GPA；了解西班牙硕士基本申请要求'],
['大一下','春季周末/晚班：西语A2，180课时，每周6–10小时；暑期复习巩固','保持本科GPA及专业课成绩；关注本科课程与目标硕士的专业匹配度；暑期参加专业相关实习、科研或项目'],
['大二上','秋季周末/晚班：西语B1，240课时，每周6–10小时；寒假复习巩固','初步确定硕士专业方向及目标院校；了解目标项目课程及语言要求；持续积累专业相关经历'],
['大二下','春季周末/晚班：西语B2.1，180课时，每周6–10小时；暑期复习巩固','初步建立选校及专业梯度；确认目标项目专业背景及语言要求；暑期参加实习、科研或专业相关项目'],
['大三上','秋季周末/晚班：西语B2.2，180课时，每周6–10小时；寒假复习巩固','进一步确定目标院校及专业；核对课程匹配及项目申请要求；开始准备CV、动机信、推荐信等申请素材'],
['大三下','西语考试备考120课时，每周6–10小时；进入DELE/SIELE考试阶段；重点关注5月DELE B2/C1；暑期复习巩固，并根据成绩参加DELE/SIELE刷分','最终确定主要申请院校及专业方向；完善CV、动机信、推荐信等申请材料；暑期完成主要申请材料并关注各院校申请开放时间'],
['大四上9–12月','根据首考成绩继续刷分；重点关注10月/11月DELE B2/C1或参加SIELE；⚠️ 建议正式申请前取得B2/C1语言成绩','正式进入硕士申请季；根据不同院校开放时间陆续递交申请；跟进材料审核、补件及面试'],
['大四下1–6月','如目标院校允许后补语言成绩，可继续参加SIELE等考试；保持B2/C1语言能力','继续递交后续批次申请并跟进录取；确定最终入学院校及专业；完成本科毕业及最终学历材料'],
['本科毕业6–9月','加强学术西语、课堂表达及专业词汇','补充毕业证、学位证、完整成绩单等材料；完成签证、住宿、保险及行前准备；根据院校要求完成注册手续'],
['9–10月','进入硕士阶段的学术西语及专业课程学习','赴西班牙报到并完成注册；正式进入西班牙硕士阶段']
]};
function highlight(s){return s.replace(/(DELE|SIELE|UNEDasiss|PCE|CV|GPA|A1|A2|B1|B2\.1|B2\.2|B2|C1|\d+课时|每周6–10小时|5月|10月|11月)/g,'<mark>$1</mark>')}
function blocks(s,type){return s.split('；').filter(Boolean).map(t=>{if(type==='learn'){const m=t.match(/^(.+?)[：:]西语(A1|A2|B1|B2\.1|B2\.2)[，,](\d+课时)(.*)$/);if(m)return`<div class="kr-course es-course"><span>${m[1]}</span><b>西语 ${m[2]}</b><em>${m[3]}</em>${m[4]?`<small>${m[4].replace(/^[，,]/,'')}</small>`:''}</div>`}return`<p class="${type}${t.startsWith('⚠️')?' es-warning':''}">${highlight(t)}</p>`}).join('')}
function scenarios(active){return`<div class="matrix-scenarios kr-master-scenarios es-scenarios"><button class="${active==='highschool'?'active':''}" data-plan-scenario="highschool"><i>西</i><span><b>高中生申请本科</b><small>高考成绩转换 · 本科直申</small></span><em>✓</em></button><button class="${active==='master'?'active':''}" data-plan-scenario="master"><i>研</i><span><b>本科申请硕士</b><small>本科在读 · 硕士直申</small></span><em>✓</em></button></div>`}
function view(state){const isMaster=state?.scenario==='master',p=isMaster?masterPlan:bachelorPlan,n=p.items.length,split=4;return`<section class="matrix-page kr-compact kr-german-layout es-layout ${isMaster?'es-master':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">SPAIN ${isMaster?'MASTER':'UNDERGRADUATE'} ROADMAP</p><h2>${isMaster?'西班牙本科申请硕士规划':'西班牙高中生申请本科规划'}</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='ES'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarios(isMaster?'master':'highschool')}<div class="matrix-route kr-route es-single-route"><div class="route-summary"><span>${isMaster?'西班牙本科生申请硕士':'西班牙高中生申请本科'}</span><b>${p.name}</b><p>${isMaster?'本科阶段完成西语、GPA及专业背景准备，毕业前完成硕士申请。':'高中阶段完成西语与升学准备，高考后完成成绩转换、志愿填报及本科申请。'}</p></div><div class="route-options es-routes"><button class="active" type="button"><small>路径 A</small><b>${p.name}</b><em>✓</em></button></div></div><div class="es-language-note"><b>语言与申请提醒</b><span>${isMaster?'建议正式申请前取得目标项目要求的B2/C1；是否允许后补以院校规定为准。':'语言成绩、高考转换及PCE要求应结合目标大学和专业的截止时间提前确认。'}</span></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isMaster?'语言、GPA与专业背景建设':'语言与升学能力建设'}</div><div>${isMaster?'硕士申请 · 录取 / 签证 / 入学':'本科申请 · 成绩转换 / 志愿 / 入学'}</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>${isMaster?'硕士节点':'留学节点'}</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>语言、成绩转换、申请与签证要求以西班牙院校及当年度官方政策为准。</span></footer></section>`}
UI.studyPlan=state=>state?.country==='ES'?view(state):base(state);
})();
