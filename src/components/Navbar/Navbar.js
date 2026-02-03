
import React from 'react';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Hamburger Button - positioned absolutely */}
        <button className="hamburger" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo - centered */}
        <div className="navbar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20" 
                  stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Codium</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;