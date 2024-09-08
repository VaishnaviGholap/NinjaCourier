import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { removeToken } from '../../APICallFunction/UserFunction';

const Navbar = () => {
  const navigate = useNavigate();
  
  const clickHandle = () => {
    // Remove token logic if needed
    removeToken('token');
    navigate("/customer");
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src='./Images/ninjalogo2.gif' alt="NinjaCourier Logo" />
          <span className="logo-text" style={{ fontFamily: 'cursive', color: 'black' }}>NinjaCourier</span>
        </div>
        
        <div className='nav-links'>
         
            <li><Link to="/customer-home">Home</Link></li>
            <li><Link to="/distance">Place Order</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/view">View Orders</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
         
        </div>
        
        <Button className="btn btn-primary" onClick={clickHandle}>Log Out</Button>
      </nav>
    </div>
  );
}

export default Navbar;
