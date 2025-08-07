import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f8f9fa] to-[#cadcfc] flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background Illustration */}
      <div
        className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-cover animate-fadeIn"
        style={{
          backgroundImage: "url('/connect-bg.png')",
          filter: "blur(6px)",
        }}
      />

      {/* Glow Bubbles */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#4A90E2]/20 rounded-full blur-3xl animate-bounce-slow" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#CADCFC]/30 rounded-full blur-2xl animate-float" />

      <div className="relative z-10 max-w-md w-full backdrop-blur-2xl border-4 border-[#CADCFC]/60 rounded-3xl shadow-2xl shadow-[#CADCFC]/40 p-8 sm:p-10 text-center">
        {/* Lock Icon */}
        <div className="flex justify-center mb-7">
          <div className="bg-[#CADCFC]/50 p-6 rounded-full shadow-lg animate-pulse">
            <LockClosedIcon className="w-12 h-12 text-indigo-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] mb-4 tracking-tight drop-shadow">
          Unlock Your Explorer Journey
        </h1>

        {/* Subtext */}
        <p className="text-[#2C3E50] text-base sm:text-lg mb-8 leading-relaxed font-medium">
          This path is for registered explorers only.<br />
          <span className="text-[#4A90E2] font-semibold">Join Zephyra</span> to access exclusive quests, earn XP, collect badges, and become a city legend.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/signup"
            className="shine-sweep px-6 py-2 bg-gradient-to-r from-[#4A90E2] to-[#2C3E50] text-white font-bold rounded-full shadow-xl border-2 border-transparent hover:border-[#4A90E2] hover:from-[#2C3E50] hover:to-[#4A90E2] hover:scale-105 transition-all duration-200 flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 text-white transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/></svg>
            <span>Sign Up Now</span>
          </Link>
          <Link
            to="/login"
            className="shine-sweep px-6 py-2 bg-white text-[#4A90E2] font-bold rounded-full shadow-xl border-2 border-[#4A90E2] hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-500 hover:text-white hover:border-transparent transition-all duration-200 flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 text-[#4A90E2] group-hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/></svg>
            <span>Log In</span>
          </Link>
        </div>

        {/* Quote/Testimonial */}
        <div className="bg-white/70 border border-[#E0E7FF] rounded-xl p-5 text-base text-[#2C3E50] font-semibold shadow-md shadow-[#E0E7FF]/40 mt-2 animate-fadeIn">
          <span className="text-[#4A90E2] font-bold">Thousands</span> have started their Zephyra story<br />
          <span className="text-[#4A90E2]">Ready to write yours?</span>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        .animate-float { animation: float 4s infinite; }
      `}</style>
    </section>
  );
}

export default AccessDenied;
