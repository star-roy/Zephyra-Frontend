import React from "react";
import { useNavigate } from "react-router-dom";

export default function OngoingQuestCard({ quest }) {
  const navigate = useNavigate();

  const questData = quest?.quest_id || quest;
  const questId = questData?._id || quest?._id;
  const progressId = quest?._id; 
  const image = questData?.files?.[0]?.file_url || questData?.image;
  const title = questData?.title;
  const description = questData?.description;
  const progress = quest?.progress || 0;
  const xpReward = questData?.xp || 200;
  const timeRemaining = "2 days left";

  const handleContinueQuest = () => {
    if (questId) {
      navigate(`/quest-in-progress/${questId}`);
    } else {
      console.error('Quest ID not found', { quest, questData, questId, progressId });
    }
  };

  let progressValue = typeof progress === "number" ? progress : 0;
  if (progressValue < 0) progressValue = 0;
  if (progressValue > 100) progressValue = 100;


  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;


  const fallbackImg =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="relative bg-gradient-to-br from-white via-indigo-100 to-blue-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-300">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
            <span className="text-midnightIndigo font-semibold text-sm">Active Quest</span>
          </div>
          <div className="bg-white/25 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/40">
            <div className="flex items-center gap-1.5 text-indigo-500">
              <span className="text-orange-300 text-sm">⏰</span>
              <span className="font-medium text-xs">{timeRemaining}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative sm:w-44 sm:min-w-44">
            <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden shadow-lg border-2 border-white/20">
              <img
                src={image || fallbackImg}
                alt={title || "Quest Image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImg;
                }}
              />
            </div>
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-white rounded-full shadow-xl border-2 border-indigo-100 flex items-center justify-center">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 28 28">
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-0.5">
                    <span className="text-base font-bold text-gray-800">{progressValue}</span>
                    <span className="text-xs font-semibold text-gray-600">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-midnightIndigo flex flex-col">
            <h2 className="text-xl font-bold mb-2 leading-tight text-midnightIndigo">
              {title || "Explore the Hidden Gems of Downtown"}
            </h2>
            <p className="text-midnightIndigo text-md mb-3 leading-relaxed line-clamp-2">
              {description ||
                "Discover the secret spots and local favorites in the heart of the city. Visit historic landmarks, hidden cafes, and underground passages that only locals know about."}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-yellow-200 text-lg">⚡</span>
                <span className="text-indigo-500 font-bold text-sm">+{xpReward} XP</span>
              </div>
              <button
                onClick={handleContinueQuest}
                className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white font-bold text-md px-5 py-2.5 rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2 border border-blue-100"
              >
                Continue Quest
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}