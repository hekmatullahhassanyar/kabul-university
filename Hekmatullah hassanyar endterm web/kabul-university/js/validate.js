// Reusable form validation: each field has a list of rules; errors show under the field.
const rules={
  required:v=>v.trim()!==""||"This field is required.",
  email:v=>/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)||"Enter an email like name@example.com.",
  phone:v=>/^\+?\d{2,3}[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/.test(v.trim())||"Use a phone like +93 70 123 4567.",
  minLen:n=>v=>v.trim().length>=n||`Write at least ${n} characters.`,
  name:v=>/^[\p{L}\s'-]{3,}$/u.test(v.trim())||"Use letters only, at least 3 characters.",
  score:v=>(!isNaN(v)&&+v>=40&&+v<=100)||"Enter a number from 40 to 100.",
  adult:v=>{const age=(Date.now()-new Date(v))/31557600000;return(age>=16&&age<=60)||"Applicants must be between 16 and 60 years old.";}
};
function setupForm(form,config,onSuccess){
  const fields=Object.keys(config);
  const check=n=>{
    const el=form.elements[n],box=document.getElementById("err-"+n);
    for(const r of config[n]){const res=r(el.value);if(res!==true){box.textContent=res;el.classList.add("is-invalid");el.classList.remove("is-valid");el.setAttribute("aria-invalid","true");return false;}}
    box.textContent="";el.classList.remove("is-invalid");el.classList.add("is-valid");el.removeAttribute("aria-invalid");return true;
  };
  fields.forEach(n=>{ // live correction: errors disappear as soon as the field is fixed
    form.elements[n].addEventListener("input",()=>{if(form.elements[n].classList.contains("is-invalid"))check(n);});
    form.elements[n].addEventListener("blur",()=>{if(form.elements[n].value!=="")check(n);});
  });
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const bad=fields.filter(n=>!check(n));
    if(bad.length){form.elements[bad[0]].focus();return;}
    form.reset();fields.forEach(n=>form.elements[n].classList.remove("is-valid"));
    onSuccess();
  });
}
