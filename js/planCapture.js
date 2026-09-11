(function(){
  function inlineStyles(source,copy){
    const style=getComputedStyle(source);
    for(const property of style)copy.style.setProperty(property,style.getPropertyValue(property),style.getPropertyPriority(property));
    const sourceChildren=[...source.children],copyChildren=[...copy.children];
    sourceChildren.forEach((child,index)=>copyChildren[index]&&inlineStyles(child,copyChildren[index]));
  }
  function imageFromSvg(svg){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('规划图渲染失败'));image.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`})}
  function blob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('规划图转换失败')),'image/png',1))}
  function safeName(value){return String(value||'留学语培规划轴').replace(/[\\/:*?"<>|]/g,'-')}
  async function create(){
    const source=document.querySelector('#app .matrix-page');
    if(!source)throw new Error('未找到当前规划轴');
    if(document.fonts)await document.fonts.ready;
    const parts=['.matrix-route','.matrix-shell','.matrix-note'].map(selector=>source.querySelector(`:scope > ${selector}`)).filter(Boolean);
    if(parts.length<2)throw new Error('当前规划轴内容不完整');
    const rect=source.getBoundingClientRect(),first=parts[0].getBoundingClientRect(),last=parts.at(-1).getBoundingClientRect(),width=Math.ceil(Math.max(source.scrollWidth,rect.width)),height=Math.ceil(last.bottom-first.top);
    const copy=document.createElement('section');inlineStyles(source,copy);copy.className=source.className;copy.style.display='flex';copy.style.flexDirection='column';copy.style.width=`${width}px`;copy.style.height=`${height}px`;copy.style.minHeight='0';copy.style.margin='0';copy.style.padding='0';copy.style.transform='none';copy.style.overflow='hidden';
    parts.forEach(part=>{const child=part.cloneNode(true),partRect=part.getBoundingClientRect();inlineStyles(part,child);child.style.width='100%';if(part.matches('.matrix-shell'))child.style.flex=`0 0 ${Math.ceil(partRect.height)}px`;copy.appendChild(child)});copy.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
    const serialized=new XMLSerializer().serializeToString(copy),svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`,image=await imageFromSvg(svg),scale=Math.min(2,8192/Math.max(width,height)),canvas=document.createElement('canvas');
    canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);const context=canvas.getContext('2d');context.scale(scale,scale);context.fillStyle='#f7f8ff';context.fillRect(0,0,width,height);context.drawImage(image,0,0,width,height);return canvas;
  }
  function download(value,name){const url=URL.createObjectURL(value),link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
  async function copyCurrent(){
    const canvas=await create(),value=await blob(canvas),heading=document.querySelector('#app .matrix-title h2')?.textContent?.trim(),route=document.querySelector('#app .route-options .active b')?.textContent?.trim(),name=`${safeName(heading)}${route?`-${safeName(route)}`:''}.png`;
    try{if(navigator.clipboard?.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'image/png':value})]);return'copied'}}catch(error){console.warn('图片剪贴板不可用，改为下载',error)}
    if(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)&&navigator.share){const file=new File([value],name,{type:'image/png'});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:heading||'留学语培规划轴'});return'downloaded'}}
    download(value,name);return'downloaded';
  }
  window.PlanCapture={create,copyCurrent};
  const trigger=document.querySelector('#planImageTrigger'),app=document.querySelector('#app');
  function syncTrigger(){
    const active=!!app?.querySelector('.matrix-page');
    if(trigger)trigger.hidden=!active;
    document.body.classList.toggle('plan-mode',active);
  }
  if(app)new MutationObserver(syncTrigger).observe(app,{childList:true});
  syncTrigger();
  trigger?.addEventListener('click',async()=>{const label=trigger.querySelector('b'),old=label.textContent;trigger.disabled=true;delete trigger.dataset.error;label.textContent='正在生成';try{const mode=await copyCurrent();window.ExamAnalytics?.event('copy_plan_image','studyPlan',{country:window.App?.studyPlanState?.country,scenario:window.App?.studyPlanState?.scenario,route:window.App?.studyPlanState?.route});window.App?.toast(mode==='copied'?'规划图已复制，可直接粘贴发送':'规划图已下载，可直接发送给学生')}catch(error){console.error(error);trigger.dataset.error=error?.message||String(error);window.App?.toast('规划图生成失败，请刷新后重试')}finally{trigger.disabled=false;label.textContent=old}});
})();
