
import React, { useEffect, useState } from 'react';
import './GetUsers.css';
import AdminNav from '../AdminNav/AdminNav';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../APICallFunction/AdminFunction';

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(0);
    const [toastShow, setToastShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setShow(false);
    const handleCloseToast = () => setToastShow(false);

    const deleteData = async () => {
        try {
            const res = await deleteUser(userId);
            console.log(res.status);
            setShow(false);
            setToastShow(true);
            getAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="getUsersContainer">
                <h2 style={{ fontSize: '60px' }}>Users</h2>
                <br />
                <div className="table-responsive">
                    <table className="getUsersTable">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'cornsilk' }}>ID</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Name</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Email</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Phone</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Address</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Username</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Password</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.customerId}>
                                    <td>{user.customerId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            style={{ width: '70px', height: '40px' }}
                                            onClick={() => {
                                                setShow(true);
                                                setUserId(user.customerId);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button
                                            variant="primary"
                                            style={{ width: '79px', height: '40px' }}
                                            onClick={() => {
                                                navigate(`/userUpdate/${user.customerId}`);
                                            }}
                                        >
                                            Update
                                        </Button>
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
                    <Modal.Body>Do you want to delete {userId}?</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={deleteData}
                            style={{ width: '70px', height: '40px' }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="primary"
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

export default GetUsers;

