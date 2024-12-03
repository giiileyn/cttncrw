import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // You can style the profile as you want

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming the user info is stored in localStorage

        if (storedUser) {
          setUser(storedUser); // Set user data from localStorage if it exists
          // Ensure the avatar URL is correct or fallback to default
          const avatarUrl = storedUser.avatar || '/images/default-avatar.jpg';
          setAvatar(avatarUrl);
        } else {
          // If no user found in localStorage, fetch from API (optional)
          const response = await axios.get('http://localhost:3000/api/v1/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if token is stored differently
            },
          });

          const { name, email, avatar } = response.data.user;
          setUser({ name, email });
          
          // Use avatar URL from API or fallback to default
          const avatarUrl = avatar ? avatar.url : '/images/default-avatar.jpg';
          setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile. Please try again.');
        navigate('/login');  // Redirect to login if user is not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h2>Profile</h2>
          <div className="profile-avatar">
            {/* Display user avatar */}
            <img src={avatar} alt="User Avatar" className="avatar-img" />
          </div>
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more profile details here if needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
