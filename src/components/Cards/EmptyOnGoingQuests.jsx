import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmptyOngoingQuests() {
  const navigate = useNavigate();

  const handleBrowseQuests = () => {
    navigate('/explore');
  };

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-8 text-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-8 w-20 h-20 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-4 w-16 h-16 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-pink-400 rounded-full animate-ping"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Compact Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-xl opacity-20 scale-110 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-4 shadow-xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Compact Text Content */}
        <div className="mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ready for Adventure?
          </h3>
          <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto leading-relaxed">
            Your quest journal is empty. Discover amazing adventures waiting for you!
          </p>
          
          {/* Compact feature highlights */}
          <div className="flex justify-center gap-3 mb-5">
            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-indigo-100">
              <span className="text-indigo-500 text-sm">🌟</span>
              <span className="text-xs font-medium text-gray-700">Earn XP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-purple-100">
              <span className="text-purple-500 text-sm">🗺️</span>
              <span className="text-xs font-medium text-gray-700">Explore</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-pink-100">
              <span className="text-pink-500 text-sm">🎯</span>
              <span className="text-xs font-medium text-gray-700">Challenges</span>
            </div>
          </div>
        </div>
        
        {/* Compact Action Button */}
        <button
          onClick={handleBrowseQuests}
          className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base px-8 py-3 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2 mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Discover Quests
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </button>
      </div>
    </div>
  );
}