import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./AgentNav.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { removeToken } from '../../APICallFunction/UserFunction';
import { Button } from 'react-bootstrap';


const AgentNav = () => {
  const nevigate = useNavigate();
  const clickHandle = ()=>{
    
    removeToken('token');
    nevigate("/agent");
}
    return (
      <div>
        <nav className="Agent-navbar">
          <Link to="/Agenthome" className="logo">
            { <img src='./Images/ninjalogo2.gif' alt="ticket" />}
            <span className="logo-text" style={{fontFamily:'cursive',color:'black'}}>NinjaCourier</span>
          </Link>
           
    <div className='nav-links'>
      
         
 
 
            <li><Link to="/agenthome">Home</Link></li>
            <li><Link to="/agentorders">View Order</Link></li>
            <li><Link to="/agentcontact">Contact Us</Link></li>
            <li><Link to="/agentabout">About Us</Link></li> 

    </div>
    <Button className="btn" style={{backgroundColor:'rgb(175, 8, 8)'}} onClick={clickHandle}>Log Out</Button>
        </nav>
      </div>
    );
  }
  
  export default AgentNav;