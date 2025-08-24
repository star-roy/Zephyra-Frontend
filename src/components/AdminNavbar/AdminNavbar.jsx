import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Crown, Users, CheckCircle, BarChart3, Menu, X, Home, LogOut, Bell, User, FileCheck, ScrollText } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/authSlice';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => location.pathname === path;

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/quests', label: 'Quest Moderation', icon: CheckCircle },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/proofs', label: 'Task Verification', icon: FileCheck },
    { path: '/admin/action-logs', label: 'Action Logs', icon: ScrollText },
  ];

  const superAdminNavItems = [
    { path: '/admin/super-dashboard', label: 'Super Admin Dashboard', icon: Crown },
  ];

  const navItems = userData?.role === 'super_admin' 
    ? [...adminNavItems, ...superAdminNavItems]
    : adminNavItems;

  const isSuperAdmin = userData?.role === 'super_admin';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-xl border-b-2 ${
      isSuperAdmin 
        ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-800 border-purple-500' 
        : 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-800 border-blue-500'
    }`}>
      <div className="max-w-full mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center min-w-0 flex-1">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 mr-3 sm:mr-6 py-2 flex-shrink-0">
              <div className={`p-1.5 sm:p-2 rounded-lg bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg`}>
                <img src="/logo.png" alt="Zephyra" className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-xl font-bold text-white">Zephyra</span>
                <span className={`text-xs sm:text-sm font-medium hidden sm:block ${
                  isSuperAdmin ? 'text-purple-200' : 'text-blue-200'
                }`}>
                  Admin Panel
                </span>
              </div>
            </Link>
            

            <div className="hidden lg:flex items-center space-x-4 flex-1 min-w-0 overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isCurrentActive = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 flex-shrink-0 whitespace-nowrap ${
                      isCurrentActive
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' 
                        : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isCurrentActive ? 'text-white' : 'text-white/70'}`} />
                    <span className="font-medium">
                      {item.path === '/admin/super-dashboard' ? 'Super Admin' : item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ${
              isSuperAdmin 
                ? 'bg-purple-700/60 border border-purple-500/50' 
                : 'bg-blue-700/60 border border-blue-500/50'
            } backdrop-blur-sm`}>
              <div className="flex items-center gap-1 sm:gap-2">
                {isSuperAdmin ? (
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
                ) : (
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300 flex-shrink-0" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide hidden sm:block">
                    {userData?.role?.replace('_', ' ')}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate max-w-20 sm:max-w-none">
                    {userData?.fullName || 'Admin'}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <Link
                to="/"
                className="px-2.5 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all"
                title="Main Site"
              >
                <Home className="w-4 h-4 flex-shrink-0" />
                <span>Main Site</span>
              </Link>
              <button
                onClick={logout}
                className="px-2.5 py-2 rounded-lg text-sm text-red-300 hover:text-white hover:bg-red-500/20 flex items-center gap-1.5 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/20 backdrop-blur-sm">
            <div className="py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isCurrentActive = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-all ${
                      isCurrentActive
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      {item.path === '/admin/super-dashboard' ? 'Super Admin Dashboard' : item.label}
                    </span>
                  </Link>
                );
              })}
              
              <div className="border-t border-white/20 pt-3 mt-3 space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-all"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  Main Site
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-300 hover:text-white hover:bg-red-500/20 flex items-center gap-3 transition-all"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
