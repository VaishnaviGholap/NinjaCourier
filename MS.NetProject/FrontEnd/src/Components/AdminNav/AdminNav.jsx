import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./AdminNav.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { removeToken } from '../../APICallFunction/UserFunction';
import { Button } from 'react-bootstrap';

const AdminNav = () => {
  const nevigate = useNavigate();
  const clickHandle = ()=>{
    
    removeToken('token');
    nevigate("/admin");
}
    return (
      <div>
        <nav className="admin-navbar">
          <div className="logo">
            
            { <img src='./Images/ninjalogo2.gif' alt="ticket" />}
            <span className="logo-text" style={{fontFamily:'cursive',color:'black'}}>NinjaCourier</span>
          </div>
           
    <div className='nav-links'>
      
            <li><Link to="/adminhome">Home</Link></li>
            <li><Link to="/getorders">Get Orders</Link></li>
            <li><Link to="/getusers">Get Users</Link></li>
            <li><Link to="/getagents">Get Agents</Link></li>
            <li><Link to="/getqueries">Get Queries</Link></li>
           

    </div>
    <div className='logout'>
    <Button className="btn btn-primary" onClick={clickHandle}>Log Out</Button>
    </div>
        </nav>
      </div>
    );
  }
  
  export default AdminNav;