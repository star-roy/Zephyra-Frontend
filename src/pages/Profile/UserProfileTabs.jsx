import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserFriends } from "../../features/friendsSlice";

// --- Quests Tab ---
function QuestsTab() {
  const navigate = useNavigate();
  const { ongoingQuests, completedQuests } = useSelector(state => state.quest);
  const [showAll, setShowAll] = useState(false);
  
  const allQuests = React.useMemo(() => {
    const questsList = [];
    
    if (ongoingQuests && Array.isArray(ongoingQuests)) {
      ongoingQuests.forEach(questProgress => {
        const quest = questProgress.quest_id || questProgress.quest;
        if (quest) {
          questsList.push({
            id: quest._id || quest.id,
            title: quest.title,
            desc: quest.description,
            xp: quest.xp || 0,
            status: "In Progress",
            image: quest.files?.[0]?.file_url || "/assets/history.webp",
            category: quest.category,
            progress: questProgress.progress || 0,
            type: "ongoing"
          });
        }
      });
    }
    
    if (completedQuests && Array.isArray(completedQuests)) {
      completedQuests.forEach(questProgress => {
        const quest = questProgress.quest_id || questProgress.quest;
        if (quest) {
          questsList.push({
            id: quest._id || quest.id,
            title: quest.title,
            desc: quest.description,
            xp: quest.xp || 0,
            status: "Completed",
            image: quest.files?.[0]?.file_url || "/assets/history.webp",
            category: quest.category,
            progress: 100,
            type: "completed",
            completedAt: questProgress.completedAt
          });
        }
      });
    }

    return questsList.sort((a, b) => {
      if (a.type === "ongoing" && b.type === "completed") return -1;
      if (a.type === "completed" && b.type === "ongoing") return 1;
      if (a.type === "completed" && b.type === "completed") {
        return new Date(b.completedAt) - new Date(a.completedAt);
      }
      return 0;
    });
  }, [ongoingQuests, completedQuests]);
  
  const MAX = 6;
  const displayedQuests = showAll ? allQuests : allQuests.slice(0, MAX);
  const hasMore = allQuests.length > MAX && !showAll;
  
  const handleQuestClick = (quest) => {
    if (quest.type === "ongoing") {
      navigate(`/quest-in-progress/${quest.id}`);
    } else {
      navigate(`/quest-overview/${quest.id}`);
    }
  };

  if (allQuests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-500 mb-4 text-lg">No quests found</div>
        <div className="text-slate-400 text-sm mb-6">Start your first quest to see it here!</div>
        <button 
          onClick={() => navigate('/explore')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow"
        >
          Explore Quests
        </button>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {displayedQuests.map((quest, i) => (
          <div
            key={quest.id || i}
            className="relative rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col transition hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => handleQuestClick(quest)}
          >
            <div className="h-32 w-full relative">
              <img
                src={quest.image}
                alt={quest.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <span className="absolute top-3 left-3 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                {quest.xp} XP
              </span>
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${
                  quest.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {quest.status}
              </span>
              {quest.category && (
                <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {quest.category}
                </span>
              )}
            </div>
            <div className="px-6 py-5 flex-1 flex flex-col">
              <div className="font-bold text-slate-900 text-xl mb-2">{quest.title}</div>
              <div className="text-slate-500 text-sm mb-4 overflow-hidden" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical' 
              }}>{quest.desc}</div>
              {quest.type === "ongoing" && quest.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>
                </div>
              )}
              <button 
                className="shine-sweep bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full py-2 font-semibold shadow mt-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuestClick(quest);
                }}
              >
                {quest.type === "ongoing" ? "Continue Quest" : "View Quest"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More ({allQuests.length - MAX} more)
          </button>
        </div>
      )}
      {showAll && allQuests.length > MAX && (
        <div className="flex justify-center mt-4">
          <button
            className="text-teal-600 font-semibold hover:underline px-4 py-1 rounded transition"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </>
  );
}

// --- Badges Tab ---
function BadgesTab() {
  const navigate = useNavigate();
  const { badges } = useSelector(state => state.user);
  
  const [showAll, setShowAll] = useState(false);
  
  const userBadges = React.useMemo(() => {
    if (!badges || !Array.isArray(badges) || badges.length === 0) return [];
    
    return badges.map(userBadge => {
      const badge = userBadge.badge_id || userBadge.badge;
      if (!badge) return null;
      
      return {
        id: badge._id || badge.id,
        title: badge.name,
        desc: badge.description,
        image: badge.imageUrl || badge.image || "/images/badge-default.png",
        category: badge.category,
        rarity: badge.rarity,
        earned: true,
        earnedAt: userBadge.earnedAt,
        xpRequired: badge.xpRequired
      };
    }).filter(Boolean);
  }, [badges]);
  
  const MAX = 6;
  const displayedBadges = showAll ? userBadges : userBadges.slice(0, MAX);
  const hasMore = userBadges.length > MAX && !showAll;
  
  if (userBadges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-slate-500 mb-2 text-lg font-medium">No badges earned yet</div>
          <div className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Complete quests and explore different categories to earn your first badge and show off your achievements!
          </div>
        </div>
        <button 
          onClick={() => navigate('/explore')}
          className="shine-sweep bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-colors"
        >
          Start Exploring Quests
        </button>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {displayedBadges.map((badge, i) => (
          <div
            key={badge.id || i}
            className="rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1 p-6"
          >
            <div className="relative mb-3">
              <img
                src={badge.image}
                alt={badge.title}
                className="w-20 h-20 rounded-full object-cover border-4 border-teal-100 shadow"
                onError={(e) => {
                  e.target.src = "/images/badge-default.png";
                }}
              />
              <span className="absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-bold shadow bg-blue-500 text-white">
                Earned
              </span>
            </div>
            <div className="font-bold text-slate-900 text-lg mb-1 text-center">
              {badge.title}
            </div>
            <div className="text-slate-500 text-sm text-center mb-2 overflow-hidden" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {badge.desc}
            </div>
            {badge.category && (
              <div className="text-blue-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                {badge.category}
              </div>
            )}
            {badge.earnedAt && (
              <div className="text-slate-400 text-xs mb-3">
                Earned on {new Date(badge.earnedAt).toLocaleDateString()}
              </div>
            )}
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full py-2 px-5 font-semibold shadow mt-auto transition hover:from-blue-600 hover:to-blue-700"
            >
              View Badge
            </button>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More ({userBadges.length - MAX} more)
          </button>
        </div>
      )}
      {showAll && userBadges.length > MAX && (
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-600 font-semibold hover:underline px-4 py-1 rounded transition"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </>
  );
}

// --- Friends Tab ---
function FriendsTab() {
  const dispatch = useDispatch();
  const { friends, isLoading } = useSelector(state => state.friends);
  const { userData } = useSelector(state => state.auth);
  
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserFriends());
    }
  }, [dispatch, userData?._id]);
  
  const MAX = 3;
  const displayedFriends = showAll ? friends : friends.slice(0, MAX);
  const hasMore = friends.length > MAX && !showAll;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (friends.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-slate-500 mb-4">No friends found</div>
        <div className="text-slate-400 text-sm">Start connecting with other users to see them here!</div>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {displayedFriends.map((friend, i) => (
          <div
            key={friend._id || i}
            className="rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col items-center p-6 transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative mb-2">
              <img
                src={friend.avatar || "/images/avatar-default.png"}
                alt={friend.fullName || friend.username}
                className="w-16 h-16 rounded-full object-cover border-4 border-teal-100 shadow"
              />
              <span
                className={`absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-bold shadow ${
                  friend.status === "Online"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-300 text-slate-600"
                }`}
              >
                {friend.status || "Offline"}
              </span>
            </div>
            <div className="font-bold text-slate-900 text-md mb-1">
              {friend.fullName || friend.username}
            </div>
            <div className="text-blue-500 font-medium mb-1">
              @{friend.username}
            </div>
            <div className="text-slate-500 text-sm text-center mb-2">
              {friend.bio || "No bio available"}
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full py-2 px-5 font-semibold shadow mt-auto">
              View Profile
            </button>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
      {showAll && friends.length > MAX && (
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-600 font-semibold hover:underline px-4 py-1 rounded transition"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </>
  );
}

export { QuestsTab, BadgesTab, FriendsTab };