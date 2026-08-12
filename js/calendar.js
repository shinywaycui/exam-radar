(function(){
  const colors={'报名注册开始':'#3975a7','正式报名开始':'#c98635','正式报名截止':'#c66b2d','考试日期':'#b84842','预计出分日期':'#6d5aa6'};
  function filterEvents(events,f){return events.filter(e=>(!f.language||e.language===f.language)&&(!f.exam||e.examName===f.exam)&&((f.month||f.view==='annual'||f.view==='month')?e.year===f.year&&(!f.month||e.month===f.month):e.session.year==f.year)&&( !f.q||`${e.examName}${e.language}${e.sessionName}`.toLowerCase().includes(f.q.toLowerCase()))) }
  function naturalMonth(year,month,events){const first=new Date(year,month-1,1),start=new Date(year,month-1,1-first.getDay()),cells=[];for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);cells.push({date:d,current:d.getMonth()===month-1,events:events.filter(e=>DateUtils.dateKey(d)===e.eventDate)})}return cells}
  window.CalendarEngine={colors,filterEvents,naturalMonth};
})();
