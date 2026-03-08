import { useState } from "react";

const EQ = [
  {id:1,name:"MRI Scanner",      cat:"Radiology",   mfr:"Siemens",      model:"MAGNETOM Vida",dept:"Radiology",  cond:"Good",        status:"Active",      serial:"SN-20241101",purchase:"2022-03-15",warranty:"2025-03-15",loc:"Block B, Rm 201"},
  {id:2,name:"Ventilator",       cat:"ICU",         mfr:"Philips",      model:"Trilogy Evo",  dept:"ICU",        cond:"Fair",        status:"In Use",      serial:"SN-20240856",purchase:"2023-07-20",warranty:"2026-07-20",loc:"ICU Ward"},
  {id:3,name:"ECG Machine",      cat:"Monitoring",  mfr:"GE Healthcare",model:"MAC 5500 HD",  dept:"Cardiology", cond:"New",         status:"Active",      serial:"SN-20230412",purchase:"2024-01-10",warranty:"2027-01-10",loc:"Block A, Rm 105"},
  {id:4,name:"X-Ray Machine",    cat:"Radiology",   mfr:"Canon Medical",model:"CXDI-Elite",   dept:"Emergency",  cond:"Needs Repair",status:"Maintenance", serial:"SN-20210933",purchase:"2021-06-01",warranty:"2024-06-01",loc:"Emergency Wing"},
  {id:5,name:"Defibrillator",    cat:"Emergency",   mfr:"Zoll",         model:"R Series",     dept:"Cardiac ICU",cond:"Good",        status:"Active",      serial:"SN-20231127",purchase:"2023-11-05",warranty:"2026-11-05",loc:"Cardiac ICU"},
  {id:6,name:"Infusion Pump",    cat:"ICU",         mfr:"BD",           model:"Alaris GP",    dept:"General Ward",cond:"Needs Repair",status:"Inactive",   serial:"SN-20220678",purchase:"2022-09-12",warranty:"2025-09-12",loc:"Store Room"},
  {id:7,name:"Ultrasound",       cat:"Diagnostic",  mfr:"Philips",      model:"EPIQ Elite",   dept:"Gynecology", cond:"New",         status:"Active",      serial:"SN-20240213",purchase:"2024-02-20",warranty:"2027-02-20",loc:"OPD Block, Rm 12"},
  {id:8,name:"Surgical Robot",   cat:"Surgical",    mfr:"Intuitive",    model:"da Vinci Xi",  dept:"Surgery",    cond:"Good",        status:"In Use",      serial:"SN-20230561",purchase:"2023-04-15",warranty:"2026-04-15",loc:"OT Complex"},
];

const STATUS = {
  Active:     {bg:"bg-emerald-100",text:"text-emerald-700",dot:"bg-emerald-500"},
  "In Use":   {bg:"bg-sky-100",    text:"text-sky-700",    dot:"bg-sky-500"},
  Maintenance:{bg:"bg-amber-100",  text:"text-amber-700",  dot:"bg-amber-500"},
  Inactive:   {bg:"bg-red-100",    text:"text-red-700",    dot:"bg-red-500"},
};
const COND = {
  New:         {bg:"bg-emerald-100",text:"text-emerald-700"},
  Good:        {bg:"bg-sky-100",    text:"text-sky-700"},
  Fair:        {bg:"bg-amber-100",  text:"text-amber-700"},
  "Needs Repair":{bg:"bg-red-100", text:"text-red-700"},
};
const CAT_STYLE = {
  Radiology:    "bg-purple-100 text-purple-700",
  ICU:          "bg-red-100    text-red-700",
  Monitoring:   "bg-blue-100   text-blue-700",
  Emergency:    "bg-orange-100 text-orange-700",
  Diagnostic:   "bg-teal-100   text-teal-700",
  Surgical:     "bg-sky-100    text-sky-700",
  Laboratory:   "bg-lime-100   text-lime-700",
  Rehabilitation:"bg-pink-100  text-pink-700",
};
const CAT_ICON = {Radiology:"☢️",ICU:"❤️‍🔥",Monitoring:"📊",Emergency:"🚨",Diagnostic:"🔬",Surgical:"⚕️",Laboratory:"🧪",Rehabilitation:"♿"};
const STATUSES = ["All","Active","In Use","Maintenance","Inactive"];
const CATS     = ["All",...new Set(EQ.map(e=>e.cat))];

