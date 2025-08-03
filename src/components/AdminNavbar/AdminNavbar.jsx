import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Crown, Users, CheckCircle, BarChart3, Menu, X, Home, LogOut, Bell, User } from 'lucide-react';
import { AuthContext } from '../../auth/AuthContext';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/quests', label: 'Quest Moderation', icon: CheckCircle },
    { path: '/admin/users', label: 'User Management', icon: Users },
  ];

  const superAdminNavItems = [
    { path: '/admin/super-dashboard', label: 'Super Admin Dashboard', icon: Crown },
  ];

  const navItems = user?.role === 'super_admin' 
    ? [...adminNavItems, ...superAdminNavItems]
    : adminNavItems;

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <nav className={`shadow-xl border-b-2 ${
      isSuperAdmin 
        ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-800 border-purple-500' 
        : 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-800 border-blue-500'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          <div className="flex items-center min-w-0 flex-1">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-6 lg:mr-8 py-2 flex-shrink-0">
              <div className={`p-1.5 sm:p-2 rounded-lg bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg`}>
                <img src="/logo.png" alt="Zephyra" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">Zephyra</span>
                <span className={`text-xs font-medium hidden sm:block ${
                  isSuperAdmin ? 'text-purple-200' : 'text-blue-200'
                }`}>
                  Admin Panel
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-1 min-w-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isCurrentActive = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-2 lg:px-3 xl:px-4 py-2.5 rounded-lg text-xs lg:text-sm font-medium flex items-center gap-2 transition-all duration-200 flex-shrink-0 ${
                      isCurrentActive
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' 
                        : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isCurrentActive ? 'text-white' : 'text-white/70'}`} />
                    <span className="hidden lg:block xl:inline truncate">
                      {item.path === '/admin/super-dashboard' ? 'Super Admin' : item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
            {/* Notifications - Hidden on small screens */}
            <button className="hidden sm:flex p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            {/* User Role Badge */}
            <div className={`flex items-center gap-2 lg:gap-3 px-2 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg ${
              isSuperAdmin 
                ? 'bg-purple-700/60 border border-purple-500/50' 
                : 'bg-blue-700/60 border border-blue-500/50'
            } backdrop-blur-sm`}>
              <div className="flex items-center gap-1 sm:gap-2">
                {isSuperAdmin ? (
                  <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300 flex-shrink-0" />
                ) : (
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300 flex-shrink-0" />
                )}
                <div className="hidden sm:flex flex-col min-w-0">
                  <span className="text-xs text-white/60 uppercase tracking-wide truncate">
                    {user?.role?.replace('_', ' ')}
                  </span>
                  <span className="text-xs lg:text-sm font-medium text-white truncate">
                    {user?.fullName || 'Admin User'}
                  </span>
                </div>
                {/* Mobile: Show only icon and role */}
                <span className="sm:hidden text-xs font-medium text-white/90 capitalize">
                  {user?.role === 'super_admin' ? 'Super' : 'Admin'}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link
                to="/"
                className="px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-1 lg:gap-2 transition-all"
                title="Main Site"
              >
                <Home className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:block">Main Site</span>
              </Link>
              <button
                onClick={logout}
                className="px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm text-red-300 hover:text-white hover:bg-red-500/20 flex items-center gap-1 lg:gap-2 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:block">Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 backdrop-blur-sm">
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
                    <span className="truncate">
                      {item.path === '/admin/super-dashboard' ? 'Super Admin Dashboard' : item.label}
                    </span>
                  </Link>
                );
              })}
              
              {/* Mobile User Info */}
              <div className="px-4 py-2 mt-2">
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isSuperAdmin ? 'bg-purple-700/40' : 'bg-blue-700/40'
                } border border-white/20`}>
                  {isSuperAdmin ? (
                    <Crown className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  ) : (
                    <Shield className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-white truncate">
                      {user?.fullName || 'Admin User'}
                    </span>
                    <span className="text-xs text-white/60 capitalize truncate">
                      {user?.role?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
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
