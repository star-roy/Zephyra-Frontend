import { useContext } from 'react';
import { GoogleMapsContext } from '../providers/GoogleMapsProvider';

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};
