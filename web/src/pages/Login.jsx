import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Single state object for form data
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await login(formData);
      console.log(loggedUser);
      console.log(formData);

      // Example role-based navigation
      if (loggedUser.role === "ROLE_ADMIN_LEC") navigate("/admin-dashboard");
      else if (loggedUser.role === "ROLE_BATCH_REP") navigate("/coordinator-dashboard");

    } catch (err) {
      console.log(err);
      setError('Invalid username or password');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col justify-center items-center font-sans px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Header Section */}
        <div className="bg-[#0b1120] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="w-16 h-16 bg-[#0b1120] text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.2)] relative z-10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1 relative z-10">Welcome Back</h2>
          <p className="text-slate-400 text-sm relative z-10">Sign in to University of Ruhuna EMS</p>
        </div>

        {/* Form Section */}
        <div className="p-8">

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-6 text-center border border-red-100 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your username"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
        </div>
      </div>

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