import React from "react";
import ForYouCard from "../../Cards/QuestCard";

function PopularQuests({ quests = [] }) {
  // Show exactly 4 popular quests
  const displayQuests = quests.slice(0, 4);

  if (!displayQuests.length) return null;

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-14">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo tracking-tight">
            Popular Quests
          </h2>
          <a
            href="/explore"
            className="shine-sweep hidden sm:inline-block px-6 py-2 rounded-full font-semibold text-indigo-600 bg-gradient-to-r from-blue-300 to-blue-100 hover:bg-black hover:text-indigo-900 transition"
          >
            Explore All
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {displayQuests.map((quest) => (
            <ForYouCard key={quest._id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularQuests;