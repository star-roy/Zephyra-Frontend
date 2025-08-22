import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesData } from "../../Cards/CategoriesData";
import InlineQuestScroller from "../../Cards/InlineQuestScroller";
import { fetchQuestsByCategory } from "../../../features/questSlice";

function BrowseCategories() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categoryQuests, categoryLoading, error } = useSelector((state) => state.quest);

  const handleCategorySelect = (category) => {
    if (selectedCategory?.backendCategory === category.backendCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      dispatch(fetchQuestsByCategory({ 
        category: category.backendCategory, 
        limit: 20 
      }));
    }
  };

  const selectedCategoryQuests = selectedCategory 
    ? categoryQuests[selectedCategory.backendCategory] || [] 
    : [];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-semibold text-midnightIndigo mb-6">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoriesData.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory?.backendCategory === cat.backendCategory;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat)}
                className={`relative rounded-xl overflow-hidden group h-28 sm:h-32 md:h-36 shadow-sm hover:shadow-md transition focus:outline-none ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 group-hover:bg-black/30 transition duration-300 ${
                  isSelected ? 'bg-black/50' : 'bg-black/40'
                }`} />
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

        {selectedCategory && (
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

            {categoryLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnightIndigo"></div>
                <span className="ml-2 text-gray-600">Loading quests...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-2">Failed to load quests</p>
                <button
                  onClick={() => dispatch(fetchQuestsByCategory({ 
                    category: selectedCategory.backendCategory, 
                    limit: 20 
                  }))}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : selectedCategoryQuests.length > 0 ? (
              <InlineQuestScroller cards={selectedCategoryQuests} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg mb-2">No quests found in this category yet</p>
                <p className="text-sm text-gray-400">
                  Be the first to create a quest in {selectedCategory.label}!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default BrowseCategories;
