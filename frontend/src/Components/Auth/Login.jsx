import React, {  useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';  // Import Link for navigation
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../Layout/Loader';
// import MetaData from '../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css';  // Optional for styling
import { authenticate, getUser } from '../../utils/helpers';
// import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  let location = useLocation()
  const navigate = useNavigate();


  
  
  // console.log(location)
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''

  const login = async (email, password) => {
    setLoading(true);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:3000/api/v1/login', { email, password }, config)
        console.log(data)
        toast.success("Login successful!");
        localStorage.setItem('token', data.token); 
        // localStorage.setItem('role', data.user.role); // Store role
        localStorage.setItem('user', JSON.stringify(data.user)); 
        navigate('/');
        
  } catch (error) {
      console.error(error);
      toast.error("Login failed! Please check your credentials.");
  } finally {
      setLoading(false); // Stop loading after request is complete
  }
}

const submitHandler = (e) => {
    e.preventDefault();
    login(email, password)
}

// useEffect(() => {
//     if (getUser() && redirect === 'shipping' ) {
//          navigate('/${redirect}')
//     }
// }, [])


return (
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={submitHandler}>
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
      <div className="btn-login">
      <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      
    </form>

    {/* Register link */}
    <div className="register-link">
      <p>Don't have an account? <Link to="/register">
      <br/>Signup</Link></p>
    </div>
  </div>
);
};


export default Login;