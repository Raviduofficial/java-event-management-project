import React from 'react';
import { ShieldCheck, Globe, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0e1629] text-white py-16 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => navigate('/')}>
             <ShieldCheck className="text-emerald-500" size={28} />
             <span className="font-bold text-lg tracking-wide">University of Ruhuna</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed font-medium">
            Matara, Sri Lanka. <br />
            Empowering knowledge through excellence in events and community engagement.
          </p>
        </div>

        <div>
          <h5 className="font-bold mb-6 text-emerald-500">Navigation</h5>
          <ul className="space-y-4 text-gray-400 text-xs font-medium">
            <li onClick={() => navigate('/')} className="hover:text-emerald-400 cursor-pointer transition-colors">Home</li>
            <li onClick={() => navigate('/events')} className="hover:text-emerald-400 cursor-pointer transition-colors">Browse Events</li>
            <li onClick={() => navigate('/organizations')} className="hover:text-emerald-400 cursor-pointer transition-colors">Organizations</li>
            <li onClick={() => navigate('/venues')} className="hover:text-emerald-400 cursor-pointer transition-colors">Venues</li>
            <li onClick={() => navigate('/about')} className="hover:text-emerald-400 cursor-pointer transition-colors">About Us</li>
          </ul>
        </div>

        <div>
           <h5 className="font-bold mb-6 text-emerald-500">Support & Resources</h5>
           <ul className="space-y-4 text-gray-400 text-xs font-medium">
             <li className="hover:text-emerald-400 cursor-pointer transition-colors">Help Center</li>
             <li className="hover:text-emerald-400 cursor-pointer transition-colors">Event Guidelines</li>
             <li className="hover:text-emerald-400 cursor-pointer transition-colors">FAQ</li>
             <li className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</li>
           </ul>
        </div>

         <div>
          <h5 className="font-bold mb-6 text-emerald-500">Connect With Us</h5>
          <div className="flex gap-4">
            <a href="https://www.ruh.ac.lk" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/10" title="University Website">
               <Globe size={16} />
            </a>
            <a href="mailto:admin@ruh.ac.lk" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/10" title="Contact Us">
               <Mail size={16} />
            </a>
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/10" title="Facebook">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/10" title="Twitter">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/10" title="Instagram">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-[11px]">University of Ruhuna, <br />Wellamadama, Matara.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-medium">
        <p>© {new Date().getFullYear()} University of Ruhuna. All rights reserved.</p>
        <div className="flex gap-6">
           <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
           <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;