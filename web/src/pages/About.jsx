import React from 'react';
import { CheckCircle2, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="font-sans text-left bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image Placeholder (මෙහි ඇත්ත පින්තූරය යොදන්න) */}
        <div className="absolute inset-0 bg-slate-800/80 bg-blend-multiply">
          <div className="w-full h-full bg-[#1e293b] opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-24 md:py-32">
          <span className="text-teal-400 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-4 block">
            Legacy of Excellence
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-2xl leading-tight text-white">
            Pioneering Education in the South of Lanka
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
            The University of Ruhuna stands as a beacon of academic prestige, fostering innovation and community through world-class events and engagement.
          </p>
        </div>
      </div>

      {/* 2. About & Statistics Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About University of Ruhuna</h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
              Established in 1978, the University of Ruhuna has grown into one of Sri Lanka's premier higher education institutions. Located in the historic city of Matara, the university serves as a cultural and intellectual hub for the southern region.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our Event Management System (EMS) was conceived to streamline the vibrant tapestry of academic conferences, cultural festivals, and student-led initiatives that define our campus life. By digitalizing logistics and coordination, we empower our faculty and students to focus on what truly matters: the exchange of ideas.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="space-y-4">
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl font-extrabold text-slate-900 mb-1">10+</h3>
              <p className="text-sm text-slate-500 font-medium">Faculties Hosting Events</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl font-extrabold text-slate-900 mb-1">500+</h3>
              <p className="text-sm text-slate-500 font-medium">Annual Campus Activities</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl font-extrabold text-slate-900 mb-1">15k+</h3>
              <p className="text-sm text-slate-500 font-medium">Active Students & Alumni</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* 3. Our Mission Section */}
      <div className="bg-[#f8fafc] py-20 lg:py-28 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Placeholder */}
          <div className="rounded-2xl overflow-hidden bg-slate-300 h-80 shadow-md relative group">
            {/* මෙතනට ඇත්ත පින්තූරය දාගන්න */}
            <div className="absolute inset-0 bg-slate-800 opacity-20 group-hover:opacity-10 transition-opacity"></div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              To provide a seamless, transparent, and efficient platform for the orchestration of university activities, ensuring every event—from international research symposiums to intramural sports—reflects the University of Ruhuna's standard of excellence.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Centralized Coordination</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Unifying venue bookings and resource allocation.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enhanced Visibility</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Showcasing the university's vibrant life to the global stage.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. How It Works Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 lg:py-28">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative pt-12 hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-8 w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
              01
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-3">For Coordinators</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Submit event proposals, request specialized equipment, and manage attendee registrations through a single intuitive dashboard.
            </p>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Draft Proposals</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Resource Requests</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Attendance Tracking</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative pt-12 hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-8 w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
              02
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-3">For Administrators</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Review departmental requests, manage venue schedules, and ensure all activities comply with university safety and policy standards.
            </p>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Approval Workflows</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Venue Conflict Management</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Policy Verification</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative pt-12 hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-8 w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
              03
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-3">For Participants</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Explore upcoming events, register with university credentials, and receive digital passes and live event updates.
            </p>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Event Discovery</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Digital RSVP</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Real-time Notifications</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 5. Contact & Support Section (Pre-Footer) */}
      <div className="bg-[#0b1120] py-20 relative overflow-hidden">
        {/* Subtle background graphic */}
        <div className="absolute -right-20 top-10 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Main Campus</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Wellamadama, Matara, 81000, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">General Inquiries</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">+94 41 2222681 / +94 41 2222682</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Email Support</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">events@ruh.ac.lk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Support Card */}
          <div className="bg-[#151e32] rounded-2xl p-8 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3">Technical Support</h3>
            <p className="text-xs text-slate-400 mb-8 leading-relaxed max-w-sm">
              Need help with the platform? Our dedicated IT support team is available 24/7 to assist coordinators and students.
            </p>
            <button className="bg-teal-700 hover:bg-teal-600 text-white px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md">
              Access Support Center <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;