import React from "react";
import { Link } from "react-router-dom";

function ExplorerHubSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo mb-8 tracking-tight">
          Your Explorer Hub
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-7 flex flex-col sm:flex-row sm:items-center justify-between border border-duskHaze">
              <Link
                to="/badge-collection"
                className="absolute top-5 right-5 px-4 py-1.5 text-sm font-semibold text-white border border-blue-400 rounded-full bg-blue-400 shadow hover:bg-blue-600 transition"
              >
                View All
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white border border-indigo-400/70 text-indigo-500 rounded-lg p-2 shadow">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
                      <path d="M8 12h8M12 8v8" strokeWidth="2" />
                    </svg>
                  </span>
                  <span className="font-semibold text-midnightIndigo text-lg">Badges in Progress</span>
                </div>
                <p className="text-sm text-stormyGrey mb-3">You have <span className="font-bold text-blue-400">2 badges</span> in progress. Keep it up!</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-midnightIndigo font-medium">Echo Finder</span>
                    <span className="text-xs text-stormyGrey">20%</span>
                  </div>
                  <div className="w-full h-2 bg-duskHaze rounded-full">
                    <div className="h-2 bg-gradient-to-r from-indigo-300 via-indigo-400 to-blue-600 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-midnightIndigo font-medium">Bite Seeker</span>
                    <span className="text-xs text-stormyGrey">70%</span>
                  </div>
                  <div className="w-full h-2 bg-duskHaze rounded-full">
                    <div className="h-2 bg-gradient-to-r from-indigo-300 via-indigo-400 to-blue-600 rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-7 border  border-blue-200">
              <div className="flex items-center gap-2 mb-4 ">
                <span className="bg-white border border-indigo-400/70 rounded-lg p-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2v20m10-10H2" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="font-semibold text-midnightIndigo text-lg">My Active Quests</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-midnightIndigo">City Murals Tour</span>
                  <span className="text-indigo-500 font-semibold">3 of 5 murals found</span>
                </div>
                <div className="w-full h-2 bg-duskHaze rounded-full">
                  <div className="h-2 bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-600 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-midnightIndigo">Local Eats Challenge</span>
                  <span className="text-indigo-500 font-semibold">1 of 3 restaurants visited</span>
                </div>
                <div className="w-full h-2 bg-duskHaze rounded-full">
                  <div className="h-2 bg-gradient-to-r from-indigo-300 via-indigo-400 to-blue-600 rounded-full" style={{ width: "33%" }} />
                </div>
              </div>
              <Link
                to="/my-quest"
                className="mt-2 inline-block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg transition"
              >
                Manage Quests
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-7 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white border border-indigo-400/70 rounded-lg p-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2v20m10-10H2" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="font-semibold text-midnightIndigo text-lg">Friends' Activity</span>
              </div>
              <ul className="mb-6 space-y-4">
                <li className="flex items-center gap-3 text-sm text-stormyGrey">
                  <img
                    src="/assets/3duser.webp"
                    alt="Jane Doe"
                    className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <span>
                    <span className="font-semibold text-midnightIndigo">Jane Doe</span> just earned the{" "}
                    <span className="font-semibold text-blue-500">‘Park Wanderer’</span> badge.
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-stormyGrey">
                  <img
                    src="/assets/3duser.webp"
                    alt="John Smith"
                    className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <span>
                    <span className="font-semibold text-midnightIndigo">John Smith</span> started the{" "}
                    <span className="font-semibold text-indigo-500">‘Mountain Hike’</span> quest.
                  </span>
                </li>
              </ul>
              <Link
                to="/feed"
                className="inline-block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full shadow hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg transition"
              >
                View Feed
              </Link>
            </div>

            <div className="bg-gradient-to-br from-white to-indigo-100 rounded-2xl shadow-lg p-7 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white border border-indigo-400/70 rounded-lg p-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" />
                    <path d="M12 8v4l3 3" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="font-semibold text-midnightIndigo text-lg">Quick Access</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/profile"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full shadow hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition text-center"
                >
                  View Profile
                </Link>
                <Link
                  to="/leaderboard"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition text-center"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/badges"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition text-center"
                >
                  Badges
                </Link>
                <Link
                  to="/messages"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full shadow hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition text-center"
                >
                  Messages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplorerHubSection;