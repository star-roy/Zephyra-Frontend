import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AdvancedMarker from './AdvancedMarker';

const GOOGLE_MAPS_LIBRARIES = ['places'];
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '400px'
};

const DEFAULT_CENTER = {
  lat: 28.6139,
  lng: 77.2090
};

function SimpleMap({ waypoints = [] }) {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Google Maps API key required</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border">
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={GOOGLE_MAPS_LIBRARIES}>
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={13}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy',
            scrollwheel: true,
            disableDoubleClickZoom: false
          }}
        >
          {/* Render waypoint markers */}
          {waypoints.map((waypoint, idx) => (
            <AdvancedMarker
              key={idx}
              position={{ lat: waypoint.lat, lng: waypoint.lng }}
              title={`Waypoint ${idx + 1}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default SimpleMap;
