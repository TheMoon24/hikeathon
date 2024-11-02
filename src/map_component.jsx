// src/map_component.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const [markers, setMarkers] = useState([
    { id: 1, position: [51.505, -0.09], message: "Default Marker" },
  ]);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: markers.length + 1,
          position: [e.latlng.lat, e.latlng.lng],
          message: `Marker ${markers.length + 1}`,
        };
  
        // Log the coordinates of the new marker
        console.log('New Marker Coordinates:', newMarker.position);
  
        setMarkers([...markers, newMarker]);
      },
    });
    return null; // This component doesn't render anything directly
  }
  

  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.message}</Popup>
        </Marker>
      ))}
      <AddMarkerOnClick />
    </MapContainer>
  );
}

export default MapComponent;
