import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import './Login.css';  // Optional for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Here you would call an API to validate the login credentials
    // Simulating login success and redirect
    // Replace this with actual API call later
    const response = await fakeLoginAPI(email, password);
    
    if (response.success) {
      navigate('/'); // Redirect to homepage after successful login
    } else {
      alert('Invalid credentials, please try again.');
    }
  };

  // Fake API call for simulation
  const fakeLoginAPI = (email, password) => {
    // This is just a placeholder. Replace this with actual API call logic.
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      {/* Register link */}
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
