import React from "react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="w-full px-4 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#2C3E50] text-white rounded-2xl shadow-lg px-6 py-10 sm:px-10 sm:py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Unlock your full explorer potential
          </h2>
          <p className="text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Log in or sign up to access personalized support, manage your account, and get help tailored to your exploration journey
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-[#4A90E2] hover:bg-gradient-to-l from-[#CADCFC] to-[#4A90E2] hover:text-[#0D1B2A] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-300"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-white/20 transition-all duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
