import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecretRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');  // Get the role from localStorage
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      navigate('/login');  // Redirect to login page if role doesn't match
    }
  }, [role, allowedRoles, navigate]);

  // If role matches, return children (the protected route component)
  if (role && allowedRoles.includes(role)) {
    return children;
  }

  // Optionally, you can return a loading or fallback component while waiting for the navigation
  return null;
};

export default SecretRoute;
