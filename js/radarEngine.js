(function(){
  const NODE_FIELDS=[['报名注册开始','registrationStart'],['正式报名开始','applicationStart'],['正式报名截止','applicationDeadline'],['考试日期','examDate'],['出分日期','scoreDate']];
  const emoji={日语:'🇯🇵',韩语:'🇰🇷',德语:'🇩🇪',西班牙语:'🇪🇸',意大利语:'🇮🇹',俄语:'🇷🇺',法语:'🇫🇷'};
  function matchMarketingRule(event,rules){
    return rules.filter(r=>r.eventType===event.eventType&&event.daysUntil>=Number(r.startDays)&&event.daysUntil<=Number(r.endDays)).sort((a,b)=>Number(b.priority||0)-Number(a.priority||0)||a._order-b._order)[0]||null;
  }
  function buildExamEvents(sessions,rules,today=new Date()){
    const events=[];
    sessions.forEach((s,si)=>NODE_FIELDS.forEach(([eventType,key],ni)=>{const d=DateUtils.parseExcelDate(s[key]);if(!d)return;const e={eventId:`${s.recordId||si}-${key}`,recordId:s.recordId,examId:s.examId,language:s.language,examName:s.examName,sessionName:s.sessionName,eventType,eventDate:DateUtils.dateKey(d),daysUntil:DateUtils.daysBetween(d,today),year:d.getFullYear(),month:d.getMonth()+1,status:s.status,source:s.sourceUrl,session:s,_order:si*10+ni};e.rule=matchMarketingRule(e,rules);if(e.rule){e.priority=Number(e.rule.priority||0);e.marketingStage=e.rule.marketingStage;e.radarLevel=e.rule.radarLevel;e.advisorActions=e.rule.advisorActions}events.push(e)}));
    return events;
  }
  function splitActions(v){return String(v||'').split(/[；;\n]+/).map(x=>x.trim()).filter(Boolean)}
  function uniqueActions(events){const seen=new Set(),out=[];events.sort(sortRadar).forEach(e=>splitActions(e.advisorActions).forEach(a=>{const contextual=/^(排查|提醒|关注|筛选|触达|私聊|当天|确认|考后|下一)/.test(a)?`${e.examName}｜${a}`:a; if(!seen.has(contextual)){seen.add(contextual);out.push(contextual)}}));return out}
  function sortRadar(a,b){return(Number(b.daysUntil===0)-Number(a.daysUntil===0))||(b.priority||0)-(a.priority||0)||Math.abs(a.daysUntil)-Math.abs(b.daysUntil)||a._order-b._order}
  function getTodayRadar(data,today=new Date()){
    const events=buildExamEvents(data.sessions,data.rules,today),todayEvents=events.filter(e=>e.daysUntil===0),todayUpdates=data.sessions.filter(s=>DateUtils.isSameDay(s.infoUpdatedAt,today)).map((s,i)=>({eventId:`${s.recordId}-update`,eventType:'信息更新时间',eventDate:DateUtils.dateKey(today),daysUntil:0,session:s,examName:s.examName,language:s.language,sessionName:s.sessionName,updateType:s.updateType,updateNote:s.updateNote,_order:i}));
    // 本月实际发生的考试节点必须进入关注列表；同时保留规则命中的跨月营销机会。
    const month=DateUtils.parseExcelDate(today),monthEvents=events.filter(e=>e.year===month.getFullYear()&&e.month===month.getMonth()+1).map(e=>({...e,marketingStage:e.marketingStage||'本月考试节点',radarLevel:e.radarLevel||'📌',advisorActions:e.advisorActions||({报名注册开始:'核对报名注册信息；提醒相关学员准备资料',正式报名开始:'提醒目标学员及时报名；确认报考级别与考点',正式报名截止:'排查尚未报名学员；提醒报名截止时间',考试日期:'发送考前关怀；提醒证件与入场安排',出分日期:'关注成绩发布；准备成绩复盘与后续规划'}[e.eventType]||'关注本月考试节点')})),ruleFocus=events.filter(e=>e.rule&&DataNormalizer.isEnabled(e.rule.monthlyFocus)),monthlyFocus=[...monthEvents,...ruleFocus].filter((e,i,a)=>a.findIndex(x=>x.eventId===e.eventId)===i).sort(sortRadar);
    const relevant=events.filter(e=>e.rule&&(Math.abs(e.daysUntil)<=31||e.daysUntil===0)).sort(sortRadar),highPriority=relevant.filter(e=>DataNormalizer.isEnabled(e.rule.generateWechat)).slice(0,8);
    const upcomingEvents=events.filter(e=>e.daysUntil>0&&e.daysUntil<=7).sort(sortRadar),actionSource=[...todayEvents.filter(e=>e.rule),...highPriority];
    const momentsRecommendations=relevant.filter(e=>DataNormalizer.isEnabled(e.rule.generateMoments)).slice(0,3);
    return{events,todayEvents,todayUpdates,monthlyFocus,advisorActions:uniqueActions(actionSource),wechatEvents:[...todayEvents,...todayUpdates,...highPriority].filter((x,i,a)=>a.findIndex(y=>y.eventId===x.eventId)===i).sort(sortRadar),momentsRecommendations,upcomingEvents};
  }
  function countdown(e){if(e.daysUntil===0)return'就是今天';if(e.daysUntil>0)return`还有 ${e.daysUntil} 天`;return`已过去 ${Math.abs(e.daysUntil)} 天`}
  window.RadarEngine={NODE_FIELDS,buildExamEvents,matchMarketingRule,getTodayRadar,sortRadar,splitActions,countdown,emoji};
})();
