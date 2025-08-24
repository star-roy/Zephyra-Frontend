import React, { createContext, useMemo } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

const getRequiredLibraries = () => {
  const libraries = [];

  const currentPath = window.location.pathname;
  const needsPlaces = currentPath.includes('/create-quest') || 
                     currentPath.includes('/edit-quest') ||
                     currentPath.includes('/search');
  
  if (needsPlaces) {
    libraries.push('places');
  }
  

  return libraries.length > 0 ? libraries : undefined;
};

export const GoogleMapsProvider = ({ children }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const libraries = useMemo(() => getRequiredLibraries(), []);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey,
    libraries,
    version: 'weekly',
    language: 'en',
    region: 'IN',
  });

  const value = {
    isLoaded,
    loadError,
    hasPlacesLibrary: libraries?.includes('places') || false,
  };

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export { GoogleMapsContext };
