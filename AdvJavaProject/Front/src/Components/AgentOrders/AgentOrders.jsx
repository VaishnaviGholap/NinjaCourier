
import React, { useEffect, useState } from 'react';
import './AgentOrders.css';
import AgentNav from '../AgentNav/AgentNav';
import { DeleteSingleOrder, GetSingleOrder } from '../../APICallFunction/AgentFunction';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AgentOrders = () => {
    const [orders, setOrder] = useState([]);
    const [err, setErr] = useState('');
    const [show, setShow] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [toastShow, setToastShow] = useState(false);

    const navigate = useNavigate();
    const agID = sessionStorage.getItem('agent');

    useEffect(() => {
        getOrder();
    }, []);

    const handleClose = () => setShow(false);
    const handleCloseToast = () => setToastShow(false);

    const getOrder = async () => {
        try {
            const res = await GetSingleOrder(agID);
            console.log(res);
            if (res.status === 200) {
                setOrder(res.data);
                res.data.length === 0 ? setErr('Oops..... No order') : setErr('');
            } else {
                setErr('No orders found');
            }
        } catch (error) {
            console.log(error);
            navigate('/agent');
            setErr('Error No orders found');
        }
    };

    const deleteData = async () => {
        try {
            const res = await DeleteSingleOrder(orderId);
            if (res.status === 200) {
                setShow(false);
                setToastShow(true);
                getOrder();
            } else {
                setErr('Failed to delete order');
            }
        } catch (error) {
            setErr('Error deleting order');
        }
    };

    const errorMessage = typeof err === 'string' ? err : JSON.stringify(err);

    return (
        <div>
             <AgentNav />


        <div className='agentOrdersContainer'>
            <br></br>
              <h2 style={{ fontSize: '40px' }}>Your Orders</h2>
            {errorMessage ? (
                <h3 className='error-message'>{errorMessage}</h3>
            ) : (
                <div className='getOrdersTableContainer'>
                    <table className="getOrdersTable">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Pickup</th>
                                <th>Destination</th>
                                <th>Order Date</th>
                                <th>Delivery Date</th>
                                <th>Tracking ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td><Link to={`/customersProfile/${order.customerId}`}>{order.customerId}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.email}</td>
                                    <td>{order.pickup}</td>
                                    <td>{order.destination}</td>
                                    <td>{order.oDate}</td>
                                    <td>{order.dDate}</td>
                                    <td>{order.trackingID}</td>
                                    <td>
                                        <Button
                                            variant='danger'
                                            style={{ width: '80px', height: '40px' }}
                                            onClick={() => {
                                                setShow(true);
                                                setOrderId(order.id);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete order ID {orderId}?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={deleteData}
                        style={{ width: '70px', height: '40px' }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ width: '70px', height: '40px' }}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default AgentOrders;

