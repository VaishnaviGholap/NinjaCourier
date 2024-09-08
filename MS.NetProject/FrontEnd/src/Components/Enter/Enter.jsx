import React from 'react';
import './Enter.css'; 
import { Link } from 'react-router-dom';

const Enter = () => {
  return (
    <div className="entry-page">
      <div className="video-background"></div>
      <div className="content">
        <div className="welcome-message">
          Welcome to Our NinjaCourier Portal!
        </div>
        
        <Link to="/role-select" className="enter-button">𝖭𝗂𝗇𝗃𝖺𝖢𝗈𝗎𝗋𝗂𝖾𝗋</Link>
      </div>
    </div>
  );
};

export default Enter;
