import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/logo1.png"; // Adjust the path as necessary

function NavbarLoggedOut() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/explore" },
    { name: "Compass", to: "/compass" },
    { name: "About", to: "/about-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FA] border-b border-[#869AB8]">
      <nav className="px-4 sm:px-6 md:px-10 xl:px-10 py-3 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Zephyra Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Right Buttons (Desktop only) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-[#2C3E50] hover:text-[#4A90E2] font-semibold text-md px-4 py-2 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#4A90E2] hover:bg-[#2C3E50] text-white font-medium text-sm px-4 py-2 rounded transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#2C3E50] text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
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
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-sm text-[#2C3E50] hover:text-[#4A90E2] font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-[#4A90E2] hover:bg-[#2C3E50] text-white text-center font-medium text-sm px-4 py-2 rounded transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavbarLoggedOut;
