// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from '../api/axiosConfig.js';
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // Get token from localStorage if it exists
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  // The login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      if (response.data.token) {
        // Store token in state and localStorage
        setAuthToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);
        // Redirect to the dashboard after login
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your username and password.');
    }
  };

  // The logout function
  const logout = () => {
    // Clear token from state and localStorage
    setAuthToken(null);
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  // The value provided to consuming components
  const value = {
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};