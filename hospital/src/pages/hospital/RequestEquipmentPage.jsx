import { useState } from "react";

const URGENCIES = [
  {label:"Low",     bg:"bg-emerald-50",border:"border-emerald-300",text:"text-emerald-700",dot:"bg-emerald-500",bbg:"bg-emerald-100",btext:"text-emerald-700",icon:"🟢",desc:"Within 30 days"},
  {label:"Medium",  bg:"bg-sky-50",    border:"border-sky-300",    text:"text-sky-700",    dot:"bg-sky-500",    bbg:"bg-sky-100",    btext:"text-sky-700",    icon:"🔵",desc:"Within 2 weeks"},
  {label:"High",    bg:"bg-amber-50",  border:"border-amber-300",  text:"text-amber-700",  dot:"bg-amber-500",  bbg:"bg-amber-100",  btext:"text-amber-700",  icon:"🟡",desc:"Within 3 days"},
  {label:"Critical",bg:"bg-red-50",    border:"border-red-300",    text:"text-red-700",    dot:"bg-red-500",    bbg:"bg-red-100",    btext:"text-red-700",    icon:"🔴",desc:"Immediate"},
];
const CATS=["Diagnostic","Surgical","Monitoring","Laboratory","Radiology","Rehabilitation","ICU","Emergency"];
const HISTORY=[
  {id:"REQ-2401",name:"Pulse Oximeter",          dept:"General Ward",  urg:"Low",      status:"Approved",date:"2025-01-10",qty:5},
  {id:"REQ-2389",name:"Portable Suction Machine",dept:"Emergency",     urg:"High",     status:"Pending", date:"2025-01-20",qty:2},
  {id:"REQ-2375",name:"Infusion Pump",           dept:"ICU",           urg:"Critical", status:"Ordered", date:"2025-01-25",qty:3},
  {id:"REQ-2360",name:"Ophthalmoscope",          dept:"Ophthalmology", urg:"Medium",   status:"Rejected",date:"2025-01-05",qty:1},
  {id:"REQ-2344",name:"Nebulizer",               dept:"Pediatrics",    urg:"Low",      status:"Approved",date:"2024-12-28",qty:4},
];
const ST_STYLE={Approved:"bg-emerald-100 text-emerald-700",Pending:"bg-amber-100 text-amber-700",Ordered:"bg-sky-100 text-sky-700",Rejected:"bg-red-100 text-red-700"};
const ST_ICON ={Approved:"✅",Pending:"⏳",Ordered:"📦",Rejected:"❌"};
const UR_STYLE={Low:"bg-emerald-100 text-emerald-700",Medium:"bg-sky-100 text-sky-700",High:"bg-amber-100 text-amber-700",Critical:"bg-red-100 text-red-700"};
const INPUT="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200";
const LABEL="block text-xs font-semibold uppercase tracking-widest text-sky-600 mb-2";

