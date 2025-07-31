import React, { useState } from "react";
import { categoriesData } from "../../Cards/CategoriesData";
import InlineQuestScroller from "../../Cards/InlineQuestScroller";

function BrowseCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-semibold text-midnightIndigo mb-6">
          Browse by Category
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoriesData.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory?.name === cat.name ? null : cat
                  )
                }
                className="relative rounded-xl overflow-hidden group h-28 sm:h-32 md:h-36 shadow-sm hover:shadow-md transition focus:outline-none"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
                  <Icon className="text-white text-2xl sm:text-3xl mb-1" />
                  <span className="text-sm sm:text-base font-medium">
                    {cat.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Inline Quest Scroller */}
        {selectedCategory && selectedCategory.quests.length > 0 && (
          <div className="mt-10 bg-white border border-zephyralite rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-midnightIndigo">
                Fuel Your Quest with {selectedCategory.label}
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-gray-500 hover:text-midnightIndigo"
              >
                ✕ Close
              </button>
            </div>
            <InlineQuestScroller cards={selectedCategory.quests} />
          </div>
        )}
      </div>
    </section>
  );
}

export default BrowseCategories;
