import React from 'react';
import cartImage from './cartsret.jpg';
import './CartBanner.css';

const CartBanner = () => {
  return (
    <div className="cart-banner-container">
      <img src={cartImage} alt="Cart Banner" className="cart-banner-image" />
      <div className="cart-banner-text">Cart </div>
    </div>
  );
};

export default CartBanner;
