import React, { useState } from 'react';
import { 
  Plus, Calendar, ClipboardList, CheckCircle, 
  MoreVertical, CheckCircle2, User, AlertTriangle,
  Pencil, Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoordinatorDashboard = () => {
  const navigate = useNavigate();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Mock Data
  const recentSubmissions = [
    { id: 1, name: 'Ruhuna Tech Expo 2024', date: 'Oct 24, 10:45 AM', status: 'APPROVED', statusColor: 'bg-teal-100 text-teal-700' },
    { id: 2, name: 'Annual Cultural Night', date: 'Oct 23, 02:15 PM', status: 'PENDING', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Robotics Workshop v2', date: 'Oct 22, 09:00 AM', status: 'REVISIONS REQUIRED', statusColor: 'bg-red-100 text-red-700' },
    { id: 4, name: 'Green Campus Initiative', date: 'Oct 21, 04:30 PM', status: 'APPROVED', statusColor: 'bg-teal-100 text-teal-700' },
  ];

  const activities = [
    { id: 1, title: 'Permission letter approved', desc: 'The letter for "Cultural Night" has been reviewed and signed by the Dean.', time: '12 MINS AGO', icon: <CheckCircle2 size={14} />, iconBg: 'bg-teal-600' },
    { id: 2, title: 'New validation request', desc: 'Secretary of IEEE Student Branch submitted a new event badge for "Hacks 2024".', time: '2 HOURS AGO', icon: <User size={14} />, iconBg: 'bg-[#0b1120]' },
    { id: 3, title: 'Venue conflict detected', desc: 'The Gymnasium is double-booked for Nov 12 between Sport Meet and Drama Festival.', time: '5 HOURS AGO', icon: <AlertTriangle size={14} />, iconBg: 'bg-red-600' },
  ];

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20 relative">
      
      {/* 🚀 Z-INDEX FIX: Overlay එක z-40 කරලා තියෙන්නේ */}
      {openDropdownId && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdownId(null)}
        ></div>
      )}

      {/* 🚀 Z-INDEX FIX: මෙතන තිබ්බ z-0 අයින් කරා */}
      <main className="max-w-7xl mx-auto p-8 mt-4 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0b1120] tracking-tight mb-2">Hello, Coordinator</h1>
            <p className="text-gray-600 text-sm">
              You have <span className="font-bold text-teal-700">12 pending validations</span> requiring your attention today.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/add-event')}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-[#0b1120] hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Plus size={18} /> Add New Event
          </button>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Active Events</p>
              <h3 className="text-4xl font-extrabold text-[#0b1120] mb-2">24</h3>
              <p className="text-[10px] font-bold text-teal-600 flex items-center gap-1">↗ +3 from last week</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Calendar size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Pending Approval</p>
              <h3 className="text-4xl font-extrabold text-[#0b1120] mb-2">12</h3>
              <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">⏱ Requires review</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <ClipboardList size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Validated Events</p>
              <h3 className="text-4xl font-extrabold text-[#0b1120] mb-2">156</h3>
              <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">✓ Total completions</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Recent Submissions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0b1120]">Recent Submissions</h2>
              <button className="text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors">View All</button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible relative z-10"> 
              <div className="overflow-x-auto overflow-y-visible">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#f8fafc] border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Event Name</th>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Submission Date</th>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-6 font-bold text-[#0b1120]">{sub.name}</td>
                        <td className="py-5 px-6 text-gray-600">{sub.date}</td>
                        <td className="py-5 px-6">
                          <span className={`text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${sub.statusColor}`}>
                            {sub.status}
                          </span>
                        </td>
                        
                        {/* Action Column with 3-Dots Dropdown */}
                        <td className="py-5 px-6 text-right relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              toggleDropdown(sub.id);
                            }}
                            className={`p-2 rounded-lg transition-colors relative z-10 ${openDropdownId === sub.id ? 'bg-teal-50 text-teal-700' : 'text-gray-400 hover:bg-gray-100 hover:text-[#0b1120]'}`}
                          >
                            <MoreVertical size={18} />
                          </button>

                          {/* 🚀 Z-INDEX FIX: Dropdown එක z-50 කරලා තියෙන්නේ Overlay එකට උඩින් එන්න */}
                          {openDropdownId === sub.id && (
                            <div className="absolute right-12 top-10 w-36 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                              
                              {/* 🚀 Edit Button Fixed */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation(); // බට්න් එක එබුවම වෙන දේවල් නවත්තනවා
                                  setOpenDropdownId(null); // Dropdown එක වහනවා
                                  navigate('/manage-event'); // 🚀 Page එකට යනවා
                                }}
                                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              
                              <div className="h-px bg-gray-100 w-full"></div>
                              
                              {/* Delete Button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  alert(`Deleted event: ${sub.name}`); 
                                  setOpenDropdownId(null);
                                }}
                                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                              
                            </div>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-10">
            {/* Activity Stream */}
            <div>
              <h2 className="text-xl font-bold text-[#0b1120] mb-6">Activity Stream</h2>
              <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                {activities.map((act) => (
                  <div key={act.id} className="relative pl-8">
                    <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full ${act.iconBg} text-white flex items-center justify-center border-4 border-[#f8fafc]`}>
                      {act.icon}
                    </div>
                    <h5 className="text-sm font-bold text-[#0b1120]">{act.title}</h5>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{act.desc}</p>
                    <p className="text-[9px] font-bold text-gray-400 mt-2 tracking-widest uppercase">{act.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Tracking Card */}
            <div className="bg-[#0b1120] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <p className="text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-3 relative z-10">Performance Tracking</p>
              <h3 className="text-lg font-bold leading-tight mb-6 relative z-10">
                Validate system performance for next semester events.
              </h3>
              <button className="w-full bg-teal-700 hover:bg-teal-600 text-white py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 relative z-10">
                Generate Report
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CoordinatorDashboard;