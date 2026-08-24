(function(){
  const aliases={
    basics:{examId:['考试iD','考试ID','examId'],language:['语种'],examName:['考试名称'],frequency:['考试频率'],usualMonths:['通常考试月份'],levels:['考试级别'],fee:['报名费用'],scoreTime:['出分时间'],validity:['成绩有效期'],intro:['考试简介'],registrationUrl:['官方报名网址'],infoSource:['官方信息来源'],enabled:['是否启用']},
    sessions:{recordId:['记录ID'],year:['年份'],examId:['考试ID','考试iD','examId'],language:['语种'],examName:['考试名称'],sessionName:['考试场次'],sessionMonth:['场次月份'],registrationStart:['报名注册开始'],applicationStart:['正式报名开始'],applicationDeadline:['正式报名截止'],examDate:['考试日期'],ticketPrintStart:['准考证打印开始','准考证打印起始时间'],ticketPrintEnd:['准考证打印截止','准考证打印结束时间'],scoreDate:['出分日期','预计出分日期'],infoUpdatedAt:['信息更新时间'],updateType:['更新类型'],updateNote:['更新说明'],sourceUrl:['官方来源URL'],region:['适用地区','适用地区/考点'],examCenter:['考点信息'],notes:['备注'],status:['状态'],enabled:['是否启用'],dataVersion:['数据版本']},
    rules:{ruleId:['规则ID'],eventType:['节点类型'],startDays:['起始天数'],endDays:['结束天数'],marketingStage:['营销阶段'],radarLevel:['雷达等级'],monthlyFocus:['本月是否重点'],advisorActions:['顾问建议动作'],generateWechat:['生成企微提醒'],generateMoments:['生成朋友圈'],priority:['优先级']},
    wechat:{templateId:['模板ID'],eventType:['适用节点'],marketingStage:['营销阶段'],title:['标题模板'],body:['正文模板'],enabled:['是否启用']},
    moments:{templateId:['模板ID'],eventType:['适用节点'],marketingStage:['营销阶段'],copyType:['文案类型'],title:['标题模板'],body:['正文模板'],enabled:['是否启用']},
    invitations:{contentId:['内容ID','邀约ID'],language:['语种'],examId:['考试ID','考试iD'],examName:['考试名称'],eventType:['适用节点'],startDays:['起始天数'],endDays:['结束天数'],contentType:['内容类型'],title:['标题'],knowledge:['知识点/谈资','内容正文'],inviteScript:['邀约话术'],audience:['适用人群'],sourceNote:['来源/备注','来源'],priority:['优先级'],enabled:['是否启用']},
    dictionaries:{type:['配置类型'],value:['配置值'],sort:['排序'],description:['说明']}
  };
  const clean=v=>typeof v==='string'?v.trim():v;
  const canonicalNode=v=>String(v||'').trim()==='预计出分日期'?'出分日期':clean(v);
  const canonicalLanguage=v=>String(v||'').trim()==='西语'?'西班牙语':clean(v);
  const isEnabled=v=>v==null||String(v).trim()===''||['是','true','1','启用','yes'].includes(String(v).trim().toLowerCase());
  function mapRow(row,map){const out={};Object.entries(map).forEach(([key,names])=>{const hit=names.find(n=>Object.prototype.hasOwnProperty.call(row,n));out[key]=clean(hit?row[hit]:'')});return out}
  function normalizeRows(rows,type){return rows.filter(r=>r&&Object.values(r).some(v=>v!=null&&String(v).trim()!=='')).map((r,index)=>{const out={...mapRow(r,aliases[type]),_order:index};if(['rules','wechat','moments','invitations'].includes(type))out.eventType=canonicalNode(out.eventType);if(type==='invitations')out.language=canonicalLanguage(out.language);if(type==='dictionaries'&&out.type==='节点类型')out.value=canonicalNode(out.value);return out})}
  function standardName(v){return String(v||'').toLowerCase().replace(/[（）]/g,x=>x==='（'?'(':')').replace(/考试/g,'').replace(/[\s()（）\-_]/g,'')}
  function fuzzy(a,b){a=standardName(a);b=standardName(b);return!!a&&!!b&&(a.includes(b)||b.includes(a))}
  function noteDate(v){const m=String(v||'').match(/(\d{4})[\/.\-年](\d{1,2})[\/.\-月](\d{1,2})日?/);if(!m)return'';return`${m[1]}-${String(m[2]).padStart(2,'0')}-${String(m[3]).padStart(2,'0')}`}
  function applyExamPeriods(sessions){sessions.forEach(s=>{if(s.language!=='法语'||!String(s.examName||'').toUpperCase().includes('TCF/TEF'))return;const m=String(s.notes||'').match(/考试(?:周期|区间)\s*[:：]\s*((?:\d{4})[\/.\-年]\d{1,2}[\/.\-月]\d{1,2}日?)\s*[-–—~～至]\s*((?:\d{4})[\/.\-年]\d{1,2}[\/.\-月]\d{1,2}日?)/);if(!m)return;const start=noteDate(m[1]),end=noteDate(m[2]);if(start&&end&&end>=start){s.examPeriodStart=start;s.examPeriodEnd=end}})}
  function topikNoteValue(notes,label){const m=String(notes||'').match(new RegExp(`${label}\\s*[:：]?\\s*([^,.，。;；]+)`));return m?m[1].trim():''}
  function monthDayDate(value,year){const m=String(value||'').match(/(\d{1,2})月(\d{1,2})日/);return m&&year?`${year}-${String(m[1]).padStart(2,'0')}-${String(m[2]).padStart(2,'0')}`:''}
  function applyTopikNotes(sessions){sessions.forEach(s=>{if(!/TOPIK/i.test(String(s.examId||s.examName||''))||!/韩国/.test(`${s.region||''}${s.sessionName||''}${s.notes||''}`))return;const exam=DateUtils.parseExcelDate(s.examDate),year=Number(s.year||(exam&&exam.getFullYear())),notes=s.notes;s.noteRegistrationTime=topikNoteValue(notes,'报名时间');s.noteRegistrationDeadline=topikNoteValue(notes,'报名截止(?:时间)?');s.noteTicketPrint=topikNoteValue(notes,'准考证打印时间');s.noteScoreTime=topikNoteValue(notes,'出分时间');if(!s.ticketPrintStart&&s.noteTicketPrint)s.ticketPrintStart=monthDayDate(s.noteTicketPrint,year)})}
  function ensureSessionRecordIds(sessions){const used=new Set();sessions.forEach(s=>{let id=String(s.recordId||'').trim();if(!id||used.has(id)){const base=`AUTO-${Number(s._order)+1}`;id=base;for(let suffix=2;used.has(id);suffix++)id=`${base}-${suffix}`}s.recordId=id;used.add(id)})}
  function linkBasics(data){data.sessions.forEach(s=>{s.basic=data.basics.find(b=>b.examId&&s.examId&&b.examId===s.examId)||data.basics.find(b=>b.language===s.language&&standardName(b.examName)===standardName(s.examName))||data.basics.find(b=>b.language===s.language&&fuzzy(b.examName,s.examName))||null})}
  function normalize(raw,meta={}){
    const data={basics:normalizeRows(raw['考试基础信息']||[],'basics'),sessions:normalizeRows(raw['年度考试场次']||[],'sessions'),rules:normalizeRows(raw['今日营销规则']||[],'rules'),wechat:normalizeRows(raw['企微提醒模板']||[],'wechat'),moments:normalizeRows(raw['朋友圈模板']||[],'moments'),invitations:normalizeRows(raw['考试邀约内容']||[],'invitations'),dictionaries:normalizeRows(raw['字典配置']||[],'dictionaries'),meta};
    data.basics=data.basics.filter(x=>x.examId||x.examName).filter(x=>isEnabled(x.enabled));
    data.sessions=data.sessions.filter(x=>x.recordId||x.examName).filter(x=>isEnabled(x.enabled));ensureSessionRecordIds(data.sessions);applyExamPeriods(data.sessions);applyTopikNotes(data.sessions);
    data.rules=data.rules.filter(x=>x.eventType);data.wechat=data.wechat.filter(x=>x.templateId&&isEnabled(x.enabled));data.moments=data.moments.filter(x=>x.templateId&&isEnabled(x.enabled));data.invitations=data.invitations.filter(x=>x.contentId&&(x.knowledge||x.inviteScript)).filter(x=>isEnabled(x.enabled));
    linkBasics(data);return data;
  }
  window.DataNormalizer={normalize,isEnabled,standardName,canonicalNode};
})();
