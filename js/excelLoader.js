(function(){
  const REQUIRED=['考试基础信息','年度考试场次','今日营销规则','企微提醒模板','朋友圈模板','字典配置'];
  async function load(file){
    if(!window.XLSX)throw new Error('Excel解析组件未加载，请确认 lib/xlsx.full.min.js 存在。');
    const buf=await file.arrayBuffer(),wb=XLSX.read(buf,{type:'array',cellDates:true});
    const missing=REQUIRED.filter(x=>!wb.SheetNames.includes(x));if(missing.length)throw new Error(`缺少必要工作表：${missing.join('、')}`);
    const raw={};wb.SheetNames.forEach(n=>raw[n]=XLSX.utils.sheet_to_json(wb.Sheets[n],{defval:'',raw:true}));
    return DataNormalizer.normalize(raw,{fileName:file.name,importedAt:new Date().toISOString()});
  }
  async function loadHostedDefault(){
    if(location.protocol==='file:')return null;
    const response=await fetch(encodeURI('小语种考试营销雷达_数据模板_V2.xlsx'));
    if(!response.ok)throw new Error('默认考试数据加载失败');
    const buf=await response.arrayBuffer(),wb=XLSX.read(buf,{type:'array',cellDates:true}),raw={};
    wb.SheetNames.forEach(n=>raw[n]=XLSX.utils.sheet_to_json(wb.Sheets[n],{defval:'',raw:true}));
    return DataNormalizer.normalize(raw,{fileName:'共享考试数据',importedAt:new Date().toISOString(),readOnly:true});
  }
  window.ExcelLoader={load,loadHostedDefault,REQUIRED};
})();
