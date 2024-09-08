import React, { useEffect, useState } from 'react';
import './Form.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import { GetSingleUser } from '../../APICallFunction/AgentFunction';
import { getSingleOrder, updateSingleOrder, UpdateUser } from '../../APICallFunction/AdminFunction';

const OrderForm = () => {
    const {id} = useParams();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    UserFecth();
  },[])

  const UserFecth = async() => {
    try {
      const res = await getSingleOrder(id);
    console.log(res.data); 
    setFormData(res.data);
    } catch (error) {
      navigate('agent');
    }
}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = async (e) => {
    
    try {
        e.preventDefault();
        const res =await updateSingleOrder(id,formData);
        console.log(res.data);
        if(res.status===200){
            navigate("/getorders");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    console.log('Form Data:', formData);
  };


  return (
    <div className='main'>
      <div className="form-container">
        <h2>Update Order</h2><br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Order ID:</label>
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
            <input
              type="text"
              id="agentId"
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
              hidden

            />
          </div>
          <div className="form-group">
            
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              hidden
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
            <label htmlFor="phone">Phone :</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
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
            <label htmlFor="username">Pick-Up :</label>
            <input
              type="text"
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Destination :</label>
            <input
            type='text'
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Order Date :</label>
            <input
              type="text"
              id="oDate"
              name="oDate"
              value={formData.oDate}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Delivery Date :</label>
            <input
              type="text"
              id="dDate"
              name="dDate"
              value={formData.dDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Tracking ID :</label>
            <input
              type="text"
              id="trackingID"
              name="trackingID"
              value={formData.trackingID}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="button-group">
            <button type="submit" >Submit</button>
            <a href="/getorders" className="btn btn-success" style={{marginLeft:'85%'}}>Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;