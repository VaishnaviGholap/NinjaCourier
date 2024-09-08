import React, { useEffect, useState } from 'react';
import './Form.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import { GetSingleUser } from '../../APICallFunction/AgentFunction';
import { UpdateUser } from '../../APICallFunction/AdminFunction';

const UserForm = () => {
    const {id} = useParams();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    UserFecth();
  },[])

  const UserFecth = async() => {
    try {
      const res = await GetSingleUser(id);
    setFormData(res.data);
    } catch (error) {
      navigate('/agent');
    }
}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = async (e) => {
    
    try {
        e.preventDefault();
        const res =await UpdateUser(id,formData);
        console.log(res.data);
        if(res.status===200){
            navigate("/getusers");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    console.log('Form Data:', formData);
  };


  return (
    <div className='main'>
      <div className="form-container">
        <h2>Update User</h2><br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone :</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address :</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" style={{height:'40px'}}>Submit</button>
            <a href="/getusers" className="btn btn-success" style={{marginLeft:'90%'}}>Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;