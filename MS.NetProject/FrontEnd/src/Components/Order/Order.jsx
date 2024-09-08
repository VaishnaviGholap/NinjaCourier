import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order.css';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {getToken, OrderPlace} from '../../APICallFunction/UserFunction';
import { Toast, ToastContainer } from "react-bootstrap";



const Order = () => {
    const { from, to } = useParams();
    const csID = sessionStorage.getItem('csID');
    const agID = sessionStorage.getItem('agID');
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        pickup: from,
        destination: to,
        customerId : csID,
        agentId : agID
    });
    
       
        useEffect(()=>{
          tokenCheck();
        },[])
      
        const tokenCheck = ()=>{
          const token = getToken();
          if(!token){
            navigate('/agent')
          }
        }

    const handleCloseToast=()=>{
        setToastShow(false);
        navigate('/payment')

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form data submitted:', formData);
        try {
            const res = await OrderPlace(formData);
            console.log(res);
            if(res.status === 200){
                
                setToastShow(true);
            }
        } catch (error) {
            console.log(error);
            setMsg("Server Error Try Again After Sometime..");
        }
    };

    return (
        <div className='background'>
            
                            
                           
                        
        <div className="order-container containerOr">
        
            <h2 style={{fontSize:'40px'}} className="text-center">Place Order</h2>
            <br></br>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label htmlFor="name" style={{fontSize:'20px'}} className="control-label">Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" style={{fontSize:'20px'}} className="control-label">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" style={{fontSize:'20px'}} className="control-label">Phone :</label>
                    <input
                        type="text"
                        id="phone"
                        name="phoneNumber"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pickup" style={{fontSize:'20px'}} className="control-label">Pick Up :</label>
                    <input
                        type="text"
                        id="pickup"
                        name="pickup"
                        value={from}
                        onChange={handleChange}
                        className="form-control"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="destination" style={{fontSize:'20px'}} className="control-label">Destination :</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={to}
                        onChange={handleChange}
                        className="form-control"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    <a href="/customer-home" className="btn btn-success ml-2">Back to Home</a>
                </div>
            </form>
        </div>
        <IoArrowBackCircle style={{color:'white',fontSize:'50px'}}
          className="back-icon" 
          onClick={() => navigate(-1)} 
          title="Go Back"
        />
         <ToastContainer position="top-end">
                <Toast bg="success" onClose={handleCloseToast} show={toastShow} delay={3000} autohide>
                    <Toast.Header >
                       
                        <strong className="me-auto">Confirmation</strong>
                        
                    </Toast.Header>
                    <Toast.Body className="text-white">Order Placed</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Order;