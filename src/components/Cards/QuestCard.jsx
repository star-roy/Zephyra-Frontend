import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuestCard({ id, image, title, description, difficulty = "Medium", xp = 150 }) {
  const navigate = useNavigate();

  const handleViewQuest = () => {
    navigate(`/quest-overview/${id}`);
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-lg border border-gray-100 min-h-70 max-w-sm flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative hover:scale-[1.02] hover:shadow-2xl group"
      onClick={() => navigate(`/quest-overview/${id}`)}
      tabIndex={0}
    >
      {/* Image with overlay gradient */}
      <div className="relative overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-35 object-cover rounded-t-3xl bg-gray-50 transition-transform duration-300"
            style={{ height: '140px' }}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-400/10 rounded-t-3xl" />
        
        {/* Difficulty badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-blue-500 font-semibold text-xs px-3 py-1 rounded-full border border-purple-200 shadow-md">
          {difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pb-4 flex-1 flex flex-col">
        <div className="font-bold text-gray-900 text-lg mb-2 leading-tight">
          {title}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
          {description}
        </div>
        
        {/* Bottom row with XP and View Quest button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {/* XP on the left */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-purple-50 px-3 py-1.5 rounded-2xl border border-gray-100">
            <span className="text-base">⚡</span>
            <span className="text-purple-600 text-xs font-bold">+{xp} XP</span>
          </div>

          {/* View Quest button on the right */}
          <button
            className="bg-zephyraBlue text-white font-semibold text-sm border-none rounded-lg px-5 py-2.5 cursor-pointer transition-all duration-200 shadow-md shadow-purple-600/25 hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              handleViewQuest();
            }}
          >
            View Quest
          </button>
        </div>
      </div>

      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-amber-400/80 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
}