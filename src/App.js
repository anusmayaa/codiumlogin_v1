import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import PracticeDSA from './pages/PracticeDSA/PracticeDSA';
import PracticeSQL from './pages/PracticeSQL/PracticeSQL';
import TakeQuiz from './pages/TakeQuiz/TakeQuiz';
import Quiz from './pages/Quiz/Quiz';
import DSASheets from './pages/DSASheets/DSASheets';
import SQLSheets from './pages/SQLSheets/SQLSheets';
import LearnTopic from './pages/LearnTopic/LearnTopic';
import Profile from './pages/Profile/Profile';
import ProblemSolve from './pages/ProblemSolve/ProblemSolve';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Default to home so logout doesn't force a login screen
  const [currentPage, setCurrentPage] = useState('home');  
  const [userData, setUserData] = useState(null);
  const [scrollToSection, setScrollToSection] = useState(null);
  const [selectedQuizTopic, setSelectedQuizTopic] = useState(null);
  const [learnTopicData, setLearnTopicData] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

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

  const handleNavigation = (page, section = null) => {
    setCurrentPage(page);
    if (section) {
      if (page === 'quiz') {
        setSelectedQuizTopic(section);
      } else if (page === 'learn-topic') {
        setLearnTopicData(section);
      } else if (page === 'problem-solve') {
        setSelectedProblem(section);
      } else {
        setTimeout(() => setScrollToSection(section), 100);
      }
    } else {
      setScrollToSection(null);
      setSelectedQuizTopic(null);
      setLearnTopicData(null);
    }
  };

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
        onNavigate={handleNavigation}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userData={userData}
        onNavigate={handleNavigation}
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
        {(isLoggedIn || currentPage === 'home') && currentPage === 'home' && (
          <Home 
            userData={userData} 
            isLoggedIn={isLoggedIn} 
            onLoginPrompt={switchToLogin}
            onRegisterPrompt={switchToSignup}
            onNavigate={setCurrentPage}
            scrollToSection={scrollToSection}
          />
        )}

        {isLoggedIn && currentPage === 'practice-dsa' && (
          <PracticeDSA onNavigate={handleNavigation} />
        )}

        {isLoggedIn && currentPage === 'problem-solve' && (
          <ProblemSolve problem={selectedProblem} onNavigate={handleNavigation} />
        )}

        {isLoggedIn && currentPage === 'practice-sql' && (
          <PracticeSQL />
        )}

        {isLoggedIn && currentPage === 'take-quiz' && (
          <TakeQuiz onNavigate={handleNavigation} />
        )}

        {isLoggedIn && currentPage === 'quiz' && selectedQuizTopic && (
          <Quiz topic={selectedQuizTopic} onNavigate={setCurrentPage} />
        )}

        {isLoggedIn && currentPage === 'dsa-sheets' && (
          <DSASheets onNavigate={handleNavigation} />
        )}

        {isLoggedIn && currentPage === 'sql-sheets' && (
          <SQLSheets onNavigate={handleNavigation} />
        )}

        {isLoggedIn && currentPage === 'learn-topic' && learnTopicData && (
          <LearnTopic 
            topic={learnTopicData.topic} 
            category={learnTopicData.category} 
            onNavigate={setCurrentPage} 
          />
        )}

        {isLoggedIn && currentPage === 'profile' && (
          <Profile userData={userData} />
        )}

        {isLoggedIn && currentPage === 'leaderboard' && (
          <Leaderboard userData={userData} />
        )}
      </div>
    </div>
  );
}

export default App;