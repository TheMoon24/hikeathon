// src/map_component.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from 'react-leaflet';
import LandmarkMenu from './landmark_slider'; // Import the LandmarkMenu component
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const [markers, setMarkers] = useState([
    { id: 1, position: [51.505, -0.09], message: "Default Marker", radius: 100 },
  ]);
  const [isLandmarkMode, setIsLandmarkMode] = useState(false); // Control landmark mode
  const [selectedMarker, setSelectedMarker] = useState(null); // Track the selected marker for editing

  // Toggle landmark mode on button click
  const toggleLandmarkMode = () => setIsLandmarkMode(!isLandmarkMode);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        if (isLandmarkMode) {
          const newMarker = {
            id: markers.length + 1,
            position: [e.latlng.lat, e.latlng.lng],
            message: `Marker ${markers.length + 1}`,
            radius: 100, // Default radius
          };
  
          setMarkers([...markers, newMarker]);
          setSelectedMarker(newMarker); // Open the LandmarkMenu for the new marker
          setIsLandmarkMode(false); // Exit landmark mode after placing a marker
        }
      },
    });
    return null;
  }

  // Update radius for a specific marker
  const updateMarkerRadius = (id, newRadius) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, radius: newRadius } : marker
      )
    );
    // Also update the selected marker to trigger re-render
    if (selectedMarker && selectedMarker.id === id) {
      setSelectedMarker((prevMarker) => ({ ...prevMarker, radius: newRadius }));
    }
  };

  useEffect(() => {
    if (selectedMarker) {
      // Sync selectedMarker with the updated markers list
      const updatedMarker = markers.find(marker => marker.id === selectedMarker.id);
      setSelectedMarker(updatedMarker || null);
    }
  }, [markers]);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={toggleLandmarkMode} style={styles.landmarkButton}>
        {isLandmarkMode ? 'Click on Map to Place Landmark' : 'Enable Landmark Mode'}
      </button>

      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

{markers.map((marker) => (
    <React.Fragment key={marker.id}>
        <Marker position={marker.position} onClick={() => setSelectedMarker(marker)}>
            <Popup>{marker.message}</Popup>
        </Marker>
        <Circle 
            center={marker.position} 
            radius={marker.radius} 
            pathOptions={{ color: 'blue', fillOpacity: 0.2 }} 
        />
    </React.Fragment>
))}

        <AddMarkerOnClick />
      </MapContainer>

      {/* Display LandmarkMenu when a marker is selected */}
      {selectedMarker && (
        <div style={styles.landmarkMenuContainer}>
          <LandmarkMenu
    radius={selectedMarker.radius}
    onRadiusChange={(newRadius) => updateMarkerRadius(selectedMarker.id, newRadius)}
    onClose={() => setSelectedMarker(null)}  // Clears the selected marker
/>
        </div>
      )}
    </div>
  );
}

const styles = {
  landmarkButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1000,
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
  },
  landmarkMenuContainer: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default MapComponent;
