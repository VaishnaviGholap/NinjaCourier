
import React, { useEffect, useState } from 'react';
import './GetAgents.css';
import AdminNav from '../AdminNav/AdminNav';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteAgent, getAgents } from '../../APICallFunction/AdminFunction';

const GetAgents = () => {

    const [agents, setAgents] = useState([]);
    const [show, setShow] = useState(false);
    const [agentId, setAgentId] = useState(0);
    const [toastShow, setToastShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAgents();
    }, []);

    const getAllAgents = async () => {
        try {
            const res = await getAgents();
            setAgents(res.data);
        } catch (error) {
            console.log(error);
            // navigate('/admin');
        }
    }

    const handleClose = () => setShow(false);
    const handleCloseToast = () => setToastShow(false);

    const deleteData = async () => {
        const res = await deleteAgent(agentId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getAllAgents();
    }

    return (
        <div>
            <AdminNav />
            <div className="getOrdersContainer">
                <br />
                <h2 style={{ fontSize: '60px' }}>Agents</h2>
                <br />
                <div className="table-responsive">
                    <table className="getOrdersTable">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'cornsilk' }}>Agent ID</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Company</th>                       
                                <th style={{ backgroundColor: 'cornsilk' }}>Name</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Phone</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Email</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Ratings</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Username</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Password</th>                        
                                <th style={{ backgroundColor: 'cornsilk' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map(agent => (
                                <tr key={agent.id}>
                                    <td>{agent.agentId}</td>
                                    <td>{agent.companyName}</td>                            
                                    <td>{agent.agentName}</td>
                                    <td>{agent.phoneNumber}</td>
                                    <td>{agent.email}</td>
                                    <td>{agent.ratings}</td>
                                    <td>{agent.username}</td>
                                    <td>{agent.password}</td>                            
                                    <td>
                                        <Button variant='danger' style={{ width: '70px', height: '40px' }} onClick={() => {
                                            setShow(true);
                                            setAgentId(agent.agentId);
                                        }}>Delete</Button>&nbsp;&nbsp;&nbsp; 
                                        <Button variant='primary' style={{ width: '79px', height: '40px' }} onClick={() => {
                                            navigate(`/student-edit/${agent.agentId}`);
                                        }}>Update</Button>
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
                    <Modal.Body>Do you want to delete {agentId} ?</Modal.Body>
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

export default GetAgents;
