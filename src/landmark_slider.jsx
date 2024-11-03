// src/landmark_slider.jsx
import React from 'react';

const LandmarkMenu = ({ radius, onRadiusChange, onClose }) => {
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
      <button onClick={onClose} style={styles.closeButton}>Close</button>
    </div>
  );
};

const styles = {
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    fontSize: '1em',
    cursor: 'pointer',
  },
};

export default LandmarkMenu;
