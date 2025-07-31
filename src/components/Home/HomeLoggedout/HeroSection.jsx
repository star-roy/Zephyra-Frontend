// src/components/Home/HeroSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="relative w-full h-[80vh] sm:h-[75vh] md:h-[70vh] lg:h-[90vh] flex items-center justify-center bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: "url('/hero-image.jpeg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Hero Content */}
      <div
        className="relative z-10 text-center px-6 sm:px-8 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Every Corner Has a Story - Discover Yours
        </h1>
        <p className="text-[#F8F9FA] text-base sm:text-lg md:text-xl mb-6">
          Wander through wonders, take on quests that matter, and find your tribe of explorers - step by step.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-[#4A90E2] hover:bg-[#869AB8] text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-md transition duration-200"
        >
          Follow the Whisper of Zephyra
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
