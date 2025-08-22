import React from "react";
import { useSelector } from "react-redux";
import QuestNearbyMap from "./QuestNearbyMap";
import { MapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function UserExploreHero() {
  const { quests = [] } = useSelector(state => state.quest);
  const nearbyQuests = quests.slice(0, 6); 

  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
              <MagnifyingGlassIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Explore Your World
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover new quests, thrilling adventures, and hidden gems in your local area.
              <br className="hidden sm:block" />
              Your next epic story starts right here, right now.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-12 bg-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <MapIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Quests Near You</h2>
                <p className="text-gray-600">Discover amazing adventures in your neighborhood</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {nearbyQuests.length} quests found
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Live quest locations
              </p>
            </div>
            <QuestNearbyMap />
          </div>
        </div>
      </section>
    </>
  );
}

export default UserExploreHero;
