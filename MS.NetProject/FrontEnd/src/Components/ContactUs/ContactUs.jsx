
import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import { getToken, PostFeed } from '../../APICallFunction/UserFunction';
import { Link, useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate(); 
    useEffect(()=>{
      tokenCheck();
    },[])
  
    const tokenCheck = ()=>{
      const token = getToken();
      if(!token){
        navigate('/customer')
      }
      
    }
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
    if (!formData.category) {
      newErrors.category = 'Phone is required';
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
    }
    try {
      const res= await PostFeed(formData)
      console.log(res.data);
      if(res.status===200){
        navigate('/customer-home')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='cover'>
      <div className='submit-form-container'>
        <h2 className='submit-form-heading' style={{fontSize:'30px'}}>Submit Your Query/Feedback</h2><br></br>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='control-label' style={{fontSize:'20px'}}>Username :</label>
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
            <label htmlFor='email' className='control-label' style={{fontSize:'20px'}}>Email :</label>
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
      <label htmlFor='query' className='control-label' style={{ fontSize: '20px' }}>
        Category :
      </label>
      <select
        id='category'
        name='category'
        value={formData.category}
        onChange={handleChange}
        className='form-control'
      >
        <option value='' disabled>Select an option</option>
        <option value='Order'>Order</option>
        <option value='Feedback'>Feedback</option>
        <option value='General'>General</option>
      </select>
      <span className='text-danger'>{errors.query}</span>
    </div>

          <div className='form-group'>
            <label htmlFor='query' className='control-label' style={{fontSize:'20px'}}>Query :</label>
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
              
              <Link to="/customer-home" className="btn btn-success ml-2" style={{fontSize:'20px'}}>Back to Home</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
