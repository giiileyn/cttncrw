import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file input change
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !name || !avatar) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
      // Adjust URL if your backend is running on a different port or subdirectory
      const response = await axios.post('http://localhost:3000/api/v1/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Error registering user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
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
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Avatar</label>
          <input
            type="file"
            className="form-control"
            onChange={handleAvatarChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;

 