// src/components/Home/HeroSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function HomeHeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="relative w-full h-[80vh] sm:h-[75vh] md:h-[70vh] lg:h-[90vh] flex items-center justify-center bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: "url('/hero-image1.webp')" }}
    >
      <div className="absolute inset-0 bg-black/65 z-0 animate-fadein" />
      <div
        className="relative z-10 text-center px-6 sm:px-8 max-w-3xl mx-auto animate-slideupfadein"
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight opacity-0 animate-staggerfadein [animation-delay:0.2s]">
          Every Corner Has a Story - Discover Yours
        </h1>
        <p className="bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 bg-clip-text text-transparent text-base sm:text-lg md:text-xl mb-20 opacity-0 animate-staggerfadein [animation-delay:0.5s]">
          Wander through wonders, take on quests that matter, and find your tribe of explorers - step by step.
        </p>
        <Link
          to="/signup"
          className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:scale-105 text-white font-semibold text-base px-8 py-3 rounded-full transition"
          style={{ display: 'inline-block', position: 'relative', overflow: 'hidden', marginTop: 0 }}
        >
          Follow the Whisper of Zephyra
        </Link>
      </div>
    </section>
  );
}

export default HomeHeroSection;
