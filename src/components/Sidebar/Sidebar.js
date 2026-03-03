import React from 'react';
import '../../styles/Sidebar.css';

function Sidebar({ isOpen, closeSidebar, isLoggedIn, handleLogout, userData, onNavigate }) {
  const handleNavigation = (page, section = null) => {
    closeSidebar();
    onNavigate(page, section);
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
            <span>🏠</span> Home
          </a>
          <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'problems'); }}>
            <span>💻</span> Problems
          </a>
          <a href="#" className="sidebar-link">
            <span>📝</span> Quiz
          </a>
          <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'contest'); }}>
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