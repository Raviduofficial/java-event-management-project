import React, { useState } from 'react';
import { 
  Info, Clock, Users, Megaphone, FileText, 
  MapPin, Plus, MoreVertical, Calendar,
  Award, Pencil, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageEvent = () => {
  const navigate = useNavigate();

  // Marketing Toggles State
  const [socialMedia, setSocialMedia] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [campusDisplay, setCampusDisplay] = useState(false);

  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Approved
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <Calendar size={14} /> Nov 12, 2024
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#0b1120] tracking-tight mb-2">Annual Tech Symposium 2024</h1>
            <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
              Manage the details, schedule, and logistical arrangements for the upcoming technical showcase event.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => navigate('/event-details')}
              className="flex-1 md:flex-none bg-white border border-gray-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              Preview Page
            </button>
            <button className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Form Areas) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Info size={14} /></div>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event Name</label>
                  <input 
                    type="text" 
                    defaultValue="Annual Tech Symposium 2024"
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Venue</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      defaultValue="Main Auditorium, Faculty of Engineering"
                      className="w-full bg-gray-50 border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0b1120] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Clock size={14} /></div>
                  Agenda Items
                </h3>
                <button className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors">
                  <Plus size={16} /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-gray-200 transition-colors group cursor-pointer">
                  <span className="text-sm font-bold text-[#0b1120] w-20">09:00 AM</span>
                  <span className="text-sm font-medium text-slate-700 flex-1">Opening Keynote</span>
                  <Pencil size={16} className="text-gray-400 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-gray-200 transition-colors group cursor-pointer">
                  <span className="text-sm font-bold text-[#0b1120] w-20">10:30 AM</span>
                  <span className="text-sm font-medium text-slate-700 flex-1">Tech Panel Discussion</span>
                  <Pencil size={16} className="text-gray-400 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-gray-200 transition-colors group cursor-pointer">
                  <span className="text-sm font-bold text-[#0b1120] w-20">01:00 PM</span>
                  <span className="text-sm font-medium text-slate-700 flex-1">Project Exhibitions</span>
                  <Pencil size={16} className="text-gray-400 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </div>

            {/* Committee Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Users size={14} /></div>
                Committee Management
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">KP</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Kasun Perera</p>
                      <p className="text-[10px] text-gray-500">Lead Coordinator</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-slate-800"><MoreVertical size={18} /></button>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">TS</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Tharushi Silva</p>
                      <p className="text-[10px] text-gray-500">Logistics Manager</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-slate-800"><MoreVertical size={18} /></button>
                </div>
              </div>
            </div>

            {/* 🚀 NEW: Sponsorship Management (ඔයා ඉල්ලපු අලුත් කෑල්ල) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0b1120] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"><Award size={14} /></div>
                  Sponsorship Management
                </h3>
                <button className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors">
                  <Plus size={16} /> Add Sponsor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">🥇 Gold Tier</span>
                    <span className="text-xs font-bold text-gray-500">LKR 50,000 /ea</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue="3" className="w-16 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:border-teal-500 focus:outline-none" />
                    <span className="text-xs text-gray-500">Secured Sponsors</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">🥈 Silver Tier</span>
                    <span className="text-xs font-bold text-gray-500">LKR 25,000 /ea</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue="5" className="w-16 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:border-teal-500 focus:outline-none" />
                    <span className="text-xs text-gray-500">Secured Sponsors</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Budget Allocation */}
            <div className="bg-[#0b1120] rounded-2xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                <BanknoteIcon size={120} />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-8 relative z-10">Budget Allocation</h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span className="flex items-center gap-2">Venue & Logistics</span> 
                    <span className="flex items-center gap-2 text-white">LKR 45,000 <Pencil size={12} className="text-gray-500 cursor-pointer hover:text-white" /></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[20%] h-full bg-teal-400"></div></div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span className="flex items-center gap-2">Catering</span> 
                    <span className="flex items-center gap-2 text-white">LKR 120,000 <Pencil size={12} className="text-gray-500 cursor-pointer hover:text-white" /></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[60%] h-full bg-teal-400"></div></div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span className="flex items-center gap-2">Marketing & Swag</span> 
                    <span className="flex items-center gap-2 text-white">LKR 35,000 <Pencil size={12} className="text-gray-500 cursor-pointer hover:text-white" /></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[15%] h-full bg-teal-400"></div></div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Budget</span>
                <span className="text-2xl font-extrabold text-white">LKR 200,000</span>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><FileText size={14} /></div>
                Documentation
              </h3>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-teal-400 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200 text-red-500 font-bold text-[10px]">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors">Permission Letter</p>
                    <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">VC_APPROVAL_DRAFT.PDF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Megaphone size={14} /></div>
                Marketing
              </h3>
              
              <div className="space-y-6">
                
                {/* Custom Toggle Switch for Social Media */}
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setSocialMedia(!socialMedia)}>
                  <span className="text-sm font-medium text-slate-700">Social Media</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${socialMedia ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${socialMedia ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {/* Custom Toggle Switch for Newsletter */}
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setNewsletter(!newsletter)}>
                  <span className="text-sm font-medium text-slate-700">Newsletter</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${newsletter ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${newsletter ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {/* Custom Toggle Switch for Campus Displays */}
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setCampusDisplay(!campusDisplay)}>
                  <span className="text-sm font-medium text-slate-700">Campus Displays</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${campusDisplay ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${campusDisplay ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// SVG Icon for Budget card background
const BanknoteIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

export default ManageEvent;