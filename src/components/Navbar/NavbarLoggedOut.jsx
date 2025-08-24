import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/logo1.png";

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
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Zephyra Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
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

          <div className="hidden md:flex items-center space-x-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-semibold text-md px-4 py-2 transition ${
                  isActive
                    ? "text-blue-500 font-bold scale-110"
                    : "text-[#2C3E50] hover:text-[#4A90E2]"
                }`
              }
            >
              Login
            </NavLink>
            <Link
              to="/signup"
              className="shine-sweep bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-md px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-[#2C3E50] text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

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
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-semibold text-md px-4 py-2 transition ${
                  isActive
                    ? "text-blue-500 font-bold underline underline-offset-4"
                    : "text-[#2C3E50] hover:text-[#4A90E2]"
                }`
              }
            >
              Login
            </NavLink>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-md px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