export default function EquipmentListPage() {
  const [q,   setQ]   = useState("");
  const [st,  setSt]  = useState("All");
  const [cat, setCat] = useState("All");
  const [view,setView]= useState("grid");
  const [sel, setSel] = useState(null);

  const list = EQ.filter(e=>
    (st==="All"||e.status===st)&&
    (cat==="All"||e.cat===cat)&&
    (e.name.toLowerCase().includes(q.toLowerCase())||
     e.dept.toLowerCase().includes(q.toLowerCase())||
     e.mfr.toLowerCase().includes(q.toLowerCase()))
  );

  const STATS = [
    {label:"Total",           val:EQ.length,                                         bg:"bg-sky-50",    border:"border-sky-200",     text:"text-sky-700",    icon:"⚕️"},
    {label:"Active",          val:EQ.filter(e=>e.status==="Active").length,           bg:"bg-emerald-50",border:"border-emerald-200",  text:"text-emerald-700",icon:"✅"},
    {label:"In Use",          val:EQ.filter(e=>e.status==="In Use").length,           bg:"bg-blue-50",   border:"border-blue-200",     text:"text-blue-700",   icon:"🔄"},
    {label:"Needs Attention", val:EQ.filter(e=>["Maintenance","Inactive"].includes(e.status)).length, bg:"bg-amber-50",border:"border-amber-200",text:"text-amber-700",icon:"⚠️"},
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8 anim-fade-up">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"/> Inventory
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Equipment <span className="shimmer-blue">Inventory</span></h1>
            <p className="text-slate-500 text-sm">Monitor and manage all medical equipment</p>
          </div>
          <button className="px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
            <span className="text-lg">+</span> Add Equipment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((s,i)=>(
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 anim-fade-up delay-${i+1}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-3xl font-bold ${s.text}`}>{s.val}</span>
              </div>
              <p className="text-slate-600 text-sm font-medium">{s.label}</p>
              <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-current ${s.text}`} style={{width:`${(s.val/EQ.length)*100}%`,opacity:0.5}}/>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 anim-fade-up delay-2">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" placeholder="Search equipment, department, manufacturer..." value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {STATUSES.map(s=>(
                <button key={s} onClick={()=>setSt(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${st===s?"bg-sky-500 text-white shadow-md shadow-sky-200":"bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{s}</button>
              ))}
            </div>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button onClick={()=>setView("grid")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view==="grid"?"bg-white shadow text-sky-600":"text-slate-400 hover:text-slate-600"}`}>⊞ Grid</button>
              <button onClick={()=>setView("list")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view==="list"?"bg-white shadow text-sky-600":"text-slate-400 hover:text-slate-600"}`}>☰ List</button>
            </div>
          </div>
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-slate-100">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${cat===c?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200 hover:border-sky-300 hover:text-sky-600"}`}>
                {CAT_ICON[c]||"📦"} {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">Showing <span className="font-bold text-slate-800">{list.length}</span> of {EQ.length} items</p>

        {/* Grid */}
        {view==="grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((e,i)=>{
              const sc = STATUS[e.status]; const cc = COND[e.cond];
              return (
                <div key={e.id} onClick={()=>setSel(e)}
                  className={`bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 hover:border-sky-300 transition-all duration-200 anim-fade-up delay-${Math.min(i+1,5)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${CAT_STYLE[e.cat]||"bg-slate-100 text-slate-600"} flex items-center justify-center text-2xl`}>{CAT_ICON[e.cat]||"⚕️"}</div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}/>{e.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5 truncate">{e.name}</h4>
                  <p className="text-slate-400 text-xs mb-3 truncate">{e.mfr} · {e.model}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-xs truncate">{e.dept}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}`}>{e.cond}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100">
                    <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span className="text-slate-400 text-xs truncate">{e.loc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List */}
        {view==="list" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden anim-fade-up">
            <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200">
              {["Equipment","Category","Department","Condition","Status","Location"].map(h=>(
                <span key={h} className="text-xs font-bold uppercase tracking-wider text-slate-500">{h}</span>
              ))}
            </div>
            {list.map((e,i)=>{
              const sc=STATUS[e.status]; const cc=COND[e.cond];
              return (
                <div key={e.id} onClick={()=>setSel(e)}
                  className={`grid grid-cols-6 gap-4 px-6 py-4 cursor-pointer hover:bg-sky-50 transition-colors border-b border-slate-100 last:border-0 anim-fade-up delay-${Math.min(i+1,5)}`}>
                  <div><p className="font-semibold text-slate-900 text-sm truncate">{e.name}</p><p className="text-slate-400 text-xs truncate">{e.mfr}</p></div>
                  <span className={`self-center text-xs font-semibold px-2.5 py-1 rounded-lg w-fit ${CAT_STYLE[e.cat]||"bg-slate-100 text-slate-600"}`}>{CAT_ICON[e.cat]} {e.cat}</span>
                  <span className="self-center text-slate-700 text-sm truncate">{e.dept}</span>
                  <span className={`self-center text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${cc.bg} ${cc.text}`}>{e.cond}</span>
                  <span className={`self-center inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${sc.bg} ${sc.text}`}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}/>{e.status}</span>
                  <span className="self-center text-slate-400 text-xs truncate">{e.loc}</span>
                </div>
              );
            })}
          </div>
        )}

        {list.length===0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
            <p className="text-slate-800 font-bold text-lg">No equipment found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
            <button onClick={()=>{setQ("");setSt("All");setCat("All");}} className="mt-4 px-5 py-2.5 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">Clear Filters</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {sel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={()=>setSel(null)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full anim-pop-in" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${CAT_STYLE[sel.cat]||"bg-slate-100"} flex items-center justify-center text-3xl`}>{CAT_ICON[sel.cat]||"⚕️"}</div>
                <div><h3 className="font-bold text-slate-900 text-xl">{sel.name}</h3><p className="text-slate-400 text-sm">{sel.mfr}</p></div>
              </div>
              <button onClick={()=>setSel(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors">✕</button>
            </div>
            <div className="space-y-3 mb-6">
              {[["Model",sel.model],["Serial No.",sel.serial],["Department",sel.dept],["Location",sel.loc],["Purchase Date",sel.purchase],["Warranty Exp.",sel.warranty]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-400 text-sm">{k}</span>
                  <span className="text-slate-900 font-semibold text-sm">{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${STATUS[sel.status].bg} ${STATUS[sel.status].text}`}><span className={`w-1.5 h-1.5 rounded-full ${STATUS[sel.status].dot}`}/>{sel.status}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 text-sm">Condition</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${COND[sel.cond].bg} ${COND[sel.cond].text}`}>{sel.cond}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-all duration-200">🗓️ Schedule Maintenance</button>
              <button className="px-5 py-3 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">✏️ Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}