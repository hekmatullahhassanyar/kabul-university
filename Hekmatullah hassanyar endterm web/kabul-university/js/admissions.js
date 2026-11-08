const faqs=[
 ["Who can apply?","Anyone who has finished school and is between 16 and 60 years old can send the interest form. Bachelor programs need a school certificate. Master programs also need a bachelor degree."],
 ["Which documents do I need?","Prepare your school certificate, a copy of your ID, and recent photos. Master applicants also bring their bachelor diploma. Scan them clearly so they are easy to read."],
 ["Can I choose more than one program?","In the form you pick the program you want most. Use the shortlist on the Programs page to compare other programs and their credits before you decide."],
 ["Is there an entrance exam?","Yes, most programs ask applicants to take an entrance exam. Try the practice exam on the Programs page to see the style of questions. It is practice only and does not count."],
 ["Can I visit the campus first?","Yes. Book a campus visit on this page. Choose a tour time, and cancel if your plans change. Seats are limited, so book early."],
 ["When will I hear back?","The admissions office writes to the email address you give in the form. Use an email you check often, and look in your spam folder too."]
];
const faqList=document.getElementById("faqList");
faqs.forEach((f,i)=>{const d=document.createElement("div");d.className="faq-item";
 d.innerHTML=`<h3 class="h6 m-0"><button class="faq-q" type="button" aria-expanded="false" aria-controls="a${i}">${f[0]}</button></h3><div class="faq-a" id="a${i}"><p class="mb-0">${f[1]}</p></div>`;faqList.appendChild(d);});
const sel=document.getElementById("program");
programs.forEach(p=>{const o=document.createElement("option");o.value=p.name;o.textContent=`${p.name} (${p.level})`;sel.appendChild(o);});
setupForm(document.getElementById("apply"),{
 fullName:[rules.required,rules.name],email:[rules.required,rules.email],phone:[rules.required,rules.phone],
 birth:[rules.required,rules.adult],score:[rules.required,rules.score],program:[rules.required],why:[rules.required,rules.minLen(30)]
},()=>{ $("#ok").stop(true,true).slideDown(300).focus(); setTimeout(()=>$("#ok").slideUp(300),8000); });

// open the first answer so visitors see an example right away
$(".faq-q").first().attr("aria-expanded","true").closest(".faq-item").find(".faq-a").show();
