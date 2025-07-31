import React from "react";
import ForYouCard from "../../Cards/QuestCard";
import useGridColumnCount from "../../../Hook/useGridColumnCount"; // Adjust the path if needed

function PopularQuests({ quests = [] }) {
  const columns = useGridColumnCount();
  const displayQuests = quests.slice(0, columns);

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
            className="hidden sm:inline-block px-6 py-2 rounded-full font-semibold text-purple-700 bg-gradient-to-r from-amber-100 via-purple-50 to-purple-100 shadow hover:bg-amber-50 hover:text-purple-900 transition"
          >
            Explore All
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {displayQuests.map((quest) => (
            <ForYouCard key={quest.id} {...quest} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularQuests;