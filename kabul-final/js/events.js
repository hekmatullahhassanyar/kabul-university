// Events: search, category filter, registration saved in localStorage
let cat="All";
const cats=["All",...new Set(events.map(e=>e.category))];
const $cats=document.getElementById("cats"),$list=document.getElementById("evList"),$eq=document.getElementById("eq");
const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
cats.forEach(c=>{const b=document.createElement("button");b.type="button";b.className="btn btn-line btn-sm"+(c===cat?" on":"");b.textContent=c;b.setAttribute("aria-pressed",c===cat);b.dataset.c=c;$cats.appendChild(b);});
function render(){
  const t=$eq.value.trim().toLowerCase(),mine=Data.get().events;
  const list=events.filter(e=>(cat==="All"||e.category===cat)&&(!t||(e.title+e.desc+e.place).toLowerCase().includes(t)));
  $list.innerHTML="";
  list.forEach((e,i)=>{
    const d=new Date(e.date),days=Math.ceil((d-new Date())/86400000),on=mine.includes(e.id);
    const col=document.createElement("div");col.className="col-md-6 pop";col.style.animationDelay=Math.min(i,8)*40+"ms";
    col.innerHTML=`<article class="ev-card"><div class="ev-date" aria-hidden="true"><b>${d.getUTCDate()}</b>${MONTHS[d.getUTCMonth()]}</div><div><span class="tag gold">${e.category}</span><h3 class="h5">${e.title}</h3><p class="small mb-1">${e.desc}</p><p class="small text-secondary">${e.place} · ${days>0?"in "+days+" days":"finished"}</p><button class="btn btn-line btn-sm ${on?"on":""}" type="button" data-id="${e.id}" aria-pressed="${on}">${on?"Registered ✓":"Register"}</button></div></article>`;
    $list.appendChild(col);
  });
  document.getElementById("ecount").textContent=`${list.length} event${list.length===1?"":"s"} · you are registered for ${mine.length}`;
  document.getElementById("eNone").hidden=list.length>0;
}
$cats.addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;cat=b.dataset.c;
 [...$cats.children].forEach(x=>{const a=x===b;x.classList.toggle("on",a);x.setAttribute("aria-pressed",a);});render();});
$list.addEventListener("click",e=>{
  const b=e.target.closest("[data-id]");if(!b)return;
  const id=+b.dataset.id,d=Data.get(),ev=events.find(x=>x.id===id);
  if(d.events.includes(id)){d.events=d.events.filter(x=>x!==id);toast("Registration cancelled: "+ev.title);}
  else{d.events.push(id);toast("You are registered: "+ev.title);}
  Data.save(d);render();
});
$eq.addEventListener("input",render);
render();
