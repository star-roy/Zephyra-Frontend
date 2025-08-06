import React from "react";
import { Link } from "react-router-dom";
import OngoingQuestCard from "../../Cards/OngoingQuestCard";

function OngoingQuestsSection({ quests }) {
  const hasQuests = Array.isArray(quests) && quests.length > 0;
  // Only show one ongoing quest card, if available
  const displayQuests = hasQuests ? quests.slice(0, 1) : [];
  const questsInProgress = hasQuests ? quests.length : 0;

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo">
            Ongoing Quests
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-base font-medium text-green-400 bg-green-50 rounded-full px-3 py-1 border border-green-300">
              {questsInProgress} in progress
            </span>
            <Link
              to="/my-quest"
              className="hidden sm:block text-zephyraBlue bg-zephyraLite font-semibold px-4 py-2 rounded-full hover:bg-duskHaze hover:text-[#236ef3] transition"
            >
              View All
            </Link>
          </div>
        </div>
        {/* Cards if there are quests */}
        {hasQuests ? (
          <div className="grid gap-16 md:gap-12 grid-cols-1">
            {displayQuests.map((quest) => (
              <OngoingQuestCard key={quest.id} {...quest} />
            ))}
          </div>
        ) : (
          <div className="w-full mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg flex flex-col items-center py-6 px-4 sm:px-8 mb-8">
            <div className="max-w-xl w-full flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-bold text-midnightIndigo mb-2 text-center">
                You have no ongoing quests.
              </div>
              <div className="text-base text-stormyGrey mb-4 text-center">
                Discover new adventures to begin your journey!
              </div>
              <Link
                to="/explore"
                className="shine-sweep inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-300 text-white font-bold text-base px-6 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              >
                <span className="mr-2 text-xl">✨</span>
                Explore Now
              </Link>
            </div>
          </div>
        )}
        {/* Mobile View All */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            to="/my-quest"
            className="inline-block text-zephyraBlue bg-zephyraLite font-semibold px-6 py-2 rounded-full hover:bg-duskHaze hover:text-[#236ef3] transition"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OngoingQuestsSection;