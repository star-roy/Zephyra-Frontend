import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuestCard({ quest }) {
  const navigate = useNavigate();
  
  if (!quest) {
    return null; 
  }

  const { 
    _id: id, 
    title, 
    description, 
    difficulty = "Medium", 
    xp = 150,
    files = []
  } = quest;

  const handleViewQuest = () => {
    navigate(`/quest-overview/${id}`);
  };

  const questImage = files.length > 0 ? files[0].file_url : null;
  const fallbackImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
  return (
    <div
      className="bg-white rounded-3xl shadow-md border border-purple-100 h-80 max-w-sm flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative hover:shadow-indigo-500/40 group"
      onClick={() => navigate(`/quest-overview/${id}`)}
      tabIndex={0}
    >
      <div className="relative overflow-hidden">
        <img
          src={questImage || fallbackImg}
          alt={title}
          className="w-full object-cover rounded-t-3xl bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          style={{ height: '120px' }}
          onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-400/10 rounded-t-3xl" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-xs px-3 py-1 rounded-full border border-purple-200 shadow-lg">
          {difficulty}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="font-bold text-purple-600 text-base mb-2 leading-tight line-clamp-2">
          {title}
        </div>
        <div className="text-gray-700 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-purple-100 mt-auto">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-purple-200 px-3 py-1.5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-base">⚡</span>
            <span className="text-purple-700 text-xs font-bold">+{xp} XP</span>
          </div>

          <button
            className="shine-sweep bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold text-sm border-none rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 shadow-lg hover:from-purple-600 hover:to-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              handleViewQuest();
            }}
          >
            View Quest
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-amber-400/80 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-b-3xl" />
    </div>
  );
}