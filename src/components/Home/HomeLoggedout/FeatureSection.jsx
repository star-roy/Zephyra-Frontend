import React from "react";
import { FiSearch, FiAward, FiUsers } from "react-icons/fi";

function FeatureSection() {
  const features = [
    {
      icon: <FiSearch size={28} className="text-[#4A90E2]" />,
      title: "Find Unique Quests",
      description:
        "Explore a variety of quests tailored to your interests and location.",
    },
    {
      icon: <FiAward size={28} className="text-[#4A90E2]" />,
      title: "Earn Badges & XP",
      description:
        "Complete quests to earn badges, gain experience points, and climb the leaderboard.",
    },
    {
      icon: <FiUsers size={28} className="text-[#4A90E2]" />,
      title: "Connect with Explorers",
      description:
        "Join a community of local adventurers, share your experiences, and discover together.",
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#2C3E50] mb-3">
          "Where the Wind Takes You."
        </h2>
        <p className="text-[#4A90E2] max-w-2xl mx-auto mb-12 text-sm sm:text-lg">
          Zephyra turns your surroundings into an interactive adventure - find hidden gems, complete
          unique quests, and build meaningful connections.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] rounded-xl border border-[#869AB8] shadow-sm hover:shadow-md transition-shadow p-6 text-left"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">{feature.title}</h3>
              <p className="text-[#869AB8] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
