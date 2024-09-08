import React, { useState, useRef, useEffect } from 'react';
import './AgentContact.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const AgentContact = () => {

 
    const navigate = useNavigate();
    useEffect(()=>{
      tokenCheck();
    },[])
  
    const tokenCheck = ()=>{
      const token = getToken();
      if(!token)
     {
      navigate('/agent');
     }
    }
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    query: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    query: ''
  });

  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    }
    if (!formData.query) {
      newErrors.query = 'Query is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission logic here
      console.log('Form submitted successfully with data:', formData);
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        username: '',
        email: '',
        phone: '',
        query: ''
      });
      setErrors({});
      navigate('/agenthome')
    }
  };

  return (
    <div className='cover'>
      <div className='submit-form-container'>
        <h3 className='submit-form-heading'>Submit Your Query/Feedback</h3>
        <form ref={form} onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='control-label'>Username</label>
            <input
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='form-control'
            />
            <span className='text-danger'>{errors.username}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='control-label'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              className='form-control'
            />
            <span className='text-danger'>{errors.email}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='phone' className='control-label'>Phone</label>
            <input
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='form-control'
            />
            <span className='text-danger'>{errors.phone}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='query' className='control-label'>Query</label>
            <input
              id='query'
              name='query'
              value={formData.query}
              onChange={handleChange}
              className='form-control'
            />
            <span className='text-danger'>{errors.query}</span>
          </div>
          <br />
          <div className='form-group'>
            <input
              type='submit'
              value='Submit Query'
              className='btn btn-primary btn-block'
            />
            <div className='backus'>
             
              <Link to="/Agenthome" className="btn btn-success ml-2" style={{fontSize:'20px'}}>Back to Home</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentContact;
