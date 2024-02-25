// Map.js
import React from 'react';
import './Map.css'; // Import your CSS file

const Map = () => {
  return (
    <div className="map-container">
      <h1 className="map-header">SRET EATS</h1>
      <div className="map-content">
        <div className="map-info">
          <h2>Opening Days and Timings</h2>
          <h3>Monday - Saturday</h3>
          <h3>8:00 AM - 6:00 PM</h3>
          <h2>Contact</h2>
          <h3>Email: sret.eats@example.com</h3>
          <h3>Phone: +1 (123) 456-7890</h3>
        </div>
        <div className="map-iframe">
          <div style={{ width: '100%' }}>
            <iframe
              title="SRET EATS Map"
              width="100%"
              height="600"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=24VR+3QR,%20Vijayalakshmi%20Nagar,%20Sri%20Ramachandra%20Nagar,%20Porur,%20Chennai,%20Tamil%20Nadu%20600116+(SRET%20EATS)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/population/">Population mapping</a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
