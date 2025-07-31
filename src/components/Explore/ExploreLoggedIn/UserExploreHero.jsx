import React from "react";

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

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Outdoors", "Food", "Art", "More"].map((label, index) => (
                <button
                  key={index}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium ${
                    label === "Food"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-96 bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            <span>🗺️ Map showing nearby quests</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserExploreHero;
