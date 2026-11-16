// Runs in <head> before the page is drawn, so the saved mode appears without a flash.
(function(){
  var t=null;
  try{t=localStorage.getItem("kb:theme");}catch(e){}
  if(t!=="light"&&t!=="dark"){t="dark";}
  var h=document.documentElement;
  h.setAttribute("data-theme",t);h.setAttribute("data-bs-theme",t);h.classList.add("js");
})();
