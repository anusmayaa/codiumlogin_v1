import React, { useState, useEffect } from 'react';
import '../../styles/PracticeSQL.css';

function PracticeSQL() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [loading, setLoading] = useState(true);

  const topics = ['All', 'SELECT', 'JOIN', 'Aggregation', 'Subqueries', 'Window Functions', 'Indexes', 'Transactions', 'Stored Procedures'];

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (selectedTopic === 'All') {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(problems.filter(p => p.topic === selectedTopic));
    }
  }, [selectedTopic, problems]);

  const fetchProblems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sql/problems');
      const data = await response.json();
      setProblems(data);
      setFilteredProblems(data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#666';
    }
  };

  return (
    <div className="practice-sql-container">
      <div className="practice-sql-header">
        <h1>Practice SQL Problems</h1>
        <p>Master database queries and SQL concepts with real-world problems</p>
      </div>

      <div className="topics-section">
        <div className="topics-filter">
          {topics.map(topic => (
            <button
              key={topic}
              className={`topic-btn ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading problems...</div>
      ) : (
        <div className="problems-container">
          <div className="problems-table">
            <div className="table-header">
              <span className="col-title">Title</span>
              <span className="col-topic">Topic</span>
              <span className="col-difficulty">Difficulty</span>
              <span className="col-action">Action</span>
            </div>
            {filteredProblems.length === 0 ? (
              <div className="no-problems">No problems found for this topic</div>
            ) : (
              filteredProblems.map(problem => (
                <div key={problem._id} className="table-row">
                  <span className="problem-title">{problem.title}</span>
                  <span className="problem-topic">{problem.topic}</span>
                  <span 
                    className="problem-difficulty"
                    style={{ color: getDifficultyColor(problem.difficulty) }}
                  >
                    {problem.difficulty}
                  </span>
                  <button className="solve-btn">Solve</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticeSQL;
