import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaCamera, FaRedoAlt, FaShareAlt } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapRoutingControl from '../../components/MapRoutingControl';
import AdvancedMarker from '../../components/AdvancedMarker';
import QuestLimitModal from '../../components/Modals/QuestLimitModal';
import { fetchQuestById, startQuest, fetchMyQuestDashboard } from '../../features/questSlice';

// Google Maps configuration
const GOOGLE_MAPS_LIBRARIES = ['places'];
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
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-3 w-full min-w-[210px]">
      <div className="font-semibold text-[#7F56D9] mb-1">Actions</div>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl border border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] font-semibold transition"
      >
        <FaRedoAlt /> Do This Quest Again
      </button>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl border border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] font-semibold transition"
      >
        <FaShareAlt /> Share Completion
      </button>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl bg-[#7F56D9] text-white font-semibold hover:bg-[#6842c2] transition"
      >
        <HiOutlineArrowNarrowRight /> Explore More Quests
      </button>
    </div>
  );
}

function QuestOverviewPage() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuest: questData, loading, error } = useSelector(state => state.quest);
  
  const [showAllSteps, setShowAllSteps] = useState(false);
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

  // Get first quest image or fallback
  const questImage = useMemo(() => {
    if (files && files.length > 0) {
      const firstFile = files[0];
      return firstFile.file_url || firstFile.fileUrl || "/assets/downtown.jpg";
    }
    return "/assets/downtown.jpg";
  }, [files]);

  // Fetch quest data on mount
  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestById(questId));
    }
  }, [dispatch, questId]);

  // Calculate map center from waypoints
  const getMapCenter = () => {
    if (routes && routes.length > 0 && routes[0].waypoints && routes[0].waypoints.length > 0) {
      const waypoints = routes[0].waypoints;
      const latSum = waypoints.reduce((sum, wp) => sum + (wp.lat || 0), 0);
      const lngSum = waypoints.reduce((sum, wp) => sum + (wp.lng || 0), 0);
      return { lat: latSum / waypoints.length, lng: lngSum / waypoints.length };
    }
    return { lat: 39.9612, lng: -82.9988 }; // Default center
  };

  // Handle start quest
  const handleStartQuest = async () => {
    if (!quest?._id && !quest?.id) return;
    
    setStartingQuest(true);
    try {
      const id = quest._id || quest.id;
      await dispatch(startQuest(id)).unwrap();
      // Refresh the quest dashboard to update ongoing quests
      dispatch(fetchMyQuestDashboard());
      navigate(`/quest-in-progress/${id}`);
    } catch (error) {
      console.error('Failed to start quest:', error);
      
      // Check if it's a quest limit error
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

  // Handle quest limit modal close
  const handleQuestLimitModalClose = () => {
    setShowQuestLimitModal(false);
    // Optionally navigate to My Quest page
    navigate('/my-quest');
  };

  // Handle rating submission
  const handleSubmitRating = (e) => {
    e.preventDefault();
    setRatingSubmitted(true);
    // Here you would send the rating and review to your backend or analytics
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

  // Google Maps API key
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-4 lg:py-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          {/* Banner Card */}
          <div className="bg-white border border-[#F2F4F7] rounded-3xl shadow-sm overflow-hidden">
            <div className="relative h-56 xs:h-64 sm:h-72 md:h-80 lg:h-[430px] w-full transition-all">
              <img
                src={questImage}
                alt={quest?.title || 'Quest'}
                className="w-full h-full object-cover"
              />
              {/* QUEST tag */}
              <span className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-[#7F56D9] shadow">
                QUEST
              </span>
              {/* Title */}
              <span className="absolute bottom-4 left-24 text-white text-lg xs:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow">
                {quest?.title || 'Quest Title'}
              </span>
            </div>
          </div>
          {/* Quest Details */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 relative">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                <span className="font-semibold text-[#7F56D9] text-base mr-2">Quest Details</span>
                {(quest?.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F2F4F7] text-[#667085] text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
              <p className="text-[#344054] text-base">{quest?.description}</p>
            </div>
            <div className="absolute top-4 right-4 md:static">
              <span className="bg-[#FDB022] text-white font-bold px-4 py-2 rounded-xl text-sm shadow">
                +{quest?.xp || 0} XP
              </span>
            </div>
          </div>
          {/* Steps */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-[#7F56D9]">
                Start Your Adventure
              </h2>
              {tasks.length > 2 && (
                <button
                  className="text-[#7F56D9] text-sm font-semibold hover:underline focus:outline-none"
                  onClick={() => setShowAllSteps((open) => !open)}
                >
                  {showAllSteps ? "Show Less" : "View All Steps"}
                </button>
              )}
            </div>
            <ol className="space-y-4">
              {stepsToShow.map((task, idx) => (
                <li key={task._id || task.id || idx} className="flex items-start gap-3">
                  <span className="bg-[#7F56D9] text-white font-bold w-8 h-8 flex items-center justify-center rounded-full text-base mt-0.5 shrink-0">
                    {task.order || idx + 1}
                  </span>
                  <div>
                    <div className="font-medium text-[#7F56D9]">Task {task.order || idx + 1}</div>
                    <div className="text-sm text-[#667085]">{task.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* Rate this Quest */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-2 items-start">
            <div className="font-semibold text-[#7F56D9] text-lg mb-1">Rate this Quest</div>
            {ratingSubmitted ? (
              <div className="text-[#22c55e] font-medium text-sm">Thank you for your feedback!</div>
            ) : (
              <form onSubmit={handleSubmitRating} className="flex flex-col gap-2 w-full">
                <RateStars value={userRating} onChange={setUserRating} />
                <textarea
                  className="mt-2 w-full rounded-xl border border-[#F2F4F7] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                  rows={3}
                  placeholder="Share your experience..."
                  value={userReview}
                  onChange={e => setUserReview(e.target.value)}
                  maxLength={500}
                  style={{ minHeight: 48 }}
                />
                <button
                  type="submit"
                  className="mt-1 self-start px-4 py-2 bg-[#7F56D9] hover:bg-[#6842c2] text-white font-semibold rounded-xl text-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={userRating === 0 && userReview.trim() === ""}
                >
                  Submit Rating
                </button>
              </form>
            )}
          </div>
          {/* Community Rating & Actions - horizontally */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CommunityRatingSection ratingData={communityRating} />
            <ActionsSection />
          </div>
        </div>
        {/* Right Side */}
        <aside className="w-full lg:w-[360px] flex flex-col gap-4 md:gap-6">
          {/* Map Card with Route */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-3 sm:p-4 flex flex-col">
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 border border-[#F2F4F7]">
              {routes && routes.length > 0 && routes[0].waypoints ? (
                googleMapsApiKey ? (
                  <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={GOOGLE_MAPS_LIBRARIES}>
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
                        keyboardShortcuts: true
                      }}
                    >
                      {/* Route using proper road routing */}
                      <MapRoutingControl waypoints={routes[0].waypoints} />
                      
                      {/* Waypoint markers */}
                      {routes[0].waypoints.map((waypoint, idx) => (
                        <AdvancedMarker 
                          key={idx} 
                          position={{ lat: waypoint.lat, lng: waypoint.lng }}
                          title={`Stop ${idx + 1}: ${idx === 0 ? routes[0].start_location || routes[0].startLocation : idx === routes[0].waypoints.length - 1 ? routes[0].end_location || routes[0].endLocation : `Waypoint ${idx + 1}`}`}
                          label={`${idx + 1}`}
                        />
                      ))}
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                      <p className="text-sm">Google Maps API key required</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                    <p className="text-sm">No route available or Google Maps API key required</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Route Information */}
            {routes && routes.length > 0 && (
              <div className="mb-4">
                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                  <div className="text-sm font-medium text-slate-700 mb-2">Quest Route</div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>Start: {routes[0].start_location || routes[0].startLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span>End: {routes[0].end_location || routes[0].endLocation}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {routes[0].waypoints?.length || 0} waypoint{(routes[0].waypoints?.length || 0) !== 1 ? 's' : ''} along the route
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center text-sm text-[#667085] mb-4">
              <FaMapMarkerAlt className="mr-2 text-[#7F56D9]" />
              <span>{quest?.city || 'Location not specified'}</span>
            </div>
            
            {/* Address display */}
            <div className="bg-slate-100 px-4 py-3 rounded-lg text-slate-700 text-base font-medium mb-4">
              <span className="font-semibold text-[#7F56D9]">Address: </span>
              {quest?.address}, {quest?.city} {quest?.pincode && `- ${quest.pincode}`}
            </div>
            <button 
              className={`w-full py-3 text-white font-semibold rounded-xl transition text-base ${
                startingQuest 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#7F56D9] hover:bg-[#6842c2]'
              }`}
              onClick={handleStartQuest}
              disabled={startingQuest}
            >
              {startingQuest ? 'Starting Quest...' : 'Start Quest'}
            </button>
          </div>
          {/* Explorer Tips */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9] flex items-center gap-2">
              <MdOutlineTipsAndUpdates className="text-[#7F56D9] text-lg" />
              Explorer Tips
            </div>
            <ul className="space-y-2 text-sm text-[#667085]">
              {tips.map((tip, i) => (
                <li key={tip._id || tip.id || i} className="flex items-start gap-2">
                  <BsFillInfoCircleFill className="min-w-4 mt-1 text-[#7F56D9]" />
                  <span>{typeof tip === 'string' ? tip : tip.tip_text || tip.tipText}</span>
                </li>
              ))}
              {tips.length === 0 && (
                <li className="text-[#667085]">No tips available for this quest.</li>
              )}
            </ul>
          </div>
          {/* Explorer Reviews */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9]">Explorer Reviews</div>
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review, i) => (
                <div key={review._id || review.id || i} className="flex items-start gap-3">
                  <img
                    src={review.user?.avatar || review.avatar || "/assets/default-avatar.jpg"}
                    alt={review.user?.fullName || review.user?.username || review.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#7F56D9]">
                        {review.user?.fullName || review.user?.username || review.name || "Anonymous"}
                      </span>
                      <StarRating rating={review.rating || 0} />
                    </div>
                    <div className="text-sm text-[#667085]">
                      &quot;{review.comment || review.text || review.review_text || "Great quest!"}&quot;
                    </div>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-sm text-[#667085]">No reviews yet. Be the first to review this quest!</p>
              )}
            </div>
          </div>
          {/* Related Achievements */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9]">Related Achievements</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-[#F2F4F7] rounded-full">
                  <FaCheckCircle className="text-[#7F56D9] text-xl" />
                </span>
                <div>
                  <div className="font-medium text-[#7F56D9]">Quest Completer</div>
                  <div className="text-[#667085]">Complete this quest to earn XP and badges.</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-[#F2F4F7] rounded-full">
                  <FaCamera className="text-[#FDB022] text-xl" />
                </span>
                <div>
                  <div className="font-medium text-[#7F56D9]">Explorer</div>
                  <div className="text-[#667085]">Discover new places and earn exploration points.</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Quest Limit Modal */}
      <QuestLimitModal 
        isOpen={showQuestLimitModal} 
        onClose={handleQuestLimitModalClose} 
      />
    </div>
  );
}

export default QuestOverviewPage;