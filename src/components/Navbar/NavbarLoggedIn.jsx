import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "/logo1.png";
import XPProgressBar from "./XPProgressBar";
import LogoutModal from "../Cards/LogoutModal";
import { logoutUser } from "../../features/authSlice";

function NavbarLoggedIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.auth);
  
  const [isOpen, setIsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAvatarMenu = () => setAvatarOpen(!avatarOpen);


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setShowLogoutModal(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setShowLogoutModal(false);
      navigate('/login');
    }
  };

  // Check if user is admin or superadmin
  const isAdmin = userData?.role === 'admin' || 
                  userData?.role === 'superadmin' || 
                  userData?.role === 'super_admin' ||
                  userData?.role === 'Admin' || 
                  userData?.role === 'SuperAdmin' ||
                  userData?.role === 'Super_Admin';
  
  const userXP = userData?.xp || 0;
  const userLevel = userData?.level || 1;
  const userAvatar = userData?.avatar || "/assets/user-avatar2.jpeg";

  const levelXP = userLevel * 100;

  const navItems = [
    { name: "Explore", to: "/explore" },
    { name: "My Quest", to: "/my-quest" },
    { name: "Compass", to: "/compass" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FA] border-b border-[#869AB8]">
      <nav className="px-4 sm:px-6 md:px-10 xl:px-10 py-3 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Zephyra Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="hidden sm:flex items-center space-x-8">
            {navItems.map(({ name, to }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `text-md font-medium transition duration-200 ${
                    isActive
                      ? "text-blue-500 scale-110"
                      : "text-[#2C3E50] hover:text-blue-500"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
          <div className="hidden sm:flex items-center space-x-5 relative">
            <div className="hidden lg:block ">
              <XPProgressBar currentXP={userXP} levelXP={levelXP} level={userLevel} />
            </div>
            <div className="relative">
              <button
                onClick={toggleAvatarMenu}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full border-2 border-[#869AB8] object-cover"
                />
                <MdKeyboardArrowDown className="text-[#2C3E50]" />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#CADCFC] rounded-md shadow-md z-50">
                  {isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      onClick={() => setAvatarOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition duration-200 ${
                          isActive
                            ? "text-[#4A90E2] bg-[#F2F6FF]"
                            : "text-[#2C3E50] hover:bg-[#F2F6FF]"
                        }`
                      }
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <NavLink
                    to="/profile"
                    onClick={() => setAvatarOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition duration-200 ${
                        isActive
                          ? "text-[#4A90E2] bg-[#F2F6FF]"
                          : "text-[#2C3E50] hover:bg-[#F2F6FF]"
                      }`
                    }
                  >
                    View Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    onClick={() => setAvatarOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition duration-200 ${
                        isActive
                          ? "text-[#4A90E2] bg-[#F2F6FF]"
                          : "text-[#2C3E50] hover:bg-[#F2F6FF]"
                      }`
                    }
                  >
                    Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="sm:hidden text-[#2C3E50] text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {isOpen && (
          <div className="sm:hidden mt-4 flex flex-col space-y-4">
            {navItems.map(({ name, to }) => (
              <NavLink
                key={name}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-[#4A90E2]"
                      : "text-[#2C3E50] hover:text-[#4A90E2]"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
            <hr className="border-t border-[#CADCFC]" />
            
            <div className="flex justify-between items-center">
              <span className="bg-[#D6E4FF] text-[#4A90E2] text-xs font-semibold px-3 py-1 rounded-full">
                +{userXP} XP
              </span>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-[#869AB8] object-cover"
                />
              </Link>
            </div>
            
            <div className="pt-2 border-t border-[#CADCFC]">
              {isAdmin && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 text-sm font-medium transition duration-200 py-3 px-2 rounded-md ${
                      isActive
                        ? "text-[#4A90E2] bg-[#F2F6FF]"
                        : "text-[#2C3E50] hover:text-[#4A90E2] hover:bg-[#F2F6FF]"
                    }`
                  }
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="truncate">Admin Dashboard</span>
                </NavLink>
              )}
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-sm font-medium transition duration-200 py-3 px-2 rounded-md ${
                    isActive
                      ? "text-[#4A90E2] bg-[#F2F6FF]"
                      : "text-[#2C3E50] hover:text-[#4A90E2] hover:bg-[#F2F6FF]"
                  }`
                }
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="truncate">View Profile</span>
              </NavLink>
              <NavLink
                to="/settings"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-sm font-medium transition duration-200 py-3 px-2 rounded-md ${
                    isActive
                      ? "text-[#4A90E2] bg-[#F2F6FF]"
                      : "text-[#2C3E50] hover:text-[#4A90E2] hover:bg-[#F2F6FF]"
                  }`
                }
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">Settings</span>
              </NavLink>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLogoutModal(true);
                }}
                className="flex items-center space-x-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition duration-200 py-3 px-2 rounded-md w-full text-left"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="truncate">Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}

export default NavbarLoggedIn;