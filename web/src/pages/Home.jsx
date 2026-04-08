import React, { useEffect } from 'react';
import { 
  Search, Calendar, MapPin, Filter, 
  ChevronLeft, ChevronRight, Clock
} from 'lucide-react';

const Home = () => {

   useEffect(() => {
    // Simple fetch request
    fetch('http://localhost:8080/test-json')
      .then((response) => response.json()) // Parse JSON
      .then((data) => console.log('Fetched data:', data)) // Log data
      .catch((error) => console.error('Error:', error)); // Handle errors
  }, []);

  // ඉස්සරහට Backend එකෙන් එන Data මේ විදියට තමයි තියාගන්නේ
  const eventData = [
    {
      id: 1,
      badge: 'ACADEMIC',
      title: 'Annual International Research Symposium 2024',
      date: 'October 24, 2024 • 09:00 AM',
      venue: 'Rabindranath Tagore Memorial Auditorium',
      bgClass: 'bg-gradient-to-br from-[#0a192f] to-[#112240]'
    },
    {
      id: 2,
      badge: 'CULTURAL',
      title: 'Ruhunu Cultural Night & Traditional Dance',
      date: 'November 12, 2024 • 06:30 PM',
      venue: 'Open Air Theatre, Wellamadama',
      bgClass: 'bg-[#409181]'
    },
    {
      id: 3,
      badge: 'CAREER',
      title: 'Graduate Career Fair & Industry Networking',
      date: 'December 05, 2024 • 10:00 AM',
      venue: 'Faculty of Science Gymnasium',
      bgClass: 'bg-[#2b5a5c]'
    }
  ];

  const categories = ['All Events', 'Academic', 'Cultural', 'Sports', 'Career', 'Workshops'];

  return (
    <div className="bg-[#f8fafc] font-sans text-left">
      
      {/* Navbar එක App.jsx එකෙන් එනවා */}

      <main className="max-w-7xl mx-auto p-8 mt-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0e1b35] mb-2">Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your event planning and academic schedule.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3 font-bold text-[#0e1b35] text-lg">
                <Calendar className="text-emerald-500" size={24} /> Event Calendar
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-[#0e1b35]">
                <ChevronLeft size={20} className="cursor-pointer hover:text-emerald-500" />
                <span>October 2024</span>
                <ChevronRight size={20} className="cursor-pointer hover:text-emerald-500" />
              </div>
            </div>
            
            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400 font-bold mb-4 uppercase tracking-wider">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-0 border-t border-l border-gray-100 rounded-lg overflow-hidden h-[300px]">
               {/* Simplified Days */}
               {[...Array(31)].map((_, i) => (
                 <div key={i} className={`p-3 border-r border-b border-gray-100 min-h-[60px] text-right text-sm font-medium text-gray-600
                    ${i === 23 ? 'bg-gray-50 border-b-4 border-b-[#0e1b35]' : ''} 
                    ${i === 14 ? 'border-4 border-emerald-500 bg-emerald-50/30' : ''}
                    ${i === 3 ? 'border-b-4 border-b-emerald-500' : ''}
                 `}>
                   {i + 1}
                 </div>
               ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center h-32 w-48">
              <Calendar className="text-emerald-500 mb-2" size={24} />
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Upcoming</p>
              <h3 className="text-4xl font-extrabold text-[#0e1b35]">12</h3>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex-1">
              <h4 className="text-sm font-bold mb-6 flex items-center gap-2 text-[#0e1b35]">
                <Clock className="text-emerald-500" size={18} /> Today's Schedule
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4 border-l-2 border-emerald-500 pl-4 py-1">
                   <div className="text-[11px] font-bold text-gray-500 w-16 pt-0.5">09:00 AM</div>
                   <div>
                     <p className="text-sm font-bold text-[#0e1b35]">Research Symposium Day 1</p>
                     <p className="text-[11px] text-gray-400 mt-1">Auditorium</p>
                   </div>
                </div>
                <div className="flex gap-4 border-l-2 border-gray-200 pl-4 py-1">
                   <div className="text-[11px] font-bold text-gray-500 w-16 pt-0.5">02:30 PM</div>
                   <div>
                     <p className="text-sm font-bold text-[#0e1b35]">Senate Meeting</p>
                     <p className="text-[11px] text-gray-400 mt-1">Board Room</p>
                   </div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 border border-gray-200 rounded-lg text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors">
                View All Reminders
              </button>
            </div>
          </div>
        </div>

        {/* Events Directory Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#0e1b35]">Events Directory</h2>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input type="text" placeholder="Search events by title, keyword" className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-xl bg-white flex items-center gap-2 text-sm text-[#0e1b35] font-bold hover:bg-gray-50">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          {/* Categories / Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <button key={cat} className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${cat === 'All Events' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {eventData.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className={`h-48 ${event.bgClass} relative flex items-center justify-center p-8`}>
                   <div className="absolute top-4 left-4 bg-[#0e1b35] text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md">
                     {event.badge}
                   </div>
                   <div className="border border-white/20 p-4 text-white/80 text-center rounded-lg backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                      <p className="font-serif text-xl tracking-wider opacity-50">PREVIEW</p>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-[#0e1b35] text-lg mb-4 line-clamp-2 leading-tight flex-1">{event.title}</h3>
                  <div className="space-y-3 text-[11px] text-gray-500 font-medium mb-6">
                    <div className="flex items-center gap-3"><Calendar size={16} className="text-emerald-500" /> {event.date}</div>
                    <div className="flex items-center gap-3"><MapPin size={16} className="text-emerald-500" /> {event.venue}</div>
                  </div>
                  <button className="w-full py-3 border-2 border-[#0e1b35] text-[#0e1b35] rounded-xl text-xs font-bold hover:bg-[#0e1b35] hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 mb-12">
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronLeft size={18}/></button>
            <button className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md">1</button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium transition-colors">2</button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium transition-colors">3</button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronRight size={18}/></button>
          </div>
        </section>
      </main>

      {/* Footer එක App.jsx එකෙන් එනවා */}

    </div>
  );
};

export default Home;