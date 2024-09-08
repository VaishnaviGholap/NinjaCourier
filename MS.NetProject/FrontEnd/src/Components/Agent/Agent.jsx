
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Agent.css';
import { IoArrowBackCircle } from "react-icons/io5";
import { LoginAgent, SignAgent } from '../../APICallFunction/AgentFunction';
import { Alert, Row } from 'react-bootstrap';
import { storeToken } from '../../APICallFunction/UserFunction';

function Agent() {
  const [isLogin, setIsLogin] = useState(true);
  const [erre, setErr] = useState('');
  const [formData, setFormData] = useState([]);

 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        setErr('');
        console.log(formData);   
        if(isLogin){
        const res = await LoginAgent(formData); 
        console.log(res.status);
             
        const val = res.data.user[0].agentId;
        if (res.status === 200) {
            //res.data.msg
            setErr('');
            storeToken(res.data.token);
            sessionStorage.setItem('agent', val);
            navigate('/agenthome');
        }

      }else{
        const res = await SignAgent(formData);
        if (res.status === 200) {
          //res.data.msg
          console.log("success");
          
          setErr('');
          navigate(0);
      }
      }

    } catch (error) {
       console.log(error);
        if (error.response.status === 404) {
            setErr(error.response.data);
            console.log(error.response.data);
        }
    }
  
}

  return (
    <div className='containerA'>
      <div className="agent-auth">
        <h2>{isLogin ? 'Agent Login' : 'Agent Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Company Name:</label>
              <input type="text" name="companyName" onChange={handleChange} required />
              <label>Agent Name:</label>
              <input type="text" name="agentName" onChange={handleChange} required />
              <label>Phone:</label>
              <input type="text" name="phoneNumber" onChange={handleChange} required />
              <label>Email:</label>
              <input type="text" name="email" onChange={handleChange} required />
              
              
              <label>Address:</label>
              <input type="text" name="address" onChange={handleChange} required />
            </>
          )}
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
          {isLogin && (
            <div className="remember-me">
             <Link to="/forgetAgent">Forget Password</Link>
            </div>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
          {
                            erre.length === 0 ? null :
                                <Row className="mt-4">
                                    <Alert variant="danger">{erre} </Alert>
                                </Row>
                        }
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
      <IoArrowBackCircle style={{color:'white',fontSize:'50px'}}
          className="back-icon" 
          onClick={() => navigate("/role-select")} 
          title="Go Back"
        />
    </div>
  );
}

export default Agent;


