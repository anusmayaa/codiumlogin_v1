import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, closeSidebar, isLoggedIn, handleLogout, userData }) {
  return (
    <>
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link">
            <span>🏠</span> Home
          </a>
          <a href="#" className="sidebar-link">
            <span>💻</span> Problems
          </a>
          <a href="#" className="sidebar-link">
            <span>📝</span> Quiz
          </a>
          <a href="#" className="sidebar-link">
            <span>🏆</span> Contest
          </a>
          <a href="#" className="sidebar-link">
            <span>📊</span> Leaderboard
          </a>
          
          {isLoggedIn && (
            <>
              <a href="#" className="sidebar-link">
                <span>👤</span> Profile
              </a>
              <a href="#" className="sidebar-link">
                <span>⚙️</span> Settings
              </a>
            </>
          )}
        </nav>

        {isLoggedIn && (
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;