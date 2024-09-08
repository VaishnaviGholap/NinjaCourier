import React, { useEffect, useState } from 'react';
import './GetOrders.css';
import AdminNav from '../AdminNav/AdminNav';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteOrder, getOrders } from '../../APICallFunction/AdminFunction';


const GetOrders = () => {

    

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
            //navigate('/agent');
        }
    }

    const handleClose = ()=>{setShow(false);}
    const handleCloseToast=()=>{setToastShow(false)}

    const deleteData = async()=>{
        const res = await deleteOrder(orderId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getAllOrders();
        
     }
    return (
        <div>
             <AdminNav/>
       
        <div className="getOrdersContainer">
            <br></br>
            <h2>Orders</h2>
            <table className="getOrdersTable">
                <thead>
                    <tr>
                    <th>AID</th>
                    <th>CID</th>
                        
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
                            <td>{order.agentId}</td>
                            <td>{order.customerId}</td>
                            
                            <td>{order.name}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.email}</td>
                            <td>{order.pickup}</td>
                            <td>{order.destination}</td>
                            <td>{order.oDate}</td>
                            <td>{order.dDate}</td>
                            <td>{order.trackingID}</td>
                            <td>
                                        <Button variant='danger' style={ {width:'70px',height:'40px'}} onClick={()=>{
                                            setShow(true);
                                            setOrderId(order.id);
                                        }}>Delete</Button>&nbsp;&nbsp;&nbsp; <Button variant='primary' style={ {width:'79px',height:'40px'}} onClick={()=>{
                                            navigate(`/orderUpdate/${order.id}`);
                                        }}>Update</Button>
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteData} style={ {width:'70px',height:'40px'}}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose} style={ {width:'70px',height:'40px'}}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default GetOrders;
