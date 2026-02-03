import React from 'react';
import './Home.css';

function Home({ userData }) {
  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1>Welcome, {userData?.username}!</h1>
        <p className="subtitle">You are now logged in</p>
        <p className="user-email">Email: {userData?.email}</p>
        
        <div className="quick-stats">
          <div className="stat-box">
            <h3>0</h3>
            <p>Problems Solved</p>
          </div>
          <div className="stat-box">
            <h3>0</h3>
            <p>Contests Joined</p>
          </div>
          <div className="stat-box">
            <h3>0</h3>
            <p>Quiz Attempts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;