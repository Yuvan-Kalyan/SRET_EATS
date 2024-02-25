import React, { useState } from 'react';
import './Register.css'; // Import your CSS file
import logo from './logo2.png'; // Import your logo image
import bannerImage from './RegBan.jpg';

const Register = ({ onMainRouteChange,userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const onHandleClick = (route) => {
    onMainRouteChange(route, userId); // Pass userId to onMainRouteChange
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
  
      if (response.ok) {
        // Registration successful, extract and set the userId
        const data = await response.json();
        console.log('Registration successful');
        console.log(data);
        onMainRouteChange('menu', data.user._id); // Pass the userId to onMainRouteChange
      } else {
        // Handle registration error (e.g., display error message)
        console.error('Registration failed:', response.status, response.statusText);
        // You can also parse and log the response JSON here for more details
        const errorData = await response.json();
        console.error('Error data:', errorData);
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
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button type="button" className="signup-button" onClick={handleRegister}>
            Sign Up
          </button>
        </form>
        <p className="signin-link">
          Already have an account?{' '}
          <span className="link-text" onClick={() => onHandleClick('signin')}>Sign in</span>
        </p>
      </div>
      <div className="right-box">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
    </div>
  );
};

export default Register;
