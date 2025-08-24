import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuests } from '../../../features/questSlice';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';
import { MapPinIcon, StarIcon, ClockIcon } from '@heroicons/react/24/solid';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '500px' 
};

const DEFAULT_CENTER = {
  lat: 28.6139,
  lng: 77.2090
};

function QuestNearbyMap() {
  const dispatch = useDispatch();
  const { quests } = useSelector((state) => state.quest);
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    const cachedLocation = sessionStorage.getItem('userLocationData');
    const cacheTimestamp = sessionStorage.getItem('userLocationTimestamp');
    const CACHE_DURATION = 10 * 60 * 1000;

    if (cachedLocation && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      if (age < CACHE_DURATION) {
        const cached = JSON.parse(cachedLocation);
        setUserLocation({ lat: cached.lat, lng: cached.lng });
        return;
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          
          const locationData = {
            address: 'Map location',
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          sessionStorage.setItem('userLocationData', JSON.stringify(locationData));
          sessionStorage.setItem('userLocationTimestamp', Date.now().toString());
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError('Permission denied. Please allow location access for better results.');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setLocationError('Location request timed out.');
              break;
            default:
              setLocationError('Unable to get your location. Showing default area.');
          }
        },
        {
          enableHighAccuracy: false, 
          timeout: 10000,
          maximumAge: 600000
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!quests || quests.length === 0) {
      dispatch(fetchQuests({ page: 1, limit: 50 }));
    }
  }, [dispatch, quests]);

  const getQuestCoordinates = (quest, index) => {
    const angleOffset = (index * 45) % 360;
    const radius = 0.02 + (index % 3) * 0.01;
    const lat = userLocation.lat + (Math.cos(angleOffset * Math.PI / 180) * radius);
    const lng = userLocation.lng + (Math.sin(angleOffset * Math.PI / 180) * radius);
    return { lat, lng };
  };

  const getUserMarkerIcon = () => {
    if (!isLoaded) return null;
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="23" fill="#4F46E5" stroke="white" stroke-width="4"/>
          <circle cx="25" cy="25" r="18" fill="white" stroke="#4F46E5" stroke-width="2"/>
          <circle cx="25" cy="25" r="12" fill="#4F46E5"/>
          <circle cx="25" cy="25" r="6" fill="white"/>
          <circle cx="25" cy="25" r="3" fill="#4F46E5"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(50, 50),
      anchor: new window.google.maps.Point(25, 25)
    };
  };

  const getQuestMarkerIcon = (difficulty = 'medium') => {
    if (!isLoaded) return null;
    const colors = {
      easy: '#10B981',
      medium: '#F59E0B', 
      hard: '#EF4444'
    };
    const color = colors[difficulty] || colors.medium;
    
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="60" height="75" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 5c-13.25 0-24 10.75-24 24 0 18 24 41 24 41s24-23 24-41c0-13.25-10.75-24-24-24z" 
                fill="${color}" stroke="white" stroke-width="3"/>
          <circle cx="30" cy="29" r="15" fill="white"/>
          <path d="M25 24h10v10h-10z" fill="${color}"/>
          <text x="30" y="33" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Q</text>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(60, 75),
      anchor: new window.google.maps.Point(30, 75)
    };
  };

  if (loadError) {
    return <div className="w-full h-96 flex items-center justify-center text-red-500">Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center border border-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-purple-700 text-sm font-medium">Loading Beautiful Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      {locationError && (
        <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-sm max-w-xs shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-yellow-600" />
            <span className="font-medium">Location Notice</span>
          </div>
          <p className="mt-1 text-xs">{locationError}</p>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={userLocation}
        zoom={14}
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

        <Marker
          position={userLocation}
          icon={getUserMarkerIcon()}
          title="Your Current Location"
          zIndex={1000} 
        />

        {quests && quests.slice(0, 15).map((quest, index) => {
          const position = getQuestCoordinates(quest, index);
          return (
            <Marker
              key={quest._id}
              position={position}
              onClick={() => setSelectedQuest({ ...quest, position })}
              icon={getQuestMarkerIcon(quest.difficulty)}
              title={quest.title}
              animation={selectedQuest && selectedQuest._id === quest._id ? window.google.maps.Animation.BOUNCE : null}
            />
          );
        })}

        {selectedQuest && (
          <InfoWindow
            position={selectedQuest.position}
            onCloseClick={() => setSelectedQuest(null)}
            options={{
              pixelOffset: new window.google.maps.Size(0, -10)
            }}
          >
            <div className="p-0 max-w-sm bg-white rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {selectedQuest.title}
                </h3>
                <div className="flex items-center gap-2 text-purple-100">
                  <StarIcon className="h-4 w-4" />
                  <span className="text-sm">Featured Quest</span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {selectedQuest.description || "Embark on this exciting quest and discover new adventures!"}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white mb-1 ${
                      selectedQuest.difficulty === 'easy' ? 'bg-green-500' :
                      selectedQuest.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {selectedQuest.difficulty?.charAt(0).toUpperCase() || 'M'}
                    </div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mb-1">
                      {selectedQuest.xp || '100'}
                    </div>
                    <p className="text-xs text-gray-500">XP Reward</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-1">
                      <ClockIcon className="h-4 w-4" />
                    </div>
                    <p className="text-xs text-gray-500">~30min</p>
                  </div>
                </div>

                <button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = `/quest-overview/${selectedQuest._id}`}
                >
                  Start Quest Adventure
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {quests && quests.length > 0 && (
        <div className="absolute bottom-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold">
              🎯 {Math.min(quests.length, 15)} active quests nearby
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-60 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          Live updates
        </div>
      </div>
    </div>
  );
}

export default QuestNearbyMap;