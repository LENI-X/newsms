// src/components/Header.js
import React from 'react';

// A simple functional component for our header
function Header() {
  // Inline styles are used here for simplicity
  const headerStyle = {
    backgroundColor: '#20232a',
    padding: '20px',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <header style={headerStyle}>
      <h1>College Fee Management System</h1>
    </header>
  );
}

export default Header;