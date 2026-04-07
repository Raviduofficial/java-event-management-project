import React from 'react';
import { ShieldCheck, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0e1629] text-white py-16 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
             <ShieldCheck className="text-emerald-500" size={28} />
             <span className="font-bold text-lg tracking-wide">University of Ruhuna</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed font-medium">Matara, Sri Lanka. Empowering knowledge through excellence in events and community engagement.</p>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-emerald-500">Quick Links</h5>
          <ul className="space-y-4 text-gray-400 text-xs font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Event Calendar</li>
            <li className="hover:text-white cursor-pointer transition-colors">Venue Booking</li>
            <li className="hover:text-white cursor-pointer transition-colors">Proposal Submission</li>
            <li className="hover:text-white cursor-pointer transition-colors">Guidelines</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-emerald-500">Support</h5>
          <ul className="space-y-4 text-gray-400 text-xs font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact Admin</li>
            <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            <li className="hover:text-white cursor-pointer transition-colors">Feedback</li>
          </ul>
        </div>
         <div>
          <h5 className="font-bold mb-6 text-emerald-500">Connect</h5>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
               <Globe size={14} />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
               <Mail size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-medium">
        <p>© 2024 University of Ruhuna. All rights reserved.</p>
        <div className="flex gap-6">
           <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
           <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
           <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;