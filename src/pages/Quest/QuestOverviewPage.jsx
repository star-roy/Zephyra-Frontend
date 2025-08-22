import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaCamera, FaRedoAlt, FaShareAlt, FaClock, FaUsers, FaTrophy, FaHeart } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlineTipsAndUpdates, MdLocationOn } from "react-icons/md";
import { HiOutlineArrowNarrowRight, HiOutlineEye } from "react-icons/hi";
import { BiTime, BiGroup, BiTrendingUp } from "react-icons/bi";
import { GoogleMap } from '@react-google-maps/api';
import MapRoutingControl from '../../components/MapRoutingControl';
import AdvancedMarker from '../../components/AdvancedMarker';
import QuestLimitModal from '../../components/Modals/QuestLimitModal';
import { fetchQuestById, startQuest, fetchMyQuestDashboard } from '../../features/questSlice';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

// Google Maps configuration
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

// Zephyra theme color palette
const zephyra = {
  zephyraBlue: "#7F56D9",
  zephyraGold: "#FDB022",
  cloudWhite: "#F8FAFC",
  stormyGrey: "#667085",
  duskHaze: "#F2F4F7",
};

// Difficulty levels configuration
const DIFFICULTY_LEVELS = {
  'easy': { 
    color: '#10B981', 
    bg: '#ECFDF5',
    label: 'Easy',
    icon: '⭐'
  },
  'medium': { 
    color: '#F59E0B', 
    bg: '#FFFBEB',
    label: 'Medium',
    icon: '⭐⭐'
  },
  'hard': { 
    color: '#EF4444', 
    bg: '#FEF2F2',
    label: 'Hard',
    icon: '⭐⭐⭐'
  }
};

// Enhanced Quest Stats Component
function QuestStats({ quest, reviews }) {
  const completionCount = quest?.completions || quest?.totalCompletions || 0;
  const averageTime = quest?.averageTime || quest?.estimatedTime || '30-45 mins';
  const difficulty = quest?.difficulty || 'medium';
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty.toLowerCase()] || DIFFICULTY_LEVELS.medium;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-r from-white to-gray-50 border border-[#F2F4F7] rounded-xl p-4 text-center">
        <div className="text-2xl mb-2">{difficultyConfig.icon}</div>
        <div className="text-sm font-semibold text-gray-700">Difficulty</div>
        <div 
          className="text-xs font-medium px-2 py-1 rounded-full mt-1"
          style={{ 
            color: difficultyConfig.color, 
            backgroundColor: difficultyConfig.bg 
          }}
        >
          {difficultyConfig.label}
        </div>
      </div>

      <div className="bg-gradient-to-r from-white to-blue-50 border border-[#F2F4F7] rounded-xl p-4 text-center">
        <BiTime className="text-2xl text-[#7F56D9] mx-auto mb-2" />
        <div className="text-sm font-semibold text-gray-700">Duration</div>
        <div className="text-xs text-[#7F56D9] font-medium">{averageTime}</div>
      </div>

      <div className="bg-gradient-to-r from-white to-green-50 border border-[#F2F4F7] rounded-xl p-4 text-center">
        <BiGroup className="text-2xl text-green-600 mx-auto mb-2" />
        <div className="text-sm font-semibold text-gray-700">Explorers</div>
        <div className="text-xs text-green-600 font-medium">{completionCount}+ completed</div>
      </div>

      <div className="bg-gradient-to-r from-white to-yellow-50 border border-[#F2F4F7] rounded-xl p-4 text-center">
        <FaStar className="text-2xl text-[#FDB022] mx-auto mb-2" />
        <div className="text-sm font-semibold text-gray-700">Rating</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-xs text-[#FDB022] font-medium">
            {quest?.averageRating?.toFixed(1) || '4.5'}
          </span>
          <span className="text-xs text-gray-500">({reviews?.length || 0})</span>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating, size = "xs" }) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={
            i <= rating
              ? `text-[${zephyra.zephyraGold}] ${sizes[size]} mr-0.5`
              : `text-[${zephyra.duskHaze}] ${sizes[size]} mr-0.5`
          }
        />
      ))}
    </span>
  );
}

