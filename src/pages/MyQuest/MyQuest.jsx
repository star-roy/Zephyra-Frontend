import React from "react";
import { useNavigate } from "react-router-dom";
import ForYouCard from "../../components/Cards/QuestCard.jsx";
import CompletedQuestRow from "../../components/Cards/CompletedQuestRow.jsx";
import OngoingQuestsSection from "./OngoingQuestsSection.jsx";
import useGridColumnCount from "../../Hook/useGridColumnCount.js"; // Add the path as needed

// Import from the correct path
import { 
  ongoingQuests, 
  forYouCards, 
  userCreatedQuests,
  completedQuests, 
  userProfile 
} from "../../Data/DummyData.js";

// User Created Quest Card Component
function UserCreatedQuestCard({ image, title, description, participants, status, createdAt }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-70 cursor-pointer flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full object-cover bg-gray-50"
          style={{ height: '140px' }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-gray-700">{participants} participants</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="font-bold text-gray-900 text-lg mb-2">{title}</div>
        <div className="text-gray-600 text-sm leading-relaxed flex-1 mb-3">{description}</div>
        <div className="text-xs text-gray-500">Created on {formatDate(createdAt)}</div>
      </div>
    </div>
  );
}

// Create Quest Section Component
function CreateQuestSection() {
  const navigate = useNavigate();

  const handleCreateQuest = () => {
    navigate('/create-quest');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-xl opacity-20 scale-110 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-4 shadow-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Create Your Own Quest
        </h3>
        <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
          Design unique adventures and challenges for the community to enjoy. Share your creativity and inspire others!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-indigo-100">
            <span className="text-indigo-500">🎨</span>
            <span className="text-sm font-medium text-gray-700">Custom Design</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100">
            <span className="text-purple-500">🏆</span>
            <span className="text-sm font-medium text-gray-700">Set Rewards</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-100">
            <span className="text-pink-500">🌍</span>
            <span className="text-sm font-medium text-gray-700">Share Globally</span>
          </div>
        </div>
        
        <button
          onClick={handleCreateQuest}
          className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Quest
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main Page Component
function MyQuestsPage() {
  // Responsive grid columns for recommended, user created, etc.
  const recommendedColumns = useGridColumnCount();
  const createdColumns = useGridColumnCount();

  // Format last login time
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    }) + ' UTC';
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-2">
            Welcome back, {userProfile.displayName}! 👋
          </h1>
          <div className="text-gray-600 text-base sm:text-lg font-medium">
            Track your adventures and revisit your favorite discoveries.
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Last login: {formatLastLogin(userProfile.lastLogin)}
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Level {userProfile.level}
            </span>
            <span>{userProfile.totalXP} XP</span>
            <span>{userProfile.questsCompleted} Quests Completed</span>
            <span className="text-green-600">{userProfile.currentStreak} day streak 🔥</span>
          </div>
        </div>

        {/* Ongoing Quests Section */}
        <OngoingQuestsSection ongoingQuests={ongoingQuests} />

        {/* Create Quest Section */}
        <CreateQuestSection />

        {/* For You */}
        <div className="mb-12">
          <h2 className="font-bold text-2xl text-gray-900 mb-5">
            Recommended For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forYouCards.slice(0, recommendedColumns).map((card) => (
              <ForYouCard key={card.id} {...card} />
            ))}
          </div>
        </div>

        {/* User Created Quests - Only show if user has created quests */}
        {userCreatedQuests && userCreatedQuests.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-2xl text-gray-900">
                My Created Quests ({userCreatedQuests.length})
              </h2>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200">
                Manage All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCreatedQuests.slice(0, createdColumns).map((quest) => (
                <UserCreatedQuestCard key={quest.id} {...quest} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Quests */}
        <div>
          <h2 className="font-bold text-2xl text-gray-900 mb-5">
            Completed Quests ({completedQuests.length})
          </h2>
          <div className="space-y-3">
            {completedQuests.map((q) => (
              <CompletedQuestRow key={q.id} {...q} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyQuestsPage;