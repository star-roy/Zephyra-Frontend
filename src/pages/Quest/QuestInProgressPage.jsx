import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapRoutingControl from '../../components/MapRoutingControl';
import AdvancedMarker from '../../components/AdvancedMarker';
import { watchLiveLocation, stopLocationWatch, calculateDistance } from '../../utils/locationUtils';
import { fetchQuestById, fetchQuestProgress } from '../../features/questSlice';

const zephyraBlue = "#7F56D9";
const zephyraGold = "#FDB022";

// Google Maps configuration
const GOOGLE_MAPS_LIBRARIES = ['places'];
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '300px'
};

// Default map center
const DEFAULT_CENTER = {
  lat: 34.6290,
  lng: -78.6050
};

// --- Quest Tips & Safety Card ---
function QuestTipsCard({ tips = [] }) {
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 w-full max-w-[340px] flex flex-col gap-2 self-start">
      <div className="font-bold text-[#22223B] text-lg mb-2">Quest Tips & Safety</div>
      <ul className="list-disc ml-4 text-[#667085] text-base mb-2">
        {tips.length > 0 ? (
          tips.map((tip, index) => (
            <li key={index}>{tip.tip_text}</li>
          ))
        ) : (
          <>
            <li>Stay hydrated and wear comfortable shoes.</li>
            <li>Be mindful of traffic when exploring urban areas.</li>
            <li>Ask locals for recommendations—they know the hidden gems!</li>
            <li>Respect public spaces and preserve the environment.</li>
          </>
        )}
      </ul>
      <div className="mt-3 text-sm text-[#7F56D9] font-semibold">
        Need help? <a href="/support" className="underline hover:text-[#5d3bb2]">Contact support</a>
      </div>
    </div>
  );
}

