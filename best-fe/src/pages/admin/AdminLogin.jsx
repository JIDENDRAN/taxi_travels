import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, EyeOff, UserCircle2 } from 'lucide-react';
import API_BASE_URL from '../../apiConfig.js';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Access Denied.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = 'w-full pl-5 pr-12 py-3.5 sm:py-4 rounded-xl bg-[#f7f5f0] border border-[#e4dfd5] text-gray-800 text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-[#d4951e] focus:border-[#d4951e] outline-none transition-all font-outfit';

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center relative overflow-hidden font-outfit px-4 sm:px-6">
      
      {/* Decorative background blur elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4951e]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a3c34]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Logo / Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white p-3 rounded-2xl shadow-sm border border-[#edeae1] mb-4"
          >
            <img src="/logo.jpeg" alt="Madurai Best Tours" className="w-14 h-14 object-contain rounded-xl" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-poppins font-bold text-[#1a3c34]"
          >
            Admin <span className="text-[#d4951e]">Portal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-2 font-medium"
          >
            Sign in to manage bookings and dashboard settings
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#edeae1]"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-50 text-red-600 border border-red-100 p-3.5 rounded-xl text-sm text-center font-medium">
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="text-[#1a3c34] text-xs font-bold uppercase tracking-wider pl-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputCls}
                  placeholder="Enter admin username"
                  required
                />
                <UserCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#1a3c34] text-xs font-bold uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a3c34] transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#1a3c34] hover:bg-[#2d5a4e] disabled:bg-[#1a3c34]/70 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-poppins shadow-md hover:shadow-lg disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Helper details removed for security */}
        </motion.div>

        <div className="text-center mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Madurai Best Tours and Travels
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
