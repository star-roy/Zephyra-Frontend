import React from "react";
import { Link } from "react-router-dom";

function JoinCTA() {
  return (
    <section className="bg-white text-[#0D1B2A] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#0D1B2A]">
          Flow Freely. Discover Deeply.
        </h2>
        <p className="text-blue-500 text-base sm:text-lg mb-10 font-medium">
          Sign up today and unlock a world of curated quests, local adventures, and a community of fellow explorers.<br />
          From hidden gems to epic journeys - it's all here.
        </p>
        <Link
          to="/signup"
          className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:scale-105 text-white font-semibold text-base px-8 py-3 rounded-full transition"
          style={{ display: 'inline-block', position: 'relative', overflow: 'hidden' }}
        >
          Flow with Zephyra
        </Link>
      </div>
    </section>
  );
}

export default JoinCTA;
