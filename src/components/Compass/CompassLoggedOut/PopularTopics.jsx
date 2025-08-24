import React from "react";
import {
  FaRocket,
  FaQuestionCircle,
  FaTrophy,
  FaWrench,
  FaInfoCircle,
} from "react-icons/fa";

const topics = [
  {
    icon: <FaRocket className="text-[#4A90E2] text-2xl" />,
    title: "Getting Started with Local Explorer",
    detail: "Get started with ease - create your Zephyra account, set up your profile, and explore how to navigate quests, rewards, and city adventures from day one.",
  },
  {
    icon: <FaQuestionCircle className="text-[#4A90E2] text-2xl" />,
    title: "What are Quests?",
    detail: "Quests are personalized exploration challenges designed to guide you through unique local experiences. Whether it’s uncovering a hidden café, attending a cultural event, or completing a photo hunt, each quest rewards you with XP and memories along the way",
  },
  {
    icon: <FaTrophy className="text-[#4A90E2] text-2xl" />,
    title: "How to Earn XP & Badges",
    detail: "Zephyra rewards your curiosity with XP as you complete quests, explore new spots, share reviews, or upload photos. As you level up, you unlock unique badges-from “First Stepper” to “City Legend”- that showcase your journey as a true explorer."
  },
  {
    icon: <FaWrench className="text-[#4A90E2] text-2xl" />,
    title: "Troubleshooting Common Issues",
    detail: "Having trouble with location services, login, or loading content? Zephyra’s Help Center has you covered with step-by-step solutions to the most common problems. Whether it’s enabling GPS permissions or clearing app cache, we guide you through quick fixes to get you back on track.",
  },
  {
    icon: <FaInfoCircle className="text-[#4A90E2] text-2xl" />,
    title: "About Zephyra",
    detail: "\"Zephyra\" is your gateway to meaningful city adventures. It helps you discover hidden gems, track your journey, and build a personalized map of memories - all while earning rewards for your curiosity and contributions."
  },
];

function PopularTopics() {
  return (
    <section className="w-full px-4 py-12 bg-[#EBF2FF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1B2A] mb-8">
          Getting Started & Popular Topics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="relative group bg-white/80 backdrop-blur-lg border border-white/30 rounded-xl p-6 sm:p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] min-h-[140px] overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-12px]">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow text-2xl mb-2">
                  {topic.icon}
                </span>
                <h3 className="mt-2 text-[#2C3E50] font-semibold text-base sm:text-base text-center">
                  {topic.title}
                </h3>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center px-5 text-center transition-all duration-300">
                <p className="text-[#2C3E50] text-sm font-medium">
                  {topic.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularTopics;
