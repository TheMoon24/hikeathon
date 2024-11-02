import React from 'react';

const ZoneLogic = ({ userPosition, zoneCenter, radius }) => {
  const latToMeters = 111000; // meters per degree latitude
  const lonToMeters = (lat) => Math.cos(lat * (Math.PI / 180)) * 111000;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const deltaLat = (lat2 - lat1) * latToMeters;
    const deltaLon = (lon2 - lon1) * lonToMeters((lat1 + lat2) / 2); // Average latitude for more accuracy

    return Math.sqrt(deltaLat ** 2 + deltaLon ** 2);
  };

  const isInZone = () => {
    const distance = calculateDistance(
      userPosition.lat,
      userPosition.lon,
      zoneCenter.lat,
      zoneCenter.lon
    );
    return distance <= radius;
  };

  return (
    <div>
      {isInZone() ? (
        <p>You are within the zone!</p>
      ) : (
        <p>You are outside the zone.</p>
      )}
    </div>
  );
};

export default ZoneLogic;
