import React, { useState, useEffect } from 'react';
import {
  Plus, ClipboardList, Users, Search,
  Eye, Pencil, Trash2, Download,
  BarChart2, ShieldCheck, MapPin, CheckCircle2, XCircle, Clock, FileText, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('PENDING'); // PENDING, APPROVED, REJECTED

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, repsRes, orgsRes] = await Promise.all([
          api.get('/api/events'),
          api.get('/api/auth/users?role=BATCH_REP'),
          api.get('/api/auth/users?role=ORGANIZATION')
        ]);

        setEvents(eventsRes.data.data || []);

        const combinedCoordinators = [
          ...(repsRes.data.data || []),
          ...(orgsRes.data.data || [])
        ];
        setCoordinators(combinedCoordinators);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveEvent = async (id) => {
    try {
      await api.patch(`/api/events/${id}/approved`);
      setEvents(events.map(e => e.eventId === id ? { ...e, status: 'APPROVED' } : e));
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleRejectEvent = async (id) => {
    try {
      await api.patch(`/api/events/${id}/rejected`);
      setEvents(events.map(e => e.eventId === id ? { ...e, status: 'REJECTED' } : e));
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  const handleApproveLetter = async (id, eventId) => {
    try {
      await api.patch(`/api/letters/${id}/approved`);
      setEvents(events.map(e => {
        if (e.eventId === eventId) {
          return {
            ...e,
            permissionLetters: e.permissionLetters.map(l => l.letterId === id ? { ...l, status: 'APPROVED' } : l)
          };
        }
        return e;
      }));
    } catch (error) {
      console.error("Error approving letter:", error);
    }
  };

  const handleRejectLetter = async (id, eventId) => {
    try {
      await api.patch(`/api/letters/${id}/rejected`);
      setEvents(events.map(e => {
        if (e.eventId === eventId) {
          return {
            ...e,
            permissionLetters: e.permissionLetters.map(l => l.letterId === id ? { ...l, status: 'REJECTED' } : l)
          };
        }
        return e;
      }));
    } catch (error) {
      console.error("Error rejecting letter:", error);
    }
  };

  const filteredCoordinators = coordinators.filter(coord =>
    coord.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coord.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingEvents = events.filter(e => e.status === 'PENDING').length;
  const pendingLetters = events.reduce((acc, current) => {
    const lettersCount = current.permissionLetters?.filter(l => l.status === 'PENDING').length || 0;
    return acc + lettersCount;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
        <p className="font-bold tracking-widest uppercase text-xs">Initializing Management Hub...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7f6] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">

        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="text-[10px] font-bold text-teal-700 tracking-widest uppercase mb-1">Administrator Console</p>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">University Management Hub</h1>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin/venues/manage')}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <MapPin size={16} /> Add Venue
            </button>

            <button
              onClick={() => navigate('/admin/users/manage')}
              className="flex items-center gap-2 bg-[#0b1120] hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <Users size={18} /> Manage Users
            </button>
          </div>
        </div>

        {/* 2. Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Total Events</p>
            <h3 className="text-4xl font-extrabold text-slate-800">{events.length}</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Pending Events</p>
            <h3 className="text-4xl font-extrabold text-teal-600">{pendingEvents}</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Pending Letters</p>
            <h3 className="text-4xl font-extrabold text-amber-500">{pendingLetters}</h3>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-12">

            {/* Approval Queue Section */}
            <section>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <ClipboardList className="text-teal-700" size={20} /> Event Repository
                </h2>
                <div className="flex bg-gray-200/50 p-1 rounded-xl border border-gray-200">
                  {['PENDING', 'APPROVED', 'REJECTED'].map(status => (
                    <button
                      key={status}
                      onClick={() => setActiveTab(status)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === status ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {(() => {
                  const filteredEvents = events.filter(event => event.status === activeTab);

                  return filteredEvents.length > 0 ? filteredEvents.map((event) => (
                    <div key={event.eventId} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:border-teal-100 transition-all group">
                      <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                            {event.eventUrl ? (
                              <img src={event.eventUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><MapPin size={24} /></div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{event.title}</h4>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-1">{event.about || 'No description provided'}</p>
                            <div className="mt-2 flex items-center gap-3">
                              <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                                {event.coordinator?.name || 'Unknown'} • {new Date(event.createdAt).toLocaleDateString()}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${event.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                                  event.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                          <button
                            onClick={() => navigate(`/events/${event.eventId}`)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          {event.status === 'PENDING' && (
                            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
                              <button
                                onClick={() => handleRejectEvent(event.eventId)}
                                className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleApproveEvent(event.eventId)}
                                className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all shadow-teal-700/20"
                              >
                                Approve
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Associated Letters Section */}
                      {event.permissionLetters && event.permissionLetters.length > 0 && (
                        <div className="bg-slate-50/50 border-t border-slate-100/60 p-6 space-y-3">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Letter Manifest ({event.permissionLetters.length})</p>
                          {event.permissionLetters.map((letter) => (
                            <div key={letter.letterId} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group/letter hover:border-teal-200 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                  <FileText size={18} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-700 line-clamp-1">{letter.letterTitle}</p>
                                  <span className={`text-[8px] font-black uppercase tracking-[0.15em] ${
                                      letter.status === 'APPROVED' ? 'text-emerald-600' :
                                      letter.status === 'REJECTED' ? 'text-red-500' : 'text-amber-500'
                                    }`}>
                                    {letter.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <a
                                  href={letter.letterUrl} target="_blank" rel="noreferrer"
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-lg transition-colors"
                                  title="Download Letter"
                                >
                                  <Download size={14} />
                                </a>
                                {letter.status === 'PENDING' && (
                                  <div className="flex items-center gap-2 border-l border-slate-200 ml-2 pl-2">
                                    <button
                                      onClick={() => handleRejectLetter(letter.letterId, event.eventId)}
                                      className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                                    >
                                      Reject
                                    </button>
                                    <button
                                      onClick={() => handleApproveLetter(letter.letterId, event.eventId)}
                                      className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-xl text-[10px] font-bold shadow-sm transition-all shadow-teal-700/20"
                                    >
                                      Approve
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-inner">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                         <ClipboardList size={32} className="text-slate-200" />
                      </div>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No {activeTab.toLowerCase()} items found</p>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* Event Coordinators Section */}
            <section>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Users className="text-teal-700" size={20} /> Registered Coordinators
                </h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-teal-500 shadow-sm"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-gray-100">
                      <tr>
                        <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Coordinator</th>
                        <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Role</th>
                        <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                        <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredCoordinators.map((coord) => (
                        <tr key={coord.userId} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-5 px-8">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-700`}>
                                {coord.name?.charAt(0) || 'U'}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{coord.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{coord.userName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-8 text-xs">
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${coord.role === 'ORGANIZATION' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                              {coord.role}
                            </span>
                          </td>
                          <td className="py-5 px-8">
                            <p className="text-xs text-slate-600 font-medium">{coord.email}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{coord.telephone || 'No phone'}</p>
                          </td>
                          <td className="py-5 px-8 text-right">
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
                {filteredCoordinators.length === 0 && (
                  <div className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No coordinators found</div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            <div className="bg-[#0b1120] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <ShieldCheck className="text-teal-400 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">Admin Security</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">You are logged into the root management console. All administrative actions are logged for audit purposes.</p>
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Last Audit Log</p>
                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-300">
                  <Clock size={14} className="text-teal-500" /> System startup check completed
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-2">
                <BarChart2 size={16} className="text-teal-600" /> Platform Status
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                    <span>Database Sync</span>
                    <span className="text-emerald-500">Online</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                    <span>File Storage</span>
                    <span className="text-teal-500">82% Free</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[18%] bg-teal-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-52 shadow-lg group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-slate-900 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest mb-3">
                  <MapPin size={12} /> Matara, Sri Lanka
                </div>
                <h4 className="font-extrabold text-lg leading-tight">University of Ruhuna<br />Main Campus Hub</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
