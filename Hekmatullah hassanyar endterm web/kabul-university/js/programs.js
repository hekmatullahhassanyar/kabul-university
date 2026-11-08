// Search + filter + sort + shortlist with calculated totals
const $q=document.getElementById("q"),$lvl=document.getElementById("lvl"),$fac=document.getElementById("fac"),$srt=document.getElementById("srt");
const $res=document.getElementById("results"),$none=document.getElementById("none"),$count=document.getElementById("count");
let shortlist=[];
[...new Set(programs.map(p=>p.faculty))].sort().forEach(f=>{const o=document.createElement("option");o.textContent=f;$fac.appendChild(o);});

function getFiltered(){
  const term=$q.value.trim().toLowerCase();
  const list=programs.filter(p=>(!term||(p.name+" "+p.faculty+" "+p.desc).toLowerCase().includes(term))&&(!$lvl.value||p.level===$lvl.value)&&(!$fac.value||p.faculty===$fac.value));
  const by=$srt.value;
  list.sort((a,b)=>by==="name"?a.name.localeCompare(b.name):b[by]-a[by]);
  return list;
}
function render(){
  const list=getFiltered();
  $res.innerHTML="";
  list.forEach(p=>{
    const col=document.createElement("div");col.className="col-md-6";
    const added=shortlist.includes(p.id);
    col.innerHTML=`<article class="kb-card"><div><span class="tag gold">${p.level}</span><span class="tag">${p.faculty}</span></div><h3>${p.name}</h3><p class="small">${p.desc}</p><p class="small mb-0">${p.years} years · ${p.credits} credits · ${p.seats} seats</p><div class="mt-auto"><button type="button" class="btn btn-line btn-sm ${added?"on":""}" data-id="${p.id}" aria-pressed="${added}">${added?"Added ✓":"Add to shortlist"}</button></div></article>`;
    $res.appendChild(col);
  });
  $count.textContent=list.length+" of "+programs.length+" programs";
  $none.hidden=list.length>0;
}
function renderShortlist(){
  const items=shortlist.map(id=>programs.find(p=>p.id===id));
  const ul=document.getElementById("slList");ul.innerHTML="";
  let credits=0,years=0;
  for(const p of items){credits+=p.credits;years+=p.years;
    const li=document.createElement("li");li.innerHTML=`<span>${p.name}</span><button class="rm" type="button" data-rm="${p.id}" aria-label="Remove ${p.name}">Remove</button>`;ul.appendChild(li);}
  document.getElementById("slEmpty").hidden=items.length>0;
  document.getElementById("slCredits").textContent=credits;
  document.getElementById("slYears").textContent=items.length?(years/items.length).toFixed(1):0;
}
function toggle(id){shortlist=shortlist.includes(id)?shortlist.filter(x=>x!==id):[...shortlist,id];render();renderShortlist();}
["input","change"].forEach(ev=>document.getElementById("filters").addEventListener(ev,render));
document.getElementById("filters").addEventListener("submit",e=>e.preventDefault());
$res.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)toggle(+b.dataset.id);});
document.getElementById("slList").addEventListener("click",e=>{const b=e.target.closest("[data-rm]");if(b)toggle(+b.dataset.rm);});
document.getElementById("slClear").addEventListener("click",()=>{shortlist=[];render();renderShortlist();});
document.getElementById("reset").addEventListener("click",()=>{$q.value="";$lvl.value="";$fac.value="";$srt.value="name";render();});
render();renderShortlist();
