import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <section className="relative w-full min-h-screen bg-transparent flex items-center justify-center px-4 overflow-hidden">
      {/* Background Illustration */}
      <div
        className="absolute inset-0 opacity-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/connect-bg.png')", // ← Add this image to your public folder
        }}
      />

      <div className="relative z-10 max-w-md w-full backdrop-blur-xl border-4 border-[#CADCFC]/60 rounded-3xl shadow-lg shadow-[#CADCFC] p-8 sm:p-10 text-center">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#CADCFC]/40 p-5 rounded-full shadow-md animate-pulse">
            <LockClosedIcon className="w-10 h-10 text-[#c3d8fb]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] mb-3">
          Unlock Your Explorer Journey
        </h1>

        {/* Subtext */}
        <p className="text-[#2C3E50] text-sm sm:text-base mb-6 leading-relaxed">
          This path is for registered explorers only.
          <br />
          Join Zephyra to access exclusive quests, earn XP, collect badges,
          and become a city legend.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow hover:bg-[#2C3E50] transition-all"
          >
            Sign Up Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-[#4A90E2] text-[#4A90E2] font-semibold rounded-lg hover:bg-[#4A90E2] hover:text-white transition-all"
          >
            Log In
          </Link>
        </div>

        {/* Quote/Testimonial */}
        <div className="bg-white/60 border border-[#E0E7FF] rounded-lg p-4 text-sm text-[#2C3E50] font-medium shadow-md shadow-[#E0E7FF]">
           <span className="text-[#4A90E2] font-semibold">Thousands</span> have started their Zephyra story <br></br>- Ready to write yours?
        </div>
      </div>

      {/* Glow Bubble */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#4A90E2]/20 rounded-full blur-3xl" />
    </section>
  );
}

export default AccessDenied;
