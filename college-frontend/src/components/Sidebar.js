// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Sidebar() {
  const sidebarStyle = {
    height: '100vh', // Full height
    width: '220px',
    position: 'fixed', // Fixed to the side
    left: 0,
    top: 0,
    paddingTop: '100px', // A little space below the header
    backgroundColor: '#f4f4f4',
    borderRight: '1px solid #ddd'
  };

  const linkStyle = {
    display: 'block',
    padding: '15px 20px',
    color: '#333',
    textDecoration: 'none',
    fontSize: '18px'
  };

  const { authToken, logout } = useAuth();
  const logoutButtonStyle = {  };

  return (
    <nav style={sidebarStyle}>
      
      {authToken && (
        <>
          <Link to="/" style={linkStyle}>Dashboard</Link>
          <Link to="/students" style={linkStyle}>Students</Link>
          <Link to="/invoices/new" style={linkStyle}>Issue Invoice</Link>
          <Link to="/reports" style={linkStyle}>Reports</Link>
          <button onClick={logout} style={logoutButtonStyle}>Logout</button>
        </>
      )}
    </nav>
  );
  
}



export default Sidebar;