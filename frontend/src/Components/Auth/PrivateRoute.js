import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');  // Get the role from localStorage

  console.log('Current role:', role);  // Log the role to check

  // If role doesn't exist or doesn't match the allowedRoles, navigate to login
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, return the children (the protected route component)
  return children;
};

export default PrivateRoute;
