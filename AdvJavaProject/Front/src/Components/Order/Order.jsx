
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order.css';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { OrderPlace } from '../../APICallFunction/UserFunction';
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
        customerId: csID,
        agentId: agID
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const handleCloseToast = () => {
        setToastShow(false);
        navigate('/payment');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validate(name, value);
    };

    const validate = (name, value) => {
        let isValid = true;
        const errors = {};

        if (name === 'phoneNumber') {
            if (!/^\d{10}$/.test(value)) {
                errors.phoneNumber = 'Phone number must be exactly 10 digits';
                isValid = false;
            } else {
                errors.phoneNumber = '';
            }
        }

        if (name === 'email') {
            if (!/^[\w._%+-]+@gmail\.com$/.test(value)) {
                errors.email = 'Email must be a valid Gmail address';
                isValid = false;
            } else {
                errors.email = '';
            }
        }

        if (name === 'name') {
            if (value.trim() === '') {
                errors.name = 'Receiver name is required';
                isValid = false;
            } else {
                errors.name = '';
            }
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate('name', formData.name) || !validate('email', formData.email) || !validate('phoneNumber', formData.phoneNumber)) {
            return;
        }

        console.log('Form data submitted:', formData);
        try {
            const res = await OrderPlace(formData);
            console.log(res);
            if (res.status === 200) {
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
                <h2 style={{ fontSize: '40px' }} className="text-center">Place Order</h2>
                <br></br>
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontSize: '20px' }} className="control-label">
                            Receiver Name : <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" style={{ fontSize: '20px' }} className="control-label">
                            Receiver Email :<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" style={{ fontSize: '20px' }} className="control-label">
                            Receiver Phone :<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup" style={{ fontSize: '20px' }} className="control-label">Pick Up :</label>
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
                        <label htmlFor="destination" style={{ fontSize: '20px' }} className="control-label">Destination :</label>
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
                        <input type="submit" value="Submit" className="btn btn-primary" style={{ width: '100px', height: '40px', marginLeft: '100%' }} />
                        <a href="/customer-home" className="btn btn-success ml-2" style={{ width: '150px', height: '40px', display: 'inline-block', textAlign: 'center', marginLeft: '30%' }}>Back to Home</a>
                    </div>
                </form>
            </div>
            <IoArrowBackCircle style={{ color: 'white', fontSize: '50px' }}
                className="back-icon"
                onClick={() => navigate(-1)}
                title="Go Back"
            />
            <ToastContainer position="top-end">
                <Toast bg="success" onClose={handleCloseToast} show={toastShow} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Order Placed</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Order;


