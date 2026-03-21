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

const PuzzleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const QuizIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const ContestIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

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
      icon: <PuzzleIcon />
    },
    {
      title: "Quiz Challenges",
      description: "Test your knowledge with interactive quizzes covering various programming concepts. Track your progress and identify areas for improvement.",
      image: quizChallengesImg,
      icon: <QuizIcon />
    },
    {
      title: "Coding Contests",
      description: "Compete with developers worldwide in real-time coding contests. Organize your own contests and challenge your peers to climb the leaderboard.",
      image: codingContestsImg,
      icon: <ContestIcon />
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
                {feature.icon}
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