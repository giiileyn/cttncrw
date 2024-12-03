import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; // Yup validation library
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    avatar: Yup.mixed().required('Avatar is required')
      .test("fileSize", "The file is too large", value => value && value.size <= 5 * 1024 * 1024) // 5MB limit
      .test("fileFormat", "Unsupported Format", value => value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)),
  });

  const handleRegister = async (values) => {
    const { name, email, password, avatar } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
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
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          avatar: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Name</label>
              <Field
                type="text"
                name="name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

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

            <div className="form-group">
              <label>Avatar</label>
              <input
                type="file"
                name="avatar"
                className="form-control"
                onChange={(event) => setFieldValue("avatar", event.target.files[0])}
              />
              <ErrorMessage name="avatar" component="div" className="error" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
