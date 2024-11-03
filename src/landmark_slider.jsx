// src/landmark_slider.jsx
import React, { useState, useEffect } from 'react';

const LandmarkMenu = ({ radius, onRadiusChange, onClose, name, onNameChange, newMarkerName }) => {
  const [markerName, setMarkerName] = useState(name || '');

  useEffect(() => {
    setMarkerName(name); // Update local state if `name` prop changes
  }, [name]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setMarkerName(newName);
    if (onNameChange) onNameChange(newName); // Call parent callback
  };

  return (
    <div>
      <input
        type="range"
        min="10"
        max="1000"
        value={radius}
        onChange={(e) => onRadiusChange(Number(e.target.value))}
      />
      <p>Radius: {radius} meters</p>

      <input
        type="text"
        value={newMarkerName}
        onChange={handleNameChange}
        placeholder="Enter marker name"
      />

      <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
    </div>
  );
};

export default LandmarkMenu;
