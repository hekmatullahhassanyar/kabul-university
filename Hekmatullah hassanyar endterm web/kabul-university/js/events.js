const TODAY=new Date("2026-11-08");let cat="All";const registered=new Set();
const cats=["All",...new Set(events.map(e=>e.category))];
const $cats=document.getElementById("cats"),$list=document.getElementById("evList"),$eq=document.getElementById("eq");
cats.forEach(c=>{const b=document.createElement("button");b.type="button";b.className="btn btn-line btn-sm"+(c===cat?" on":"");b.textContent=c;b.setAttribute("aria-pressed",c===cat);b.dataset.c=c;$cats.appendChild(b);});
const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function render(){
  const t=$eq.value.trim().toLowerCase();
  const list=events.filter(e=>(cat==="All"||e.category===cat)&&(!t||(e.title+e.desc+e.place).toLowerCase().includes(t)));
  $list.innerHTML="";
  list.forEach(e=>{
    const d=new Date(e.date),days=Math.ceil((d-TODAY)/86400000),on=registered.has(e.id);
    const col=document.createElement("div");col.className="col-md-6";
    col.innerHTML=`<article class="ev-card"><div class="ev-date" aria-hidden="true"><b>${d.getUTCDate()}</b>${MONTHS[d.getUTCMonth()]}</div><div><span class="tag gold">${e.category}</span><h3 class="h5">${e.title}</h3><p class="small mb-1">${e.desc}</p><p class="small text-secondary">${e.place} · in ${days} days</p><button class="btn btn-line btn-sm ${on?"on":""}" type="button" data-id="${e.id}">${on?"Registered ✓":"Register"}</button></div></article>`;
    $list.appendChild(col);
  });
  document.getElementById("ecount").textContent=`${list.length} event${list.length===1?"":"s"} · you are registered for ${registered.size}`;
  document.getElementById("eNone").hidden=list.length>0;
}
$cats.addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;cat=b.dataset.c;
 [...$cats.children].forEach(x=>{const a=x===b;x.classList.toggle("on",a);x.setAttribute("aria-pressed",a);});render();});
$list.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(!b)return;const id=+b.dataset.id;registered.has(id)?registered.delete(id):registered.add(id);render();});
$eq.addEventListener("input",render);
render();
