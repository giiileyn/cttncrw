import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if token is stored differently
          },
        });
        const { name, email, avatar } = response.data.user;
        setName(name);
        setEmail(email);
        setCurrentAvatar(avatar.url);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  // Handle file input change
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await axios.put('http://localhost:3000/api/v1/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as necessary
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully!');
        navigate('/profile/edit'); // Redirect to the profile page
      } else {
        alert('Profile update failed. Please try again.');
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Avatar</label>
          {currentAvatar && <img src={currentAvatar} alt="Current Avatar" className="current-avatar" />}
        </div>

        <div className="form-group">
          <label>New Avatar (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={handleAvatarChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
