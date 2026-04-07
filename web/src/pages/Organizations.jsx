import React from 'react';
import { 
  Search, ChevronDown, ChevronRight,
  Settings, Book, Star, Home as HomeIcon, 
  Activity, Heart, Users, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Organizations = () => {
  const navigate = useNavigate();

  // Organization Data Array
  const orgs = [
    {
      id: 1,
      name: 'Engineering Student Council',
      faculty: 'FACULTY OF ENGINEERING',
      desc: 'The representative body for all engineering students, focusing on...',
      members: '1,250',
      events: '5 Upcoming',
      bgGradient: 'bg-gradient-to-br from-teal-700 to-teal-900',
      iconColor: 'text-teal-800',
      Icon: Settings
    },
    {
      id: 2,
      name: 'Science Faculty Society',
      faculty: 'FACULTY OF SCIENCE',
      desc: 'Promoting scientific inquiry and organizing annual research...',
      members: '840',
      events: '3 Upcoming',
      bgGradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-600',
      Icon: Book
    },
    {
      id: 3,
      name: 'Arts & Culture Council',
      faculty: 'FACULTY OF HUMANITIES',
      desc: 'The hub for creativity, traditional dance, drama, and contemporary a...',
      members: '420',
      events: '12 Upcoming',
      bgGradient: 'bg-gradient-to-br from-orange-400 to-yellow-500',
      iconColor: 'text-orange-500',
      Icon: Star
    },
    {
      id: 4,
      name: 'Management Society',
      faculty: 'FACULTY OF MANAGEMENT',
      desc: 'Empowering future leaders through industry networking and corporate...',
      members: '650',
      events: '2 Upcoming',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
      iconColor: 'text-blue-600',
      Icon: HomeIcon
    },
    {
      id: 5,
      name: 'University Sports Club',
      faculty: 'GENERAL BODY',
      desc: 'Organizing inter-faculty tournaments and promoting physical health...',
      members: '2,100',
      events: '8 Upcoming',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-fuchsia-600',
      iconColor: 'text-purple-600',
      Icon: Activity
    },
    {
      id: 6,
      name: 'Medical Students Union',
      faculty: 'FACULTY OF MEDICINE',
      desc: 'Representing the interests of medical students and organizing...',
      members: '980',
      events: '4 Upcoming',
      bgGradient: 'bg-gradient-to-br from-red-500 to-pink-600',
      iconColor: 'text-red-500',
      Icon: Heart
    },
    {
      id: 7,
      name: 'Agriculture Students Society',
      faculty: 'FACULTY OF AGRICULTURE',
      desc: 'Advancing agricultural innovation and sustainable farming technique...',
      members: '540',
      events: '1 Upcoming',
      bgGradient: 'bg-gradient-to-br from-orange-500 to-amber-600',
      iconColor: 'text-orange-600',
      Icon: Users
    }
  ];

  const filters = ['Engineering', 'Science', 'Humanities', 'Management'];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-left">
      
      {/* Navbar එක App.jsx එකෙන් එනවා */}

      <main className="max-w-7xl mx-auto p-8 mt-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0e1b35] mb-2">Organizations Overview</h1>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">Connect with faculty societies, student councils, and interest-based clubs. Discover upcoming events and become an active member of our vibrant community.</p>
        </header>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search organizations by name or keyword..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <span className="text-sm text-gray-500 mr-2 whitespace-nowrap">Filter by:</span>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-sm">
              All Categories
            </button>
            {filters.map((filter) => (
              <button key={filter} className="bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100 whitespace-nowrap transition-colors">
                {filter} <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {orgs.map((org) => (
            <div key={org.id} onClick={() => navigate('/organization-overview')} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
              <div className={`h-36 ${org.bgGradient} relative flex items-center justify-center`}>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {/* Icon එක ආරක්ෂිතව පෙන්වමු */}
                  {org.Icon && <org.Icon className={org.iconColor} size={28} />}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-[#0e1b35] text-lg mb-1 leading-tight">{org.name}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${org.iconColor}`}>{org.faculty}</p>
                <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed">{org.desc}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-gray-400 mb-0.5">Members</p>
                      <p className="text-sm font-bold text-[#0e1b35]">{org.members}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 mb-0.5">Events</p>
                      <p className="text-sm font-bold text-emerald-500">{org.events}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Organization Card */}
          <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-emerald-400 transition-colors cursor-pointer group min-h-[350px]">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
              <Plus size={24} />
            </div>
            <h3 className="font-bold text-[#0e1b35] text-lg mb-2">Can't find your society?</h3>
            <p className="text-xs text-gray-500 mb-6 px-4">Submit a request to register a new student organization or society.</p>
            <button className="bg-gray-200 text-[#0e1b35] px-6 py-2 rounded-lg text-sm font-bold hover:bg-emerald-500 hover:text-white transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer එක App.jsx එකෙන් එනවා */}

    </div>
  );
};

export default Organizations;