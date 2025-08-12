import React from "react";
import QuestNearbyMap from "./QuestNearbyMap";

function UserExploreHero() {
  return (
    <>
      {/* 🌍 Page Header */}
      <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-10 text-midnightIndigo">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Explore Your World</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Discover new quests, thrilling adventures, and hidden gems in your local area.
              <br className="hidden sm:block" />
              Your next story starts here.
            </p>
          </div>
        </div>
      </section>

      {/* 📍 Quests Near You */}
      <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-2xl font-semibold text-midnightIndigo">Quests Near You</h2>
          </div>

          {/* Interactive Google Map with Quest Markers */}
          <QuestNearbyMap />
        </div>
      </section>
    </>
  );
}

export default UserExploreHero;
