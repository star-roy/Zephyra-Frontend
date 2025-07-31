import React, { useState } from "react";
import { QuestsTab, BadgesTab, FriendsTab } from "./UserProfileTabs";

// You can adjust the paths to your images as needed
const activities = [
  {
    image: "/assets/hero.png",
    title: "Completed Quest: City Landmark Tour",
    xp: 50,
  },
  {
    image: "/images/activity-park.jpg",
    title: "Completed Quest: Park Exploration",
    xp: 30,
  },
  {
    image: "/images/activity-cafe.jpg",
    title: "Completed Quest: Cafe Hopper",
    xp: 20,
  },
];

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow border border-slate-100 px-8 py-6 flex flex-col items-center justify-center min-w-[120px]">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className="text-slate-500 text-sm mt-1">{label}</span>
    </div>
  );
}

function ActivityCard({ image, title, xp }) {
  return (
    <div className="bg-white rounded-xl shadow border border-slate-100 p-4 flex flex-col items-start transition hover:shadow-lg hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-3" />
      <div className="font-semibold text-slate-800 mb-1">{title}</div>
      <div className="text-teal-500 text-sm">Earned {xp} XP</div>
    </div>
  );
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Cover and Avatar */}
      <div className="max-w-2xl mx-auto mt-10">
        <div className="relative">
          <img
            src="/assets/hero.png"
            alt="Profile Cover"
            className="w-full h-40 object-cover rounded-2xl"
          />
          <div className="absolute left-1/2 top-32 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="/assets/user-avatar2.jpeg"
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 shadow"
            />
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col items-center mt-8 mb-2">
          <div className="text-2xl font-bold text-slate-800">Sophia Carter</div>
          <div className="text-teal-500 font-medium">@sophia_c</div>
          <div className="flex items-center gap-4 mt-2 mb-2">
            <span className="text-teal-600 font-bold">Level 7</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-teal-100 rounded-full overflow-hidden">
                <div className="h-2 bg-teal-500 rounded-full" style={{ width: "70%" }} />
              </div>
              <span className="text-teal-600 text-sm font-semibold">3500/5000 XP</span>
            </div>
          </div>
          <div className="text-slate-500 text-center max-w-lg px-4 mb-4">
            Urban explorer, coffee enthusiast, and seeker of hidden gems. Join me on my quests to uncover the city's secrets!
          </div>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow mt-2 mb-2">
            Edit Profile
          </button>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-10 mt-1 mb-8 border-b border-slate-200">
          <button
            className={`pb-2 font-semibold ${activeTab === "overview" ? "text-teal-600 border-b-2 border-teal-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-semibold ${activeTab === "quests" ? "text-teal-600 border-b-2 border-teal-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("quests")}
          >
            Quests
          </button>
          <button
            className={`pb-2 font-semibold ${activeTab === "badges" ? "text-teal-600 border-b-2 border-teal-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("badges")}
          >
            Badges
          </button>
          <button
            className={`pb-2 font-semibold ${activeTab === "friends" ? "text-teal-600 border-b-2 border-teal-500" : "text-slate-400"}`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-2 mb-14">
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="font-bold text-lg text-slate-800 mb-4">Stats</div>
            <div className="flex flex-wrap gap-6 mb-10">
              <StatCard label="Quests Completed" value="125" />
              <StatCard label="Total XP Earned" value="3500" />
              <StatCard label="Badges Earned" value="32" />
              <StatCard label="Distance Explored" value="75 km" />
            </div>
            {/* Recent Activity */}
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg text-slate-800">Recent Activity</div>
              <button className="text-teal-600 font-semibold hover:underline px-4 py-1 rounded transition">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {activities.map((activity, idx) => (
                <ActivityCard
                  key={idx}
                  image={activity.image}
                  title={activity.title}
                  xp={activity.xp}
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