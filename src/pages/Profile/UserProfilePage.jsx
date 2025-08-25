import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QuestsTab, BadgesTab, FriendsTab } from "./UserProfileTabs";
import { fetchCurrentUserProfile } from "../../features/userSlice.js";
import { fetchMyQuestDashboard } from "../../features/questSlice.js";
import { SkeletonProfile, SkeletonStatCard } from "../../components/index.js";

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow border border-slate-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col items-center justify-center min-w-0 w-full">
      <span className="text-xl sm:text-2xl font-bold text-slate-900">{value}</span>
      <span className="text-slate-500 text-xs sm:text-sm mt-1 text-center">{label}</span>
    </div>
  );
}

function ActivityCard({ image, title, xp, status, type }) {
  const getStatusColor = () => {
    switch (type) {
      case "ongoing":
        return "text-blue-600 bg-blue-50";
      case "completed":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-slate-100 p-3 sm:p-4 flex flex-col items-start transition hover:shadow-lg hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-28 sm:h-32 object-cover rounded-md mb-3" />
      <div className="font-semibold text-slate-800 mb-2 text-xs sm:text-sm leading-tight line-clamp-2">{title}</div>
      <div className="flex items-center justify-between w-full mt-auto">
        <div className="text-teal-500 text-xs sm:text-sm font-medium">
          {xp > 0 ? `+${xp} XP` : status}
        </div>
        {status && xp > 0 && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux
  const { userData: authUserData } = useSelector(state => state.auth);
  const { userProfile, stats, loading } = useSelector(state => state.user);
  const { 
    ongoingQuests, 
    completedQuests, 
    dashboardLoading, 
    dashboardStats 
  } = useSelector(state => state.quest);
  
  // Use auth data as primary source
  const user = authUserData || userProfile;
  const userStats = stats;


  // Fetch data on component mount
  useEffect(() => {
    if (authUserData?._id) {
      dispatch(fetchCurrentUserProfile());
      dispatch(fetchMyQuestDashboard());
    }
  }, [dispatch, authUserData?._id]);

  // Generate activities from actual quest data
  const activities = useMemo(() => {
    const recentActivities = [];

    if (ongoingQuests && Array.isArray(ongoingQuests)) {
      ongoingQuests.slice(0, 2).forEach(questProgress => {
        const quest = questProgress.quest_id || questProgress.quest;
        if (quest) {
          recentActivities.push({
            image: quest.files?.[0]?.file_url || "/assets/history.webp",
            title: `Ongoing Quest: ${quest.title}`,
            xp: quest.xp || 50,
            status: "In Progress",
            type: "ongoing"
          });
        }
      });
    }

    if (completedQuests && Array.isArray(completedQuests)) {
      completedQuests.slice(0, 2).forEach(questProgress => {
        const quest = questProgress.quest_id || questProgress.quest;
        if (quest) {
          recentActivities.push({
            image: quest.files?.[0]?.file_url || "/assets/history.webp",
            title: `Completed Quest: ${quest.title}`,
            xp: quest.xp || 50,
            status: "Completed",
            type: "completed"
          });
        }
      });
    }

    if (recentActivities.length === 0) {
      return [
        {
          image: "/assets/history.webp",
          title: "No recent quest activity",
          xp: 0,
          status: "Start your first quest!",
          type: "placeholder"
        }
      ];
    }

    return recentActivities
      .sort((a, b) => {
        if (a.type === "ongoing" && b.type === "completed") return -1;
        if (a.type === "completed" && b.type === "ongoing") return 1;
        return 0;
      })
      .slice(0, 3);
  }, [ongoingQuests, completedQuests]);

  if (loading || dashboardLoading) {
    return (
      <div className="bg-blue-50 pt-4 min-h-screen pb-16">
        <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-4">
          <SkeletonProfile />
        </div>

        <div className="max-w-4xl mx-auto px-4 mb-14 mt-8">
          <div className="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonStatCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 pt-4 min-h-screen pb-16">
      <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-4">
        <div className="relative">
          <img
            src={user?.coverImage || "/assets/default-cover.webp"}
            alt="Profile Cover"
            className="w-full h-32 sm:h-40 object-cover rounded-2xl"
            onError={(e) => {
              e.target.src = "/assets/default-cover.webp";
            }}
          />
          <div className="absolute left-1/2 top-24 sm:top-32 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={user?.avatar || "/assets/user-avatar2.jpeg"}
              alt="Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-slate-200 shadow object-cover"
              onError={(e) => {
                e.target.src = "/assets/user-avatar2.jpeg";
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 sm:mt-8 mb-2">
          <div className="text-xl sm:text-2xl font-bold text-slate-800 text-center px-4">
            {user?.fullName || user?.username || 'Unknown User'}
          </div>
          <div className="text-blue-500 font-medium text-sm sm:text-base">
            @{user?.username || 'username'}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 mb-2">
            <span className="text-blue-500 font-bold text-sm sm:text-base">
              Level {userStats?.level || 1}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-blue-500 rounded-full" 
                  style={{ 
                    width: `${userStats ? ((userStats.currentXP / userStats.nextLevelXP) * 100) : 0}%` 
                  }} 
                />
              </div>
              <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                {userStats?.currentXP || 0}/{userStats?.nextLevelXP || 100} XP
              </span>
            </div>
          </div>
          <div className="text-slate-500 text-center max-w-lg px-4 mb-4 text-sm sm:text-base">
            {user?.bio ? (
              <span className="text-slate-700">{user.bio}</span>
            ) : (
              <span className="text-slate-400 italic">No bio added yet. Share something about yourself!</span>
            )}
          </div>
          <button 
            className="shine-sweep bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow mt-2 mb-2 transition-colors text-sm sm:text-base"
            onClick={() => navigate('/settings')}
          >
            Edit Profile
          </button>
        </div>

        <div className="flex justify-center gap-6 sm:gap-10 mt-1 mb-6 sm:mb-8 border-b border-slate-200 overflow-x-auto">
          <button
            className={`pb-2 font-semibold text-sm sm:text-base whitespace-nowrap ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-semibold text-sm sm:text-base whitespace-nowrap ${activeTab === "quests" ? "text-blue-600 border-b-2 border-blue-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("quests")}
          >
            Quests
          </button>
          <button
            className={`pb-2 font-semibold text-sm sm:text-base whitespace-nowrap ${activeTab === "badges" ? "text-blue-600 border-b-2 border-blue-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("badges")}
          >
            Badges
          </button>
          <button
            className={`pb-2 font-semibold text-sm sm:text-base whitespace-nowrap ${activeTab === "friends" ? "text-blue-600 border-b-2 border-blue-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-14">
        {activeTab === "overview" && (
          <>
            <div className="font-bold text-lg text-slate-800 mb-4">Stats</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-10">
              <StatCard 
                label="Quests Completed" 
                value={dashboardStats?.totalCompleted || userStats?.questsCompleted || 0} 
              />
              <StatCard 
                label="Ongoing Quests" 
                value={dashboardStats?.totalOngoing || ongoingQuests?.length || 0} 
              />
              <StatCard 
                label="Total XP Earned" 
                value={userStats?.totalXP || userStats?.currentXP || 0} 
              />
              <StatCard 
                label="Badges Earned" 
                value={userStats?.badgesEarned || 0} 
              />
              <StatCard 
                label="Distance Explored" 
                value={`${userStats?.distanceExplored || 0} km`} 
              />
              <StatCard 
                label="Quests Created" 
                value={dashboardStats?.totalCreated || 0} 
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div className="font-bold text-lg text-slate-800">Recent Activity</div>
              <button className="text-blue-500 font-semibold hover:underline px-4 py-1 rounded transition text-sm sm:text-base w-fit">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activities.map((activity, idx) => (
                <ActivityCard
                  key={idx}
                  image={activity.image}
                  title={activity.title}
                  xp={activity.xp}
                  status={activity.status}
                  type={activity.type}
                />
              ))}
            </div>
          </>
        )}
        {activeTab === "quests" && <QuestsTab />}
        {activeTab === "badges" && <BadgesTab />}
        {activeTab === "friends" && <FriendsTab />}
      </div>
    </div>
  );
}