import React from "react";
import { Link } from "react-router-dom";

function JoinCTA() {
  return (
    <section className="bg-[#F8F9FA] text-[#0D1B2A] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          "Flow Freely. Discover Deeply."
        </h2>
        <p className="text-[#4A90E2] text-base sm:text-lg mb-8">
          Sign up today and unlock a world of curated quests, local adventures, and a community of fellow explorers.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-[#4A90E2] hover:bg-[#2C3E50] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-md transition duration-200"
        >
          Flow with Zephyra
        </Link>
      </div>
    </section>
  );
}

export default JoinCTA;
