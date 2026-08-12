(function(){
  const pad=n=>String(n).padStart(2,'0');
  function dateKey(d){return d instanceof Date&&!isNaN(d)?`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`:''}
  function parseExcelDate(v){
    if(v==null||v==='')return null;
    if(v instanceof Date&&!isNaN(v))return new Date(v.getFullYear(),v.getMonth(),v.getDate());
    if(typeof v==='number'){
      const parts=window.XLSX?.SSF?.parse_date_code(v);
      return parts?new Date(parts.y,parts.m-1,parts.d):null;
    }
    const s=String(v).trim(); if(!s)return null;
    let m=s.match(/^(\d{4})[\/.\-年](\d{1,2})[\/.\-月](\d{1,2})日?/);
    if(m){const d=new Date(+m[1],+m[2]-1,+m[3]);return isNaN(d)?null:d}
    const d=new Date(s);return isNaN(d)?null:new Date(d.getFullYear(),d.getMonth(),d.getDate());
  }
  function daysBetween(target,base=new Date()){const a=parseExcelDate(target),b=parseExcelDate(base);return a&&b?Math.round((a-b)/86400000):null}
  function formatDate(v,full=false){const d=parseExcelDate(v);if(!d)return'';return full?`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`:`${d.getMonth()+1}月${d.getDate()}日`}
  function formatDateTime(v){const d=v instanceof Date?v:new Date(v);if(isNaN(d))return'';return`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`}
  function todayLabel(d=new Date()){return`${formatDate(d,true)} 星期${'日一二三四五六'[d.getDay()]}`}
  function isSameDay(a,b){return dateKey(parseExcelDate(a))===dateKey(parseExcelDate(b))}
  window.DateUtils={parseExcelDate,dateKey,daysBetween,formatDate,formatDateTime,todayLabel,isSameDay};
})();
