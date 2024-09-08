import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHome.css';
import AdminNav from '../AdminNav/AdminNav';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const AdminHome = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    tokenCheck();
  },[])

  const tkn = getToken();
   
  const tokenCheck = ()=>{
    console.log(tkn);
    
   if(!tkn){
    navigate('/admin')
   }
    
    
  }
  return (
    <div>
      <AdminNav/>
    
    <div className="admin-container">
      <div className="admin-header">
        <img src={`${process.env.PUBLIC_URL}/images/admin.jpeg`} alt="Admin" className="admin-img" />
        <h1>Admin Portal</h1>
      </div>
      <div className="admin-portal">
        <div className="admin-section">
          <h2>Check Users</h2>
          <p>View and manage registered users.</p>
          <Link to="/getusers" className="btn btn-primary">Go to Users</Link>
          
        </div>
        <div className="admin-section">
          <h2>Check Orders</h2>
          <p>View and manage customer orders.</p>
          <Link to="/getorders" className="btn btn-primary">Go to Orders</Link>
          
        </div>
        <div className="admin-section">
          <h2>Check Queries</h2>
          <p>View and respond to customer queries.</p>
          <Link to="/getqueries" className="btn btn-primary">Go to Queries</Link>
          
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AdminHome;
