import React from 'react';
import { Users, ChevronDown, UploadCloud, Info, Building } from 'lucide-react';

const AddVenue = () => {
  return (
    <div className="bg-[#fafafa] font-sans text-left min-h-screen pb-20">
      
      {/* App.js එකෙන් Navbar එක ඉබේම එනවා */}

      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-3 tracking-tight">Register New Venue</h1>
          <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
            Add academic facilities and event spaces to the university catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Main Form) */}
          <div className="lg:col-span-2 space-y-12">
            
            <form className="space-y-12">
              
              {/* Section 1: Basic Identification */}
              <section>
                <div className="border-l-4 border-teal-700 pl-3 mb-6">
                  <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Basic Identification</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">Venue Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rabindranath Tagore Lecture Theater" 
                      className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">Location / Faculty</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Faculty of Humanities" 
                      className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-800 mb-2">Seating Capacity</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="500" 
                        className="w-full bg-gray-100 border border-transparent rounded-xl pl-4 pr-10 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800"
                      />
                      <Users className="absolute right-4 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">Venue Type</label>
                    <div className="relative">
                      <select className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all appearance-none text-slate-800 font-medium">
                        <option>Auditorium</option>
                        <option>Lecture Hall</option>
                        <option>Meeting Room</option>
                        <option>Outdoor Ground</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Facilities & Equipment */}
              <section>
                <div className="border-l-4 border-teal-700 pl-3 mb-6">
                  <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Facilities & Equipment</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {['AC System', 'Sound System', 'Projector', 'Stage Lighting', 'WiFi Access', 'Podium'].map((item, index) => (
                    <label key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-teal-400 transition-colors">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-teal-600 checked:border-teal-600 transition-colors peer" />
                        <svg className="w-3 h-3 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Section 3: Visual Documentation */}
              <section>
                <div className="border-l-4 border-teal-700 pl-3 mb-6">
                  <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Visual Documentation</h3>
                </div>
                
                <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-teal-400 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-4 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                    <UploadCloud size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base mb-1">Upload Layout or Venue Images</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop or <span className="font-bold text-teal-700 underline underline-offset-2">browse files</span>
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">PNG • JPG • PDF (MAX 10MB)</p>
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex items-center gap-6 pt-4">
                <button type="submit" className="bg-[#0b1120] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">
                  Create Venue Entry
                </button>
                <button type="button" className="text-sm font-bold text-gray-500 hover:text-slate-800 transition-colors">
                  Discard Draft
                </button>
              </div>

            </form>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-[10px] font-bold text-teal-700 tracking-widest uppercase mb-4">Venue Preview Card</p>
              
              <div className="border border-gray-100 rounded-xl overflow-hidden p-4">
                {/* Image Placeholder */}
                <div className="h-40 bg-slate-500 rounded-lg mb-4 flex items-center justify-center">
                   <Building size={48} className="text-slate-300 opacity-50" />
                </div>
                {/* Text Placeholders */}
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
                </div>
                {/* Pill Placeholders */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-teal-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-teal-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Admin Policy Card */}
            <div className="bg-[#0b1120] rounded-2xl shadow-sm p-8 relative overflow-hidden">
              {/* Subtle background graphic */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 border-4 border-slate-700/30 rounded-full opacity-50"></div>
              
              <div className="w-8 h-8 rounded-full bg-teal-900/50 text-teal-400 flex items-center justify-center mb-4 relative z-10">
                <Info size={16} />
              </div>
              <h3 className="text-base font-bold text-white mb-3 relative z-10">Admin Policy</h3>
              <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                Ensure all capacity numbers align with campus safety regulations. All venue layouts must be updated annually.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Footer එක App.jsx එකෙන් ඉබේම එනවා */}

    </div>
  );
};

export default AddVenue;