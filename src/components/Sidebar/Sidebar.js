import React from 'react';
import '../../styles/Sidebar.css';

const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/>
      <polyline points="9 21 9 12 15 12 15 21"/>
    </svg>
  ),
  Problems: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Quiz: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Contest: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  Leaderboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="3" width="4" height="18"/>
      <rect x="10" y="8" width="4" height="13"/>
      <rect x="2" y="13" width="4" height="8"/>
    </svg>
  ),
  Profile: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

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
          <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
            <Icons.Home /> Home
          </button>
          <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'practice'); }}>
            <Icons.Problems /> Problems
          </button>
          <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('take-quiz'); }}>
            <Icons.Quiz /> Quiz
          </button>
          <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'compete'); }}>
            <Icons.Contest /> Contest
          </button>
          <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('leaderboard'); }}>
            <Icons.Leaderboard /> Leaderboard
          </button>
          
          {isLoggedIn && (
            <>
              <button className="sidebar-link" onClick={(e) => { e.preventDefault(); handleNavigation('profile'); }}>
                <Icons.Profile /> Profile
              </button>
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