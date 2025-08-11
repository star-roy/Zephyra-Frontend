import { Marker } from '@react-google-maps/api';

function AdvancedMarker({ position, title, children, ...props }) {
  // For now, we'll use the regular Marker component
  // Google Maps API still supports Marker, it's just deprecated
  // Migration to AdvancedMarkerElement can be done later when needed
  return (
    <Marker 
      position={position} 
      title={title}
      {...props}
    >
      {children}
    </Marker>
  );
}

export default AdvancedMarker;
