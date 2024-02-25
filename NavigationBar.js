import React from 'react';
import './NavigationBar.css'; // Import your CSS file
import logo from './logo.png';

const NavigationBar = ({onMainRouteChange,userId}) => {

  const onHandleClick=  (route)=>{
    onMainRouteChange(route,userId)
  }




  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt='logo' className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="#" onClick={()=> onHandleClick('menu')}>Menu</a>
        </li>
        <li>
          <a href="#" onClick={()=> onHandleClick('fav')}>Favourites</a>
        </li>
        <li>
          <a href="#" onClick={()=> onHandleClick('cart')}>Cart</a>
        </li>
        <li>
          <a href="#" onClick={()=> onHandleClick('orders')}>Orders</a>
        </li>
        <li>
          <a href="#" onClick={()=> onHandleClick('profile')}>Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
