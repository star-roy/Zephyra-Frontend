import React from "react";
import { Link } from "react-router-dom";

function ExploreHero() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10 rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        {/* Background Image */}
        <img
          src="/assets/hero.png"
          alt="Explore Hero"
          className="w-full h-full object-cover"
        />

        {/* Gradient + Fade animation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2C3E50]/80 to-[#0D1B2A]/60 flex flex-col items-center justify-center text-center text-white px-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Discover the Soul of Your City
          </h1>
          <p className="mb-5 max-w-2xl text-sm md:text-base">
            Embark on exciting quests, uncover local stories, and connect with
            your city like never before.
          </p>
          <Link
            to="/signup"
            className="bg-[#4A90E2] hover:bg-[#869AB8] text-white font-semibold px-6 py-3 rounded-md transition duration-200 text-sm"
          >
            Sign Up to Explore
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ExploreHero;
