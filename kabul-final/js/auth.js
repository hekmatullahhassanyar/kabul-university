// Sign up / Log in (demo accounts in localStorage)
if(Auth.current()){location.replace("profile.html");}
function openTab(which){
  const signup=which==="signup";
  $("#tabLogin").attr("aria-selected",!signup);$("#tabSignup").attr("aria-selected",signup);
  $(signup?"#panelLogin":"#panelSignup").stop(true,true).hide();
  $(signup?"#panelSignup":"#panelLogin").stop(true,true).fadeIn(250);
}
$("#tabLogin").on("click",()=>openTab("login"));
$("#tabSignup").on("click",()=>openTab("signup"));
if(location.hash==="#signup"){openTab("signup");}
$("#login input").on("input",()=>$("#loginErr").hide());
$("#signup input").on("input",()=>$("#signupErr").hide());

setupForm(document.getElementById("login"),{lemail:[rules.required,rules.email],lpass:[rules.required]},v=>{
  const res=Auth.logIn(v.lemail,v.lpass);
  if(!res.ok){$("#loginErr").text(res.error).stop(true,true).slideDown(200);return false;}
  $("#loginOk").stop(true,true).slideDown(200);setTimeout(()=>{location.href="profile.html";},800);
});
setupForm(document.getElementById("signup"),{sname:[rules.required,rules.name],semail:[rules.required,rules.email],spass:[rules.required,rules.password],sconfirm:[rules.required,rules.same("spass")]},v=>{
  const res=Auth.signUp(v.sname,v.semail,v.spass);
  if(!res.ok){$("#signupErr").text(res.error).stop(true,true).slideDown(200);return false;}
  $("#signupOk").stop(true,true).slideDown(200);setTimeout(()=>{location.href="profile.html";},900);
});
