import React from 'react';
import { 
  ChevronRight, Share2, Pencil, CheckCircle2, Building, Users, 
  Calendar, Clock, MapPin, Download, FileText, Globe, Mail, 
  MonitorPlay, Printer, Image as ImageIcon, Video, Ticket, Mic, HeartHandshake, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const navigate = useNavigate();
  
  // ලොග් වෙලා ඉන්න කෙනාගේ විස්තර ගන්නවා (Manage button එක පෙන්වන්න)
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const canManage = user && (user.role === 'admin' || user.role === 'coordinator');

  return (
    <div className="bg-[#f8fafc] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* 1. Top Bar (Breadcrumbs & Actions) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 tracking-wide">
            <span onClick={() => navigate('/')} className="hover:text-teal-700 cursor-pointer transition-colors">Home</span>
            <ChevronRight size={14} />
            <span onClick={() => navigate('/events')} className="hover:text-teal-700 cursor-pointer transition-colors">Events</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-bold">Annual Tech Symposium 2024</span>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
              <Share2 size={16} /> Share
            </button>
            
            {/* 🚀 Admin/Coordinator ට විතරක් පේන Manage Button එක */}
            {canManage && (
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                <Pencil size={16} /> Manage
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Image & Title */}
            <div>
              <div className="relative h-64 md:h-80 bg-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
                {/* Image Placeholder (ඇත්ත පින්තූරය මෙතනට එන්න ඕනේ) */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <h1 className="text-5xl font-bold text-slate-300 opacity-50 tracking-widest uppercase">Event</h1>
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 size={14} /> Approved
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1120] mb-4 tracking-tight">Annual Tech Symposium 2024</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-teal-700">
                <div className="flex items-center gap-2"><Building size={16} className="text-teal-500" /> Faculty of Engineering</div>
                <div className="flex items-center gap-2"><Users size={16} className="text-teal-500" /> 250+ Participants Expected</div>
              </div>
            </div>

            {/* About the Event */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-4">About the Event</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The Annual Tech Symposium 2024 at the University of Ruhuna brings together the brightest minds in engineering, computer science, and innovation. This year's theme, "Sustainable Frontiers," focuses on how technology can solve pressing environmental challenges.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Featuring keynote speeches from industry leaders, hands-on workshops on AI and IoT, and a project exhibition highlighting the best student innovations from across the faculty.
              </p>
              <ul className="space-y-3 text-sm text-gray-700 font-medium ml-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Keynote: The Future of Renewable Energy Tech</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Startup Pitch Competition</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Interactive Coding Hackathon</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Networking Gala Dinner</li>
              </ul>
            </div>

            {/* Event Agenda */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <Clock className="text-teal-600" size={20} /> Event Agenda
              </h3>
              
              <div className="border-l-2 border-gray-100 ml-3 space-y-8">
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-teal-500 rounded-full"></div>
                  <h4 className="text-teal-600 font-bold text-xs mb-1">08:30 AM - 09:15 AM</h4>
                  <h5 className="font-bold text-slate-800 text-sm">Registration & Welcome Refreshments</h5>
                  <p className="text-xs text-gray-500 mt-1">Attendees collect delegate kits and badges at the main entrance foyer.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-teal-500 rounded-full"></div>
                  <h4 className="text-teal-600 font-bold text-xs mb-1">09:15 AM - 10:00 AM</h4>
                  <h5 className="font-bold text-slate-800 text-sm">Opening Ceremony</h5>
                  <p className="text-xs text-gray-500 mt-1">Lighting of the traditional oil lamp and welcome address by the Dean of Engineering.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-teal-500 rounded-full"></div>
                  <h4 className="text-teal-600 font-bold text-xs mb-1">10:00 AM - 11:30 AM</h4>
                  <h5 className="font-bold text-slate-800 text-sm">Keynote: Sustainable Frontiers</h5>
                  <p className="text-xs text-gray-500 mt-1">Lead by industry experts on the role of AI in environmental conservation.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                  <h4 className="text-gray-400 font-bold text-xs mb-1">01:00 PM - 02:00 PM</h4>
                  <h5 className="font-bold text-slate-800 text-sm">Networking Lunch</h5>
                  <p className="text-xs text-gray-500 mt-1">Complimentary lunch served at the Faculty Dining Hall.</p>
                </div>
              </div>
            </div>

            {/* Permission Letter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-teal-600" size={20} /> Permission Letter
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200 text-teal-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">VC_Approval_Draft.pdf</p>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">Official university approval for the event</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>

            {/* Budget & Sponsorships */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <BanknoteIcon className="text-teal-600" size={20} /> Budget & Sponsorships
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Expense Breakdown</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Venue & Logistics</span> <span>LKR 45,000</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="w-[60%] h-full bg-teal-500"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Catering</span> <span>LKR 35,000</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="w-[45%] h-full bg-blue-500"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Marketing & Swag</span> <span>LKR 20,000</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="w-[30%] h-full bg-orange-400"></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Sponsorship Status</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-2">🥇 Gold Tier</span>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">3 Secured</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-2">🥈 Silver Tier</span>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">5 Secured</span>
                    </div>
                  </div>
                  <p className="text-center text-[10px] font-medium text-gray-400 italic">Goal: LKR 120,000 | Current: LKR 105,000</p>
                </div>
              </div>
            </div>

            {/* Marketing & Promotion */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#0b1120] mb-6 flex items-center gap-2">
                <Mic className="text-teal-600" size={20} /> Marketing & Promotion
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Active Channels</p>
                  <ul className="space-y-4 text-xs font-medium text-slate-600">
                    <li className="flex items-center gap-3"><Globe size={16} className="text-teal-500" /> Official Faculty Social Media (FB, IG)</li>
                    <li className="flex items-center gap-3"><Mail size={16} className="text-teal-500" /> Weekly Newsletter to Undergraduates</li>
                    <li className="flex items-center gap-3"><MonitorPlay size={16} className="text-teal-500" /> Digital Signage in Main Library & Cafeteria</li>
                    <li className="flex items-center gap-3"><Printer size={16} className="text-teal-500" /> Physical Posters across Faculty Buildings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Promotional Materials</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl h-24 flex flex-col items-center justify-center text-gray-400 hover:border-teal-400 hover:text-teal-600 transition-colors cursor-pointer">
                      <ImageIcon size={20} className="mb-2" />
                      <span className="text-[9px] font-bold tracking-widest uppercase">Poster.pdf</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl h-24 flex flex-col items-center justify-center text-gray-400 hover:border-teal-400 hover:text-teal-600 transition-colors cursor-pointer">
                      <Video size={20} className="mb-2" />
                      <span className="text-[9px] font-bold tracking-widest uppercase">Teaser.mp4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#0b1120] mb-5 flex items-center gap-2">
                <Calendar className="text-teal-600" size={16} /> Event Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0"><Calendar size={14} /></div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-slate-800">October 25, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0"><Clock size={14} /></div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-bold text-slate-800">09:00 AM - 04:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0"><MapPin size={14} /></div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Venue</p>
                    <p className="text-sm font-bold text-slate-800">Main Auditorium, Ruhuna Campus</p>
                    <p className="text-[10px] text-gray-500">Hapugala, Galle</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-32 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                 <div className="w-10 h-10 bg-[#0b1120] text-teal-400 rounded-full flex items-center justify-center shadow-lg relative z-10">
                   <MapPin size={18} />
                 </div>
              </div>
            </div>

            {/* Organizing Committee */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#0b1120] mb-5 flex items-center gap-2">
                <Users className="text-teal-600" size={16} /> Organizing Committee
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">KP</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Kasun Perera</p>
                    <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Event Chairperson</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">TS</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Tharushi Silva</p>
                    <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Secretary</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">DB</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Dinuka Bandara</p>
                    <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Treasurer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organized By */}
            <div className="bg-[#0b1120] rounded-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/20 rounded-full blur-xl pointer-events-none"></div>
              <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2 relative z-10">
                <CheckCircle2 className="text-teal-400" size={16} /> Organized By
              </h3>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Engineering Student Council</p>
                  <p className="text-[10px] text-slate-400">University of Ruhuna</p>
                </div>
              </div>
              <button className="w-full bg-teal-700 hover:bg-teal-600 text-white py-2.5 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 relative z-10">
                <Mail size={14} /> Contact Organizer
              </button>
            </div>

          </div>
        </div>

        {/* 4. Bottom Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <Ticket className="text-teal-500 mb-2" size={24} />
            <h3 className="text-2xl font-extrabold text-[#0b1120]">150</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Tickets Sold</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <Mic className="text-teal-500 mb-2" size={24} />
            <h3 className="text-2xl font-extrabold text-[#0b1120]">12</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Speakers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <HeartHandshake className="text-teal-500 mb-2" size={24} />
            <h3 className="text-2xl font-extrabold text-[#0b1120]">8</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Sponsors</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <Eye className="text-teal-500 mb-2" size={24} />
            <h3 className="text-2xl font-extrabold text-[#0b1120]">1.2k</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Views</p>
          </div>
        </div>

      </main>
    </div>
  );
};

// Simple inline component for the Banknote icon since it's sometimes missing in older lucide versions
const BanknoteIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

export default EventDetails;