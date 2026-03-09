import React, { useState, useEffect } from 'react';
import '../../styles/Profile.css';

function Profile({ userData }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      // Dummy data for now
      const dummyStats = {
        questionsSubmitted: 42,
        quizzesParticipated: 15
      };
      setStats(dummyStats);
      setLoading(false);

      // Uncomment when backend is ready
      // const token = localStorage.getItem('authToken');
      // const response = await fetch('http://localhost:8000/api/user/stats/', {
      //   headers: {
      //     'Authorization': `Token ${token}`
      //   }
      // });
      // const data = await response.json();
      // setStats(data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {userData?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2>{userData?.username || 'User'}</h2>
            <p className="profile-email">{userData?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="profile-main">
          <div className="stats-section">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-info">
                  <div className="stat-number">{stats?.questionsSubmitted || 0}</div>
                  <div className="stat-label">Questions Submitted</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-info">
                  <div className="stat-number">{stats?.quizzesParticipated || 0}</div>
                  <div className="stat-label">Quizzes Participated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
