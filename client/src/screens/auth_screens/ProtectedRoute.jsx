// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

// Authentication utility function
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('Auth Token:', token); // Debugging
  return !!token;
};

// ProtectedRoute component
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    if (!authenticated) {
      navigate('/signin');
    }
  }, [authenticated, navigate]);

  return authenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
