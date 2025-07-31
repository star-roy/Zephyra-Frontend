import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateQuestSection() {
  const navigate = useNavigate();

  const handleCreateQuest = () => {
    navigate('/create-quest');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 mb-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Create Your Own Quest
        </h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          Design unique adventures and challenges for the community to enjoy
        </p>
        <button
          onClick={handleCreateQuest}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Quest
        </button>
      </div>
    </div>
  );
}