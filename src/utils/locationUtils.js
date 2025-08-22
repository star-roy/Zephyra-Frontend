export const getPreciseLocation = (onSuccess, onError, onProgress) => {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by this browser.");
    return;
  }

  onProgress?.("Getting your precise location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const accuracy = position.coords.accuracy;
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: accuracy,
        timestamp: Date.now()
      };

      if (accuracy <= 20) {
        onSuccess(location, `High accuracy: ±${Math.round(accuracy)}m`);
        return;
      }


      onProgress?.("Improving accuracy...");
      navigator.geolocation.getCurrentPosition(
        (position2) => {
          const accuracy2 = position2.coords.accuracy;
          const location2 = {
            lat: position2.coords.latitude,
            lng: position2.coords.longitude,
            accuracy: accuracy2,
            timestamp: Date.now()
          };

          // Use the better of the two readings
          const bestLocation = accuracy2 < accuracy ? location2 : location;
          const bestAccuracy = Math.min(accuracy, accuracy2);
          
          onSuccess(bestLocation, `Best accuracy: ±${Math.round(bestAccuracy)}m`);
        },
        () => {
          // Second attempt failed, use first reading
          onSuccess(location, `Accuracy: ±${Math.round(accuracy)}m`);
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0
        }
      );
    },
    () => {
      onProgress?.("Trying normal accuracy...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          };
          onSuccess(location, `Normal accuracy: ±${Math.round(position.coords.accuracy)}m`);
        },
        (error2) => {
          let errorMessage = "Unable to get your location. ";
          switch(error2.code) {
            case error2.PERMISSION_DENIED:
              errorMessage += "Please allow location access.";
              break;
            case error2.POSITION_UNAVAILABLE:
              errorMessage += "Location information unavailable.";
              break;
            case error2.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
            default:
              errorMessage += "Unknown error occurred.";
              break;
          }
          onError(errorMessage);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
};

// Watch user's live location (for quest progress tracking)
export const watchLiveLocation = (onLocationUpdate, onError) => {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by this browser.");
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: Date.now()
      };
      onLocationUpdate(location);
    },
    () => {
      onError("Live location tracking failed.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    }
  );

  return watchId;
};

export const stopLocationWatch = (watchId) => {
  if (watchId && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; 
};
