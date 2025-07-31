import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "/logo1.png";
import XPProgressBar from "./XPProgressBar";
import LogoutModal from "../Cards/LogoutModal"; // Adjust path if needed

function NavbarLoggedIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAvatarMenu = () => setAvatarOpen(!avatarOpen);

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
                      ? "text-[#4A90E2]"
                      : "text-[#2C3E50] hover:text-[#4A90E2]"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
          <div className="hidden sm:flex items-center space-x-5 relative">
            <div className="hidden lg:block ">
              <XPProgressBar currentXP={320} levelXP={500} level={3} />
            </div>
            <button className="relative text-[#2C3E50] hover:text-[#4A90E2]">
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.4-1.4A2.03 2.03 0 0118 14.2V11a6 6 0 10-12 0v3c0 .54-.2 1.05-.6 1.44L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={toggleAvatarMenu}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img
                  src="/assets/user-avatar2.jpeg"
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full border-2 border-[#869AB8] object-cover"
                />
                <MdKeyboardArrowDown className="text-[#2C3E50]" />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#CADCFC] rounded-md shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-[#2C3E50] hover:bg-[#F2F6FF]"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-[#2C3E50] hover:bg-[#F2F6FF]"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#F2F6FF]"
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
                +320 XP
              </span>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src="/assets/user-avatar2.jpeg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-[#869AB8] object-cover"
                />
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onLogout={() => {
            localStorage.removeItem("loggedIn");
            setShowLogoutModal(false);
            location.href = "/login";
          }}
        />
      )}
    </header>
  );
}

export default NavbarLoggedIn;