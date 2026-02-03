import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        onLogin(data.user);
        
        alert('Login successful!');
        
      } else {
        alert(data.message || 'Invalid credentials');
      }

    } catch (error) {
      // For testing without backend
      const dummyUser = {
        username: email.split('@')[0],
        email: email
      };
      
      localStorage.setItem('authToken', 'dummy-token-123');
      localStorage.setItem('userData', JSON.stringify(dummyUser));
      
      onLogin(dummyUser);
      alert('Login successful! (Demo mode)');
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20" 
                  stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Codium</h1>
        </div>

        <label>Email or Username</label>
        <input
          type="text"
          placeholder="Enter your email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <button className="login-btn" onClick={handleLogin}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 8V6C14 4.89543 13.1046 4 12 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H12C13.1046 20 14 19.1046 14 18V16M10 12H21M21 12L18 9M21 12L18 15" 
                  stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Login</span>
        </button>

        <p className="signup-text">
          Don't have an account? <a href="#" onClick={onSwitchToSignup}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;