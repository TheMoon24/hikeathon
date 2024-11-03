import React from 'react';
import Badge_gallery from './assets/Badge_gallery.png';  // Import the image

const Badges = () => {
  return (
    <img 
      src={Badge_gallery} 
      alt="Badge gallery" 
      style={{ width: '100%', marginBottom: '20px' }} 
    />
  );
};

export default Badges;