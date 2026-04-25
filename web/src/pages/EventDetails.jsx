import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Share2, Pencil, CheckCircle2, Building, Users,
  Calendar, Clock, MapPin, Download, FileText, Globe, Mail,
  MonitorPlay, Printer, Image as ImageIcon, Video, Ticket, Mic, HeartHandshake, Eye, Loader2, XCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axiosConfig';

// Inline Banknote icon
const BanknoteIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      }
    };
    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-center p-8">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <Calendar size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Event Not Found</h2>
          <p className="text-sm text-gray-500 mb-8">{error || "The event you are looking for does not exist."}</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-[#0b1120] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const canManage = user && (user.role === 'ROLE_ADMIN_LEC' || user.username === event.coordinator?.userName);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalBudget = (data) => {
    if (!data) return 0;
    if (typeof data === 'number') return data;
    if (typeof data === 'string') return parseFloat(data.replace(/,/g, '')) || 0;
    if (Array.isArray(data)) {
      return data.reduce((sum, item) => sum + calculateTotalBudget(item), 0);
    }
    if (typeof data === 'object') {
      return Object.values(data).reduce((sum, item) => sum + calculateTotalBudget(item), 0);
    }
    return 0;
  };

  const renderBudgetRows = (data, level = 0) => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, val], idx) => {
      const isObject = typeof val === 'object' && val !== null && !Array.isArray(val);
      
      if (isObject) {
        const subTotal = calculateTotalBudget(val);
        return (
          <React.Fragment key={`${level}-${key}-${idx}`}>
            <tr className="bg-slate-50/50 border-t border-gray-200/60">
              <td className="px-6 py-4 font-black text-slate-800 uppercase tracking-widest text-[10px]" style={{ paddingLeft: `${level * 1.5 + 1.5}rem` }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </td>
              <td className="px-6 py-4 font-black text-slate-900 text-right text-xs">
                LKR {subTotal.toLocaleString()}
              </td>
            </tr>
            {renderBudgetRows(val, level + 1)}
          </React.Fragment>
        );
      } else {
        const amount = calculateTotalBudget(val);
        return (
          <tr key={`${level}-${key}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-bold text-slate-700 capitalize" style={{ paddingLeft: `${level * 1.5 + 2.5}rem` }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </td>
            <td className="px-6 py-4 font-black text-teal-600 text-right">
              {amount.toLocaleString()}
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 tracking-wide">
            <span onClick={() => navigate('/')} className="hover:text-teal-700 cursor-pointer transition-colors">Home</span>
            <ChevronRight size={14} />
            <span onClick={() => navigate('/events')} className="hover:text-teal-700 cursor-pointer transition-colors">Events</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-bold truncate max-w-[200px]">{event.title || 'Event Details'}</span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div>
              <div className="relative h-64 md:h-80 bg-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
                {event.eventUrl ? (
                  <img
                    src={event.eventUrl}
                    alt={event.title || 'Event banner'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 flex items-center justify-center">
                    <span className="text-8xl font-black text-white/10 tracking-widest uppercase select-none">
                      {event.title?.charAt(0) || 'E'}
                    </span>
                  </div>
                )}
                <div className={`absolute top-4 left-4 ${
                  event.status === 'APPROVED' ? 'bg-emerald-500' : 
                  event.status === 'REJECTED' ? 'bg-red-500' : 'bg-amber-500'
                } text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md`}>
                  {event.status === 'APPROVED' ? <CheckCircle2 size={14} /> : 
                   event.status === 'REJECTED' ? <XCircle size={14} /> : <Clock size={14} />}
                  {event.status === 'APPROVED' ? 'Approved' : 
                   event.status === 'REJECTED' ? 'Rejected' : 'Pending Approval'}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1120] mb-4 tracking-tight">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-teal-700">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-teal-500" />
                  {event.venue?.name || "Ruhuna University"}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-teal-500" />
                  Organized by {event.coordinator?.name || "The University"}
                </div>
              </div>
            </div>

            {/* About the Event */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-4">About the Event</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {event.about || `${event.title} is hosted at the University of Ruhuna. Join us for an exciting experience of academic excellence and cultural celebration.`}
              </p>
            </div>

            {/* Event Agenda Download */}
            {event.agendaUrl && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0b1120] mb-2 flex items-center gap-2">
                      <FileText className="text-teal-600" size={20} /> Event Agenda
                    </h3>
                    <p className="text-sm text-gray-500">Download the official schedule PDF for this event.</p>
                  </div>
                  <a
                    href={event.agendaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0b1120] hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#0b1120]/10 transition-all"
                  >
                    <Download size={16} /> Download Agenda
                  </a>
                </div>
              </div>
            )}

            {/* Permission Letters */}
            {event.permissionLetters?.filter(l => l.status === 'APPROVED').length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-[#0b1120] mb-4 flex items-center gap-2">
                  <FileText className="text-teal-600" size={20} /> Permission Letters
                </h3>
                <div className="space-y-4">
                  {event.permissionLetters
                    .filter(letter => letter.status === 'APPROVED')
                    .map((letter, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200 text-teal-600">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-800">{letter.letterTitle || `Permission Letter ${idx + 1}`}</p>
                            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                              <CheckCircle2 size={10} /> Approved
                            </span>
                          </div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">Official university approval</p>
                        </div>
                      </div>
                      <a href={letter.letterUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                        <Download size={14} /> Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Overview */}
            {(event.budgetReport || event.sponsorships) && (
              <div className="space-y-8">
                {/* Budget Report Table */}
                {event.budgetReport && Object.keys(event.budgetReport).length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                       <BanknoteIcon className="text-teal-600" size={20} /> Budget Allocation
                    </h3>
                    <div className="overflow-hidden border border-gray-100 rounded-xl">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-gray-100">
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Expense Category</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Amount (LKR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {renderBudgetRows(event.budgetReport)}
                          <tr className="bg-teal-50/40 border-t-2 border-teal-100">
                            <td className="px-6 py-5 font-black text-[#0b1120] uppercase tracking-tighter flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                                <BanknoteIcon size={16} />
                              </div>
                              Total Estimated Budget
                            </td>
                            <td className="px-6 py-5 font-black text-[#0b1120] text-right text-lg">
                              LKR {calculateTotalBudget(event.budgetReport).toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sponsorship Manifest */}
                {event.sponsorships && Object.keys(event.sponsorships).length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-[#0b1120] mb-8 flex items-center gap-2">
                       <HeartHandshake className="text-teal-600" size={20} /> Official Sponsorships
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Object.entries(event.sponsorships).map(([tier, status], idx) => {
                        const Icon = tier.toLowerCase().includes('gold') ? Ticket : 
                                   tier.toLowerCase().includes('silver') ? Mic : HeartHandshake;
                        return (
                          <div key={idx} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                                <Icon size={24} />
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                {status}
                              </span>
                            </div>
                            <h4 className="text-slate-800 font-extrabold capitalize text-base">{tier} Partner</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Tier Level Manifest</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#0b1120] mb-5 flex items-center gap-2">
                <Calendar className="text-teal-600" size={16} /> Event Details
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-slate-800">{formatDate(event.startTime)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-bold text-slate-800">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Venue Section with Image */}
              {event.venue && (
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <Building size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Venue</p>
                      <p className="text-sm font-bold text-slate-800">{event.venue.name}</p>
                      <p className="text-[10px] text-gray-500">{event.venue.location}</p>
                      {event.venue.description && (
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{event.venue.description}</p>
                      )}
                      {event.venue.capacity && (
                        <p className="text-xs text-teal-700 font-medium mt-1">
                          Capacity: {event.venue.capacity} guests
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Venue Image */}
                  {event.venue.venueUrl && (
                    <div className="relative rounded-xl overflow-hidden h-48 shadow-sm border border-gray-100">
                      <img
                        src={event.venue.venueUrl}
                        alt={event.venue.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1">
                        <ImageIcon size={14} />
                        Venue
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {event.venue.facilities && event.venue.facilities.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Facilities</p>
                      <div className="flex flex-wrap gap-2">
                        {event.venue.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Organizing Committee */}
            {event.committee && Object.keys(event.committee).length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-[#0b1120] mb-5 flex items-center gap-2">
                  <Users className="text-teal-600" size={16} /> Organizing Committee
                </h3>
                <div className="space-y-4">
                  {Object.entries(event.committee).map(([role, name], idx) => {
                    const displayName = typeof name === 'string' && name.trim()
                      ? name.trim()
                      : 'Unknown';
                    const initial = displayName.charAt(0).toUpperCase();
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                          {initial}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-800">{displayName}</p>
                          <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest capitalize">
                            {role.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Organized By */}
            <div className="bg-[#0b1120] rounded-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/20 rounded-full blur-xl pointer-events-none"></div>
              <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2 relative z-10">
                <CheckCircle2 className="text-teal-400" size={16} /> Organized By
              </h3>
              <div className="flex items-center gap-3 mb-6 relative z-10 text-left">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">University of Ruhuna</p>
                  <p className="text-[10px] text-slate-400">Coordinator: {event.coordinator?.name || "N/A"}</p>
                </div>
              </div>
              <button className="w-full bg-teal-700 hover:bg-teal-600 text-white py-2.5 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 relative z-10">
                <Mail size={14} /> Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;