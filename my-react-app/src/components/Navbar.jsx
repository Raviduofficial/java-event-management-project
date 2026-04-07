import React from 'react';
import { Search, Bell, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  // 💡 Roles දෙකම අඳුරගන්නවා
  const isAdmin = user && user.role === 'admin';
  const isCoordinator = user && user.role === 'coordinator';

  // කවුද ලොග් වෙලා ඉන්නේ කියන එක අනුව යන Dashboard Path එක තීරණය කරනවා
  const dashboardPath = isAdmin ? '/admin-dashboard' : (isCoordinator ? '/coordinator-dashboard' : null);

  const isActive = (path) => location.pathname === path;

  // Logout Function එක
  const handleLogout = () => {
    localStorage.removeItem('loggedUser'); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-white border-b px-8 py-3 flex justify-between items-center sticky top-0 z-50 font-sans">
      <div className="flex items-center gap-12">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0e1b35] rounded-lg flex items-center justify-center text-white shadow-md">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="font-bold text-[#0e1b35] text-[17px] block leading-tight">University of Ruhuna</span>
            <span className="text-[10px] text-gray-500 font-medium">Event Management System</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 text-[14px] font-medium text-gray-500">
          <button 
            onClick={() => navigate('/')} 
            className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive('/') ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}
          >
            Home
          </button>

          {/* 🚀 Admin හෝ Coordinator කෙනෙක් නම් විතරක් Dashboard ලින්ක් එක පෙන්නනවා */}
          {(isAdmin || isCoordinator) && (
            <button 
              onClick={() => navigate(dashboardPath)} 
              className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive(dashboardPath) ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}
            >
              Dashboard
            </button>
          )}

          <button onClick={() => navigate('/events')} className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive('/events') ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}>Events</button>
          <button onClick={() => navigate('/organizations')} className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive('/organizations') || isActive('/organization-overview') ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}>Organizations</button>
          <button onClick={() => navigate('/venues')} className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive('/venues') || isActive('/add-venue') ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}>Venues</button>
          <button onClick={() => navigate('/about')} className={`hover:text-emerald-600 transition-colors pb-1 border-b-2 ${isActive('/about') ? 'text-emerald-600 border-emerald-500 font-bold' : 'border-transparent'}`}>About</button>
        </div>
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input type="text" placeholder="Quick search..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm outline-none w-64" />
        </div>

        <Bell className="text-gray-400 cursor-pointer hover:text-[#0e1b35]" size={20} />

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <button 
                onClick={() => dashboardPath ? navigate(dashboardPath) : null}
                className="w-9 h-9 rounded-full bg-teal-50 border-2 border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:bg-teal-100 transition-colors"
                title={dashboardPath ? "Go to Dashboard" : "Profile"}
              >
                 {user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U'}
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-lg border border-gray-200 hover:border-red-200"
                title="Sign Out"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#0e1b35] hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;