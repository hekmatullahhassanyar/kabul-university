// Shared layout (navigation + footer) and jQuery effects used on every page
const pagesList = [["index.html","Home"],["programs.html","Programs"],["admissions.html","Admissions"]];
function buildLayout(){
  const current = location.pathname.split("/").pop() || "index.html";
  const links = pagesList.map(p => `<li class="nav-item"><a class="nav-link${p[0]===current?" active":""}" href="${p[0]}"${p[0]===current?' aria-current="page"':""}>${p[1]}</a></li>`).join("");
  document.getElementById("site-header").innerHTML = `<a class="skip" href="#main">Skip to content</a>
  <nav class="navbar navbar-expand-lg site-nav" aria-label="Main navigation"><div class="container">
   <a class="navbar-brand" href="index.html"><img src="images/logo.svg" alt="Kabul University emblem">Kabul University</a>
   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
   <div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto">${links}</ul></div></div></nav>`;
  document.getElementById("site-footer").innerHTML = `<footer><div class="container"><div class="row g-4">
   <div class="col-md-5"><h2>Kabul University</h2><p>A student project website about the oldest public university in Afghanistan, founded in 1932 in Kabul.</p></div>
   <div class="col-6 col-md-3"><h2>Pages</h2><ul class="list-unstyled">${pagesList.map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
   <div class="col-6 col-md-4"><h2>Credits</h2><p class="small">Fonts: Fraunces and Source Sans 3 (Google Fonts). Framework: Bootstrap 5.3, jQuery 3.7. Emblem and patterns drawn as SVG. Photos: see the photo credit shown with each picture and in the project report. Content is sample text written for a course project; it is not the official university website.</p></div>
  </div><p class="small mt-3 mb-0">© 2026 Student project for Web Technologies 1.</p></div></footer>
  <button id="toTop" type="button" aria-label="Back to top">↑</button>`;
}
buildLayout();

$(function(){
  // Effect 1: smooth scroll + back-to-top button
  $(document).on("click",'a[href^="#"]:not(.skip)',function(e){
    const t=$(this.hash); if(!t.length) return; e.preventDefault();
    $("html,body").stop(true).animate({scrollTop:t.offset().top-70},500);
  });
  $("#toTop").on("click",()=>$("html,body").stop(true).animate({scrollTop:0},500));
  $(window).on("scroll",function(){ $(this).scrollTop()>400 ? $("#toTop").stop(true,true).fadeIn(200) : $("#toTop").stop(true,true).fadeOut(200); });

  // Effect 2: accordion (one open at a time; stop() prevents repeated animations)
  $(".faq-q").on("click",function(){
    const $a=$("#"+this.getAttribute("aria-controls")),open=$(this).attr("aria-expanded")==="true";
    $(".faq-q").attr("aria-expanded","false");$(".faq-a").stop(true,true).slideUp(250);
    if(!open){ $(this).attr("aria-expanded","true");$a.stop(true,true).slideDown(250); }
  });

  // Effect 3: counters animate once when they scroll into view
  $(".count").each(function(){
    const $el=$(this), end=+$el.data("end"); let done=false;
    function run(){ if(done||$(window).scrollTop()+$(window).height()<$el.offset().top) return; done=true;
      $({n:0}).animate({n:end},{duration:1400,step:function(){ $el.text(Math.floor(this.n)); },complete:function(){ $el.text(end); }}); }
    $(window).on("scroll",run); run();
  });

  // Effect 4: card hover lift
  $(document).on("mouseenter",".kb-card,.ev-card",function(){ $(this).stop(true).animate({marginTop:"-4px"},150); })
             .on("mouseleave",".kb-card,.ev-card",function(){ $(this).stop(true).animate({marginTop:"0px"},150); });
});
