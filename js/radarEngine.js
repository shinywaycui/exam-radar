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
  const defaultActions={'报名注册开始':'核对注册入口；提醒目标学员准备资料','正式报名开始':'提醒目标学员及时报名；确认报考级别与考点','正式报名截止':'排查尚未报名学员；提醒报名截止时间','考试日期':'发送考前关怀；提醒证件与入场安排','出分日期':'关注成绩发布；准备成绩复盘与后续规划'};
  function enrich(e){return{...e,marketingStage:e.marketingStage||(e.daysUntil===0?'今日节点':e.daysUntil>0?'近期节点':'节点复盘'),radarLevel:e.radarLevel||(e.daysUntil===0?'🚨':'📌'),advisorActions:e.advisorActions||defaultActions[e.eventType]||'关注考试最新节点'}}
  function sortByTiming(a,b){return(Number(b.daysUntil===0)-Number(a.daysUntil===0))||(Number(a.daysUntil<0)-Number(b.daysUntil<0))||Math.abs(a.daysUntil)-Math.abs(b.daysUntil)||(b.priority||0)-(a.priority||0)||a._order-b._order}
  function limitGoethe(list,max=4){let count=0;return list.filter(e=>!String(e.examName||'').includes('歌德')||count++<max)}
  function isHomeRadarSession(session){
    if(!String(session.examName||'').includes('歌德'))return true;
    const name=String(session.sessionName||'');
    return /\b(A1|B1|B2)\b/i.test(name)&&!/\b(A2|C1|C2)\b/i.test(name);
  }
  function getTodayRadar(data,today=new Date()){
    const radarSessions=data.sessions.filter(isHomeRadarSession),events=buildExamEvents(radarSessions,data.rules,today).filter(e=>e.eventType!=='出分日期'||e.daysUntil>=-2),todayEvents=events.filter(e=>e.daysUntil===0),todayUpdates=radarSessions.filter(s=>DateUtils.isSameDay(s.infoUpdatedAt,today)).map((s,i)=>({eventId:`${s.recordId}-update`,eventType:'信息更新时间',eventDate:DateUtils.dateKey(today),daysUntil:0,session:s,examName:s.examName,language:s.language,sessionName:s.sessionName,updateType:s.updateType,updateNote:s.updateNote,_order:i}));
    // 所有首页模块都从最新场次日期重新计算：优先今天和未来节点，只保留最近 7 天的已过节点用于复盘。
    const month=DateUtils.parseExcelDate(today),monthEvents=events.filter(e=>e.year===month.getFullYear()&&e.month===month.getMonth()+1&&e.daysUntil>=-7).map(enrich),nearby=events.filter(e=>e.daysUntil>=0&&e.daysUntil<=31).map(enrich),monthlyFocus=limitGoethe([...monthEvents,...nearby].filter((e,i,a)=>a.findIndex(x=>x.eventId===e.eventId)===i).sort(sortByTiming));
    const upcomingEvents=events.filter(e=>e.daysUntil>0&&e.daysUntil<=7).map(enrich).sort(sortByTiming),momentPool=events.filter(e=>e.daysUntil>=-7&&e.daysUntil<=7).map(enrich).sort(sortByTiming),momentsRecommendations=limitGoethe(momentPool.filter(e=>!e.rule||DataNormalizer.isEnabled(e.rule.generateMoments)));
    const updateActions=todayUpdates.slice(0,3).map((e,i)=>({...e,advisorActions:`核对${e.examName}最新信息；同步相关顾问与学员`,priority:110-i})),actionSource=[...todayEvents.map(enrich),...upcomingEvents,...updateActions].slice(0,10),wechatNodes=events.filter(e=>[7,3,0].includes(e.daysUntil)&&(!e.rule||DataNormalizer.isEnabled(e.rule.generateWechat))).map(enrich);
    return{events,todayEvents,todayUpdates,monthlyFocus,advisorActions:uniqueActions(actionSource),wechatEvents:[...wechatNodes,...todayUpdates].filter((x,i,a)=>a.findIndex(y=>y.eventId===x.eventId)===i).sort(sortByTiming),momentsRecommendations,upcomingEvents};
  }
  function countdown(e){if(e.daysUntil===0)return'就是今天';if(e.daysUntil>0)return`还有 ${e.daysUntil} 天`;return`已过去 ${Math.abs(e.daysUntil)} 天`}
  window.RadarEngine={NODE_FIELDS,buildExamEvents,matchMarketingRule,getTodayRadar,sortRadar,splitActions,countdown,emoji};
})();
