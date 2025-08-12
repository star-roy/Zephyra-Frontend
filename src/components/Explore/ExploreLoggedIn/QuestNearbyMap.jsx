import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuests } from '../../../features/questSlice';

const GOOGLE_MAPS_LIBRARIES = ['places'];
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '400px'
};

const DEFAULT_CENTER = {
  lat: 28.6139, // Delhi coordinates as fallback
  lng: 77.2090
};

function QuestNearbyMap() {
  const dispatch = useDispatch();
  const { quests, loading } = useSelector((state) => state.quest);
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Showing default area.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000 // 10 minutes
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch quests when component mounts
  useEffect(() => {
    if (!quests || quests.length === 0) {
      dispatch(fetchQuests({ page: 1, limit: 50 })); // Get more quests for map
    }
  }, [dispatch, quests]);

  // Helper function to convert address to coordinates (mock implementation)
  // In a real app, you'd use Google Geocoding API
  const getQuestCoordinates = (quest, index) => {
    // For demo purposes, create coordinates around user location
    const angleOffset = (index * 45) % 360; // Distribute around circle
    const radius = 0.02 + (index % 3) * 0.01; // Vary distance
    
    const lat = userLocation.lat + (Math.cos(angleOffset * Math.PI / 180) * radius);
    const lng = userLocation.lng + (Math.sin(angleOffset * Math.PI / 180) * radius);
    
    return { lat, lng };
  };

  // Handle map load
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  if (!googleMapsApiKey) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">🗺️ Google Maps</p>
          <p className="text-gray-500 text-sm">Please configure your Google Maps API key</p>
          <p className="text-gray-400 text-xs mt-1">Add VITE_GOOGLE_MAPS_API_KEY to .env file</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-200 relative">
      {locationError && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-sm max-w-xs">
          {locationError}
        </div>
      )}
      
      <LoadScript 
        googleMapsApiKey={googleMapsApiKey} 
        libraries={GOOGLE_MAPS_LIBRARIES}
        loadingElement={
          <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading Map...</p>
            </div>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={userLocation}
          zoom={13}
          onLoad={handleMapLoad}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            gestureHandling: 'greedy',
            scrollwheel: true,
            disableDoubleClickZoom: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          }}
        >
          {/* User location marker - only render when map is loaded */}
          {mapLoaded && (
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="white"/>
                  </svg>
                `),
                scaledSize: mapLoaded ? new window.google.maps.Size(24, 24) : undefined,
                anchor: mapLoaded ? new window.google.maps.Point(12, 12) : undefined
              }}
              title="Your Location"
            />
          )}

          {/* Quest markers - only render when map is loaded */}
          {mapLoaded && quests && quests.slice(0, 20).map((quest, index) => {
            const position = getQuestCoordinates(quest, index);
            return (
              <Marker
                key={quest._id}
                position={position}
                onClick={() => setSelectedQuest({ ...quest, position })}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 32l-8-8h4v-8h8v8h4l-8 8z" fill="#8B5CF6"/>
                      <circle cx="16" cy="8" r="6" fill="#8B5CF6" stroke="white" stroke-width="2"/>
                      <text x="16" y="12" text-anchor="middle" fill="white" font-size="8" font-weight="bold">Q</text>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(32, 32),
                  anchor: new window.google.maps.Point(16, 32)
                }}
                title={quest.title}
              />
            );
          })}

          {/* Info window for selected quest */}
          {selectedQuest && (
            <InfoWindow
              position={selectedQuest.position}
              onCloseClick={() => setSelectedQuest(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-sm mb-1 text-purple-800">
                  {selectedQuest.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {selectedQuest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {selectedQuest.difficulty}
                  </span>
                  <span className="text-xs text-amber-600 font-semibold">
                    +{selectedQuest.xp} XP
                  </span>
                </div>
                <button 
                  className="mt-2 w-full bg-purple-600 text-white text-xs py-1 px-2 rounded hover:bg-purple-700 transition-colors"
                  onClick={() => window.location.href = `/quest-overview/${selectedQuest._id}`}
                >
                  View Quest
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Quest count indicator */}
      {quests && quests.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-800">
            🎯 {Math.min(quests.length, 20)} quests nearby
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestNearbyMap;
