(function(){
const base=UI.studyPlan,countries=[['JP','🇯🇵','日本'],['KR','🇰🇷','韩国'],['DE','🇩🇪','德国'],['FR','🇫🇷','法国'],['IT','🇮🇹','意大利'],['ES','🇪🇸','西班牙'],['RU','🇷🇺','俄罗斯']];
const common=[
['高一上','秋季周末/晚班：韩语T1阶段学习；180课时，每周6-10小时','明确韩国本科留学意向；了解韩国本科升学路径、院校及专业方向；保持高中在校成绩'],
['高一寒假','复习巩固T1阶段内容；强化基础词汇、语法、听力及口语','参加课外活动及兴趣探索；初步了解专业方向，为后续背景提升做准备'],
['高一下','春季周末/晚班：韩语T2阶段学习；180课时，每周6-10小时','进一步探索专业方向；了解韩国大学及专业特点；持续保持高中在校成绩'],
['高一暑假','暑假全日制：韩语T3阶段学习；180课时，周一至周五每天约4小时','参加竞赛、实践、科研、实习等背景提升活动；进一步明确专业方向'],
['高二上','秋季周末/晚班：韩语T4阶段学习；180课时，每周6-10小时；开始了解TOPIK题型','根据成绩、专业方向及语言进度初步选校；建立冲刺、匹配、保底院校梯度；了解目标院校语言要求'],
['高二寒假','复习巩固T4阶段内容；逐步接触TOPIK专项题型及模考','进一步了解目标院校招生要求；梳理个人学术及活动背景；针对目标专业进行背景提升'],
['高二下','春季周末/晚班：韩语T5阶段学习；180课时，每周6-10小时；加入TOPIK专项训练及模考','进一步确定目标院校及专业；核对申请资格、语言要求及材料要求；提前梳理申请材料'],
['高二暑假','暑假全日制：韩语T6阶段学习；180课时，周一至周五每天约4小时；强化TOPIK训练；建议开始参加TOPIK考试','基本确定申请院校及专业梯度；提前规划文书；梳理成绩单、证明、公证/认证等申请材料']];
const autumn=[
['高三上','TOPIK集中备考约120课时，每周6-10小时；参加TOPIK考试并持续刷分','最终确定申请院校及专业；准备个人陈述、学业计划书等文书；整理完整申请材料；持续关注目标院校招生信息'],
['高三寒假','TOPIK未达到目标等级继续备考及刷分；已达到目标则保持韩语学习','完成申请材料检查；完成翻译、公证/认证等事项；重点关注秋季招生简章及申请开放时间'],
['高三下3-6月','根据目标院校要求继续TOPIK刷分或补充语言成绩','进入9月秋季入学申请期；陆续完成网申、材料递交、面试/校考及补件；跟进申请进度'],
['高三下6-7月','加强生活韩语及学术韩语','查询录取结果；确定入学院校；缴纳学费；申请宿舍；准备标准入学许可及签证材料'],
['高三毕业7-8月','进行赴韩前生活韩语及学术韩语强化','办理D-2留学签证；完成行前指导；准备住宿、机票、保险及入境材料'],
['毕业当年9月','进入韩国大学后的韩语及专业课程学习','赴韩报到；完成注册及入学手续；正式进入韩国本科']];
const spring=[
['高三上','TOPIK集中备考约120课时，每周6-10小时；参加TOPIK考试并持续刷分','进一步明确申请院校及专业梯度；持续提升在校成绩；提前梳理申请材料'],
['高三寒假','根据TOPIK成绩继续备考及刷分；争取进一步提升语言等级','提前准备个人陈述、学业计划书；梳理成绩单、亲属关系等申请材料；了解目标院校春季招生时间'],
['高三下','继续TOPIK备考及刷分；保持韩语学习','完成高中阶段学业；最终确定次年3月入学申请方案；持续完善申请材料'],
['高三毕业6-8月','TOPIK集中强化及刷分；争取在正式申请前取得更有竞争力的语言成绩','取得高中毕业证及完整成绩单；最终确定院校及专业；集中完成文书、翻译、公证/认证等材料'],
['毕业当年8-11月','根据目标院校要求继续参加TOPIK考试或补充语言成绩','进入次年3月春季入学申请期；完成网申、材料递交、面试/校考及补件；跟进申请结果'],
['毕业当年11月-次年1月','保持韩语学习；加强学术韩语及大学学习场景韩语','查询录取结果；确定入学院校；缴纳学费；申请宿舍；准备标准入学许可及签证材料'],
['次年1-2月','进行赴韩前生活韩语及学术韩语强化','办理D-2签证；完成行前指导；准备住宿、机票、保险及入境材料'],
['毕业次年3月','进入韩国大学后的韩语及专业课程学习','赴韩报到；完成注册及入学手续；正式进入韩国本科']];
const plans={direct:{name:'秋季9月入学',label:'高中毕业当年9月',tail:autumn},prep:{name:'次年春季3月入学',label:'高中毕业次年3月',tail:spring}};
function hi(s){return s.replace(/(T[1-6]|TOPIK|D-2|\d+课时|每周6-10小时|每天约4小时)/g,'<mark>$1</mark>')}
function band(items,title,n,start){return`<section class="kr-band"><header><i>0${n}</i><b>${title}</b><small>${n===1?'语言筑基 · 专业探索 · 背景提升':'语言冲刺 · 申请执行 · 签证入学'}</small></header><div class="kr-columns" style="--cols:${items.length}">${items.map((x,i)=>`<article><div class="kr-time"><small>${String(start+i).padStart(2,'0')}</small><b>${x[0]}</b></div><div class="kr-task language"><span>한</span><p>${hi(x[1])}</p></div><div class="kr-task apply"><span>申</span><p>${hi(x[2])}</p></div></article>`).join('')}</div></section>`}
function korea(state){let p=plans[state.route]||plans.direct;return`<section class="kr-page"><header class="kr-head"><div><p class="section-kicker">KOREA UNDERGRADUATE ROADMAP</p><h2>韩国高中生申请本科规划</h2></div><div class="kr-countries">${countries.map(c=>`<button class="${c[0]==='KR'?'active':''}" data-plan-country="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div></header><div class="kr-switch"><div><span>申请身份</span><b>高中生申请本科</b><small>国内普高 · 从高一开始规划</small></div><div class="kr-intakes"><span>选择入学季</span>${Object.entries(plans).map(([id,x])=>`<button class="${state.route===id?'active':''}" data-plan-route="${id}"><i>${id==='direct'?'09':'03'}</i><span><b>${x.name}</b><small>${x.label}</small></span><em>✓</em></button>`).join('')}</div></div><div class="kr-legend"><span><i></i>语言学习规划</span><span><i></i>留学申请规划</span><b>${p.name} · ${common.length+p.tail.length}个阶段</b></div><div class="kr-roadmap">${band(common,'高一—高二 · 基础规划期',1,1)}${band(p.tail,'高三—入学 · 申请冲刺期',2,9)}</div></section>`}
UI.studyPlan=state=>state?.country==='KR'&&(!state.scenario||state.scenario==='highschool')?korea(state):base(state);
})();
