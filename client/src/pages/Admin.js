import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  LogOut, 
  Image, 
  Mail, 
  FileText, 
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';
import { adminAPI } from '../utils/api';
import AdminGallery from '../components/admin/AdminGallery';
import AdminContacts from '../components/admin/AdminContacts';
import AdminContent from '../components/admin/AdminContent';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminAnalytics from '../components/admin/AdminAnalytics';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: BarChart3 },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Contacts', path: '/admin/contacts', icon: Mail },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Analytics', path: '/admin/analytics', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col pt-20">
        <div className="p-6">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/admin' && location.pathname === '/admin/');
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden pt-16">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/contacts" element={<AdminContacts />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminAPI.login(credentials);
      localStorage.setItem('adminToken', response.data.token);
      onLogin();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-900 p-8 rounded-2xl border border-dark-800">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative flex justify-center">
              <img src="/logo_black.jpg" alt="PixelStudio Logo" className="h-10 w-auto" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400">
              Sign in to manage your photography portfolio
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/20 border border-red-700 text-red-400 p-4 rounded-lg mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors"
                placeholder="admin@photographer.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-800 rounded-lg">
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-300 text-center">
              Email: admin@photographer.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
