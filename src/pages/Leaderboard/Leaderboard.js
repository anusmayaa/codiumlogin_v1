import React, { useState, useEffect } from 'react';
import '../../styles/Leaderboard.css';

const dummyData = [
  { rank: 1, username: 'alex_codes',   totalPoints: 340, easy: 8, medium: 7, hard: 4 },
  { rank: 2, username: 'priya_dev',    totalPoints: 290, easy: 10, medium: 5, hard: 3 },
  { rank: 3, username: 'zaid_algo',    totalPoints: 250, easy: 6, medium: 6, hard: 3 },
  { rank: 4, username: 'sara_tech',    totalPoints: 210, easy: 9, medium: 4, hard: 2 },
  { rank: 5, username: 'rohan_dsa',    totalPoints: 180, easy: 7, medium: 4, hard: 1 },
  { rank: 6, username: 'nina_codes',   totalPoints: 160, easy: 8, medium: 3, hard: 1 },
  { rank: 7, username: 'dev_master',   totalPoints: 140, easy: 6, medium: 3, hard: 1 },
  { rank: 8, username: 'coder_x',      totalPoints: 120, easy: 6, medium: 2, hard: 1 },
  { rank: 9, username: 'byte_wizard',  totalPoints: 100, easy: 5, medium: 2, hard: 1 },
  { rank: 10, username: 'loop_hero',   totalPoints: 80,  easy: 4, medium: 2, hard: 0 },
];

function Leaderboard({ userData }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard/');
        const data = await response.json();
        setLeaderboard(data);
        const userEntry = data.find(u => u.username === userData?.username);
        if (userEntry) setCurrentUserRank(userEntry);
      } catch {
        // Add logged in user to dummy data if not present
        const data = [...dummyData];
        let userEntry = data.find(u => u.username === userData?.username);
        if (!userEntry) {
          userEntry = { rank: 11, username: userData?.username || 'You', totalPoints: 30, easy: 3, medium: 0, hard: 0 };
          data.push(userEntry);
        }
        setLeaderboard(data);
        setCurrentUserRank(userEntry);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [userData]);

  const getRankIcon = (rank) => rank;

  const getPointsBreakdown = (easy, medium, hard) =>
    `${easy * 10} + ${medium * 20} + ${hard * 30}`;

  return (
    <div className="lb-container">
      <div className="lb-header">
        <h1>Leaderboard</h1>
        <p>Rankings based on total points earned by solving problems</p>
      </div>

      {/* Points Legend */}
      <div className="lb-legend">
        <div className="lb-legend-item easy">
          <span className="lb-legend-dot"></span>
          Easy — 10 pts
        </div>
        <div className="lb-legend-item medium">
          <span className="lb-legend-dot"></span>
          Medium — 20 pts
        </div>
        <div className="lb-legend-item hard">
          <span className="lb-legend-dot"></span>
          Hard — 30 pts
        </div>
      </div>

      {/* Current User Card */}
      {currentUserRank && (
        <div className="lb-user-card">
          <div className="lb-user-card-avatar">
            {currentUserRank.username[0].toUpperCase()}
          </div>
          <div className="lb-user-card-info">
            <span className="lb-user-card-name">{currentUserRank.username}</span>
            <div className="lb-user-card-stats">
              <span className="lb-badge easy">{currentUserRank.easy} Easy</span>
              <span className="lb-badge medium">{currentUserRank.medium} Medium</span>
              <span className="lb-badge hard">{currentUserRank.hard} Hard</span>
            </div>
          </div>
          <div className="lb-user-card-right">
            <div className="lb-user-card-points">{currentUserRank.totalPoints} <span>pts</span></div>
            <div className="lb-user-card-rank">Rank #{currentUserRank.rank}</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="lb-loading">Loading leaderboard...</div>
      ) : (
        <div className="lb-table-wrapper">
          <div className="lb-table">

            {/* Table Header */}
            <div className="lb-row lb-head">
              <span className="lb-col-rank">Rank</span>
              <span className="lb-col-user">User</span>
              <span className="lb-col-solved">Easy</span>
              <span className="lb-col-solved">Medium</span>
              <span className="lb-col-solved">Hard</span>
              <span className="lb-col-breakdown">Points Breakdown</span>
              <span className="lb-col-points">Total</span>
            </div>

            {leaderboard.map((user) => {
              const isCurrentUser = user.username === userData?.username;
              return (
                <div
                  key={user.rank}
                  className={`lb-row ${isCurrentUser ? 'lb-row-highlight' : ''} ${user.rank <= 3 ? 'lb-row-top' : ''}`}
                >
                  <span className="lb-col-rank">
                    <span className={`lb-rank-badge rank-${user.rank}`}>
                      {getRankIcon(user.rank)}
                    </span>
                  </span>
                  <span className="lb-col-user">
                    <div className="lb-avatar">{user.username[0].toUpperCase()}</div>
                    <span className="lb-username">
                      {user.username}
                      {isCurrentUser && <span className="lb-you-tag">You</span>}
                    </span>
                  </span>
                  <span className="lb-col-solved">
                    <span className="lb-badge easy">{user.easy}</span>
                  </span>
                  <span className="lb-col-solved">
                    <span className="lb-badge medium">{user.medium}</span>
                  </span>
                  <span className="lb-col-solved">
                    <span className="lb-badge hard">{user.hard}</span>
                  </span>
                  <span className="lb-col-breakdown">
                    {getPointsBreakdown(user.easy, user.medium, user.hard)}
                  </span>
                  <span className="lb-col-points">
                    <strong>{user.totalPoints}</strong> pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
