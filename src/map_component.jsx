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
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '80vh', width: '100%' }}
        whenCreated={(mapInstance) => {
          console.log('Map Created', mapInstance);
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.message}</Popup>
          </Marker>
        ))}

        <SetViewOnClick />
      </MapContainer>
      <button onClick={() => updateMapCenter(57, -1.2)}>Locate</button>
    </>
  );
}

export default MapComponent;
