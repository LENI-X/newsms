// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth hook

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // <-- Get the login function from context

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password); // <-- Call the login function from context
  };

  const loginContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  };

  const formStyle = {
    width: '300px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  };

  return (
    <div style={loginContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Admin Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>Username</label><br/>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{width: '95%', padding: '8px'}} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width: '95%', padding: '8px'}} />
        </div>
        <button type="submit" style={{width: '100%', padding: '10px'}}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;