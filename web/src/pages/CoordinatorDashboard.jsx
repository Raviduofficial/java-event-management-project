import React, { useState, useEffect } from 'react';
import {
  Plus, Calendar, ClipboardList, CheckCircle,
  MoreVertical, CheckCircle2, User, AlertTriangle,
  Pencil, Trash2, FileText, Download, Loader2, Eye,
  Upload, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axiosConfig';

const CoordinatorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING'); // PENDING, APPROVED, REJECTED
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Letter Submission State
  const [letterForm, setLetterForm] = useState({
    letterTitle: '',
    letterDescription: '',
    eventId: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submittingLetter, setSubmittingLetter] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchCoordinatorEvents();
    }
  }, [user]);

  const fetchCoordinatorEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/events/coordinator/${user.userId}`, { withCredentials: true });
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching coordinator events:", error);
    } finally {
      setLoading(false);
    }
  };

  const activities = [
    { id: 1, title: 'Permission letter approved', desc: 'The letter for "Cultural Night" has been reviewed and signed by the Dean.', time: '12 MINS AGO', icon: <CheckCircle2 size={14} />, iconBg: 'bg-teal-600' },
    { id: 2, title: 'New validation request', desc: 'Secretary of IEEE Student Branch submitted a new event badge for "Hacks 2024".', time: '2 HOURS AGO', icon: <User size={14} />, iconBg: 'bg-[#0b1120]' },
    { id: 3, title: 'Venue conflict detected', desc: 'The Gymnasium is double-booked for Nov 12 between Sport Meet and Drama Festival.', time: '5 HOURS AGO', icon: <AlertTriangle size={14} />, iconBg: 'bg-red-600' },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    try {
      await api.delete(`/api/events/${eventId}`, { withCredentials: true });
      setEvents(events.filter(e => e.eventId !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const handleDeleteLetter = async (letterId, eventId) => {
    if (!window.confirm("Delete this permission letter?")) return;

    try {
      await api.delete(`/api/letters/${letterId}`, { withCredentials: true });
      setEvents(events.map(event => {
        if (event.eventId === eventId) {
          return {
            ...event,
            permissionLetters: event.permissionLetters.filter(l => l.letterId !== letterId)
          };
        }
        return event;
      }));
    } catch (error) {
      console.error("Error deleting letter:", error);
      alert("Failed to delete letter.");
    }
  };

  const handleAddLetter = async (e) => {
    e.preventDefault();
    if (!letterForm.eventId || !selectedFile) {
      alert("Please select an event and upload a letter file.");
      return;
    }

    setSubmittingLetter(true);
    try {
      // 1. Upload File
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await api.post('/api/files/upload', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const filename = uploadRes.data.data;
      const letterUrl = `http://localhost:8080/api/files/cdn/${filename}`;

      // 2. Create Letter
      await api.post('/api/letters', {
        ...letterForm,
        letterUrl
      }, { withCredentials: true });

      // 3. Refresh and Reset
      alert("Letter submitted successfully!");
      setLetterForm({ letterTitle: '', letterDescription: '', eventId: '' });
      setSelectedFile(null);
      fetchCoordinatorEvents();
    } catch (error) {
      console.error("Error submitting letter:", error);
      alert("Failed to submit letter.");
    } finally {
      setSubmittingLetter(false);
    }
  };

  const filteredEvents = events.filter(event => event.status === activeTab);

  const stats = {
    active: events.filter(e => e.status === 'APPROVED').length,
    pending: events.filter(e => e.status === 'PENDING').length,
    total: events.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20 relative">

      {openDropdownId && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdownId(null)}
        ></div>
      )}

      <main className="max-w-7xl mx-auto p-8 mt-4 relative">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0b1120] tracking-tight mb-2 uppercase">Hello, {user?.username}</h1>
            <p className="text-gray-600 text-sm">
              Manage your event submissions and tracked approvals in one place.
            </p>
          </div>

          <button
            onClick={() => navigate('/coordinator/events/add')}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-[#0b1120] hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Plus size={18} /> Add New Event
          </button>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Approved Events</p>
              <h3 className="text-4xl font-extrabold text-teal-600 mb-2">{stats.active}</h3>
              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight">Confirmed Entries</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
              <Calendar size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Pending Review</p>
              <h3 className="text-4xl font-extrabold text-[#0b1120] mb-2">{stats.pending}</h3>
              <p className="text-[10px] font-bold text-amber-500 flex items-center gap-1 uppercase tracking-tight">Awaiting Approval</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
              <ClipboardList size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Total Submissions</p>
              <h3 className="text-4xl font-extrabold text-[#0b1120] mb-2">{stats.total}</h3>
              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight">Overall Volume</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-500 flex items-center justify-center shadow-inner">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column: Recent Submissions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-[#0b1120]">Your Event Repository</h2>
              <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200">
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

            <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-2">
              {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                <div key={event.eventId} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:border-teal-100 transition-all group">
                  <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                        {event.eventUrl ? (
                          <img src={event.eventUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300"><Calendar size={24} /></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{event.about || 'No description provided'}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date(event.createdAt).toLocaleDateString()}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest ${event.status === 'APPROVED' ? 'bg-teal-50 text-teal-600' :
                              event.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                            {event.status}
                          </span>
                        </div>
                        {event.status === 'REJECTED' && event.rejectMessage && (
                          <p className="mt-3 text-[10px] text-red-600 font-medium leading-relaxed bg-red-50 border border-red-100 rounded-2xl p-3">
                            {event.rejectMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => navigate(`/events/${event.eventId}`)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {event.status === 'APPROVED' && (
                        <button 
                          onClick={() => navigate(`/coordinator/events/${event.eventId}/modify`)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors"
                          title="Modify Event"
                        >
                          <Pencil size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteEvent(event.eventId)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Associated Letters Section */}
                  {event.permissionLetters && event.permissionLetters.length > 0 && (
                    <div className="bg-slate-50/50 border-t border-slate-100 p-6 space-y-3">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Letter Manifest ({event.permissionLetters.length})</p>
                      {event.permissionLetters.map((letter) => (
                        <div key={letter.letterId} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                              <FileText size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700 line-clamp-1">{letter.letterTitle}</p>
                              <span className={`text-[8px] font-black uppercase tracking-widest ${letter.status === 'APPROVED' ? 'text-teal-600' :
                                  letter.status === 'REJECTED' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                {letter.status}
                              </span>
                              {letter.status === 'REJECTED' && letter.rejectMessage && (
                                <p className="mt-3 text-[10px] text-red-600 font-medium leading-relaxed bg-red-50 border border-red-100 rounded-2xl p-3">
                                  {letter.rejectMessage}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={letter.letterUrl} target="_blank" rel="noreferrer"
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 rounded-lg transition-colors"
                            >
                              <Download size={14} />
                            </a>
                            <button
                              onClick={() => handleDeleteLetter(letter.letterId, event.eventId)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-slate-200" />
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No {activeTab.toLowerCase()} submissions in this view</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-10">
            {/* Add Letter Form */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#0b1120]">Submit Letter</h2>
              </div>

              <form onSubmit={handleAddLetter} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Link to Event</label>
                  <select
                    value={letterForm.eventId}
                    onChange={(e) => setLetterForm({ ...letterForm, eventId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer"
                    required
                  >
                    <option value="">Select an Event</option>
                    {events.filter(e => e.status === 'APPROVED').map(e => (
                      <option key={e.eventId} value={e.eventId}>{e.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Letter Title</label>
                  <input
                    type="text"
                    value={letterForm.letterTitle}
                    onChange={(e) => setLetterForm({ ...letterForm, letterTitle: e.target.value })}
                    placeholder="e.g. Permission for Venue"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                  <textarea
                    value={letterForm.letterDescription}
                    onChange={(e) => setLetterForm({ ...letterForm, letterDescription: e.target.value })}
                    placeholder="Briefly describe the purpose..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all h-24 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Upload PDF Letter</label>
                  <div className={`relative group transition-all ${selectedFile ? 'border-teal-500 bg-teal-50/30' : 'border-slate-200 hover:border-teal-200 bg-slate-50'} border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer`}>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {selectedFile ? (
                      <div className="flex items-center justify-between gap-3 text-teal-700">
                        <div className="flex items-center gap-2 truncate">
                          <CheckCircle size={16} />
                          <span className="text-xs font-bold truncate">{selectedFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                          className="p-1 hover:bg-teal-100 rounded-md relative z-20"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="mx-auto w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors shadow-sm">
                          <Upload size={16} />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors">DRAG & DROP OR CLICK</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingLetter}
                  className="w-full bg-[#0b1120] hover:bg-slate-800 disabled:bg-slate-400 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  {submittingLetter ? (
                    <><Loader2 className="animate-spin" size={14} /> Processing...</>
                  ) : (
                    <>Submit Request</>
                  )}
                </button>
              </form>
            </div>

            {/* Support Card - Simplified */}
            <div className="bg-[#0b1120] rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-300 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <p className="text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-4 relative z-10">Coordinator Help</p>
              <h3 className="text-lg font-bold leading-tight mb-4 relative z-10 tracking-tight"> Need assistance with your submission? </h3>
              <p className="text-xs text-slate-400 mb-6 relative z-10 leading-relaxed"> Contact the administrative office for guidance on permission protocols. </p>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all relative z-10"> Support Hub </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CoordinatorDashboard;