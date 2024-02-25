import React, { useState } from 'react';
import '../Register/Register.css'; // Import your CSS file
import logo from './logo2.png'; // Import your logo image
import bannerImage from './RegBan.jpg';

const SignIn = ({ onMainRouteChange ,userId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleClick = (route) => {
    onMainRouteChange(route);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Handle successful sign-in (e.g., set user session, redirect)
        const data = await response.json();
        console.log('Sign-in successful');
        console.log(data.user._id)
        onMainRouteChange('menu', data.user._id); // Pass the userId to onMainRouteChange
      } else {
        // Handle authentication error (e.g., display error message)
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <div className="register-container">
      <div className="left-box">
        <br></br>
        <br></br>
        <img src={logo} alt="SRET Eats Logo" className="logo1" />
        <h2>Welcome to SRET Eats</h2>
        <br></br>
        <form className="registration-form">
          <br></br>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br></br>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br></br>
          <button
            type="button"
            className="signup-button"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </form>
        <p className="signin-link">
          Don't have an account?{' '}
          <a href="#" onClick={() => onHandleClick('register')}>
            Sign up
          </a>
        </p>
      </div>
      <div className="right-box">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
    </div>
  );
};

export default SignIn;
