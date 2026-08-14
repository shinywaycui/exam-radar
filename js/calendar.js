(function(){
  const colors={'报名注册开始':'#1677d2','正式报名开始':'#e49a18','正式报名截止':'#e35f25','考试日期':'#d93f56','出分日期':'#7758d5'};
  function filterEvents(events,f){return events.filter(e=>(!f.language||e.language===f.language)&&(!f.exam||e.examName===f.exam)&&((f.month||f.view==='annual'||f.view==='month')?e.year===f.year&&(!f.month||e.month===f.month):e.session.year==f.year)&&( !f.q||`${e.examName}${e.language}${e.sessionName}`.toLowerCase().includes(f.q.toLowerCase()))) }
  function naturalMonth(year,month,events){const first=new Date(year,month-1,1),start=new Date(year,month-1,1-first.getDay()),cells=[];for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);cells.push({date:d,current:d.getMonth()===month-1,events:events.filter(e=>DateUtils.dateKey(d)===e.eventDate)})}return cells}
  window.CalendarEngine={colors,filterEvents,naturalMonth};
})();
