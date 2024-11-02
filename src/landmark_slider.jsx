import React, { useState } from 'react';

const LandmarkMenu = () => {
  // State for slider value and circle size
  const [size, setSize] = useState(50); // Default size in pixels, interpreted as radius in meters

  // Handler for slider change
  const handleSliderChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Landmark Area</h2>
      <textarea 
        style={styles.details} 
        placeholder="Enter landmark details..."
      />
      
      <div style={{ ...styles.circle, width: size + 'px', height: size + 'px' }}>
        <div style={styles.dot} />
      </div>

      <div style={styles.sliderContainer}>
        <input
          type="range"
          min="10"
          max="100"
          value={size}
          onChange={handleSliderChange}
          style={styles.slider}
        />
        <span style={styles.radiusLabel}>{size} m</span>
      </div>
    </div>
  );
};

// Inline CSS for simplicity and responsiveness
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '10px',
    textAlign: 'center',
  },
  details: {
    width: '100%',
    height: '60px',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '1em',
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3d9ff',
    borderRadius: '50%',
    marginBottom: '20px',
    transition: 'width 0.2s, height 0.2s',
  },
  dot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#005f99',
    borderRadius: '50%',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  slider: {
    flex: 1,
    margin: '10px 0',
  },
  radiusLabel: {
    marginLeft: '10px',
    fontSize: '1em',
    color: '#333',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
  }
};
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        {children}
      </div>
    </div>
  );
};
export default LandmarkMenu;
