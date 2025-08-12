import React from "react";
import ForYouCard from "../../Cards/QuestCard"; // Adjust the import path if necessary

function FeaturedQuest({ quests = [] }) {
  // Show exactly 3 featured quests
  const displayQuests = quests.slice(0, 3);

  if (!displayQuests.length) return null;

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo tracking-tight">
            Featured Quests
          </h2>
          <a
            href="/explore"
            className="hidden sm:inline-block px-6 py-2 rounded-full font-semibold text-purple-700 bg-gradient-to-r from-amber-100 via-purple-50 to-purple-100 shadow hover:bg-amber-50 hover:text-purple-900 transition"
          >
            Explore All
          </a>
        </div>

        {/* Responsive grid: 1, 2, 2, 3, or 4 columns depending on screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {displayQuests.map((quest) => (
            <ForYouCard key={quest._id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedQuest;