
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle, IoLocationSharp } from "react-icons/io5"; // Import the location icon
import './RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className='scroll'>
      <marquee>
        <p>"ᴄᴏɴɴᴇᴄᴛɪɴɢ ʏᴏᴜ ᴛᴏ ᴄᴏɴᴠᴇɴɪᴇɴᴄᴇ, ᴅᴇʟɪᴠᴇʀɪɴɢ ʏᴏᴜʀ ᴡᴏʀʟᴅ ᴛᴏ ʏᴏᴜʀ ᴅᴏᴏʀꜱ...!!"</p>
      </marquee>
      <div className="role-selection">
        <h1 style={{ color: 'white' }}>Login As....</h1>
        <br />
        <div className="button-container">
          <Link to="/customer">Customer</Link>
          <Link to="/agent">Agent</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div className="navigation-icons">
          {/* <IoLocationSharp 
            style={{ color: 'white', fontSize: '50px', marginRight: '1060px',marginTop:'100px'}} 
            className="track-icon" 
            onClick={() => navigate('/track-home')} 
            title="Track Order"
          /> */}
          <IoArrowBackCircle 
            style={{ color: 'white', fontSize: '50px' }} 
            className="back-icon" 
            onClick={() => navigate('/')} 
            title="Go Back"
          />
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
