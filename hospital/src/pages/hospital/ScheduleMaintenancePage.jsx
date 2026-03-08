import { useState } from "react";

const EQ = [
  {id:1,name:"MRI Scanner",   dept:"Radiology",  cond:"Good",        last:"2024-09-10",icon:"☢️"},
  {id:2,name:"Ventilator",    dept:"ICU",        cond:"Fair",        last:"2024-11-01",icon:"❤️‍🔥"},
  {id:3,name:"ECG Machine",   dept:"Cardiology", cond:"New",         last:"2024-12-15",icon:"📊"},
  {id:4,name:"X-Ray Machine", dept:"Emergency",  cond:"Needs Repair",last:"2024-07-20",icon:"🔆"},
  {id:5,name:"Defibrillator", dept:"Cardiac ICU",cond:"Good",        last:"2024-10-05",icon:"⚡"},
  {id:6,name:"Surgical Robot",dept:"Surgery",    cond:"Good",        last:"2024-08-30",icon:"🤖"},
];
const TECHS = [
  {id:1,name:"Arjun Mehta",  spec:"Imaging Systems",    avail:true, rating:4.9,jobs:124,color:"bg-sky-500"},
  {id:2,name:"Priya Sharma", spec:"Cardiac Equipment",  avail:true, rating:4.8,jobs:98, color:"bg-violet-500"},
  {id:3,name:"Rahul Verma",  spec:"General Biomedical", avail:false,rating:4.7,jobs:87, color:"bg-slate-400"},
  {id:4,name:"Sunita Patel", spec:"Ventilators & ICU",  avail:true, rating:5.0,jobs:156,color:"bg-emerald-500"},
];
const PRIS = [
  {label:"Routine", bg:"bg-emerald-50",border:"border-emerald-300",text:"text-emerald-700",dot:"bg-emerald-500",desc:"Scheduled upkeep"},
  {label:"Urgent",  bg:"bg-amber-50",  border:"border-amber-300",  text:"text-amber-700",  dot:"bg-amber-500",  desc:"Needs attention soon"},
  {label:"Critical",bg:"bg-red-50",    border:"border-red-300",    text:"text-red-700",    dot:"bg-red-500",    desc:"Immediate action"},
];
const COND={New:"bg-emerald-100 text-emerald-700",Good:"bg-sky-100 text-sky-700",Fair:"bg-amber-100 text-amber-700","Needs Repair":"bg-red-100 text-red-700"};
const TYPES=["Preventive Maintenance","Corrective Repair","Calibration","Inspection","Software Update","Parts Replacement"];
const INPUT="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200";
const LABEL="block text-xs font-semibold uppercase tracking-widest text-sky-600 mb-2";

