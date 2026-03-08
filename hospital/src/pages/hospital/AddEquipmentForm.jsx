import { useState } from "react";

const CATS = ["Diagnostic","Surgical","Monitoring","Laboratory","Radiology","Rehabilitation","ICU","Emergency"];
const CAT_ICONS = {Diagnostic:"🔬",Surgical:"⚕️",Monitoring:"📊",Laboratory:"🧪",Radiology:"☢️",Rehabilitation:"♿",ICU:"❤️‍🔥",Emergency:"🚨"};
const CONDITIONS = [
  {label:"New",         cls:"bg-emerald-50 text-emerald-700 border-emerald-300", dot:"bg-emerald-500"},
  {label:"Good",        cls:"bg-sky-50    text-sky-700    border-sky-300",        dot:"bg-sky-500"   },
  {label:"Fair",        cls:"bg-amber-50  text-amber-700  border-amber-300",      dot:"bg-amber-500" },
  {label:"Needs Repair",cls:"bg-red-50    text-red-700    border-red-300",        dot:"bg-red-500"   },
];
const INPUT = "w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-400";
const LABEL = "block text-xs font-semibold uppercase tracking-widest text-sky-600 mb-2";

export default function AddEquipmentForm() {
  const [form, setForm] = useState({name:"",category:"",model:"",mfr:"",serial:"",purchase:"",warranty:"",condition:"New",ward:"",dept:"",qty:"1",notes:""});
  const [done, setDone] = useState(false);
  const set = (k,v)=>setForm(f=>({...f,[k]:v}));
  const ok = form.name && form.category;
  const cond = CONDITIONS.find(c=>c.label===form.condition);

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 max-w-md w-full text-center anim-pop-in">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-emerald-100">✅</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Equipment Added!</h2>
        <p className="text-slate-500 text-sm mb-1"><span className="font-semibold text-sky-600">{form.name}</span> registered successfully.</p>
        <p className="text-xs text-slate-400 mb-8">Serial: {form.serial||"N/A"} · Qty: {form.qty}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={()=>{setDone(false);setForm({name:"",category:"",model:"",mfr:"",serial:"",purchase:"",warranty:"",condition:"New",ward:"",dept:"",qty:"1",notes:""});}}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-all duration-200">Add Another</button>
          <button className="px-6 py-3 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">View List</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 anim-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Equipment Registry
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Add <span className="shimmer-blue">Equipment</span></h1>
          <p className="text-slate-500 text-sm">Register new medical equipment to your hospital inventory</p>
        </div>

        {/* Condition selector */}
        <div className="flex gap-2 flex-wrap mb-6 anim-fade-up delay-1">
          <span className="text-xs font-semibold text-slate-500 self-center mr-2 uppercase tracking-wide">Condition:</span>
          {CONDITIONS.map(c=>(
            <button key={c.label} onClick={()=>set("condition",c.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${form.condition===c.label ? `${c.cls} shadow-md scale-105` : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}>
              <span className={`w-2 h-2 rounded-full ${c.dot}`}/>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* Identity */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-2">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                <h3 className="font-bold text-slate-800">Equipment Identity</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={LABEL}>Equipment Name *</label>
                  <input className={INPUT} placeholder="e.g. MRI Scanner, Ventilator" value={form.name} onChange={e=>set("name",e.target.value)}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Category *</label>
                    <select className={INPUT} value={form.category} onChange={e=>set("category",e.target.value)}>
                      <option value="">Select category</option>
                      {CATS.map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Quantity</label>
                    <input className={INPUT} type="number" min="1" value={form.qty} onChange={e=>set("qty",e.target.value)}/>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Model Number</label><input className={INPUT} placeholder="MDL-2024X" value={form.model} onChange={e=>set("model",e.target.value)}/></div>
                  <div><label className={LABEL}>Serial Number</label><input className={INPUT} placeholder="SN-XXXXXXXX" value={form.serial} onChange={e=>set("serial",e.target.value)}/></div>
                </div>
                <div><label className={LABEL}>Manufacturer</label><input className={INPUT} placeholder="Siemens, Philips, GE Healthcare..." value={form.mfr} onChange={e=>set("mfr",e.target.value)}/></div>
              </div>
            </div>

            {/* Dates & Location */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-3">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                <h3 className="font-bold text-slate-800">Dates & Location</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Purchase Date</label><input className={INPUT} type="date" value={form.purchase} onChange={e=>set("purchase",e.target.value)}/></div>
                  <div><label className={LABEL}>Warranty Expiry</label><input className={INPUT} type="date" value={form.warranty} onChange={e=>set("warranty",e.target.value)}/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Building / Ward</label><input className={INPUT} placeholder="Block A, Ward 3" value={form.ward} onChange={e=>set("ward",e.target.value)}/></div>
                  <div><label className={LABEL}>Department</label><input className={INPUT} placeholder="Cardiology, ICU..." value={form.dept} onChange={e=>set("dept",e.target.value)}/></div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 anim-fade-up delay-4">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                <h3 className="font-bold text-slate-800">Additional Notes</h3>
              </div>
              <textarea className={`${INPUT} min-h-[100px] resize-y`} placeholder="Special instructions, accessories included, important notes..." value={form.notes} onChange={e=>set("notes",e.target.value)}/>
            </div>
          </div>

          {/* Preview */}
          <div className="anim-fade-up delay-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Live Preview</h3>

              <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl p-5 border border-slate-100 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl mb-3 shadow-sm">
                  {CAT_ICONS[form.category]||"⚕️"}
                </div>
                <h4 className="font-bold text-slate-900 text-base">{form.name||"Equipment Name"}</h4>
                <p className="text-slate-400 text-sm mt-0.5">{form.mfr||"Manufacturer"} · {form.model||"Model"}</p>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  {l:"Category",   v:form.category||"—"},
                  {l:"Department", v:form.dept||"—"},
                  {l:"Location",   v:form.ward||"—"},
                  {l:"Quantity",   v:form.qty},
                ].map(r=>(
                  <div key={r.l} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-400 text-xs font-medium">{r.l}</span>
                    <span className="text-slate-800 text-sm font-semibold">{r.v}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400 text-xs font-medium">Condition</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cond?.cls}`}>{form.condition}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 anim-pulse-dot"/>
                <span className="text-emerald-700 text-xs font-semibold">Ready to Register</span>
              </div>

              <button onClick={()=>ok&&setDone(true)} disabled={!ok}
                className={`w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${ok
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                ⚕️ Add Equipment
              </button>
              {!ok && <p className="text-center text-xs text-slate-400 mt-2">* Name and Category required</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}