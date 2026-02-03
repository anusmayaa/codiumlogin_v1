import React, { useState } from 'react';
import './login.css';

function Login({ onLogin }) {  // Add onLogin prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // When login is successful
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Store token (you'll get this from backend later)
    localStorage.setItem('authToken', 'dummy-token');
    
    // Call the onLogin function from App.js
    onLogin();
    
    alert('Login successful!');
  };

  

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo/Title */}
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20" 
                  stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Codium</h1>
        </div>

        {/* Email Input */}
        <label>Email or Username</label>
        <input
          type="text"
          placeholder="Enter your email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-btn" onClick={togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        {/* Login Button */}
        <button className="login-btn" onClick={handleLogin}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 8V6C14 4.89543 13.1046 4 12 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H12C13.1046 20 14 19.1046 14 18V16M10 12H21M21 12L18 9M21 12L18 15" 
                  stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Login</span>
        </button>

        {/* Signup Link */}
        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;