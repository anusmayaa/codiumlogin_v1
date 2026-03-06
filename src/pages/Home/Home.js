import React, { useRef } from 'react';
import '../../styles/Home.css';
import problemSolvingImg from '../../images/photo-1555066931-4365d14bab8c.jpeg';
import quizChallengesImg from '../../images/photo-1606326608606-aa0b62935f2b.jpeg';
import codingContestsImg from '../../images/photo-1552664730-d307ca884978.jpeg';
import dsaSheetsImg from '../../images/photo-1516116216624-53e697fedbea.jpeg';
import practiceDsaImg from '../../images/photo-1504639725590-34d0984388bd.jpeg';
import sqlSheetsImg from '../../images/photo-1544383835-bda2bc66a55d.jpeg';
import practiceSqlImg from '../../images/photo-1460925895917-afdab827c52f.jpeg';
import createContestImg from '../../images/photo-1552664730-d307ca884978-1.jpeg';
import joinContestImg from '../../images/photo-1523580494863-6f3031224c94.jpeg';
import takeQuizImg from '../../images/photo-1434030216411-0b793f4b4173.jpeg';
import puzzleIcon from '../../icons/puzzle.png';
import quizGameIcon from '../../icons/quiz-game.png';
import podiumIcon from '../../icons/podium.png';

function Home({ userData, isLoggedIn, onLoginPrompt, onNavigate, scrollToSection }) {
  const problemsRef = useRef(null);
  const contestRef = useRef(null);
  const practiceRef = useRef(null);
  const competeRef = useRef(null);
  const quizRef = useRef(null);

  React.useEffect(() => {
    if (scrollToSection === 'problems' && problemsRef.current) {
      problemsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (scrollToSection === 'contest' && contestRef.current) {
      contestRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (scrollToSection === 'practice' && practiceRef.current) {
      practiceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (scrollToSection === 'compete' && competeRef.current) {
      competeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollToSection]);

  const scrollToPractice = () => {
    practiceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCompete = () => {
    competeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const features = [
    {
      title: "Problem Solving",
      description: "Master coding challenges with our curated collection of problems. From beginner to advanced, practice algorithms, data structures, and problem-solving techniques.",
      image: problemSolvingImg,
      icon: puzzleIcon
    },
    {
      title: "Quiz Challenges",
      description: "Test your knowledge with interactive quizzes covering various programming concepts. Track your progress and identify areas for improvement.",
      image: quizChallengesImg,
      icon: quizGameIcon
    },
    {
      title: "Coding Contests",
      description: "Compete with developers worldwide in real-time coding contests. Organize your own contests and challenge your peers to climb the leaderboard.",
      image: codingContestsImg,
      icon: podiumIcon
    }
  ];

  const practiceTopics = [
    { 
      title: "DSA Sheets", 
      desc: "Curated paths by experts", 
      img: dsaSheetsImg, 
      link: "/dsa-sheets" 
    },
    { 
      title: "Practice DSA", 
      desc: "Topic-wise problems", 
      img: practiceDsaImg, 
      link: "/practice-dsa" 
    },
    { 
      title: "SQL Sheets", 
      desc: "Database mastery guide", 
      img: sqlSheetsImg, 
      link: "/sql-sheets" 
    },
    { 
      title: "Practice SQL", 
      desc: "Real-world queries", 
      img: practiceSqlImg, 
      link: "/practice-sql" 
    }
  ];

  const contestOptions = [
    { 
      title: "Create Contest", 
      desc: "Host your own coding challenge", 
      img: createContestImg, 
      link: "/create-contest" 
    },
    { 
      title: "Join Contest", 
      desc: "Compete with others", 
      img: joinContestImg, 
      link: "/join-contest" 
    }
  ];

  const quizOptions = [
    { 
      title: "Take Quiz", 
      desc: "Test your knowledge", 
      img: takeQuizImg, 
      link: "/take-quiz" 
    }
  ];

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome back, {userData?.username || 'Coder'}!</h1>
        <p className="welcome-subtitle">Start coding..</p>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-heading">What We Offer</h2>
        
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card ${index % 2 === 1 ? 'reverse' : ''}`}
            ref={feature.title === 'Problem Solving' ? problemsRef : feature.title === 'Coding Contests' ? contestRef : null}
          >
            <div className="feature-content">
              <div className="feature-icon">
                <img src={feature.icon} alt={feature.title} className="feature-icon-img" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button 
                className="feature-btn"
                onClick={() => {
                  if (feature.title === 'Problem Solving') scrollToPractice();
                  if (feature.title === 'Coding Contests') scrollToCompete();
                  if (feature.title === 'Quiz Challenges') scrollToQuiz();
                }}
              >
                Get Started →
              </button>
            </div>
            <div className="feature-image">
              <img src={feature.image} alt={feature.title} />
              <div className="image-overlay"></div>
            </div>
          </div>
        ))}

        {/* Practice Hub - Wrapped in a single matching box */}
        <h2 className="features-heading" style={{ marginTop: '80px' }} ref={practiceRef}>Master Your Skills</h2>
        
        <div className="feature-card practice-main-card">
          <div className="practice-grid">
            {practiceTopics.map((topic, index) => (
              <div 
                key={index}
                className="practice-box"
                style={{ backgroundImage: `url(${topic.img})` }}
                onClick={() => {
                  if (!isLoggedIn) {
                    onLoginPrompt();
                  } else if (topic.link === '/practice-dsa') {
                    onNavigate('practice-dsa');
                  } else if (topic.link === '/practice-sql') {
                    onNavigate('practice-sql');
                  } else if (topic.link === '/dsa-sheets') {
                    onNavigate('dsa-sheets');
                  } else if (topic.link === '/sql-sheets') {
                    onNavigate('sql-sheets');
                  } else {
                    console.log("Navigate to", topic.link);
                  }
                }}
              >
                <div className="box-overlay">
                  <h4>{topic.title}</h4>
                  <p>{topic.desc}</p>
                  {!isLoggedIn && <span className="lock-tag">🔒 Login to Unlock</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contest Section */}
        <h2 className="features-heading" style={{ marginTop: '80px' }} ref={competeRef}>Compete & Excel</h2>
        
        <div className="feature-card practice-main-card">
          <div className="practice-grid">
            {contestOptions.map((option, index) => (
              <div 
                key={index}
                className="practice-box"
                style={{ backgroundImage: `url(${option.img})` }}
                onClick={() => !isLoggedIn ? onLoginPrompt() : console.log("Navigate to", option.link)}
              >
                <div className="box-overlay">
                  <h4>{option.title}</h4>
                  <p>{option.desc}</p>
                  {!isLoggedIn && <span className="lock-tag">🔒 Login to Unlock</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <h2 className="features-heading" style={{ marginTop: '80px' }} ref={quizRef}>Test Your Knowledge</h2>
        
        <div className="feature-card practice-main-card">
          <div className="practice-grid single-item">
            {quizOptions.map((option, index) => (
              <div 
                key={index}
                className="practice-box"
                style={{ backgroundImage: `url(${option.img})` }}
                onClick={() => {
                  if (!isLoggedIn) {
                    onLoginPrompt();
                  } else if (option.link === '/take-quiz') {
                    onNavigate('take-quiz');
                  } else {
                    console.log("Navigate to", option.link);
                  }
                }}
              >
                <div className="box-overlay">
                  <h4>{option.title}</h4>
                  <p>{option.desc}</p>
                  {!isLoggedIn && <span className="lock-tag">🔒 Login to Unlock</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;