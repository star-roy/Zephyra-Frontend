import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import logo from "/logo.png"

function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-blue-100 text-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between items-start md:items-start gap-12 border-b border-[#33475b]">
        {/* Left - Logo + Copyright */}
        <div className="md:w-1/4">
          <Link to="/" className="flex items-center mb-4">
            <img
              src={logo}
              alt="Zephyra Logo"
              className="h-11 w-auto object-contain drop-shadow"
            />
            <span className="text-white text-2xl font-semibold ml-2 tracking-tight" style={{ letterSpacing: '0.10em' }}>Zephyra</span>
          </Link>
          <p className="text-blue-200 mt-2">© 2025 Zephyra. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-end gap-12 md:gap-20 text-left w-full md:w-auto">
          <div>
            <h4 className="text-white text-base font-semibold mb-3 tracking-wide">Navigate</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-blue-300 transition">Explore</Link></li>
              <li><Link to="/about-us" className="hover:text-blue-300 transition">About Us</Link></li>
              <li><Link to="/help" className="hover:text-blue-300 transition">Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-semibold mb-3 tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-blue-300 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-300 transition">Terms of Service</Link></li>
              <li><Link to="/contact-us" className="hover:text-blue-300 transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-semibold mb-3 tracking-wide">Connect With Us</h4>
            <div className="flex justify-end space-x-3 text-lg">
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-500 text-white rounded-full p-2 transition shadow" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://x.com/dibyar4j?t=BLzRJmCVaW-Xfi2dY27W9A&s=09" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-500 text-white rounded-full p-2 transition shadow" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://github.com/star-roy" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-500 text-white rounded-full p-2 transition shadow" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
