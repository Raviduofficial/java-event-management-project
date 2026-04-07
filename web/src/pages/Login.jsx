import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // States for input fields and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    setError(''); // Clear previous errors

    // 1. Admin Login Check
    if (email === 'admin@ruh.ac.lk' && password === 'admin123') {
      const adminUser = { 
        name: "Prof. Gamage", 
        email: email, 
        role: "admin" 
      };
      localStorage.setItem('loggedUser', JSON.stringify(adminUser));
      navigate('/admin-dashboard'); // Admin Dashboard එකට යවනවා
    } 
    
    // 2. Event Coordinator Login Check
    else if (email === 'coord@ruh.ac.lk' && password === 'coord123') {
      const coordUser = { 
        name: "Dr. Coordinator", 
        email: email, 
        role: "coordinator" 
      };
      localStorage.setItem('loggedUser', JSON.stringify(coordUser));
      navigate('/coordinator-dashboard'); // Coordinator Dashboard එකට යවනවා
    } 
    
    // 3. Normal User (Student/Staff) Login Check
    else if (email !== '' && password !== '') {
      const normalUser = { 
        name: "Student User", 
        email: email, 
        role: "user" 
      };
      localStorage.setItem('loggedUser', JSON.stringify(normalUser));
      navigate('/'); // Home පේජ් එකට යවනවා
    } 
    
    // 4. Empty Fields
    else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col justify-center items-center font-sans px-4">
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#0b1120] p-8 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-[#0b1120] text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.2)] relative z-10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1 relative z-10">Welcome Back</h2>
          <p className="text-slate-400 text-sm relative z-10">Sign in to University of Ruhuna EMS</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          
          {/* Error Message Display */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-6 text-center border border-red-100 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your university email" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-bold text-teal-600 hover:text-teal-700">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full bg-gray-50 border border-transparent rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              Sign In <ArrowRight size={18} />
            </button>

          </form>

          {/* Test Credentials Guide (පහසුව සඳහා) */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">Test Credentials</p>
            <div className="space-y-2">
              <p className="text-[11px] text-slate-600 flex justify-between">
                <span className="font-bold text-teal-700">Admin:</span> 
                <span>admin@ruh.ac.lk <span className="text-gray-400 mx-1">|</span> admin123</span>
              </p>
              <p className="text-[11px] text-slate-600 flex justify-between">
                <span className="font-bold text-teal-700">Coordinator:</span> 
                <span>coord@ruh.ac.lk <span className="text-gray-400 mx-1">|</span> coord123</span>
              </p>
              <p className="text-[11px] text-slate-600 flex justify-between">
                <span className="font-bold text-teal-700">User:</span> 
                <span>(Any other email & password)</span>
              </p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Back to Home Link */}
      <button 
        onClick={() => navigate('/')} 
        className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-2"
      >
        &larr; Back to Public Portal
      </button>

    </div>
  );
};

export default Login;