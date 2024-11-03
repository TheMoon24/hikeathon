class ZoneLogic{
  constructor(userPosition, zoneCenter, radius){
    this.userPosition = userPosition;
    this.zoneCenter = zoneCenter;
    this.radius = radius;
    this.latToMeters = 111000; // meters per degree latitude
    this.lonToMeters = (lat) => Math.cos(lat * (Math.PI / 180)) * 111000;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const deltaLat = (lat2 - lat1) * latToMeters;
    const deltaLon = (lon2 - lon1) * lonToMeters((lat1 + lat2) / 2); // Average latitude for more accuracy

    return Math.sqrt(deltaLat ** 2 + deltaLon ** 2);
  };

  isInZone() {
    const distance = calculateDistance(
      userPosition.lat,
      userPosition.lon,
      zoneCenter.lat,
      zoneCenter.lon
    );
    return distance <= radius;
  };
};

export default ZoneLogic;
