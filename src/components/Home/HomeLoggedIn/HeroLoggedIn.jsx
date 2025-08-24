import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaCompass } from "react-icons/fa";
import { HiMiniFire } from "react-icons/hi2";
import heroImage from "/assets/bg.webp";

import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserProfile } from "../../../features/userSlice";

function HeroLoggedIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user data from auth slice (which should have current user info)
  const { userData: authUser } = useSelector((state) => state.auth);
  const { userProfile, stats } = useSelector(
    (state) => state.user
  );

  // Use auth user data as primary source, fallback to userProfile
  const name = authUser?.username || userProfile?.username || "Explorer";
  const level = authUser?.level || stats?.level || 1;
  const xp = authUser?.xp || stats?.totalXP || 0;
  const currentTitle = authUser?.rank || stats?.rank || "Novice Explorer";
  const questCount = authUser?.questsCompleted || stats?.questsCompleted || 0;

  useEffect(() => {
    // Only fetch user profile if we have a user ID and don't already have profile data
    if (authUser?._id && !userProfile) {
      dispatch(fetchCurrentUserProfile());
    }
  }, [dispatch, authUser?._id, userProfile]);

  return (
    <section className="w-full px-3 sm:px-6 md:px-10 xl:px-14 py-4 sm:py-8">
      <div
        className="relative max-w-[1400px] mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-[450px] sm:h-[500px] md:h-[550px]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65 z-0" />

        <div className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6 text-white">
          <div className="pt-3 sm:pt-5">
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Welcome back,<br className="sm:hidden" /> {name} !
            </h1>
            <p className="text-sm sm:text-base lg:text-xl xl:text-2xl text-[#e5edf5] mt-4 sm:mt-1 leading-relaxed">
              Keep the streak alive. Your next quest is ready.
            </p>
          </div>

          <div className="pb-3 sm:pb-5">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 items-start sm:items-center mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="bg-white bg-opacity-25 p-2.5 sm:p-3 rounded-full shadow-sm flex-shrink-0">
                  <HiMiniFire className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <p className="text-sm sm:text-sm lg:text-lg font-semibold text-blue-300 truncate">
                    Level {level}
                  </p>
                  <p className="text-xs sm:text-xs lg:text-sm text-[#e5edf5] truncate">
                    {currentTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="bg-white bg-opacity-25 p-2.5 sm:p-3 rounded-full shadow-sm flex-shrink-0">
                  <FaStar className="text-white text-lg sm:text-xl" />
                </div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <p className="text-sm sm:text-sm lg:text-lg font-semibold text-blue-300 truncate">
                    {xp} XP
                  </p>
                  <p className="text-xs sm:text-xs lg:text-sm text-[#e5edf5] truncate">
                    Current Progress
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="bg-white bg-opacity-25 p-2.5 sm:p-3 rounded-full shadow-sm flex-shrink-0">
                  <FaCompass className="text-white text-lg sm:text-xl" />
                </div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <p className="text-sm sm:text-sm lg:text-lg font-semibold text-blue-300 truncate">
                    {questCount} Quests
                  </p>
                  <p className="text-xs sm:text-xs lg:text-sm text-[#e5edf5] truncate">
                    In Progress
                  </p>
                </div>
              </div>
            </div>

            <button
              aria-label="Start new adventure"
              className="shine-sweep bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:scale-105 active:scale-95 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-transform duration-200 w-full sm:w-auto"
              onClick={() => navigate('/explore')}
            >
              Start New Adventure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroLoggedIn;
