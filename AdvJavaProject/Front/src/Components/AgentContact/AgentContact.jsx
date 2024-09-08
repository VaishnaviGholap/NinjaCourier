import React, { useEffect, useState } from 'react';
import './AgentContact.css';
import { getToken, PostFeed } from '../../APICallFunction/UserFunction';
import { Link, useNavigate } from 'react-router-dom';

const AgentContact = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = getToken();
    if (!token) {
      navigate('/agent');
    }
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    category: '',
    query: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    category: '',
    query: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate input fields
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === 'username') {
      newErrors.username = value ? '' : 'Username is required';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(value) || !value.endsWith('gmail.com')) {
        newErrors.email = 'Email must be a valid Gmail address';
      } else {
        newErrors.email = '';
      }
    }
    if (name === 'category') {
      newErrors.category = value ? '' : 'Category is required';
    }
    if (name === 'query') {
      newErrors.query = value ? '' : 'Query is required';
    }

    setErrors(newErrors);
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
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email) || !formData.email.endsWith('gmail.com')) {
        newErrors.email = 'Email must be a valid Gmail address';
        valid = false;
      }
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    if (!formData.query) {
      newErrors.query = 'Query is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      try {
        const res = await PostFeed(formData);
        console.log(res.data);
        if (res.status === 200) {
          navigate('/agenthome');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='cover'>
      <div className='submit-form-container'>
        <h2 className='submit-form-heading' style={{fontSize: '35px'}}>Submit Your Query/Feedback</h2>
        <hr className="track-courier-heading-line" />
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='control-label' style={{fontSize: '20px'}}>Username&nbsp; <span style={{ color: 'red' }}>*</span></label>
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
            <label htmlFor='email' className='control-label' style={{fontSize: '20px'}}>Email&nbsp; <span style={{ color: 'red' }}>*</span></label>
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
            <label htmlFor='category' className='control-label' style={{fontSize: '20px'}}>Category&nbsp; <span style={{ color: 'red' }}>*</span></label>
            <select
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className='form-control'
            >
              <option value='' disabled>Select an option</option>
              <option value='Order'>Query</option>
              <option value='Feedback'>Feedback</option>
              <option value='General'>General</option>
            </select>
            <span className='text-danger'>{errors.category}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='query' className='control-label' style={{fontSize: '20px'}}>Query&nbsp;  <span style={{ color: 'red' }}>*</span></label>
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
              style={{fontSize: '20px', width: '90%', height: '80%'}}
            />
            <div className='backus'>
              <Link to="/customer-home" className="btn btn-success ml-2" style={{fontSize: '20px', width: '50%', marginLeft: '50%'}}>Back to Home</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentContact ;