export default function RequestEquipmentPage() {
  const [tab, setTab]=useState("new");
  const [form,setForm]=useState({name:"",cat:"",qty:"1",urg:"Medium",dept:"",reason:"",budget:"",brand:"",notes:""});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const selU=URGENCIES.find(u=>u.label===form.urg);
  const ok=form.name&&form.cat&&form.dept&&form.reason;

  const hStats=[
    {l:"Approved",c:HISTORY.filter(r=>r.status==="Approved").length,cls:"text-emerald-600",icon:"✅",bg:"bg-emerald-50",border:"border-emerald-200"},
    {l:"Pending", c:HISTORY.filter(r=>r.status==="Pending").length, cls:"text-amber-600", icon:"⏳",bg:"bg-amber-50", border:"border-amber-200"},
    {l:"Ordered", c:HISTORY.filter(r=>r.status==="Ordered").length, cls:"text-sky-600",   icon:"📦",bg:"bg-sky-50",   border:"border-sky-200"},
    {l:"Rejected",c:HISTORY.filter(r=>r.status==="Rejected").length,cls:"text-red-600",   icon:"❌",bg:"bg-red-50",   border:"border-red-200"},
  ];

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 max-w-md w-full text-center anim-pop-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-sky-100">📋</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted!</h2>
        <p className="text-slate-500 text-sm mb-1">Request for <span className="font-semibold text-sky-600">{form.name}</span> sent to procurement.</p>
        <p className="text-xs text-slate-400 mb-8">Expected response within 48 hours.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={()=>{setDone(false);setForm({name:"",cat:"",qty:"1",urg:"Medium",dept:"",reason:"",budget:"",brand:"",notes:""});}}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-all duration-200">New Request</button>
          <button onClick={()=>{setDone(false);setTab("history");}} className="px-6 py-3 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all">View History</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6 anim-fade-up">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500"/> Procurement
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Equipment <span className="shimmer-blue">Request</span></h1>
            <p className="text-slate-500 text-sm">Submit procurement requests for new or replacement equipment</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 anim-pulse-dot"/>
            <span className="text-amber-700 font-semibold text-sm">{HISTORY.filter(r=>r.status==="Pending").length} Pending Review</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border border-slate-200 rounded-2xl p-1.5 gap-1 mb-6 w-fit shadow-sm anim-fade-up delay-1">
          {[["new","📋 New Request"],["history","🕓 History"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${tab===k?"bg-sky-500 text-white shadow-md":"text-slate-500 hover:text-sky-600 hover:bg-sky-50"}`}>{l}</button>
          ))}
        </div>

        {/* NEW REQUEST */}
        {tab==="new" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">

              {/* Urgency */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-1">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                  <h3 className="font-bold text-slate-800">Urgency Level</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {URGENCIES.map(u=>(
                    <button key={u.label} onClick={()=>set("urg",u.label)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${form.urg===u.label?`${u.bg} ${u.border} shadow-md scale-[1.03]`:"bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
                      <div className="text-2xl mb-1.5">{u.icon}</div>
                      <p className={`font-bold text-sm ${form.urg===u.label?u.text:"text-slate-700"}`}>{u.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{u.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Details */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-2">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                  <h3 className="font-bold text-slate-800">Equipment Details</h3>
                </div>
                <div className="space-y-4">
                  <div><label className={LABEL}>Equipment Name *</label><input className={INPUT} placeholder="e.g. Portable ECG Monitor" value={form.name} onChange={e=>set("name",e.target.value)}/></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Category *</label>
                      <select className={INPUT} value={form.cat} onChange={e=>set("cat",e.target.value)}>
                        <option value="">Select category</option>
                        {CATS.map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div><label className={LABEL}>Quantity *</label><input className={INPUT} type="number" min="1" value={form.qty} onChange={e=>set("qty",e.target.value)}/></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={LABEL}>Department *</label><input className={INPUT} placeholder="e.g. Cardiology" value={form.dept} onChange={e=>set("dept",e.target.value)}/></div>
                    <div><label className={LABEL}>Preferred Brand</label><input className={INPUT} placeholder="Optional" value={form.brand} onChange={e=>set("brand",e.target.value)}/></div>
                  </div>
                </div>
              </div>

              {/* Justification */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-3">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                  <h3 className="font-bold text-slate-800">Justification</h3>
                </div>
                <div className="space-y-4">
                  <div><label className={LABEL}>Reason for Request *</label><textarea className={`${INPUT} min-h-[100px] resize-y`} placeholder="Explain why this equipment is needed and what clinical problem it addresses..." value={form.reason} onChange={e=>set("reason",e.target.value)}/></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Budget Estimate (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">₹</span>
                        <input className={`${INPUT} pl-8`} placeholder="5,00,000" value={form.budget} onChange={e=>set("budget",e.target.value)}/>
                      </div>
                    </div>
                    <div><label className={LABEL}>Additional Notes</label><input className={INPUT} placeholder="Any other details..." value={form.notes} onChange={e=>set("notes",e.target.value)}/></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="anim-fade-up delay-3">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Request Preview</h3>

                {selU && (
                  <div className={`p-3 rounded-xl border mb-5 ${selU.bg} ${selU.border}`}>
                    <p className="text-xs text-slate-500 mb-1">Urgency</p>
                    <div className="flex items-center gap-2">
                      <span>{selU.icon}</span>
                      <p className={`font-bold text-sm ${selU.text}`}>{selU.label}</p>
                      <span className="text-slate-400 text-xs">— {selU.desc}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-5">
                  {[
                    {icon:"⚕️",l:"Equipment", v:form.name ||"—"},
                    {icon:"📂",l:"Category",  v:form.cat  ||"—"},
                    {icon:"🔢",l:"Quantity",  v:form.qty  ||"—"},
                    {icon:"🏥",l:"Department",v:form.dept ||"—"},
                    {icon:"💰",l:"Budget",    v:form.budget?`₹${form.budget}`:"—"},
                  ].map(r=>(
                    <div key={r.l} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      <span className="text-base flex-shrink-0 mt-0.5">{r.icon}</span>
                      <div>
                        <p className="text-slate-400 text-xs">{r.l}</p>
                        <p className="text-slate-900 font-semibold text-sm break-all">{r.v}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={()=>ok&&setDone(true)} disabled={!ok}
                  className={`w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${ok
                    ?"bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200 hover:-translate-y-0.5"
                    :"bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                  {ok?"📋 Submit Request":"Fill required fields"}
                </button>

                <div className="mt-4 space-y-1.5">
                  {[["Name",form.name],["Category",form.cat],["Department",form.dept],["Reason",form.reason]].map(([l,v])=>(
                    <div key={l} className="flex items-center gap-2 text-xs">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${v?"bg-emerald-100 text-emerald-600":"bg-slate-100 text-slate-400"}`}>{v?"✓":"○"}</span>
                      <span className={v?"text-slate-600":"text-slate-400"}>{l} required</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {tab==="history" && (
          <div className="space-y-5 anim-fade-up">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hStats.map((s,i)=>(
                <div key={s.l} className={`${s.bg} border ${s.border} rounded-2xl p-5 text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 anim-fade-up delay-${i+1}`}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className={`text-2xl font-bold ${s.cls}`}>{s.c}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Request History</h3>
                <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{HISTORY.length} total</span>
              </div>
              {HISTORY.map((r,i)=>(
                <div key={r.id} className={`flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-sky-50 transition-colors border-b border-slate-100 last:border-0 anim-fade-up delay-${Math.min(i+1,5)}`}>
                  <div className="flex-1 min-w-[160px]">
                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{r.dept} · Qty: {r.qty}</p>
                  </div>
                  <span className="text-slate-400 text-xs font-mono bg-slate-100 px-2 py-1 rounded-lg">{r.id}</span>
                  <span className="text-slate-400 text-xs">{r.date}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${UR_STYLE[r.urg]}`}>{r.urg}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${ST_STYLE[r.status]}`}>{ST_ICON[r.status]} {r.status}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button onClick={()=>setTab("new")} className="px-6 py-2.5 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all">+ New Request</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}