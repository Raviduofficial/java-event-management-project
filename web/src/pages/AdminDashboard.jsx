import React from 'react';
import { 
  Plus, ClipboardList, Users, Search, 
  Eye, Pencil, Trash2, Download, 
  BarChart2, ShieldCheck, MapPin 
} from 'lucide-react';
// 🚀 1. මෙතනින් useNavigate import කරගන්නවා
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  // 🚀 2. navigate function එක හදාගන්නවා
  const navigate = useNavigate();
  
  // Mock Data
  const approvalQueue = [
    { id: 1, title: 'Annual Science Symposium 2024', subtitle: 'Faculty of Science • Submitted 2h ago', imgBg: 'bg-blue-900' },
    { id: 2, title: 'Career Fair: Engineering Chapter', subtitle: 'Career Guidance Unit • Submitted 5h ago', imgBg: 'bg-[#8b6f4e]' },
    { id: 3, title: 'Ruhuna Cultural Night', subtitle: 'Student Union • Submitted 1d ago', imgBg: 'bg-teal-800' },
  ];

  const coordinators = [
    { id: 1, name: 'Prof. Jagath Sena', email: 'j.sena@ruh.ac.lk', dept: 'Faculty of Humanities', status: 'Active', initials: 'JS', color: 'bg-indigo-100 text-indigo-700' },
    { id: 2, name: 'Dr. Anula Kumari', email: 'anula.k@ruh.ac.lk', dept: 'Dept. of Computer Science', status: 'Active', initials: 'AK', color: 'bg-slate-100 text-slate-700' },
    { id: 3, name: 'Malith Wijesinghe', email: 'malith.w@ruh.ac.lk', dept: 'Sports Development Unit', status: 'On Leave', initials: 'MW', color: 'bg-purple-100 text-purple-700' },
  ];

  const activities = [
    { id: 1, title: 'New Coordinator Added', desc: 'Administrator added Dr. Saman Perera to Faculty of Medicine.', time: '14 MINS AGO', dotColor: 'bg-teal-600' },
    { id: 2, title: 'Event Approved', desc: '"Annual Beach Cleanup" was approved for next Sunday.', time: '2 HOURS AGO', dotColor: 'bg-slate-300' },
    { id: 3, title: 'Security Alert', desc: 'Failed login attempt from IP 192.168.1.45', time: '5 HOURS AGO', dotColor: 'bg-red-500' },
  ];

  return (
    <div className="bg-[#f4f7f6] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="text-[10px] font-bold text-teal-700 tracking-widest uppercase mb-1">Administrator Console</p>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">University Management Hub</h1>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            
            {/* 🚀 New Add Venue Button with Navigation */}
            <button 
              onClick={() => navigate('/add-venue')}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <MapPin size={16} /> Add Venue
            </button>

            {/* 🚀 Existing Add Coordinator Button with Navigation */}
            <button 
              onClick={() => navigate('/add-coordinator')}
              className="flex items-center gap-2 bg-[#0b1120] hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <Plus size={18} /> Add Coordinator
            </button>
          </div>
        </div>

        {/* 2. Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Active Events</p>
            <h3 className="text-4xl font-extrabold text-slate-800">24</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Pending Approvals</p>
            <h3 className="text-4xl font-extrabold text-teal-600">08</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Total Coordinators</p>
            <h3 className="text-4xl font-extrabold text-slate-800">156</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">System Health</p>
            <h3 className="text-4xl font-extrabold text-green-500">99%</h3>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Event Approval Queue */}
            <section>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <ClipboardList className="text-teal-700" size={20} /> Event Approval Queue
              </h2>
              <div className="space-y-3">
                {approvalQueue.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Image Placeholder */}
                      <div className={`w-16 h-16 rounded-lg ${item.imgBg} flex-shrink-0 shadow-inner`}></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-slate-800 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Event Coordinators Table */}
            <section>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Users className="text-teal-700" size={20} /> Event Coordinators
                </h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input type="text" placeholder="Search by name or faculty..." className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-teal-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-gray-100">
                      <tr>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Department / Faculty</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {coordinators.map((coord) => (
                        <tr key={coord.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${coord.color}`}>
                                {coord.initials}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{coord.name}</p>
                                <p className="text-[11px] text-gray-500">{coord.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-600">{coord.dept}</td>
                          <td className="py-4 px-6">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${coord.status === 'Active' ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-600'}`}>
                              {coord.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-3">
                              <button className="text-gray-400 hover:text-slate-800 transition-colors"><Pencil size={16} /></button>
                              <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-gray-100 text-center">
                  <button className="text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors">View All Coordinators</button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Quick Reports Card */}
            <div className="bg-[#0f172a] rounded-2xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-6">Quick Reports</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left">
                  <Download className="text-teal-400" size={18} /> Monthly Event Summary
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left">
                  <BarChart2 className="text-teal-400" size={18} /> Coordinator Activity Log
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left">
                  <ShieldCheck className="text-teal-400" size={18} /> Access Permissions Audit
                </button>
              </div>
            </div>

            {/* System Activity */}
            <div className="bg-transparent">
              <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-6">System Activity</h3>
              <div className="relative border-l-2 border-gray-200 ml-2 space-y-6">
                {activities.map((act) => (
                  <div key={act.id} className="relative pl-6">
                    <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ${act.dotColor} border-2 border-[#f4f7f6]`}></div>
                    <h5 className="text-sm font-bold text-slate-800">{act.title}</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{act.desc}</p>
                    <p className="text-[9px] font-bold text-gray-400 mt-2 tracking-widest">{act.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Image Card */}
            <div className="relative rounded-2xl overflow-hidden h-48 shadow-sm group cursor-pointer border border-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-bold text-slate-800 shadow-sm">
                <MapPin size={12} /> MATARA MAIN CAMPUS
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;