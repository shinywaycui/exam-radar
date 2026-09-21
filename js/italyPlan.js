(function(){
const base=UI.studyPlan;
const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国'],['FR','🇫🇷','法国'],['IT','🇮🇹','意大利'],['ES','🇪🇸','西班牙']];
const plan={name:'国际生本科直入',label:'高中毕业后9–10月入学',items:[
['高一上','秋季周末/晚班：意大利语A1，180课时，每周6–10小时；寒假复习巩固','明确意大利本科留学意向及国际生路线；了解意大利院校及专业方向；保持高中在校成绩'],
['高一下','春季周末/晚班：意大利语A2，180课时，每周6–10小时；暑假全日制：意大利语B1，240课时，集中学习约1个月','保持高中在校成绩；探索专业及院校方向；参加实践、竞赛等背景提升'],
['高二上','秋季周末/晚班：意大利语B2.1，180课时，每周6–10小时；寒假复习巩固','初步选校选专业，建立院校梯度；了解目标专业语言及入学要求；关注TOLC/校考等考试要求'],
['高二下','春季周末/晚班：意大利语B2.2，180课时，每周6–10小时；暑假全日制：意大利语考试备考120课时，集中学习约20天','确定目标院校及专业方向；了解国际生申请及Universitaly预注册流程；准备语言考试及本科申请材料'],
['高二暑假–高三上','参加CILS/CELI等意大利语考试，目标达到B2；根据成绩持续刷分；同步备战高考','最终确定目标院校及专业；确认TOLC/校考/面试等要求并参加相应考试；准备并根据院校开放时间递交申请材料'],
['高三下1–3月','如尚未取得B2，集中进行语言刷分；同步备战高考','3月前后建议基本确定最终申请志愿；完成院校申请及文书材料；根据院校要求参加TOLC/校考'],
['高三下4–6月','⚠️ B2关键出分期：建议4–6月完成CILS/CELI B2考试，最晚在预注册/签证要求前取得B2语言证明；部分院校可参加校内语言测试','跟进院校申请及考试结果；准备国际生预注册所需材料；6月参加高考'],
['高中毕业6–7月','保持意大利语能力，加强生活及学术意大利语','根据当年度安排完成Universitaly线上预注册；准备学历认证、公证/认证等材料；根据要求办理价值声明或相应学历认证材料'],
['高中毕业7–9月','保持意大利语能力；加强生活意大利语、学术意大利语及专业词汇','跟进Universitaly预注册及院校确认；准备并办理留学签证；落实住宿、保险、机票等事项，完成行前准备'],
['9–10月','进入意大利后的语言及专业课程学习','赴意大利报到并完成注册；正式进入意大利本科']
]};
const marcoPoloPlan={name:'马可波罗计划生',label:'高中毕业次年9–10月入学',items:[
['高二上','秋季周末/晚班：意大利语A1，180课时，每周6–10小时；寒假复习巩固','明确意大利本科留学意向及马可波罗计划路线；了解意大利院校及专业方向；保持高中在校成绩'],
['高二下','春季周末/晚班：意大利语A2，180课时，每周6–10小时；暑假复习巩固','初步选校选专业，建立院校梯度；了解目标专业及入学要求；关注TOLC/校考等考试要求'],
['高三上','以高考备考为主；关注国内12月CILS A2 Standard场次，提前报名并争取首考通过','确定主要院校及专业方向；了解马可波罗计划预注册流程；确认目标院校TOLC/校考等要求'],
['高三下1–6月','以高考备考为主；6月参加高考，高考结束后恢复意大利语学习；未取得A2可关注国内4月CILS A2 Standard补考，6月场次作为备用；提前确认国内考点开放等级及报名截止，预留约3个月出分时间','进一步确定目标院校及专业志愿；提前准备计划生申请及预注册相关材料；6月参加高考，确认成绩及当年度计划生申请资格'],
['高中毕业6–9月','全日制集中学习：B1 → B2.1 → B2.2；重点提升听说读写及生活意大利语能力；⚠️ 赴意前须在国内考出A2并取得合格语言证明；6月补考须确认出分赶得上签证材料提交，避免等到出发前才考试','7–8月确定最终院校及专业志愿；根据当年度安排完成Universitaly马可波罗计划线上预注册；准备学历认证、公证/认证、价值声明等相关材料'],
['高中毕业9–10月','巩固B1/B2阶段内容，加强口语及生活意大利语，为赴意后的语言学习做好衔接','跟进预注册及院校确认；确认已取得国内A2合格语言证明，准备并办理留学签证；落实住宿、保险、机票等行前事项'],
['10月下旬–次年2月','赴意后参加马可波罗计划语言课程；在国内B1/B2基础上继续强化B2，重点提升听说、学术及专业意大利语','10月下旬赴意并完成语言学校报到；适应意大利学习及生活；了解目标本科专业TOLC/校考等具体入学要求'],
['次年3–6月','持续参加计划生语言课程并强化B2；重点关注3月CELI（佩鲁贾）、4月CILS（锡耶纳）、6月CELI/CILS考试节点，根据目标院校要求参加B1/B2等级考试','准备并递交本科申请材料；根据院校要求参加TOLC/校考；跟进院校审核及申请结果'],
['次年7–8月','完成计划生语言课程；⚠️ 语言关键出分期：建议在本科注册/院校规定的语言证明截止日前取得B1/B2合格成绩','完成语言课程及本科入学准备；确认录取及后续入学要求；准备本科正式注册材料'],
['次年9–10月','达到目标院校要求的意大利语水平；进入本科后的学术及专业意大利语学习','如院校/专业要求，参加最终入学考试；完成本科注册及入学手续；正式进入意大利本科']
]};
const masterPlan={name:'国际生硕士直入',label:'本科毕业后9–10月入学',items:[
['大一上','秋季周末/晚班：意大利语A1，180课时，每周6–10小时；寒假复习巩固','明确意大利硕士留学意向及专业方向；保持并提升本科GPA；了解意大利院校及硕士基本申请要求'],
['大一下','春季周末/晚班：意大利语A2，180课时，每周6–10小时；暑假复习巩固','保持本科GPA及专业课成绩；了解专业匹配及先修课程要求；参加实践、竞赛、科研等背景提升'],
['大二上','秋季周末/晚班：意大利语B1，240课时，每周6–10小时；寒假复习巩固','明确硕士申请专业方向；初步了解目标院校及专业要求；参加专业相关实习、科研或项目'],
['大二下','春季周末/晚班：意大利语B2.1，180课时，每周6–10小时；暑假全日制：意大利语B2.2，180课时','初步确定选校及专业方案；关注课程匹配度及语言要求；持续积累实习、科研及项目经历'],
['大三上','意大利语考试备考120课时；完成B2阶段学习后参加CILS/CELI考试；可重点关注11月CELI、12月CILS场次，争取首考取得B2','确定目标院校及专业梯度；确认各项目课程匹配及语言要求；开始准备CV、动机信、推荐信等申请素材'],
['大三下3–6月','根据首考成绩继续刷分；可重点参加3月CELI、4月CILS、6月CELI/CILS，争取大三结束前取得B2','进一步确定申请院校及专业；参加专业相关实习、科研或项目；完善个人背景及申请材料'],
['大三暑假7–8月','根据考试成绩查漏补缺；未达到B2则准备下一场考试；英授项目同步准备IELTS/TOEFL等英语成绩','最终确定选校及专业方案；完成文书及主要申请材料；确认各院校申请开放时间'],
['大四上9月起','已取得B2则保持语言能力；未达标可关注11月CELI、12月CILS，但需确认目标项目是否允许后补语言成绩','进入硕士正式申请季；根据各院校开放时间陆续网申；跟进材料审核、补件及面试'],
['大四下3–4月','⚠️ B2关键刷分节点：如仍需语言成绩，可关注3月CELI、4月CILS场次','跟进申请及录取结果；确定最终入学院校；准备预注册及毕业相关材料'],
['大四下5–6月','⚠️ 最后重要考试窗口：可关注6月CELI/CILS；建议尽早取得B2，为预注册及签证留出时间','完成本科毕业及最终材料准备；确认录取并办理后续手续；准备国际生预注册材料'],
['本科毕业6–7月','⚠️ 最晚出分提醒：意授硕士建议在Universitaly预注册/院校规定节点前取得B2语言证明；部分院校可接受校内语言测试','根据当年度安排完成Universitaly线上预注册；准备学历认证、公证/认证等材料；根据要求办理价值声明等材料'],
['本科毕业7–9月','保持语言能力，加强生活及学术意大利语；英授学生可学习基础生活意大利语','跟进预注册及院校确认；准备并办理留学签证；落实住宿、保险、机票等行前事项'],
['9–10月','进入意大利后的学术语言及专业课程学习','赴意大利报到并完成注册；正式进入意大利硕士阶段']
]};
const masterMarcoPoloPlan={name:'马可波罗计划生硕士',label:'本科毕业次年9–10月入学',items:[
['大三上','秋季周末/晚班：意大利语A1，180课时，每周6–10小时；寒假复习巩固A1','明确意大利硕士留学意向及马可波罗计划路线；初步确定专业方向及目标院校；关注课程匹配及目标专业申请要求'],
['大三下','春季周末/晚班：意大利语A2，180课时，每周6–10小时；完成A2阶段学习并巩固基础听说读写','初步建立选校及专业梯度；了解目标项目语言、课程匹配及申请要求；持续参加实习、科研或专业相关项目'],
['大四上','秋季周末/晚班：意大利语B1，240课时，每周6–10小时；寒假复习巩固B1；关注国内12月CILS A2 Standard场次，提前报名并争取首考通过','进入硕士申请准备/申请阶段；根据目标院校开放时间陆续递交申请；跟进材料审核、补件及面试'],
['大四下','春季周末/晚班：意大利语B2.1，180课时，每周6–10小时；重点提升复杂表达、阅读及学术语言能力；未取得A2可关注国内4月CILS A2 Standard补考，6月场次作为备用；提前确认国内考点开放等级及报名截止，预留约3个月出分时间','跟进硕士申请及录取结果；确定最终预注册院校及专业；准备毕业、计划生预注册及签证相关材料'],
['本科毕业6–8月','全日制集中学习：意大利语B2.2，180课时；完成B2阶段学习，重点强化听说、学术及专业意大利语；国内阶段以完成B2课程为主，不强求取得B2证书；⚠️ 赴意前须在国内考出A2并取得合格语言证明；6月补考须确认出分赶得上签证材料提交，避免等到出发前才考试','根据当年度安排完成Universitaly马可波罗计划线上预注册；准备学历认证、公证/认证、价值声明等材料；确认最终预注册院校及专业'],
['本科毕业9–10月','巩固B2阶段内容，加强口语及生活意大利语，为赴意后的语言学习做好衔接','跟进预注册及院校确认；确认已取得国内A2合格语言证明，准备并办理留学签证；落实住宿、保险、机票等行前事项'],
['10月下旬–次年2月','赴意后参加马可波罗计划语言课程；在国内B2课程基础上继续强化B2，重点提升听说、学术及专业意大利语','10月下旬赴意并完成语言学校报到；跟进硕士申请及录取情况；确认目标项目最终语言及入学要求'],
['次年3–6月','持续B2强化；进入语言考试重点阶段：重点关注3月CELI（佩鲁贾）、4月CILS（锡耶纳）、6月CELI/CILS，争取取得目标院校要求的B1/B2语言证书','跟进录取及补充材料；完成硕士入学相关手续；确认目标院校语言成绩提交截止时间'],
['次年7–8月','完成计划生语言课程；⚠️ 语言关键出分期：在目标院校规定的语言证明提交/注册截止日前取得合格语言成绩','确认最终录取及入学资格；完成硕士注册前材料准备；落实住宿及开学相关事项'],
['次年9–10月','达到目标硕士项目要求的语言水平，进入学术及专业意大利语学习','如项目要求，参加相应入学考试；完成硕士注册及入学手续；正式进入意大利硕士阶段']
]};
function highlight(s){return s.replace(/(CILS|CELI|TOLC|Universitaly|IELTS|TOEFL|CV|GPA|A1|A2|B1|B2\.1|B2\.2|B2|\d+课时|每周6–10小时|3–6月|4–6月|6月|11月|12月)/g,'<mark>$1</mark>')}
function blocks(s,type){return s.split('；').filter(Boolean).map(t=>{if(type==='learn'){const m=t.match(/^(.+?)[：:]意大利语(A1|A2|B1|B2\.1|B2\.2)[，,](\d+课时)(.*)$/);if(m)return`<div class="kr-course it-course"><span>${m[1]}</span><b>意大利语 ${m[2]}</b><em>${m[3]}</em>${m[4]?`<small>${m[4].replace(/^[，,]/,'')}</small>`:''}</div>`}return`<p class="${type}${t.startsWith('⚠️')?' it-warning':''}">${highlight(t)}</p>`}).join('')}
function scenarioTabs(active){return`<div class="matrix-scenarios kr-master-scenarios it-scenarios"><button class="${active==='highschool'?'active':''}" data-plan-scenario="highschool"><i>意</i><span><b>高中生申请本科</b><small>国际生 · 本科专业直入</small></span><em>✓</em></button><button class="${active==='master'?'active':''}" data-plan-scenario="master"><i>研</i><span><b>本科申请硕士</b><small>国际生 · 硕士专业直入</small></span><em>✓</em></button></div>`}
function routeOptions(isMaster,isPrep,isMasterPrep,p){if(isMaster)return`<div class="route-options it-routes"><button class="${isMasterPrep?'':'active'}" data-plan-route="direct"><small>路径 A</small><b>国际生硕士直入</b><em>✓</em></button><button class="${isMasterPrep?'active':''}" data-plan-route="masterPrep"><small>路径 B</small><b>马可波罗计划生硕士</b><em>✓</em></button></div>`;return`<div class="route-options it-routes"><button class="${isPrep?'':'active'}" data-plan-route="direct"><small>路径 A</small><b>国际生本科直入</b><em>✓</em></button><button class="${isPrep?'active':''}" data-plan-route="prep"><small>路径 B</small><b>马可波罗计划生</b><em>✓</em></button></div>`}
function view(state){const isMaster=state?.scenario==='master',isPrep=!isMaster&&state?.route==='prep',isMasterPrep=isMaster&&state?.route==='masterPrep',p=isMaster?(isMasterPrep?masterMarcoPoloPlan:masterPlan):(isPrep?marcoPoloPlan:plan),n=p.items.length,split=4;return`<section class="matrix-page kr-compact kr-german-layout it-layout ${isMaster?'it-master':''} ${isPrep||isMasterPrep?'it-marco-polo':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">${isPrep||isMasterPrep?'ITALY MARCO POLO ROADMAP':'ITALY INTERNATIONAL STUDENT ROADMAP'}</p><h2>${isMaster?(isMasterPrep?'意大利本科申请硕士马可波罗计划':'意大利本科申请硕士国际生规划'):isPrep?'意大利马可波罗计划生本科规划':'意大利高中生国际生本科规划'}</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='IT'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs(isMaster?'master':'highschool')}<div class="matrix-route kr-route it-single-route"><div class="route-summary"><span>${isMaster?'意大利本科生申请硕士':'意大利高中生申请本科'}</span><b>${p.name}</b><p>${isMasterPrep?'大三开始准备意大利语与硕士申请，毕业后赴意完成计划生语言课程，次年注册入读硕士。':isMaster?'本科阶段完成意大利语、GPA及专业背景准备，毕业当年完成申请、预注册、签证并赴意入学。':isPrep?'高二开始准备意大利语与院校方向，高考后完成计划生预注册，赴意学习语言并于次年入读本科。':'高中阶段完成意大利语与升学准备，毕业当年完成预注册、签证并赴意入学。'}</p></div>${routeOptions(isMaster,isPrep,isMasterPrep,p)}</div><div class="it-language-note"><b>${isPrep||isMasterPrep?'计划生语言提醒':'B2 出分提醒'}</b><span>${isMasterPrep?'赴意前须在国内取得A2合格语言证明，国内阶段继续完成B2课程；赴意后继续强化，并在硕士注册截止日前取得项目要求的合格语言成绩。':isMaster?'建议大三结束前取得B2；最晚应在Universitaly预注册或院校规定节点前取得语言证明。':isPrep?'赴意前须在国内取得A2合格语言证明；赴意后继续参加计划生语言课程，并在本科注册或院校规定节点前取得B1/B2合格成绩。':'建议4–6月完成CILS/CELI B2考试，并在预注册或签证要求前取得语言证明。'}</span></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isMasterPrep?'国内准备 · 语言 / 申请 / 预注册':isMaster?'语言、GPA与专业背景建设':isPrep?'国内准备 · 语言 / 高考 / 预注册':'语言与升学能力建设'}</div><div>${isMasterPrep?'赴意执行 · 语言课程 / 考试 / 硕士入学':isPrep?'赴意执行 · 语言课程 / 考试 / 本科入学':'国际生申请 · 预注册 / 签证 / 入学'}</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>${isMaster?'硕士节点':'留学节点'}</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>考试日期、A2等级开放及报名截止以国内授权考点当年通知为准；申请、预注册、语言和签证要求以意大利院校及当年度官方政策为准。</span></footer></section>`}
UI.studyPlan=state=>state?.country==='IT'?view(state):base(state);
})();
