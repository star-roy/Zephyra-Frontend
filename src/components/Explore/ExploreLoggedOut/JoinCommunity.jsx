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
          <FaMapMarkedAlt className="text-[#4A90E2] text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Personalized Quests</h3>
          <p className="text-sm font-normal text-[#2C3E50] max-w-xs">
            Get recommendations tailored to your interests.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaLock className="text-[#4A90E2] text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Exclusive Access</h3>
          <p className="text-sm  font-normaltext-[#2C3E50] max-w-xs">
            Unlock special challenges and hidden locations.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaUsers className="text-[#4A90E2] text-4xl mb-2 hover:scale-110 transition-transform duration-300" />
          <h3 className="text-lg font-bold text-[#2C3E50]">Join the Community</h3>
          <p className="text-sm font-normal text-[#2C3E50] max-w-xs">
            Connect with other explorers and share stories.
          </p>
        </div>
      </div>
      <a
        href="/signup"
        className="bg-[#4A90E2] hover:bg-[#2C3E50] text-white font-semibold px-6 py-3 rounded-full transition duration-200"
      >
        Join the Exploration
      </a>
    </section>
  );
}

export default JoinCommunity;
