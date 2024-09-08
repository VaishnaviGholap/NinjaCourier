import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import './RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className='scroll'>
      <marquee>
        <p>"ᴄᴏɴɴᴇᴄᴛɪɴɢ ʏᴏᴜ ᴛᴏ ᴄᴏɴᴠᴇɴɪᴇɴᴄᴇ, ᴅᴇʟɪᴠᴇʀɪɴɢ ʏᴏᴜʀ ᴡᴏʀʟᴅ ᴛᴏ ʏᴏᴜʀ ᴅᴏᴏʀꜱ...!!"</p>
      </marquee>
      <div className="role-selection">
        <h1 style={{color:'white'}}>Login As....</h1>
        <br />
        <div className="button-container">
          <Link to="/customer">Customer</Link>
          <Link to="/agent">Agent</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <IoArrowBackCircle style={{color:'white',fontSize:'50px'}}
          className="back-icon" 
          onClick={() => navigate('/')} 
          title="Go Back"
        />
      </div>
    </div>
  );
}

export default RoleSelect;

