(function(){
const base=UI.studyPlan;
const countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国']];
const common=[
['高一上','秋季周末/晚班：日语N5，180课时，每周6–8小时','明确日本本科留学意向及升学路线；了解日本院校及专业方向；保持高中在校成绩'],
['高一下','春季周末/晚班：日语N4，180课时，每周6–8小时','探索专业及院校方向；了解日本本科基本升学要求；保持高中在校成绩'],
['高二上','秋季周末/晚班：日语N3，180课时，每周6–8小时','初步选校选专业，建立院校梯度；了解目标院校JLPT/EJU要求；规划后续升学及考试方向'],
['高二下','春季周末/晚班：日语N2，180课时，每周6–8小时','确定主要升学路线及目标院校；了解目标院校申请及考试要求；梳理后续本科申请规划'],
['高三上','周末/晚班：日语N1，180课时，每周6–8小时','最终确定院校及专业方向；确认EJU、JLPT及校内考要求；提前准备本科申请材料'],
['高三下','保持N2/N1能力；同步进行EJU基础备考','完成高中学业及高考；确定EJU报考场次；准备成绩及毕业材料']];
const languageSchoolCommon=[
['高一上','秋季周末/晚班：日语N5，180课时，每周6–8小时','明确日本本科留学意向及升学路线；了解日本院校及专业方向；保持高中在校成绩'],
['高一下','春季周末/晚班：日语N4，180课时，每周6–8小时','探索专业及院校方向；了解日本本科基本升学要求；保持高中在校成绩'],
['高二上','秋季周末/晚班：日语N3，180课时，每周6–8小时；暑假开始EJU课程','完成语言学校报名及面试；同步启动留考学习'],
['高二下','春季周末/晚班：日语N2，180课时，每周6–8小时；持续EJU备考','获得语言学校合格通知；进行留考备考'],
['高三上','周末/晚班：日语N1，180课时，每周6–8小时','递交正式材料；申请在留资格'],
['高三下2–3月','保持N2/N1能力；持续EJU基础备考','获得在留资格认定书；办理签证、住宿等事宜；完成行前辅导']];
const privateCommon=[
['高一上','秋季周末/晚班：日语N5，180课时，每周6–8小时','明确日本本科留学意向；了解私立大学及专业；保持高中在校成绩'],
['高一下','春季周末/晚班：日语N4，180课时，每周6–8小时','探索专业及院校方向；了解私立本科直申要求；保持高中在校成绩'],
['高二上','秋季周末/晚班：日语N3，180课时，每周6–8小时','初步选校选专业；确认目标院校JLPT要求；规划语言考试节奏'],
['高二下','春季周末/晚班：日语N2，180课时，每周6–8小时','参加7月JLPT N2考试；根据成绩调整目标；梳理申请规划'],
['高三上','周末/晚班：日语N1，180课时，每周6–8小时','最终确定院校及专业方向；准备本科申请材料；递交本科申请'],
['高三下','保持日语N2/N1能力；以高考备考为主','参加大学入学考试；按院校安排参加线上或国内线下考试']];
const undergraduate={direct:{name:'语言学校 → 本科',label:'高三下4月赴日',items:[...languageSchoolCommon,
['高三下4月','进入日本语言学校；准备EJU考试','赴日就读语言学校；完成报到及注册；进入留考备考阶段'],
['6–10月','6月参加首次EJU试水；按成绩查漏补缺，继续日语及留考刷分','参加首次EJU并等待成绩；8–10月参加大学校内考；按结果调整备考重点'],
['11月–次年2月','11月参加第二次EJU；按成绩强化目标大学校内考及面试','12月获取EJU成绩并报名冲刺院校；1–2月参加校内考及面试；跟进结果'],
['3–4月','保持日语及学术能力；衔接大学专业课程','3月获得最终录取结果；4月完成报到及注册；正式入读日本本科']]},prep:{name:'私立大学本科直申',label:'次年4月入学',items:[...privateCommon,
['高考后6–8月','保持日语及学术日语能力','确认最终入读院校并完成入学手续；办理在留资格及留学签证；完成住宿、机票及行前事项'],
['9月/10月','进入大学后的日语及专业课程学习','赴日报到并完成注册；正式进入日本本科']]}};
const sgu={name:'SGU英文授课直申',label:'9月/10月入学',items:[
['高一上','英语基础提升；重点强化词汇、语法、阅读及听力基础','明确日本SGU/英文授课本科方向；了解院校及专业选择；保持良好的高中在校成绩'],
['高一下','英语综合能力提升；逐步接触雅思/托福题型','探索专业及院校方向；参加课外活动及背景提升；了解不同项目申请要求'],
['高二上','进入雅思/托福系统备考；建议开始参加首考','初步选校选专业，建立院校梯度；确认目标项目英语及学术成绩要求；规划标化考试及申请节奏'],
['高二下','雅思/托福强化及刷分；根据目标院校准备SAT/ACT等标化','确定目标院校及英文授课项目；根据项目要求准备英语及标化成绩；梳理个人背景及申请素材'],
['高三上','雅思/托福冲刺；建议托福80+或雅思6.0+；冲刺名校建议托福90-100+或雅思6.5-7.0+；完成所需标化考试','最终定校定专业；准备文书、推荐信及成绩材料；陆续进入SGU申请阶段'],
['高三下','根据目标项目要求继续雅思/托福及标化刷分；根据需要准备英文面试','陆续递交英文授课本科申请；根据要求参加材料审核及面试；跟进录取结果'],
['高中毕业6-8月','保持英语能力；可提前学习基础日语及生活日语','确定最终入学院校并完成入学手续；办理在留资格及留学签证；完成住宿、机票及行前准备'],
['9月/10月','进入英文授课本科；持续提升学术英语，可同步学习日语','赴日报到并完成注册；正式进入日本本科']]};
const sguMaster={name:'SGU英文授课硕士',label:'毕业后9月/10月入学',items:[
['大二上','托福基础学习，每周6–8小时；强化词汇、语法、阅读及听力基础','明确日本SGU修士申请方向；保持并提升本科GPA；了解目标院校及专业要求'],
['大二下','托福系统学习，每周6–8小时；逐步接触GRE题型及学术词汇','初步确定选校及专业方向；参加实习、科研及实践项目；积累学术及申请背景'],
['大二暑期7–8月','托福及GRE集中学习；进行阶段模考及查漏补缺','初步确认选校方案；参加实习、科研及实践项目；准备推荐信（如有）'],
['大三上','托福及GRE集中备考；根据目标项目要求参加考试','确定院校及申请教授方向；匹配目标教授；着手准备研究计划书'],
['大三下3–4月','持续托福/GRE备考；根据阶段成绩针对性强化','初步完成研究计划书；准备教授套磁材料；开具成绩单等基础材料'],
['大三下5–9月','取得托福成绩；根据需要继续GRE及语言刷分','确认教授并开始套磁发信；参加实习、科研及实践；进行面试辅导并参加面试'],
['大四上10月–大四下3月','根据申请要求进行托福/GRE最终刷分；强化学术英语及英文面试','持续教授沟通及面试；争取教授内诺；完善研究计划书及申请材料'],
['大四下4–6月','保持英语及专业学习能力；准备英文授课修士课程','确定院校并完成正式出愿；跟进审核及录取结果；获得入学许可'],
['毕业后7–9月','强化学术英语；提前学习基础生活日语','获得在留资格并办理签证；完成住宿及行前准备；办理入学手续'],
['毕业后9–10月','进入英文授课修士课程；持续提升学术英语','赴日报到并完成注册；正式入读SGU英文授课修士']]};
const master={name:'语言学校 → 修士直考',label:'次年4月入读修士',items:[
['大二上','秋季周末/晚班：日语N5，180课时，每周6–8小时；目标1500词/75–85条语法','明确赴日读研意向；保持并提升本科GPA；参加实习、竞赛及科研'],
['大二下','春季周末/晚班：日语N4，180课时，每周6–8小时；暑期全日制：日语N3，150课时，集中学习1个月；目标3500词/120条语法','保持本科GPA；参加课外活动及专业竞赛；初步确认院校及专业'],
['大三上','秋季周末/晚班：日语N2，180课时，每周6–8小时；目标5000–7000词/200条语法；寒假巩固','提升专业及科研背景；确定匹配教授及申请方向'],
['大三下','春季周末/晚班：日语N1，180课时，每周6–8小时；7月JLPT N1；暑期托福目标85+','7月申请语言学校并参加面试；获得语言学校合格通知'],
['大四上','持续巩固日语N1；托福备考及刷分；12月建议参加JLPT考试','开始着手修士备考课程；准备语言学校正式材料；了解目标大学院考试要求'],
['大四上1–2月','保持日语及专业课学习；按目标院校要求准备英语','开具语言学校纸质材料；递交入管局申请材料；申请在留资格'],
['大四下3–4月','持续学习日语','等待入管局审核；准备本科毕业及赴日材料；完善研究计划书'],
['本科毕业5–6月','强化日语、专业课及修士考试准备','获得在留资格认定书；缴费、落实住宿并办理签证；完成行前辅导'],
['7月','入读语言学校；集中准备修士考试','正式入读语言学校；N2及以上可尝试修士夏季考；完成出愿准备'],
['7–9月','强化专业课、研究计划书及面试；按需准备英语成绩','参加大学院修士夏季考；按夏考结果调整院校；准备修士冬季考'],
['12月–次年2月','持续强化专业课、研究计划书及面试','参加大学院修士冬季考；跟进考试及录取结果'],
['次年3–4月','完成修士入学前专业及语言准备','获得修士合格通知；办理语言学校退学及在留变更；正式入读大学院修士']]};
const masterPrep={name:'研究生预科 → 修士',label:'毕业次年4月入读修士',items:[
['大一上','秋季周末/晚班：日语N5，180课时，每周6–8小时','明确日本读研意向及专业方向；保持并提升本科GPA；了解日本大学院升学路径'],
['大一下','春季周末/晚班：日语N4，180课时，每周6–8小时','保持本科GPA；探索专业及研究方向；参加实践及课外活动'],
['大二上','秋季周末/晚班：日语N3，150课时，每周6–8小时','明确专业及研究方向；参加实践、科研或实习；了解目标院校及研究科'],
['大二下','春季周末/晚班：日语N2，180课时，每周6–8小时；根据基础参加JLPT考试','参加实践、科研或实习；初步确定选校方案；开具推荐信（如有）'],
['大三上','秋季周末/晚班：日语N1，180课时，每周6–8小时；尝试参加JLPT','确认申请教授及研究方向；确定院校匹配教授；着手准备研究计划书'],
['大三下','春季周末/晚班：日语JLPT备考班，90课时；托福集中备考，目标85+；持续巩固N1并于12月刷分JLPT','取得托福成绩并开始教授套磁；初步完成研究计划书；准备成绩单等基础材料'],
['大三下暑期','保持日语及英语能力；JLPT和托福持续刷分；按目标院校要求补充语言成绩','进行教授面试辅导；参加教授面试；争取获得教授内诺'],
['大四上+寒假','持续提升学术日语及专业英语能力；JLPT和托福持续刷分','继续参加科研、实践或实习；完善研究计划书及材料；参加教授或研究科面试'],
['大四下4–8月','加强学术日语及专业能力；准备赴日研究及修士考试','确定院校并完成研究生出愿；获得入学许可并办理在留；办理签证及行前准备'],
['毕业当年9–10月','强化专业课、研究计划书及修士考试','正式入读研究生预科；跟随教授开展研究；准备修士考试出愿'],
['12月–次年3月','持续强化专业课、研究计划书及面试','就读研究生并报名修士考试；参加修士笔试及面试；获得考试结果'],
['毕业次年4月','完成修士入学前语言及专业准备','完成修士入学手续；结束研究生阶段；正式入读大学院修士']]};
function blocks(s,type){let a=s.split('；').filter(Boolean);if(type==='apply'&&a.length>3){const size=Math.ceil(a.length/3),g=[];for(let i=0;i<a.length;i+=size)g.push(a.slice(i,i+size).join('；'));a=g}return a.map(t=>{if(type==='learn'){const c=t.match(/^(.+?(?:班|全日制))：日语(N[1-5])，(\d+课时)(?:，每周(.+小时)|，集中学习(.+))$/);if(c)return`<div class="kr-course jp-course"><span>${c[1]}</span><b>日语 ${c[2]}</b><em>${c[3]}</em><small>${c[4]?'每周'+c[4]:c[5]}</small></div>`;if(t.startsWith('EJU课程：')){const p=t.replace('EJU课程：','').split('，');return`<div class="jp-eju"><span>EJU 集中课程</span><b>${p[0]}</b><em>${p.slice(1).join('，')}</em></div>`}}return`<p>${t.replace(/(JLPT|EJU|SGU|SAT|ACT|N[1-5]|托福|雅思|80\+|90-100\+|6\.0\+|6\.5-7\.0\+|在留资格)/g,'<mark>$1</mark>')}</p>`}).join('')}
function learning(s,isSgu){if(isSgu)return blocks(s,'learn');const course=s.match(/^(.+?[班])：日语(N[1-5])，(\d+课时)，每周(.+小时)$/);if(course)return`<div class="kr-course jp-course"><span>${course[1]}</span><b>日语 ${course[2]}</b><em>${course[3]}</em><small>每周${course[4]}</small></div>`;if(s.startsWith('EJU课程：')){const parts=s.replace('EJU课程：','').split('，');return`<div class="jp-eju"><span>EJU 集中课程</span><b>${parts[0]}</b><em>${parts.slice(1).join('，')}</em></div>`}return blocks(s,'learn')}
function scenarioTabs(active){return`<div class="matrix-scenarios jp-scenarios"><button class="${active==='highschool'?'active':''}" data-plan-scenario="highschool"><i>日</i><span><b>日本高中申本科</b><small>日语升学 · 两条申请路径</small></span><em>✓</em></button><button class="${active==='sgu'?'active':''}" data-plan-scenario="sgu"><i>英</i><span><b>日本 SGU 项目</b><small>英文授课 · 本科与硕士</small></span><em>✓</em></button><button class="${active==='master'?'active':''}" data-plan-scenario="master"><i>研</i><span><b>日本修士项目</b><small>语言学校直考 · 研究生预科</small></span><em>✓</em></button></div>`}
function view(state){const isSgu=state.scenario==='sgu',p=isSgu?sgu:(undergraduate[state.route]||undergraduate.direct),n=p.items.length,split=isSgu?5:6;
const routePanel=isSgu?`<div class="matrix-route kr-route jp-single-route"><div class="route-summary"><span>日本 SGU 英文授课本科</span><b>${p.name}</b><p>以英语及标化成绩为核心，从高一准备至9月/10月赴日入学。</p></div><div class="jp-route-badge"><small>目标入学季</small><b>${p.label}</b></div></div>`:`<div class="matrix-route kr-route"><div class="route-summary"><span>日本高中申本科</span><b>${p.name}</b><p>高一至高三上通用准备，之后按目标升学路线进入申请阶段。</p></div><div class="route-options jp-routes">${Object.entries(undergraduate).map(([id,x],i)=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><small>路径 ${String.fromCharCode(65+i)}</small><b>${x.name}</b><em>✓</em></button>`).join('')}</div></div>`;
return`<section class="matrix-page kr-compact kr-german-layout jp-layout ${isSgu?'jp-sgu':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">JAPAN UNDERGRADUATE ROADMAP</p><h2>${isSgu?'日本 SGU 英文授课项目规划':'日本高中生申请本科规划'}</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='JP'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs(isSgu?'sgu':'highschool')}${routePanel}<div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isSgu?'能力准备 · 英语与背景建设':'通用准备 · 日语与升学建设'}</div><div>${p.name} · 申请与入学执行</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>${isSgu?'英语 / 标化':'语言学习'}</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>留学节点</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>具体要求以日本院校及官方最新政策为准。</span></footer></section>`}
function sguView(state){const isMaster=state.route==='sguMaster',p=isMaster?sguMaster:sgu,n=p.items.length,split=isMaster?5:5;return`<section class="matrix-page kr-compact kr-german-layout jp-layout jp-sgu ${isMaster?'jp-sgu-master':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">JAPAN SGU ROADMAP</p><h2>日本 SGU 英文授课项目规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='JP'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs('sgu')}<div class="matrix-route kr-route"><div class="route-summary"><span>日本 SGU 英文授课</span><b>${p.name}</b><p>${isMaster?'本科阶段准备托福、GRE、研究计划书与教授沟通，毕业后赴日入读英文授课修士。':'高中阶段准备英语、标化和申请材料，毕业后赴日入读英文授课本科。'}</p></div><div class="route-options jp-routes"><button class="${isMaster?'':'active'}" data-plan-route="sguBachelor"><small>路径 A</small><b>SGU英文授课本科</b><em>✓</em></button><button class="${isMaster?'active':''}" data-plan-route="sguMaster"><small>路径 B</small><b>SGU英文授课硕士</b><em>✓</em></button></div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isMaster?'能力准备 · 英语、GPA与学术背景':'能力准备 · 英语与背景建设'}</div><div>${p.name} · 申请与入学执行</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>英语 / 标化</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>申请节点</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>具体要求以日本院校、教授及项目最新要求为准。</span></footer></section>`}
function masterView(){const p=master,n=p.items.length,split=6;return`<section class="matrix-page kr-compact kr-german-layout jp-layout jp-master" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">JAPAN MASTER ROADMAP</p><h2>日本语言学校 → 修士直考规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='JP'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs('master')}<div class="matrix-route kr-route jp-single-route"><div class="route-summary"><span>日本本科生申请修士</span><b>${p.name}</b><p>本科阶段完成语言、研究计划书与背景准备，赴日后参加修士夏季考或冬季考。</p></div><div class="jp-route-badge"><small>目标节点</small><b>${p.label}</b></div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>国内准备 · 语言与研究能力建设</div><div>赴日执行 · 语言学校与修士考试</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言 / 备考</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>修士节点</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>具体要求以日本大学院及官方最新政策为准。</span></footer></section>`}
function masterPrepView(){const p=masterPrep,n=p.items.length,split=6;return`<section class="matrix-page kr-compact kr-german-layout jp-layout jp-master jp-masterprep" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">JAPAN RESEARCH STUDENT ROADMAP</p><h2>日本研究生预科 → 修士规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='JP'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs('masterprep')}<div class="matrix-route kr-route jp-single-route"><div class="route-summary"><span>日本本科生申请大学院</span><b>${p.name}</b><p>大一开始准备语言与研究背景，大四完成教授沟通和研究生出愿，赴日后参加修士考试。</p></div><div class="jp-route-badge"><small>目标节点</small><b>${p.label}</b></div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>能力建设 · 语言、GPA与研究背景</div><div>申请执行 · 套磁、研究生与修士考试</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言 / 备考</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'}">${blocks(x[1],'learn')}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>申请节点</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content">${blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>具体要求以日本大学院及教授最新要求为准。</span></footer></section>`}
function masterHubView(state){const isPrep=state.route==='masterPrep',p=isPrep?masterPrep:master,n=p.items.length,split=6,tailStart=n-3;return`<section class="matrix-page kr-compact kr-german-layout jp-layout jp-master ${isPrep?'jp-masterprep':''}" style="--krcols:${n}"><header class="matrix-title"><div><p class="section-kicker">JAPAN MASTER ROADMAP</p><h2>日本修士项目规划</h2></div><div class="matrix-countries">${countries.map(c=>`<button class="${c[0]==='JP'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header>${scenarioTabs('master')}<div class="matrix-route kr-route"><div class="route-summary"><span>日本本科生申请大学院</span><b>${p.name}</b><p>${isPrep?'大一开始准备语言与研究背景，通过教授沟通和研究生预科衔接修士。':'本科阶段完成语言与研究准备，赴日语言学校后参加修士夏季考或冬季考。'}</p></div><div class="route-options jp-routes"><button class="${isPrep?'':'active'}" data-plan-route="masterDirect"><small>路径 A</small><b>语言学校 → 修士直考</b><em>✓</em></button><button class="${isPrep?'active':''}" data-plan-route="masterPrep"><small>路径 B</small><b>研究生预科 → 修士</b><em>✓</em></button></div></div><div class="matrix-shell"><div class="kr-era"><strong>规划阶段</strong><div>${isPrep?'能力建设 · 语言、GPA与研究背景':'国内准备 · 语言与研究能力建设'}</div><div>${isPrep?'申请执行 · 套磁、研究生与修士考试':'赴日执行 · 语言学校与修士考试'}</div></div><div class="matrix-grid matrix-time"><strong>时间</strong>${p.items.map((x,i)=>`<div class="${i<split?'language':'apply'}"><small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b></div>`).join('')}</div><div class="matrix-grid matrix-lane language"><strong><i>语</i>语言 / 备考</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} ${isPrep&&i>=tailStart?'merged-tail':''}">${blocks(x[1],'learn')}${isPrep&&i>=tailStart?`<div class="merged-tail-apply">${blocks(x[2],'apply')}</div>`:''}</article>`).join('')}</div><div class="matrix-grid matrix-lane application"><strong><i>申</i>修士节点</strong>${p.items.map((x,i)=>`<article class="${i<split?'language':'apply'} has-content ${isPrep&&i>=tailStart?'merged-tail-ghost':''}">${isPrep&&i>=tailStart?'':blocks(x[2],'apply')}</article>`).join('')}</div></div><footer class="matrix-note"><b>${p.name}</b> · 共${n}个阶段，从左到右依次推进。<span>具体要求以日本大学院及教授最新要求为准。</span></footer></section>`}
UI.studyPlan=state=>state?.country==='JP'?(state.scenario==='master'||state.scenario==='masterprep'?masterHubView(state):state.scenario==='sgu'?sguView(state):view(state)):base(state);
})();
