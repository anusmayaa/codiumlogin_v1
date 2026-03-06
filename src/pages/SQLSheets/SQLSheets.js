import React from 'react';
import '../../styles/SQLSheets.css';

function SQLSheets({ onNavigate }) {
  const sqlTopics = [
    { 
      title: "Basics", 
      desc: "Learn SQL fundamentals and syntax", 
      img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600"
    },
    { 
      title: "Queries and Operations", 
      desc: "Master SELECT, INSERT, UPDATE, DELETE", 
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
    },
    { 
      title: "SQL Joins", 
      desc: "Understand different types of joins", 
      img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600"
    },
    { 
      title: "Aggregate Functions", 
      desc: "Explore COUNT, SUM, AVG, MIN, MAX", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
    }
  ];

  return (
    <div className="sql-sheets-container">
      <div className="sql-sheets-header">
        <h1>SQL Learning Sheets</h1>
        <p>Select a topic to explore comprehensive SQL learning materials</p>
      </div>

      <div className="sql-topics-grid">
        {sqlTopics.map((topic, index) => (
          <div 
            key={index}
            className="sql-topic-box"
            style={{ backgroundImage: `url(${topic.img})` }}
            onClick={() => onNavigate('learn-topic', { topic: topic.title, category: 'sql' })}
          >
            <div className="sql-box-overlay">
              <h3>{topic.title}</h3>
              <p>{topic.desc}</p>
              <button className="learn-btn">Learn More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SQLSheets;
