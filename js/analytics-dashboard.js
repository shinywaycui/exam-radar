(function(){
  const $=s=>document.querySelector(s),tokenKey='exam-radar-analytics-token';
  const state={token:sessionStorage.getItem(tokenKey)||'',days:7,start:null,end:null,data:null};
  const labels={page_view:'页面浏览',copy_content:'复制内容',share_site:'分享网页',generate_poster:'生成配图',download_poster:'下载配图'};
  const pageLabels={radar:'小语种考试雷达',calendar:'全年考试日历',library:'考试库',invitation:'考试邀约钩子',reminder:'对内营销提醒'};
  function toast(msg){const el=$('#analyticsToast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2000)}
  function isoDay(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
  function setRange(days){const end=new Date();end.setHours(23,59,59,999);const start=new Date();start.setHours(0,0,0,0);start.setDate(start.getDate()-days+1);state.days=days;state.start=start;state.end=end;$('#startDate').value=isoDay(start);$('#endDate').value=isoDay(end)}
  function num(v){return Number(v||0).toLocaleString('zh-CN')}
  function fmtTime(v){if(!v)return'—';return new Intl.DateTimeFormat('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(v))}
  function pageName(path){const hash=String(path||'').split('#')[1]||'radar';return pageLabels[hash]||hash||'/'}
  async function fetchData(){
    $('#rangeText').textContent='正在读取统计数据…';
    const query=new URLSearchParams({start:state.start.toISOString(),end:state.end.toISOString()});
    const controller=typeof AbortController==='function'?new AbortController():null;
    const timer=setTimeout(()=>controller?.abort(),15000);
    let response;
    try{response=await Promise.race([
      fetch(`/api/stats?${query}&_=${Date.now()}`,{headers:{Authorization:`Bearer ${state.token}`},cache:'no-store',signal:controller?.signal}),
      new Promise((_,reject)=>setTimeout(()=>reject(new Error('网络响应超时，请重试')),16000))
    ])}catch(e){throw new Error(e?.name==='AbortError'?'网络响应超时，请重试':(e?.message||'无法连接统计服务'))}finally{clearTimeout(timer)}
    const data=await response.json().catch(()=>({}));
    if(response.status===401)throw new Error('密钥不正确，请重新登录');
    if(data.error==='ANALYTICS_DB_NOT_CONFIGURED')throw new Error('Cloudflare 尚未绑定 ANALYTICS_DB 数据库');
    if(!response.ok||!data.ok)throw new Error('统计数据读取失败');
    state.data=data;render(data);
  }
  function render(data){
    const s=data.summary,values=[s.visitors,s.visits,s.pageViews,s.actions,s.pagesPerVisit];
    $$('#metrics .metric strong').forEach((el,i)=>el.textContent=i===4?Number(values[i]||0).toFixed(2):num(values[i]));
    $('#rangeText').textContent=`${isoDay(state.start)} 至 ${isoDay(state.end)} · 数据实时更新`;
    renderChart(data.trend);renderRanks('#pageList',data.pages,x=>pageName(x.name));renderRanks('#sourceList',data.sources,x=>x.name);
    renderRanks('#deviceList',data.devices,x=>x.name);renderRanks('#actionList',data.actions,x=>labels[x.name]||x.name);
    $('#regionRows').innerHTML=data.regions.length?data.regions.map(x=>`<tr><td>${esc(x.country)}</td><td>${esc(x.city)}</td><td>${num(x.visitors)}</td><td>${num(x.page_views)}</td></tr>`).join(''):emptyRow(4);
    $('#ipRows').innerHTML=data.ipSources.length?data.ipSources.map(x=>`<tr><td>${esc(x.masked_ip)}</td><td>${esc(x.country||'未知')}</td><td>${esc([x.region,x.city].filter(Boolean).join(' / ')||'未知')}</td><td>${num(x.visits)}</td><td>${num(x.page_views)}</td><td>${fmtTime(x.last_seen)}</td></tr>`).join(''):emptyRow(6);
  }
  function $$(s){return[...document.querySelectorAll(s)]}
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function emptyRow(n){return`<tr><td colspan="${n}" style="text-align:center;color:#aaa">当前周期暂无数据</td></tr>`}
  function renderRanks(sel,items,name){const root=$(sel),max=Math.max(1,...items.map(x=>Number(x.value||0)));root.innerHTML=items.length?items.map((x,i)=>`<div class="rank-row"><i>${String(i+1).padStart(2,'0')}</i><b title="${esc(name(x))}">${esc(name(x))}</b><strong>${num(x.value)}</strong><div class="bar"><i style="width:${Math.max(3,Number(x.value||0)/max*100)}%"></i></div></div>`).join(''):'<div class="empty">当前周期暂无数据</div>'}
  function renderChart(items){
    const root=$('#trendChart');if(!items.length){root.innerHTML='<div class="empty">当前周期暂无访问趋势</div>';return}
    const w=1000,h=220,p={l:35,r:18,t:15,b:32},max=Math.max(1,...items.flatMap(x=>[+x.page_views||0,+x.visitors||0]));
    const x=i=>p.l+(items.length===1?(w-p.l-p.r)/2:i*(w-p.l-p.r)/(items.length-1)),y=v=>p.t+(h-p.t-p.b)*(1-v/max);
    const points=key=>items.map((d,i)=>`${x(i)},${y(+d[key]||0)}`).join(' '),area=`${p.l},${h-p.b} ${points('page_views')} ${x(items.length-1)},${h-p.b}`;
    const grids=Array.from({length:5},(_,i)=>{const gy=p.t+i*(h-p.t-p.b)/4,val=Math.round(max*(1-i/4));return`<line class="chart-grid" x1="${p.l}" y1="${gy}" x2="${w-p.r}" y2="${gy}"/><text class="chart-label" x="0" y="${gy+4}">${val}</text>`}).join('');
    const labelsHtml=items.map((d,i)=>`<text class="chart-label" x="${x(i)}" y="${h-8}" text-anchor="middle">${String(d.day).slice(5).replace('-','/')}</text>`).join('');
    root.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6673d8" stop-opacity=".22"/><stop offset="1" stop-color="#6673d8" stop-opacity="0"/></linearGradient></defs>${grids}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points('page_views')}"/><polyline class="chart-line uv" points="${points('visitors')}"/>${labelsHtml}</svg>`;
  }
  async function login(token){state.token=token;sessionStorage.setItem(tokenKey,token);try{await fetchData();$('#loginScreen').hidden=true;$('#dashboard').hidden=false}catch(e){sessionStorage.removeItem(tokenKey);state.token='';$('#loginError').textContent=e.message;throw e}}
  $('#loginForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const button=$('#loginBtn'),token=$('#adminToken').value.trim();
    if(!token){$('#loginError').textContent='请输入管理员密钥';return}
    $('#loginError').textContent='正在验证…';button.disabled=true;button.innerHTML='正在登录 <i>…</i>';
    try{await login(token)}catch(e){$('#loginError').textContent=e.message||'登录失败，请稍后重试';toast($('#loginError').textContent)}finally{button.disabled=false;button.innerHTML='进入监控后台 <i>→</i>'}
  });
  $('#logoutBtn').addEventListener('click',()=>{sessionStorage.removeItem(tokenKey);location.reload()});
  $('#refreshBtn').addEventListener('click',()=>fetchData().then(()=>toast('数据已刷新')).catch(e=>toast(e.message)));
  $('#presets').addEventListener('click',e=>{const b=e.target.closest('[data-days]');if(!b)return;$$('#presets button').forEach(x=>x.classList.toggle('active',x===b));setRange(+b.dataset.days);fetchData().catch(e=>toast(e.message))});
  $('#applyDate').addEventListener('click',()=>{const a=$('#startDate').value,b=$('#endDate').value;if(!a||!b)return toast('请选择完整日期');state.start=new Date(`${a}T00:00:00`);state.end=new Date(`${b}T23:59:59.999`);$$('#presets button').forEach(x=>x.classList.remove('active'));fetchData().catch(e=>toast(e.message))});
  document.querySelector('aside nav').addEventListener('click',e=>{const b=e.target.closest('[data-scroll]');if(b)document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})});
  setRange(7);if(state.token)login(state.token).catch(()=>{$('#loginScreen').hidden=false;$('#dashboard').hidden=true});
})();
