import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Building2, ArrowLeft, Mail, Phone, MapPin, Info, Eye, Calendar, Loader2 } from 'lucide-react';

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const orgRes = await api.get(`/api/auth/org/${id}`, { withCredentials: true });
        if (orgRes.data && orgRes.data.data) {
          setOrg(orgRes.data.data);
          setError(null);
          
          // Fetch events after org is confirmed
          setEventsLoading(true);
          try {
            const eventsRes = await api.get(`/api/events/coordinator/${id}`, { withCredentials: true });
            const allEvents = eventsRes.data.data || [];
            // User requested: "just retrive all the approved events"
            setEvents(allEvents.filter(e => e.status === 'APPROVED'));
          } catch (evErr) {
            console.error('Failed to fetch events:', evErr);
          } finally {
            setEventsLoading(false);
          }
        } else {
          setError('Organization not found');
        }
      } catch (err) {
        console.error('Failed to fetch organization details:', err);
        setError('Failed to load organization.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-teal-600 font-bold font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600 mr-3"></div>
        Loading Organization Details...
      </div>
    );
  }

  if (error || !org) {
    return (
      <div className="text-center py-20 font-sans">
        <Building2 className="mx-auto text-gray-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-700">{error || 'Organization not found'}</h3>
        <button
          onClick={() => navigate('/organizations')}
          className="mt-4 text-teal-600 hover:underline font-medium flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} /> Back to Organizations
        </button>
      </div>
    );
  }

  // Helper to format keys (e.g., "presidentName" -> "President Name")
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const renderCommitteeValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-slate-400">N/A</span>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="space-y-1">
          {value.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-900">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
              <span className="flex-1">
                {renderCommitteeValue(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object') {
      return (
        <div className="space-y-2 text-sm text-gray-900">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="flex flex-wrap gap-2 items-start">
              <span className="font-semibold text-slate-500">{formatKey(subKey)}:</span>
              <span className="flex-1">{renderCommitteeValue(subValue)}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <h4 className="font-bold text-gray-900 text-sm truncate" title={String(value)}>
        {String(value)}
      </h4>
    );
  };

  const committeeEntries = org.committee
    ? Array.isArray(org.committee)
      ? org.committee.map((item, idx) => [String(idx + 1), item])
      : Object.entries(org.committee)
    : [];
  const hasCommittee = committeeEntries.length > 0;

  // Only show About section if at least one field has real data
  const hasMission = !!org.mission;
  const hasVision  = !!org.vision;
  const hasHistory = !!org.history;
  const hasAbout   = hasMission || hasVision || hasHistory;

  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <span className="cursor-pointer hover:text-teal-600" onClick={() => navigate('/')}>Home</span>
        {' > '}
        <span className="cursor-pointer hover:text-teal-600" onClick={() => navigate('/organizations')}>Organizations</span>
        {' > '}
        <span className="text-gray-800 font-medium">{org.name}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12">

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-6 w-full">
            <div className="w-24 h-24 bg-teal-900 rounded-xl flex items-center justify-center overflow-hidden border-2 border-teal-100 shrink-0">
              {org.orgUrl ? (
                <img src={org.orgUrl} alt={org.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="text-teal-400" size={40} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">{org.name}</h1>
                <span className="bg-teal-50 text-teal-600 text-xs font-bold px-2 py-1 rounded-full border border-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> ACTIVE
                </span>
                {org.role && (
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full border border-blue-100">
                    {org.role.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
              {org.address && (
                <p className="text-gray-600 mb-3 text-sm flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  {org.address}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                {org.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-teal-500" /> {org.email}
                  </span>
                )}
                {org.telephone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-teal-500" /> {org.telephone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0 shrink-0">
            <button
              onClick={() => navigate('/organizations')}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <ArrowLeft size={15} /> Back
            </button>

          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column — Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* About Us — only renders if any real data exists */}
            {hasAbout ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                  <span className="text-teal-500 bg-teal-50 p-2 rounded-lg">ℹ️</span> About Us
                </h2>

                {hasMission && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{org.mission}</p>
                  </div>
                )}

                {(hasVision || hasHistory) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hasVision && (
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-teal-100 transition-colors">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                          <span className="text-teal-500">👁️</span> Our Vision
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{org.vision}</p>
                      </div>
                    )}
                    {hasHistory && (
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-teal-100 transition-colors">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                          <span className="text-teal-500">📜</span> History
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed max-h-[120px] overflow-y-auto custom-scrollbar">
                          {org.history}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                <Info size={36} className="text-gray-300 mb-3" />
                <h3 className="font-bold text-gray-700 mb-1">No Information Provided</h3>
                <p className="text-sm text-gray-500">This organization hasn't added their mission, vision, or history yet.</p>
              </div>
            )}

            {/* Society Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-teal-500 bg-teal-50 p-2 rounded-lg">📅</span> Published Events
                </h2>
                {events.length > 0 && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    {events.length} Approved
                  </span>
                )}
              </div>

              {eventsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="animate-spin text-teal-600 mb-2" size={24} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scanning event log...</p>
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.eventId} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4 group hover:border-teal-100 transition-all">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner">
                          {event.eventUrl ? (
                            <img src={event.eventUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><Calendar size={20} /></div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-teal-700 transition-colors">{event.title}</h4>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{event.about || 'No description available for this event.'}</p>
                          <div className="flex items-center gap-3 mt-1.5 font-bold">
                            <span className="text-[9px] text-gray-400 uppercase tracking-tight flex items-center gap-1">
                              <Calendar size={10} /> {new Date(event.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/events/${event.eventId}`)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-teal-600 hover:bg-teal-50 border border-transparent hover:border-teal-100 transition-all flex-shrink-0"
                        title="View Event Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                    <Calendar size={32} className="text-slate-200" />
                  </div>
                  <h3 className="font-bold text-gray-700 mb-1">No Approved Events</h3>
                  <p className="text-sm text-gray-500">This organization hasn't published any approved events yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="space-y-6">

            {/* Executive Committee */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                👥 Structure
              </div>
              <div className="p-6 space-y-6">
                {hasCommittee ? (
                  committeeEntries.map(([key, value]) => {
                    const isName = key.toLowerCase().includes('name') || key.toLowerCase().includes('president') || key.toLowerCase().includes('secretary');
                    
                    return (
                      <div key={key} className="flex items-start gap-4 group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 border-white shadow-sm transition-transform group-hover:scale-110 shrink-0 ${isName ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}`}>
                          {String(key).charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{formatKey(key)}</p>
                          {renderCommitteeValue(value)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                    Composition undefined
                  </div>
                )}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Contact &amp; Info</h3>
              <div className="space-y-4">
                {org.email && (
                  <div className="flex items-start gap-3 text-sm">
                    <Mail size={16} className="text-teal-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email Address</p>
                      <a href={`mailto:${org.email}`} className="text-gray-800 font-medium hover:text-teal-600 break-all">
                        {org.email}
                      </a>
                    </div>
                  </div>
                )}
                {org.telephone && (
                  <div className="flex items-start gap-3 text-sm">
                    <Phone size={16} className="text-teal-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Telephone</p>
                      <p className="text-gray-800 font-medium">{org.telephone}</p>
                    </div>
                  </div>
                )}
                {org.address && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin size={16} className="text-teal-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Address</p>
                      <p className="text-gray-800 font-medium">{org.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />

    </div>
  );
};

export default OrganizationDetails;
