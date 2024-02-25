import React from 'react'; // Import your CSS file
import favImage from './fav1.jpg'; // Import the image

const SnacksBanner = () => {
  return (
    <div className="snacks-banner">
      <img src={favImage} alt="Snacks Banner" className="banner-image" />
    
    </div>
  );
};

export default SnacksBanner;
