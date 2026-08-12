(function(){
  const aliases={
    basics:{examId:['考试iD','考试ID','examId'],language:['语种'],examName:['考试名称'],frequency:['考试频率'],usualMonths:['通常考试月份'],levels:['考试级别'],fee:['报名费用'],scoreTime:['出分时间'],validity:['成绩有效期'],intro:['考试简介'],registrationUrl:['官方报名网址'],infoSource:['官方信息来源'],enabled:['是否启用']},
    sessions:{recordId:['记录ID'],year:['年份'],examId:['考试ID','考试iD','examId'],language:['语种'],examName:['考试名称'],sessionName:['考试场次'],sessionMonth:['场次月份'],registrationStart:['报名注册开始'],applicationStart:['正式报名开始'],applicationDeadline:['正式报名截止'],examDate:['考试日期'],scoreDate:['预计出分日期'],infoUpdatedAt:['信息更新时间'],updateType:['更新类型'],updateNote:['更新说明'],sourceUrl:['官方来源URL'],region:['适用地区/考点'],notes:['备注'],status:['状态'],enabled:['是否启用'],dataVersion:['数据版本']},
    rules:{ruleId:['规则ID'],eventType:['节点类型'],startDays:['起始天数'],endDays:['结束天数'],marketingStage:['营销阶段'],radarLevel:['雷达等级'],monthlyFocus:['本月是否重点'],advisorActions:['顾问建议动作'],generateWechat:['生成企微提醒'],generateMoments:['生成朋友圈'],priority:['优先级']},
    wechat:{templateId:['模板ID'],eventType:['适用节点'],marketingStage:['营销阶段'],title:['标题模板'],body:['正文模板'],enabled:['是否启用']},
    moments:{templateId:['模板ID'],eventType:['适用节点'],marketingStage:['营销阶段'],copyType:['文案类型'],title:['标题模板'],body:['正文模板'],enabled:['是否启用']},
    dictionaries:{type:['配置类型'],value:['配置值'],sort:['排序'],description:['说明']}
  };
  const clean=v=>typeof v==='string'?v.trim():v;
  const isEnabled=v=>v==null||String(v).trim()===''||['是','true','1','启用','yes'].includes(String(v).trim().toLowerCase());
  function mapRow(row,map){const out={};Object.entries(map).forEach(([key,names])=>{const hit=names.find(n=>Object.prototype.hasOwnProperty.call(row,n));out[key]=clean(hit?row[hit]:'')});return out}
  function normalizeRows(rows,type){return rows.filter(r=>r&&Object.values(r).some(v=>v!=null&&String(v).trim()!=='')).map((r,index)=>({...mapRow(r,aliases[type]),_order:index}))}
  function standardName(v){return String(v||'').toLowerCase().replace(/[（）]/g,x=>x==='（'?'(':')').replace(/考试/g,'').replace(/[\s()（）\-_]/g,'')}
  function fuzzy(a,b){a=standardName(a);b=standardName(b);return!!a&&!!b&&(a.includes(b)||b.includes(a))}
  function linkBasics(data){data.sessions.forEach(s=>{s.basic=data.basics.find(b=>b.examId&&s.examId&&b.examId===s.examId)||data.basics.find(b=>b.language===s.language&&standardName(b.examName)===standardName(s.examName))||data.basics.find(b=>b.language===s.language&&fuzzy(b.examName,s.examName))||null})}
  function normalize(raw,meta={}){
    const data={basics:normalizeRows(raw['考试基础信息']||[],'basics'),sessions:normalizeRows(raw['年度考试场次']||[],'sessions'),rules:normalizeRows(raw['今日营销规则']||[],'rules'),wechat:normalizeRows(raw['企微提醒模板']||[],'wechat'),moments:normalizeRows(raw['朋友圈模板']||[],'moments'),dictionaries:normalizeRows(raw['字典配置']||[],'dictionaries'),meta};
    data.basics=data.basics.filter(x=>x.examId||x.examName).filter(x=>isEnabled(x.enabled));
    data.sessions=data.sessions.filter(x=>x.recordId||x.examName).filter(x=>isEnabled(x.enabled));
    data.rules=data.rules.filter(x=>x.eventType);data.wechat=data.wechat.filter(x=>x.templateId&&isEnabled(x.enabled));data.moments=data.moments.filter(x=>x.templateId&&isEnabled(x.enabled));
    linkBasics(data);return data;
  }
  window.DataNormalizer={normalize,isEnabled,standardName};
})();
