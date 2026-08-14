(function(){
  if(location.protocol==='file:'||location.pathname.endsWith('/analytics.html'))return;
  const key='exam-radar-session-id';
  let sessionId=sessionStorage.getItem(key);
  if(!sessionId){sessionId=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;sessionStorage.setItem(key,sessionId)}
  let lastPage='',lastAt=0;
  function send(eventName,pagePath,metadata){
    const body=JSON.stringify({eventName,pagePath,pageTitle:document.title,referrer:document.referrer,sessionId,metadata});
    try{
      fetch('/api/track',{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true}).catch(()=>{})
    }catch{}
  }
  function track(page){const path=`${location.pathname}#${page||location.hash.slice(1)||'radar'}`,now=Date.now();if(path===lastPage&&now-lastAt<2000)return;lastPage=path;lastAt=now;send('page_view',path)}
  function event(name,page,metadata){send(name,`${location.pathname}#${page||'radar'}`,metadata||{})}
  window.ExamAnalytics={track,event};
})();
