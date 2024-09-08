
import React, { useEffect, useState } from 'react';
import '../Customer/Customer.css'; 
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { storeToken, UserForget, UserLogin } from '../../APICallFunction/UserFunction';
import { Alert, Button, Modal, Row } from 'react-bootstrap';
import { AgentForget } from '../../APICallFunction/AgentFunction';

function ForgetAgent() {
  const [username, setUsername] = useState('');
  const [erre, setErr] = useState('');
  const [formData, setFormData] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

 
  const navigate = useNavigate();

  const handleClose = ()=>{setShow(false);}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUsername(e.target.value);
  };

  const redirect =()=>{
    navigate('/otpAgent')
  
   }
  

  const handleSubmit = async (e) => {
   
      try {
        e.preventDefault();
        setErr('');
        console.log(username); 
       
        const res = await AgentForget(username); 
        console.log(res);
             
    
        if (res.status === 200) {
            //res.data.msg
            
            sessionStorage.setItem('user',username);
            setMsg(res.data);
        setShow(true);
           // navigate('/otpAgent');
         
      }
     
     
  
      } catch (error) {
        console.log(error.response.data);
        //setErr(error.response.data);
        const errorMsg = typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.msg || 'An unexpected error occurred';
        setErr(errorMsg);
      }
      

   
  
}
 
 
  return (
    <div className='containerC'>
      <div className="customer-auth">
        <h2>Forget Password</h2>
        <h4>Enter Your Username</h4>
        <form onSubmit={handleSubmit}>
          
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
          
          <button type="submit">Submit</button>
        </form>
        {erre && (
          <Row className="mt-4">
            <Alert variant="danger">{erre}</Alert>
          </Row>
        )}
       <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={redirect} style={ {width:'70px',height:'40px'}}>
                        OTP
                    </Button>
                    <Button variant="danger" onClick={handleClose} style={ {width:'70px',height:'40px'}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
      </div>
        <IoArrowBackCircle style={{color:'white',fontSize:'50px'}}
          className="back-icon" 
          onClick={() => navigate("/customer")} 
          title="Go Back"
        />
    </div>
  );
}

export default ForgetAgent;



