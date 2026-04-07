import React from 'react';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';

const Events = () => {

  // Events Mock Data
  const eventsData = [
    {
      id: 1,
      title: "International Research Symposium 2024",
      date: "OCT 24, 2024 • 09:00 AM",
      location: "Rabindranath Tagore Auditorium",
      status: "UPCOMING",
      statusBadge: "bg-[#a7f3d0] text-teal-900", // Mint green
      accentLine: "bg-[#a7f3d0]",
      imgBg: "bg-[#d4a373]" // Image placeholder color
    },
    {
      id: 2,
      title: "Cultural Night: Melodies of Ruhuna",
      date: "TODAY • 02:00 PM",
      location: "Main University Premises",
      status: "ONGOING",
      statusBadge: "bg-[#0b1120] text-white", // Dark/Black
      accentLine: "bg-[#0b1120]",
      imgBg: "bg-blue-900" 
    },
    {
      id: 3,
      title: "Annual Inter-Faculty Sports Meet",
      date: "NOV 12, 2024 • 08:30 AM",
      location: "University Sports Grounds",
      status: "UPCOMING",
      statusBadge: "bg-[#a7f3d0] text-teal-900",
      accentLine: "bg-[#a7f3d0]",
      imgBg: "bg-green-700" 
    },
    {
      id: 4,
      title: "Workshop: Advanced Python for Data Science",
      date: "OCT 10, 2024 • 10:00 AM",
      location: "Computer Science Lab 03",
      status: "PAST",
      statusBadge: "bg-gray-200 text-gray-700", // Gray
      accentLine: "bg-gray-200",
      imgBg: "bg-teal-800" 
    },
    {
      id: 5,
      title: "General Convocation 2024",
      date: "DEC 15, 2024 • 08:00 AM",
      location: "Main Hall, Ruhuna Campus",
      status: "UPCOMING",
      statusBadge: "bg-[#a7f3d0] text-teal-900",
      accentLine: "bg-[#a7f3d0]",
      imgBg: "bg-slate-700" 
    },
    {
      id: 6,
      title: "Innovation Hub: Pitch Your Startup",
      date: "OCT 30, 2024 • 01:30 PM",
      location: "Faculty of Management & Finance",
      status: "UPCOMING",
      statusBadge: "bg-[#a7f3d0] text-teal-900",
      accentLine: "bg-[#a7f3d0]",
      imgBg: "bg-indigo-100" 
    }
  ];

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
              className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 rounded-full pl-14 pr-6 py-4 focus:outline-none focus:border-teal-500 focus:bg-slate-800 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. Events Grid Section */}
      <main className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-gray-100">
              
              {/* Card Image Area */}
              <div className={`h-56 ${event.imgBg} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                {/* Status Badge */}
                <span className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${event.statusBadge}`}>
                  {event.status}
                </span>
              </div>
              
              {/* Card Content Area */}
              <div className="p-6 relative flex-1 flex flex-col">
                {/* Colored Left Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${event.accentLine}`}></div>
                
                <div className="pl-2 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                    <Calendar size={14} /> {event.date}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0b1120] mb-6 leading-tight group-hover:text-teal-700 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-auto">
                    <MapPin size={14} className="text-gray-400" /> {event.location}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 3. Load More Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-[#0b1120] hover:bg-slate-800 text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-900/20">
            Load More Events <ChevronDown size={18} />
          </button>
        </div>
      </main>

      {/* Footer එක App.jsx එකෙන් ඉබේම එනවා */}

    </div>
  );
};

export default Events;