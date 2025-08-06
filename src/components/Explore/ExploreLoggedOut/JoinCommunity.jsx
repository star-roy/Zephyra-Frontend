import React from "react";
import { FaMapMarkedAlt, FaLock, FaUsers } from "react-icons/fa";

function JoinCommunity() {
  return (
    <section className="bg-[#CADCFC] py-12 px-4 md:px-8 lg:px-16 text-center mt-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-6 pb-5">
        Start Your Adventure Today!
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-8">
        <div className="flex flex-col items-center">
          <FaMapMarkedAlt className="text-blue-500 text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Personalized Quests</h3>
          <p className="text-sm font-normal text-[#2C3E50] max-w-xs">
            Get recommendations tailored to your interests.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaLock className="text-blue-500 text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Exclusive Access</h3>
          <p className="text-sm font-normal text-[#2C3E50] max-w-xs">
            Unlock special challenges and hidden locations.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaUsers className="text-blue-500 text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Join the Community</h3>
          <p className="text-sm font-normal text-[#2C3E50] max-w-xs">
            Connect with other explorers and share stories.
          </p>
        </div>
      </div>
      <a
        href="/signup"
        className="shine-sweep font-bold px-7 py-3 rounded-full border-2 border-blue-500 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 hover:border-blue-700 transition-all duration-200 inline-block"
      >
        Join the Exploration
      </a>
    </section>
  );
}

export default JoinCommunity;
