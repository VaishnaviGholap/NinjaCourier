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

    const getAllUsers = async() => {
        try {
            const res = await getUsers();
        setUsers(res.data);
        } catch (error) {
            console.log(error);
            
           
        }
    }

    const handleClose = ()=>{setShow(false);}
    const handleCloseToast=()=>{setToastShow(false)}

    const deleteData = async()=>{
        try {
            const res = await deleteUser(userId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getAllUsers();
        } catch (error) {
            console.log(error);
            
        }
        
     }
    return (
        <div>
            <AdminNav/>
     
        <div className="getUsersContainer">
            <h2>Users</h2>
            <br></br>
            <table className="getUsersTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.customerId}>
                            <td>{user.customerId}</td>
                            <td>{user.name}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                        <Button variant='danger' style={ {width:'70px',height:'40px'}} onClick={()=>{
                                            setShow(true);
                                            setUserId(user.customerId);
                                        }}>Delete</Button>&nbsp;&nbsp;&nbsp; <Button variant='primary' style={ {width:'79px',height:'40px'}} onClick={()=>{
                                            navigate(`/userUpdate/${user.customerId}`);
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
                <Modal.Body>Do you want to delete {userId} ?</Modal.Body>
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

export default GetUsers;
