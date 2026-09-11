(function(){
const base=UI.studyPlan,countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国']];
const common=[
['高一上','秋季周末/晚班：韩语T1，180课时，每周6-10小时；寒假复习巩固','明确留学意向；了解院校及专业方向；保持在校成绩'],
['高一下','春季周末/晚班：韩语T2，180课时，每周6-10小时；暑假全日制：韩语T3，180课时','探索专业方向；参加课外活动及背景提升'],
['高二上','秋季周末/晚班：韩语T4，180课时，每周6-10小时；寒假复习巩固','初步选校选专业；了解目标院校语言及申请要求'],
['高二下','春季周末/晚班：韩语T5，180课时，每周6-10小时；暑假全日制：韩语T6，180课时；强化TOPIK训练','确定目标院校及专业；提前准备申请材料'],
['高三上','TOPIK集中备考约120课时，每周6-10小时；参加TOPIK考试并持续刷分','最终定校定专业；准备文书及申请材料']];
const plans={direct:{name:'秋季9月入学',label:'高三毕业当年9月',items:[...common,
['高三下3-6月','继续TOPIK刷分；根据目标院校要求补充语言成绩','递交本科申请；根据院校要求参加面试/校考；跟进申请结果'],
['高三下6-7月','加强生活韩语及学术韩语','查询录取并确定院校；缴费并申请宿舍；准备入学许可及签证材料'],
['毕业7-8月','强化赴韩生活及学术韩语','获取入学许可并办理D-2签证；完成行前指导；准备入境材料'],
['毕业当年9月','进入韩国大学后的韩语及专业课程学习','赴韩报到；完成注册及入学手续、正式进入韩国本科']]},prep:{name:'次年3月入学',label:'高中毕业次年3月',items:[...common,
['高三下','继续TOPIK备考及刷分','完成高中学业；完善文书及申请材料'],
['毕业6-8月','TOPIK集中强化及刷分','取得毕业证及成绩单；最终定校定专业；完成文书、公证及认证材料'],
['毕业8-11月','按院校要求补充TOPIK成绩','完成网申及材料递交；参加面试/校考；跟进补件及申请进度'],
['11月-次年1月','保持韩语并加强学术韩语','查询录取并确定院校；缴费并申请宿舍；准备入学许可及签证材料'],
['次年1-2月','强化赴韩生活及学术韩语','获取入学许可并办理D-2签证；完成行前指导；准备入境材料'],
['毕业次年3月','进入韩国大学后的韩语及专业课程学习','赴韩报到；完成注册及入学手续；正式进入韩国本科']]}};
const masterCommon=[
['大一上','秋季周末/晚班：韩语T1，180课时，每周6-10小时；寒假复习巩固','明确韩国读研意向；保持本科GPA；了解专业与院校方向'],
['大一下','春季周末/晚班：韩语T2，180课时，每周6-10小时；暑假全日制：韩语T3，180课时','保持本科GPA；参加社团、实习或科研；积累专业背景'],
['大二上','秋季周末/晚班：韩语T4，180课时，每周6-10小时；寒假复习巩固','明确专业方向；初步选择院校；持续提升GPA'],
['大二下','春季周末/晚班：韩语T5，180课时，每周6-10小时；暑假全日制：韩语T6，180课时','确定院校梯度；参加实习、竞赛或科研；准备申请素材'],
['大三上','秋季周末/晚班：TOPIK II备考，120课时，每周6-10小时','核对院校要求；准备文书及材料；制定TOPIK刷分计划']
];
const masterPlans={
direct:{name:'春季3月入学',label:'毕业次年3月',items:[...masterCommon,
['大三下4-7月','参加TOPIK II考试；根据成绩安排2-3次刷分；争取TOPIK 6级','5-7月确定申请方案及院校；准备网申与基础材料'],
['大四上8-11月','参加7月/10月TOPIK考试；按成绩继续补强','8-11月完成网申及材料递交；跟进审核与补件'],
['大四上11月-次年1月','保持韩语学习；加强学术及专业场景韩语','获取录取并缴纳学费；取得标准入学许可；准备签证材料'],
['次年2月','强化赴韩生活韩语及行前沟通','办理签证与住宿；完成行前指导；购买机票并赴韩'],
['次年3月','进入韩国大学后的韩语及专业课程学习','赴韩报到并完成注册；正式入读韩国硕士']]},
prep:{name:'秋季9月入学',label:'毕业当年9月',items:[...masterCommon,
['大三下1-4月','参加1月/4月TOPIK考试；根据成绩持续刷分','12月-2月确定申请方案及院校；准备申请材料'],
['大四下3-5月','继续TOPIK刷分；按院校要求补充语言成绩','3-5月完成网申及材料递交；跟进审核与补件'],
['毕业6-7月','保持韩语学习；加强学术韩语','获取录取并缴纳学费；确认最终入学院校'],
['毕业7-8月','强化赴韩生活及学术韩语','取得标准入学许可；办理签证、住宿及机票'],
['毕业当年8月','进行赴韩前语言与行前准备','完成行前指导并赴韩'],
['毕业当年9月','进入韩国大学后的韩语及专业课程学习','赴韩报到并完成注册；正式入读韩国硕士']]}
};
function blocks(s,type){let parts=s.split('；').filter(Boolean);if(type==='apply'&&parts.length>3){const size=Math.ceil(parts.length/3),grouped=[];for(let i=0;i<parts.length;i+=size)grouped.push(parts.slice(i,i+size).join('；'));parts=grouped}return parts.map(t=>{if(type==='learn'){const m=t.match(/^(.+?)[：:]韩语(T[1-6])[，,](\d+课时)(.*)$/);if(m)return`<div class="kr-course"><span>${m[1]}</span><b>韩语 ${m[2]}</b><em>${m[3]}</em>${m[4]?`<small>${m[4].replace(/^[，,]/,'')}</small>`:''}</div>`}let v=t.replace(/(T[1-6]|TOPIK|D-2|\d+课时|每周6-10小时)/g,'<mark>$1</mark>');return`<p class="${type}">${v}</p>`}).join('')}
function view(state){const p=plans[state.route]||plans.direct,n=p.items.length;return`<section class="matrix-page kr-compact kr-german-layout" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">KOREA UNDERGRADUATE ROADMAP</p><h2>韩国高中生申请本科规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='KR'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header><div class="matrix-scenarios kr-single-scenario"><button class="active"><i>▣</i><span><b>高中生申请本科</b><small>国内普高 · 高一开始规划</small></span></button></div><div class="matrix-route kr-route"><div class="route-summary"><span>韩国高中生申请本科</span><b>${p.name}</b><p>高一至高三上为通用准备，高三下按目标入学季进入不同申请路径。</p></div><div class="route-options">${Object.entries(plans).map(([id,x])=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><small>${id==='direct'?'路径 A':'路径 B'}</small><b>${x.name}</b><em>✓</em></button>`).join('')}</div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>通用准备 · 语言与背景建设</div><div>${p.name} · 申请与入学执行</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<5?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${p.items.map((x,i)=>`<article class="${i<5?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>留学节点</strong>${p.items.map((x,i)=>`<article class="${i<5?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 前5个阶段为通用准备，之后进入对应入学方案。<span>具体要求以韩国院校及官方最新政策为准。</span></footer></section>`}
function masterView(state){const p=masterPlans[state.route]||masterPlans.direct,n=p.items.length;return`<section class="matrix-page kr-compact kr-german-layout kr-master" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">KOREA MASTER ROADMAP</p><h2>韩国本科申请硕士规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='KR'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header><div class="matrix-scenarios kr-master-scenarios"><button data-plan-scenario="highschool"><i>▣</i><span><b>高中生申请本科</b><small>国内普高 · 高一开始规划</small></span></button><button class="active" data-plan-scenario="master"><i>◇</i><span><b>本科申请硕士</b><small>本科在读 · 大一开始规划</small></span></button></div><div class="matrix-route kr-route"><div class="route-summary"><span>韩国本科申请硕士</span><b>${p.name}</b><p>本科阶段完成韩语、GPA及专业背景准备，毕业前按目标入学季完成申请。</p></div><div class="route-options">${Object.entries(masterPlans).map(([id,x])=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><small>${id==='direct'?'路径 A':'路径 B'}</small><b>${x.name}</b><em>✓</em></button>`).join('')}</div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>准备阶段 · 韩语、GPA与专业背景</div><div>${p.name} · 申请、签证与入学</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<5?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言学习</strong>${p.items.map((x,i)=>`<article class="${i<5?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>留学节点</strong>${p.items.map((x,i)=>`<article class="${i<5?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 前5个阶段为通用准备，之后进入申请、录取、签证与入学阶段。<span>具体要求以韩国院校及官方最新政策为准。</span></footer></section>`}
function highWithMasterEntry(html){return html.replace('<div class="matrix-scenarios kr-single-scenario"><button class="active"><i>▣</i><span><b>高中生申请本科</b><small>国内普高 · 高一开始规划</small></span></button></div>','<div class="matrix-scenarios kr-master-scenarios"><button class="active" data-plan-scenario="highschool"><i>▣</i><span><b>高中生申请本科</b><small>国内普高 · 高一开始规划</small></span></button><button data-plan-scenario="master"><i>◇</i><span><b>本科申请硕士</b><small>本科在读 · 大一开始规划</small></span></button></div>')}
UI.studyPlan=state=>state?.country==='KR'?(state.scenario==='master'?masterView(state):highWithMasterEntry(view(state))):base(state);
})();
