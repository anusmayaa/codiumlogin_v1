import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Default to home so logout doesn't force a login screen
  const [currentPage, setCurrentPage] = useState('home');  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
      setCurrentPage('home'); // Ensure logged in users start at home
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setCurrentPage('home');
  };

  const handleSignup = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Change: Go to home on logout, not login page
    setCurrentPage('home'); 
    closeSidebar();
  };

  const switchToLogin = () => setCurrentPage('login');
  const switchToSignup = () => setCurrentPage('signup');
  const switchToHome = () => setCurrentPage('home');

  return (
    <div className="App">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isLoggedIn={isLoggedIn}
        userData={userData}
        currentPage={currentPage} // Used by Navbar to hide buttons on auth pages
        onLoginClick={switchToLogin}
        onRegisterClick={switchToSignup}
        onLogoClick={switchToHome}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userData={userData}
      />
      
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {/* Logic: Show Login/Signup only if not logged in AND current page matches */}
        {!isLoggedIn && currentPage === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={switchToSignup}
          />
        )}

        {!isLoggedIn && currentPage === 'signup' && (
          <Signup 
            onSignup={handleSignup} 
            onSwitchToLogin={switchToLogin}
          />
        )}

        {/* Show Home if: 
            1. User is logged in 
            2. OR current page is 'home' 
        */}
        {(isLoggedIn || currentPage === 'home') && (
          <Home 
            userData={userData} 
            isLoggedIn={isLoggedIn} 
            onLoginPrompt={switchToLogin}
            onRegisterPrompt={switchToSignup}
          />
        )}
      </div>
    </div>
  );
}

export default App;