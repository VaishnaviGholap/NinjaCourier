
import React, { useEffect, useState } from 'react';
import './Customer.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { storeToken, UserLogin, UserSignUp } from '../../APICallFunction/UserFunction';
import { Alert, Row } from 'react-bootstrap';

function Customer() {
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
        console.log(formData); 
        if(isLogin){
        const res = await UserLogin(formData); 
        console.log(res);
             
        const val = res.data.user[0].customerId;
        const tkn = res.data.token;
        if (res.status === 200) {
            //res.data.msg
            setErr('');
            storeToken(tkn);
            sessionStorage.setItem('csID', val);
            navigate('/customer-home');
        }

      }else{
        const res = await UserSignUp(formData);
        if (res.status === 200) {
          //res.data.msg
          console.log("success");
          
          setErr('');
          navigate(0);
      }
      }

    } catch (error) {
       console.log(error);
        
            setErr(error.response.data);
            console.log(error.response);
        
    }
  
}
 
 
  return (
    <div className='containerC'>
      <div className="customer-auth">
        <h2>{isLogin ? 'Customer Login' : 'Customer Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name:</label>
              <input type="text" name="name" onChange={handleChange} required />
              <label>Email:</label>
              <input type="email" name="email" onChange={handleChange} required />
              <label>Phone:</label>
              <input type="tel" name="phoneNumber" onChange={handleChange} required />
              <label>Address:</label>
              <input type="text" name="address" onChange={handleChange} required />
            </>
          )}
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
          <label>Password:</label>
          <input type="password"  name="password" onChange={handleChange} required />
          {isLogin && (
            <div className="remember-me">
              <Link to="/forgetUser">Forget Password</Link>
            </div>
          )}
           {
                            erre.length === 0 ? null :
                                <Row className="mt-4">
                                    <Alert variant="danger">{erre} </Alert>
                                </Row>
                        }
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
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

export default Customer;


;
