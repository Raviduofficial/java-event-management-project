import React from 'react';
import { 
  Filter, Grid, MapPin, Users, Wifi, 
  Wind, Coffee, Monitor, Zap, Mic, ArrowRight, Star
} from 'lucide-react';

const Venues = () => {

  const venues = [
    {
      id: 1,
      name: 'Premium Faculty Lounge',
      desc: 'Ideal for departmental meetings, VIP receptions, and executive networking events.',
      status: 'AVAILABLE',
      statusColor: 'bg-emerald-100 text-emerald-700',
      price: 'Rs. 5,000 /hr',
      capacity: '40',
      features: [<Coffee size={14} />, 'Catering', <Monitor size={14} />, '4K Display'],
      rating: '4.9',
      imgBg: 'bg-slate-700' // Placeholder for image
    },
    {
      id: 2,
      name: 'Athletic Multi-Ground',
      desc: 'Our flagship outdoor arena for tournaments, annual sports meets, and large concerts.',
      status: 'RESERVED',
      statusColor: 'bg-red-100 text-red-700',
      price: 'Contact For Rates',
      capacity: '5000+',
      features: [<Zap size={14} />, 'Night Lights', <Users size={14} />, 'Pavilion'],
      rating: '4.7',
      imgBg: 'bg-emerald-800' // Placeholder for image
    },
    {
      id: 3,
      name: 'Science Lecture Hall 01',
      desc: 'Formal lecture environment with high-tier audio-visual capabilities for academic seminars.',
      status: 'AVAILABLE',
      statusColor: 'bg-emerald-100 text-emerald-700',
      price: 'Rs. 2,500 /hr',
      capacity: '250',
      features: [<Mic size={14} />, 'Sound Sys', <Wifi size={14} />, 'Wireless Cast'],
      rating: '4.8',
      imgBg: 'bg-amber-900' // Placeholder for image
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Featured Hero Card */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer h-[400px]">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-red-900 bg-opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-teal-400 text-[#0b1120] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </span>
                <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
                  <MapPin size={12} /> Administration Block
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Rabindranath Tagore Memorial <br className="hidden md:block" /> Auditorium
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
                <div className="flex items-center gap-2"><Users size={16} className="text-teal-400"/> 1,500 Seats</div>
                <div className="flex items-center gap-2"><Wifi size={16} className="text-teal-400"/> Fiber Optic</div>
                <div className="flex items-center gap-2"><Wind size={16} className="text-teal-400"/> Fully AC</div>
              </div>
            </div>
          </div>

          {/* Quick Reservation Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col relative overflow-hidden">
             {/* Left green bar */}
             <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-700"></div>
             
             <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Quick Reservation</h3>
             <p className="text-sm text-gray-500 mb-6">Checking live availability for today, October 24th.</p>

             <div className="space-y-4 flex-1">
               <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <span className="text-sm font-bold text-gray-700">Faculty Board Room</span>
                 <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Available</span>
               </div>
               <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <span className="text-sm font-bold text-gray-700">Science Lecture Hall</span>
                 <span className="bg-red-100 text-red-700 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Booked</span>
               </div>
               <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <span className="text-sm font-bold text-gray-700">Senate Hall</span>
                 <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Available</span>
               </div>
             </div>

             <button className="w-full bg-[#0b1120] hover:bg-slate-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors mt-6">
               View All Calendars
             </button>
          </div>
        </div>

        {/* 3. Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col cursor-pointer">
              
              {/* Image Section */}
              <div className={`h-48 ${venue.imgBg} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-[#1a1a1a] shadow-sm">
                  <Star size={12} className="text-amber-500 fill-amber-500" /> {venue.rating}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-lg text-[#1a1a1a] leading-tight">{venue.name}</h3>
                  <span className={`${venue.statusColor} text-[8px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap`}>
                    {venue.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-1">{venue.desc}</p>
                
                {/* Features Row */}
                <div className="flex items-center gap-4 text-xs font-medium text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-1.5"><Users size={14} className="text-gray-400"/> {venue.capacity}</div>
                  <div className="flex items-center gap-1.5">{venue.features[0]} {venue.features[1]}</div>
                  <div className="flex items-center gap-1.5">{venue.features[2]} {venue.features[3]}</div>
                </div>

                {/* Footer Row */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#1a1a1a] text-sm">{venue.price}</span>
                  <button className="text-teal-600 hover:text-teal-800 text-xs font-bold flex items-center gap-1 transition-colors">
                    Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Call to Action Banner */}
        <div className="bg-[#0b1120] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
          {/* Subtle background pattern/shape */}
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
    </div>
  );
};

export default Venues;