
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOrder, getOrders } from '../../APICallFunction/AdminFunction';
import Navbar from '../Navbar/Navbar';
import './ViewOrder.css';

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [toastShow, setToastShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async() => {
        try {
            const res = await getOrders();
            setOrders(res.data); 
        } catch (error) {
            console.log(error);
            
           // navigate('/customer');
        }
    }

    const getOrderStatus = (orderDate, deliveryDate) => {
        const oDate = new Date(orderDate);
        const dDate = new Date(deliveryDate);

        const differenceInMilliseconds = dDate.getTime() - oDate.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const differenceInDays = differenceInMilliseconds / millisecondsPerDay;

        return differenceInDays <= 0 ? 'Delivered' : 'Pending';
    }

    const handleClose = () => setShow(false);
    const handleCloseToast = () => setToastShow(false);

    const deleteData = async() => {
        const res = await deleteOrder(orderId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getAllOrders();
    }

    return (
        <div>
            <Navbar />
            <div className="getOrdersContainer">
                <br />
                <h2>Orders</h2>
                <div className="table-responsive">
                    <table className="getOrdersTable">
                        <thead>
                            <tr>
                                <th>Agent ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Pickup</th>
                                <th>Destination</th>
                                <th>Status</th>
                                <th>Tracking ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td><Link to={`/agentProfile/${order.agentId}`}>{order.agentId}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.email}</td>
                                    <td>{order.pickup}</td>
                                    <td>{order.destination}</td>
                                    <td>{getOrderStatus(order.oDate, order.dDate)}</td>
                                    <td>{order.trackingID}</td>
                                    <td>
                                        <Button variant='danger' style={{ width: '70px', height: '40px' }} onClick={() => {
                                            setShow(true);
                                            setOrderId(order.id);
                                        }}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete {orderId} ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={deleteData} style={{ width: '70px', height: '40px' }}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={handleClose} style={{ width: '70px', height: '40px' }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ViewOrder;

