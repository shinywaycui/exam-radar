(function(){
const base=UI.studyPlan;
const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国'],['FR','🇫🇷','法国'],['IT','🇮🇹','意大利'],['ES','🇪🇸','西班牙']];
const plan={name:'法国本科直申',label:'高中毕业当年9月入学',items:[
['高一上','秋季周末/晚班：法语A1，240课时，每周6–10小时；寒假复习巩固','明确法国本科留学意向及语言考试规划；了解法国院校及专业方向；保持高中成绩，建议均分80+，低于80%需合理搭配院校'],
['高一下','春季周末/晚班：法语A2，240课时，每周6–10小时；暑假全日制：法语B1，240课时，集中学习约1个月','保持高中在校成绩，持续向均分80+提升；探索专业及院校方向；参加学生会、志愿者、义工或国际性比赛等背景提升活动'],
['高二上','秋季周末/晚班：法语B2.1，150课时，每周6–10小时；寒假复习巩固','初步选校选专业，建立院校梯度；了解目标院校语言及申请要求；规划1–2段相关实习，并参加竞赛、科研或课题研究'],
['高二下','春季周末/晚班：法语B2.2，150课时，每周6–10小时；暑假全日制：法语考试备考120课时，集中学习约20天','确定目标院校及专业方向；了解DAP/Etudes en France申请流程；整理成绩单、获奖证书、科研项目及奖学金等申请素材'],
['高二暑假','参加预签证考试，最低拿到B1成绩','最终确定申请院校及专业；完成文书素材表，整理专业背景、留学规划、简历CV、推荐信及已有实习/科研证明；进入Études en France/DAP等相应申请流程'],
['高三上','10月参加TCF选考、11月DELF-DALF（出分可能来不及），考出B2/C1。','高三上10–12月递交本科申请，完成动机信、简历CV、推荐信及材料补充；高考成绩要求：2026年9月30日之后，申请法国公立本科，高考成绩需超过当地本科线；跟进Campus France相关流程'],
['高三下1–3月','根据目标院校要求继续提升法语，冲刺C1；同步备战高考','跟进审核，并按要求完成Campus France相关流程/面试；准备说明留学目的、专业兴趣、升学规划及院校认知；等待院校审核结果'],
['高三下4–5月','保持法语能力，加强学术法语；同步备战高考','陆续获得院校申请结果；确定最终入学院校并完成录取确认；提前准备签证材料及住宿，衔接高考后6月办理签证'],
['高三下6月（高考后）','持续提升法语能力，为法国本科课程做准备','高考结束后6月办理签证；按要求补充高中毕业、高考成绩等最终材料；办理入学手续，落实住宿等赴法事项'],
['毕业当年9月','加强生活法语及学术法语，做好本科课程衔接；进入法国后的法语及专业课程学习','入学前完成行前指导，落实住宿、机票、保险等事项；毕业当年9月赴法报到注册；正式进入法国本科']
]};
const masterPlan={name:'法国硕士申请',label:'本科毕业后9–10月入学',items:[
['大一上','秋季周末/晚班：法语A1，240课时，每周6–10小时；寒假复习巩固','明确法国硕士留学意向及专业方向；保持本科GPA，建议均分80+；了解法国院校及硕士基本申请要求'],
['大一下','春季周末/晚班：法语A2，240课时，每周6–10小时；暑假学习巩固','保持并提升本科GPA；了解专业匹配及先修课程要求；参加实践、竞赛、科研等背景提升'],
['大二上','秋季周末/晚班：法语B1，240课时，每周6–10小时；寒假复习巩固','明确硕士申请专业方向；初步了解目标院校及专业要求；参加专业相关实习、科研或项目'],
['大二下','春季周末/晚班：法语B2.1，150课时，每周6–10小时；暑假复习巩固','初步确定选校及专业方案；持续积累专业相关实习/科研经历；梳理个人经历及申请背景'],
['大三上','秋季周末/晚班：法语B2.2，150课时，每周6–10小时；寒假全日制：法语考试备考120课时，集中学习约20天','确定目标院校及专业梯度；确认各项目语言及专业背景要求；开始整理简历、专业规划及文书素材'],
['大三下','重点参加3月或6月DELF/DALF考试，争取取得B2及以上成绩；语言要求较高的专业可冲刺DALF C1','进一步确定申请院校及专业；参加专业相关实习、科研或项目；准备CV、动机信、推荐信等申请材料'],
['大三暑假7–8月','根据6月考试结果判断是否继续刷分；如未达到目标要求，准备大四上11月DELF/DALF考试','参加专业相关实习/实践；完善文书及申请材料；确定最终选校及申请方案'],
['大四上9–10月','⚠️ 最晚出成绩提醒：建议正式申请季前取得目标项目要求的B2/C1成绩；如仍未达标，可报名11月DELF/DALF，但需提前确认目标项目是否允许后补语言成绩','确定最终申请院校及专业；开具成绩单、在读证明等材料；完成申请材料定稿'],
['大四上10月–次年1月','如需最终刷分，可参加11月DELF/DALF考试；根据项目规定补交语言成绩','根据目标项目开放时间陆续递交申请；跟进材料审核及补件；准备院校面试'],
['大四下2–4月','加强专业法语及面试表达；如申请方案允许，可参加3月DELF/DALF考试进行补充刷分','跟进院校审核及面试；陆续获得申请结果；确定最终入学院校'],
['大四下5–6月','持续提升学术法语及专业词汇；根据需要参加6月DELF/DALF考试','完成本科毕业及最终材料补充；确认录取并完成入学手续；启动签证及赴法准备'],
['8–10月','加强学术法语、专业法语及课堂表达；进入法国后的专业法语及硕士课程学习','办理签证及行前手续；落实住宿、保险、机票等事项；完成赴法前准备并报到注册；正式进入法国硕士阶段']
]};
function highlight(s){return s.replace(/(TCF|DELF|DALF|DAP|[ÉE]tudes en France|Campus France|CV|A1|A2|B1|B2\.1|B2\.2|B2|C1|\d+课时|每周6–10小时|均分80\+|500\+|400\+|1–2段)/g,'<mark>$1</mark>')}
function blocks(s,type){return s.split('；').filter(Boolean).map(t=>{if(type==='learn'){const m=t.match(/^(.+?)[：:]法语(A1|A2|B1|B2\.1|B2\.2)[，,](\d+课时)(.*)$/);if(m)return`<div class="kr-course fr-course"><span>${m[1]}</span><b>法语 ${m[2]}</b><em>${m[3]}</em>${m[4]?`<small>${m[4].replace(/^[，,]/,'')}</small>`:''}</div>`}return`<p class="${type}${t.startsWith('⚠️')?' fr-warning':''}">${highlight(t)}</p>`}).join('')}
function scenarioTabs(active){return`<div class="matrix-scenarios kr-master-scenarios fr-scenarios"><button class="${active==='highschool'?'active':''}" data-plan-scenario="highschool"><i>法</i><span><b>高中生申请本科</b><small>国内普高 · 高一开始规划</small></span><em>✓</em></button><button class="${active==='master'?'active':''}" data-plan-scenario="master"><i>研</i><span><b>本科申请硕士</b><small>本科在读 · 大一开始规划</small></span><em>✓</em></button></div>`}
function view(state){const isMaster=state?.scenario==='master',p=isMaster?masterPlan:plan,n=p.items.length,split=4;return`<section class="matrix-page kr-compact kr-german-layout fr-layout ${isMaster?'fr-master':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">${isMaster?'FRANCE MASTER ROADMAP':'FRANCE UNDERGRADUATE ROADMAP'}</p><h2>${isMaster?'法国本科申请硕士规划':'法国高中生申请本科规划'}</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='FR'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs(isMaster?'master':'highschool')}<div class="matrix-route kr-route fr-single-route"><div class="route-summary"><span>${isMaster?'法国本科生申请硕士':'法国高中生申请本科'}</span><b>${p.name}</b><p>${isMaster?'从大一完成法语、GPA与专业背景建设，大四进入申请、录取、签证及入学流程。':'从高一准备法语与申请材料，高三上10–12月递交申请，高考结束后6月办理签证，毕业当年9月入学。'}</p></div><div class="route-options fr-routes"><button class="active" type="button"><small>路径 A</small><b>${p.name}</b><em>✓</em></button></div></div>${isMaster?'<div class="fr-strength-note"><b>硕士申请重点</b><span><strong>学术基础</strong>：GPA、先修课程及法语成绩</span><span><strong>专业背景</strong>：实习、科研、项目及申请文书</span></div>':'<div class="fr-strength-note"><b>申请竞争力参考</b><span><strong>硬实力约60%</strong>：学历背景、均分、语言及高考成绩</span><span><strong>软实力约40%</strong>：文书、实习、科研、获奖及活动经历</span></div>'}<div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isMaster?'语言、GPA与专业背景建设':'语言与背景建设'}</div><div>${isMaster?'申请执行 · 材料 / 录取 / 签证入学':'申请执行 · DAP / Études en France / 签证入学'}</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>${isMaster?'硕士节点':'留学节点'}</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>申请时间及要求以Campus France、法国院校和当年度官方政策为准。</span></footer></section>`}
UI.studyPlan=state=>state?.country==='FR'?view(state):base(state);
})();
