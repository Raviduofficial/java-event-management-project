import React from 'react';

const OrganizationOverview = () => {
  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        Home {'>'} Organizations {'>'} <span className="text-gray-800 font-medium">Engineering Society</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        
        {/* 2. Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-teal-900 rounded-xl flex items-center justify-center text-teal-400 font-bold text-center p-2">
              ENGINEERING SOCIETY
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">Engineering Society</h1>
                <span className="bg-teal-50 text-teal-600 text-xs font-bold px-2 py-1 rounded-full">ACTIVE</span>
              </div>
              <p className="text-gray-600 mb-3">Faculty of Engineering, Hapugala Campus</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">📅 Est. 1999</span>
                <span className="flex items-center gap-1">👥 450+ Members</span>
                <span className="flex items-center gap-1">📍 Engineering Faculty Complex</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition">
              <span>➕</span> Join Society
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition">
              🔗
            </button>
          </div>
        </div>

        {/* 3. Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mission & Vision */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <span className="text-teal-500">ℹ️</span> Mission & Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Engineering Society of the University of Ruhuna serves as the premier student organization dedicated to fostering innovation, professional development, and community engagement among engineering students. Our mission is to bridge the gap between academic theory and industrial practice through workshops, seminars, and collaborative projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">OUR VISION</h3>
                  <p className="text-sm text-gray-600">To be the catalyst for creating globally competitive engineers who contribute to sustainable technological advancement.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">HISTORY</h3>
                  <p className="text-sm text-gray-600">Founded in 1999, the society has grown from a small interest group to the largest student body in the faculty, hosting over 20 annual events.</p>
                </div>
              </div>
            </div>

            {/* Upcoming & Past Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-teal-500">📅</span> Upcoming & Past Events
                </h2>
                <a href="#" className="text-teal-600 font-semibold text-sm hover:underline">View All</a>
              </div>

              {/* Major Event Card */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500 text-white rounded-lg p-3 text-center min-w-[70px]">
                    <div className="text-2xl font-bold leading-none">15</div>
                    <div className="text-xs font-medium uppercase mt-1">Oct</div>
                  </div>
                  <div>
                    <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Next Major Event</span>
                    <h3 className="text-lg font-bold text-gray-900">TechInnova 2024 Symposium</h3>
                    <p className="text-sm text-gray-600">Main Auditorium • 09:00 AM</p>
                  </div>
                </div>
                <button className="mt-4 sm:mt-0 bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition">
                  RSVP
                </button>
              </div>

              {/* Past Event List Item 1 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl mb-3 hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-slate-300"></div> 
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Annual Hackathon v3.0</h4>
                    <p className="text-sm text-gray-500">Completed on Aug 12, 2024</p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </div>

              {/* Past Event List Item 2 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                     <div className="w-full h-full bg-slate-300"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Industry Expert Meetup</h4>
                    <p className="text-sm text-gray-500">Completed on June 28, 2024</p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </div>

            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            
            {/* Executive Committee */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 text-white font-bold flex items-center gap-2">
                👥 Executive Committee
              </div>
              <div className="p-6 space-y-5">
                {[
                  { name: 'Kamal Perera', role: 'PRESIDENT' },
                  { name: 'Amara Jayawardena', role: 'SECRETARY' },
                  { name: 'Dilan Fernando', role: 'TREASURER' },
                  { name: 'Ruwan Silva', role: 'VICE PRESIDENT' }
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                      <div className="w-full h-full bg-slate-300"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-teal-600 font-semibold">{member.role}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 text-center border-t border-gray-100">
                  <a href="#" className="text-sm font-bold text-gray-900 hover:text-teal-600 transition">
                    Full Committee List
                  </a>
                </div>
              </div>
            </div>

            {/* Connect With Us */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Connect With Us</h3>
              <div className="space-y-3 mb-6">
                <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-teal-600">
                  <span className="text-teal-500">📧</span> engsoc@ruh.ac.lk
                </a>
                <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-teal-600">
                  <span className="text-teal-500">🌐</span> www.engsoc-ruhuna.org
                </a>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">📘</div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">🔗</div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">📷</div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer එක App.jsx එකෙන් එන නිසා අයින් කරලා තියෙන්නේ */}
      
    </div>
  );
};

export default OrganizationOverview;