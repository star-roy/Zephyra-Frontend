import React from "react";
import { FaStar, FaCompass } from "react-icons/fa";
import { HiMiniFire } from "react-icons/hi2";
import heroImage from "/assets/bg.jpeg"; // ✅ Update if needed

function HeroLoggedIn({ name, level, xp, currentTitle, questCount }) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-8">
      <div
        className="relative max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-lg h-[500px]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65 z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-10 py-6 text-white">
          {/* 🔝 Top Content */}
          <div className="pt-5">
          <h1 className="md:text-5xl text-4xl sm:text-3xl lg:text-6xl font-bold truncate max-w-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Welcome back, {name}!
            </h1>
            <p className="text-sm sm:text-base text-[#e5edf5] lg:text-2xl mt-1">
              Keep the streak alive. Your next quest is ready.
            </p>
          </div>

          {/* 🔚 Bottom Stats + Button */}
          <div className="pb-5">
            <div className="flex flex-wrap gap-6 items-center mb-6">
              {/* Level */}
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-25 p-3 rounded-full shadow-sm">
                  <HiMiniFire className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold lg:text-lg text-blue-300">
                    Level {level}
                  </p>
                  <p className="text-xs lg:text-sm text-[#e5edf5]">{currentTitle}</p>
                </div>
              </div>

              {/* XP */}
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-25 p-3 rounded-full shadow-sm">
                  <FaStar className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold lg:text-lg text-blue-300">{xp} XP</p>
                  <p className="text-xs lg:text-sm text-[#e5edf5]">Current Progress</p>
                </div>
              </div>

              {/* Quests */}
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-25 p-3 rounded-full shadow-sm">
                  <FaCompass className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm lg:text-lg font-semibold text-blue-300">
                    {questCount} Quests
                  </p>
                  <p className="text-xs lg:text-sm text-[#e5edf5]">In Progress</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              aria-label="Start new adventure"
              className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:scale-105 text-white font-semibold text-sm px-6 py-3 rounded-full transition"
            >
              Start New Adventure
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroLoggedIn;
