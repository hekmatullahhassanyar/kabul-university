// Campus visit booking: seats left change, bookings are listed, visitor count is calculated
const slots=visitSlots.map(s=>({...s}));const mine=[];
const $s=$("#slots");
function renderSlots(){
  $s.empty();
  slots.forEach(s=>{
    const booked=mine.includes(s.id),full=s.seats===0&&!booked;
    $s.append(`<div class="col-sm-6"><div class="slot ${booked?"is-booked":""}"><div><strong>${s.day} ${s.date.slice(8)} Dec · ${s.time}</strong><div class="small">${s.tour}</div><div class="small ${s.seats<=1?"text-danger fw-semibold":"text-secondary"}">${full?"Fully booked":s.seats+" seat"+(s.seats===1?"":"s")+" left"}</div></div><button type="button" class="btn btn-line btn-sm ${booked?"on":""}" data-id="${s.id}" ${full?"disabled":""}>${booked?"Cancel":"Book"}</button></div></div>`);
  });
  const total=mine.length;
  $("#myCount").text(total);
  $("#myList").html(total?mine.map(id=>{const s=slots.find(x=>x.id===id);return `<li>${s.day} ${s.time} – ${s.tour}</li>`;}).join(""):"<li>No visits booked yet.</li>");
}
$s.on("click","[data-id]",function(){
  const id=+$(this).data("id"),s=slots.find(x=>x.id===id);
  if(mine.includes(id)){mine.splice(mine.indexOf(id),1);s.seats++;toast("Visit cancelled.");}
  else if(s.seats>0){mine.push(id);s.seats--;toast("Visit booked. See you on "+s.day+" at "+s.time+".");}
  renderSlots();
});
function toast(t){$("#bookMsg").stop(true,true).text(t).slideDown(200).delay(2500).slideUp(250);}
renderSlots();
