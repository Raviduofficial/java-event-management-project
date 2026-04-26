import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { MapPin, Users, Building, ArrowLeft, Calendar, Wind } from 'lucide-react';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await api.get(`/api/venues/${id}`, { withCredentials: true });
        setVenue(res.data.data);
      } catch (error) {
        console.error("Failed to fetch venue details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-sans tracking-wide">Loading detailed facility metrics...</div>;
  }

  if (!venue) {
    return <div className="min-h-screen flex items-center justify-center font-sans">We couldn't locate this venue. It may have been removed.</div>;
  }

  let capacity = venue.capacity || 'N/A';
  let description = venue.description;
  if (description && description.includes('|||')) {
    const parts = description.split('|||');
    if (capacity === 'N/A' || capacity === 0) capacity = parts[0];
    description = parts.slice(1).join('|||');
  }

  return (
    <div className="bg-[#fafafa] font-sans text-left min-h-screen pb-20">
      <main className="max-w-4xl mx-auto p-8 mt-4">
        
        <button 
          onClick={() => navigate('/venues')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-teal-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Venues Dashboard
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          
          <div
            className="h-64 relative w-full bg-slate-800"
            style={venue.venueUrl ? { backgroundImage: `url(${venue.venueUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute top-6 right-6">
              <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-lg ${venue.isBooked ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {venue.isBooked ? 'Currently Occupied' : 'Open for Reservations'}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 leading-tight">{venue.name}</h1>
              <p className="text-slate-300 font-medium flex items-center gap-2">
                <MapPin size={16} className="text-teal-400" /> {venue.location}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              <div className="md:col-span-2 space-y-10">
                <section>
                  <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-4 border-l-4 border-teal-600 pl-3">Facility Overview</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-wrap">
                    {description || 'No detailed layout or technological specifications are available for this facility yet. Contact the administration desk for deep logistics planning.'}
                  </p>
                </section>
                
                <section>
                  <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-4 border-l-4 border-teal-600 pl-3">Key Logistics</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <MapPin size={18} className="text-teal-600" />
                       <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Campus Sector</p>
                         <p className="text-sm font-semibold text-slate-800">{venue.location}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Users size={18} className="text-teal-600" />
                       <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Occupancy</p>
                         <p className="text-sm font-semibold text-slate-800">{capacity} Passengers</p>
                       </div>
                    </div>
                  </div>
                </section>

                {venue.facilities && venue.facilities.length > 0 && (
                  <section>
                    <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-4 border-l-4 border-teal-600 pl-3">Built-in Facilities</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {venue.facilities.map((f, i) => (
                        <div key={i} className="bg-teal-50 border border-teal-100 px-4 py-2 rounded-lg text-teal-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                          <Wind size={12} className="text-teal-500" /> {f}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>

              <div className="space-y-6">
                <div className="bg-[#0b1120] rounded-2xl p-6 text-center text-white relative overflow-hidden shadow-lg border border-slate-700/50">
                   <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                   <Calendar size={32} className="mx-auto text-teal-400 mb-4" />
                   <h4 className="font-bold text-lg mb-2">Book this Locale</h4>
                   <p className="text-xs text-slate-400 mb-6 px-2 leading-relaxed">Direct bookings are handled via the coordinator network to avoid scheduling overlaps.</p>
                   <button 
                     disabled={venue.isBooked}
                     className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-gray-500 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors"
                   >
                     {venue.isBooked ? 'Currently Occupied' : 'Initiate Request'}
                   </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default VenueDetails;
