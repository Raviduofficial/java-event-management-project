import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState({ upcoming: [], ongoing: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events');
        const allEvents = response.data.data || [];
        
        // Filter approved events
        const approvedEvents = allEvents.filter(event => 
          event.status === 'APPROVED' && event.startTime && event.endTime
        );
        
        categorizeEvents(approvedEvents);
        setEvents(approvedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categorizeEvents = (eventsList) => {
    const now = new Date();
    const categories = {
      upcoming: [],
      ongoing: [],
      past: []
    };

    eventsList.forEach(event => {
      const startTime = new Date(event.startTime?.replace(' ', 'T') || 0);
      const endTime = new Date(event.endTime?.replace(' ', 'T') || 0);

      if (now < startTime) {
        categories.upcoming.push(event);
      } else if (now >= startTime && now <= endTime) {
        categories.ongoing.push(event);
      } else {
        categories.past.push(event);
      }
    });

    setFilteredEvents(categories);
  };

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const searchFiltered = events.filter(event =>
      event.title?.toLowerCase().includes(q) ||
      event.about?.toLowerCase().includes(q) ||
      event.venue?.name?.toLowerCase().includes(q)
    );
    categorizeEvents(searchFiltered);
  }, [searchQuery, events]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString?.replace(' ', 'T') || 0);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + " • " + date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusStyles = (category) => {
    switch (category) {
      case 'upcoming':
        return { badge: "bg-[#a7f3d0] text-teal-900", line: "bg-[#a7f3d0]", label: "UPCOMING" };
      case 'ongoing':
        return { badge: "bg-[#0b1120] text-white", line: "bg-[#0b1120]", label: "ONGOING" };
      case 'past':
        return { badge: "bg-gray-200 text-gray-700", line: "bg-gray-200", label: "PAST" };
      default:
        return { badge: "bg-gray-100", line: "bg-gray-100", label: "" };
    }
  };

  const EventCard = ({ event, category }) => {
    const styles = getStatusStyles(category);
    return (
      <div
        onClick={() => navigate(`/events/${event.eventId}`)}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-gray-100"
      >
        {/* Card Image / Banner */}
        <div className="h-56 relative overflow-hidden bg-slate-100">
          {event.eventUrl ? (
            <img
              src={event.eventUrl}
              alt={event.title || 'Event'}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <Calendar size={64} className="text-slate-300" />
            </div>
          )}
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          <span className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        <div className="p-6 relative flex-1 flex flex-col text-left">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.line}`} />
          <div className="pl-2 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
              <Calendar size={14} /> {formatDate(event.startTime)}
            </div>
            <h3 className="text-xl font-bold text-[#0b1120] mb-3 leading-tight group-hover:text-teal-700 transition-colors">
              {event.title || 'Untitled Event'}
            </h3>
            {event.about && (
              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{event.about}</p>
            )}
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-auto">
              <MapPin size={14} className="text-gray-400" /> {event.venue?.name || 'Unknown Location'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-left pb-24">
      
      {/* App.js එකෙන් Navbar එක ඉබේම එනවා */}

      {/* 1. Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-8 text-center relative overflow-hidden">
        {/* Subtle background glow/shape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">University Events</h1>
          <p className="text-slate-300 md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Explore a vibrant landscape of academic excellence, cultural diversity, and sporting prowess at the University of Ruhuna.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-4 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search events by name, keyword, or society..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 rounded-full pl-14 pr-6 py-4 focus:outline-none focus:border-teal-500 focus:bg-slate-800 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. Events Grid Section */}
      <main className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
        
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-20 flex flex-col items-center justify-center text-slate-600">
            <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
            <p className="font-bold tracking-widest uppercase text-xs">Discovering university events...</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Ongoing Events */}
            {filteredEvents.ongoing.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-teal-700 tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
                  Ongoing Now <div className="h-[1px] bg-teal-100 flex-1"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.ongoing.map(event => (
                    <EventCard event={event} category="ongoing" />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Events */}
            <section>
              <h2 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
                Upcoming Events <div className="h-[1px] bg-slate-200 flex-1"></div>
              </h2>
              {filteredEvents.upcoming.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.upcoming.map(event => (
                    <EventCard event={event} category="upcoming" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                  <p className="text-sm">No upcoming events found at the moment.</p>
                </div>
              )}
            </section>

            {/* Past Events */}
            {filteredEvents.past.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
                  Past Events <div className="h-[1px] bg-slate-200 flex-1"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.past.map(event => (
                    <EventCard event={event} category="past" />
                  ))}
                </div>
              </section>
            )}

            {events.length === 0 && !loading && (
              <div className="bg-white rounded-2xl shadow-sm p-20 flex flex-col items-center justify-center text-center text-slate-500 border border-gray-100">
                <Calendar size={48} className="text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No Events Found</h3>
                <p className="text-sm max-w-xs mx-auto mt-2">We couldn't find any approved events for you. Please check back later.</p>
              </div>
            )}

          </div>
        )}

        <div className="mt-16 flex justify-center pb-12">
          {filteredEvents.upcoming.length > 6 || filteredEvents.past.length > 6 ? (
            <button className="bg-[#0b1120] hover:bg-slate-800 text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-900/20">
              Load More Events <ChevronDown size={18} />
            </button>
          ) : null}
        </div>
      </main>

      {/* Footer එක App.jsx එකෙන් ඉබේම එනවා */}

    </div>
  );
};

export default Events;