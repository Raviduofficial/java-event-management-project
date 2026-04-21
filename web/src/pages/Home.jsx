import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, ChevronLeft, ChevronRight, Clock, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events");
        const allEvents = response.data.data || [];
        const approvedEvents = allEvents.filter(event => event.status === 'APPROVED');
        setEvents(approvedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const padding = Array.from({ length: startDay }, (_, i) => null);

  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(event => {
      const eventDate = new Date(event.startTime.replace(' ', 'T'));
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  const isPastEvent = (event) => {
    const now = new Date();
    const startTime = new Date(event.startTime.replace(' ', 'T'));
    return now > startTime;
  };

  const upcomingEvents = events
    .filter(e => new Date(e.startTime.replace(' ', 'T')) >= new Date())
    .sort((a, b) => new Date(a.startTime.replace(' ', 'T')) - new Date(b.startTime.replace(' ', 'T')))
    .slice(0, 3);

  const todayEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.startTime.replace(' ', 'T'));
    return eventDate.getDate() === now.getDate() &&
           eventDate.getMonth() === now.getMonth() &&
           eventDate.getFullYear() === now.getFullYear();
  });

  const formatTime = (dateString) => {
    return new Date(dateString.replace(' ', 'T')).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isToday = (day) => {
    const now = new Date();
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen text-left">
      {/* 1. Dark Hero Header */}
      <div className="bg-[#0e1b35] pt-12 pb-24 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Dashboard</h1>
            <p className="text-slate-400 text-sm max-w-md">Stay updated with the latest university happenings, schedules, and featured spotlights.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl text-right">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p className="text-xl font-bold text-white leading-none">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col transition-all">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 font-bold text-[#0e1b35] text-xl">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Calendar size={22} />
                </div>
                Event Calendar
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button onClick={prevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-emerald-600"><ChevronLeft size={18} /></button>
                <span className="min-w-36 text-center text-xs font-bold text-slate-700 uppercase tracking-widest">{monthName} {year}</span>
                <button onClick={nextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-emerald-600"><ChevronRight size={18} /></button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-400 font-black mb-6 uppercase tracking-[0.1em]">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm">
              {[...padding, ...days].map((day, i) => {
                const dayEvents = getEventsForDay(day);
                const hasPastEvent = dayEvents.some(isPastEvent);
                const today = day && isToday(day);
                
                return (
                  <div key={i} className={`p-2 min-h-[105px] text-right bg-white transition-colors duration-200
                    ${day ? 'hover:bg-slate-50/50' : 'bg-slate-50/30'}
                    ${today ? 'bg-emerald-50/40 relative' : ''}
                  `}>
                    {today && <div className="absolute top-0 right-0 w-1 h-1 bg-emerald-500 rounded-full m-2"></div>}
                    {day && (
                      <>
                        <span className={`text-xs font-black ${today ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {day.toString().padStart(2, '0')}
                        </span>
                        <div className="mt-2 flex flex-col gap-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div 
                              key={event.eventId} 
                              onClick={() => navigate(`/events/${event.eventId}`)}
                              className={`text-[9px] px-2 py-1.5 rounded-lg leading-tight truncate cursor-pointer transition-all border font-medium
                                ${isPastEvent(event) ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'}
                              `}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[8px] text-slate-400 font-bold pr-1 pt-1 tracking-tighter">+{dayEvents.length - 2} MORE</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-[#0e1b35] p-8 rounded-3xl shadow-lg text-white relative overflow-hidden grow-0">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mb-8"></div>
              <Calendar className="text-emerald-400 mb-4" size={24} />
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Upcoming events</p>
              <h3 className="text-5xl font-black">{events.filter(e => !isPastEvent(e)).length}</h3>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 flex-1 flex flex-col">
              <h4 className="text-sm font-black mb-8 flex items-center gap-2 text-[#0e1b35] uppercase tracking-wider">
                <Clock className="text-emerald-500" size={18} /> Today's Schedule
              </h4>
              <div className="space-y-8 flex-1">
                {todayEvents.length > 0 ? todayEvents.map(event => (
                  <div key={event.eventId} className="flex gap-5 border-l-2 border-emerald-500 pl-5 py-0.5 hover:bg-slate-50 transition-colors rounded-r-xl cursor-pointer" onClick={() => navigate(`/events/${event.eventId}`)}>
                    <div className="text-[10px] font-black text-emerald-600 w-16 pt-1 tracking-tight">{formatTime(event.startTime)}</div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0e1b35] line-clamp-1 leading-snug">{event.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 font-bold uppercase tracking-tighter"><MapPin size={11} className="text-emerald-500/50" /> {event.venue?.name || 'Main Hall'}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic">No events today</p>
                  </div>
                )}
              </div>
              <button 
                onClick={() => navigate('/events')}
                className="w-full mt-10 py-4 bg-[#0e1b35] hover:bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
              >
                Full Catalogue <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Curated for you</p>
              <h2 className="text-3xl font-extrabold text-[#0e1b35] tracking-tight">Upcoming Spotlights</h2>
            </div>
            <button 
              onClick={() => navigate('/events')}
              className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              See all events <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-slate-200/60 shadow-sm"></div>
              ))
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div 
                  key={event.eventId} 
                  onClick={() => navigate(`/events/${event.eventId}`)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group cursor-pointer"
                >
                  <div className="h-52 relative overflow-hidden">
                    {event.eventUrl ? (
                      <img 
                        src={event.eventUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0e1b35] flex items-center justify-center">
                        <Calendar size={56} className="text-white/5 rotate-12" />
                      </div>
                    )}
                    <div className="absolute top-5 left-5">
                       <span className="bg-emerald-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                         UPCOMING
                       </span>
                    </div>
                  </div>
                  <div className="p-8 relative flex-1 flex flex-col text-left">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                    <div className="pl-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.1em]">
                          <Calendar size={14} className="text-emerald-500/50" /> {formatDateShort(event.startTime)}
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0e1b35] mb-5 leading-tight group-hover:text-emerald-700 transition-colors">{event.title}</h3>
                        <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-slate-500 pt-5 border-t border-slate-50 uppercase tracking-tighter">
                          <MapPin size={15} className="text-emerald-500" /> {event.venue?.name || 'Campus Grounds'}
                        </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 bg-white rounded-3xl border border-dashed border-slate-200 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Calendar size={32} className="text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No upcoming events scheduled</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

