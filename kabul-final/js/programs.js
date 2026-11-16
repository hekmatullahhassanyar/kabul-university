// Search + filter + sort + saved shortlist with a credit limit
const $q=document.getElementById("q"),$lvl=document.getElementById("lvl"),$fac=document.getElementById("fac"),$srt=document.getElementById("srt");
const $res=document.getElementById("results"),$none=document.getElementById("none"),$count=document.getElementById("count");
[...new Set(programs.map(p=>p.faculty))].sort().forEach(f=>{const o=document.createElement("option");o.textContent=f;$fac.appendChild(o);});
document.getElementById("slMax").textContent=LIMITS.credits;

function getFiltered(){
  const term=$q.value.trim().toLowerCase();
  const list=programs.filter(p=>(!term||(p.name+" "+p.faculty+" "+p.desc).toLowerCase().includes(term))&&(!$lvl.value||p.level===$lvl.value)&&(!$fac.value||p.faculty===$fac.value));
  const by=$srt.value;
  list.sort((a,b)=>by==="name"?a.name.localeCompare(b.name):b[by]-a[by]);
  return list;
}
function render(){
  const list=getFiltered(),saved=Data.get().shortlist,used=Data.credits(saved);
  $res.innerHTML="";
  list.forEach((p,i)=>{
    const added=saved.includes(p.id),over=!added&&used+p.credits>LIMITS.credits;
    const col=document.createElement("div");col.className="col-md-6 pop";col.style.animationDelay=Math.min(i,8)*40+"ms";
    col.innerHTML=`<article class="kb-card"><div><span class="tag gold">${p.level}</span><span class="tag">${p.faculty}</span></div><h3>${p.name}</h3><p class="small">${p.desc}</p><p class="small mb-0">${p.years} years · ${p.credits} credits · ${p.seats} seats</p><div class="mt-auto"><button type="button" class="btn btn-line btn-sm${added?" on":""}${over?" locked":""}" data-id="${p.id}" aria-pressed="${added}"${over?' aria-disabled="true"':""}>${added?"Added ✓":over?"Over credit limit":"Add to shortlist"}</button></div></article>`;
    $res.appendChild(col);
  });
  $count.textContent=list.length+" of "+programs.length+" programs";
  $none.hidden=list.length>0;
}
function renderShortlist(){
  const saved=Data.get().shortlist,ul=document.getElementById("slList");ul.innerHTML="";
  let years=0;
  saved.forEach(id=>{const p=programs.find(x=>x.id===id);years+=p.years;
    const li=document.createElement("li");li.innerHTML=`<span>${p.name} <small>(${p.credits})</small></span><button class="rm" type="button" data-rm="${p.id}" aria-label="Remove ${p.name}">Remove</button>`;ul.appendChild(li);});
  const used=Data.credits(saved),pct=Math.min(100,used/LIMITS.credits*100);
  document.getElementById("slEmpty").hidden=saved.length>0;
  document.getElementById("slCredits").textContent=used;
  document.getElementById("slMeter").style.width=pct+"%";
  document.getElementById("slMeter").parentNode.classList.toggle("warn",pct>=85);
  document.getElementById("slLeft").textContent=LIMITS.credits-used+" credits left";
  document.getElementById("slYears").textContent=saved.length?(years/saved.length).toFixed(1):0;
  document.getElementById("slHint").innerHTML=Auth.current()?'Saved on your account. <a href="profile.html">Open my profile</a>':'Saved in this browser. <a href="account.html">Log in</a> to keep it on your account.';
}
function toggle(id){
  const d=Data.get(),p=programs.find(x=>x.id===id);
  if(d.shortlist.includes(id)){d.shortlist=d.shortlist.filter(x=>x!==id);toast(p.name+" removed from your shortlist.");}
  else{
    const used=Data.credits(d.shortlist);
    if(used+p.credits>LIMITS.credits){toast(`Credit limit reached. You can save up to ${LIMITS.credits} credits. ${p.name} needs ${p.credits} and you have ${LIMITS.credits-used} left.`,"error");return;}
    d.shortlist.push(id);toast(p.name+" added to your shortlist.");
  }
  Data.save(d);render();renderShortlist();
}
["input","change"].forEach(ev=>document.getElementById("filters").addEventListener(ev,render));
document.getElementById("filters").addEventListener("submit",e=>e.preventDefault());
$res.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b){toggle(+b.dataset.id);}});
document.getElementById("slList").addEventListener("click",e=>{const b=e.target.closest("[data-rm]");if(b){toggle(+b.dataset.rm);}});
document.getElementById("slClear").addEventListener("click",()=>{const d=Data.get();if(!d.shortlist.length){toast("Your shortlist is already empty.","error");return;}d.shortlist=[];Data.save(d);render();renderShortlist();toast("Shortlist cleared.");});
document.getElementById("reset").addEventListener("click",()=>{$q.value="";$lvl.value="";$fac.value="";$srt.value="name";render();});
render();renderShortlist();
