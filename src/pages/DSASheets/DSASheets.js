import React from 'react';
import '../../styles/DSASheets.css';

function DSASheets({ onNavigate }) {
  const dsaTopics = [
    { 
      title: "Arrays", 
      desc: "Learn array operations and algorithms", 
      img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600"
    },
    { 
      title: "Strings", 
      desc: "Master string manipulation techniques", 
      img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600"
    },
    { 
      title: "Stack", 
      desc: "Understand stack data structure", 
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"
    },
    { 
      title: "Queue", 
      desc: "Explore queue operations", 
      img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600"
    },
    { 
      title: "Linked Lists", 
      desc: "Deep dive into linked lists", 
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
    },
    { 
      title: "Trees", 
      desc: "Learn tree traversals and operations", 
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    },
    { 
      title: "Graphs", 
      desc: "Master graph algorithms", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
    }
  ];

  return (
    <div className="dsa-sheets-container">
      <div className="dsa-sheets-header">
        <h1>DSA Learning Sheets</h1>
        <p>Select a topic to explore comprehensive learning materials and concepts</p>
      </div>

      <div className="dsa-topics-grid">
        {dsaTopics.map((topic, index) => (
          <div 
            key={index}
            className="dsa-topic-box"
            style={{ backgroundImage: `url(${topic.img})` }}
            onClick={() => onNavigate('learn-topic', { topic: topic.title, category: 'dsa' })}
          >
            <div className="dsa-box-overlay">
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

export default DSASheets;
