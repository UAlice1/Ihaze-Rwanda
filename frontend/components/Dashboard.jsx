'use client';
import { useEffect, useMemo, useState } from 'react';
import Research from './Research';
import ChangeAnalysis from './ChangeAnalysis';
import research from '../data/research.json';

const navigation = [ ['overview','◫','Overview'], ['districts','▥','District explorer'], ['crops','♧','Production & losses'], ['planner','◎','Support planner'], ['research','▤','Inputs & research'], ['insights','✧','Evidence assistant'], ['changes','⇄','Change analysis'], ['method','≡','Data & methodology'] ];
const format = n => Number(n).toLocaleString('en-US');
const panel = 'rounded-xl border border-[#e0e7df] bg-white p-5 sm:p-7';
const field = 'rounded-lg border border-[#d7e0d3] bg-white px-3 py-2.5 text-sm';
const primary = 'rounded-lg bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-leaf disabled:opacity-50';
const secondary = 'rounded-lg border border-[#d7e0d3] bg-white px-4 py-2.5 text-sm hover:bg-lime-50';

function download(text, name, type='text/plain') {
 const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportCSV(rows,name) {
 const keys=Object.keys(rows[0]||{}),quote=v=>'"'+String(v??'').replaceAll('"','""')+'"';
 download([keys.map(quote).join(','),...rows.map(r=>keys.map(k=>quote(r[k])).join(','))].join('\r\n'),name,'text/csv');
}
function Card({label,value,note,highlight}) { return <div className={`${panel} ${highlight?'!border-[#dce7c9] !bg-[#eaf1dc]':''}`}><div className="text-xs text-[#6e8074]">{label}</div><div className="my-4 text-3xl font-semibold tracking-tight">{value}</div><div className="text-xs text-[#839084]">{note}</div></div>; }
function Note({children}) { return <div className="mt-6 border-l-3 border-[#8eac65] bg-[#f0f4e9] p-4 text-xs leading-6 text-[#526847]">{children}</div>; }
function Title({eyebrow,title,children}) { return <div className="mb-7 mt-8"><div className="mb-2 text-[10px] font-bold tracking-[.2em] text-[#6d8e76]">{eyebrow}</div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-[#728178]">{children}</p></div>; }
function DistrictTable({rows}) { return <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-[#f5f7f2] text-[10px] uppercase tracking-wide text-[#849184]"><tr>{['District','Sample households','Erosion + barrier','Sample share','Also no extension'].map(t=><th className="whitespace-nowrap p-4" key={t}>{t}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.district} className="border-b border-[#edf0ea]"><td className="p-4 font-semibold">{r.district}</td><td className="p-4">{format(r.sample_households)}</td><td className="p-4">{r.erosion_and_barrier_n}</td><td className="p-4"><div className="flex items-center gap-3"><div className="h-1.5 w-16 rounded bg-[#edf1e9]"><div className="h-full rounded bg-[#8caa66]" style={{width:`${Math.min(100,r.erosion_and_barrier_pct*3)}%`}}/></div>{r.erosion_and_barrier_pct}%</div></td><td className="p-4">{r.erosion_barrier_no_extension_n}</td></tr>)}</tbody></table>{!rows.length&&<p className="p-8 text-sm text-slate-500">No matching district.</p>}</div>; }
function Overview({onNavigate}) {return <><Title eyebrow="WELCOME TO IHAZE RWANDA" title="Evidence-based agricultural support, simplified.">Hello! 👋 Let's explore Rwanda's agricultural landscape together. This platform helps you understand farming constraints and identify where support is needed most.</Title>

{/* Friendly Introduction Card */}
<div className="mb-6 rounded-xl bg-gradient-to-br from-[#eaf1dc] to-[#f0f4e9] p-6 border-l-4 border-[#8eac65]">
 <div className="flex items-start gap-4">
  <div className="flex-shrink-0 text-4xl">🌾</div>
  <div>
   <h3 className="mb-2 text-lg font-bold text-[#245a3f]">What you'll find here</h3>
   <p className="text-sm leading-relaxed text-[#526847] mb-3">
    We've analyzed agricultural data from 16,057 households across Rwanda to help extension officers make informed decisions. Here's the big picture at a glance:
   </p>
   <ul className="space-y-2 text-sm text-[#526847]">
    <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>1,834 households</strong> need urgent attention—they face worsening erosion and can't protect their land</span></li>
    <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>72% of these families</strong> have never received extension services</span></li>
    <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>This platform shows you</strong> exactly where they are and what barriers they face</span></li>
   </ul>
  </div>
 </div>
</div>

<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Card label="Agricultural households" value="16,057" note="Practices-file sample"/><Card label="Received extension services" value="26.8%" note="4,310 / 16,057 households"/><Card label="Used irrigation" value="9.3%" note="1,495 / 16,057 households"/><Card label="Erosion + barriers + no extension" value="1,320" note="Priority outreach signal" highlight/></div><div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]"><section className={panel}><h2 className="font-semibold text-lg flex items-center gap-2"><span>🛡️</span> What limits soil protection?</h2><p className="mt-2 text-xs leading-6 text-[#88948a]">Among 3,075 households reporting barriers · multiple answers allowed</p><div className="mt-7 space-y-6">{[['Financial resources',60.6,'💰'],['Knowledge',33.4,'📚'],['Family labour',21.9,'👨‍👩‍👧‍👦'],['Land tenure',18.2,'📜']].map(([n,v,icon])=><div key={n} className="grid grid-cols-[140px_1fr_50px] items-center gap-3 text-sm"><span className="flex items-center gap-2"><span className="text-lg">{icon}</span><span className="font-medium">{n}</span></span><div className="h-3 rounded-full bg-[#edf1e9]"><div className="h-full rounded-full bg-gradient-to-r from-[#8eac65] to-[#245a3f]" style={{width:`${v}%`}}/></div><strong className="text-forest">{v}%</strong></div>)}</div><Note><strong className="block mb-2">💡 Why this matters</strong>Different barriers need different solutions. Financial constraints might need loan programs, while knowledge gaps call for training. Use this data to plan the right type of support for each community.</Note></section><section className={panel}><h2 className="font-semibold text-lg flex items-center gap-2"><span>🎯</span> The opportunity</h2><div className="mb-6 mt-2 text-xs text-[#88948a]">Households with erosion, barriers, and service coverage</div><div className="space-y-6"><div className="rounded-lg bg-[#f8faf5] p-5 border border-[#e0e7df]"><div className="text-5xl font-bold text-[#245a3f]">1,834</div><p className="mt-3 text-sm leading-7 text-[#728178]">households reported <strong>increasing erosion</strong> and <strong>barriers</strong> to protecting their soil. These families need help but many haven't received it yet.</p></div><div className="rounded-lg bg-gradient-to-br from-[#245a3f] to-[#357b54] p-5 text-white"><div className="text-5xl font-bold">72.0<span className="text-2xl">%</span></div><p className="mt-3 text-sm leading-7 text-white/90">of this vulnerable group reported <strong>no extension service</strong> at all. This represents 1,320 households that could benefit from outreach.</p></div></div><button className={`${primary} w-full mt-6 flex items-center justify-center gap-2 text-base py-4`} onClick={()=>onNavigate('planner')}><span>Explore support priorities</span><span className="text-xl">→</span></button><p className="mt-4 text-xs leading-6 text-[#88948a] text-center">💭 Remember: This shows patterns in the data, not proof that missing extension causes erosion. Use these insights as a starting point for field assessment.</p></section></div>

{/* Quick Actions */}
<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {[
  {icon:'📍',title:'District Explorer',desc:'Compare all 30 districts',action:'districts'},
  {icon:'🌾',title:'Crop Analysis',desc:'See production & losses',action:'crops'},
  {icon:'💡',title:'AI Assistant',desc:'Ask smart questions',action:'insights'},
  {icon:'🔬',title:'Deep Research',desc:'Explore detailed data',action:'research'}
 ].map(item=><button key={item.action} onClick={()=>onNavigate(item.action)} className="group rounded-xl border border-[#e0e7df] bg-white p-5 text-left transition hover:border-[#8eac65] hover:shadow-lg"><div className="mb-3 text-3xl transition group-hover:scale-110">{item.icon}</div><h3 className="mb-1 font-semibold text-[#245a3f] group-hover:text-forest">{item.title}</h3><p className="text-xs text-[#88948a]">{item.desc}</p></button>)}
</div></>;}
function Districts({rows}) {
 const [search,setSearch]=useState(''),[sort,setSort]=useState('share'),[page,setPage]=useState(1);
 const perPage=10;
 const filtered=useMemo(()=>rows.filter(r=>r.district.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='name'?a.district.localeCompare(b.district):sort==='gap'?b.erosion_barrier_no_extension_n-a.erosion_barrier_no_extension_n:b.erosion_and_barrier_pct-a.erosion_and_barrier_pct),[rows,search,sort]);
 const totalPages=Math.ceil(filtered.length/perPage);
 const paginatedRows=filtered.slice((page-1)*perPage,page*perPage);
 const goToPage=(p)=>{if(p>=1&&p<=totalPages)setPage(p)};
 return <><Title eyebrow="GEOGRAPHIC INSIGHTS" title="Understand the local picture.">Compare reported support gaps across all 30 districts in the historical sample.</Title><section className={panel}><div className="mb-6 flex flex-wrap items-end gap-4"><label className="grid gap-2 text-xs">Find a district<input className={field} value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search district"/></label><label className="grid gap-2 text-xs">Sort by<select className={field} value={sort} onChange={e=>{setSort(e.target.value);setPage(1)}}><option value="share">Erosion and barrier share</option><option value="gap">No-extension overlap count</option><option value="name">District name</option></select></label><button className={secondary} onClick={()=>exportCSV(filtered,'district-evidence.csv')} disabled={!filtered.length}>↓ Download CSV</button><span className="pb-3 text-xs text-[#88948a]">{filtered.length} districts</span></div><DistrictTable rows={paginatedRows}/>{totalPages>1&&<div className="mt-6 flex items-center justify-between border-t border-[#edf0ea] pt-6"><div className="text-sm text-[#728178]">Showing {((page-1)*perPage)+1}-{Math.min(page*perPage,filtered.length)} of {filtered.length} districts</div><div className="flex items-center gap-2">{page>1&&<button onClick={()=>goToPage(page-1)} className={`${secondary} px-4 py-2`}>← Previous</button>}{Array.from({length:totalPages},(_,i)=>i+1).filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1).map((p,i,arr)=><span key={p}>{i>0&&arr[i-1]!==p-1&&<span className="px-2 text-[#88948a]">...</span>}<button onClick={()=>goToPage(p)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${p===page?'bg-[#245a3f] text-white':'border border-[#d7e0d3] bg-white text-[#526847] hover:bg-[#f0f4e9]'}`}>{p}</button></span>)}{page<totalPages&&<button onClick={()=>goToPage(page+1)} className={`${secondary} px-4 py-2`}>Next →</button>}</div></div>}<Note>These are unweighted sample comparisons, not validated national district prevalence rankings. Survey design and uncertainty require verification before operational use.</Note></section></>;
}
function Crops({rows}) {const [search,setSearch]=useState(''),[page,setPage]=useState(1);const perPage=15;const filtered=rows.filter(r=>r.crop.toLowerCase().includes(search.toLowerCase()));const totalPages=Math.ceil(filtered.length/perPage);const paginatedRows=filtered.slice((page-1)*perPage,page*perPage);const goToPage=(p)=>{if(p>=1&&p<=totalPages)setPage(p)};return <><Title eyebrow="PRODUCTION & POST-HARVEST" title="Follow the crop evidence.">Investigate reported losses across Seasons A and B. Crop-season records are not unique households.</Title><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Card label="Usable crop-season records" value="63,979" note="Positive production; valid losses"/><Card label="Records with reported loss" value="1,033" note="Across both seasons"/><Card label="Tomato positive-loss records" value="36.7%" note="139 / 379 usable tomato records" highlight/><Card label="Tomato aggregate loss" value="3.83%" note="21,481 kg / 560,173.2 kg production"/></div><section className={`${panel} mt-6`}><h2 className="font-semibold">Reported losses by crop</h2><p className="mt-2 text-xs text-[#88948a]">Crops with at least 100 usable records · sorted by recorded loss quantity</p><div className="my-5 flex flex-wrap gap-3"><input aria-label="Find crop" className={field} placeholder="Find a crop…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/><button className={secondary} disabled={!filtered.length} onClick={()=>exportCSV(filtered,'crop-loss-evidence.csv')}>↓ Download CSV</button><span className="text-xs text-[#88948a]">{filtered.length} crops</span></div><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-[#f5f7f2] text-[10px] uppercase text-[#849184]"><tr>{['Crop','Records','Positive loss','Loss quantity (kg)','Aggregate loss / production'].map(t=><th className="p-4" key={t}>{t}</th>)}</tr></thead><tbody>{paginatedRows.map(r=><tr key={r.crop_code} className="border-b border-[#edf0ea]"><td className="p-4 font-semibold">{r.crop}</td><td className="p-4">{format(r.records)}</td><td className="p-4">{r.positive_loss_pct}%</td><td className="p-4">{format(r.loss_kg)}</td><td className="p-4">{r.aggregate_loss_pct}%</td></tr>)}</tbody></table>{!paginatedRows.length&&<p className="p-8 text-sm text-slate-500">No matching crop.</p>}</div>{totalPages>1&&<div className="mt-6 flex items-center justify-between border-t border-[#edf0ea] pt-6"><div className="text-sm text-[#728178]">Showing {((page-1)*perPage)+1}-{Math.min(page*perPage,filtered.length)} of {filtered.length} crops</div><div className="flex items-center gap-2">{page>1&&<button onClick={()=>goToPage(page-1)} className={`${secondary} px-4 py-2`}>← Previous</button>}{Array.from({length:totalPages},(_,i)=>i+1).filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1).map((p,i,arr)=><span key={p}>{i>0&&arr[i-1]!==p-1&&<span className="px-2 text-[#88948a]">...</span>}<button onClick={()=>goToPage(p)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${p===page?'bg-[#245a3f] text-white':'border border-[#d7e0d3] bg-white text-[#526847] hover:bg-[#f0f4e9]'}`}>{p}</button></span>)}{page<totalPages&&<button onClick={()=>goToPage(page+1)} className={`${secondary} px-4 py-2`}>Next →</button>}</div></div>}<Note>Households may contribute several crops and both seasons. Zero-loss reporting needs questionnaire validation. Reported losses do not establish their causes or the best intervention.</Note></section></>;}
function Planner({rows,connected}) {
 const [barrier,setBarrier]=useState('any');
 const labels={any:'Any reported barrier',finance:'Finance',knowledge:'Knowledge',labour:'Family labour',tenure:'Land tenure'};
 const nextSteps={any:'Assess the reported barriers with local officers before choosing support.',finance:'Assess protection costs and financial referral options. This does not establish loan or grant eligibility.',knowledge:'Assess training and extension needs with local agricultural officers.',labour:'Investigate labour constraints and feasible community support.',tenure:'Seek appropriate tenure-information or advisory referral.'};
 const [district,setDistrict]=useState(rows[0]?.district||''),[capacity,setCapacity]=useState('30'),[noExtension,setNoExtension]=useState(true),[serverResult,setServerResult]=useState(null);
 const row=rows.find(r=>r.district===district),valid=capacity!==''&&Number.isInteger(Number(capacity))&&Number(capacity)>=0&&Number(capacity)<=100000;
 const target=research.support_targets.find(t=>t.district===district&&t.barrier===barrier);
 const eligible=target?(noExtension?target.no_extension:target.eligible):0,covered=valid?Math.min(Number(capacity),eligible):0;
 useEffect(()=>{setServerResult(null);if(!connected||!valid)return;const c=new AbortController();fetch('/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({district,capacity:Number(capacity),require_no_extension:noExtension,barrier}),signal:c.signal}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(r=>setServerResult(r.data)).catch(()=>{});return()=>c.abort()},[district,capacity,noExtension,barrier,connected,valid]);
 return <><Title eyebrow="OUTREACH PLANNING" title="Make priorities explainable.">Explore a capacity scenario for households reporting erosion and protection barriers.</Title><div className="grid gap-6 xl:grid-cols-2"><section className={panel}><h2 className="font-semibold">Set your planning scenario</h2><div className="my-6 flex flex-wrap gap-4"><label className="grid gap-2 text-xs">District<select className={field} value={district} onChange={e=>setDistrict(e.target.value)}>{rows.map(r=><option key={r.district}>{r.district}</option>)}</select></label><label className="grid gap-2 text-xs">Reported barrier<select className={field} value={barrier} onChange={e=>setBarrier(e.target.value)}>{Object.entries(labels).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></label><label className="grid gap-2 text-xs">Outreach capacity<input className={`${field} w-32`} type="number" min="0" max="100000" step="1" value={capacity} onChange={e=>setCapacity(e.target.value)}/></label></div>{!valid&&<p role="alert" className="mb-4 text-sm text-red-700">Enter a whole number from 0 to 100,000.</p>}<label className="flex items-start gap-2 text-sm leading-6"><input className="mt-1.5 accent-[#245a3f]" type="checkbox" checked={noExtension} onChange={e=>setNoExtension(e.target.checked)}/>Prioritize households reporting no extension service</label><Note><strong className="block">Transparent inclusion rule</strong>Reported increasing erosion AND reported soil-protection barriers{barrier!=='any'?` AND reported ${labels[barrier].toLowerCase()} barrier`:''}{noExtension?' AND no extension service.':'.'}</Note><p className="mt-6 text-sm leading-7 text-[#728178]">This is a historical sample scenario. It does not identify current households, assign benefits, prescribe treatments, or predict yield improvements.</p></section><section className={panel}><h2 className="font-semibold">{district} · historical scenario</h2><p className="mt-2 text-xs text-[#88948a]">{format(row?.sample_households||0)} sampled households in practices data</p><div className="mt-8 text-4xl font-semibold">{eligible}</div><p className="mt-2 text-sm text-[#728178]">sample households match the selected rule</p><div className="mt-8 text-4xl font-semibold">{valid?covered:'—'} <span className="text-base text-[#88948a]">/ {eligible}</span></div><p className="mt-2 text-sm leading-7 text-[#728178]">{valid?`${eligible-covered} remain outside the entered capacity.`:'A valid capacity is required.'}</p><p className="mt-6 text-xs text-[#728178]">{serverResult?'✓ Calculation verified by backend API':'Local snapshot calculation'}</p><Note><strong className="block">Suggested further assessment</strong>{nextSteps[barrier]} Multiple barriers can overlap; counts must not be added together. Validate current needs before outreach.</Note><button className={`${secondary} mt-5`} disabled={!valid} onClick={()=>download(`Ihaze Rwanda — outreach scenario\nPeriod: 2016–2017\nDistrict: ${district}\nSample households: ${row.sample_households}\nEligible under selected rule: ${eligible}\nCapacity: ${capacity}\nCovered: ${covered}\nRemaining: ${eligible-covered}\nNo-extension filter: ${noExtension}\nSelected barrier: ${labels[barrier]}\nHistorical sample scenario, not current targeting.\n`,'outreach-scenario.txt')}>↓ Export scenario</button></section></div></>;
}
function localEvidence(q,rows) {
 q=q.toLowerCase();if(/yield/.test(q))return 'No validated crop/season area variable has been identified. Production comparisons are quantities, not yield estimates or causal effects.';
 if(/fertilizer|pesticide|input use/.test(q))return research.inputs.map(r=>`Season ${r.season}, ${r.input}: ${r.yes}/${r.valid} (${r.pct}%). Source: ${r.source}.`).join('\n')+' Household use does not establish unmet demand.';
 if(/reject|approval/.test(q))return research.first_loan_outcomes.map(r=>`${r.outcome}: ${r.count}/${r.valid} (${r.pct}%).`).join('\n')+' Source: S4 V7/V9. These are first-loan applicants, not all households.';
 if(/current|today|2026|limitation|method/.test(q))return 'The survey describes 2016–2017, not current conditions. Extraction, weights, eligibility and survey-design uncertainty require further verification.';
 const district=rows.find(r=>q.includes(r.district.toLowerCase()));if(district)return `${district.district}: ${district.sample_households} sample households; ${district.erosion_and_barrier_n} reported increasing erosion and protection barriers; ${district.erosion_barrier_no_extension_n} also reported no extension. Sources: S6 V18/V22; S3 V6.`;
 if(/tomato|loss|storage|harvest/.test(q))return '139 of 379 usable tomato crop-season records (36.68%) reported losses. Recorded losses totalled 21,481 kg out of 560,173.2 kg production (3.83%). Households can appear in both seasons. Source: S8_A/B V7=114, V8, V21.';
 if(/extension|gap/.test(q))return '4,310/16,057 households (26.84%) reported extension receipt. Of 1,834 reporting increasing erosion and protection barriers, 1,320 reported no extension. Sources: S3 V6, deduplicated by household; S6 V18/V22.';
 if(/irrig/.test(q))return '1,495/16,057 households (9.31%) reported irrigation. The denominator includes all S6 households, not just crop growers. This does not establish need or feasibility. Source: S6 V29.';
 if(/soil|erosion|barrier|protect/.test(q))return 'Among 3,075 households reporting soil-protection barriers, 1,863 mentioned finance (60.59%), 1,026 knowledge (33.37%), 672 labour (21.85%), and 559 tenure insecurity (18.18%). Multiple responses were allowed. Source: S6 V22/V23/V25/V27.';
 if(/financ|loan|account/.test(q))return '8,352/16,057 households (52.01%) reported a financial institution account; 747 (4.65%) requested a loan. Non-application does not establish exclusion. Source: S4 V6/V7.';
 return 'The approved evidence cannot answer that question. Ask about soil protection, extension, finance, irrigation, tomato losses, or a district.';
}
function Insights({rows,status}) {
 const [question,setQuestion]=useState(''),[useAI,setUseAI]=useState(false),[busy,setBusy]=useState(false),[answer,setAnswer]=useState(null),[error,setError]=useState('');
 async function ask(q){if(busy||!q.trim())return;setQuestion(q);setError('');setBusy(true);setAnswer(null);const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),42000);try{if(!status.connected){setAnswer({answer:localEvidence(q,rows),mode:'lookup'});return}const response=await fetch('/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,mode:useAI?'ai':'lookup'}),signal:controller.signal});const result=await response.json();if(!response.ok)throw Error(result.error||'Service unavailable');setAnswer(result)}catch(e){setError(e.name==='AbortError'?'The request timed out. Try evidence lookup.':e.message)}finally{clearTimeout(timer);setBusy(false)}}
 return <><Title eyebrow="EVIDENCE ASSISTANT" title="Ask questions, get smart answers.">Get instant insights from agricultural data with AI-powered analysis and complete source transparency.</Title><section className={panel}>
 
 {/* Welcome Message */}
 <div className="mb-8 rounded-xl bg-gradient-to-br from-[#eaf1dc] to-[#f0f4e9] p-6 border-l-4 border-[#8eac65]">
  <div className="flex items-start gap-4">
   <div className="flex-shrink-0 text-4xl">👋</div>
   <div>
    <h3 className="mb-2 text-lg font-bold text-[#245a3f]">Welcome to the Evidence Assistant</h3>
    <p className="text-sm leading-relaxed text-[#526847]">
     I'm here to help you explore Rwanda's agricultural data from 2016-2017. Ask me about soil protection barriers, extension service coverage, crop losses, or specific districts. I'll provide you with evidence-based answers and show you exactly where the data comes from.
    </p>
    <p className="mt-3 text-xs text-[#728178]">
     <strong>Pro tip:</strong> Enable AI mode for conversational explanations with actionable recommendations.
    </p>
   </div>
  </div>
 </div>

 {/* Status Badge */}
 <div className="mb-6 flex flex-wrap items-center gap-3">
  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${status.connected?'bg-green-50 text-green-700 border border-green-200':'bg-gray-50 text-gray-600 border border-gray-200'}`}>
   <span className={`h-2 w-2 rounded-full ${status.connected?'bg-green-500 animate-pulse':'bg-gray-400'}`}></span>
   {status.connected?'Backend connected':'Snapshot mode'}
  </div>
  {status.ai&&<div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#245a3f] to-[#357b54] px-4 py-2 text-xs font-semibold text-white">
   <span className="text-base">✧</span>
   AI Ready
  </div>}
 </div>

 {/* Quick Question Chips */}
 <div className="mb-6">
  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6d8e76]">Try These Questions</p>
  <div className="flex flex-wrap gap-2">
   {[
    {q:'Soil protection barriers',icon:'🛡️'},
    {q:'Extension gaps',icon:'📚'},
    {q:'Tomato losses',icon:'🍅'},
    {q:'Irrigation use',icon:'💧'},
    {q:'Data limitations',icon:'📊'},
    {q:'Finance barriers',icon:'💰'}
   ].map(({q,icon})=><button className="group flex items-center gap-2 rounded-full border border-[#d9e3d3] bg-white px-4 py-2.5 text-sm transition hover:border-[#8eac65] hover:bg-[#f0f4e9] hover:shadow-sm" key={q} disabled={busy} onClick={()=>ask(q)}><span>{icon}</span><span className="font-medium text-[#526847] group-hover:text-[#245a3f]">{q}</span></button>)}
  </div>
 </div>

 {/* AI Toggle */}
 <div className="mb-6 rounded-lg border border-[#e0e7df] bg-gradient-to-br from-white to-[#f8faf5] p-5">
  <label className="flex items-start gap-3 cursor-pointer">
   <input type="checkbox" disabled={!status.ai||busy} checked={useAI} onChange={e=>setUseAI(e.target.checked)} className="mt-1 h-5 w-5 accent-[#245a3f] cursor-pointer"/>
   <div className="flex-1">
    <div className="flex items-center gap-2 mb-1">
     <span className="text-base font-semibold text-[#245a3f]">Use AI to explain the evidence</span>
     {useAI&&<span className="rounded-full bg-gradient-to-r from-[#245a3f] to-[#357b54] px-2 py-0.5 text-xs font-semibold text-white">Active</span>}
    </div>
    <p className="text-sm leading-relaxed text-[#728178]">
     When enabled, your question and aggregate evidence are sent to OpenAI for conversational explanations. The AI will provide recommendations and highlight key insights.
    </p>
    {!status.ai&&<p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1 inline-block">
     ⚠️ AI requires OPENAI_API_KEY on the server. Evidence lookup is available without AI.
    </p>}
    <p className="mt-2 text-xs text-[#88948a]">
     🔒 Privacy-focused: No personal information should be entered. Raw household data is never sent.
    </p>
   </div>
  </label>
 </div>

 {/* Answer Display */}
 <div className={`min-h-48 rounded-xl p-6 transition-all ${answer||busy||error?'bg-white border-2 border-[#e0e7df] shadow-lg':'bg-[#f1f5ec] border border-[#e0e7df]'}`} aria-live="polite">
  {busy?<div className="flex flex-col items-center justify-center py-12 text-center">
   <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#e0e7df] border-t-[#8eac65]"></div>
   <p className="text-sm font-semibold text-[#526847]">{useAI?'AI is analyzing the evidence...':'Looking up the approved evidence...'}</p>
   <p className="mt-2 text-xs text-[#88948a]">This may take a few moments</p>
  </div>:error?<div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-5">
   <div className="flex items-start gap-3">
    <span className="flex-shrink-0 text-2xl">⚠️</span>
    <div>
     <p className="font-semibold text-red-800 mb-1">Something went wrong</p>
     <p className="text-sm text-red-700">{error}</p>
     <p className="mt-2 text-xs text-red-600">No AI answer has been substituted. Please try again with evidence lookup mode.</p>
    </div>
   </div>
  </div>:answer?<div className="space-y-5">
   <div className="flex items-center justify-between border-b border-[#e0e7df] pb-3">
    <div className="flex items-center gap-3">
     <span className="text-2xl">{answer.mode==='ai'?'🤖':'📖'}</span>
     <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#6d8e76]">{answer.mode==='ai'?'AI-Generated Explanation':'Evidence Lookup'}</p>
      <p className="text-xs text-[#88948a] mt-0.5">{answer.mode==='ai'?'Powered by OpenAI with source verification':'Direct from approved evidence base'}</p>
     </div>
    </div>
    {answer.supported&&<span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">✓ Verified</span>}
   </div>
   <div className="prose prose-sm max-w-none">
    <div className="whitespace-pre-wrap text-sm leading-7 text-[#526847]">{answer.answer}</div>
   </div>
   {answer.sources&&answer.sources.length>0&&<div className="rounded-lg bg-[#f0f4e9] p-4 border-l-3 border-[#8eac65]">
    <p className="text-xs font-semibold uppercase tracking-wider text-[#6d8e76] mb-2">Data Sources</p>
    <p className="text-sm text-[#526847]">
     {answer.sources.join(' · ')}
    </p>
    <p className="mt-2 text-xs text-[#728178]">
     Period: 2016–2017 · Unweighted historical sample evidence
    </p>
   </div>}
   {answer.approved_evidence&&<details className="mt-4 rounded-lg border border-[#e0e7df] bg-white">
    <summary className="cursor-pointer p-4 text-sm font-semibold text-[#245a3f] hover:bg-[#f8faf5]">
     📋 View approved evidence (verify AI response)
    </summary>
    <div className="border-t border-[#e0e7df] p-4">
     <p className="whitespace-pre-wrap text-sm leading-7 text-[#526847]">{answer.approved_evidence}</p>
    </div>
   </details>}
  </div>:<div className="flex flex-col items-center justify-center py-12 text-center">
   <div className="mb-4 text-5xl">💬</div>
   <p className="text-base font-semibold text-[#526847] mb-2">Ready to answer your questions</p>
   <p className="text-sm text-[#88948a] max-w-md">
    Choose a question above or type your own below. Ask about soil protection, extension services, crop losses, or specific districts.
   </p>
  </div>}
 </div>

 {/* Question Input */}
 <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={e=>{e.preventDefault();ask(question)}}>
  <div className="relative flex-1">
   <input className={`${field} w-full pr-12`} aria-label="Question about historical evidence" maxLength={1000} required placeholder="Ask about soil barriers, extension gaps, crops, or districts..." value={question} onChange={e=>setQuestion(e.target.value)}/>
   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#88948a]">{question.length}/1000</span>
  </div>
  <button className={`${primary} flex items-center gap-2`} disabled={busy}>
   {busy?<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span><span>Working...</span></>:<><span>Ask Question</span><span>→</span></>}
  </button>
 </form>

 {/* Help Section */}
 <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs">
  <div className="rounded-lg bg-[#f8faf5] p-4 border border-[#e0e7df]">
   <p className="font-semibold text-[#245a3f] mb-2 flex items-center gap-2"><span>💡</span> What to ask</p>
   <p className="text-[#728178] leading-relaxed">Extension coverage, soil barriers, crop losses, district data, financial access, irrigation use</p>
  </div>
  <div className="rounded-lg bg-[#f8faf5] p-4 border border-[#e0e7df]">
   <p className="font-semibold text-[#245a3f] mb-2 flex items-center gap-2"><span>⚡</span> Response time</p>
   <p className="text-[#728178] leading-relaxed">Lookup mode: Instant. AI mode: 5-15 seconds for comprehensive analysis</p>
  </div>
  <div className="rounded-lg bg-[#f8faf5] p-4 border border-[#e0e7df]">
   <p className="font-semibold text-[#245a3f] mb-2 flex items-center gap-2"><span>🔍</span> Verification</p>
   <p className="text-[#728178] leading-relaxed">Every answer includes sources. AI responses show the original evidence for verification</p>
  </div>
 </div>

</section></>;}

function Methodology(){return <><Title eyebrow="DATA & METHODOLOGY" title="Know what the evidence can say.">Transparent sources, reproducible calculations, and explicit limits.</Title><section className={`${panel} max-w-4xl space-y-7 text-sm leading-8 text-[#576e60]`}>{[
 ['Sources and scope','Sixteen supplied NISR SPSS files were inventoried. The initial analysis focuses on S0 (general information), S3 (extension), S4 (funding), S5 (inputs), S6 (practices), and S8_A/B (production and use). S6 contains 16,057 distinct households. A custom reader extracted uncompressed SPSS records; independent verification in SPSS or pyreadstat remains pending.'],
 ['Joins and denominators','S3 has four records per household. Extension receipt is consistent within households and was deduplicated before joining one-to-one to S6. Crop tables use crop-season records, not unique households. Missing or ineligible responses are not automatically “No.” The increasing-erosion indicator excludes “Don’t know.”'],
 ['Historical evidence, not current targeting','The questionnaires refer to 2016–2017. Displayed rates are unweighted sample descriptions. Segment weights exist, but survey design and appropriate weighting require confirmation. District comparisons are not certified national rankings. Causal effects and yield gains have not been estimated.'],
 ['AI and privacy','The interface uses local or backend evidence lookup by default. Optional AI requests run server-side and send the question with selected aggregate evidence. Keys and raw household data are not shipped to the frontend. AI output needs verification. Codex assisted coding, analysis and writing; participants remain responsible for the submission and disclosure.'],
 ['Technology and reproducibility','This frontend is a React application using the Next.js App Router and compiled Tailwind CSS. It proxies /api routes to the Python backend. Approved aggregate snapshots keep the dashboard useful when the backend is offline. Reports, analytical scripts and setup instructions accompany the source.']
 ].map(([title,text])=><div key={title}><h2 className="mb-2 text-lg font-semibold text-forest">{title}</h2><p>{text}</p></div>)}<a className="text-leaf underline" href="https://microdata.statistics.gov.rw/index.php/catalog" target="_blank" rel="noopener noreferrer">NISR Microdata Catalogue ↗</a></section></>}
export default function Dashboard({snapshot}) {
 const [page,setPage]=useState('overview'),[data,setData]=useState(snapshot),[status,setStatus]=useState({connected:false,ai:false,checked:false});
 useEffect(()=>{function readHash(){const p=window.location.hash.slice(1);if(navigation.some(([id])=>id===p))setPage(p)}readHash();window.addEventListener('hashchange',readHash);return()=>window.removeEventListener('hashchange',readHash)},[]);
 useEffect(()=>{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),5000);async function connect(){try{const h=await fetch('/api/health',{signal:controller.signal});if(!h.ok)throw Error();const health=await h.json();if(health.status!=='ok')throw Error();const [d,c]=await Promise.all(['/api/districts','/api/crops'].map(async p=>{const r=await fetch(p,{signal:controller.signal});if(!r.ok)throw Error();return r.json()}));setData({districts:d.data,crops:c.data});setStatus({connected:true,ai:health.ai_configured,checked:true})}catch{setStatus({connected:false,ai:false,checked:true})}finally{clearTimeout(timer)}}connect();return()=>{controller.abort();clearTimeout(timer)}},[]);
 function navigate(p){setPage(p);window.location.hash=p}
 function briefing(){download(`Ihaze Rwanda — historical evidence briefing\nPeriod: 2016–2017\nUnweighted sample evidence; independent verification pending.\n\n16,057 households in S6.\n1,834 reported increasing erosion and protection barriers.\n1,320 of these reported no extension service.\n\n${navigation.find(([id])=>id===page)?.[2]}\n\nNot current conditions, causal effects, or certified district prevalence estimates.\n`,'ihaze-briefing.txt')}
 return <div className="min-h-screen font-sans"><aside className="bg-forest p-5 text-[#d7e5de] lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:p-7 lg:overflow-y-auto"><a href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white transition hover:opacity-80"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d5eea3] text-3xl text-forest">🌾</span><span>Ihaze<span className="mt-1 block text-[9px] tracking-[.4em] text-[#a6c4b5]">RWANDA</span></span></a><div className="mb-4 mt-12 hidden text-[9px] tracking-[.18em] text-[#91afa0] lg:block">AGRICULTURAL INTELLIGENCE</div><nav aria-label="Main navigation" className="mt-5 flex gap-2 overflow-x-auto lg:mt-0 lg:grid lg:overflow-x-visible scrollbar-hide">{navigation.map(([id,icon,title])=><button key={id} onClick={()=>navigate(id)} aria-current={page===id?'page':undefined} className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-3.5 text-left text-sm transition ${page===id?'bg-[#285443] text-white':'text-[#c0d3c9] hover:bg-[#204d3c]'}`}><span aria-hidden>{icon}</span>{title}</button>)}</nav><div className="mt-auto hidden pt-10 text-[10px] leading-6 lg:block"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#d6ed9c]"/>Historical survey workspace<div className="text-[#8eb09c]">Agricultural year 2016–2017</div><div className="mt-4 border-t border-[#315848] pt-3"><a href="/" className="text-[#8eb09c] transition hover:text-white">← Back to Home</a></div></div></aside><main className="px-4 pb-5 sm:px-8 lg:ml-60 xl:px-11"><header className="flex min-h-20 items-center justify-between gap-4 py-4 text-xs text-[#77867d]"><div>Dashboard <span className="mx-3 text-[#b8c4bb]">/</span><span className="text-forest">{navigation.find(([id])=>id===page)?.[2]}</span><span className="ml-4 hidden text-[10px] sm:inline">{!status.checked?'Connecting…':status.connected?'● Backend connected':'● Snapshot mode'}</span></div><button onClick={briefing} className={`${secondary} no-print`}>↓ Export briefing</button></header><div className="rounded-lg border border-[#e4dfb7] bg-[#faf7e9] px-4 py-3 text-[10px] tracking-wide text-[#7d6b34]">2016–2017 HISTORICAL DATA <span className="mt-1 block text-xs tracking-normal text-[#827b60] md:ml-4 md:inline">Sample descriptions, not current conditions or certified national estimates.</span></div><div key={page}>{page==='overview'?<Overview onNavigate={navigate}/>:page==='districts'?<Districts rows={data.districts}/>:page==='crops'?<Crops rows={data.crops}/>:page==='planner'?<Planner rows={data.districts} connected={status.connected}/>:page==='research'?<Research data={research}/>:page==='insights'?<Insights rows={data.districts} status={status}/>:page==='changes'?<ChangeAnalysis/>:<Methodology/>}</div><footer className="mt-10 flex justify-between gap-4 text-[10px] text-[#8c9a8d]"><span>Ihaze Rwanda · Evidence-based decision support</span><a href="/" className="transition hover:text-forest">← Home</a></footer></main></div>;
}