export default function ScheduleMaintenancePage() {
  const [form,setForm]=useState({eq:"",tech:"",date:"",time:"",dur:"2",pri:"Routine",type:"",notes:""});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const selEq=EQ.find(e=>e.id===Number(form.eq));
  const selT=TECHS.find(t=>t.id===Number(form.tech));
  const selP=PRIS.find(p=>p.label===form.pri);
  const ok=form.eq&&form.tech&&form.date&&form.time;

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 max-w-md w-full text-center anim-pop-in">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-amber-100">🗓️</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Maintenance Scheduled!</h2>
        <p className="text-slate-500 text-sm mb-1"><span className="font-semibold text-sky-600">{selEq?.name}</span> maintenance booked.</p>
        <p className="text-xs text-slate-400 mb-1">Technician: <span className="font-semibold text-slate-700">{selT?.name}</span></p>
        <p className="text-xs text-slate-400 mb-8">Date: <span className="font-semibold text-slate-700">{form.date} at {form.time}</span></p>
        <div className="flex gap-3 justify-center">
          <button onClick={()=>{setDone(false);setForm({eq:"",tech:"",date:"",time:"",dur:"2",pri:"Routine",type:"",notes:""});}}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-all duration-200">Schedule Another</button>
          <button className="px-6 py-3 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all">View Calendar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 anim-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Maintenance
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Schedule <span className="shimmer-blue">Maintenance</span></h1>
          <p className="text-slate-500 text-sm">Assign a technician and book a time slot for equipment servicing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* Priority */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-1">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                <h3 className="font-bold text-slate-800">Priority Level</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {PRIS.map(p=>(
                  <button key={p.label} onClick={()=>set("pri",p.label)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${form.pri===p.label?`${p.bg} ${p.border} shadow-md scale-[1.02]`:"bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
                    <span className={`w-3 h-3 rounded-full ${p.dot} block mb-2`}/>
                    <p className={`font-bold text-sm ${form.pri===p.label?p.text:"text-slate-700"}`}>{p.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-2">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                <h3 className="font-bold text-slate-800">Select Equipment</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {EQ.map(e=>(
                  <button key={e.id} onClick={()=>set("eq",String(e.id))}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${Number(form.eq)===e.id?"border-sky-400 bg-sky-50 shadow-md":"border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{e.icon}</span>
                        <div>
                          <p className={`font-bold text-sm ${Number(form.eq)===e.id?"text-sky-700":"text-slate-800"}`}>{e.name}</p>
                          <p className="text-slate-400 text-xs">{e.dept}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COND[e.cond]}`}>{e.cond}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2 pl-9">Last: {e.last}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className={LABEL}>Maintenance Type</label>
                <select className={INPUT} value={form.type} onChange={e=>set("type",e.target.value)}>
                  <option value="">Select maintenance type</option>
                  {TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Technician */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-3">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                <h3 className="font-bold text-slate-800">Assign Technician</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TECHS.map(t=>(
                  <button key={t.id} onClick={()=>t.avail&&set("tech",String(t.id))} disabled={!t.avail}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${!t.avail?"opacity-50 cursor-not-allowed border-slate-200 bg-slate-50":Number(form.tech)===t.id?"border-sky-400 bg-sky-50 shadow-md":"border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{t.name.split(" ").map(n=>n[0]).join("")}</div>
                      <div>
                        <p className={`font-bold text-sm ${Number(form.tech)===t.id?"text-sky-700":"text-slate-800"}`}>{t.name}</p>
                        <p className="text-slate-400 text-xs">{t.spec}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${t.avail?"bg-emerald-500":"bg-slate-400"}`}/>
                        <span className={`text-xs font-medium ${t.avail?"text-emerald-600":"text-slate-400"}`}>{t.avail?"Available":"Unavailable"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="text-amber-500">★</span><span>{t.rating}</span><span>·</span><span>{t.jobs} jobs</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-4">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">4</div>
                <h3 className="font-bold text-slate-800">Schedule Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div><label className={LABEL}>Date *</label><input className={INPUT} type="date" value={form.date} onChange={e=>set("date",e.target.value)}/></div>
                <div><label className={LABEL}>Time *</label><input className={INPUT} type="time" value={form.time} onChange={e=>set("time",e.target.value)}/></div>
                <div><label className={LABEL}>Duration (hrs)</label><input className={INPUT} type="number" min="1" max="24" value={form.dur} onChange={e=>set("dur",e.target.value)}/></div>
              </div>
              <div>
                <label className={LABEL}>Instructions for Technician</label>
                <textarea className={`${INPUT} min-h-[80px] resize-y`} placeholder="Special instructions, access codes, safety notes..." value={form.notes} onChange={e=>set("notes",e.target.value)}/>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="anim-fade-up delay-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Booking Summary</h3>

              {selP && (
                <div className={`p-3 rounded-xl border mb-5 ${selP.bg} ${selP.border}`}>
                  <p className="text-xs text-slate-500 mb-1">Priority</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${selP.dot}`}/>
                    <p className={`font-bold ${selP.text}`}>{selP.label}</p>
                    <span className="text-slate-400 text-xs">— {selP.desc}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {[
                  {icon:"⚕️",label:"Equipment", val:selEq?.name,   sub:selEq?.dept},
                  {icon:"👤",label:"Technician",val:selT?.name,    sub:selT?.spec},
                  {icon:"📅",label:"Date",       val:form.date||"—",sub:form.time||""},
                  {icon:"⏱️",label:"Duration",  val:form.dur?`${form.dur} hr${form.dur>1?"s":""}`:  "—"},
                  {icon:"🔧",label:"Type",       val:form.type||"—"},
                ].map(r=>(
                  <div key={r.label} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                    <span className="text-lg flex-shrink-0 mt-0.5">{r.icon}</span>
                    <div>
                      <p className="text-slate-400 text-xs">{r.label}</p>
                      <p className="text-slate-900 font-semibold text-sm">{r.val||"—"}</p>
                      {r.sub&&<p className="text-slate-400 text-xs">{r.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={()=>ok&&setDone(true)} disabled={!ok}
                className={`w-full py-3.5 text-sm font-bold rounded-xl mt-6 transition-all duration-200 ${ok
                  ?"bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-0.5"
                  :"bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                {ok?"🗓️ Confirm Booking":"Complete all fields"}
              </button>

              {!ok && (
                <div className="mt-4 space-y-1.5">
                  {[["Equipment",form.eq],["Technician",form.tech],["Date",form.date],["Time",form.time]].map(([l,v])=>(
                    <div key={l} className="flex items-center gap-2 text-xs">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${v?"bg-emerald-100 text-emerald-600":"bg-slate-100 text-slate-400"}`}>{v?"✓":"○"}</span>
                      <span className={v?"text-slate-600":"text-slate-400"}>{l} required</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}