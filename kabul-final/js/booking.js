// Campus visit booking saved in localStorage, with a limit of LIMITS.visits visits per person
const $s=$("#slots");
document.getElementById("vl").textContent=LIMITS.visits;
function renderSlots(){
  const mine=Data.get().visits,used=mine.length;
  $s.empty();
  visitSlots.forEach(s=>{
    const booked=mine.includes(s.id),left=s.seats-(booked?1:0),full=left===0&&!booked,locked=!booked&&!full&&used>=LIMITS.visits;
    const label=booked?"Cancel":full?"Full":locked?"Limit reached":"Book";
    $s.append(`<div class="col-sm-6 pop"><div class="slot ${booked?"is-booked":""}"><div><strong>${s.day} ${s.date.slice(8)} Dec · ${s.time}</strong><div class="small">${s.tour}</div><div class="small ${left<=1&&!booked?"text-danger fw-semibold":"text-secondary"}">${full?"Fully booked":left+" seat"+(left===1?"":"s")+" left"}</div></div><button type="button" class="btn btn-line btn-sm ${booked?"on":""}${locked?" locked":""}" data-id="${s.id}"${full?" disabled":""}${locked?' aria-disabled="true"':""}>${label}</button></div></div>`);
  });
  $("#myCount").text(used);$("#myMax").text(LIMITS.visits);
  $("#visitMeter").css("width",used/LIMITS.visits*100+"%").parent().toggleClass("warn",used>=LIMITS.visits);
  $("#myList").html(used?mine.map(id=>{const s=visitSlots.find(x=>x.id===id);return `<li>${s.day} ${s.time} – ${s.tour}</li>`;}).join(""):"<li>No visits booked yet.</li>");
}
$s.on("click","[data-id]",function(){
  const id=+$(this).data("id"),d=Data.get(),s=visitSlots.find(x=>x.id===id);
  if(d.visits.includes(id)){d.visits=d.visits.filter(x=>x!==id);toast("Visit cancelled.");}
  else if(d.visits.length>=LIMITS.visits){toast(`You can book at most ${LIMITS.visits} campus visits. Cancel one to book another.`,"error");return;}
  else{d.visits.push(id);toast(`Visit booked: ${s.day} at ${s.time}.`);}
  Data.save(d);renderSlots();
});
renderSlots();
