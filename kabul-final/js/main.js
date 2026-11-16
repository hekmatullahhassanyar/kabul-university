// Shared layout (navigation with dark-mode toggle and account links, footer, toasts) and jQuery effects
const pagesList=[["index.html","Home"],["programs.html","Programs"],["admissions.html","Admissions"]];
const SUN='<svg class="i-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON='<svg class="i-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

function updateBadge(){const b=document.getElementById("saveBadge");if(b){const n=Data.count();b.textContent=n;b.hidden=n===0;}}
function themeLabel(){return document.documentElement.getAttribute("data-theme")==="dark"?"Switch to light mode":"Switch to dark mode";}
function toast(message,type){
  const $box=$("#toasts");
  if($box.children().length>=3){$box.children().first().remove();}
  $("<div>",{class:"toast-kb "+(type||"ok"),role:"status"}).text(message).appendTo($box).hide().slideDown(200).delay(3200).fadeOut(300,function(){$(this).remove();});
}

function buildLayout(){
  const current=location.pathname.split("/").pop()||"index.html";
  const user=Auth.current();
  const links=pagesList.map(p=>`<li class="nav-item"><a class="nav-link${p[0]===current?" active":""}" href="${p[0]}"${p[0]===current?' aria-current="page"':""}>${p[1]}</a></li>`).join("");
  const acct=(current==="account.html"||current==="profile.html")?' active" aria-current="page':"";
  const auth=user
    ?`<li class="nav-item"><a class="nav-link${acct}" href="profile.html"><span id="navName"></span> <span class="badge-count" id="saveBadge" hidden>0</span></a></li><li class="nav-item"><button class="nav-link nav-btn" id="logoutBtn" type="button">Log out</button></li>`
    :`<li class="nav-item"><a class="nav-link${acct}" href="account.html">Log in</a></li>`;
  document.getElementById("site-header").innerHTML=`<a class="skip" href="#main">Skip to content</a>
  <header><nav class="navbar navbar-expand-lg site-nav" aria-label="Main navigation"><div class="container">
   <a class="navbar-brand" href="index.html"><img src="images/logo.svg" alt="Kabul University emblem">Kabul University</a>
   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
   <div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">${links}${auth}
    <li class="nav-item ms-lg-2"><button class="theme-btn" id="themeBtn" type="button" aria-label="${themeLabel()}" title="${themeLabel()}">${SUN}${MOON}</button></li></ul></div></div></nav></header>`;
  if(user){document.getElementById("navName").textContent=user.name.split(" ")[0];}
  document.getElementById("site-footer").innerHTML=`<footer><div class="container"><div class="row g-4">
   <div class="col-md-5"><h2>Kabul University</h2><p>A student project website about the oldest public university in Afghanistan, founded in 1932 in Kabul.</p></div>
   <div class="col-6 col-md-3"><h2>Pages</h2><ul class="list-unstyled">${pagesList.concat([["account.html",user?"My profile":"Log in"]]).map((p,i)=>`<li><a href="${i===3&&user?"profile.html":p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
   <div class="col-6 col-md-4"><h2>Credits</h2><p class="small">Fonts: Fraunces and Source Sans 3 (Google Fonts). Framework: Bootstrap 5.3, jQuery 3.7. Emblem and patterns drawn as SVG. Photos: see the photo credit shown with each picture and in the project report. Content is sample text written for a course project; it is not the official university website.</p></div>
  </div><p class="small mt-3 mb-0">© 2026 Student project for Web Technologies 1.</p></div></footer>
  <button id="toTop" type="button" aria-label="Back to top">↑</button><div id="toasts" aria-live="polite"></div>`;
}
buildLayout();
updateBadge();

$(function(){
  // Dark / light toggle (keyboard works because it is a real button); the choice is saved in localStorage
  $("#themeBtn").on("click",function(){
    const next=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);document.documentElement.setAttribute("data-bs-theme",next);
    try{localStorage.setItem("kb:theme",next);}catch(e){}
    $(this).attr({"aria-label":themeLabel(),title:themeLabel()});
  });
  $("#logoutBtn").on("click",function(){Auth.logOut();location.href="index.html";});

  // Effect 1: smooth scroll and back-to-top button
  $(document).on("click",'a[href^="#"]:not(.skip)',function(e){
    const t=$(this.hash);if(!t.length)return;e.preventDefault();
    $("html,body").stop(true).animate({scrollTop:t.offset().top-70},500);
  });
  $("#toTop").on("click",()=>$("html,body").stop(true).animate({scrollTop:0},500));
  $(window).on("scroll",function(){$(this).scrollTop()>400?$("#toTop").stop(true,true).fadeIn(200):$("#toTop").stop(true,true).fadeOut(200);});

  // Effect 2: accordion (one answer open at a time)
  $(".faq-q").on("click",function(){
    const $a=$("#"+this.getAttribute("aria-controls")),open=$(this).attr("aria-expanded")==="true";
    $(".faq-q").attr("aria-expanded","false");$(".faq-a").stop(true,true).slideUp(250);
    if(!open){$(this).attr("aria-expanded","true");$a.stop(true,true).slideDown(250);}
  });

  // Effect 3: counters count up when they scroll into view
  $(".count").each(function(){
    const $el=$(this),end=+$el.attr("data-end");let done=false;
    function run(){if(done||$(window).scrollTop()+$(window).height()<$el.offset().top)return;done=true;
      $({n:0}).animate({n:end},{duration:1400,step:function(){$el.text(Math.floor(this.n));},complete:function(){$el.text(end);}});}
    $(window).on("scroll",run);run();
  });

  // Effect 4: cards lift on hover
  $(document).on("mouseenter",".kb-card,.ev-card",function(){$(this).stop(true).animate({marginTop:"-4px"},150);})
             .on("mouseleave",".kb-card,.ev-card",function(){$(this).stop(true).animate({marginTop:"0px"},150);});

  // Effect 5: elements fade up one time when they come into view
  $(".kb-card,.stat,.form-card,.faq-item,.table-wrap,.photo-fig,main section h2").addClass("reveal");
  function reveal(){const edge=$(window).scrollTop()+$(window).height()-40;$(".reveal:not(.in)").each(function(){if($(this).offset().top<edge){$(this).addClass("in");}});}
  $(window).on("scroll resize",reveal);reveal();

  // Effect 6: the hero word changes every few seconds
  if($("#rot").length&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const words=["lead","build","teach","create","serve"];let i=0;
    setInterval(()=>{$("#rot").stop(true,true).fadeTo(250,0,function(){i=(i+1)%words.length;$(this).text(words[i]);}).fadeTo(250,1);},2600);
  }
});
