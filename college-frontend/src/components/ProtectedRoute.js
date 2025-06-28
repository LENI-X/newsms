
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { authToken } = useAuth();

  if (!authToken) {
    // If no token exists, redirect the user to the /login page
    return <Navigate to="/login" />;
  }

  // If a token exists, render the child components (the protected page)
  return children;
}

export default ProtectedRoute;