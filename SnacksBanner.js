import React from 'react';
import './SnacksBanner.css'; // Import your CSS file
import snacksImage from './snacksbev.png'; // Import the image


const SnacksBanner = () => {
  return (
    <div className="snacks-banner">
      <img src={snacksImage} alt="Snacks Banner" className="banner-image" />
      <div className="banner-content">
        
      </div>
    </div>
  );
};

export default SnacksBanner;
