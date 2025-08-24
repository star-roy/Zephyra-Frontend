import React from "react";
import { Link } from "react-router-dom";

function ExploreHero() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-xl">
      <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px]">
        <img
          src="/hero.webp"
          alt="Explore Hero"
          className="w-full h-full object-cover scale-105 brightness-75"
        />

        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold mb-4 opacity-0 animate-staggerfadein [animation-delay:0.2s]">
            Discover the Soul of Your City
          </h1>
          <p className="mb-8 max-w-2xl mx-auto text-white text-base md:text-lg font-medium opacity-0 animate-staggerfadein [animation-delay:0.5s]">
            Embark on exciting quests, uncover local stories, and connect with your city like never before.
          </p>
          <Link
            to="/signup"
            className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:scale-105 text-white font-semibold px-8 py-3 rounded-full transition text-base opacity-0 animate-staggerfadein [animation-delay:0.8s]"
            style={{ display: 'inline-block', position: 'relative', overflow: 'hidden' }}
          >
            Sign Up to Explore
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ExploreHero;
