import React, { useState } from "react";
import CreateHospitalForm    from "./pages/hospital/CreateHospitalForm";
import AddEquipmentForm      from "./pages/hospital/AddEquipmentForm";
import EquipmentListPage     from "./pages/hospital/EquipmentListPage";
import ScheduleMaintenancePage from "./pages/hospital/ScheduleMaintenancePage";
import RequestEquipmentPage  from "./pages/hospital/RequestEquipmentPage";

const NAV = [
  { key:"create",   label:"Register Hospital",    sub:"Add new facility",  icon:(
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
  )},
  { key:"add",      label:"Add Equipment",         sub:"Register a device", icon:(
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
  )},
  { key:"list",     label:"Equipment List",        sub:"View inventory",    icon:(
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
  )},
  { key:"schedule", label:"Schedule Maintenance",  sub:"Book technician",   icon:(
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
  )},
  { key:"request",  label:"Request Equipment",     sub:"Procurement",       icon:(
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
  )},
];

export default function App() {
  const [page, setPage] = useState("create");
  const [open, setOpen] = useState(false);

  const pages = { create:<CreateHospitalForm/>, add:<AddEquipmentForm/>, list:<EquipmentListPage/>, schedule:<ScheduleMaintenancePage/>, request:<RequestEquipmentPage/> };

  return (
    <div className="flex min-h-screen bg-slate-50" style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"}}>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden anim-fade-in" onClick={()=>setOpen(false)}/>}

      {/* ─── SIDEBAR ─── */}
      <aside className={`sidebar-fixed ${open?"sidebar-open":""} fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-xl`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-200 flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-base leading-tight">MedTrack</p>
            <p className="text-xs text-slate-400 font-medium">Hospital Suite</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 px-3 mb-3 mt-1">Hospital Portal</p>

          {NAV.map(item => {
            const active = page === item.key;
            return (
              <button key={item.key} onClick={()=>{setPage(item.key);setOpen(false);}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 group
                  ${active
                    ? "bg-sky-50 text-sky-700 border border-sky-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  }`}>
                <span className={`flex-shrink-0 transition-colors ${active ? "text-sky-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold truncate ${active ? "text-sky-700" : ""}`}>{item.label}</p>
                  <p className={`text-xs truncate ${active ? "text-sky-500" : "text-slate-400"}`}>{item.sub}</p>
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 anim-pulse-dot"/>}
              </button>
            );
          })}
        </nav>

        {/* Quick stats */}
        <div className="mx-3 mb-3 p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100">
          <p className="text-xs font-bold text-sky-800 mb-3 uppercase tracking-wide">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2">
            {[["8","Equipment"],["2","Pending"],["3","Active","text-emerald-600"],["1","Critical","text-red-500"]].map(([v,l,c])=>(
              <div key={l} className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-white">
                <p className={`text-lg font-bold ${c||"text-sky-600"}`}>{v}</p>
                <p className="text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">HA</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">Hospital Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@medtrack.com</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 anim-pulse-dot"/>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div className="content-area flex-1 flex flex-col lg:ml-64 min-h-screen">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/>
                </svg>
              </div>
              <span className="font-bold text-slate-900">MedTrack</span>
            </div>
            <button onClick={()=>setOpen(true)} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{pages[page]}</main>
      </div>
    </div>
  );
}