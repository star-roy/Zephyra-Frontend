import React, { useState } from "react";

// Dummy Data
const quests = [
  {
    title: "Landmark Tour",
    desc: "Visit 5 iconic landmarks in the city.",
    xp: 50,
    status: "Completed",
    image: "/images/quest-landmark.jpg",
  },
  {
    title: "Park Explorer",
    desc: "Discover 3 city parks.",
    xp: 30,
    status: "In Progress",
    image: "/images/quest-park.jpg",
  },
  {
    title: "Cafe Hopper",
    desc: "Try 5 local cafes.",
    xp: 20,
    status: "Completed",
    image: "/images/quest-cafe.jpg",
  },
  {
    title: "Foodie Trail",
    desc: "Taste dishes at 5 new restaurants.",
    xp: 40,
    status: "Completed",
    image: "/images/quest-foodie.jpg",
  },
  {
    title: "History Walk",
    desc: "Explore 3 historical neighborhoods.",
    xp: 25,
    status: "In Progress",
    image: "/images/quest-history.jpg",
  },
];

const badges = [
  {
    title: "City Explorer",
    desc: "Awarded for completing 10 quests.",
    image: "/images/badge-city-explorer.jpg",
    earned: true,
  },
  {
    title: "Nature Lover",
    desc: "Awarded for exploring 5 parks.",
    image: "/images/badge-nature-lover.jpg",
    earned: false,
  },
  {
    title: "Coffee Connoisseur",
    desc: "Awarded for visiting 5 cafes.",
    image: "/images/badge-coffee.jpg",
    earned: true,
  },
  {
    title: "Food Critic",
    desc: "Awarded for trying 10 restaurants.",
    image: "/images/badge-food-critic.jpg",
    earned: false,
  },
  {
    title: "History Buff",
    desc: "Awarded for exploring 5 historical sites.",
    image: "/images/badge-history.jpg",
    earned: true,
  },
];

const friends = [
  {
    name: "Alex Kim",
    handle: "@alexk",
    avatar: "/images/avatar-alex.png",
    status: "Online",
    bio: "Urban adventurer & photographer.",
  },
  {
    name: "Priya Patel",
    handle: "@priyap",
    avatar: "/images/avatar-priya.png",
    status: "Offline",
    bio: "Foodie and art lover.",
  },
  {
    name: "Liam Nguyen",
    handle: "@liamng",
    avatar: "/images/avatar-liam.png",
    status: "Online",
    bio: "Nature explorer & cyclist.",
  },
  {
    name: "Sara Lee",
    handle: "@saralee",
    avatar: "/images/avatar-sara.png",
    status: "Online",
    bio: "Coffee lover & city walker.",
  },
  {
    name: "David Chen",
    handle: "@davidc",
    avatar: "/images/avatar-david.png",
    status: "Offline",
    bio: "History buff & foodie.",
  },
];

// --- Quests Tab ---
function QuestsTab() {
  const [showAll, setShowAll] = useState(false);
  const MAX = 3;
  const displayedQuests = showAll ? quests : quests.slice(0, MAX);
  const hasMore = quests.length > MAX && !showAll;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {displayedQuests.map((quest, i) => (
          <div
            key={i}
            className="relative rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col transition hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          >
            <div className="h-32 w-full relative">
              <img
                src={quest.image}
                alt={quest.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <span className="absolute top-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
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
            </div>
            <div className="px-6 py-5 flex-1 flex flex-col">
              <div className="font-bold text-slate-900 text-xl mb-1">{quest.title}</div>
              <div className="text-slate-500 text-sm mb-4">{quest.desc}</div>
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full py-2 font-semibold shadow mt-auto">
                View Quest
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
      {showAll && quests.length > MAX && (
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
  const [showAll, setShowAll] = useState(false);
  const MAX = 3;
  const displayedBadges = showAll ? badges : badges.slice(0, MAX);
  const hasMore = badges.length > MAX && !showAll;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {displayedBadges.map((badge, i) => (
          <div
            key={i}
            className={`rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1 p-6 ${
              !badge.earned ? "opacity-60 grayscale" : ""
            }`}
          >
            <div className="relative mb-3">
              <img
                src={badge.image}
                alt={badge.title}
                className="w-20 h-20 rounded-full object-cover border-4 border-teal-100 shadow"
              />
              <span className={`absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-bold shadow ${
                badge.earned ? "bg-teal-500 text-white" : "bg-slate-300 text-slate-600"
              }`}>
                {badge.earned ? "Earned" : "Locked"}
              </span>
            </div>
            <div className="font-bold text-slate-900 text-lg mb-1 text-center">
              {badge.title}
            </div>
            <div className="text-slate-500 text-sm text-center mb-3">{badge.desc}</div>
            <button
              className={`${
                badge.earned
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
                  : "bg-slate-200 text-slate-600"
              } rounded-full py-2 px-5 font-semibold shadow mt-auto transition`}
            >
              {badge.earned ? "View Badge" : "Unlock"}
            </button>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
      {showAll && badges.length > MAX && (
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

// --- Friends Tab ---
function FriendsTab() {
  const [showAll, setShowAll] = useState(false);
  const MAX = 3;
  const displayedFriends = showAll ? friends : friends.slice(0, MAX);
  const hasMore = friends.length > MAX && !showAll;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {displayedFriends.map((friend, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-lg border border-slate-100 flex flex-col items-center p-6 transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative mb-2">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-teal-100 shadow"
              />
              <span
                className={`absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-bold shadow ${
                  friend.status === "Online"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-300 text-slate-600"
                }`}
              >
                {friend.status}
              </span>
            </div>
            <div className="font-bold text-slate-900 text-md mb-1">{friend.name}</div>
            <div className="text-teal-500 font-medium mb-1">{friend.handle}</div>
            <div className="text-slate-500 text-sm text-center mb-2">{friend.bio}</div>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full py-2 px-5 font-semibold shadow mt-auto">
              View Profile
            </button>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
      {showAll && friends.length > MAX && (
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

export { QuestsTab, BadgesTab, FriendsTab };