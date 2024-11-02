// src/map_component.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { map } from 'leaflet';

function SetViewOnClick({ animateRef }) {
  

  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}
// function updateMapCenter(lat, long) {
//   const mapRef = useMap()
//   console.log('Updating Map Center:', lat, long);
//   mapRef.current.setView([lat, long], mapRef.current.getZoom());
// }
function updateMapCenter({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    if (lat && long) {
      map.setView([lat, long], map.getZoom());
    }
  }, [lat, long, map]);
  return null;
}

function MapComponent({position, zones, landmarks}) {
  // const mapRef = useMap()
  const [markers, setMarkers] = useState([
    { id: 1, position: [position.longitude ? position.longitude : 0, position.latitude ? position.latitude:0], message: "Default Marker" },
  ]);

  useEffect(() => {
    if (position.latitude && position.longitude) {
      console.log('Updating Marker:', position.latitude, position.longitude);
      setMarkers([{ id: 1, position: [position.latitude, position.longitude], message: "Current Location" }]);
    }
  }, [position]);
  

  // function AddMarkerOnClick() {
  //   useMapEvents({
  //     click(e) {
  //       const newMarker = {
  //         id: markers.length + 1,
  //         position: [e.latlng.lat, e.latlng.lng],
  //         message: `Marker ${markers.length + 1}`,
  //       };
  
  //       // Log the coordinates of the new marker
  //       console.log('New Marker Coordinates:', newMarker.position);
  
  //       setMarkers([...markers, newMarker]);
  //     },
  //   });
  //   return null; // This component doesn't render anything directly
  // }
  

  return (
    <>
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
      {/* <AddMarkerOnClick /> */}
        <SetViewOnClick />
      
    </MapContainer>
      <button onClick={() => { updateMapCenter(57, -1.2) }}>Locate</button>x
    </>
  );
}

export default MapComponent;
