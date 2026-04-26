import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { 
  Filter, Grid, MapPin, Users, Wifi, 
  Wind, Coffee, Monitor, Zap, Mic, ArrowRight, Star, Building
} from 'lucide-react';

const Venues = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await api.get('/api/venues', { withCredentials: true });
        setVenues(res.data.data);
      } catch (error) {
        console.error("Error fetching venues", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="bg-[#fafafa] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold text-teal-700 tracking-widest uppercase mb-2">Campus Facilities</p>
            <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">University Venues</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Discover and reserve world-class spaces for your next event. From grand auditoriums to intimate meeting lounges, our campus offers the perfect setting for academic and social excellence.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filters
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 p-2.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Grid size={18} />
            </button>
          </div>
        </div>

        {/* 2. Featured Venue & Quick Reservation (Top Grid) */}
        {!loading && venues.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            <div 
              onClick={() => navigate(`/venues/${venues[0].venueId}`)}
              className="lg:col-span-2 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer h-[400px]"
            >
              <div 
                className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-700"
                style={venues[0].venueUrl ? { backgroundImage: `url(${venues[0].venueUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-teal-400 text-[#0b1120] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <MapPin size={12} /> {venues[0].location}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {venues[0].name}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
                  {venues[0].capacity > 0 && (
                    <div className="flex items-center gap-2"><Users size={16} className="text-teal-400"/> {venues[0].capacity} Passengers</div>
                  )}
                  {venues[0].facilities && venues[0].facilities.length > 0 && (
                     <div className="flex items-center gap-2"><Wind size={16} className="text-teal-400"/> {venues[0].facilities[0]}</div>
                  )}
                  <div className="flex items-center gap-2"><Building size={16} className="text-teal-400"/> Campus Facility</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
               <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Quick Availability</h3>
               <p className="text-sm text-gray-500 mb-6">Current status of active venues</p>

               <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                 {venues.slice(0, 4).map(v => (
                   <div key={`quick-${v.venueId}`} onClick={() => navigate(`/venues/${v.venueId}`)} className="cursor-pointer hover:bg-gray-100 transition-colors flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <span className="text-sm font-bold text-gray-700 line-clamp-1 mr-2">{v.name}</span>
                     <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap ${v.isBooked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                       {v.isBooked ? 'Booked' : 'Available'}
                     </span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* 3. Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
             <p className="col-span-3 text-center py-10 text-gray-500">Loading venues...</p>
          ) : venues.length === 0 ? (
             <p className="col-span-3 text-center py-10 text-gray-500">No venues found in the system.</p>
          ) : venues.map((venue, i) => {
            
            let cap = venue.capacity || 'N/A';
            let desc = venue.description || '';
            if (desc.includes('|||')) {
              const parts = desc.split('|||');
              if(cap === 'N/A' || cap === 0) cap = parts[0];
              desc = parts.slice(1).join('|||');
            }

            return (
              <div key={venue.venueId} onClick={() => navigate(`/venues/${venue.venueId}`)} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col cursor-pointer">
                
                <div
                  className={`h-48 relative overflow-hidden ${!venue.venueUrl ? ['bg-slate-700', 'bg-emerald-800', 'bg-amber-900', 'bg-indigo-900'][i%4] : 'bg-slate-800'}`}
                  style={venue.venueUrl ? { backgroundImage: `url(${venue.venueUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-lg text-[#1a1a1a] leading-tight break-words">{venue.name}</h3>
                    <span className={`${venue.isBooked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'} text-[8px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap`}>
                      {venue.isBooked ? 'BOOKED' : 'AVAILABLE'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{desc}</p>
                  
                  <div className="flex flex-col gap-2 text-xs font-medium text-gray-600 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400"/> {venue.location}</div>
                    <div className="flex items-center gap-2"><Users size={14} className="text-gray-400"/> {cap} Passengers</div>
                  </div>

                  {venue.facilities && venue.facilities.length > 0 && (
                     <div className="mb-4 flex flex-wrap gap-1.5">
                       {venue.facilities.slice(0,3).map((f, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">{f}</span>
                       ))}
                     </div>
                  )}

                  <div className="flex justify-end items-center mt-auto">
                    <button className="text-teal-600 hover:text-teal-800 text-xs font-bold flex items-center gap-1 transition-colors">
                      View Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Call to Action Banner */}
        <div className="bg-[#0b1120] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-900/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Planning a large-scale event?</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Our events team can help you find the perfect combination of venues, equipment, and logistical support for your specific needs.
            </p>
          </div>
          <button className="relative z-10 bg-teal-700 hover:bg-teal-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 whitespace-nowrap">
            Request Custom Consultation
          </button>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default Venues;