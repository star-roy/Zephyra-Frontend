import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap } from '@react-google-maps/api';
import MapRoutingControl from '../../components/MapRoutingControl';
import AdvancedMarker from '../../components/AdvancedMarker';
import { watchLiveLocation, stopLocationWatch, calculateDistance } from '../../utils/locationUtils';
import { fetchQuestById, fetchQuestProgress } from '../../features/questSlice';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { Skeleton } from '../../components/index.js';
import { 
  FaCheckCircle, 
  FaMapMarkerAlt, 
  FaBullseye,
  FaLightbulb, 
  FaShieldAlt, 
  FaTrophy, 
  FaCamera, 
  FaEye,
  FaClock,
  FaRoute,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import { 
  MdLocationOn, 
  MdTipsAndUpdates, 
  MdSecurity 
} from 'react-icons/md';
import { 
  HiOutlineArrowNarrowRight 
} from 'react-icons/hi';
import { 
  BiCurrentLocation, 
  BiTime, 
  BiTrendingUp 
} from 'react-icons/bi';


const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

const DEFAULT_CENTER = {
  lat: 34.6290,
  lng: -78.6050
};

function QuestTipsCard({ tips = [] }) {
  const [showAllTips, setShowAllTips] = useState(false);
  const displayedTips = showAllTips ? tips : tips.slice(0, 2);
  
  return (
    <div className="bg-gradient-to-br from-white to-amber-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-6 w-full max-w-[340px] flex flex-col gap-4 self-start">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-amber-100 rounded-full">
          <MdSecurity className="text-amber-600 text-lg" />
        </div>
        <div>
          <h3 className="font-bold text-[#22223B] text-lg">Quest Tips & Safety</h3>
          <p className="text-xs text-gray-600">Stay safe and informed</p>
        </div>
      </div>
      
      {tips.length > 0 ? (
        <div className="space-y-3">
          {displayedTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-amber-200">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <MdTipsAndUpdates className="text-amber-600 text-xs" />
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">
                {typeof tip === 'string' ? tip : tip.tip_text}
              </span>
            </div>
          ))}
          
          {tips.length > 2 && (
            <button 
              className="w-full text-center py-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              onClick={() => setShowAllTips(!showAllTips)}
            >
              {showAllTips ? `Show Less` : `View ${tips.length - 2} more tips`}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {[
            "Stay hydrated and wear comfortable shoes.",
            "Be mindful of traffic when exploring urban areas.",
            "Ask locals for recommendations—they know the hidden gems!",
            "Respect public spaces and preserve the environment."
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-amber-200">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <MdTipsAndUpdates className="text-amber-600 text-xs" />
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <div className="text-sm text-blue-800 font-semibold mb-1">Need help?</div>
        <a 
          href="/support" 
          className="text-sm text-blue-600 hover:text-blue-700 underline hover:no-underline transition-colors"
        >
          Contact support team
        </a>
      </div>
    </div>
  );
}

export default function QuestInProgressPage() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentQuest, questProgress, loading, error } = useSelector((state) => state.quest);
  
  const [hintRevealed, setHintRevealed] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationTracking, setLocationTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);

  const { isLoaded: mapLoaded } = useGoogleMaps();

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestById(questId));
      dispatch(fetchQuestProgress(questId));
    }
  }, [dispatch, questId]);

  const questRoute = currentQuest?.routes?.[0];

  const waypoints = questRoute?.waypoints || [];
  const hasValidWaypoints = waypoints.length > 0;

  const getMapCenter = () => {
    if (hasValidWaypoints) {
      const latSum = waypoints.reduce((sum, wp) => sum + (wp.lat || 0), 0);
      const lngSum = waypoints.reduce((sum, wp) => sum + (wp.lng || 0), 0);
      return { lat: latSum / waypoints.length, lng: lngSum / waypoints.length };
    }
    return { lat: 39.9612, lng: -82.9988 };
  };

  const mapCenter = getMapCenter();

  const objectives = currentQuest?.tasks?.map((task) => ({
    label: task.description,
    completed: questProgress?.completed_tasks?.includes(task._id) || false
  })) || [];

  const startLocationTracking = () => {
    if (watchId) return; 

    setLocationTracking(true);
    const id = watchLiveLocation(
      (location) => {
        setUserLocation(location);
        setLocationAccuracy(location.accuracy);

        const nextWaypoint = questRoute.waypoints[1];
        if (nextWaypoint) {
          const distance = calculateDistance(
            location.lat, location.lng,
            nextWaypoint.lat, nextWaypoint.lng
          );

          if (distance < 10) {
            // TODO: Near objective - could trigger completion logic here
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

  useEffect(() => {
    return () => {
      if (watchId) {
        stopLocationWatch(watchId);
      }
    };
  }, [watchId]);

  const progressPercent = objectives.length > 0 ? Math.round(
    (objectives.filter((o) => o.completed).length / objectives.length) * 100
  ) : 0;

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="bg-white border rounded-2xl shadow-lg border-[#F2F4F7] p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex-1 space-y-4">
                <Skeleton height="32px" width="70%" />
                <Skeleton height="20px" width="50%" />
                <Skeleton height="16px" width="80%" />
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-[#F2F4F7] shadow-sm w-full lg:min-w-[300px]">
                <Skeleton height="24px" width="60%" className="mb-4" />
                <Skeleton height="12px" width="100%" className="mb-3" />
                <Skeleton height="16px" width="80%" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
              <Skeleton height="24px" width="60%" className="mb-6" />
              <div className="space-y-4">
                <Skeleton height="48px" width="100%" />
                <Skeleton height="48px" width="100%" />
              </div>
            </div>
          
            <div className="xl:col-span-2 bg-gray-200 rounded-2xl animate-pulse" style={{ minHeight: '500px' }}>
              <div className="flex items-center justify-center h-full">
                <Skeleton height="24px" width="120px" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
                <Skeleton height="24px" width="70%" className="mb-4" />
                <div className="space-y-3">
                  <Skeleton height="16px" width="100%" />
                  <Skeleton height="16px" width="90%" />
                  <Skeleton height="16px" width="80%" />
                </div>
              </div>
              
              <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
                <Skeleton height="24px" width="60%" className="mb-4" />
                <div className="space-y-3">
                  <Skeleton height="16px" width="100%" />
                  <Skeleton height="16px" width="85%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    
        <div className="bg-gradient-to-br from-white via-blue-50 to-white border rounded-2xl shadow-lg border-[#F2F4F7] p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#7F56D9]/10 rounded-full">
                  <BiCurrentLocation className="text-[#7F56D9] text-lg" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#7F56D9]">Quest in Progress</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-[#22223B] mb-3 leading-tight">
                {currentQuest.title}
              </h1>
              
              <p className="text-[#667085] text-base leading-relaxed mb-4 max-w-2xl">
                {currentQuest.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BiTime className="text-[#7F56D9]" />
                  <span>Started today</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRoute className="text-green-600" />
                  <span>{waypoints.length} waypoints</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-[#FDB022]" />
                  <span>{currentQuest?.quest?.xp || currentQuest?.xp || 'Loading...'} XP reward</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-[#F2F4F7] shadow-sm w-full lg:min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#667085] font-semibold text-sm sm:text-base">Quest Progress</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#7F56D9]">{progressPercent}%</span>
              </div>
              
              <div className="w-full h-3 bg-[#F2F4F7] rounded-full relative overflow-hidden mb-3">
                <div
                  className="h-full rounded-full absolute top-0 left-0 bg-gradient-to-r from-[#7F56D9] to-[#6842c2] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="h-full w-full bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span>{objectives.filter((o) => o.completed).length} of {objectives.length} completed</span>
                <span className={`font-medium ${progressPercent === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                  {progressPercent === 100 ? 'Complete!' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1 bg-gradient-to-br from-white to-blue-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-[#22223B] text-lg">Navigation</h3>
                <p className="text-sm text-gray-600">Real-time tracking</p>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-white rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <BiCurrentLocation className="text-blue-600" />
                <span className="text-gray-700 font-medium text-sm">Live Location</span>
              </div>
              
              <button
                onClick={locationTracking ? stopLocationTracking : startLocationTracking}
                className={`px-4 py-3 rounded-xl font-medium text-sm w-full flex items-center justify-center gap-2 transition-all ${
                  locationTracking 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {locationTracking ? (
                  <>
                    <FaPause className="text-sm" />
                    Stop Tracking
                  </>
                ) : (
                  <>
                    <FaPlay className="text-sm" />
                    Start Tracking
                  </>
                )}
              </button>
              
              {locationAccuracy && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>±{Math.round(locationAccuracy)}m accuracy</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <FaRoute className="text-[#7F56D9]" />
                <span className="text-gray-700 font-medium text-sm">Directions</span>
              </div>
              
              {hasValidWaypoints ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {questRoute?.start_location && (
                    <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-green-600 font-medium">START</div>
                        <div className="text-sm text-gray-700 break-words">{questRoute.start_location}</div>
                      </div>
                    </div>
                  )}
                  
                  {waypoints.map((waypoint, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-blue-600 font-medium">STOP {idx + 1}</div>
                        <div className="text-sm text-gray-700 break-words">
                          {waypoint.name || waypoint.address || `Checkpoint ${idx + 1}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {questRoute?.end_location && (
                    <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-red-600 font-medium">FINISH</div>
                        <div className="text-sm text-gray-700 break-words">{questRoute.end_location}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <FaRoute className="text-2xl text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">No route available</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4">
            <div className="w-full h-96 lg:h-[500px] rounded-xl overflow-hidden relative">
              {mapLoaded ? (
                <GoogleMap
                  mapContainerStyle={MAP_CONTAINER_STYLE}
                  center={mapCenter}
                  zoom={hasValidWaypoints ? 14 : 10}
                  options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
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
                  {hasValidWaypoints && <MapRoutingControl waypoints={waypoints} />}
                  
                  {hasValidWaypoints && waypoints.map((waypoint, idx) => (
                    <AdvancedMarker 
                      key={idx} 
                      position={{ lat: waypoint.lat, lng: waypoint.lng }}
                      title={waypoint.name || `Quest Stop ${idx + 1}`}
                      label={`${idx + 1}`}
                    />
                  ))}

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
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                    <p className="text-sm text-gray-500">Loading map...</p>
                  </div>
                </div>
              )}
  
              {mapLoaded && !hasValidWaypoints && (
                <div className="absolute top-4 left-4 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg shadow-sm">
                  <p className="text-sm font-medium">⚠️ No route data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-white to-green-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-6 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaBullseye className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#22223B] text-lg">Quest Objectives</h3>
                  <p className="text-sm text-gray-600">Track your progress through each checkpoint</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {objectives.map((obj, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                      obj.completed 
                        ? 'bg-green-50 border-green-200 shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-green-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          obj.completed 
                            ? 'bg-green-500 border-green-500 shadow-md' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {obj.completed ? (
                          <FaCheckCircle className="text-white text-sm" />
                        ) : (
                          <span className="text-gray-400 text-sm font-bold">{idx + 1}</span>
                        )}
                      </div>
                      {idx < objectives.length - 1 && (
                        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                          obj.completed ? 'bg-green-300' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${obj.completed ? 'text-green-700' : 'text-gray-700'}`}>
                          Objective {idx + 1}
                        </span>
                        {obj.completed && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${obj.completed ? 'text-green-600' : 'text-gray-600'}`}>
                        {obj.label}
                      </p>
                    </div>
                  </div>
                ))}
                
                {objectives.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FaBullseye className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p>No specific objectives for this quest.</p>
                    <p className="text-sm">Follow the route and enjoy your adventure!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">

            <div className="bg-gradient-to-br from-white to-indigo-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <FaLightbulb className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#22223B]">Quest Hints</h3>
                  <p className="text-xs text-gray-600">Need help?</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  className={`w-full p-3 rounded-lg font-medium text-sm transition-all ${
                    hintRevealed 
                      ? 'bg-indigo-100 border-2 border-indigo-300 text-indigo-800' 
                      : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 shadow-md'
                  }`}
                  onClick={() => setHintRevealed(!hintRevealed)}
                >
                  {hintRevealed ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaEye className="text-sm" />
                      Hint Revealed!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaLightbulb className="text-sm" />
                      Reveal Hint
                    </div>
                  )}
                </button>
                
                {hintRevealed && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FaLightbulb className="text-indigo-600 mt-0.5 flex-shrink-0 text-sm" />
                      <div>
                        <div className="font-medium text-indigo-800 mb-1 text-sm">Helpful Hint:</div>
                        <p className="text-xs text-indigo-700 leading-relaxed">
                          {currentQuest?.tasks?.[0]?.hint || 
                           currentQuest?.tips?.[0]?.tip_text || 
                           'Follow the map markers and complete each objective in order.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-blue-800">
                    <MdTipsAndUpdates className="flex-shrink-0" />
                    <span>
                      <strong>Pro tip:</strong> Use map markers to navigate efficiently.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white via-purple-50 to-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FaCamera className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22223B]">Proof of Completion</h3>
                  <p className="text-xs text-gray-600">Document your journey</p>
                </div>
              </div>
              
              <div className="text-gray-600 text-sm mb-4 leading-relaxed">
                Ready to submit? Upload photos or documents that prove you've completed all objectives.
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className={`p-2 rounded-lg border transition-colors text-center ${
                  progressPercent > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-center mb-1">
                    {progressPercent > 0 ? (
                      <FaCheckCircle className="text-green-600 text-sm" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
                    )}
                  </div>
                  <span className="text-xs font-medium">Started</span>
                </div>
                
                <div className={`p-2 rounded-lg border transition-colors text-center ${
                  progressPercent > 50 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-center mb-1">
                    {progressPercent > 50 ? (
                      <FaCheckCircle className="text-blue-600 text-sm" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
                    )}
                  </div>
                  <span className="text-xs font-medium">Progress</span>
                </div>
                
                <div className={`p-2 rounded-lg border transition-colors text-center ${
                  progressPercent === 100 ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-center mb-1">
                    {progressPercent === 100 ? (
                      <FaCheckCircle className="text-purple-600 text-sm" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
                    )}
                  </div>
                  <span className="text-xs font-medium">Submit</span>
                </div>
              </div>
              <button
                className="w-full px-4 py-3 bg-gradient-to-r from-[#7F56D9] to-[#6842c2] text-white font-semibold rounded-lg text-sm hover:from-[#6842c2] hover:to-[#7F56D9] shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                onClick={() => navigate(`/quest-proof-upload/${questId}`)}
              >
                <FaCamera className="text-sm" />
                Upload Proof
                <HiOutlineArrowNarrowRight className="text-sm" />
              </button>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-white to-blue-50 border border-[#F2F4F7] rounded-2xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FaTrophy className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22223B] text-lg">Quest Rewards</h3>
                  <p className="text-xs text-gray-600">What you'll earn upon completion</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FDB022] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">XP</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#22223B]">{currentQuest?.quest?.xp || currentQuest?.xp || 'Loading...'} Points</div>
                      <div className="text-xs text-gray-600">Experience Points</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-md">
                      <BiTrendingUp className="text-white text-lg" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#22223B] text-sm">Achievement Badge</div>
                      <div className="text-xs text-gray-600">Quest completion certificate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#7F56D9] to-[#6842c2] rounded-xl flex items-center justify-center shadow-md">
                      <FaCheckCircle className="text-white text-lg" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#22223B] text-sm">Leaderboard Points</div>
                      <div className="text-xs text-gray-600">Boost your ranking</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-gray-600 text-sm text-center">
                  Complete all objectives to claim your rewards and advance your explorer status!
                </div>
              </div>
            </div>

            <div className="mt-6">
              <QuestTipsCard tips={currentQuest?.tips || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}