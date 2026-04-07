import React from 'react';
import { ChevronRight, UserPlus, Shield, ArrowRight } from 'lucide-react';

const AddCoordinator = () => {
  return (
    <div className="bg-[#f4f7f6] font-sans text-left min-h-screen pb-20">
      
      <main className="max-w-4xl mx-auto p-8 mt-4">
        
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6 tracking-wide">
          <span className="hover:text-teal-700 cursor-pointer transition-colors">Organizations</span>
          <ChevronRight size={14} />
          <span className="hover:text-teal-700 cursor-pointer transition-colors">Personnel</span>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-bold">Add Coordinator</span>
        </div>

        {/* 2. Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#0b1120] mb-3">Add Event Coordinator</h1>
          <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
            Onboard a new academic or staff member to manage organizational events and venue bookings.
          </p>
        </div>

        {/* 3. Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
          {/* Left accent border */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
          
          <form className="space-y-6 ml-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Dr. Gamini Senanayake" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-gray-300 font-medium text-slate-800"
                />
              </div>

              {/* University ID */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">University ID</label>
                <input 
                  type="text" 
                  placeholder="RU/STAFF/2024/042" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-gray-300 font-medium text-slate-800"
                />
              </div>

              {/* Faculty / Department */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Faculty / Department</label>
                <select className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium appearance-none">
                  <option value="" disabled selected className="text-gray-400">Select Department</option>
                  <option value="sci">Faculty of Science</option>
                  <option value="eng">Faculty of Engineering</option>
                  <option value="med">Faculty of Medicine</option>
                  <option value="mgt">Faculty of Management</option>
                </select>
              </div>

              {/* University Email */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">University Email</label>
                <input 
                  type="email" 
                  placeholder="gamini.s@ruh.ac.lk" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-gray-300 font-medium text-slate-800"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Number</label>
                <input 
                  type="text" 
                  placeholder="+94 41 222 2681" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-gray-300 font-medium text-slate-800"
                />
              </div>

              {/* Assign to Organization */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Assign to Organization</label>
                <select className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium appearance-none">
                  <option value="" disabled selected className="text-gray-400">Select Organization</option>
                  <option value="1">Science Faculty Society</option>
                  <option value="2">Engineering Student Council</option>
                  <option value="3">Sports Council</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-6 pt-6">
              <button type="button" className="text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95">
                Add Coordinator <UserPlus size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* 4. Bottom Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Access Rights Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0b1120] mb-2">Access Rights & Permissions</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-lg">
                New coordinators will be granted administrative access to create events, manage bookings, and generate reports for their assigned organization. They will receive an automated invitation to activate their academic credentials.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full">Venue Booking</span>
                <span className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full">Event Publishing</span>
                <span className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full">Finance Tracking</span>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-[#0b1120] rounded-2xl shadow-sm p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-3">Need Support?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contact the IT Service Center for bulk coordinator uploads or permission disputes.
              </p>
            </div>
            <button className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center gap-2 transition-colors mt-6">
              Open Support Ticket <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AddCoordinator;