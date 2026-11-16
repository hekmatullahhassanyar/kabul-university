// Photo gallery built from the spots array + jQuery lightbox
const g=document.getElementById("gallery");let lastBtn=null;
spots.forEach((s,i)=>{const c=document.createElement("div");c.className="col-6 col-lg-4";
 c.innerHTML=`<button class="gal" type="button" data-i="${i}" style="background:linear-gradient(135deg,${s.c1},${s.c2})" aria-label="Open ${s.title}"><img src="images/${s.img}" alt="${s.alt}" loading="lazy" onerror="this.style.display='none'"><span>${s.title}</span></button>`;g.appendChild(c);});
$(function(){
  $("#gallery").on("click",".gal",function(){
    lastBtn=this;const s=spots[+this.dataset.i];
    $("#lbT").text(s.title);$("#lbP").text(s.text);
    $("#lbCredit").text(s.credit?"Photo: "+s.credit:"");
    $("#lbArt").css("background",`linear-gradient(135deg,${s.c1},${s.c2})`).html(`<img src="images/${s.img}" alt="${s.alt}" onerror="this.style.display='none'">`);
    $("#lb").stop(true,true).css("display","flex").hide().fadeIn(250);$("#lbClose").focus();
  });
  function close(){$("#lb").stop(true,true).fadeOut(200,()=>lastBtn&&lastBtn.focus());}
  $("#lbClose").on("click",close);
  $("#lb").on("click",e=>{if(e.target.id==="lb")close();});
  $(document).on("keydown",e=>{if(e.key==="Escape"&&$("#lb").is(":visible"))close();});
});
