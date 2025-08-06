import React from "react";
import { FiSearch, FiAward, FiUsers } from "react-icons/fi";


function FeatureSection() {
  const features = [
    {
      icon: <FiSearch size={28} className="text-blue-600" />,
      title: "Find Unique Quests",
      description:
        "Explore a variety of quests tailored to your interests and location.",
      bg: "bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    },
    {
      icon: <FiAward size={28} className="text-blue-600" />,
      title: "Earn Badges & XP",
      description:
        "Complete quests to earn badges, gain experience points, and climb the leaderboard.",
      bg: "bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    },
    {
      icon: <FiUsers size={28} className="text-blue-600" />,
      title: "Connect with Explorers",
      description:
        "Join a community of local adventurers, share your experiences, and discover together.",
      bg: "bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#1A365D] mb-3 tracking-tight">
          Where the Wind Takes You
        </h2>
        <p className="text-blue-600 max-w-2xl mx-auto mb-14 text-base sm:text-lg md:text-xl font-medium tracking-wide">
          Zephyra turns your surroundings into an interactive adventure—find hidden gems, complete unique quests, and build meaningful connections.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={
                `rounded-2xl border border-[#dbeafe] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-left bg-white/80 backdrop-blur-md` +
                ` ` + feature.bg
              }
            >
              <div className="mb-5 flex items-center justify-start">
                <div className="w-14 h-14 flex items-center justify-center rounded-full shadow bg-white/80 border border-blue-100">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-[#4A5568] text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
