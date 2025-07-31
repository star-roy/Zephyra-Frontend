import React from "react";
import { useParams } from "react-router-dom";
import { categoriesData } from "../../components/Cards/CategoriesData.js";

function QuestOverview() {
  const { questId } = useParams();

  const allQuests = categoriesData.flatMap((cat) => cat.quests);
  const quest = allQuests.find((q) => q.id === questId);

  if (!quest) {
    return (
      <div className="text-center py-20 text-gray-500">Quest not found.</div>
    );
  }

  return (
    <div className="w-full bg-[#F9FAFB] text-midnightIndigo pb-16">
      {/* 📸 Banner Image */}
      <div className="w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] overflow-hidden relative">
        <img
          src={quest.image}
          alt={quest.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 xl:px-14 -mt-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 relative z-10">
        {/* 🧭 Left Section */}
        <div className="space-y-6">
          {/* Quest Details */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-md border border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{quest.title}</h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {quest.description || "Get ready for a thrilling adventure that will take you through exciting places and hidden stories."}
            </p>
          </div>

          {/* Start Adventure */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Start Your Adventure</h2>
            <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base">
              <li>Follow the instructions provided in the quest</li>
              <li>Submit proof to earn rewards</li>
              <li>XP will be added after successful verification</li>
            </ul>
            <button className="mt-4 w-full py-3 rounded-xl bg-midnightIndigo text-white font-semibold hover:bg-indigo-900 transition">
              Start Quest
            </button>
          </div>
        </div>

        {/* 🎯 Right Section */}
        <div className="space-y-6">
          {/* XP Box */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center text-center">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Reward
            </span>
            <div className="text-green-500 font-bold text-3xl">
              +{quest.xp || "50"} XP
            </div>
          </div>

          {/* Tag / Category Box */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center text-center">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Category
            </span>
            <span className="text-base font-semibold text-zephyraBlue">
              {quest.tag || "Adventure"}
            </span>
          </div>

          {/* Ratings / Reviews Box */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-base font-semibold mb-2 text-center">
              Explorer Reviews
            </h3>
            <p className="text-sm text-gray-500 text-center">
              ⭐️⭐️⭐️⭐️☆ (231 reviews)
            </p>
          </div>

          {/* Achievements Box */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 text-center">
            <h3 className="text-base font-semibold mb-2">Earnable Badges</h3>
            <div className="flex justify-center gap-2 flex-wrap text-sm text-stormyGrey">
              <span className="px-3 py-1 bg-gray-100 rounded-full">Trailblazer</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Photo Pro</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Urban Explorer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestOverview;
