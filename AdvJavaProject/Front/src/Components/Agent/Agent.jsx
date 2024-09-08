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
  const [formData, setFormData] = useState({
    companyName: '',
    agentName: '',
    phoneNumber: '',
    email: '',
    address: '',
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    
    if (!isLogin) {
      const error = validate(name, value);
      setFormErrors({ ...formErrors, [name]: error });
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
      case 'companyName':
      case 'agentName':
      case 'address':
        if (value.trim() === '') {
          error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
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
        const res = await LoginAgent(formData);
        console.log(res);
        
        const val = res.data.agent.agentId;
        if (res.status === 200) {
          setErr('');
          storeToken(res.data.jwt);
          sessionStorage.setItem('agent', val);
          navigate('/agenthome');
        }
      } else {
        const res = await SignAgent(formData);
        if (res.status === 200) {
          setErr('');
          navigate(0);
        }
      }
    } catch (error) {
      console.log(error);
      
      setErr(error.response?.data || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='containerA'>
      <div className="agent-auth">
        <h2>{isLogin ? 'Agent Login' : 'Agent Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Company Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="companyName"
                onChange={handleChange}
                value={formData.companyName}
                required
              />
              {formErrors.companyName && <div className="error">{formErrors.companyName}</div>}

              <label>Agent Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="agentName"
                onChange={handleChange}
                value={formData.agentName}
                required
              />
              {formErrors.agentName && <div className="error">{formErrors.agentName}</div>}

              <label>Phone&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
                required
              />
              {formErrors.phoneNumber && <div className="error">{formErrors.phoneNumber}</div>}

              <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              {formErrors.email && <div className="error">{formErrors.email}</div>}

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
              <Link to="/forgetAgent">Forget Password</Link>
            </div>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
          {erre && (
            <Row className="mt-4">
              <Alert variant="danger">{erre}</Alert>
            </Row>
          )}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
      <IoArrowBackCircle
        style={{ color: 'white', fontSize: '50px' }}
        className="back-icon"
        onClick={() => navigate("/role-select")}
        title="Go Back"
      />
    </div>
  );
}

export default Agent;

