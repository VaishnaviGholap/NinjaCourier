import React, { useEffect, useState } from 'react';
import './GetQueries.css';
import AdminNav from '../AdminNav/AdminNav';
import { AdminQuery, DeleteQuery } from '../../APICallFunction/AdminFunction';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const GetQueries = () => {

  
    const [queries, setQueries] = useState([]);
    const [feedId, setFeedId] = useState(0);
    const [show, setShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = ()=>{setShow(false);}
    const handleCloseToast=()=>{setToastShow(false)}

    useEffect(() => {
        // Fetch queries from an API
       getFeed();
    }, []);

    const deleteData = async()=>{
        const res = await DeleteQuery(feedId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getFeed();
        
     }

    const getFeed = async()=>{
        try {
            const res = await AdminQuery();
        setQueries(res.data);
        } catch (error) {
            console.log(error);
            //navigate('/agent');
        }
    }
    return (
        <div>
             <AdminNav/> 
       
        <div className="getQueriesContainer">
            <h2>Queries</h2>
            <br></br>
            <table className="getQueriesTable">
                <thead>
                    <tr>
                        <th>Query ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map(query => (
                        <tr key={query.feedbackId}>
                            <td>{query.feedbackId}</td>
                            <td>{query.username}</td>
                            <td>{query.email}</td>
                            <td>{query.category}</td>
                            <td>{query.query}</td>
                            <td>{query.date}</td>
                            <td><button className='btn btn-danger' onClick={()=>{
                                            setShow(true);
                                            setFeedId(query.feedbackId);
                                        }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete Query No {feedId} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteData} style={ {width:'70px',height:'40px'}}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose} style={ {width:'70px',height:'40px', textAlign:'center'}}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default GetQueries;
