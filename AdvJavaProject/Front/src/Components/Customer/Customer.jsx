

import React, { useState } from 'react';
import './Customer.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { storeToken, UserLogin, UserSignUp } from '../../APICallFunction/UserFunction';
import { Alert, Row } from 'react-bootstrap';

function Customer() {
  const [isLogin, setIsLogin] = useState(true);
  const [erre, setErr] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Validate on each change for signup only
    if (!isLogin) {
      const error = validate(e.target.name, e.target.value);
      setFormErrors({ ...formErrors, [e.target.name]: error });
    }
  };

  const validate = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'password':
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(value)) {
          error = 'Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character.';
        }
        break;
      case 'phoneNumber':
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          error = 'Phone number must be exactly 10 digits.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value) || !value.endsWith('gmail.com')) {
          error = 'Email must be a valid Gmail address.';
        }
        break;
      case 'name':
      case 'username':
      case 'address':
        if (value.trim() === '') {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    // Validate all fields before submitting (only for signup)
    const errors = {};
    if (!isLogin) {
      Object.keys(formData).forEach((key) => {
        if (key !== 'username' && key !== 'password') {
          const error = validate(key, formData[key]);
          if (error) {
            errors[key] = error;
          }
        }
      });
      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }
    } else {
      // For login, ensure fields are filled
      if (!formData.username || !formData.password) {
        setFormErrors({
          username: !formData.username ? 'Username is required.' : '',
          password: !formData.password ? 'Password is required.' : '',
        });
        return;
      }
    }

    try {
      if (isLogin) {
        const res = await UserLogin(formData); 
        console.log(res);
        
        const val = res.data.customer.customerId;
        const tkn = res.data.token;
        console.log(tkn+" "+val);
        

        if (res.status === 200) {
          setErr('');
          storeToken(tkn);
          sessionStorage.setItem('csID', val);
          navigate('/customer-home');
        }
      } else {
        const res = await UserSignUp(formData);
        if (res.status === 200) {
          setErr('');
          navigate(0);
        }
      }
     } 
      catch (error) {
        const errorMsg = typeof error.response?.data === 'string' ? error.response.data : 'Invalid Username or Password';
        setErr(errorMsg);
      }
      
 
  };

  return (
    <div className='containerC'>
      <div className="customer-auth">
        <h2>{isLogin ? 'Customer Login' : 'Customer Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
              />
              {formErrors.name && <div className="error">{formErrors.name}</div>}

              <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              {formErrors.email && <div className="error">{formErrors.email}</div>}

              <label>Phone&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="tel"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
                required
              />
              {formErrors.phoneNumber && <div className="error">{formErrors.phoneNumber}</div>}

              <label>Address&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                required
              />
              {formErrors.address && <div className="error">{formErrors.address}</div>}
            </>
          )}
          <label>Username&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          {formErrors.username && <div className="error">{formErrors.username}</div>}

          <label>Password&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          {formErrors.password && <div className="error">{formErrors.password}</div>}

          {isLogin && (
            <div className="remember-me">
              <Link to="/forgetUser">Forget Password</Link>
            </div>
          )}
          <div className='button-container'>
            <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
          </div>
        </form>
        {
          erre.length === 0 ? null :
            <Row className="mt-4">
              <Alert variant="danger">{erre}</Alert>
            </Row>
        }
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
      <IoArrowBackCircle style={{ color: 'white', fontSize: '50px' }}
        className="back-icon" 
        onClick={() => navigate("/role-select")} 
        title="Go Back"
      />
    </div>
  );
}

export default Customer;
