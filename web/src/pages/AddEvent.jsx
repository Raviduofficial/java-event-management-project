import React from 'react';
import { 
  ChevronRight, UploadCloud, FileText, X, 
  CheckCircle2, Map, Info, Send
} from 'lucide-react';

const AddEvent = () => {
  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20">
      
      <main className="max-w-4xl mx-auto p-8 mt-4">
        
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">Events</span>
          <ChevronRight size={14} />
          <span className="text-[#0e1b35] font-bold">Add New Event</span>
        </div>

        {/* 2. Page Header & Progress */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#0e1b35] mb-4">Add New Event</h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Initial Event Proposal
            </span>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[40%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 3. Event Details Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
              1
            </div>
            <h2 className="text-xl font-bold text-[#0e1b35]">Event Details & Permissions</h2>
          </div>

          <form className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-xs font-bold text-[#0e1b35] mb-2">Event Title</label>
              <input 
                type="text" 
                placeholder="e.g. Annual Tech Symposium 2024" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Category & Attendance (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#0e1b35] mb-2">Category</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-white">
                  <option>Academic</option>
                  <option>Cultural</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0e1b35] mb-2">Expected Attendance</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div className="pt-4">
              <label className="block text-xs font-bold text-[#0e1b35] mb-2">Upload Permission Letter</label>
              
              {/* Default Upload Box (Hidden when file is uploaded, shown here for structure) */}
              {/* <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-emerald-400 transition-all cursor-pointer group">
                <UploadCloud className="text-gray-400 mb-3 group-hover:text-emerald-500" size={32} />
                <p className="text-sm font-bold text-[#0e1b35] mb-1">Click to upload VC Approval Draft</p>
                <p className="text-xs text-gray-400">PDF format preferred (Max 5MB)</p>
              </div> 
              */}

              {/* Uploaded File State (As shown in your design) */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-emerald-100">
                    <FileText className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">Permission Letter Uploaded</p>
                    <p className="text-sm font-bold text-[#0e1b35]">VC_Approval_Draft.pdf</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-gray-400">1.2 MB</span>
                  <button type="button" className="text-gray-400 hover:text-red-500 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* 4. Venue Selection Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shadow-sm">
              2
            </div>
            <h2 className="text-xl font-bold text-[#0e1b35]">Venue Selection</h2>
          </div>

          {/* Venue Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Selected Venue */}
            <div className="rounded-xl border-2 border-emerald-500 overflow-hidden relative cursor-pointer shadow-sm hover:shadow-md transition-shadow group">
              <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 z-10 shadow-sm">
                <CheckCircle2 size={16} />
              </div>
              <div className="h-32 bg-gray-200 relative overflow-hidden">
                {/* Image Placeholder - අනාගතේදි ඇත්ත පින්තූර දාන්න */}
                <div className="w-full h-full bg-[#8b6f4e] opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-4 bg-emerald-50/30">
                <h3 className="font-bold text-[#0e1b35] text-sm mb-1">Main Auditorium</h3>
                <p className="text-xs text-gray-500">Cap: 1000 • Faculty of Science</p>
              </div>
            </div>

            {/* Unselected Venue 1 */}
            <div className="rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group">
              <div className="h-32 bg-gray-200 relative overflow-hidden">
                <div className="w-full h-full bg-[#d4c5b9] opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0e1b35] text-sm mb-1">Seminar Room 01</h3>
                <p className="text-xs text-gray-500">Cap: 150 • Faculty of Mgmt.</p>
              </div>
            </div>

            {/* Unselected Venue 2 */}
            <div className="rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group">
              <div className="h-32 bg-gray-200 relative overflow-hidden">
                <div className="w-full h-full bg-[#789b73] opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0e1b35] text-sm mb-1">Rabindranath Tagore Hall</h3>
                <p className="text-xs text-gray-500">Cap: 500 • Cultural Center</p>
              </div>
            </div>

          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              <Map size={14} /> View all available venues
            </button>
          </div>
        </div>

        {/* 5. Information Box */}
        <div className="border border-dashed border-gray-300 bg-gray-50/50 rounded-2xl p-8 mb-10 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center mb-3">
            <Info size={16} />
          </div>
          <h4 className="font-bold text-[#0e1b35] text-sm mb-2">Future Planning Steps</h4>
          <p className="text-xs text-gray-500 max-w-lg leading-relaxed">
            Advanced planning sections like <span className="font-bold text-gray-700">Budget Estimates</span> and <span className="font-bold text-gray-700">Additional Documentation</span> will become available once the initial event proposal is approved by the administration.
          </p>
        </div>

        {/* 6. Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
          <button className="text-sm font-bold text-gray-600 hover:text-[#0e1b35] transition-colors px-4 py-2">
            Save as Draft
          </button>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-[#0e1b35] hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group">
              Submit for Approval <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AddEvent;