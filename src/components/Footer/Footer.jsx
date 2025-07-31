import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import logo from "/logo.png"

function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-[#AFCBDF] text-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-start gap-10 border-b border-[#33475b]">
        
        {/* Left - Logo + Copyright */}
        <div className="md:w-1/4">
          <Link to="/" className="flex items-center mb-4">
            <img
              src={logo}
              alt="Zephyra Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-white text-2xl font-semibold ml-1">Zephyra</span>
          </Link>
          <p className="text-[#AFCBDF]">© 2025 Zephyra. All rights reserved.</p>
        </div>

        {/* Right - Links Section */}
        <div className="flex flex-wrap justify-end gap-12 md:gap-20 text-left w-full md:w-auto">
          {/* Navigate */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigate</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-white">Explore</Link></li>
              <li><Link to="/about-us" className="hover:text-white">About Us</Link></li>
              <li><Link to="/help" className="hover:text-white">Help</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/contact-us" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-end space-x-4 text-lg">
              <a href="#" className="hover:text-white" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="hover:text-white" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="hover:text-white" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="hover:text-white" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
