import React from 'react';
import './AboutBanner.css';
import bannerImage from './b1.jpg';
import facebookLogo from './fl1.png';
import twitterLogo from './tl1.png';
import instagramLogo from './il1.png';

const AboutBanner = () => {
  return (
    <div className="about-banner">
      <img src={bannerImage} alt="Banner" className="banner-image1" />
      <div className="about-content">
        <h2>About Our Website</h2>
        <p>
        Welcome to SRET EATS, your one-stop destination for mouthwatering snacks! 
            We're passionate about providing you with a diverse range of snacks, from crispy 
            chips to delectable desserts and refreshing beverages. Our commitment to quality 
            and taste ensures that every bite you take will be a memorable one.
      </p>
        <p>Follow us on social media:</p>
        <div className="social-media-icons">
          <a href="https://www.facebook.com">
            <img src={facebookLogo} alt="Facebook" />
          </a>
          <a href="https://www.twitter.com">
            <img src={twitterLogo} alt="Twitter" />
          </a>
          <a href="https://www.instagram.com">
            <img src={instagramLogo} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutBanner;
