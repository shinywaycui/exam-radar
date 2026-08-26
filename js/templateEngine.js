(function(){
  function varsFor(event,today=new Date()){
    const s=event.session||{},b=s.basic||{},score=DateUtils.formatDate(s.scoreDate,true),ticket=String(s.ticketPrint||DateUtils.formatDate(s.ticketPrintStart,true)||''),examStart=DateUtils.formatDate(s.examPeriodStart||s.examDate,true),examEnd=DateUtils.formatDate(s.examPeriodEnd,true),examDate=examEnd?`${examStart}—${examEnd}`:examStart,regStart=DateUtils.formatDate(event.eventType==='报名注册开始'?s.registrationStart:(s.applicationStart||s.registrationStart),true),regEnd=DateUtils.formatDate(s.applicationDeadline,true),regTime=regStart&&regEnd?`${regStart}—${regEnd}`:regStart||regEnd,examDays=DateUtils.daysBetween(s.examPeriodStart||s.examDate,today);return{'今天日期':DateUtils.formatDate(today,true),'语种':event.language||s.language,'考试名称':event.examName||s.examName,'考试场次':event.sessionName||s.sessionName,'剩余天数':event.daysUntil,'节点日期':DateUtils.formatDate(event.eventDate,true),'更新类型':event.updateType||s.updateType,'更新说明':event.updateNote||s.updateNote||'该考试场次今日新增至考试日历。','准考证打印':ticket,'考试日期':examDate,'出分日期':score,'预计出分日期':score,'报名时间':regTime,'报名开始':regStart,'报名截止':regEnd,'报名截止日期':regEnd,'等级':b.levels||'目标等级','XX':Math.max(0,examDays==null?event.daysUntil:examDays),'考试级别':b.levels,'考试频率':b.frequency,'通常考试月份':b.usualMonths}}
  function render(text,vars){return String(text||'').replace(/\{([^}]+)\}/g,(_,k)=>vars[k]!=null?String(vars[k]):'').replace(/\n{3,}/g,'\n\n').trim()}
  function updateText(e){const t=String(e.updateType||'');if(t==='首次录入')return'今日新增考试信息';if(t.includes('时间'))return'考试时间更新';return t?`信息更新：${t}`:'考试信息更新'}
  function dynamicLine(e){const icon=RadarEngine.emoji[e.language]||'🌐';if(e.eventType==='信息更新时间')return`${icon} ${e.examName}｜${e.sessionName}\n${updateText(e)}`;return`${icon} ${e.examName}｜${e.sessionName}\n${e.daysUntil===0?'今日'+e.eventType:`距离${e.eventType}${e.daysUntil>0?'还有':'已过去'}${Math.abs(e.daysUntil)}天`}`}
  function buildWechat(data,radar,today=new Date()){
    if(!radar.wechatEvents.length)return'';const updates=radar.wechatEvents.filter(e=>e.eventType==='信息更新时间'),nodes=radar.wechatEvents.filter(e=>e.eventType!=='信息更新时间'),sections=[nodes.length?`【未来7天考试节点】\n${nodes.map(dynamicLine).join('\n\n')}`:'',updates.length?`【今日信息更新】\n${updates.map(dynamicLine).join('\n\n')}`:''].filter(Boolean),actions=radar.advisorActions.map((a,i)=>`${['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'][i]||`${i+1}.`} ${a}`).join('\n')||'关注近期考试节点，及时同步目标学员。';
    return`📡【未来7天小语种考试营销提醒｜${DateUtils.formatDate(today,true)}】\n\n今天共有 ${radar.wechatEvents.length} 个值得关注的考试节点/更新（仅统计今天起未来7天，超过7天不显示）。\n\n${sections.join('\n\n')}\n\n🎯 顾问建议动作：\n${actions}`;
  }
  function seedFor(event,today,type=''){const raw=`${DateUtils.dateKey(today)}|${event.eventId}|${type}`;let n=0;for(let i=0;i<raw.length;i++)n=(n*31+raw.charCodeAt(i))>>>0;return n}
  function pick(list,seed,offset=0){return list[(seed+offset)%list.length]}
  const registrationCopyLibrary={
    upcoming:[
      '📣官宣！ 【考试名称】报名即将正式启动\n⏰报名时间：【报名时间】\n👇报名流程提前收藏\n准备参加的宝子，记得定好闹钟！',
      '🔥报名提醒！ 【考试名称】即将开放报名\n📅考试时间：【考试日期】\n⏰报名时间：【报名时间】\n备考计划可以正式提上日程啦！',
      '⏰报名倒计时！ 【考试名称】报名即将启动\n🎯准备参加这次考试的同学\n账号注册、证件照片等资料可以提前准备啦！',
      '📢考试党注意！ 【考试名称】最新考期公布\n📅考试：【考试日期】\n📝报名：【报名时间】\n👇准备冲刺的同学，现在就可以开始倒推备考计划',
      '📣官宣考期！ 【考试名称】最新考试安排来了\n📝报名时间：【报名时间】\n📅考试时间：【考试日期】\n目标明确，接下来就是安心备考！',
      '🇯🇵/🇰🇷/🇩🇪考试提醒 【考试名称】即将开放报名！\n👇报名流程已经整理好\n🎯今年准备拿下目标等级的宝子，可以行动啦！',
      '📣【考试名称】报名来了！\n报名时间：【报名时间】\n考试时间：【考试日期】\n🔥从现在开始准备，还有多少备考时间？\n备考时间线已经可以倒推起来了',
      '🎯目标：【考试名称】高分通关\n第一步：先把考试报上！\n⏰【报名时间】正式开放\n👇报名流程已经准备好',
      '📢重要考试节点提醒\n【考试名称】报名即将启动\n📅考试时间：【考试日期】\n想参加这场考试的同学，别等报名后才开始准备！',
      '🔥新一轮备考正式开始！\n【考试名称】报名通道即将开启\n🎯目标等级：【等级】\n⏰距离考试还有【XX】天\n现在开始规划刚刚好！',
      '📣报名时间确定！\n【考试名称】将在【报名时间】正式开放报名\n👇报名入口+注意事项已整理\n热门场次建议提前做好准备',
      '⚡手速提醒！ 【考试名称】报名即将开启\n热门考点/热门级别可能比较抢手\n👇账号、照片、证件信息提前准备好！',
      '📣准备考【考试名称】的同学看过来\n最新报名时间已公布👇\n📝【报名时间】\n📅【考试日期】正式考试\n备考倒计时同步开启！',
      '⏰报名倒计时3天！\n【考试名称】即将开放报名\n👇报名流程提前熟悉\n📣别等开抢当天才发现资料没准备好！',
      '📣考位提醒！ 【考试名称】报名即将开始\n热门城市/考点建议尽早报名\n🎯考位锁定之后，就安心冲刺目标等级！',
      '📣考试时间确定＝学习DDL来了\n【考试名称】考期正式公布\n📅考试：【考试日期】\n📝报名：【报名时间】\n目标清晰之后，备考效率真的会高很多！',
      '🔥【考试名称】新考期来了\n准备今年拿证/出分的同学注意👇\n报名时间：【报名时间】\n考试时间：【考试日期】\n📚现在开始规划，还来得及！',
      '⏰考试报名提醒\n【考试名称】报名时间已经确定\n👇报名前先确认：\n考试级别｜考点｜证件｜照片｜账号\n一次准备好，报名更顺利！',
      '🔥又一场考试进入备考倒计时\n【考试名称】报名即将开启\n📅考试日期：【考试日期】\n想一次过级，现在就该进入备考状态啦！',
      '📣报名别错过！ 【考试名称】报名窗口开放时间有限\n⏰【报名开始】—【报名截止】\n👇计划参加的同学建议尽早完成报名',
      '🎯考试报名只是开始\n【考试名称】最新考期已经确定\n📅距离考试还有【XX】天\n词汇量/基础薄弱/刷题没方向的同学\n现在正是调整备考计划的关键期！',
      '📣官宣！ 【考试名称】最新报名&考试时间公布\n📝报名：【报名时间】\n📅考试：【考试日期】\n👇考试流程、备考节奏一次理清\n准备参加的同学，可以开始冲刺啦！'
    ],
    today:[
      '📣报名通道开启！ 【考试名称】今天正式开始报名\n👇报名入口+完整流程已整理\n⚡热门考点/场次建议尽早锁定！',
      '🔥今天开抢！ 【考试名称】报名正式开启\n⚡热门考点名额拼手速\n👇报名流程提前看，关键时候不手忙脚乱！',
      '🔥报名成功只是第一步\n【考试名称】报名正式启动！\n距离考试还有【XX】天\n📚词汇、语法、听力、阅读/写作\n现在就要开始安排冲刺节奏啦',
      '📣报名启动！ 【考试名称】正式开放报名\n🎯目标等级已经确定的同学\n接下来就是锁定考位+进入系统备考！'
    ],
    deadline:[
      '⏰报名进入倒计时！ 【考试名称】报名即将截止\n📅截止时间：【报名截止日期】\n还没报名的同学抓紧最后时间！',
      '🚨最后报名提醒！ 【考试名称】报名即将截止\n⚠️准备参加本场考试的同学别错过\n👇报名完成后，就该正式进入冲刺节奏啦！',
      '🚨报名即将截止！ 【考试名称】还没报名的同学注意\n⏰截止时间：【报名截止日期】\n错过可能就要再等下一场！',
      '📢最后机会！ 【考试名称】报名进入最后倒计时\n👇准备参加本次考试的同学抓紧\n报名结束后，正式开启备考冲刺！'
    ]
  };
  const scoreCopyLibrary={
    upcoming:[
      '📣出分提醒！ 🇯🇵【考试名称】成绩即将公布\n⏰查分时间：【出分日期】\n👇查分入口提前收藏好\n✨愿大家都能查到期待已久的好成绩！',
      '📣成绩即将揭晓！ 【考试名称】将在【出分日期】开放查分\n🔍准考证/账号信息提前准备好\n✨努力了这么久，静候好消息！',
      '⏰查分倒计时！ 【考试名称】即将迎来出分日\n📅【出分日期】记得及时查询\n✨愿所有认真备考的日子，都有满意的答案',
      '📢查分提醒\n参加【考试名称】的同学注意啦\n⏰【出分日期】开放成绩查询\n✨希望打开页面的那一刻，就是惊喜！',
      '📣重要提醒！ 【考试名称】即将公布成绩\n⏰【出分日期】开放查询\n👇查分流程提前码住\n✨愿大家的努力都兑换成理想分数',
      '📣查分倒计时1天！\n明天就是【考试名称】出分日\n🔍账号密码今晚先准备好\n✨希望明天听到的都是好消息！',
      '🎉高分喜报预定！ 【考试名称】即将开放查分\n📅时间：【出分日期】\n👇查分流程提前收藏\n祝大家全部顺利拿证！'
    ],
    today:[
      '🔥可以查分啦！ 【考试名称】成绩正式开放查询\n📅查分时间：【出分日期】\n👇查分流程已经整理好\n🎉祝大家高分通关，顺利拿下目标等级！',
      '🎉终于等到出分！ 【考试名称】成绩今日正式公布\n👇查分入口+查分流程已整理\n💯高分好运接接接！',
      '📣今天出分！ 【考试名称】成绩查询正式开启\n🔍查完成绩别忘了保存成绩单\n🎉祝大家全部顺利过线！',
      '🔥出分日来了！ 【考试名称】今天可以查成绩啦\n👇查分方式已经整理好\n💯坐等大家的高分喜报！',
      '🎊成绩公布！ 【考试名称】正式开放查分\n📱账号密码提前准备好\n👇查分入口别找错\n祝大家一次过级！',
      '💯高分时刻来了！ 【考试名称】今日开放查分\n🎯目标等级能不能拿下，今天见分晓\n祝大家全部高分通关！',
      '📣【考试名称】出分啦！\n熬过备考，也等过成绩\n今天终于可以查分了👇\n✨愿大家查到的分数，比预期更高！',
      '🔥查分通道开启！ 【考试名称】成绩正式公布\n👇查分入口+操作流程已整理\n🎉高分好运已经送达，请注意查收！',
      '📅今日考试提醒\n【考试名称】成绩正式发布！\n🔍参加考试的同学记得及时查询\n✨期待朋友圈被高分喜报刷屏！',
      '🎉恭喜进入查分环节！ 【考试名称】成绩开放查询\n📣查分后记得及时确认成绩/证书信息\n💯祝大家稳稳过级！',
      '⏰就在今天！ 【考试名称】正式出分\n👇查分方式已经准备好\n🎯下一阶段学习规划，也可以提前安排起来啦！',
      '🔥成绩揭晓时刻！ 【考试名称】查分正式开启\n💯过线的同学准备冲击下一等级\n📚暂时没达到目标的，也可以尽快调整下一阶段备考计划',
      '📣成绩公布提醒\n【考试名称】成绩已经可以查询啦！\n👇查分流程已整理\n🎊查完成绩，记得来报喜！',
      '🌟今天宜：查高分！\n【考试名称】正式开放成绩查询\n👇入口及流程提前收藏\n💯祝大家全部成功上岸！',
      '📢参加【考试名称】的宝子集合！\n今天正式出分啦🔥\n查分入口已经开放\n✨祝大家手握高分，顺利奔赴下一阶段！',
      '🎯检验学习成果的时候到了\n【考试名称】成绩正式公布\n📅【出分日期】开放查询\n👇查完成绩，也别忘了及时规划下一等级',
      '📣【考试名称】成绩来了！\n备考几个月，就等今天\n👇查分流程已经整理好\n✨祝大家查到成绩时嘴角疯狂上扬！',
      '🔥出分提醒请查收\n【考试名称】成绩查询开启\n💯过级不是终点\n下一等级/下一阶段学习也可以开始规划啦！',
      '📣今天有件大事！ 【考试名称】出分啦\n👇成绩查询方式已整理\n🎊希望今天收到的，全是高分好消息！',
      '⏰终于等到你！ 【考试名称】成绩正式公布\n📱记得及时登录官网查询\n✨愿认真备考的你，得到满意的答案',
      '📣出分日＝开奖日\n【考试名称】今天正式查分\n👇查询入口已开放\n💯高分通关的宝子们，下一等级可以安排起来啦！',
      '📢查成绩啦！ 【考试名称】正式出分\n🎯达到目标→继续冲刺下一等级\n📚还差一点→及时复盘调整备考计划\n每一次考试，都是下一阶段的起点',
      '🔥【考试名称】出分！\n👇成绩查询入口+流程已整理\n💯愿大家高分过线、成功拿证\n下一阶段备考规划，也可以提前安排起来啦！'
    ]
  };
  function curatedMomentCopy(type,event,vars,today){let pool;if(event.eventType==='正式报名截止')pool=registrationCopyLibrary.deadline;else if(event.eventType==='报名注册开始'||event.eventType==='正式报名开始')pool=registrationCopyLibrary[event.daysUntil===0?'today':'upcoming'];else if(event.eventType==='出分日期')pool=scoreCopyLibrary[event.daysUntil===0?'today':'upcoming'];else return null;const voice=examVoices[voiceKey(event)]||examVoices.generic,name=eventName(event),values={...vars,'考试名称':name};let text=pick(pool,seedFor(event,today,type));text=text.replace('🇯🇵/🇰🇷/🇩🇪',voice.flag).replace(/【([^】]+)】/g,(_,key)=>values[key]!=null&&values[key]!==''?String(values[key]):'以官方通知为准');const lines=text.split('\n');return{title:lines.shift(),body:lines.join('\n')}}
  function shortDate(value){const s=String(value||''),m=s.match(/\d{4}-(\d{2})-(\d{2})/);return m?`${Number(m[1])}.${Number(m[2])}`:value}
  function sessionLabel(event){const s=event.session||{},month=s.sessionMonth||String(event.sessionName||'').match(/(\d{1,2})月/)?.[1];return`${month?month+'月':''}${event.examName}`}
  function dynamicTitle(type,event,vars,today){const exam=vars['考试名称'],label=sessionLabel(event),seed=seedFor(event,today,type),node=({'报名注册开始':'注册','正式报名开始':'报名','正式报名截止':'报名截止','考试日期':'考试','出分日期':'出分'}[event.eventType]||event.eventType);if(event.eventType==='出分日期')return pick([`🔥${exam}成绩节点来了，查分后别急着停`,`📣${exam}出分在即，下一步这样安排`,`✨${exam}出分提醒，努力即将揭晓`],seed);if(event.daysUntil<0&&event.eventType==='考试日期')return pick([`🔥${exam}考后复盘正当时`,`考完${exam}，下一阶段怎么走？`,`📚${exam}考后不停步，趁热开启新计划`],seed);if(type.includes('节点提醒'))return pick([`‼${label}${node}${event.daysUntil>0?'倒计时':''}`,`📣${label}${event.daysUntil===0?node+'今日正式启动':node+'即将启动'}`,`⏰${exam}${node}重要提醒`],seed);if(type.includes('专业规划'))return pick([`🎯${exam}时间线明确，备考规划现在开始`,`📚准备${exam}，这份时间安排请收好`,`🚀${exam}新节点，学习节奏这样安排`],seed);if(type.includes('轻营销'))return pick([`✨想学一门新语言，现在正是好时候`,`☀${exam}节点更新，新的目标可以安排了`,`🌍从${exam}出发，打开更多可能`],seed);if(type.includes('冲刺'))return`🚀${exam}进入关键冲刺阶段`;return`${exam}考试节点提醒`}
  function matchMoments(data,event){
    const all=Array.isArray(data.moments)?data.moments:[],exact=all.filter(t=>t.eventType===event.eventType&&t.marketingStage===event.marketingStage),sameNode=all.filter(t=>t.eventType===event.eventType),matched=exact.length?exact:sameNode;
    const types=['节点提醒型','专业规划型','轻营销型'],seen=new Set(),result=[];
    matched.forEach(t=>{const type=t.copyType||'节点提醒型';if(!seen.has(type)){seen.add(type);result.push(t)}});
    types.forEach((copyType,i)=>{if(!seen.has(copyType))result.push({templateId:`AUTO-${event.eventType}-${i}`,eventType:event.eventType,marketingStage:event.marketingStage,copyType,title:'',body:'',autoGenerated:true})});
    return result;
  }
  function timingText(event){if(event.daysUntil===0)return`今天迎来${event.eventType}节点`;if(event.daysUntil>0)return`距离${event.eventType}还有${event.daysUntil}天`;return`${event.eventType}已经过去${Math.abs(event.daysUntil)}天`}
  function dynamicMomentsBody(type,event,vars,today){
    const exam=vars['考试名称'],session=vars['考试场次'],level=vars['考试级别'],examDate=vars['考试日期'],scoreDate=vars['出分日期'],date=shortDate(event.eventDate),seed=seedFor(event,today,type),tomorrow=event.daysUntil===1,when=event.daysUntil===0?'今天':tomorrow?`明天（${date}）`:event.daysUntil>0?`${date}，还有${event.daysUntil}天`:`已过去${Math.abs(event.daysUntil)}天`,cta=pick(['想了解备考节奏和课程安排，欢迎随时滴滴～','需要考试规划的宝子，可以来聊聊你的目标～','还没理清时间线的同学，欢迎来找我一起规划～','想稳稳拿下目标等级，现在就可以开始准备啦～'],seed,7);
    if(event.eventType==='报名注册开始'||event.eventType==='正式报名开始')return pick([`📣${session||exam}报名，${event.daysUntil===0?'今日正式启动':'即将启动'}！\n⏰${when}${event.daysUntil>=0?'准时开放':''}\n⬇注册｜抢位｜缴费，全流程提前理清\n${RadarEngine.emoji[event.language]||'🌍'}准备报考的宝子们，速速码住🔥\n\n${cta}`,`‼${session||exam}报名${event.daysUntil>0?'倒计时':''}\n⏰${when}${event.daysUntil>=0?'记得定好闹钟':''}\n👇报名材料、考点与流程建议提前确认\n🉑准备冲刺的宝子随时滴滴～`, `📢${exam}${event.eventType}提醒\n${when}，重要节点别错过！\n✅账号注册 ✅资料检查 ✅考位准备\n先收藏，再按时间行动～\n\n${cta}`],seed);
    if(event.eventType==='正式报名截止')return pick([`‼${exam}报名进入最后倒计时\n⏰${when}截止，尚未完成的同学抓紧啦\n👇资料、考位和缴费状态再检查一遍\n错过就要等下一场！`,`📣${session||exam}报名即将截止\n倒计时${Math.max(0,event.daysUntil)}天，别把报名留到最后一刻\n✅确认信息 ✅完成缴费 ✅保存凭证\n转给身边正在备考的同学～`],seed);
    if(event.eventType==='准考证打印开始')return`📣${session||exam}准考证打印提醒\n⏰${vars['准考证打印']||when}\n✅及时下载并打印准考证\n✅核对姓名、考点、考试时间和入场要求\n建议多保存一份电子版，考试当天别忘记携带～`;
    if(event.eventType==='考试日期'&&event.daysUntil>=0)return pick([`🚀${exam}考试${event.daysUntil===0?'就是今天':'进入倒计时'}\n📅${examDate||date}\n🎯最后阶段稳住节奏，查漏补缺比盲目刷题更重要\n愿大家从容上场，顺利拿下目标！`,`🔥${session||exam}即将开考\n⏰${when}\n✅证件与准考证 ✅路线与时间 ✅考试用品\n保持手感，轻装上阵，一次过！`],seed);
    if(event.eventType==='出分日期')return pick([`🔥${exam}出分提醒，查询入口记得收藏👇\n⏰${scoreDate||date}\n☀查分后别停，趁热复盘并安排下一阶段\n🉑想冲更高等级或学门新语言，随时滴滴！`,`📣${session||exam}成绩即将揭晓\n${when}\n无论结果如何，每一次备考都算数✨\n查分、复盘、下一等级规划，一次安排清楚～`],seed);
    if(event.eventType==='考试日期'&&event.daysUntil<0)return pick([`🔥${exam}考后复盘正当时\n📝答案与薄弱点趁记忆清晰及时整理\n☀考完别停，假期趁热打铁学门新语言\n🉑日韩法意德西俄，总有一门适合你！`,`🎯${exam}告一段落，新的目标可以开始了\n复盘不是纠结对错，而是让下一次准备更准确\n想冲更高等级或开启新语言，欢迎来聊聊～`],seed);
    if(type.includes('专业规划'))return`🎯${exam}时间线已经明确\n从目标等级倒推学习安排：\n① 评估当前基础${level?`与目标（${level}）`:''}\n② 拆分词汇、语法与专项能力\n③ 预留真题训练和冲刺时间\n\n规划越早，备考越从容。${cta}`;
    if(type.includes('轻营销'))return`✨最近关注${exam}的同学越来越多啦\n${session||exam} · ${timingText(event)}\n与其临近节点匆忙准备，不如早点找到适合自己的节奏。\n\n${cta}`;
    return`📌${exam}${session?`｜${session}`:''}\n${timingText(event)}\n请及时确认官方安排，并根据目标调整学习计划。\n\n${cta}`;
  }
  const examVoices={
    TOPIK:{flag:'🇰🇷',goal:'韩语等级和写作目标',prep:'写作框架、听力节奏和阅读速度',score:'选择考试届数，输入准考证号和出生日期即可查询'},
    JLPT:{flag:'🇯🇵',goal:'N1–N5目标级别',prep:'文字词汇、语法阅读和听力时间分配',score:'备好准考证号和注册证件号，建议错峰查分'},
    JLCT:{flag:'🇯🇵',goal:'JCT1–JCT5报考级别',prep:'词汇、语法、阅读与听力的限时训练',score:'JLCT出分节奏快，查分后可以马上复盘下一级目标'},
    TestDaF:{flag:'🇩🇪',goal:'TDN 3–TDN 5四科目标',prep:'阅读、听力、写作和口语四科均衡',score:'登录德福考试官网查看Ergebnis，并下载电子版成绩单'},
    Goethe:{flag:'🇩🇪',goal:'A1–C2对应级别',prep:'按听说读写单项查漏补缺',score:'歌德出分以考点通知为准，记得同步下载或领取证书'},
    French:{flag:'🇫🇷',goal:'CEFR目标区间与申请用途',prep:'听力、语言结构和阅读的速度与准确率',score:'查分后记得对照CEFR等级和申请要求'},
    DELE:{flag:'🇪🇸',goal:'A1–C2目标级别',prep:'阅读、听力、写作与口试的综合表现',score:'成绩公布后可同步核对APTO结果与各部分分数'},
    CILS:{flag:'🇮🇹',goal:'A1–C2与用途对应级别',prep:'听读、语言运用、写作和口试的完整度',score:'CILS出分周期较长，查到成绩后请及时保存结果页'},
    generic:{flag:'🌍',goal:'本次报考目标',prep:'薄弱项和真题节奏',score:'请从官方渠道查询成绩并保存结果'}
  };
  function voiceKey(e){const v=`${e.examId||''}${e.examName||''}`;if(/TOPIK/i.test(v))return'TOPIK';if(/JLCT/i.test(v))return'JLCT';if(/JLPT/i.test(v))return'JLPT';if(/TestDaF|德福/i.test(v))return'TestDaF';if(/歌德|Goethe/i.test(v))return'Goethe';if(/TCF|TEF/i.test(v))return'French';if(/DELE/i.test(v))return'DELE';if(/CILS/i.test(v))return'CILS';return'generic'}
  function eventName(e){const session=String(e.sessionName||'');if(voiceKey(e)==='TOPIK'){const edition=session.match(/第\s*\d+\s*届/)?.[0]||'';return`${edition}${session.includes('韩国')?'韩国场':''}TOPIK`}return e.examName||'小语种考试'}
  function distinctCopy(type,e,vars){const key=voiceKey(e),v=examVoices[key]||examVoices.generic,name=eventName(e),date=shortDate(e.eventDate),when=e.daysUntil===0?'今天':e.daysUntil===1?`明天（${date}）`:e.daysUntil>1?`${date}，还有${e.daysUntil}天`:`已过去${Math.abs(e.daysUntil)}天`,session=vars['考试场次']||name;
    if(e.eventType==='出分日期'){
      if(key==='TOPIK')return e.daysUntil===0?{title:`${v.flag}${name}能查分啦！`,body:`☔️超全查分流程已整理\n👇${v.score}\n🌝祝大家统统高分通关！`}:{title:`${v.flag}${name}考试成绩${e.daysUntil===1?'明日可查':'即将可查'}！📣查分攻略来啦！`,body:`☔️TOPIK查分攻略已整理\n⏰${when}公布成绩\n👇届数、准考证号、出生日期请提前备好\n🌝预祝大家高分通关！`};
      if(key==='TestDaF')return e.daysUntil===0?{title:`🇩🇪${name}成绩今日可查！📣查分步骤收好`,body:`💻德福查分流程已整理\n👇登录德福官网，找到最近考试场次，点击【Ergebnis】即可查分\n📄需要成绩单的同学，记得下载TestDaF-Zertifikat\n✨祝福考生们都能取得理想成绩！`}:{title:`🇩🇪${name}成绩${e.daysUntil===1?'明日可查':'即将公布'}！📣查分攻略已备好`,body:`💻德福查分流程已整理\n⏰${when}公布成绩\n👇登录德福官网，提前备好用户名和密码\n📄查分后可下载电子版成绩单\n✨预祝大家四科都收获理想的TDN等级！`};
      return{title:`${v.flag}${name}${e.daysUntil===0?'今日可查':e.daysUntil===1?'明日出分':'成绩即将公布'}！`,body:`${v.flag}${session}成绩${e.daysUntil===0?'已可查询':'即将公布'}\n⏰${vars['出分日期']||date}\n👇${v.score}\n✨愿每一份努力都有回响，查分后也别忘了规划下一步！`}}
    if(e.eventType==='正式报名截止')return{title:`${v.flag}${name}报名${e.daysUntil===0?'今日截止':'即将截止'}！`,body:`⏰${when}截止报名\n✅再次确认：${v.goal}、个人信息、缴费状态\n报名凭证记得保存，别把最后一步留到截止前～`};
    if(e.eventType==='报名注册开始'||e.eventType==='正式报名开始')return{title:`${v.flag}${name}${e.eventType==='报名注册开始'?'注册':'报名'}${e.daysUntil===0?'今日开启':'即将开启'}！`,body:`📣${session}重要时间节点\n⏰${when}${e.daysUntil>=0?'开启':''}\n👇提前确认${v.goal}，准备好账号、证件与缴费信息\n报名后可以围绕${v.prep}进入备考节奏～`};
    if(e.eventType==='考试日期'&&e.daysUntil>=0)return{title:`${v.flag}${name}${e.daysUntil===0?'今日开考':'考试倒计时'}！`,body:`🚀${session}${e.daysUntil===0?'今日开考':`还有${e.daysUntil}天`}\n📝最后阶段重点：${v.prep}\n✅证件与准考证 ✅路线与时间 ✅考试用品\n稳住节奏，祝大家顺利拿下目标！`};
    if(e.eventType==='考试日期'&&e.daysUntil<0)return{title:`${v.flag}${name}考后复盘｜下一步怎么走？`,body:`🎯趁记忆还清晰，先复盘${v.prep}\n📝记录薄弱点，再围绕${v.goal}调整下一阶段计划\n考完不是终点，而是下一次进阶的起点～`};return null}
  function buildMoments(data,event,today=new Date()){if(!event)return[];const vars=varsFor(event,today);return matchMoments(data,event).map(t=>{const type=t.copyType||'节点提醒型',curated=curatedMomentCopy(type,event,vars,today),distinct=/品宣|节点提醒/.test(type)?distinctCopy(type,event,vars):null,dynamic=dynamicMomentsBody(type,event,vars,today),templateTitle=render(t.title,vars),templateBody=render(t.body,vars);return{...t,copyType:type,renderedTitle:curated?.title||distinct?.title||dynamicTitle(type,event,vars,today)||templateTitle||`${vars['考试名称']}考试提醒`,renderedBody:curated?.body||distinct?.body||dynamic||templateBody||`${vars['考试名称']}近期有新的考试节点，请及时关注官方安排。`}}).filter(t=>t.renderedTitle&&t.renderedBody)}
  window.TemplateEngine={render,varsFor,buildWechat,buildMoments,updateText};
})();
