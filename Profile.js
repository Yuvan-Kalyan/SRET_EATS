import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = ({onMainRouteChange,userId}) => {
  const [userProfile, setUserProfile] = useState(); // State to store user profile data

  useEffect(() => {
    // Make a GET request to retrieve user profile data from the backend
    fetch(`http://localhost:3000/user-profile/${userId}`, {
      method: 'GET',
      // Replace ':userId' with the actual user ID you want to fetch
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user profile');
        }
      })
      .then((data) => {
        // Set the retrieved user profile data in the state
        setUserProfile(data);
        
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  
  const handleSignOut = () => {
    onMainRouteChange('signin',userId)
    console.log('Sign out clicked');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">User Profile</div>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      {userProfile && (
        <table className="profile-table">
          <tbody>
            <tr>
              <th>User Name:</th>
              <td>{userProfile.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{userProfile.email}</td>
            </tr>
            <tr>
              <th>Phone Number:</th>
              <td>{userProfile.phone}</td>
            </tr>
            <tr>
              <th>No. of Orders:</th>
              <td>{userProfile.no_of_orders}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
