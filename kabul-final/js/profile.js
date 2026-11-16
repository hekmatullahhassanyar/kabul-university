// Profile page: shows saved data from localStorage; items can be removed one by one or cleared
const user=Auth.current();
if(!user){$("#guest").show();}
else{
  $("#guest").hide();
  $("#member").show();
  $("#pName").text(user.name);$("#pEmail").text(user.email);
  $("#pAvatar").text(user.name.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase());
  $("#pJoined").text("Member since "+new Date(user.joined).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}));
  $("#pLogout").on("click",()=>{Auth.logOut();location.href="index.html";});
  const empty=(txt,href,label)=>`<li class="text-secondary">${txt} <a href="${href}">${label}</a></li>`;
  function render(){
    const d=Data.get(),used=Data.credits(d.shortlist),pct=Math.min(100,used/LIMITS.credits*100);
    $("#sSaved").text(d.shortlist.length);$("#sEvents").text(d.events.length);
    $("#sCredits").text(used+" / "+LIMITS.credits);$("#sVisits").text(d.visits.length+" / "+LIMITS.visits);
    $("#pCreditMeter").css("width",pct+"%").parent().toggleClass("warn",pct>=85);
    $("#pVisitMeter").css("width",d.visits.length/LIMITS.visits*100+"%").parent().toggleClass("warn",d.visits.length>=LIMITS.visits);
    $("#sQuiz").text(d.quiz?d.quiz.best+" / "+d.quiz.total:"–");
    $("#pProgList").html(d.shortlist.length?d.shortlist.map(id=>{const p=programs.find(x=>x.id===id);return `<li><span>${p.name} <small class="text-secondary">${p.level} · ${p.credits} credits</small></span><button class="rm" type="button" data-k="shortlist" data-id="${id}" aria-label="Remove ${p.name}">Remove</button></li>`;}).join(""):empty("No saved programs yet.","programs.html","Browse programs"));
    $("#pVisitList").html(d.visits.length?d.visits.map(id=>{const s=visitSlots.find(x=>x.id===id);return `<li><span>${s.day} ${s.date.slice(8)} Dec, ${s.time} <small class="text-secondary">${s.tour}</small></span><button class="rm" type="button" data-k="visits" data-id="${id}" aria-label="Cancel visit ${s.tour}">Cancel</button></li>`;}).join(""):empty("No campus visits booked.","admissions.html#bk","Book a visit"));
    $("#pEventList").html(d.events.length?d.events.map(id=>{const e=events.find(x=>x.id===id);return `<li><span>${e.title} <small class="text-secondary">${e.date}</small></span><button class="rm" type="button" data-k="events" data-id="${id}" aria-label="Remove ${e.title}">Remove</button></li>`;}).join(""):empty("No registered events.","index.html#ev","See events"));
    const sem=Math.ceil(used/LIMITS.semesterCredits);
    $("#pPlan").text(used?`Your saved programs add up to ${used} credits. At ${LIMITS.semesterCredits} credits per semester, that is about ${sem} semester${sem===1?"":"s"} (${(sem/2).toFixed(1)} years).`:"Save programs to see an estimated study plan here.");
    $("#pQuiz").text(d.quiz?`Last attempt: ${d.quiz.last} / ${d.quiz.total} on ${d.quiz.date}.`:"You have not taken the practice exam yet.");
    $("#jsonOut").text(JSON.stringify(d,null,2));
    updateBadge();
  }
  $("#member").on("click",".rm",function(){const d=Data.get(),k=$(this).data("k"),id=+$(this).data("id");d[k]=d[k].filter(x=>x!==id);Data.save(d);render();toast("Item removed.");});
  $("[data-clear]").on("click",function(){const d=Data.get(),k=$(this).data("clear");d[k]=k==="quiz"?null:[];Data.save(d);render();toast("Cleared.");});
  $("#jsonBtn").on("click",function(){const open=$("#jsonOut").is(":visible");$("#jsonOut").stop(true,true).slideToggle(250);$(this).text(open?"Show my saved data (JSON)":"Hide saved data");});
  render();
}
