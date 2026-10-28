// Optional same-origin backend. Standalone HTML keeps all local workflows.
let backendStatus={available:false,ai:false},requestSequence=0;
const localInsights=insights;
insights=function(){return intro('EVIDENCE ASSISTANT','Ask the data a better question.','Explore approved evidence, with optional server-side AI explanations.')+`<div class="panel"><span class="tag" id="connection">${backendStatus.available?'Backend connected':'Standalone mode'} · ${backendStatus.ai?'AI configured':'Evidence lookup available'}</span><div class="chips">${['What are the soil protection barriers?','Where are extension gaps?','What about tomato losses?','How many use irrigation?','What are the data limitations?'].map(t=>`<button onclick="askEvidence(this.textContent)">${t}</button>`).join('')}</div><div class="filters"><label style="display:block"><input type="checkbox" id="useAI" ${backendStatus.ai?'':'disabled'}> Use AI to explain the evidence</label><small>When selected, your question and aggregate evidence are sent to OpenAI. Do not enter personal information.</small></div><div class="answer" id="answer">Ask about soil protection, extension, finance, irrigation, crop losses, or a district. Lookup works without an API key.</div><form class="ask" onsubmit="event.preventDefault();askEvidence(document.querySelector('#question').value)"><input id="question" maxlength="1000" aria-label="Question about agricultural evidence" placeholder="Ask about the historical evidence…" required><button class="primary" id="askButton">Explore evidence →</button></form><details style="margin-top:20px"><summary>How to enable live AI</summary><p>Start the included Python backend. Set OPENAI_API_KEY and OPENAI_MODEL as server environment variables, then restart it. Keys stay on the server. An unavailable service is reported explicitly.</p></details></div>`};
async function askEvidence(question){
 const seq=++requestSequence;if(!question.trim())return;
 if(!backendStatus.available){answer(question);return}
 const output=$('#answer'),button=$('#askButton'),ai=$('#useAI').checked;
 output.textContent=ai?'Requesting an AI explanation of the approved evidence…':'Looking up approved evidence…';button.disabled=true;
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),42000);
 try{
  const response=await fetch('/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,mode:ai?'ai':'lookup'}),signal:controller.signal});
  const result=await response.json();if(!response.ok)throw Error(result.error||'Evidence service unavailable');
  if(seq!==requestSequence||page!=='insights')return;
  output.textContent=(result.mode==='ai'?'AI-GENERATED EXPLANATION\n\n':'EVIDENCE LOOKUP\n\n')+result.answer+'\n\nSources: '+(result.sources.join('; ')||'No matching evidence')+'\nPeriod: '+result.metadata.period+' · '+result.metadata.weighting+(result.approved_evidence?'\n\nAPPROVED EVIDENCE TO VERIFY AGAINST\n'+result.approved_evidence:'');
 }catch(error){if(seq===requestSequence&&page==='insights')output.textContent='Request failed: '+(error.name==='AbortError'?'The service timed out.':error.message)+'\nUse local evidence lookup or retry. No AI answer has been substituted.'}
 finally{clearTimeout(timer);if(seq===requestSequence&&page==='insights')button.disabled=false}
}
const baseMethod=method;
method=function(){return baseMethod().replace('This release uses deterministic evidence lookup, not a live language model.','Standalone mode uses deterministic lookup. With the Python backend and server environment variables configured, the assistant can request OpenAI explanations of approved evidence. Live answers are labelled and shown alongside their evidence.').replace('A future OpenAI integration should run server-side and explain approved aggregates.','The OpenAI integration runs server-side and receives only a question and selected aggregate evidence. Model output still needs verification.')};
if(['http:','https:'].includes(location.protocol)){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),3000);
 fetch('/api/health',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(r=>{backendStatus={available:r.status==='ok',ai:!!r.ai_configured};if(page==='insights')render()}).catch(()=>{}).finally(()=>clearTimeout(timer));
}
render();
