// localStorage helpers: everything is saved as JSON text. Each function works even if storage is empty or blocked.
const LIMITS={credits:300,visits:2,semesterCredits:18};
const KEYS={users:"kb:users",session:"kb:session"};
function readJSON(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch(e){return fallback;}}
function writeJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}}

// Demo accounts (no server). Real passwords must not be used.
const Auth={
  users(){const u=readJSON(KEYS.users,[]);return Array.isArray(u)?u:[];},
  current(){const email=readJSON(KEYS.session,null);return email?(this.users().find(u=>u.email===email)||null):null;},
  signUp(name,email,password){
    email=email.trim().toLowerCase();
    const users=this.users();
    if(users.some(u=>u.email===email)){return{ok:false,error:"An account with this email already exists. Please log in."};}
    users.push({name:name.trim(),email,password,joined:new Date().toISOString()});
    const guest=readJSON("kb:data:guest",null);           // keep what the visitor saved before signing up
    if(guest){writeJSON("kb:data:"+email,guest);}
    if(!writeJSON(KEYS.users,users)){return{ok:false,error:"Your browser could not save the account."};}
    writeJSON(KEYS.session,email);return{ok:true};
  },
  logIn(email,password){
    email=email.trim().toLowerCase();
    const user=this.users().find(u=>u.email===email&&u.password===password);
    if(!user){return{ok:false,error:"Wrong email or password. Please try again."};}
    writeJSON(KEYS.session,email);return{ok:true};
  },
  logOut(){try{localStorage.removeItem(KEYS.session);}catch(e){}}
};

// Saved items: one record per account (or "guest"): shortlist, visits, events, quiz.
const Data={
  key(){const u=Auth.current();return "kb:data:"+(u?u.email:"guest");},
  get(){const d=readJSON(this.key(),{})||{};return{shortlist:d.shortlist||[],visits:d.visits||[],events:d.events||[],quiz:d.quiz||null};},
  save(d){writeJSON(this.key(),d);if(typeof updateBadge==="function"){updateBadge();}},
  credits(ids){return ids.reduce((sum,id)=>{const p=programs.find(x=>x.id===id);return sum+(p?p.credits:0);},0);},
  count(d){d=d||this.get();return d.shortlist.length+d.visits.length+d.events.length;}
};
