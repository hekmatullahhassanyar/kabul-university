// Practice entrance exam: one question at a time, score calculated at the end
let qi=0,score=0,locked=false;const wrong=[];
const $box=$("#quizBox");
function showQ(){
  const q=quizQuestions[qi];locked=false;
  $("#qProg").text(`Question ${qi+1} of ${quizQuestions.length}`);
  $("#qBar").css("width",(qi/quizQuestions.length*100)+"%");
  $("#qText").text(q.q);$("#qNext").prop("disabled",true).text(qi===quizQuestions.length-1?"See my score":"Next question");
  const ul=$("#qOpts").empty();
  q.options.forEach((o,i)=>$("<button>",{type:"button",class:"opt","data-i":i,text:o}).appendTo(ul));
  $("#qFeed").text("");
}
function finish(){
  const pct=Math.round(score/quizQuestions.length*100);
  const msg=pct>=75?"Great result. You are well prepared.":pct>=50?"Good start. Review the topics below and try again.":"Keep practicing. Try again after some revision.";
  $("#qBar").css("width","100%");
  $("#qRun").hide();
  $("#qScore").text(`${score} / ${quizQuestions.length}`);$("#qPct").text(pct+"%");$("#qMsg").text(msg);
  $("#qWrong").text(wrong.length?"Review: "+[...new Set(wrong)].join(", "):"You answered everything correctly.");
  $("#qDone").stop(true,true).fadeIn(350);
}
$("#qOpts").on("click",".opt",function(){
  if(locked)return;locked=true;
  const q=quizQuestions[qi],i=+$(this).data("i");
  $("#qOpts .opt").prop("disabled",true).eq(q.answer).addClass("right");
  if(i===q.answer){score++;$("#qFeed").text("Correct.");}
  else{$(this).addClass("wrong");wrong.push(q.topic);$("#qFeed").text("Not quite. The correct answer is marked in green.");}
  $("#qNext").prop("disabled",false).focus();
});
$("#qNext").on("click",function(){
  if(qi===quizQuestions.length-1){finish();return;}
  qi++;$("#qRun").stop(true,true).fadeOut(120,function(){showQ();$(this).fadeIn(200);});
});
$("#qAgain").on("click",function(){qi=0;score=0;wrong.length=0;$("#qDone").hide();$("#qRun").show();showQ();});
showQ();
