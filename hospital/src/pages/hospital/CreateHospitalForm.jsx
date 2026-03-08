import { useState } from "react";

const STEPS = [
  { id:1, label:"Basic Info",  icon:"🏥" },
  { id:2, label:"Location",    icon:"📍" },
  { id:3, label:"Contact",     icon:"📞" },
  { id:4, label:"Review",      icon:"✅" },
];

const INPUT = "w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-400";
const LABEL = "block text-xs font-semibold uppercase tracking-widest text-sky-600 mb-2";
const SECTION = "bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8";

export default function CreateHospitalForm() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name:"", type:"", beds:"", year:"", specialties:"",
    address:"", city:"", state:"", pin:"", country:"India",
    phone:"", email:"", website:"", adminName:"", adminRole:"",
  });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const pct = Math.round(((step-1)/3)*100);

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 max-w-md w-full text-center anim-pop-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-emerald-100">🎉</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Hospital Registered!</h2>
        <p className="text-slate-500 mb-1 text-sm"><span className="font-semibold text-sky-600">{form.name}</span> has been added successfully.</p>
        <p className="text-xs text-slate-400 mb-8">Your profile is under review. You'll be notified within 24 hours.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={()=>{setDone(false);setStep(1);setForm({name:"",type:"",beds:"",year:"",specialties:"",address:"",city:"",state:"",pin:"",country:"India",phone:"",email:"",website:"",adminName:"",adminRole:""});}}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200">
            Register Another
          </button>
          <button className="px-6 py-3 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4 md:p-8">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 anim-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 anim-pulse-dot"/> Hospital Registration
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Register Your <span className="shimmer-blue">Hospital</span>
          </h1>
          <p className="text-slate-500 text-sm">Complete all steps to add your facility to MedTrack network</p>
        </div>

        {/* Progress */}
        <div className="mb-8 anim-fade-up delay-1">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Step {step} of {STEPS.length}</span>
            <span className="font-semibold text-sky-600">{pct}% complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500 ease-out" style={{width:`${pct}%`}}/>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-start mb-8 anim-fade-up delay-2">
          {STEPS.map((s,i)=>(
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <button onClick={()=>step>s.id&&setStep(s.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                    ${step===s.id ? "bg-gradient-to-br from-sky-500 to-blue-600 border-sky-500 text-white shadow-lg shadow-sky-200 scale-110"
                    : step>s.id  ? "bg-sky-50 border-sky-400 text-sky-600 cursor-pointer hover:scale-105"
                                 : "bg-white border-slate-300 text-slate-400 cursor-default"}`}>
                  {step>s.id ? "✓" : s.icon}
                </button>
                <p className={`text-xs font-semibold mt-2 whitespace-nowrap ${step>=s.id?"text-sky-600":"text-slate-400"}`}>{s.label}</p>
              </div>
              {i<STEPS.length-1 && (
                <div className="flex-1 mx-2 mb-5">
                  <div className="h-0.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500 ${step>s.id?"w-full":"w-0"}`}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className={`${SECTION} anim-fade-up delay-3`}>

          {/* Step 1 */}
          {step===1 && (
            <div className="anim-slide">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-xl">🏥</div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Basic Information</h2>
                  <p className="text-sm text-slate-400">Tell us about your hospital</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={LABEL}>Hospital Name *</label>
                  <input className={INPUT} placeholder="e.g. City General Hospital" value={form.name} onChange={e=>set("name",e.target.value)}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Hospital Type *</label>
                    <select className={INPUT} value={form.type} onChange={e=>set("type",e.target.value)}>
                      <option value="">Select type</option>
                      {["Government","Private","Trust / NGO","Military","Research Institute"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Total Beds</label>
                    <input className={INPUT} type="number" placeholder="500" value={form.beds} onChange={e=>set("beds",e.target.value)}/>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Year Established</label>
                    <input className={INPUT} type="number" placeholder="1990" value={form.year} onChange={e=>set("year",e.target.value)}/>
                  </div>
                  <div>
                    <label className={LABEL}>Key Specialties</label>
                    <input className={INPUT} placeholder="Cardiology, Neurology..." value={form.specialties} onChange={e=>set("specialties",e.target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step===2 && (
            <div className="anim-slide">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">📍</div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Location Details</h2>
                  <p className="text-sm text-slate-400">Where is your hospital located?</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={LABEL}>Street Address *</label>
                  <input className={INPUT} placeholder="123, Medical Avenue, Near City Park" value={form.address} onChange={e=>set("address",e.target.value)}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>City *</label><input className={INPUT} placeholder="Mumbai" value={form.city} onChange={e=>set("city",e.target.value)}/></div>
                  <div><label className={LABEL}>State *</label><input className={INPUT} placeholder="Maharashtra" value={form.state} onChange={e=>set("state",e.target.value)}/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Pincode</label><input className={INPUT} placeholder="400001" value={form.pin} onChange={e=>set("pin",e.target.value)}/></div>
                  <div><label className={LABEL}>Country</label><input className={INPUT} placeholder="India" value={form.country} onChange={e=>set("country",e.target.value)}/></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step===3 && (
            <div className="anim-slide">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl">📞</div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Contact & Admin</h2>
                  <p className="text-sm text-slate-400">Who manages this facility?</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Phone Number *</label><input className={INPUT} placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
                  <div><label className={LABEL}>Email Address *</label><input className={INPUT} type="email" placeholder="admin@hospital.com" value={form.email} onChange={e=>set("email",e.target.value)}/></div>
                </div>
                <div><label className={LABEL}>Website</label><input className={INPUT} placeholder="https://hospital.com" value={form.website} onChange={e=>set("website",e.target.value)}/></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={LABEL}>Admin Name *</label><input className={INPUT} placeholder="Dr. Ravi Kumar" value={form.adminName} onChange={e=>set("adminName",e.target.value)}/></div>
                  <div><label className={LABEL}>Admin Role</label><input className={INPUT} placeholder="Chief Medical Officer" value={form.adminRole} onChange={e=>set("adminRole",e.target.value)}/></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 – Review */}
          {step===4 && (
            <div className="anim-slide">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">✅</div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Review & Confirm</h2>
                  <p className="text-sm text-slate-400">Double-check before submitting</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  {label:"Hospital Name", value:form.name,       icon:"🏥"},
                  {label:"Type",          value:form.type,       icon:"🏷️"},
                  {label:"Total Beds",    value:form.beds,       icon:"🛏️"},
                  {label:"Established",   value:form.year,       icon:"📅"},
                  {label:"Location",      value:`${form.city}, ${form.state}`, icon:"📍"},
                  {label:"Phone",         value:form.phone,      icon:"📞"},
                  {label:"Email",         value:form.email,      icon:"✉️"},
                  {label:"Admin",         value:form.adminName,  icon:"👤"},
                ].map(r=>(
                  <div key={r.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-sky-200 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{r.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{r.label}</span>
                    </div>
                    <p className="text-slate-800 font-semibold text-sm truncate">{r.value||"—"}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-200">
                <span className="text-sky-500 mt-0.5">ℹ️</span>
                <p className="text-sky-700 text-sm">By submitting, you confirm all details are accurate. The hospital will be reviewed and activated within 24 hours.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <div>
              {step>1 && (
                <button onClick={()=>setStep(s=>s-1)} className="px-5 py-2.5 border border-slate-300 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
                  ← Back
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:block">{step}/{STEPS.length}</span>
              {step<4
                ? <button onClick={()=>setStep(s=>s+1)} className="px-7 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200">Continue →</button>
                : <button onClick={()=>setDone(true)} className="px-7 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:-translate-y-0.5 transition-all duration-200">🏥 Register Hospital</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}