function RateStars({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className="focus:outline-none"
          onClick={() => onChange(star)}
        >
          <FaStar
            className={
              star <= value
                ? `text-[${zephyra.zephyraGold}] text-2xl transition`
                : `text-[${zephyra.duskHaze}] text-2xl transition`
            }
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ value, percent }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-[#22223B] w-3">{value}</span>
      <div className="flex-1 h-2 rounded bg-[#F2F4F7] relative">
        <div
          className="h-2 rounded absolute left-0 top-0"
          style={{
            width: `${percent}%`,
            background: zephyra.zephyraBlue,
          }}
        />
      </div>
    </div>
  );
}

function CommunityRatingSection({ ratingData }) {
  const { average, totalReviews, breakdown } = ratingData;
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col items-center w-full min-w-[210px]">
      <div className="font-semibold text-[#7F56D9] mb-2 text-base sm:text-lg">
        Community Rating
      </div>
      <div className="flex flex-col items-center mb-3">
        <span className="text-4xl font-bold text-[#22223B] leading-none">{average}</span>
        <div className="-mt-1 mb-1">
          <StarRating rating={average} size="base" />
        </div>
        <span className="text-xs text-[#667085]">
          Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full flex flex-col gap-1">
        {[5, 4, 3, 2, 1].map((val) => {
          const percent =
            totalReviews === 0 ? 0 : (breakdown[val] / totalReviews) * 100;
          return (
            <RatingBar
              key={val}
              value={val}
              percent={percent}
            />
          );
        })}
      </div>
    </div>
  );
}

function ActionsSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-white to-[#F8FAFC] border border-[#F2F4F7] rounded-2xl shadow-sm p-6 w-full min-w-[210px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#7F56D9]/10 rounded-full">
          <HiOutlineArrowNarrowRight className="text-[#7F56D9] text-lg" />
        </div>
        <span className="font-semibold text-[#7F56D9] text-lg">Quick Actions</span>
      </div>
      
      <div className="space-y-3">
        <button
          type="button"
          className="flex items-center gap-3 py-3 px-4 w-full justify-start rounded-xl border-2 border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] hover:border-[#7F56D9]/30 font-semibold transition-all group"
        >
          <FaRedoAlt className="text-sm group-hover:rotate-180 transition-transform duration-300" />
          <span>Do This Quest Again</span>
        </button>
        
        <button
          type="button"
          className="flex items-center gap-3 py-3 px-4 w-full justify-start rounded-xl border-2 border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] hover:border-[#7F56D9]/30 font-semibold transition-all group"
        >
          <FaShareAlt className="text-sm group-hover:scale-110 transition-transform" />
          <span>Share Completion</span>
        </button>
        
        <button
          type="button"
          className="flex items-center gap-3 py-3 px-4 w-full justify-center rounded-xl bg-gradient-to-r from-[#7F56D9] to-[#6842c2] text-white font-semibold hover:from-[#6842c2] hover:to-[#7F56D9] transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] group"
          onClick={() => navigate('/explore')}
        >
          <HiOutlineArrowNarrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
          <span>Explore More Quests</span>
        </button>
      </div>
    </div>
  );
}

