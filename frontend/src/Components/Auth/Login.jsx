import React, {  useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import Loader from '../Layout/Loader';
// import MetaData from '../Layout/MetaData';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css';  // Optional for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  
  const login = async (email, password) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:3000/api/v1/login', { email, password }, config)
        console.log(data)
        alert("Login successful!");
        navigate("/");
        
    } catch (error) {
        
    }
}
const submitHandler = (e) => {
    e.preventDefault();
    login(email, password)
}
// useEffect(() => {
//     if (getUser() && redirect === 'shipping' ) {
//          navigate(/${redirect})
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