import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from 'react-leaflet';
import LandmarkMenu from './landmark_slider';
import 'leaflet/dist/leaflet.css';

const circleColors = ['blue', 'green', 'red', 'purple', 'orange'];

function MapComponent({ position, zones, landmarks, name }) {
  const [markers, setMarkers] = useState([]);
  const [isLandmarkMode, setIsLandmarkMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);

  const toggleLandmarkMode = () => setIsLandmarkMode(!isLandmarkMode);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        if (isLandmarkMode) {
          const newMarker = {
            id: markers.length + 1,
            position: [e.latlng.lat, e.latlng.lng],
            message: `Landmark ${name}`,
            radius: 100,
            color: circleColors[colorIndex % circleColors.length]
          };

          setMarkers([...markers, newMarker]);
          setSelectedMarker(newMarker);
          setIsLandmarkMode(false);
          setColorIndex(colorIndex + 1);
        }
      },
    });
    return null;
  }

  const removeMarker = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
    setSelectedMarker(null);
  };

  const updateMarkerRadius = (id, newRadius) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, radius: newRadius } : marker
      )
    );
  };

  useEffect(() => {
    if (position.latitude && position.longitude) {
      setMarkers([{
        id: 1,
        position: [position.latitude, position.longitude],
        message: 'Current Location',
        radius: 100,
        color: 'blue'
      }]);
    }
  }, [position]);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={toggleLandmarkMode} style={styles.landmarkButton}>
        {isLandmarkMode ? 'Click on Map to Place Landmark' : 'Enable Landmark Mode'}
      </button>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker position={marker.position} onClick={() => setSelectedMarker(marker)}>
              <Popup closeButton={false}> {/* Disable the default close button */}
                {marker.message}
                <span
                  style={styles.closeButton}
                  onClick={() => removeMarker(marker.id)}
                >
                  ✕
                </span>
              </Popup>
            </Marker>
            <Circle
              center={marker.position}
              radius={marker.radius || 100}
              pathOptions={{ color: marker.color, fillOpacity: 0.2 }}
            />
          </React.Fragment>
        ))}

        <AddMarkerOnClick />
      </MapContainer>

      {selectedMarker && (
        <div style={styles.landmarkMenuContainer}>
          <LandmarkMenu
            radius={selectedMarker.radius}
            onRadiusChange={(newRadius) => updateMarkerRadius(selectedMarker.id, newRadius)}
            onClose={() => setSelectedMarker(null)}
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
  closeButton: {
    cursor: 'pointer',
    color: 'grey',
    fontSize: '1.2em',
    marginLeft: '10px',
  },
};

export default MapComponent;
