// src/map_component.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function SetViewOnClick() {
  const mapInstance = useMapEvent('click', (e) => {
    mapInstance.setView(e.latlng, mapInstance.getZoom(), {
      animate: true,
    });
  });
  return null;
}

function MapComponent({ position, zones, landmarks }) {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: [
        position.latitude ? position.latitude : 0,
        position.longitude ? position.longitude : 0,
      ],
      message: 'Default Marker',
    },
  ]);


  function AddMarkerOnClick() {
    useMapEvent({
      click(e) {
        const newMarker = {
          id: markers.length + 1,
          position: [e.latlng.lat, e.latlng.lng],
          message: `Marker ${markers.length + 1}`, // Corrected string template
        };
  
        // Log the coordinates of the new marker
        console.log('New Marker Coordinates:', newMarker.position);
  
        setMarkers([...markers, newMarker]);
      },
    });
    return null; // This component doesn't render anything directly
  }


  const mapRef = useRef(null);

  useEffect(() => {
    if (position.latitude && position.longitude) {
      console.log('Updating Marker:', position.latitude, position.longitude);
      setMarkers([
        {
          id: 1,
          position: [position.latitude, position.longitude],
          message: 'Current Location',
        },
      ]);
    }
  }, [position]);

  const updateMapCenter = (lat, lng) => {
    console.log('move', mapRef.current);
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  };

  return (
    <div style={{ border: '2px solid white', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        style={{ height: "80vh", width: "100%", boxSizing: 'border-box' }} // Use box-sizing
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

        <SetViewOnClick />
      <button onClick={() => updateMapCenter(57, -1.2)}>Locate</button>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
