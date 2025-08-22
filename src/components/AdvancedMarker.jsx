import { Marker } from '@react-google-maps/api';

function AdvancedMarker({ position, title, children, ...props }) {
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
