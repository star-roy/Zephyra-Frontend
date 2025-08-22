import { useEffect, useState } from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

function MapRoutingControl({ waypoints }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    setDirectionsResponse(null);
  }, [waypoints]);

  // Handle directions service callback
  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setDirectionsResponse(result);
    } else {
      console.log('Directions request failed due to ' + status);
    }
  };

  if (!waypoints || waypoints.length < 2) {
    return null;
  }

  return (
    <>
      <DirectionsService
        options={{
          destination: waypoints[waypoints.length - 1],
          origin: waypoints[0],
          waypoints: waypoints.slice(1, -1).map(point => ({
            location: point,
            stopover: true
          })),
          travelMode: 'WALKING'
        }}
        callback={directionsCallback}
      />
      
      {directionsResponse && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#2563eb',
              strokeWeight: 4,
              strokeOpacity: 0.8
            },
            preserveViewport: true
          }}
        />
      )}
    </>
  );
}

export default MapRoutingControl;