function QuestOverviewPage() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoaded: mapLoaded } = useGoogleMaps();
  const { currentQuest: questData, loading, error } = useSelector(state => state.quest);
  
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [showAllTips, setShowAllTips] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [startingQuest, setStartingQuest] = useState(false);
  const [showQuestLimitModal, setShowQuestLimitModal] = useState(false);

  // Extract quest data from the response structure
  const quest = useMemo(() => questData?.quest || questData, [questData]);
  const tasks = useMemo(() => questData?.tasks || quest?.tasks || [], [questData, quest]);
  const tips = useMemo(() => questData?.tips || quest?.tips || [], [questData, quest]);
  const files = useMemo(() => questData?.photos || questData?.files || quest?.files || [], [questData, quest]);
  const routes = useMemo(() => questData?.routes || quest?.routes || [], [questData, quest]);
  const reviews = useMemo(() => questData?.reviews || quest?.recentReviews || [], [questData, quest]);
  const communityRating = useMemo(() => questData?.communityRating || {
    average: quest?.averageRating || 0,
    totalReviews: quest?.totalReviews || 0,
    breakdown: quest?.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  }, [questData, quest]);

  const questImage = useMemo(() => {
    if (files && files.length > 0) {
      const firstFile = files[0];
      return firstFile.file_url || firstFile.fileUrl || "/assets/history.webp";
    }
    return "/assets/history.webp";
  }, [files]);

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestById(questId));
    }
  }, [dispatch, questId]);

  const getMapCenter = () => {
    if (routes && routes.length > 0 && routes[0].waypoints && routes[0].waypoints.length > 0) {
      const waypoints = routes[0].waypoints;
      const latSum = waypoints.reduce((sum, wp) => sum + (wp.lat || 0), 0);
      const lngSum = waypoints.reduce((sum, wp) => sum + (wp.lng || 0), 0);
      return { lat: latSum / waypoints.length, lng: lngSum / waypoints.length };
    }
    return { lat: 39.9612, lng: -82.9988 };
  };

  // Handle start quest
  const handleStartQuest = async () => {
    if (!quest?._id && !quest?.id) return;
    
    setStartingQuest(true);
    try {
      const id = quest._id || quest.id;
      await dispatch(startQuest(id)).unwrap();
      dispatch(fetchMyQuestDashboard());
      navigate(`/quest-in-progress/${id}`);
    } catch (error) {
      console.error('Failed to start quest:', error);
      
      if (error.includes('3 ongoing quests') || error.includes('429')) {
        setShowQuestLimitModal(true);
      } else {
        // Show generic error message for other errors
        alert('Failed to start quest. Please try again.');
      }
    } finally {
      setStartingQuest(false);
    }
  };

  const handleQuestLimitModalClose = () => {
    setShowQuestLimitModal(false);
    navigate('/my-quest');
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    setRatingSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F56D9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quest details...</p>
        </div>
      </div>
    );
  }

  if (error || !quest) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading quest: {error || 'Quest not found'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#7F56D9] text-white px-4 py-2 rounded-lg hover:bg-[#6842c2]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const stepsToShow = showAllSteps ? tasks : tasks.slice(0, 2);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-4 lg:py-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          <div className="bg-white border border-[#F2F4F7] rounded-3xl shadow-lg overflow-hidden">
            <div className="relative h-56 xs:h-64 sm:h-72 md:h-80 lg:h-[430px] w-full transition-all">
              <img
                src={questImage}
                alt={quest?.title || 'Quest'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[#7F56D9] shadow-lg border border-white/20">
                  🎯 QUEST
                </span>
                {quest?.featured && (
                  <span className="bg-[#FDB022]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                    ⭐ FEATURED
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium border border-white/20">
                  <HiOutlineEye className="inline mr-1" />
                  {quest?.views || Math.floor(Math.random() * 500) + 100} views
                </div>
                <div className="bg-[#FDB022]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg">
                  +{quest?.xp || 0} XP
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    {quest?.title || 'Quest Title'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1 text-sm">
                      <MdLocationOn className="text-[#FDB022]" />
                      <span>{quest?.city || 'Location'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <BiTrendingUp className="text-[#10B981]" />
                      <span>Trending</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FaHeart className="text-red-400" />
                      <span>{Math.floor(Math.random() * 50) + 20} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaTrophy className="text-[#FDB022] text-lg" />
              <span className="font-semibold text-[#7F56D9] text-lg">Quest Stats</span>
            </div>
            <QuestStats quest={quest} reviews={reviews} />
          </div>
          <div className="bg-gradient-to-br from-white to-[#F8FAFC] border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6 relative">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#7F56D9]/10 rounded-full">
                    <BsFillInfoCircleFill className="text-[#7F56D9] text-lg" />
                  </div>
                  <span className="font-semibold text-[#7F56D9] text-xl">Quest Overview</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {(quest?.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-[#7F56D9]/10 to-[#7F56D9]/5 text-[#7F56D9] text-xs px-3 py-1.5 rounded-full font-medium border border-[#7F56D9]/20 hover:scale-105 transition-transform"
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                  {(!quest?.tags || quest.tags.length === 0) && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
                      #adventure
                    </span>
                  )}
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-[#344054] text-base leading-relaxed">
                    {quest?.description || 'Embark on an exciting adventure and discover new places, meet interesting people, and collect amazing experiences along the way.'}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#F2F4F7]">
                    <div className="p-2 bg-[#10B981]/10 rounded-full">
                      <FaClock className="text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Estimated Time</div>
                      <div className="font-medium text-gray-800">{quest?.estimatedTime || quest?.averageTime || '30-45 mins'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#F2F4F7]">
                    <div className="p-2 bg-[#F59E0B]/10 rounded-full">
                      <FaUsers className="text-[#F59E0B]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Quest Type</div>
                      <div className="font-medium text-gray-800">{quest?.type || 'Solo Adventure'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="bg-gradient-to-r from-[#FDB022] to-[#F59E0B] text-white font-bold px-6 py-4 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all">
                    <div className="text-xs uppercase tracking-wide opacity-90">Reward</div>
                    <div className="text-2xl font-black">+{quest?.xp || 0}</div>
                    <div className="text-xs font-medium">XP Points</div>
                  </div>

                  <div className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✨</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7F56D9]/10 rounded-full">
                  <FaCheckCircle className="text-[#7F56D9] text-lg" />
                </div>
                <h2 className="font-semibold text-xl text-[#7F56D9]">
                  Your Adventure Path
                </h2>
              </div>
              {tasks.length > 2 && (
                <button
                  className="text-[#7F56D9] text-sm font-semibold hover:underline focus:outline-none px-3 py-1 rounded-lg hover:bg-[#7F56D9]/5 transition-colors"
                  onClick={() => setShowAllSteps((open) => !open)}
                >
                  {showAllSteps ? "Show Less" : `View All ${tasks.length} Steps`}
                </button>
              )}
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                <p>No specific steps provided for this quest.</p>
                <p className="text-sm">Follow the route and explore at your own pace!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stepsToShow.map((task, idx) => (
                  <div key={task._id || task.id || idx} className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-[#F8FAFC] to-white border border-[#F2F4F7] hover:shadow-md transition-all">
                      {/* Step number with enhanced styling */}
                      <div className="relative flex-shrink-0">
                        <div className="bg-gradient-to-br from-[#7F56D9] to-[#6842c2] text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-base shadow-md group-hover:scale-110 transition-transform">
                          {task.order || idx + 1}
                        </div>
                        {idx < stepsToShow.length - 1 && (
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[#7F56D9] to-[#F2F4F7]"></div>
                        )}
                      </div>
                      

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold text-[#7F56D9]">Step {task.order || idx + 1}</div>
                          {task.required && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Required
                            </span>
                          )}
                          {task.optional && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="text-[#344054] leading-relaxed">{task.description}</p>
                        {task.tip && (
                          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <MdOutlineTipsAndUpdates className="text-yellow-600 text-sm flex-shrink-0" />
                              <span className="text-yellow-800 text-sm">{task.tip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {!showAllSteps && tasks.length > 2 && (
                  <div className="text-center pt-2">
                    <div className="inline-flex items-center gap-2 text-[#667085] text-sm">
                      <div className="w-2 h-2 bg-[#7F56D9] rounded-full opacity-30"></div>
                      <div className="w-2 h-2 bg-[#7F56D9] rounded-full opacity-50"></div>
                      <div className="w-2 h-2 bg-[#7F56D9] rounded-full opacity-70"></div>
                      <span>{tasks.length - 2} more steps</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-white via-[#F8FAFC] to-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#FDB022]/10 rounded-full">
                <FaStar className="text-[#FDB022] text-lg" />
              </div>
              <div className="font-semibold text-[#7F56D9] text-lg">Share Your Experience</div>
            </div>
            
            {ratingSubmitted ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaCheckCircle className="text-green-600 text-2xl" />
                </div>
                <div className="text-green-600 font-semibold mb-2">Thank you for your feedback!</div>
                <div className="text-sm text-gray-600">Your review helps other explorers discover amazing quests.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRating} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate this quest</label>
                  <div className="flex items-center gap-2">
                    <RateStars value={userRating} onChange={setUserRating} />
                    <span className="text-sm text-gray-600 ml-2">
                      {userRating === 0 ? 'Select rating' : 
                       userRating === 1 ? 'Poor' :
                       userRating === 2 ? 'Fair' :
                       userRating === 3 ? 'Good' :
                       userRating === 4 ? 'Very Good' : 'Excellent'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Write a review (optional)</label>
                  <textarea
                    className="w-full rounded-xl border border-[#F2F4F7] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent resize-none transition-colors"
                    rows={4}
                    placeholder="Tell others about your quest experience... What did you enjoy most? Any tips for future explorers?"
                    value={userReview}
                    onChange={e => setUserReview(e.target.value)}
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{userReview.length}/500 characters</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#7F56D9] to-[#6842c2] hover:from-[#6842c2] hover:to-[#7F56D9] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={userRating === 0 && userReview.trim() === ""}
                >
                  <FaStar className="text-sm" />
                  Submit Review
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CommunityRatingSection ratingData={communityRating} />
            <ActionsSection />
          </div>
        </div>

        <aside className="w-full lg:w-[360px] flex flex-col gap-4 md:gap-6">

          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#F2F4F7]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7F56D9]/10 rounded-full">
                  <FaMapMarkerAlt className="text-[#7F56D9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#7F56D9]">Quest Route</h3>
                  <p className="text-xs text-gray-600">{quest?.city || 'Location'}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 border border-[#F2F4F7] bg-gray-50">
                {routes && routes.length > 0 && routes[0].waypoints ? (
                  mapLoaded ? (
                      <GoogleMap
                        mapContainerStyle={MAP_CONTAINER_STYLE}
                        center={getMapCenter()}
                        zoom={15}
                        options={{
                          zoomControl: true,
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                          gestureHandling: 'greedy',
                          clickableIcons: false,
                          disableDoubleClickZoom: false,
                          keyboardShortcuts: true,
                          styles: [
                            {
                              featureType: 'poi',
                              elementType: 'labels',
                              stylers: [{ visibility: 'simplified' }]
                            }
                          ]
                        }}
                      >
      
                        <MapRoutingControl waypoints={routes[0].waypoints} />

                        {routes[0].waypoints.map((waypoint, idx) => (
                          <AdvancedMarker 
                            key={idx} 
                            position={{ lat: waypoint.lat, lng: waypoint.lng }}
                            title={`Stop ${idx + 1}: ${idx === 0 ? routes[0].start_location || routes[0].startLocation : idx === routes[0].waypoints.length - 1 ? routes[0].end_location || routes[0].endLocation : `Waypoint ${idx + 1}`}`}
                            label={`${idx + 1}`}
                          />
                        ))}
                      </GoogleMap>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                        </svg>
                        <p className="text-sm">Loading map...</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                      <p className="text-sm">No route available</p>
                    </div>
                  </div>
                )}
              </div>

              {routes && routes.length > 0 && (
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-[#F8FAFC] to-white rounded-xl p-4 border border-[#F2F4F7]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#7F56D9] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#7F56D9]">Route Details</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm"></div>
                        <span className="text-gray-600">Start:</span>
                        <span className="font-medium text-gray-800 flex-1">{routes[0].start_location || routes[0].startLocation}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-sm"></div>
                        <span className="text-gray-600">End:</span>
                        <span className="font-medium text-gray-800 flex-1">{routes[0].end_location || routes[0].endLocation}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm pt-2 border-t border-gray-200">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
                        <span className="text-gray-600">Stops:</span>
                        <span className="font-medium text-blue-600">{routes[0].waypoints?.length || 0} waypoint{(routes[0].waypoints?.length || 0) !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-[#667085]">
                  <MdLocationOn className="mr-2 text-[#7F56D9] text-lg" />
                  <span className="font-medium">{quest?.city || 'Location not specified'}</span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-3 rounded-xl">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Address</div>
                      <div className="text-sm text-blue-900 font-medium leading-relaxed">
                        {quest?.address ? `${quest.address}, ${quest.city}` : `${quest?.city || 'Location'}`}
                        {quest?.pincode && ` - ${quest.pincode}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                className={`w-full py-4 text-white font-bold rounded-xl transition-all text-base shadow-md transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                  startingQuest 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#7F56D9] to-[#6842c2] hover:from-[#6842c2] hover:to-[#7F56D9] hover:shadow-lg'
                }`}
                onClick={handleStartQuest}
                disabled={startingQuest}
              >
                {startingQuest ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Starting Quest...
                  </>
                ) : (
                  <>
                    <HiOutlineArrowNarrowRight className="text-lg" />
                    Start Your Adventure
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-yellow-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <MdOutlineTipsAndUpdates className="text-yellow-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-[#7F56D9]">Explorer Tips</h3>
                <p className="text-xs text-gray-600">Insider knowledge from fellow adventurers</p>
              </div>
            </div>
            
            {tips.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">💡</div>
                <p className="text-gray-500 text-sm">No specific tips available for this quest.</p>
                <p className="text-gray-400 text-xs mt-1">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(showAllTips ? tips : tips.slice(0, 3)).map((tip, i) => (
                  <div key={tip._id || tip.id || i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-yellow-200 hover:shadow-sm transition-shadow">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <BsFillInfoCircleFill className="text-yellow-600 text-xs" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {typeof tip === 'string' ? tip : tip.tip_text || tip.tipText}
                    </span>
                  </div>
                ))}
                
                {tips.length > 3 && (
                  <button 
                    className="w-full text-center py-2 text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                    onClick={() => setShowAllTips(!showAllTips)}
                  >
                    {showAllTips ? `Show Less` : `View ${tips.length - 3} more tips`}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaStar className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-[#7F56D9]">Explorer Reviews</h3>
                <p className="text-xs text-gray-600">What other adventurers are saying</p>
              </div>
            </div>
            
            {reviews.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-gray-500 text-sm mb-1">No reviews yet</p>
                <p className="text-gray-400 text-xs">Be the first to share your quest experience!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.slice(0, 2).map((review, i) => (
                  <div key={review._id || review.id || i} className="bg-white rounded-xl p-4 border border-blue-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={review.user?.avatar || review.avatar || "/assets/default-avatar.jpg"}
                          alt={review.user?.fullName || review.user?.username || review.name || "User"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-[#7F56D9] text-sm truncate">
                            {review.user?.fullName || review.user?.username || review.name || "Anonymous Explorer"}
                          </span>
                          <div className="flex items-center">
                            <StarRating rating={review.rating || 0} size="xs" />
                          </div>
                        </div>
                        
                        <blockquote className="text-sm text-gray-700 leading-relaxed italic border-l-2 border-blue-300 pl-3">
                          "{review.comment || review.text || review.review_text || "Amazing quest experience! Highly recommended."}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>Verified Explorer</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {reviews.length > 2 && (
                  <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    View all {reviews.length} reviews
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <FaTrophy className="text-purple-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-[#7F56D9]">Quest Rewards</h3>
                <p className="text-xs text-gray-600">Unlock achievements and earn badges</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7F56D9] to-[#6842c2] rounded-xl flex items-center justify-center shadow-md">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#7F56D9] mb-1">Quest Completer</div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      Complete this quest to earn <span className="font-medium text-[#FDB022]">+{quest?.xp || 0} XP</span> and unlock special badges.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FDB022] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-md">
                    <FaCamera className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#7F56D9] mb-1">Memory Collector</div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      Capture photos during your quest to earn <span className="font-medium text-[#10B981]">bonus exploration points</span>.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-md">
                    <BiTrendingUp className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#7F56D9] mb-1">Explorer Rank</div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      Progress towards your next <span className="font-medium text-[#7F56D9]">Explorer Level</span> and unlock new quest categories.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <QuestLimitModal 
        isOpen={showQuestLimitModal} 
        onClose={handleQuestLimitModalClose} 
      />
    </div>
  );
}

export default QuestOverviewPage;