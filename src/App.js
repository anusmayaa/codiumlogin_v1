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
  const [currentPage, setCurrentPage] = useState('login');  // ← Make sure this line exists!
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
  };

  const handleSignup = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setCurrentPage('login');
    closeSidebar();
  };

  // ← Make sure these two functions exist!
  const switchToLogin = () => {
    setCurrentPage('login');
  };

  const switchToSignup = () => {
    setCurrentPage('signup');
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userData={userData}
      />
      
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {!isLoggedIn ? (
          currentPage === 'login' ? (
            <Login 
              onLogin={handleLogin} 
              onSwitchToSignup={switchToSignup}
            />
          ) : (
            <Signup 
              onSignup={handleSignup} 
              onSwitchToLogin={switchToLogin}
            />
          )
        ) : (
          <Home userData={userData} />
        )}
      </div>
    </div>
  );
}

export default App;