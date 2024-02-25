/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './SecondNavBar.css'; // Import your CSS file

const SecondNavBar = ({onMenuRouteChange}) => {


  return (
    <nav className="second-navbar">
      <ul className="second-nav-links">
        <li>
          <a href="javascript:void(0)" >Snacks</a>
        </li>
        <li>
          <a href="javascript:void(0)" >Chips</a>
        </li>
        <li>
          <a href="javascript:void(0)" >Desserts</a>
        </li>
        <li>
          <a href="javascript:void(0)" >Beverages</a>
        </li>
        <li>
          <a href="javascript:void(0)" >Food</a>
        </li>
        <li>
            <a href='javascript:void(0)' >Trending</a>
        </li>
      </ul>
    </nav>
  );
};

export default SecondNavBar;
