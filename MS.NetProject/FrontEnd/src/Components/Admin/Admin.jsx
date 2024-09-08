
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Admin.css';
import { AdminLogin } from '../../APICallFunction/AdminFunction';
import { Alert, Row } from 'react-bootstrap';
import { IoArrowBackCircle } from "react-icons/io5";
import { storeToken } from '../../APICallFunction/UserFunction';

function Admin() {
  const [formData, setFormData] = useState([]);
  const [erre, setErr] = useState('');

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('')
    console.log(formData);

    try {
      const res = await AdminLogin(formData);
    console.log(res);
    
    if(res.status === 200){

      console.log(res.data.token);
      storeToken(res.data.token);
      navigate('/adminhome');
    }
    
    
    } catch (error) {
      console.log(error);
      setErr(error.response.data)
    }
  };

 

  return (
    <div className='containerAd'>
      <div className="admin-auth">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
          
          {
                            erre.length === 0 ? null :
                                <Row className="mt-4">
                                    <Alert variant="danger">{erre} </Alert>
                                </Row>
                        }
          <button type="submit">Login</button>
        </form>
      </div>
      <IoArrowBackCircle style={{color:'white',fontSize:'50px'}}
          className="back-icon" 
          onClick={() => navigate("/role-select")} 
          title="Go Back"
        />
    
    </div>
  );
}

export default Admin;

