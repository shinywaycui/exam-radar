(function(){
  const colors={'报名注册开始':'#2878d0','正式报名开始':'#1f9b83','正式报名截止':'#e58a24','准考证打印开始':'#b54c9a','考试日期':'#d9485f','出分日期':'#7659d6'};
  function filterEvents(events,f){const month=f.view==='annual'?0:f.month;return events.filter(e=>(!f.language||e.language===f.language)&&(!f.exam||e.examName===f.exam)&&((month||f.view==='annual'||f.view==='month')?e.year===f.year&&(!month||e.month===month):e.session.year==f.year)&&( !f.q||`${e.examName}${e.language}${e.sessionName}`.toLowerCase().includes(f.q.toLowerCase()))) }
  function naturalMonth(year,month,events){const first=new Date(year,month-1,1),start=new Date(year,month-1,1-first.getDay()),cells=[];for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);cells.push({date:d,current:d.getMonth()===month-1,events:events.filter(e=>DateUtils.dateKey(d)===e.eventDate)})}return cells}
  window.CalendarEngine={colors,filterEvents,naturalMonth};
})();
