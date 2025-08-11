import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuestCard({ quest }) {
  const navigate = useNavigate();
  
  // Guard clause to handle undefined quest
  if (!quest) {
    return null; // or return a placeholder component
  }

  // Destructure quest data from backend
  const { 
    _id: id, 
    title, 
    description, 
    difficulty = "Medium", 
    xp = 150,
    files = [] // quest photos from backend
  } = quest;

  const handleViewQuest = () => {
    navigate(`/quest-overview/${id}`);
  };

  // Get first image from quest files or use fallback
  const questImage = files.length > 0 ? files[0].file_url : null;
  const fallbackImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
  return (
    <div
      className="bg-gradient-to-br from-white via-purple-50 to-amber-50 rounded-3xl shadow-2xl border border-purple-100 min-h-70 max-w-sm flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative hover:shadow-purple-300/40 group"
      onClick={() => navigate(`/quest-overview/${id}`)}
      tabIndex={0}
    >
      {/* Image with overlay gradient */}
      <div className="relative overflow-hidden">
        <img
          src={questImage || fallbackImg}
          alt={title}
          className="w-full h-35 object-cover rounded-t-3xl bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          style={{ height: '140px' }}
          onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-400/10 rounded-t-3xl" />
        {/* Difficulty badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-400/90 to-amber-300/90 text-white font-semibold text-xs px-3 py-1 rounded-full border border-purple-200 shadow-lg">
          {difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pb-4 flex-1 flex flex-col">
        <div className="font-extrabold text-purple-900 text-lg mb-2 leading-tight">
          {title}
        </div>
        <div className="text-gray-700 text-sm leading-relaxed mb-5 flex-1">
          {description}
        </div>
        {/* Bottom row with XP and View Quest button */}
        <div className="flex justify-between items-center pt-4 border-t border-purple-100">
          {/* XP on the left */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-purple-100 px-3 py-1.5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-base">⚡</span>
            <span className="text-purple-700 text-xs font-bold">+{xp} XP</span>
          </div>

          {/* View Quest button on the right */}
          <button
            className="bg-gradient-to-r from-purple-500 via-purple-600 to-amber-400 text-white font-semibold text-sm border-none rounded-xl px-5 py-2.5 cursor-pointer transition-all duration-200 shadow-lg hover:from-purple-600 hover:to-amber-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-amber-400/80 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-b-3xl" />
    </div>
  );
}