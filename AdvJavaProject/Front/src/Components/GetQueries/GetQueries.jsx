
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

    useEffect(() => {
        getFeed();
    }, []);

    const handleClose = () => setShow(false);
    const handleCloseToast = () => setToastShow(false);

    const deleteData = async () => {
        const res = await DeleteQuery(feedId);
        console.log(res.status);
        setShow(false);
        setToastShow(true);
        getFeed();
    };

    const getFeed = async () => {
        try {
            const res = await AdminQuery();
            setQueries(res.data);
        } catch (error) {
            console.log(error);
            // navigate('/agent');
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="getQueriesContainer">
                <h2 style={{ fontSize: '60px' }}>Queries</h2>
                <br />
                <div className="table-responsive">
                    <table className="getQueriesTable">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'cornsilk' }}>Query ID</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Username</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Email</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Category</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Description</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Date</th>
                                <th style={{ backgroundColor: 'cornsilk' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map(query => (
                                <tr key={query.feedbackID}>
                                    <td>{query.feedbackID}</td>
                                    <td>{query.username}</td>
                                    <td>{query.email}</td>
                                    <td>{query.category}</td>
                                    <td>{query.query}</td>
                                    <td>{query.date}</td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            style={{ width: '70px', height: '40px' }} 
                                            onClick={() => {
                                                setShow(true);
                                                setFeedId(query.feedbackID);
                                            }}
                                        >
                                            Delete
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
                    <Modal.Body>Do you want to delete Query No {feedId} ?</Modal.Body>
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
                            style={{ width: '70px', height: '40px', textAlign: 'center' }}
                        >
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default GetQueries;