export default function QuestInProgressPage() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { currentQuest, questProgress, loading, error } = useSelector((state) => state.quest);
  
  const [hintRevealed, setHintRevealed] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationTracking, setLocationTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);

  // Google Maps API key
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Fetch quest data and progress on component mount
  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestById(questId));
      dispatch(fetchQuestProgress(questId));
    }
  }, [dispatch, questId]);

  // Get quest route data from currentQuest
  const questRoute = currentQuest?.routes?.[0] || {
    waypoints: [
      { lat: 34.6290, lng: -78.6050 }, // Default waypoints if no route data
      { lat: 34.6295, lng: -78.6045 },
      { lat: 34.6300, lng: -78.6040 },
      { lat: 34.6305, lng: -78.6035 },
    ]
  };

  // Get objectives from quest tasks and progress
  const objectives = currentQuest?.tasks?.map((task) => ({
    label: task.description, // Backend returns 'description', not 'task_description'
    completed: questProgress?.completed_tasks?.includes(task._id) || false
  })) || [];

  // Live location tracking functions
  const startLocationTracking = () => {
    if (watchId) return; // Already tracking
    
    setLocationTracking(true);
    const id = watchLiveLocation(
      (location) => {
        setUserLocation(location);
        setLocationAccuracy(location.accuracy);
        
        // Optional: Check if user is near next objective
        const nextWaypoint = questRoute.waypoints[1]; // Next destination
        if (nextWaypoint) {
          const distance = calculateDistance(
            location.lat, location.lng,
            nextWaypoint.lat, nextWaypoint.lng
          );
          
          // If within 10 meters of waypoint, could trigger completion
          if (distance < 10) {
            console.log("Near objective!");
          }
        }
      },
      (error) => {
        console.error("Live tracking error:", error);
        setLocationTracking(false);
      }
    );
    setWatchId(id);
  };

  const stopLocationTracking = () => {
    if (watchId) {
      stopLocationWatch(watchId);
      setWatchId(null);
      setLocationTracking(false);
      setUserLocation(null);
      setLocationAccuracy(null);
    }
  };

  // Height sync refs
  const proofRef = useRef(null);
  const rewardsRef = useRef(null);
  const [proofHeight, setProofHeight] = useState();

  useEffect(() => {
    // Sync heights after mount and on window resize
    function syncHeights() {
      if (proofRef.current && rewardsRef.current) {
        const proofBoxHeight = proofRef.current.offsetHeight;
        const rewardsBoxHeight = rewardsRef.current.offsetHeight;
        const maxHeight = Math.max(proofBoxHeight, rewardsBoxHeight);
        setProofHeight(maxHeight);
      }
    }
    syncHeights();
    window.addEventListener("resize", syncHeights);
    
    // Cleanup location tracking on unmount
    return () => {
      window.removeEventListener("resize", syncHeights);
      if (watchId) {
        stopLocationWatch(watchId);
      }
    };
  }, [watchId]);

  const progressPercent = objectives.length > 0 ? Math.round(
    (objectives.filter((o) => o.completed).length / objectives.length) * 100
  ) : 0;

  // Show loading state
  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7F56D9] mx-auto"></div>
          <p className="mt-4 text-[#667085]">Loading quest...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading quest: {error}</p>
          <button 
            onClick={() => navigate('/quest')}
            className="px-4 py-2 bg-[#7F56D9] text-white rounded-lg hover:bg-[#6B46C1]"
          >
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  // Show message if no quest data
  if (!currentQuest) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#667085] mb-4">Quest not found</p>
          <button 
            onClick={() => navigate('/quest')}
            className="px-4 py-2 bg-[#7F56D9] text-white rounded-lg hover:bg-[#6B46C1]"
          >
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 py-8 flex flex-col gap-8">
        {/* Quest Title + Progress */}
        <div className="bg-white border rounded-2xl shadow-sm border-[#F2F4F7] px-7 py-8 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex-1 min-w-[260px]">
            <div className="text-base font-medium text-[#667085] mb-2">
              Quest in Progress
            </div>
            <div className="text-[2rem] font-bold text-[#22223B] mb-2 leading-tight">
              {currentQuest.title}
            </div>
            <div className="text-[#667085] text-[1.08rem]">
              {currentQuest.description}
            </div>
          </div>
          <div className="flex items-center gap-4 min-w-[220px] justify-end flex-none">
            <span className="text-[#667085] font-semibold text-[1rem]">Progress</span>
            <div className="w-[110px] h-[7px] bg-[#F2F4F7] rounded-lg relative overflow-hidden">
              <div
                className="h-full rounded-lg absolute top-0 left-0"
                style={{
                  width: `${progressPercent}%`,
                  background: zephyraBlue,
                  transition: "width 0.4s"
                }}
              ></div>
            </div>
            <span className="text-[#667085] font-medium text-[1rem] min-w-[34px] text-right">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Directions/Map */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tools box */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[260px] max-w-md">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Tools</div>
            
            {/* Live Location Tracking */}
            <div className="mb-4">
              <div className="text-[#667085] font-medium mb-2">Live Location:</div>
              <button
                onClick={locationTracking ? stopLocationTracking : startLocationTracking}
                className={`px-4 py-2 rounded-lg font-medium text-sm w-full ${
                  locationTracking 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {locationTracking ? '🔴 Stop Tracking' : '📍 Start Live Tracking'}
              </button>
              {locationAccuracy && (
                <div className="text-xs text-gray-500 mt-1">
                  Accuracy: ±{Math.round(locationAccuracy)}m
                </div>
              )}
            </div>
            
            <div className="text-[#667085] font-medium mb-2">Directions:</div>
            <ol className="list-decimal text-[#667085] text-base ml-5 mb-0">
              <li>Head east on Main St toward Central Ave.</li>
              <li>Turn right onto Central Ave.</li>
              <li>The Delton Clock Tower will be on your left.</li>
            </ol>
          </div>
          {/* Google Maps */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 flex-2 flex items-center justify-center min-w-0 w-full">
            <div className="w-full h-[300px] rounded-xl overflow-hidden">
              {googleMapsApiKey ? (
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={GOOGLE_MAPS_LIBRARIES}>
                  <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={DEFAULT_CENTER}
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
                    {/* Route visualization */}
                    <MapRoutingControl waypoints={questRoute.waypoints} />
                    
                    {/* Waypoint markers */}
                    {questRoute.waypoints.map((waypoint, idx) => (
                      <AdvancedMarker 
                        key={idx} 
                        position={{ lat: waypoint.lat, lng: waypoint.lng }}
                        title={`Quest Stop ${idx + 1}`}
                        label={`${idx + 1}`}
                      />
                    ))}
                    
                    {/* User's live location marker */}
                    {userLocation && (
                      <AdvancedMarker 
                        position={{ lat: userLocation.lat, lng: userLocation.lng }}
                        title="Your Location"
                        icon={{
                          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzAwN0FFQyIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
                          scaledSize: { width: 16, height: 16 }
                        }}
                      />
                    )}
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
              )}
            </div>
          </div>
        </div>

        {/* Objectives and Hints */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Objectives */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[220px] max-w-[340px]">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Objectives</div>
            <ol className="pl-0 flex flex-col gap-4 mb-0">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 list-none">
                  <span
                    className={`inline-block w-5 h-5 rounded-md border-[1.5px] border-[#F2F4F7] mt-1 transition`}
                    style={{ background: obj.completed ? zephyraBlue : "#fff" }}
                  >
                    {obj.completed && (
                      <svg width={16} height={16} className="block mx-auto my-[2px]" fill="none">
                        <polyline
                          points="3,8 7,12 13,5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={`text-[#22223B] font-medium text-base ${obj.completed ? "opacity-100" : "opacity-85"}`}>
                    {obj.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* Hints */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[180px]">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Hints</div>
            <div className="text-[#667085] text-base mb-4">
              Need a little help? Click below to reveal a hint for your current objective.
            </div>
            <button
              className="border-none bg-[#F2F4F7] text-[#667085] font-semibold px-5 py-2 rounded-lg text-base cursor-pointer hover:bg-[#e0e6ee] transition"
              onClick={() => setHintRevealed(!hintRevealed)}
            >
              {hintRevealed ? "Clock Tower is near the Town Square!" : "Reveal Hint"}
            </button>
          </div>
        </div>

        {/* Main bottom section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Proof of Completion */}
          <div
            ref={proofRef}
            className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 flex-3 min-w-0 flex flex-col justify-between"
            style={proofHeight ? { height: proofHeight } : {}}
          >
            <div>
              <div className="font-bold text-[#22223B] text-lg mb-1">Proof of Completion</div>
              <div className="text-[#667085] text-base mb-8">
                Submit your proof of completion for this quest.
              </div>
            </div>
            {/* Upload File button only */}
            <div className="flex justify-center mb-8">
              <button
                className="px-7 py-3 bg-[#7F56D9] text-white font-semibold rounded-xl text-base border-none cursor-pointer hover:bg-[#632bb5] shadow transition"
                onClick={() => navigate(`/quest-proof-upload/${questId}`)}
              >
                Upload File
              </button>
            </div>
          </div>

          {/* Rewards + Tips - X axis alignment */}
          <div className="flex gap-8 flex-2 min-w-[220px]">
            {/* Rewards Upon Completion */}
            <div
              ref={rewardsRef}
              className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 flex flex-col gap-2 self-start w-full max-w-[340px]"
              style={proofHeight ? { height: proofHeight } : {}}
            >
              <div className="font-bold text-[#22223B] text-lg mb-2">Rewards Upon Completion</div>
              <ul className="list-none p-0 m-0 mb-2 text-[#22223B] text-base">
                <li className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                    <span style={{ color: zephyraGold, fontWeight: 700, fontSize: "1.12rem" }}>✪</span>
                  </span>
                  {currentQuest?.xp || 0} Points
                </li>
                {currentQuest?.achievements?.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                      <span style={{ color: zephyraBlue, fontWeight: 700, fontSize: "1.12rem" }}>🏅</span>
                    </span>
                    {achievement.title || achievement.name || "Achievement Badge"}
                  </li>
                )) || (
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                      <span style={{ color: zephyraBlue, fontWeight: 700, fontSize: "1.12rem" }}>🏅</span>
                    </span>
                    Explorer Badge
                  </li>
                )}
              </ul>
              <div className="text-[#667085] text-sm mt-2">
                Complete all objectives to claim your rewards and boost your standing on the leaderboard!
              </div>
            </div>
            {/* Quest Tips & Safety Card */}
            <QuestTipsCard tips={currentQuest?.tips || []} />
          </div>
        </div>
      </div>
    </div>
  );
}