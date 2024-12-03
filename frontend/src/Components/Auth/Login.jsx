import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../Layout/Loader';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import './Login.css'; 

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';

  // Function to handle the login request
  const login = async (email, password) => {
    setLoading(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('http://localhost:3000/api/v1/login', { email, password }, config);
      toast.success("Login successful!");
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.user.role);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Formik form with Yup validation */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => login(values.email, values.password)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Email</label>
              <Field
                type="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="btn-login">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Register link */}
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
