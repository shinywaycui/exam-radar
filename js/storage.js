(function(){
  const DB='exam-marketing-radar',STORE='datasets',KEY='current';
  function open(){return new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  async function get(){const db=await open();return new Promise((res,rej)=>{const r=db.transaction(STORE).objectStore(STORE).get(KEY);r.onsuccess=()=>res(r.result||null);r.onerror=()=>rej(r.error)})}
  async function set(data){const db=await open();return new Promise((res,rej)=>{const r=db.transaction(STORE,'readwrite').objectStore(STORE).put(data,KEY);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
  async function clear(){const db=await open();return new Promise((res,rej)=>{const r=db.transaction(STORE,'readwrite').objectStore(STORE).delete(KEY);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
  window.RadarStorage={get,set,clear};
})();
